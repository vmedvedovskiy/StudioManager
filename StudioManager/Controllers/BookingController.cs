using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using StudioManager.Contract;
using StudioManager.Services;

namespace StudioManager.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingQueryService queryService;
        private readonly IBookingCommandService commandService;
        private readonly IMapper mapper;
        private readonly IValidator<NewBookingApiModel> validator;

        public BookingController(
            IBookingQueryService queryService, 
            IBookingCommandService commandService, 
            IMapper mapper,
            IValidator<NewBookingApiModel> validator)
        {
            this.queryService = queryService;
            this.commandService = commandService;
            this.mapper = mapper;
            this.validator = validator;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<PublicBookingApiModel>))]
        public async Task<ActionResult<IEnumerable<PublicBookingApiModel>>> Get(
            [FromQuery] long from,
            [FromQuery] long to)
        {
            var data = await this.queryService
                .GetAllAsync(
                    DateTimeOffset.FromUnixTimeSeconds(from).UtcDateTime,
                    DateTimeOffset.FromUnixTimeSeconds(to).UtcDateTime)
                .ConfigureAwait(false);

            return this.Ok(data.Select(this.mapper.Map<PublicBookingApiModel>));
        }

        [HttpGet]
        [Route("{id:guid}")]
        [ProducesResponseType(200, Type = typeof(PublicBookingApiModel))]
        public async Task<ActionResult<IEnumerable<PublicBookingApiModel>>> GetByID(Guid id)
        {
            var data = await this.queryService
                .GetByIdAsync(id)
                .ConfigureAwait(false);

            return this.Ok(this.mapper.Map<PublicBookingApiModel>(data));
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(PublicBookingApiModel))]
        public async Task<ActionResult<Guid>> Create(NewBookingApiModel newBooking)
        {
            var validationResult = this.validator.Validate(newBooking);

            if(validationResult.Errors.Any())
            {
                validationResult.AddToModelState(this.ModelState, prefix: null);

                return this.BadRequest(this.ModelState);
            }

            var entity = await this.commandService
                .AddAsync(this.mapper.Map<NewBookingModel>(newBooking))
                .ConfigureAwait(false);

            return this.CreatedAtAction(
                nameof(this.GetByID), 
                new { id = entity.Id },
                this.mapper.Map<PublicBookingApiModel>(entity));
        }
    }
}
