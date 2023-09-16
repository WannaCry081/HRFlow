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
        public IActionResult ForgotPassword()
        {
            throw new NotImplementedException();
        }
    }
}
