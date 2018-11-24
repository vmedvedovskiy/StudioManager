using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudioManager.Contract;
using StudioManager.Services;

namespace StudioManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingQueryService queryService;
        private readonly IBookingCommandService commandService;
        private readonly IMapper mapper;

        public BookingController(
            IBookingQueryService queryService, 
            IBookingCommandService commandService, 
            IMapper mapper)
        {
            this.queryService = queryService;
            this.commandService = commandService;
            this.mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<BookingApiModel>))]
        public async Task<ActionResult<IEnumerable<BookingApiModel>>> Get()
        {
            var data = await this.queryService
                .GetAllAsync()
                .ConfigureAwait(false);

            return this.Ok(data.Select(this.mapper.Map<BookingApiModel>));
        }

        [HttpGet]
        [Route("{id:guid}")]
        [ProducesResponseType(200, Type = typeof(BookingApiModel))]
        public async Task<ActionResult<IEnumerable<BookingApiModel>>> GetByID(Guid id)
        {
            var data = await this.queryService
                .GetAllAsync()
                .ConfigureAwait(false);

            return this.Ok(data.Select(this.mapper.Map<BookingApiModel>));
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(BookingApiModel))]
        public async Task<ActionResult<Guid>> Create(NewBookingApiModel newBooking)
        {
            var entity = await this.commandService
                .AddAsync(this.mapper.Map<NewBookingModel>(newBooking))
                .ConfigureAwait(false);

            return this.CreatedAtAction(
                nameof(this.GetByID), 
                new { id = entity.Id }, 
                entity);
        }
    }
}
