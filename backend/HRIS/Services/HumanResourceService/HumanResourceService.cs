using AutoMapper;
using HRIS.dtos.EmployeeDto;
using HRIS.Models;
using HRIS.Repositories.HumanResourceRepository;

namespace HRIS.Services.HumanResourceService
{
    public class HumanResourceService : IHumanResourceService
    {
        private readonly IMapper _mapper;
        private readonly IHumanResourceRepository _humanResourceRepository;

        public HumanResourceService(IMapper mapper, IHumanResourceRepository humanResourceRepository)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _humanResourceRepository = humanResourceRepository ?? throw new ArgumentNullException(nameof(humanResourceRepository));
        }

        public async Task<User> CreateEmployeeRecord(UpsertEmployeeDto request)
        {
            var employee = _mapper.Map<User>(request);
            var response = await _humanResourceRepository.CreateEmployeeRecord(employee);
            if (!response)
            {
                throw new Exception("Failed to add new employee record");
            }
            return employee;

        }

        public async Task<GetEmployeeDto> UpdateEmployeeRecord(Guid employeeId, UpsertEmployeeDto request)
        {
            var employee = await _humanResourceRepository.GetEmployee(employeeId);
            if(employee is null)
            {
               throw new Exception("Employee not found.");
            }
            var dbEmployee = _mapper.Map(request, employee);
            dbEmployee.Id = employeeId;

            var isEmployeeUpdated = await _humanResourceRepository.UpdateEmployeeRecord(dbEmployee);
            if (!isEmployeeUpdated)
            {
                throw new Exception("Failed to update employee record");
            }

            return _mapper.Map<GetEmployeeDto>(dbEmployee);

        }
    }
}
