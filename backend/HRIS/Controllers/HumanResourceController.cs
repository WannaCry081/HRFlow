using HRIS.dtos.EmployeeDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.AuthRepository;
using HRIS.Services.HumanResourceService;
using HRIS.Services.UserService;
using HRIS.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/human-resource")]
    public class HumanResourceController : ControllerBase
    {
        private readonly ILogger<HumanResourceController> _logger;
        private readonly IHumanResourceService _humanResourceService;
        private readonly IAuthRepository _authRepository;
        public HumanResourceController(ILogger<HumanResourceController> logger, IHumanResourceService humanResourceService, IAuthRepository authRepository)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _humanResourceService = humanResourceService ?? throw new ArgumentNullException(nameof(humanResourceService));
            _authRepository = authRepository ?? throw new ArgumentNullException(nameof(authRepository));
        }

        [HttpGet("{id}")]
        public Task<IActionResult> GetEmployeeRecord()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployeeRecords(Guid id)
        {
            throw new NotImplementedException();
        }

        [HttpPost("add-employee")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> CreateEmployeeRecord([FromBody] UpsertEmployeeRecordDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user.");
                var response = await _humanResourceService.CreateEmployeeRecord(userId, request);
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
        public async Task<IActionResult> UpdateEmployeeRecord([FromRoute] Guid employeeId, JsonPatchDocument<User> request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                 throw new UserNotFoundException("Invalid user.");

                var response = await _humanResourceService.UpdateEmployeeRecord(employeeId, request);
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
        public async Task<IActionResult> UpdateEmployeeRecords([FromRoute] Guid employeeId, [FromBody] UpsertEmployeeRecordDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user.");
                var employee = await _humanResourceService.UpdateEmployeeRecords(userId, employeeId, request);
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
