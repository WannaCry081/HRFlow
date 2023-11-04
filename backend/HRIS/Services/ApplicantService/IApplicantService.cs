using HRIS.Dtos.ApplicantDto;

namespace HRIS.Services.ApplicantService
{
    public interface IApplicantService
    {
        Task<ICollection<GetApplicantDto>> GetApplicantRecords(Guid hrId);
        Task<GetApplicantDto> GetApplicantRecord(Guid hrId, Guid applicantId);
    }
}
