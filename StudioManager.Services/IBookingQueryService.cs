using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudioManager.Services
{
    public interface IBookingQueryService
    {
        Task<IReadOnlyList<BookingModel>> GetAllAsync(System.DateTime from, System.DateTime to);

        Task<BookingModel> GetByIdAsync(System.Guid id);
    }
}
