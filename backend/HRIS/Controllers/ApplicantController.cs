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
        public Task<IActionResult> GetApplicantRecords()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{applicantId}")]
        public Task<IActionResult> GetApplicantRecord([FromRoute] Guid applicantId)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public Task<IActionResult> CreateApplicantRecord()
        {
            throw new NotImplementedException();
        }

        [HttpPatch("{applicantId}")]
        public Task<IActionResult> UpdateApplicantRecord([FromRoute] Guid applicantId)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{applicantId}")]
        public Task<IActionResult> UpdateApplicantRecords([FromRoute] Guid applicantId)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{applicantId}")]
        public Task<IActionResult> DeleteApplicantRecord([FromRoute] Guid applicantId)
        {
            throw new NotImplementedException();
        }
    }
}
