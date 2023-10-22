using HRIS.Dtos.UserDto;
using HRIS.Exceptions;
using HRIS.Services.UserService;
using HRIS.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
            _userService = userService ??
                throw new ArgumentNullException(nameof(userService));
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<IActionResult> GetUserProfile()
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _userService.GetUserProfile(userId);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to get user data.", ex);
                return Problem("Internal server error");
            }
        }

        [HttpPut]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserProfileDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _userService.UpdateUserProfile(userId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to update user data.", ex);
                return Problem("Internal server error.");
            }
        }

        [HttpPut("/reset-password")]
        public async Task<IActionResult> UpdateUserPassword([FromBody] UpdateUserPasswordDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _userService.UpdateUserPassword(userId, request);
                return Ok();
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError("An error occurred while attempting to validate user's credential", ex);
                return Unauthorized(ex.Message);
            }
            catch (BadHttpRequestException ex)
            {
                _logger.LogError("An error occurred while verifying user data.", ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to update user data.", ex);
                return Problem(ex.Message);
            }
        }
    }
}
