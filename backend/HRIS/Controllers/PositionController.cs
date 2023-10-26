using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize(Roles = "Human Resource")]
    [ApiController]
    [Route("/api/position")]
    public class PositionController : ControllerBase
    {
        private readonly ILogger<PositionController> _logger;

        public PositionController(ILogger<PositionController> logger)
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        public Task<IActionResult> GetPositions()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{positionId}")]
        public Task<IActionResult> GetPosition([FromRoute] Guid positionId)
        {
            throw new NotImplementedException();
        }

        [HttpPost] 
        public Task<IActionResult> CreatePosition()
        {
            throw new NotImplementedException();
        }

        [HttpPut("{positionId}")]
        public Task<IActionResult> UpdatePosition([FromRoute] Guid positionId)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{positionId}")]
        public Task<IActionResult> DeletePosition([FromRoute] Guid positionId) {
            throw new NotImplementedException();
        }
    }
}
