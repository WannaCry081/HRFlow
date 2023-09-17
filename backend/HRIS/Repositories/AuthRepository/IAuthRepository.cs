using HRIS.Models.AuthModels;

namespace HRIS.Repositories.AuthRepository
{
    public interface IAuthRepository
    {
        Task<string> SendEmail(ForgotPassword request);
        
    }
}
