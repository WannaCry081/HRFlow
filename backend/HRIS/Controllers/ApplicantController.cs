using HRIS.Dtos.ApplicantDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Services.ApplicantService;
using HRIS.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
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
        public async Task<IActionResult> GetApplicantRecord([FromRoute] Guid applicantId)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _applicantService.GetApplicantRecord(hrId, applicantId);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get user information.");
                return NotFound(ex.Message);
            }
            catch (ApplicantNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get applicant.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while attempting to get applicant records.");
                return Problem(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateApplicantRecord([FromBody] CreateApplicantRecordDto request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _applicantService.CreateApplicantRecord(hrId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get user information.");
                return NotFound(ex.Message);
            }
            catch (ApplicantExistsException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to add existing applicant.");
                return BadRequest(ex.Message);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to add new applicant.");
                return Problem(ex.Message);
            }
        }

        [HttpPatch("{applicantId}")]
        public async Task<IActionResult> UpdateApplicantRecord([FromRoute] Guid applicantId, [FromBody] JsonPatchDocument<Applicant> request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _applicantService.UpdateApplicantRecord(hrId, applicantId, request);
                if (!response)
                {
                    throw new Exception("Failed to update applicant's record.");
                }
                return Ok();
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update user information.");
                return NotFound(ex.Message);
            }
            catch (ApplicantNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update applicant.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update applicant record.");
                return Problem(ex.Message);
            }
        }

        [HttpPut("{applicantId}")]
        public async Task<IActionResult> UpdateApplicantRecords([FromRoute] Guid applicantId, [FromBody] UpdateApplicantRecordDto request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _applicantService.UpdateApplicantRecords(hrId, applicantId, request);
                if (!response)
                {
                    throw new Exception("Failed to update applicant's record.");
                }
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update user information.");
                return NotFound(ex.Message);
            }
            catch (ApplicantNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update applicant.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update applicant record.");
                return Problem(ex.Message);
            }
        }

        [HttpDelete("{applicantId}")]
        public async Task<IActionResult> DeleteApplicantRecord([FromRoute] Guid applicantId)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _applicantService.DeleteApplicantRecord(hrId, applicantId);
                if (!response)
                {
                    throw new Exception("Failed to delete applicant's record.");
                }
                return Ok("Successfully delete applicant's record.");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to delete user information.");
                return NotFound(ex.Message);
            }
            catch (ApplicantNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to delete applicant.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while attempting to delete applicant.");
                return Problem(ex.Message);
            }
        }
    }
}
