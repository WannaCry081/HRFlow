using HRIS.Dtos;

namespace HRIS.Services.AuthService
{
    public interface IAuthService
    {
        Task<string> SendEmail(ForgotPasswordDto request);
    }
}
