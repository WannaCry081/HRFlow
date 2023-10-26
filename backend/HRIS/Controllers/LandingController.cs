using HRIS.Dtos.LandingDto;
using HRIS.Services.LandingService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("/api/landing")]
    public class LandingController : ControllerBase
    {
        private readonly ILogger<LandingController> _logger;
        private readonly ILandingService _landingService;

        public LandingController(ILogger<LandingController> logger, ILandingService landingService)
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
            _landingService = landingService ??
                throw new ArgumentNullException(nameof(landingService));
        }

        [HttpPost("contact-us")]
        [Consumes("application/json")]
        public async Task<IActionResult> ContactUs([FromBody] ContactUsDto request)
        {
            try
            {
                var response = await _landingService.ContactUs(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to send the email to the admin.", ex);
                return Problem("Internal server error.");
            }
        }
    }
}
