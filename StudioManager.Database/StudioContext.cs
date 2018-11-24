using Microsoft.EntityFrameworkCore;

namespace StudioManager.Database
{
    public class StudioContext : DbContext
    {
        public StudioContext(DbContextOptions<StudioContext> options)
            : base(options)
        { }

        public virtual DbSet<Booking> Bookings { get; set; }
    }
}
