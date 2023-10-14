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
                throw new ArgumentException(nameof(context));
        }

        public async Task<bool> CreateTeam(User user, Team team)
        {
            if (user.TeamId is not null)
            {
                return false;
            }

            user.GroupCode = team.Code;
            user.TeamId = team.Id;

            _context.Teams.Add(team);
            _context.Users.Update(user);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
