using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize(Roles = "Human Resource")]
    [ApiController]
    [Route("/api/team")]
    public class TeamController : ControllerBase
    {
        public TeamController()
        {

        }
    }
}
