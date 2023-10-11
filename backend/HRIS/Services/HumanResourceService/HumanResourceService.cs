using AutoMapper;
using HRIS.dtos.EmployeeDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.AuthRepository;
using HRIS.Repositories.HumanResourceRepository;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.HumanResourceService
{
    public class HumanResourceService : IHumanResourceService
    {
        private readonly IMapper _mapper;
        private readonly IHumanResourceRepository _humanResourceRepository;
        private readonly IAuthRepository _authRepository;

        public HumanResourceService(IMapper mapper, IHumanResourceRepository humanResourceRepository, IAuthRepository authRepository)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _humanResourceRepository = humanResourceRepository ?? throw new ArgumentNullException(nameof(humanResourceRepository));
            _authRepository = authRepository ?? throw new ArgumentNullException(nameof(authRepository));
        }

        public async Task<User> CreateEmployeeRecord(Guid id, UpsertEmployeeRecordDto request)
        {
            var isEmployeeExists = await _authRepository.IsEmailExists(request.CompanyEmail);
            if (isEmployeeExists)
            {
                throw new UserExistsException("Employee is already recorded to the database.");
            }

            var employee = _mapper.Map<User>(request);

            var response = await _humanResourceRepository.CreateEmployeeRecord(id, employee);
            if (!response)
            {
                throw new Exception("Failed to add new employee record");
            }
            return employee;
        }

        public async Task<bool> UpdateEmployeeRecord(Guid employeeId, JsonPatchDocument<User> request)
        {
            //var hr = await _authRepository.GetUserById(hrId);
            var employee = await _authRepository.GetUserById(employeeId);
            if(employee is null)
            {
                throw new UserNotFoundException("Employee not found.");
            }

           // employee.UpdatedBy = hr.FirstName + " " + hr.LastName;

            var response = await _humanResourceRepository.UpdateEmployeeRecord(employee, request);
            if (!response)
            {
                throw new Exception("Failed to update employee record.");
            }
            return response;
        }

        public async Task<GetEmployeeRecordDto> UpdateEmployeeRecords(Guid hrId, Guid employeeId, UpsertEmployeeRecordDto request)
        {
            var hr = await _authRepository.GetUserById(hrId);
            var employee = await _authRepository.GetUserById(employeeId);
            if (employee is null)
            {
                throw new UserNotFoundException("Employee not found.");
            }

            var dbEmployee = _mapper.Map(request, employee);
            dbEmployee.Id = employeeId;
            dbEmployee.UpdatedBy = hr.FirstName + " " + hr.LastName;

            var isEmployeeUpdated = await _humanResourceRepository.UpdateEmployeeRecords(dbEmployee);
            if (!isEmployeeUpdated)
            {
                throw new Exception("Failed to update employee record.");
            }

            return _mapper.Map<GetEmployeeRecordDto>(dbEmployee);
        }
    }
}
