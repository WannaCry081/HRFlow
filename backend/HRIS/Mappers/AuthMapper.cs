using AutoMapper;
using HRIS.Dtos;
using HRIS.Models;

namespace HRIS.Mappers
{
    public class AuthMapper : Profile
    {
        public AuthMapper()
        {
            CreateMap<User, RegisterUserDto>();
            CreateMap<User, LoginUserDto>();
        }
    }
}
