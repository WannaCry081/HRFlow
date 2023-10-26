using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.LandingDto
{
    public class ContactUsDto
    {
        [Required(ErrorMessage = "Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(100, ErrorMessage = "Email address must be between {2} and {1} characters long.", MinimumLength = 5)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email subject is required.")]
        [StringLength(50, ErrorMessage = "Email subject must be between {2} and {1} characters long.",
            MinimumLength = 2)]
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }
}
