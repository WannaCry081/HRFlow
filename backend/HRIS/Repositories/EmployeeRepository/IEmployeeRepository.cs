using HRIS.Dtos.EmployeeDto;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Repositories.EmployeeRepository
{
    public interface IEmployeeRepository
    {
        Task<bool> IsEmailExists(string email);
        Task<User?> GetUserById(Guid id);
        Task<User?> GetEmployeeRecord(Guid id, string code);
        Task<List<User>> GetEmployeeRecords();
        Task<bool> CreateEmployeeRecord(User user);
        Task<bool> UpdateEmployeeRecords(User user, User request);
        Task<bool> UpdateEmployeeRecord(User user, JsonPatchDocument<User> request);
    }
}
