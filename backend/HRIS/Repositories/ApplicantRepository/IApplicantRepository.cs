using HRIS.Models;

namespace HRIS.Repositories.ApplicantRepository
{
    public interface IApplicantRepository
    {
        Task<User?> GetUserById(Guid userId);
        Task<ICollection<Applicant>> GetApplicantRecords(User user);
    }
}
