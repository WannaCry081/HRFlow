using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace HRIS.Models.AuthModels
{
    public class ForgotPassword
    {
        // Email field annotations
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [Required(ErrorMessage = "Email field is required.")]
        [MinLength(3, ErrorMessage = "Email address is too short! Please provide at least 3 characters.")]
        [MaxLength(254, ErrorMessage = "Email address is too long. Please provide at most 254 characters.")]
        public string Email { get; set; } = string.Empty;

        //Name field annotations
        [Required(ErrorMessage = "Name input is required.")]
        [MinLength(1, ErrorMessage = "Name input is too short! Please provide at least 1 character.")]
        [MaxLength(35, ErrorMessage = "Name input is too long! Please provide at most 35 characters.")]
        public string Name { get; set; } = string.Empty;

        //Password field annotations
        [Required(ErrorMessage = "Password is required.")]
        [PasswordPropertyText]
        [MinLength(8, ErrorMessage = "Password is too short! Please provide at least 8 characters")]
        [MaxLength(16, ErrorMessage = "Password is too long! Please provide at most 16 characters.")]
        public string Password { get; set; } = string.Empty;

        //Confirm Passowrd field annotations
        [Required(ErrorMessage = "Confirm Password is required.")]
        [PasswordPropertyText]
        [Compare("Password", ErrorMessage = "Password does not match with the password field.")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
