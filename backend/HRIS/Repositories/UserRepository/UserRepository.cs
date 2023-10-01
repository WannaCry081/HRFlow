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
    }
}
