using AutoMapper;
using HRIS.Models;
using HRIS.Dtos.UserDto;

namespace HRIS.Mappers
{
    public class UserMapper : Profile
    {
        public UserMapper()
        {
            CreateMap<User, GetUserProfileDto>();
        }
    }
}
