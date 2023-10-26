using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.AuthDto
{
    public class OTPDto
    {
        [Required(ErrorMessage = "Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(100, ErrorMessage = "Email Address must be between {2} and {1} characters long.", MinimumLength = 5)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "OTP is required.")]
        [StringLength(6, ErrorMessage = "OTP must be 6 characters long.", MinimumLength = 6)]
        public string Code { get; set; } = string.Empty;
    }
}
