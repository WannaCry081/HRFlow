using HRIS.Models;

namespace HRIS.Repositories.TeamRepository
{
    public interface ITeamRepository 
    {
        Task<User?> GetUserById(Guid userId);
        Task<bool> CreateTeam(User user, Team team);
        Task<bool> JoinTeam(User user, Team team, string code);
        Task<Team?> GetTeamByCode(string code);
    }
}
