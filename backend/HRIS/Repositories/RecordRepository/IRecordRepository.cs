using HRIS.Dtos;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Repositories.RecordRepository
{
    public interface IRecordRepository
    {
        Task<User?> GetUserById(Guid id);
        Task<Record?> GetUserByRecord(Guid id);
        Task<bool> CreateRecord(Record record);
        Task<Record?> GetRecordByUserIdAndDate(Guid userId, DateTime date);
        Task<ICollection<Record>> GetRecords(Guid id);
        Task<bool> UpdateRecord(Record record, JsonPatchDocument<Record> request);
    }
}
