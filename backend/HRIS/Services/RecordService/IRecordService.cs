using HRIS.Dtos;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.RecordService
{
    public interface IRecordService
    {
        Task<CreateRecordDto> CreateRecord(Guid hrId, CreateRecordDto request);
        Task<ICollection<GetRecordDto>> GetRecords(Guid hrId);
        Task<UpdateRecordDto> UpdateRecord(Guid hrId, Guid recordId, JsonPatchDocument<Record> request);


    }
}
