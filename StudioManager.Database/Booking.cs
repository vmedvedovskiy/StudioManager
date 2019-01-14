using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudioManager.Database
{
    public class Booking
    {
        public Guid Id { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public BookingType Type { get; set; }

        public string Description { get; set; }

        public string ContactPhone { get; set; }

        public decimal Price { get; set; }

        [NotMapped]
        public decimal PaidAmount { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
