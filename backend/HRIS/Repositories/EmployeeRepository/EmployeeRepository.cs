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

        public async Task<bool> CreateEmployeeRecord(User employee)
        {
            _context.Users.Add(employee);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User?> GetEmployeeRecord(User hr, Guid employeeId)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(employeeId) && c.TeamId.Equals(hr.TeamId)).FirstOrDefaultAsync();
        }

        public async Task<ICollection<User>> GetEmployeeRecords(User hr)
        {
            return await _context.Users.Where(
                c => c.TeamId.Equals(hr.TeamId)).ToListAsync();
        }

        public async Task<bool> UpdateEmployeeRecord(User employee, JsonPatchDocument<User> request)
        {
            request.ApplyTo(employee);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateEmployeeRecords(User employee, User request)
        {
            employee.FirstName = request.FirstName;
            employee.MiddleName = request.MiddleName;
            employee.LastName = request.LastName;
            employee.Suffix = request.Suffix;
            employee.MobileNumber = request.MobileNumber;
            employee.LandlineNumber = request.LandlineNumber;
            employee.PersonalEmail = request.PersonalEmail;
            employee.CompanyEmail = request.CompanyEmail;
            employee.Status = request.Status;
            employee.UpdatedAt = DateTime.Now;
            employee.UpdatedBy = request.UpdatedBy;

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
