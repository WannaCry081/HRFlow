using AutoMapper;
using HRIS.Dtos.PositionDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.DepartmentRepository;
using HRIS.Repositories.PositionRepository;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.PositionService
{
    public class PositionService : IPositionService
    {
        private readonly IPositionRepository _positionRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;

        public PositionService(IPositionRepository positionRepository, IDepartmentRepository departmentRepository, IMapper mapper)
        {
            _positionRepository = positionRepository;
            _departmentRepository = departmentRepository;
            _mapper = mapper;
        }

        public async Task<GetPositionDto> CreatePosition(Guid hrId, Guid departmentId, CreatePositionDto request)
        {
            var hr = await _positionRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var department = await _departmentRepository.GetDepartment(hr, departmentId) ??
                throw new DepartmentNotFoundException("Department not found. Please try again.");

            var isPositionExists = await _positionRepository.IsPositionExists(department.Id, request.Title);
            if (isPositionExists)
            {
                throw new PositionExistsException("Position already exists. Please try again.");
            }

            var position = _mapper.Map<Position>(request);
            position.DepartmentId = department.Id;

            var response = await _positionRepository.CreatePosition(position);
            if (!response)
            {
                throw new Exception("Failed to add new position.");
            }

            return _mapper.Map<GetPositionDto>(position);
        }

        public async Task<bool> DeletePosition(Guid hrId, Guid departmentId, Guid positionId)
        {
            var hr = await _positionRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");
            var department = await _departmentRepository.GetDepartment(hr, departmentId) ??
                throw new DepartmentNotFoundException("Department not found. Please try again.");

            var response = await _positionRepository.DeletePosition(hr, department.Id, positionId);
            if (!response)
            {
                throw new Exception("Failed to delete department.");
            }

            return response;
        }

        public async Task<GetPositionDto> GetPosition(Guid hrId, Guid departmentId, Guid positionId)
        {
            var hr = await _positionRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");
            var department = await _departmentRepository.GetDepartment(hr, departmentId) ??
                throw new DepartmentNotFoundException("Department not found. Please try again.");

            var position = await _positionRepository.GetPosition(hr, department.Id, positionId);
            return _mapper.Map<GetPositionDto>(position);
        }

        public async Task<ICollection<GetPositionDto>> GetPositions(Guid hrId, Guid departmentId)
        {
            var hr = await _positionRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");
            var department = await _departmentRepository.GetDepartment(hr, departmentId) ??
                throw new DepartmentNotFoundException("Department not found. Please try again.");

            var positions = await _positionRepository.GetPositions(hr, department.Id);
            return _mapper.Map<ICollection<GetPositionDto>>(positions);
        }

        public async Task<bool> UpdatePosition(Guid hrId, Guid departmentId, Guid positionId, JsonPatchDocument<Position> request)
        {
            var hr = await _positionRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");
            var department = await _departmentRepository.GetDepartment(hr, departmentId) ??
                throw new DepartmentNotFoundException("Department not found. Please try again.");
            var position = await _positionRepository.GetPosition(hr, department.Id, positionId) ??
                throw new PositionNotFoundException("Position not found. Please try again.");

            return await _positionRepository.UpdatePosition(position, request);
        }

        public async Task<GetPositionDto> UpdatePositions(Guid hrId, Guid departmentId, Guid positionId, UpdatePositionDto request)
        {
            var hr = await _positionRepository.GetUserById(hrId) ??
               throw new UserNotFoundException("Invalid email address. Please try again.");
            var department = await _departmentRepository.GetDepartment(hr, departmentId) ??
                throw new DepartmentNotFoundException("Department not found. Please try again.");
            var position = await _positionRepository.GetPosition(hr, department.Id, positionId) ??
                throw new PositionNotFoundException("Position not found. Please try again.");

            var dbPosition = _mapper.Map<Position>(request);
            dbPosition.Id = positionId;
            dbPosition.DepartmentId = department.Id;

            var isPositionUpdated = await _positionRepository.UpdatePositions(position, dbPosition);
            if (!isPositionUpdated)
            {
                throw new Exception("Failed to update position information.");
            }

            return _mapper.Map<GetPositionDto>(dbPosition);
        }
    }
}
