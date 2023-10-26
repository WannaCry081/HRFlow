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
            _context = context;
        }

        public async Task<User?> GetUserById(Guid userId)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(userId)).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateUserPassword(User user, string passwordHash, string passwordSalt)
        {
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateUserProfile(User user, User request)
        {
            user.MobileNumber = request.MobileNumber;
            user.LandlineNumber = request.LandlineNumber;
            user.PersonalEmail = request.PersonalEmail;
            return 0 < await _context.SaveChangesAsync();
        }
    }
}
