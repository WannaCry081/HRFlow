using HRIS.Models;

namespace HRIS.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<User?> GetUserById(Guid id);
        Task<bool> UpdateUserProfile(User user, User request);
        Task<Team?> GetTeamByCode(string code);
        Task<bool> CreateTeam(User user, Team team);
        Task<bool> JoinTeam(User user, Team team, string code);
    }
}
