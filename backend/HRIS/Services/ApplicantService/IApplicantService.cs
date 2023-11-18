using Microsoft.AspNetCore.JsonPatch;
using HRIS.Dtos.ApplicantDto;
using HRIS.Models;

namespace HRIS.Services.ApplicantService
{
    public interface IApplicantService
    {
        Task<ICollection<GetApplicantRecordDto>> GetApplicantRecords(Guid hrId);
        Task<GetApplicantRecordDto> GetApplicantRecord(Guid hrId, Guid applicantId);
        Task<GetApplicantRecordDto> CreateApplicantRecord(Guid hrId, CreateApplicantRecordDto request);
        Task<bool> DeleteApplicantRecord(Guid hrId, Guid applicantId);
        Task<bool> UpdateApplicantRecords(Guid hrId, Guid applicantId, UpdateApplicantRecordDto request);
        Task<bool> UpdateApplicantRecord(Guid hrId, Guid applicantId, JsonPatchDocument<Applicant> request);
    }
}
