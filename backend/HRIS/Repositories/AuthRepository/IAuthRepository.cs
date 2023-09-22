using HRIS.Models;

namespace HRIS.Repositories.AuthRepository
{
    public interface IAuthRepository
    {
        Task<bool> AddUser(User request);
        Task<bool> IsEmailExists(string email);
        Task<User?> GetUserByEmail(string email);
    }
}
