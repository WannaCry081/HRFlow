using HRIS.dtos.EmployeeDto;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.HumanResourceService
{
    public interface IHumanResourceService
    {
        Task<User> CreateEmployeeRecord(Guid id, UpsertEmployeeRecordDto request);
        Task<GetEmployeeRecordDto> UpdateEmployeeRecords(Guid hrId, Guid employeeId, UpsertEmployeeRecordDto request);
        Task<bool> UpdateEmployeeRecord(Guid employeeId, JsonPatchDocument<User> request);
    }
}
