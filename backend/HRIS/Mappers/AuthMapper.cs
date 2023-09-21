using AutoMapper;
using HRIS.Dtos;
using HRIS.Models;
using HRIS.Models.AuthModels;

namespace HRIS.Mappers
{
    public class AuthMapper : Profile
    {
        public AuthMapper() 
        {
            CreateMap<User, RegisterUserDto>();
            CreateMap<User, LoginUserDto>();
            CreateMap<ForgotPassword, ForgotPasswordDto>()
                .ReverseMap();
        }
    }
}
