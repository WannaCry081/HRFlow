using HRIS.Context;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Utils;
using Microsoft.AspNetCore.JsonPatch;
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

        public async Task<bool> CreateEmployeeRecord(Guid id, User request)
        {
           
            var hr = await _context.Users.Where(
                c => c.Id.Equals(id)).FirstOrDefaultAsync();

            var employee = await _context.Users.Where(
                c => c.CompanyEmail.Equals(request.CompanyEmail)).FirstOrDefaultAsync();

            if (employee is not null)
            {
                throw new UserExistsException("Employee is already recorded to the database.");
            }

            if (hr is null)
            {
                throw new UserNotFoundException("User not found.");
            }

            request.Role = "Employee";
            request.Status = "Active";
            request.CreatedBy = hr.FirstName + " " + hr.LastName;
            request.GroupCode = hr.GroupCode;
            request.TeamId = hr.TeamId;
            request.CreatedAt = DateTime.Now;

            _context.Users.Add(request);
            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<bool> UpdateEmployeeRecord(User user, JsonPatchDocument<User> request)
        {
            request.ApplyTo(user);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> UpdateEmployeeRecords(User updateEmployee)
        {
            var employee = await _context.Users.FirstOrDefaultAsync(c => c.Id == updateEmployee.Id);
            if (employee is null)
            {
                return false;
            }

            employee.FirstName = updateEmployee.FirstName;
            employee.MiddleName = updateEmployee.MiddleName;
            employee.LastName = updateEmployee.LastName;
            employee.Suffix = updateEmployee.Suffix;
            employee.Age = updateEmployee.Age;
            employee.Birthdate = updateEmployee.Birthdate;
            employee.MobileNumber = updateEmployee.MobileNumber;
            employee.LandlineNumber = updateEmployee.LandlineNumber;
            employee.PersonalEmail = updateEmployee.PersonalEmail;
            employee.CompanyEmail = updateEmployee.CompanyEmail;
            employee.UpdatedAt = DateTime.Now;
            employee.UpdatedBy = updateEmployee.UpdatedBy;
            employee.GroupCode = updateEmployee.GroupCode;
            employee.TeamId = updateEmployee.TeamId;
            employee.Status = updateEmployee.Status;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
