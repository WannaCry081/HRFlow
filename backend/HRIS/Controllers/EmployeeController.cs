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

        [HttpGet("{id}")]
        public Task<IActionResult> GetEmployeeRecord()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public Task<IActionResult> GetEmployeeRecords(Guid id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> CreateEmployeeRecord([FromBody] AddEmployeeRecordDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user.");

                var response = await _employeeService.CreateEmployeeRecord(userId, request);
                return Ok(response);
            }
            catch (UserExistsException ex)
            {
                _logger.LogError("An error occurred while attempting to register employee to database.", ex);
                return BadRequest("An error occurred while registering duplicate records.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while attempting to add a new employee record.");
                return Problem("An error occurred while processing employee creation request. Please try again later.");
            }
        }

        [HttpPatch("{employeeId}")]
        public async Task<IActionResult> UpdateEmployeeRecord([FromRoute] Guid employeeId, [FromBody] JsonPatchDocument<User> request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                 throw new UserNotFoundException("Invalid user.");

                var response = await _employeeService.UpdateEmployeeRecord(hrId, employeeId, request);
                return Ok("Successfully updated employee's record.");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound("An error occurred while finding employee.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update employee record.");
                return Problem(ex.Message);
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
                    throw new UserNotFoundException("Invalid user.");

                var employee = await _employeeService.UpdateEmployeeRecords(hrId, employeeId, request);
                return Ok(employee);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound("An error occurred while finding employee.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update employee record.");
                return Problem("An error occurred while processing employee update request. Please try again later.");
            }

        }
    }
}
