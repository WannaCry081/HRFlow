using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [ApiController]
    [Route("/api/auth")]
    public class AuthController : ControllerBase
    {
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
