using Microsoft.AspNetCore.Mvc;
using HRIS.Dtos;
using HRIS.Services.AuthService;

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
        public IActionResult Register()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [Route("/login")]
        public IActionResult Login()
        {
            throw new NotImplementedException();
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
                _logger.LogCritical("An error occured while attempting to verify the user.", ex);
                return Problem("An error occurred while processing your request. Please try again later.");
            }

        }
    }
}
