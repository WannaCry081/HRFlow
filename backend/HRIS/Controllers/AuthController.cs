using HRIS.Dtos;
using HRIS.Services.AuthService;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [ApiController]
    [Route("/api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _services;

        public AuthController(IAuthService services) 
        {
            _services = services;
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
                //DataContext with SQL
                //if (user == null)
                //{
                //    return BadRequest("Invalid token.");
                //}

                var response = await _services.SendEmail(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Problem("An error occured while attempting to verify the user.");
            }

        }
    }
}
