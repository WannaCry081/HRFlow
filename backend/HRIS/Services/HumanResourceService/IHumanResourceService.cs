using HRIS.dtos.EmployeeDto;
using HRIS.Models;

namespace HRIS.Services.HumanResourceService
{
    public interface IHumanResourceService
    {
        Task<User> CreateEmployeeRecord(Guid id, UpsertEmployeeRecordDto request);
        Task<GetEmployeeRecordDto> UpdateEmployeeRecords(Guid employeeId, UpsertEmployeeRecordDto request);
    }
}
