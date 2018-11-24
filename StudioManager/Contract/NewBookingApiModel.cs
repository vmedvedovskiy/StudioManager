namespace StudioManager.Contract
{
    public class NewBookingApiModel
    {
        public long From { get; set; }

        public long To { get; set; }

        public string Description { get; set; }

        public string ContactPhone { get; set; }

        public decimal Price { get; set; }

        public BookingTypeApiEnum Type { get; set; }
    }
}
