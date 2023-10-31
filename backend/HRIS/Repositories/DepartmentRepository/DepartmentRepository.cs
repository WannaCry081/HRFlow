using HRIS.Context;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace HRIS.Repositories.DepartmentRepository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly DataContext _context;

        public DepartmentRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<bool> IsDepartmentExists(string name)
        {
            return await _context.Departments.Where(
                c => c.Name.Equals(name)).AnyAsync();
        }

        public async Task<User?> GetUserById(Guid id)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<bool> CreateDepartment(Department department)
        {
            _context.Departments.Add(department);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Department?> GetDepartment(User hr, Guid departmentId)
        {
            return await _context.Departments.Where(
                c => c.Id.Equals(departmentId) && c.TeamId.Equals(hr.TeamId)).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Department>> GetDepartments(User hr)
        {
            return await _context.Departments.Where(
                c => c.TeamId.Equals(hr.TeamId)).ToListAsync(); 
        }

        public async Task<bool> UpdateDepartment(Department department, JsonPatchDocument<Department> request)
        {
            request.ApplyTo(department);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateDepartments(Department department, Department request)
        {
            department.Name = request.Name;
            department.Manager = request.Manager;
            department.Assistant = request.Assistant;

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
