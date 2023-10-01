using HRIS.Dtos.UserDto;

namespace HRIS.Services.UserService
{
    public interface IUserService
    {
        Task<GetUserProfileDto> GetUserProfile(Guid id);
        Task<GetUserProfileDto> UpdateUserProfile(Guid id, UpdateUserProfileDto request);
    }
}
