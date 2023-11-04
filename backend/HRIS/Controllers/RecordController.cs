using HRIS.Dtos;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Services.RecordService;
using HRIS.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/record")]
    public class RecordController : ControllerBase
    {
        private readonly ILogger<RecordController> _logger;
        private readonly IRecordService _recordService;

        public RecordController(ILogger<RecordController> logger, IRecordService recordService)
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
            _recordService = recordService ??
                throw new ArgumentNullException(nameof(recordService));
        }

        [HttpGet]
        [Consumes("application/json")]
        public async Task<IActionResult> GetRecords()
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                 throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _recordService.GetRecords(userId);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to create a record.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while attempting to get the records.");
                return Problem(ex.Message);
            }
        }

        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> CreateRecord()
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                 throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _recordService.CreateRecord(userId);
                return Ok("Record created successfully");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to create a record.");
                return NotFound(ex.Message);
            }
            catch (RecordExistsException ex)
            {
                _logger.LogError(ex, "An error error occurred while attempting to create another record.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while attempting to create a record.");
                return Problem(ex.Message);
            }
        }

        [HttpPatch("{recordId}")]
        [Consumes("application/json")]
        public async Task<IActionResult> UpdateRecord([FromRoute] Guid recordId, [FromBody] JsonPatchDocument<Record> request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                 throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _recordService.UpdateRecord(userId, recordId, request);
                if (!response)
                {
                    throw new Exception("Failed to update information.");
                }
                return Ok("Successfully updated user's record.");
            }
            catch (RecordNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get user's record"); 
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while attempting to update the record.");
                return Problem("Internal server error.");
            }
        }
    }
}