using HRIS.dtos.AuthDto;
using HRIS.Dtos.AuthDto;

namespace HRIS.Services.AuthService
{
    public interface IAuthService
    {
        Task<string> RegisterUser(RegisterUserDto request);
        Task<string> LoginUser(LoginUserDto request);
        Task<string> ForgotPassword(ForgotPasswordDto request);
        Task<string> VerifyPassword(OTPDto request);
        Task<string> SendEmailToAdmin(ContactAdminDto request);
        Task<string> ResetPassword(ResetPasswordDto request);
        Task<string> GenerateTeamCode(Guid id, GenerateTeamCodeDto request);
    }
 }
