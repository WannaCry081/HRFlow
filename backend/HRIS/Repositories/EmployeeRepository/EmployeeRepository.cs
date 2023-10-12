using HRIS.Context;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;

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
