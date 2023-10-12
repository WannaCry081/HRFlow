using HRIS.Dtos.UserDto;

namespace HRIS.Services.UserService
{
    public interface IUserService
    {
        Task<GetUserProfileDto> GetUserProfile(Guid id);
        Task<GetUserProfileDto> UpdateUserProfile(Guid id, UpdateUserProfileDto request);
        Task<bool> CreateTeam(Guid id, CreateTeamDto request);
        Task<bool> JoinTeam(Guid id, JoinTeamDto request);
    }
}
