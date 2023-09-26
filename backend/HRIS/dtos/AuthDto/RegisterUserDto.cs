using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.AuthDto
{
    public class RegisterUserDto
    {
        [Required(ErrorMessage = "First Name is required.")]
        [StringLength(100, ErrorMessage = "First Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last Name is required.")]
        [StringLength(100, ErrorMessage = "Last Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(150, ErrorMessage = "Email Address must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string Email { get; set; } = string.Empty;

        [PasswordPropertyText]
        [Required(ErrorMessage = "Password is required.")]
        [StringLength(150, ErrorMessage = "Password must be between {2} and {1} characters long.", MinimumLength = 8)]
        public string Password { get; set; } = string.Empty;

        [PasswordPropertyText]
        [Compare("Password", ErrorMessage = "Confirm Password does not match with your password.")]
        [Required(ErrorMessage = "Confirm Password is required.")]
        [StringLength(150, ErrorMessage = "Password must be between {2} and {1} characters long.", MinimumLength = 8)]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
