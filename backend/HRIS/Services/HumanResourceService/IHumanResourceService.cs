using HRIS.dtos.EmployeeDto;
using HRIS.Models;

namespace HRIS.Services.HumanResourceService
{
    public interface IHumanResourceService
    {
        Task<User> CreateEmployeeRecord(UpsertEmployeeDto request);
        Task<GetEmployeeDto> UpdateEmployeeRecord(Guid employeeId, UpsertEmployeeDto request);
    }
}
