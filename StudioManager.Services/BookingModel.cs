﻿using System;

namespace StudioManager.Services
{
    public class BookingModel
    {
        public Guid Id { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public BookingType Type { get; set; }

        public string Description { get; set; }

        public string ContactPhone { get; set; }

        public decimal Price { get; set; }

        public decimal PaidAmount { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool Paid => this.PaidAmount == this.Price;
    }
}
