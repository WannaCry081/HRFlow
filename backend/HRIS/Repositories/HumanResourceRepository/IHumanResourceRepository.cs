using HRIS.Models;

namespace HRIS.Repositories.HumanResourceRepository
{
    public interface IHumanResourceRepository
    {
        Task<bool> CreateEmployeeRecord(User employee);
        Task<bool> UpdateEmployeeRecord(User employee, User newEmployeeDetails);

        //Task<bool> UpdateEmployeeRecordProperty(); 
        //Task<bool> DeleteEmployeeRecord(); 
    }
}
