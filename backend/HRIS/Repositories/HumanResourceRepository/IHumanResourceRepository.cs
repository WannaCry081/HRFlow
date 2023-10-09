using HRIS.Models;

namespace HRIS.Repositories.HumanResourceRepository
{
    public interface IHumanResourceRepository
    {
        Task<bool> CreateEmployeeRecord(User employee);
        Task<bool> UpdateEmployeeRecord(int employeeId, User newEmployeeDetails);
        Task<bool> UpdateEmployeeStatus(int employeeId, User newEmployeeDetails); 
    }
}
