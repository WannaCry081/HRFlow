using HRIS.Dtos;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.RecordService
{
    public interface IRecordService
    {
        Task<ICollection<GetRecordDto>> GetRecords(Guid userId);
        Task<GetRecordDto> CreateRecord(Guid userId);
        Task<bool> UpdateRecord(Guid userId, Guid recordId, JsonPatchDocument<Record> request);


    }
}
