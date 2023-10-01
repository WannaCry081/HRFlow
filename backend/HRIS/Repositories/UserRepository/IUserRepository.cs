using HRIS.Models;
using Microsoft.AspNetCore.Identity;

namespace HRIS.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<User?> GetUserById(Guid id);
        Task<bool> UpdateUserProfile(User user, User request);
    }
}
