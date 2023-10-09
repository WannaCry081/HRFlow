using HRIS.dtos.EmployeeDto;
using HRIS.Services.HumanResourceService;
using HRIS.Services.UserService;
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
        public async Task<IActionResult> CreateEmployeeRecord([FromBody] UpsertEmployeeDto request)
        {
            try
            {
                var response = await _humanResourceService.CreateEmployeeRecord(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An error occurred while attempting to add a new employee record.");
                return Problem(ex.Message);
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
        public async Task<IActionResult> UpdateEmployeeRecords(Guid employeeId, UpsertEmployeeDto request)
        {
            try
            {
                var employee = await _humanResourceService.UpdateEmployeeRecord(employeeId, request);
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
