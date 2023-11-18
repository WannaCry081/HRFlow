using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/notification")]
    public class NotificationController : ControllerBase
    {
        [HttpGet]
        public Task<IResult> GetNotifications()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{notificationId}")]
        public Task<IResult> GetNotification([FromRoute] Guid notificationId)
        {
            throw new NotImplementedException();
        }

        [Authorize(Roles = "Human Resource")]
        [HttpPost]
        public Task<IResult> CreateNotification()
        {
            throw new NotImplementedException();
        }

        [Authorize(Roles = "Human Resource")]
        [HttpPut("{notificationId}")]
        public Task<IResult> UpdateNotification([FromRoute] Guid notificationId)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{notificationId}")]
        public Task<IResult> DeleteNotification([FromRoute] Guid notificationId)
        {
            throw new NotImplementedException();
        }
    }
}
