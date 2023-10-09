using HRIS.Models;

namespace HRIS.Repositories.HumanResourceRepository
{
    public interface IHumanResourceRepository
    {
        Task<bool> CreateEmployeeRecord(User employee);
        Task<bool> UpdateEmployeeRecord(User updateEmployee);
       // Task<bool> UpdateEmployeeStatus(User updateEmployee); 
    }
}
