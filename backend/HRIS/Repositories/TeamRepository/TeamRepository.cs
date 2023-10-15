using HRIS.Context;
using HRIS.Models;
using Microsoft.EntityFrameworkCore;

namespace HRIS.Repositories.TeamRepository
{
    public class TeamRepository : ITeamRepository
    {
        private readonly DataContext _context;

        public TeamRepository(DataContext context)
        {
            _context = context ??
                throw new ArgumentNullException(nameof(context));
        }

        public async Task<User?> GetUserById(Guid userId)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(userId)).FirstOrDefaultAsync();
        }

        public async Task<bool> CreateTeam(User user, Team team)
        {
            if (user.TeamId is not null)
            {
                return false;
            }

            user.TeamCode = team.Code;
            user.TeamId = team.Id;

            _context.Teams.Add(team);
            _context.Users.Update(user);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> JoinTeam(User user, Team team, string code)
        {
            if (user.TeamId is not null)
            {
                return false;
            }

            user.TeamId = team.Id;
            user.TeamCode = code;

            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Team?> GetTeamByCode(string code)
        {
            return await _context.Teams.Where(
                c => c.Code.Equals(code)).FirstOrDefaultAsync();
        }
    }
}
