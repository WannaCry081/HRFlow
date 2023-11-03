using HRIS.Dtos.AuthDto;
using HRIS.Exceptions;
using HRIS.Services.AuthService;
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
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
            _authService = authService ??
                throw new ArgumentNullException(nameof(authService));
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
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to register user. ", ex);
                return Problem("Internal server error.");
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
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning("An error occurred while attempting to force user credential.", ex);
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to login user.", ex);
                return Problem("Internal server error.");
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
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to verify the user.", ex);
                return Problem("Internal server error");
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
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning("An error occurred while attempting to force user credential.", ex);
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to verify OTP password.", ex);
                return Problem("Internal server error");
            }
        }
    }
}
