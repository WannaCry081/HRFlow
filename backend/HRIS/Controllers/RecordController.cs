using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize(Roles = "Human Resource")]
    [ApiController]
    [Route("/api/record")]
    public class RecordController : ControllerBase
    {
        private readonly ILogger<RecordController> _logger;

        public RecordController(ILogger<RecordController> logger)
        {
            _logger = logger ?? 
                throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        public Task<IActionResult> GetRecords()
        {
            throw new NotImplementedException();
        }
    }
}
