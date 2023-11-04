using HRIS.Dtos;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Repositories.RecordRepository
{
    public interface IRecordRepository
    {
        Task<User?> GetUserById(Guid id);
        Task<ICollection<Record>> GetRecords(Guid userId);
        Task<Record?> GetRecordById(Guid userId, Guid recordId);
        Task<bool> CreateRecord(Record record);
        Task<Record?> GetRecordByDate(Guid userId, DateTime date);
        Task<bool> UpdateRecord(Record record, JsonPatchDocument<Record> request);
    }
}
