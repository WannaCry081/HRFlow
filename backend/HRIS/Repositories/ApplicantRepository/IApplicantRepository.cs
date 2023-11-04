using HRIS.Models;

namespace HRIS.Repositories.ApplicantRepository
{
    public interface IApplicantRepository
    {
        Task<User?> GetUserById(Guid userId);
        Task<ICollection<Applicant>> GetApplicantRecords(User user);
        Task<Applicant?> GetApplicantRecord(User user, Guid applicantId);
    }
}
