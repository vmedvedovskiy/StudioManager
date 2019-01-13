using System;

namespace StudioManager.Services
{
    public class NewBookingModel
    {
        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public BookingType Type { get; set; }

        public string Description { get; set; }

        public string ContactPhone { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}