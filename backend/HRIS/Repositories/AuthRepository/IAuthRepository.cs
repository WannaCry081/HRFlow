using HRIS.Models;
using HRIS.Dtos;
using HRIS.Models.AuthModels;

namespace HRIS.Repositories.AuthRepository
{
    public interface IAuthRepository
    {
        Task<bool> RegisterUser(User request);
        Task<bool> LoginUser(User request);
        Task<string> SendEmail(ForgotPassword request);
    }
}
