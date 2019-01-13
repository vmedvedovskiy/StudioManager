using System;

namespace StudioManager.Contract
{
    public class PublicBookingApiModel
    {
        public Guid Id { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }
    }
}
