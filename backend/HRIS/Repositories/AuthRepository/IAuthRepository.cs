using HRIS.Models;

namespace HRIS.Repositories.AuthRepository
{
    public interface IAuthRepository
    {
        Task<bool> AddUser(User request);
        Task<bool> IsEmailExists(string email);
        Task<User?> GetUserByEmail(string email);
        Task<User?> GetUserById(Guid id); 
        Task<bool> UpdateUserCode(User user, string code);
        Task<bool> UpdateUserPassword(User request, string email);
    }
}
