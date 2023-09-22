using Microsoft.AspNetCore.Mvc;
using HRIS.Dtos;
using HRIS.Services.AuthService;
using HRIS.Exceptions;

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

        [HttpPost]
        [Route("/register")]
        public IActionResult RegisterUser([FromBody] RegisterUserDto request)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [Route("/login")]
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
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to login user.", ex);
                return Problem("An error occurred while processing login request. Please try again later.");
            }
        }

        [HttpPost]
        [Route("/forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto request)
        {
            try
            {
                var response = await _authService.SendEmail(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to verify the user.", ex);
                return Problem("An error occurred while processing your request. Please try again later.");
            }

        }
    }
}
