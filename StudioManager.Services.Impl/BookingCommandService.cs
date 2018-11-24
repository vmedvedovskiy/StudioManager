using System.Threading.Tasks;
using AutoMapper;
using StudioManager.Database;

namespace StudioManager.Services.Impl
{
    public class BookingCommandService : IBookingCommandService
    {
        private readonly StudioContext db;
        private readonly IMapper mapper;

        public BookingCommandService(StudioContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        public async Task<BookingModel> AddAsync(NewBookingModel newBooking)
        {
            var addResult = await this.db
                           .AddAsync(this.mapper.Map<Booking>(newBooking))
                           .ConfigureAwait(false);

            await this.db
                .SaveChangesAsync()
                .ConfigureAwait(false);

            return this.mapper.Map<BookingModel>(addResult.Entity);
        }
    }
}
