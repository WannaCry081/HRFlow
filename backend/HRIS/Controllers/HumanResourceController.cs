using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/human-resource")]
    public class HumanResourceController : ControllerBase
    {
        [HttpGet("{id}")]
        public Task<IActionResult> GetEmployeeRecord()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public Task<IActionResult> GetEmployeeRecords(Guid id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public Task<IActionResult> CreateEmployeeRecord()
        {
            throw new NotImplementedException();
        }

        [HttpPatch("{id}")]
        public Task<IActionResult> UpdateEmployeeRecord()
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        public Task<IActionResult> UpdateEmployeeRecords()
        {
            throw new NotImplementedException();
        }
    }
}
