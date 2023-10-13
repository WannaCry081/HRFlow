using HRIS.Context;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace HRIS.Repositories.EmployeeRepository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<bool> IsEmailExists(string email)
        {
            return await _context.Users.Where(
                c => c.CompanyEmail.Equals(email)).AnyAsync();
        }

        public async Task<User?> GetUserById(Guid id)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<bool> CreateEmployeeRecord(User user)
        {
            _context.Users.Add(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User?> GetEmployeeRecord(Guid id, string code)
        {
            var team = await _context.Teams
                        .Include(c => c.Users)
                        .FirstOrDefaultAsync(c => c.Code == code);

            if (team is null)
            {
                return null;
            }

            var user = team.Users.FirstOrDefault(u => u.Status == "active" && u.Role == "employee");
            return user;
        }

        public async Task<List<User>> GetEmployeeRecords()
        {
            var teams = await _context.Teams
                            .Include(c => c.Users)
                            .ToListAsync();

            var users = new List<User>();
            foreach (var team in teams)
            {
                var teamUsers = team.Users.Where(u => u.Status == "active" && u.Role == "employee");
                users.AddRange(teamUsers);
            }

            return users;
        }

        public async Task<bool> UpdateEmployeeRecord(User user, JsonPatchDocument<User> request)
        {
            request.ApplyTo(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateEmployeeRecords(User user, User request)
        {
            user.FirstName = request.FirstName;
            user.MiddleName = request.MiddleName;
            user.LastName = request.LastName;
            user.Suffix = request.Suffix;
            user.MobileNumber = request.MobileNumber;
            user.LandlineNumber = request.LandlineNumber;
            user.PersonalEmail = request.PersonalEmail;
            user.CompanyEmail = request.CompanyEmail;
            user.Status = request.Status;
            user.UpdatedAt = DateTime.Now;
            user.UpdatedBy = request.UpdatedBy;

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
