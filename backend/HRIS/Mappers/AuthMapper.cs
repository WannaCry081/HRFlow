using AutoMapper;
using HRIS.Dtos;
using HRIS.Models;

namespace HRIS.Mappers
{
    public class AuthMapper : Profile
    {
        public AuthMapper()
        {
            CreateMap<User, RegisterUserDto>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.CompanyEmail))
                .ReverseMap();
        }
    }
}
