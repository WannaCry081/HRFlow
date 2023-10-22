using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Repositories.EmployeeRepository
{
    public interface IEmployeeRepository
    {
        Task<bool> IsEmailExists(string email);
        Task<User?> GetUserById(Guid id);
        Task<User?> GetEmployeeRecord(User hr, Guid employeeId);
        Task<ICollection<User>> GetEmployeeRecords(User hr);
        Task<bool> CreateEmployeeRecord(User employee);
        Task<bool> UpdateEmployeeRecords(User employee, User request);
        Task<bool> UpdateEmployeeRecord(User employee, JsonPatchDocument<User> request);
    }
}
