using HRIS.dtos.EmployeeDto;
using HRIS.Exceptions;
using HRIS.Services.HumanResourceService;
using HRIS.Services.UserService;
using HRIS.Utils;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IUserService _userService;
        public HumanResourceController(ILogger<HumanResourceController> logger, IHumanResourceService humanResourceService, IUserService userService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _humanResourceService = humanResourceService ?? throw new ArgumentNullException(nameof(humanResourceService));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
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

        [HttpPatch("{id}")]
        public Task<IActionResult> UpdateEmployeeRecord()
        {
            throw new NotImplementedException();
        }

        [HttpPut("{employeeId}")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateEmployeeRecords(Guid employeeId, UpsertEmployeeRecordDto request)
        {
            try
            {
                var employee = await _humanResourceService.UpdateEmployeeRecords(employeeId, request);
                return Ok(employee);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occured while attempting to update employee record.");
                return Problem(ex.Message);
            }
        }
    }
}
