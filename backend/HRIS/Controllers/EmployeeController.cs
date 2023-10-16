using HRIS.Dtos.EmployeeDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Services.EmployeeService;
using HRIS.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize(Roles = "Human Resource")]
    [ApiController]
    [Route("/api/employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly IEmployeeService _employeeService;

        public EmployeeController(ILogger<EmployeeController> logger, IEmployeeService humanResourceService)
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
            _employeeService = humanResourceService ??
                throw new ArgumentNullException(nameof(humanResourceService));
        }

        [HttpGet("{employeeId}")]
        [Produces("application/json")]
        public async Task<IActionResult> GetEmployeeRecord([FromRoute] Guid employeeId)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _employeeService.GetEmployeeRecord(hrId, employeeId);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get employee record.");
                return Problem("Internal server error.");
            }
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<IActionResult> GetEmployeeRecords()
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _employeeService.GetEmployeeRecords(hrId);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get employee records.");
                return Problem("Internal server error.");
            }
        }

        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> CreateEmployeeRecord([FromBody] AddEmployeeRecordDto request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _employeeService.CreateEmployeeRecord(hrId, request);
                return Ok(response);
            }
            catch (UserExistsException ex)
            {
                _logger.LogError("An error occurred while attempting to register employee to database.", ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while attempting to add a new employee record.");
                return Problem("Internal server error.");
            }
        }

        [HttpPatch("{employeeId}")]
        public async Task<IActionResult> UpdateEmployeeRecord([FromRoute] Guid employeeId, [FromBody] JsonPatchDocument<User> request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                 throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _employeeService.UpdateEmployeeRecord(hrId, employeeId, request);
                return Ok("Successfully updated employee's record.");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update employee record.");
                return Problem("Internal server error.");
            }
        }

        [HttpPut("{employeeId}")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateEmployeeRecords([FromRoute] Guid employeeId, [FromBody] UpdateEmployeeRecordDto request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _employeeService.UpdateEmployeeRecords(hrId, employeeId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update employee record.");
                return Problem("Internal server error.");
            }

        }
    }
}
