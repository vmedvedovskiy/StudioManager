using System;

namespace StudioManager.Contract
{
    public class BookingApiModel
    {
        public Guid Id { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }
    }
}
