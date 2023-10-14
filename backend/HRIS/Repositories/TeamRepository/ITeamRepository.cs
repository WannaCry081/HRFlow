using HRIS.Models;

namespace HRIS.Repositories.TeamRepository
{
    public interface ITeamRepository 
    {
        Task<bool> CreateTeam(User user, Team team);
    }
}
