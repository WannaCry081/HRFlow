using HRIS.Context;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;

namespace HRIS.Repositories.PositionRepository
{
    public class PositionRepository : IPositionRepository
    {
        private readonly DataContext _context;

        public PositionRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User?> GetUserById(Guid id)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<bool> IsPositionExists(Guid departmentId, string title)
        {
            return await _context.Positions.Where(
                c => c.DepartmentId.Equals(departmentId) && c.Title.Equals(title)).AnyAsync();
        }

        public async Task<bool> CreatePosition(Position position)
        {
            _context.Positions.Add(position);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeletePosition(Position position)
        {
            _context.Positions.Remove(position);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Position?> GetPosition(User hr, Department department, Guid positionId)
        {
            return await _context.Positions.Where(
                c => c.Id.Equals(positionId) &&
                c.DepartmentId.Equals(department.Id)).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Position>> GetPositions(User hr, Department department)
        {
            return await _context.Positions.Where(
                    c => c.DepartmentId.Equals(department.Id)).ToListAsync();
        }

        public async Task<bool> UpdatePosition(Position position, JsonPatchDocument<Position> request)
        {
            request.ApplyTo(position);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdatePositions(Position position, Position request)
        {
            position.Title = request.Title;
            position.Description = request.Description;
            position.Type = request.Type;

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
