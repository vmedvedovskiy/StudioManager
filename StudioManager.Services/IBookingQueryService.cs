using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudioManager.Services
{
    public interface IBookingQueryService
    {
        Task<IReadOnlyList<BookingModel>> GetAllAsync();
    }
}
