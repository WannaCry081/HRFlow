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
                    throw new UserNotFoundException("Invalid user.");

                var response = await _userService.GetUserProfile(userId);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while finding user.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to get user data.", ex);
                return Problem("An error occurred while getting user profile. Please try again later.");
            }
        }

        [HttpPut]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserProfileDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user.");

                var response = await _userService.UpdateUserProfile(userId, request);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while finding user.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to update user data.", ex);
                return Problem(ex.Message);
            }
        }

        [HttpPost("team")]
        [Produces("application/json")]
        public async Task<IActionResult> CreateTeam([FromBody] CreateTeamDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user.");

                var response = await _userService.CreateTeam(userId, request);
                if (!response)
                {
                    throw new TeamExistsException("Team already exists");
                }
                return Ok("Successfully created a team.");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while finding user.");
            }
            catch (TeamExistsException ex)
            {
                _logger.LogError("An error occurred while attempting to create a team.", ex);
                return BadRequest("An error occurred while trying to create a team.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to generate team code. ", ex);
                return Problem("An error occurred while processing team code request. Please try again later.");
            }
        }

        [HttpPut("team")]
        [Produces("application/json")]
        public async Task<IActionResult> JoinTeam([FromBody] JoinTeamDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user.");

                var response = await _userService.JoinTeam(userId, request);
                if (!response)
                {
                    throw new TeamExistsException("User already has a team.");
                }
                return Ok("Successfully joined team.");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while finding user.");
            }
            catch (TeamExistsException ex)
            {
                _logger.LogError("An error occurred while attempting to join a team.", ex);
                return BadRequest("An error occurred while trying to join a team.");
            }
            catch (TeamNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find the team.", ex);
                return NotFound("An error occurred while finding the team.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to join a team. ", ex);
                return Problem("An error occurred while processing team entry request. Please try again later.");
            }
        }
    }
}
