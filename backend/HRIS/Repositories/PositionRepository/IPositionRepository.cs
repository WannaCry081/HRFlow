using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Repositories.PositionRepository
{
    public interface IPositionRepository
    {
        Task<bool> IsPositionExists(Guid departmentId, string title);
        Task<User?> GetUserById(Guid id);
        Task<Position?> GetPosition(User hr, Department department, Guid positionId);
        Task<ICollection<Position>> GetPositions(User hr, Department department);
        Task<bool> CreatePosition(Position position);
        Task<bool> UpdatePositions(Position position, Position request);
        Task<bool> UpdatePosition(Position position, JsonPatchDocument<Position> request);
        Task<bool> DeletePosition(User hr, Guid departmentId, Guid positionId);
    }
}