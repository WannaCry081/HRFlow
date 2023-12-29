using AutoMapper;
using HRIS.Dtos.UserDto;
using HRIS.Models;

namespace HRIS.Mappers
{
    public class UserMapper : Profile
    {
        public UserMapper()
        {
            CreateMap<User, GetUserProfileDto>()
                .ReverseMap();
            CreateMap<User, UpdateUserProfileDto>()
                .ReverseMap();
        }
    }
}
