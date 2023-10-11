using HRIS.Context;
using HRIS.dtos.AuthDto;
using HRIS.models;
using HRIS.Models;
using HRIS.Utils;
using Microsoft.EntityFrameworkCore;

namespace HRIS.Repositories.AuthRepository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<bool> AddUser(User request)
        {
            _context.Users.Add(request);
            return 0 < await _context.SaveChangesAsync();
        }

        public async Task<bool> IsEmailExists(string email)
        {
            return await _context.Users.Where(
                c => c.CompanyEmail.Equals(email)).AnyAsync();
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users.Where(
                c => c.CompanyEmail.Equals(email)).FirstOrDefaultAsync();
        }
        public async Task<User?> GetUserById(Guid id)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateUserCode(User user, string code)
        {
            user.PasswordToken = code;
            return 0 < await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateUserPassword(User request, string email)
        {
            var user = await _context.Users.Where(c => c.CompanyEmail.Equals(email)).FirstOrDefaultAsync();
            if (user != null)
            {
                user.PasswordHash = request.PasswordHash;
                user.PasswordSalt = request.PasswordSalt;
                user.UpdatedAt = request.UpdatedAt;
                _context.Users.Update(user);
                return 0 < await _context.SaveChangesAsync();
            }
            return false;
        }

        public async Task<bool> GenerateTeamCode(Guid id, GenerateTeamCodeDto request)
        {
            var user = await _context.Users.Where(c => c.Id.Equals(id)).FirstOrDefaultAsync();
            if(user is null)
            {
                return false;
            }

            if(user.TeamId != null)
            {
                throw new Exception("User has already joined a team.");
            }

            var newTeam = new Team
            {
                Id = Guid.NewGuid(),
                Code = CodeGenerator.AlphaNumeric(8),
                Name = request.Name
            };

            user.GroupCode = newTeam.Code;
            user.TeamId = newTeam.Id;

            _context.Teams.Add(newTeam);
            _context.Users.Update(user);

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
