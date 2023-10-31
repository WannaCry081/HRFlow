using HRIS.Dtos.DepartmentDto;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.DepartmentService
{
    public interface IDepartmentService
    {
        Task<GetDepartmentDto> GetDepartment(Guid hrId, Guid departmentId);
        Task<ICollection<GetDepartmentDto>> GetDepartments(Guid hrId);
        Task<GetDepartmentDto> CreateDepartment(Guid hrId, CreateDepartmentDto request);
        Task<GetDepartmentDto> UpdateDepartments(Guid hrId, Guid departmentId, UpdateDepartmentDto request);
        Task<bool> UpdateDepartment(Guid hrId, Guid departmentId, JsonPatchDocument<Department> request);
    }
}
