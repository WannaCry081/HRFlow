using HRIS.Context;
using HRIS.Models;
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
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }
    }
}
