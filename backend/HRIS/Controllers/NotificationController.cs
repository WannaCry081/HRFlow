using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/notification")]
    public class NotificationController : ControllerBase
    {
        private readonly ILogger<NotificationController> _logger;
        private readonly INotificationService _notificationService;

        public NotificationController(ILogger<NotificationController> logger, INotificationService notificationService)
        {
            _logger = logger ??
                throw new ArgumentNullException(nameof(logger));
            _notificationService = notificationService ??
                throw new ArgumentNullException(nameof(notificationService));
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<IActionResult> GetNotifications()
        {
            try
            {
                var hrId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user's credential. Please try again.");
                var response = await _notificationService.GetNotifications(hrId);
                return Ok(response);
        }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to find employee.", ex);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while attempting to get positions.");
                return Problem("Internal server error.");
            }
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
