using HRIS.Models;
using Microsoft.AspNetCore.Mvc;
using HRIS.Services.RecordService;
using HRIS.Dtos;
using HRIS.Exceptions;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Authorization;

namespace HRIS.Controllers
{
    [Authorize(Roles = "Human Resource")]
    [ApiController]
    [Route("/api/record")]
    public class RecordController : ControllerBase
    {
        private readonly ILogger<RecordController> _logger;
        private readonly IRecordService _recordService;

        public RecordController(ILogger<RecordController> logger, IRecordService recordService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _recordService = recordService ?? throw new ArgumentNullException(nameof(recordService));
        }

        [HttpGet("{userId}")]
        [Consumes("application/json")]
        public async Task<IActionResult> GetRecords(Guid userId)
        {
            try
            {
                var response = await _recordService.GetRecords(userId);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to create a record.");
                return NotFound(ex.Message);
            }

        }

        [HttpPost("{userId}")]
        [Consumes("application/json")]
        public async Task<IActionResult> CreateRecord([FromRoute] Guid userId, [FromBody] CreateRecordDto request)
        {
            try
            {
                var response = await _recordService.CreateRecord(userId, request);
                return Ok("Record created successfully");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to create a record.");
                return NotFound(ex.Message);
            }
            catch (RecordExistsException ex)
            {
                _logger.LogError(ex, "User already have clocked in for today.");
                return NotFound(ex.Message);
            }
        }

        [HttpPatch("{recordId}")]
        [Consumes("application/json")]
        public async Task<IActionResult> UpdateRecord([FromRoute] Guid hrId, [FromRoute] Guid recordId, [FromBody] JsonPatchDocument<Record> request)
        {
            try
            {
                var response = await _recordService.UpdateRecord(hrId, recordId, request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update the record.");
                return Problem("Internal server error.");
            }
        }


    }
}