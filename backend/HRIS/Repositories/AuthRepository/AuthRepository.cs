using HRIS.Context;
using HRIS.Models;
using Microsoft.EntityFrameworkCore;

namespace HRIS.Repositories.AuthRepository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context, IConfiguration config)
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
    }
}
