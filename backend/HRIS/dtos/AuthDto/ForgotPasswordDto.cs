using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.AuthDto
{
    public class ForgotPasswordDto
    {
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [Required(ErrorMessage = "Email Address is required.")]
        [StringLength(150, ErrorMessage = "Email Address must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string Email { get; set; } = string.Empty;
    }
}
