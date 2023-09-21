using HRIS.Models;
using HRIS.Models.AuthModels;

namespace HRIS.Repositories.AuthRepository
{
    public interface IAuthRepository
    {
        Task<bool> AddUser(User request);
        Task<bool> IsEmailExists(string email);
        Task<string> SendEmail(ForgotPassword request);
    }
}
