using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize(Roles = "Human Resource")]
    [ApiController]
    [Route("/api/applicant")]
    public class ApplicantController : ControllerBase
    {
        private readonly ILogger<ApplicantController> _logger;

        public ApplicantController(ILogger<ApplicantController> logger)
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        public Task<IActionResult> GetApplicants()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{applicantId}")]
        public Task<IActionResult> GetApplicant([FromRoute] Guid applicantId)
        {
            throw new NotImplementedException();
        }
    }
}
