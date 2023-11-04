using HRIS.Context;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;

namespace HRIS.Repositories.RecordRepository
{
    public class RecordRepository : IRecordRepository
    {
        private readonly DataContext _context;

        public RecordRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserById(Guid id)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<bool> CreateRecord(Record record)
        {
            _context.Records.Add(record);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Record?> GetRecordByDate(Guid userId, DateTime date)
        {
            return await _context.Records
                .Where(r => r.UserId == userId && r.ClockIn.Date == date.Date)
                .FirstOrDefaultAsync();
        }

        public async Task<ICollection<Record>> GetRecords(Guid userId)
        {
            return await _context.Records.Where(
                c => c.UserId.Equals(userId)).ToListAsync();
        }

        public async Task<bool> UpdateRecord(Record record, JsonPatchDocument<Record> request)
        {
            record.UpdatedAt = DateTime.UtcNow;
            request.ApplyTo(record);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Record?> GetRecordById(Guid userId, Guid recordId)
        {
            return await _context.Records.Where(
                c => c.UserId.Equals(userId) && c.Id.Equals(recordId)).FirstOrDefaultAsync();
        }
    }
}