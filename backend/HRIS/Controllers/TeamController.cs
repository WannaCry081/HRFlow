using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HRIS.Services.TeamService;

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
    }
}
