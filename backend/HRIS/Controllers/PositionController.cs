using HRIS.Dtos.PositionDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Services.PositionService;
using HRIS.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize(Roles = "Human Resource")]
    [ApiController]
    [Route("/api/department/{departmentId}/position")]
    public class PositionController : ControllerBase
    {
        private readonly ILogger<PositionController> _logger;
        private readonly IPositionService _positionService;

        public PositionController(ILogger<PositionController> logger, IPositionService positionService)
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
            _positionService = positionService ??
                throw new ArgumentException(nameof(positionService));
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<IActionResult> GetPositions([FromRoute] Guid departmentId)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _positionService.GetPositions(hrId, departmentId);
                return Ok(response);
        }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (DepartmentNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find department.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get positions.");
                return Problem("Internal server error.");
            }
        }

        [HttpGet("{positionId}")]
        [Produces("application/json")]
        public async Task<IActionResult> GetPosition([FromRoute] Guid departmentId, [FromRoute] Guid positionId)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _positionService.GetPosition(hrId, departmentId, positionId);
                return Ok(response);
        }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (DepartmentNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find department.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get position.");
                return Problem("Internal server error.");
            }
        }

        [HttpPost] 
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> CreatePosition([FromRoute] Guid departmentId, [FromBody] CreatePositionDto request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _positionService.CreatePosition(hrId, departmentId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (DepartmentNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find department.", ex);
                return NotFound(ex.Message);
            }
            catch (PositionExistsException ex)
            {
                _logger.LogError("An error occurred while attempting to create a position.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to create a position.");
                return Problem("Internal server error.");
            }
        }

        [HttpPatch("{positionId}")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdatePosition([FromRoute] Guid positionId, [FromRoute] Guid departmentId, [FromBody] JsonPatchDocument<Position> request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _positionService.UpdatePosition(hrId, departmentId, positionId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (DepartmentNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find department.", ex);
                return NotFound(ex.Message);
            }
            catch (PositionNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find position.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update a position.");
                return Problem("Internal server error.");
            }
        }

        [HttpPut("{positionId}")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdatePositions([FromRoute] Guid positionId, [FromRoute] Guid departmentId, [FromBody] UpdatePositionDto request)
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _positionService.UpdatePositions(hrId, departmentId, positionId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (DepartmentNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find department.", ex);
                return NotFound(ex.Message);
            }
            catch (PositionNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find position.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to update a position.");
                return Problem(ex.Message);
            }
        }

        [HttpDelete("{positionId}")]
        public Task<IActionResult> DeletePosition([FromRoute] Guid positionId) {
            throw new NotImplementedException();
        }
    }
}
