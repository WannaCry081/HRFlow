using HRIS.Dtos.UserDto;

namespace HRIS.Services.TeamService
{
    public interface ITeamService
    {
        Task<bool> CreateTeam(Guid userId, CreateTeamDto request);
        Task<bool> JoinTeam(Guid userId, JoinTeamDto request);
    }
}
