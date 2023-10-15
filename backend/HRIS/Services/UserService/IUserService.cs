using HRIS.Dtos.UserDto;

namespace HRIS.Services.UserService
{
    public interface IUserService
    {
        Task<GetUserProfileDto> GetUserProfile(Guid userId);
        Task<GetUserProfileDto> UpdateUserPassword(Guid userId, UpdateUserPasswordDto request);
        Task<GetUserProfileDto> UpdateUserProfile(Guid userId, UpdateUserProfileDto request);
    }
}
