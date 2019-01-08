using AutoMapper;
using StudioManager.Contract;
using StudioManager.Services;

namespace StudioManager
{
    public class BookingApiMapping : Profile
    {
        public BookingApiMapping()
        {
            this.CreateMap<NewBookingApiModel, NewBookingModel>()
                .ForMember(_ => _.From, _ => _.MapFrom(__ => __.From.UtcDateTime))
                .ForMember(_ => _.To, _ => _.MapFrom(__ => __.To.UtcDateTime));
        }
    }
}
