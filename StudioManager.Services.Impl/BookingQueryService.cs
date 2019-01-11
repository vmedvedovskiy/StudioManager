using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudioManager.Database;

namespace StudioManager.Services.Impl
{
    public class BookingQueryService : IBookingQueryService
    {
        private readonly StudioContext db;
        private readonly IMapper mapper;

        public BookingQueryService(StudioContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        public Task<IReadOnlyList<BookingModel>> GetAllAsync(DateTime from, DateTime to)
            => db.Bookings
                .Where(_ => _.From >= from && _.To < to)
                .ToListAsync()
                .ContinueWith(task => (IReadOnlyList<BookingModel>)task
                    .Result
                    .Select(this.mapper.Map<BookingModel>)
                    .ToList());

        public Task<BookingModel> GetByIdAsync(Guid id) 
            => db.Bookings
                .SingleOrDefaultAsync(_ => _.Id == id)
                .ContinueWith(task => this.mapper.Map<BookingModel>(task.Result));
    }
}
