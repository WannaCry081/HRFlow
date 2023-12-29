using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [ApiController]
    [Route("/api/salary")]
    [Authorize(Roles = "Human Resource")]
    public class SalaryController
    {
        public SalaryController()
        {

        }

        [Authorize(Roles = "Employee")]
        [HttpGet("{salaryId}")]
        public Task<IActionResult> GetSalary()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public Task<IActionResult> GetSalaries()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public Task<IActionResult> AddSalary()
        {
            throw new NotImplementedException();
        }

        [HttpPatch] 
        public Task<IActionResult> UpdateSalary()
        {
            throw new NotImplementedException();
        }
    }
}
