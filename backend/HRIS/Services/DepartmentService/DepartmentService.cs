using AutoMapper;
using HRIS.Dtos.DepartmentDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.DepartmentRepository;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.DepartmentService
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;

        public DepartmentService(IDepartmentRepository departmentRepository, IMapper mapper)
        {
            _departmentRepository = departmentRepository;
            _mapper = mapper;
        }

        public async Task<GetDepartmentDto> CreateDepartment(Guid hrId, CreateDepartmentDto request)
        {
            var hr = await _departmentRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var isDepartmentExists = await _departmentRepository.IsDepartmentExists(hr, request.Name);
            if (isDepartmentExists)
            {
                throw new DepartmentExistsException("Department already exists. Please try again.");
            }

            var department = _mapper.Map<Department>(request);
            department.TeamId = hr.TeamId ?? Guid.Empty;

            var response = await _departmentRepository.CreateDepartment(department);
            if (!response)
            {
                throw new Exception("Failed to add new department.");
            }

            return _mapper.Map<GetDepartmentDto>(department);

        }

        public async Task<bool> DeleteDepartment(Guid hrId, Guid departmentId)
        {
            var hr = await _departmentRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");
            var department = await _departmentRepository.GetDepartment(hr, departmentId) ??
                throw new DepartmentNotFoundException("Department does not exist. Please try again.");
            var response = await _departmentRepository.DeleteDepartment(department);
            if (!response)
            {
                throw new Exception("Failed to delete department.");
            }

            return response;
        }

        public async Task<GetDepartmentDto> GetDepartment(Guid hrId, Guid departmentId)
        {
            var hr = await _departmentRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");
            var department = await _departmentRepository.GetDepartment(hr, departmentId);
            return _mapper.Map<GetDepartmentDto>(department);
        }

        public async Task<ICollection<GetDepartmentDto>> GetDepartments(Guid hrId)
        {
            var hr = await _departmentRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");
            var departments = await _departmentRepository.GetDepartments(hr);
            return _mapper.Map<ICollection<GetDepartmentDto>>(departments);
        }

        public async Task<bool> UpdateDepartment(Guid hrId, Guid departmentId, JsonPatchDocument<Department> request)
        {
            var hr = await _departmentRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");
            var department = await _departmentRepository.GetDepartment(hr, departmentId) ??
                throw new DepartmentNotFoundException("Department does not exist. Please try again.");

            return await _departmentRepository.UpdateDepartment(department, request);
        }

        public async Task<GetDepartmentDto> UpdateDepartments(Guid hrId, Guid departmentId, UpdateDepartmentDto request)
        {
            var hr = await _departmentRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");
            var department = await _departmentRepository.GetDepartment(hr, departmentId) ??
                throw new DepartmentNotFoundException("Department does not exist. Please try again.");

            var dbDepartment = _mapper.Map<Department>(request);
            dbDepartment.Id = departmentId;
            dbDepartment.TeamId = hr.TeamId ?? Guid.Empty;

            var isDepartmentUpdated = await _departmentRepository.UpdateDepartments(department, dbDepartment);
            if (!isDepartmentUpdated)
            {
                throw new Exception("Failed to update department information.");
            }

            return _mapper.Map<GetDepartmentDto>(dbDepartment);
        }
    }
}
