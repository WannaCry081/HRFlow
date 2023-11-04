using Azure;
using HRIS.Context;
using HRIS.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.JsonPatch;
using HRIS.Dtos;

namespace HRIS.Repositories.RecordRepository
{
    public class RecordRepository : IRecordRepository
    {
        private readonly DataContext _context;

        public RecordRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<User?> GetUserById(Guid id)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<Record?> GetUserByRecord(Guid id)
        {
            return await _context.Records.Where(
                c => c.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<bool> CreateRecord(Record record)
        {
            _context.Records.Add(record);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Record?> GetRecordByUserIdAndDate(Guid userId, DateTime date)
        {
            return await _context.Records
                .Where(r => r.UserId == userId && r.ClockIn.Date == date.Date)
                .FirstOrDefaultAsync();
        }

        public async Task<ICollection<Record>> GetRecords(Guid id)
        {
            return await _context.Records.Where(
                c => c.UserId.Equals(id)).ToListAsync();
        }

        public async Task<bool> UpdateRecord(Record record, JsonPatchDocument<Record> request)
        {
            record.ClockOut = DateTime.Now;
            record.Day = DateTime.Now.ToString("dddd");
            record.Month = DateTime.Now.ToString("MMMM");
            record.Year = DateTime.Now.ToString("yyyy");
            record.UpdatedAt = DateTime.Now;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}