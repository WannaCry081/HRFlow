using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Repositories.DepartmentRepository
{
    public interface IDepartmentRepository
    {
        Task<Department?> GetDepartment(User hr, Guid departmentId);
        Task<ICollection<Department>> GetDepartments(User hr);
        Task<bool> CreateDepartment(Department department);
        Task<bool> UpdateDepartments(Department department, Department request);
        Task<bool> UpdateDepartment(Department department, JsonPatchDocument<Department> request);

    }
}
