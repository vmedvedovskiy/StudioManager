using System;
using AutoMapper;
using StudioManager.Database;

namespace StudioManager.Services.Impl
{
    public class BookingMapping : Profile
    {
        public BookingMapping()
        {
            this.CreateMap<NewBookingModel, Booking>()
                .ForMember(_ => _.Id, _ => _.MapFrom(__ => Guid.NewGuid()));

            this.CreateMap<Booking, BookingModel>();
        }
    }
}
