using HRIS.Context;
using HRIS.Models;
using Microsoft.EntityFrameworkCore;

namespace HRIS.Repositories.HumanResourceRepository
{
    public class HumanResourceRepository : IHumanResourceRepository
    {
        private readonly DataContext _context;
        
        public HumanResourceRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<bool> CreateEmployeeRecord(User employee)
        {
            _context.Add(employee);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<User?> GetEmployee(Guid userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(c => c.Id == userId);
        }

        public async Task<bool> UpdateEmployeeRecords(User updateEmployee)
        {
            var employee = await _context.Users.FirstOrDefaultAsync(c => c.Id == updateEmployee.Id);
            if(employee is null)
            {
                return false;
            }

            employee.FirstName = updateEmployee.FirstName;
            employee.MiddleName = updateEmployee.MiddleName;
            employee.LastName = updateEmployee.LastName;
            employee.Suffix = updateEmployee.Suffix;
            employee.Age = updateEmployee.Age;
            employee.MobileNumber = updateEmployee.MobileNumber;
            employee.LandlineNumber = updateEmployee.LandlineNumber;
            employee.PersonalEmail = updateEmployee.PersonalEmail;
            employee.CompanyEmail = updateEmployee.CompanyEmail;
            employee.UpdatedAt = updateEmployee.UpdatedAt;


            await _context.SaveChangesAsync();
            return true;
        }

    }
}
