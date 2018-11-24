using System.Threading.Tasks;

namespace StudioManager.Services
{
    public interface IBookingCommandService
    {
        Task<BookingModel> AddAsync(NewBookingModel newBooking);
    }
}
