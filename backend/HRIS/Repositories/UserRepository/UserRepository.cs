using HRIS.Context;
using HRIS.Models;
using Microsoft.EntityFrameworkCore;

namespace HRIS.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<User?> GetUserById(Guid id)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateUserProfile(User user, User request)
        {
            user.MobileNumber = request.MobileNumber;
            user.LandlineNumber = request.LandlineNumber;
            user.PersonalEmail = request.PersonalEmail;
            return 0 < await _context.SaveChangesAsync();
        }

        public async Task<Team?> GetTeamByCode(string code)
        {
            return await _context.Teams.Where(
                c => c.Code.Equals(code)).FirstOrDefaultAsync();
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

        public async Task<bool> JoinTeam(User user, Team team, string code)
        {
            if (user.TeamId is not null)
            {
                return false;
            }

            user.TeamId = team.Id;
            user.GroupCode = code;

            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
