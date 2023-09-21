using HRIS.Dtos;

namespace HRIS.Services.AuthService
{
    public interface IAuthService
    {
        Task<string> RegisterUser(RegisterUserDto request);
        Task<string> LoginUser(LoginUserDto request);
        Task<string> SendEmail(ForgotPasswordDto request);
    }
}
