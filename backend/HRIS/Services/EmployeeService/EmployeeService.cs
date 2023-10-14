using AutoMapper;
using HRIS.Dtos.EmployeeDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.EmployeeRepository;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.EmployeeService
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IMapper _mapper;
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IMapper mapper, IEmployeeRepository employeeRepository)
        {
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
            _employeeRepository = employeeRepository ??
                throw new ArgumentNullException(nameof(employeeRepository));
        }

        public async Task<GetEmployeeRecordDto> GetEmployeeRecord(Guid hrId, Guid employeeId)
        {
            var hr = await _employeeRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Employee is not found in the database.");
            var employee = await _employeeRepository.GetEmployeeRecord(hr, employeeId);
            return _mapper.Map<GetEmployeeRecordDto>(employee);
        }

        public async Task<ICollection<GetEmployeeRecordDto>> GetEmployeeRecords(Guid hrId)
        {
            var hr = await _employeeRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("HR is not recorded in the database.");

            var employees = await _employeeRepository.GetEmployeeRecords(hr);
            return _mapper.Map<ICollection<GetEmployeeRecordDto>>(employees);
        }

        public async Task<GetEmployeeRecordDto> CreateEmployeeRecord(Guid hrId, AddEmployeeRecordDto request)
        {
            var hr = await _employeeRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("HR is not recorded in the database.");

            var isEmployeeExists = await _employeeRepository.IsEmailExists(request.CompanyEmail);
            if (isEmployeeExists)
            {
                throw new UserExistsException("Employee is already recorded in the database.");
            }

            var employee = _mapper.Map<User>(request);
            employee.Role = "Employee";
            employee.Status = "Active";
            employee.CreatedBy = hr.FirstName + " " + hr.LastName;
            employee.GroupCode = hr.GroupCode;
            employee.TeamId = hr.TeamId;

            var response = await _employeeRepository.CreateEmployeeRecord(employee);
            if (!response)
            {
                throw new Exception("Failed to add new employee record.");
            }
            return _mapper.Map<GetEmployeeRecordDto>(employee);
        }

        public async Task<bool> UpdateEmployeeRecord(Guid hrId, Guid employeeId, JsonPatchDocument<User> request)
        {
            var hr = await _employeeRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("HR is not recorded in the database.");

            var employee = await _employeeRepository.GetUserById(employeeId) ??
                throw new UserNotFoundException("Employee is not recorded in the database.");

            employee.UpdatedBy = hr.FirstName + " " + hr.LastName;
            employee.UpdatedAt = DateTime.Now;

            var response = await _employeeRepository.UpdateEmployeeRecord(employee, request);
            if (!response)
            {
                throw new Exception("Failed to update employee record.");
            }
            return response;
        }

        public async Task<GetEmployeeRecordDto> UpdateEmployeeRecords(Guid hrId, Guid employeeId, UpdateEmployeeRecordDto request)
        {
            var hr = await _employeeRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("HR is not recorded in the database.");

            var employee = await _employeeRepository.GetUserById(employeeId) ??
                throw new UserNotFoundException("Employee is not recorded in the database.");

            var dbEmployee = _mapper.Map<User>(request);
            dbEmployee.UpdatedBy = hr.FirstName + " " + hr.LastName;

            var isEmployeeUpdated = await _employeeRepository.UpdateEmployeeRecords(employee, dbEmployee);
            if (!isEmployeeUpdated)
            {
                throw new Exception("Failed to update employee record.");
            }

            return _mapper.Map<GetEmployeeRecordDto>(dbEmployee);
        }
    }
}
