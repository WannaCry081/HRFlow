using HRIS.Dtos.UserDto;

namespace HRIS.Services.UserService
{
    public interface IUserService
    {
        Task<GetUserProfileDto> GetUserProfile(Guid userId);
        Task<GetUserProfileDto> UpdateUserProfile(Guid userId, UpdateUserProfileDto request);
        Task<bool> JoinTeam(Guid userId, JoinTeamDto request);
    }
}
