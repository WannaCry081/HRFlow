using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.NotificationDto
{
    public class UpdateNotificationDto
    {
        public string Image { get; set; } = string.Empty;

        [Required(ErrorMessage = "Subject is required.")]
        [StringLength(50, ErrorMessage = "Subject must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string Subject { get; set; } = string.Empty;

        [Required(ErrorMessage = "Message is required.")]
        [StringLength(50, ErrorMessage = "Message must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string Message { get; set; } = string.Empty;
    }
}
