using HRIS.Dtos.DepartmentDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Services.DepartmentService;
using HRIS.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize(Roles = "Human Resource")]
    [ApiController]
    [Route("/api/department")]
    public class DepartmentController : ControllerBase
    {
        private readonly ILogger<DepartmentController> _logger;
        private readonly IDepartmentService _departmentService;

        public DepartmentController(ILogger<DepartmentController> logger, IDepartmentService departmentService)
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
            _departmentService = departmentService ??
                throw new ArgumentNullException(nameof(departmentService));
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<IActionResult> GetDepartments()
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _departmentService.GetDepartments(hrId);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get department.");
                return Problem("Internal server error.");
            }
        }

        [HttpGet("{departmentId}")]
        [Produces("application/json")]
        public async Task<IActionResult> GetDepartment([FromRoute] Guid departmentId)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _departmentService.GetDepartment(hrId, departmentId);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get departments.");
                return Problem("Internal server error.");
            }
        }

        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> CreateDepartment([FromBody] CreateDepartmentDto request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _departmentService.CreateDepartment(hrId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (DepartmentExistsException ex)
            {
                _logger.LogError("An error occurred while attempting to add a department to the database.", ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to add a new department.");
                return Problem("Internal server error.");
            }
        }

        [HttpPatch("{departmentId}")]
        [Consumes("application/json")]
        [Produces("application/json")]

        public async Task<IActionResult> UpdateDepartment([FromRoute] Guid departmentId, [FromBody] JsonPatchDocument<Department> request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _departmentService.UpdateDepartment(hrId, departmentId, request);
                return Ok("Successfully updated department's information.");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (DepartmentUpdateFailException ex)
            {
                _logger.LogError("An error occurred while attempting to update department information.", ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update department information.");
                return Problem("Internal server error.");
            }

        }

        [HttpPut("{departmentId}")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateDepartments([FromRoute] Guid departmentId, [FromBody] UpdateDepartmentDto request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _departmentService.UpdateDepartments(hrId, departmentId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (DepartmentUpdateFailException ex)
            {
                _logger.LogError("An error occurred while attempting to update department information.", ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update department information.");
                return Problem("Internal server error.");
            }
        }

        [HttpDelete("{departmentId}")]
        public async Task<IActionResult> DeleteDepartment([FromRoute] Guid departmentId)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _departmentService.DeleteDepartment(hrId, departmentId);
                return Ok("Successfully deleted department.");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to delete department.");
                return Problem("Internal server error.");
            }
        }
    }
}
