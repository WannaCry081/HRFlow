using HRIS.Exceptions;
using HRIS.Services.ApplicantService;
using HRIS.Utils;
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
        private readonly IApplicantService _applicantService;

        public ApplicantController(ILogger<ApplicantController> logger, IApplicantService applicantService)
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
            _applicantService = applicantService ??
                throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        public async Task<IActionResult> GetApplicantRecords()
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _applicantService.GetApplicantRecords(hrId);
                return Ok(response);
            } 
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get user information.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while attempting to get applicant records.");
                return Problem(ex.Message);
            }
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
