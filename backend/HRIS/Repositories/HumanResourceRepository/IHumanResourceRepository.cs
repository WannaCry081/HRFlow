using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Repositories.HumanResourceRepository
{
    public interface IHumanResourceRepository
    {
        Task<bool> CreateEmployeeRecord(User employee);
        Task<bool> UpdateEmployeeRecords(User updateEmployee);
        Task<bool> UpdateEmployeeRecord(User updateEmployee, JsonPatchDocument<User> request);
    }
}
