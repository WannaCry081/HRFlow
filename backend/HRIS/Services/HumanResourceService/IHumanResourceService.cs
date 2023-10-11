using HRIS.dtos.EmployeeDto;
using HRIS.Dtos.EmployeeDto;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.HumanResourceService
{
    public interface IHumanResourceService
    {
        Task<User> CreateEmployeeRecord(Guid id, AddEmployeeRecordDto request);
        Task<GetEmployeeRecordDto> UpdateEmployeeRecords(Guid hrId, Guid employeeId, UpdateEmployeeRecordDto request);
        Task<bool> UpdateEmployeeRecord(Guid employeeId, JsonPatchDocument<User> request);
    }
}
