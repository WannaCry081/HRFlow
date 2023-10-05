using System.ComponentModel.DataAnnotations;

namespace HRIS.dtos.AuthDto
{
    public class ContactAdminDto
    {
        [Required(ErrorMessage = "Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(150, ErrorMessage = "Email address must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email subject is required.")]
        [StringLength(50, ErrorMessage = "Email subject must be between {2} and {1} characters long.",
            MinimumLength = 3)]
        public string Subject { get; set; } = string.Empty;

        [Required(ErrorMessage = "Message body is required.")]
        [StringLength(150, ErrorMessage = "Message body must be between {2} and {1} characters long.",
            MinimumLength = 3)]
        public string Body { get; set; } = string.Empty;
    }
}
