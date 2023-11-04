using HRIS.Models;

namespace HRIS.Repositories.ApplicantRepository
{
    public interface IApplicantRepository
    {
        Task<User?> GetUserById(Guid userId);
        Task<ICollection<Applicant>> GetApplicantRecords(User user);
        Task<Applicant?> GetApplicantRecord(User user, Guid applicantId);
        Task<bool> IsApplicantExists(User user, Applicant applicant);
        Task<bool> CreateApplicationRecord(User user, Applicant applicant);
        Task<bool> DeleteApplicantRecord(Applicant applicant);
    }
}
