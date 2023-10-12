using HRIS.Dtos.EmployeeDto;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.EmployeeService
{
    public interface IEmployeeService
    {
        Task<GetEmployeeRecordDto> CreateEmployeeRecord(Guid id, AddEmployeeRecordDto request);
        Task<GetEmployeeRecordDto> UpdateEmployeeRecords(Guid hrId, Guid employeeId, UpdateEmployeeRecordDto request);
        Task<bool> UpdateEmployeeRecord(Guid hrId, Guid employeeId, JsonPatchDocument<User> request);
    }
}
