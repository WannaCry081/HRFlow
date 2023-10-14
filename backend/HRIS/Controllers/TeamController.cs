using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HRIS.Services.TeamService;
using HRIS.Dtos.UserDto;
using HRIS.Exceptions;
using HRIS.Utils;

namespace HRIS.Controllers
{
    [Authorize(Roles = "Human Resource")]
    [ApiController]
    [Route("/api/team")]
    public class TeamController : ControllerBase
    {
        private readonly ILogger<TeamController> _logger;
        private readonly ITeamService _teamService;

        public TeamController(ILogger<TeamController> logger, ITeamService teamService)
        {
            _logger = logger ?? 
                throw new ArgumentNullException(nameof(logger));
            _teamService = teamService ?? 
                throw new ArgumentNullException(nameof(teamService));
        }

        [HttpPost]
        [Produces("application/json")]
        public async Task<IActionResult> CreateTeam([FromBody] CreateTeamDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _teamService.CreateTeam(userId, request);
                if (!response)
                {
                    throw new TeamExistsException("User already has a team.");
                }
                return Ok("Successfully created a team.");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound(ex.Message);
            }
            catch (TeamExistsException ex)
            {
                _logger.LogError("An error occurred while attempting to create a team.", ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to generate team code. ", ex);
                return Problem("Internal server error.");
            }
        }
        [HttpPut]
        [Produces("application/json")]
        public async Task<IActionResult> JoinTeam([FromBody] JoinTeamDto request)
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                  throw new UserNotFoundException("Invalid user's credential. Please try again.");

                var response = await _teamService.JoinTeam(userId, request);
                if (!response)
                {
                    throw new TeamExistsException("User already has a team. Please try again.");
                }
                return Ok("Successfully joined a team.");
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound(ex.Message);
            }
            catch (TeamExistsException ex)
            {
                _logger.LogError("An error occurred while attempting to join a team.", ex);
                return BadRequest(ex.Message);
            }
            catch (TeamNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find the team.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to join a team. ", ex);
                return Problem("Internal server error.");
            }
        }
    }
}
