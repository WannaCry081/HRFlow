using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos
{
    public class ForgotPasswordDto
    {
        //Encapsulates field and applying annotations

        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [Required(ErrorMessage = "Email field is required.")]
        [MinLength(3, ErrorMessage = "Email address is too short! Please provide at least 3 characters.")]
        [MaxLength(254, ErrorMessage = "Email address is too long. Please provide at most 254 characters.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Name input is required.")]
        [MinLength(1, ErrorMessage = "Name inputted is too short! Please provide at least 1 character.")]
        [MaxLength(35, ErrorMessage = "Name inputted is too long! Please provide at most 35 characters.")]
        public string Name { get; set; } = string.Empty;
    }
}
