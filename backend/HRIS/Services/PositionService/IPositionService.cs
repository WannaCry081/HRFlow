using HRIS.Dtos.PositionDto;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.PositionService
{
    public interface IPositionService
    {
        Task<GetPositionDto> CreatePosition(Guid hrId, Guid departmentId, CreatePositionDto request);
        Task<GetPositionDto> GetPosition(Guid hrId, Guid departmentId, Guid positionId);
        Task<ICollection<GetPositionDto>> GetPositions(Guid hrId, Guid departmentId);
        Task<GetPositionDto> UpdatePositions(Guid hrId, Guid departmentId, Guid positionId, UpdatePositionDto request);
        Task<bool> UpdatePosition(Guid hrId, Guid departmentId, Guid positionId, JsonPatchDocument<Position> request);
        Task<bool> DeletePosition(Guid hrId, Guid departmentId, Guid positionId);
    }
}
