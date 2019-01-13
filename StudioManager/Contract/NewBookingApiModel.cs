using System;

namespace StudioManager.Contract
{
    public class NewBookingApiModel
    {
        public DateTimeOffset From { get; set; }

        public DateTimeOffset To { get; set; }

        public string Description { get; set; }

        public string ContactPhone { get; set; }

        public BookingTypeApiEnum Type { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
