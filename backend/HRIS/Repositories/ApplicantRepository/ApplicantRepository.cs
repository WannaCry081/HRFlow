using HRIS.Context;
using HRIS.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace HRIS.Repositories.ApplicantRepository
{
    public class ApplicantRepository : IApplicantRepository
    {
        private readonly DataContext _context;

        public ApplicantRepository(DataContext context)
        {
            _context = context;   
        }

        public async Task<User?> GetUserById(Guid userId)
        {
            return await _context.Users.Where(
                c => c.Id.Equals(userId)).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Applicant>> GetApplicantRecords(User user)
        {
            return await _context.Applicants.Where(
                c => c.TeamId.Equals(user.TeamId)).ToListAsync();
        }

        public async Task<Applicant?> GetApplicantRecord(User user, Guid applicantId)
        {
            return await _context.Applicants.Where(
                c => c.TeamId.Equals(user.TeamId) && c.Id.Equals(applicantId))
                .FirstOrDefaultAsync();
        }

        public async Task<bool> IsApplicantExists(User user, Applicant applicant)
        {
            return await _context.Applicants.Where(
                c => user.TeamId.Equals(user.TeamId) && c.Email.Equals(applicant.Email))
                .AnyAsync();    
        }

        public async Task<bool> CreateApplicationRecord(User user, Applicant applicant)
        {
            _context.Applicants.Add(applicant);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
