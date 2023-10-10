using HRIS.Models;

namespace HRIS.Repositories.HumanResourceRepository
{
    public interface IHumanResourceRepository
    {
        Task<bool> CreateEmployeeRecord(User employee);
        Task<bool> UpdateEmployeeRecords(User updateEmployee);
       // Task<bool> UpdateEmployeeStatus(User updateEmployee); 
    }
}
