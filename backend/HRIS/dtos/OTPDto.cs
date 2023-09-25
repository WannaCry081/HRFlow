using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos
{
    public class OTPDto
    {
        [Required(ErrorMessage = "Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(150, ErrorMessage = "Email Address must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "OTP is required.")]
        [StringLength(8, ErrorMessage = "OTP must be 8 characters long.", MinimumLength = 8)]
        public string Code { get; set; } = string.Empty;
    }
}
