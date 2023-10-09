using HRIS.Models;

namespace HRIS.Repositories.HumanResourceRepository
{
    public interface IHumanResourceRepository
    {
        Task<User?> GetEmployee(Guid userId);
        Task<bool> CreateEmployeeRecord(User employee);
        Task<bool> UpdateEmployeeRecords(User updateEmployee);
       // Task<bool> UpdateEmployeeStatus(User updateEmployee); 
    }
}
