using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Repositories.DepartmentRepository
{
    public interface IDepartmentRepository
    {
        Task<bool> IsDepartmentExists(User hr, string title);
        Task<User?> GetUserById(Guid id);
        Task<Department?> GetDepartment(User hr, Guid departmentId);
        Task<ICollection<Department>> GetDepartments(User hr);
        Task<bool> CreateDepartment(Department department);
        Task<bool> UpdateDepartments(Department department, Department request);
        Task<bool> UpdateDepartment(Department department, JsonPatchDocument<Department> request);
        Task<bool> DeleteDepartment(Department department);

    }
}
