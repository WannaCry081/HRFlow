using HRIS.dtos.AuthDto;
using HRIS.Dtos.AuthDto;
using HRIS.Exceptions;
using HRIS.Services.AuthService;
using HRIS.Utils;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [ApiController]
    [Route("/api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;

        public AuthController(ILogger<AuthController> logger, IAuthService authService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
        }

        [HttpPost("register")]
        [Consumes("application/json")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto request)
        {
            try
            {
                var response = await _authService.RegisterUser(request);
                return Ok(response);
            }
            catch (UserExistsException ex)
            {
                _logger.LogError("An error occurred while attempting to register user to database.", ex);
                return BadRequest("An error occurred while registering duplicate records.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to register user. ", ex);
                return Problem("An error occurred while processing login request. Please try again later.");
            }
        }

        [HttpPost("login")]
        [Consumes("application/json")]
        public async Task<IActionResult> LoginUser([FromBody] LoginUserDto request)
        {
            try
            {
                var response = await _authService.LoginUser(request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while getting user.");
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning("An error occurred while attempting to force user credential.", ex);
                return Unauthorized("An error occurred while logging in.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to login user.", ex);
                return Problem("An error occurred while processing login request. Please try again later.");
            }
        }

        [HttpPost("forgot-password")]
        [Consumes("application/json")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto request)
        {
            try
            {
                var response = await _authService.ForgotPassword(request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while finding user.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to verify the user.", ex);
                return Problem("An error occurred while processing your request. Please try again later.");
            }
        }

        [HttpPost("forgot-password/verification")]
        [Consumes("application/json")]
        public async Task<IActionResult> VerifyPassword([FromBody] OTPDto request)
        {
            try
            {
                var response = await _authService.VerifyPassword(request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while finding user.");
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning("An error occurred while attempting to force user credential.", ex);
                return Unauthorized("An error occurred while processing OTP code.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to verify OTP password.", ex);
                return Problem("An error occurred while verifying OTP code. Please try again later.");
            }
        }

        [HttpPost("send-email")]
        [Consumes("application/json")]
        public async Task<IActionResult> SendEmailToAdmin([FromBody] ContactAdminDto request)
        {
           try
           {
               var response = await _authService.SendEmailToAdmin(request);
               return Ok(response);
           }
           catch (Exception ex)
           {
               _logger.LogCritical("An error occurred while attempting to send the email to the admin.", ex);
               return Problem("An error occurred while sending an email to the admin. Please try again later.");
           }
        }

        [HttpPut("forgot-password/reset-password")]
        [Consumes("application/json")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto request)
        {
            try
            {
                var response = await _authService.ResetPassword(request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while finding user.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to update user password. ", ex);
                return Problem("An error occurred while processing reset password request. Please try again later.");
            }
        }

        [HttpPut("generate-team-code")]
        [Produces("application/json")]
        public async Task<IActionResult> GenerateTeamCode([FromBody] GenerateTeamCodeDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user.");
                var response = await _authService.GenerateTeamCode(userId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while finding user.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to generate team code. ", ex);
                return Problem("An error occurred while processing team code request. Please try again later.");
            }
        }

        [HttpPut("join-team")]
        [Produces("application/json")]
        public async Task<IActionResult> JoinTeamWithCode([FromBody] JoinWithTeamCodeDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user.");
                var response = await _authService.JoinTeamWithCode(userId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while finding user.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to join a team. ", ex);
                return Problem("An error occurred while processing team entry request. Please try again later.");
            }
        }


    }
}
