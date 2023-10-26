using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.UserDto
{
    public class UpdateUserProfileDto
    {
        [StringLength(15, ErrorMessage = "Mobile Number must be {1} characters long.")]
        public string MobileNumber { get; set; } = string.Empty;

        [StringLength(15, ErrorMessage = "Landline Number must be {1} characters long.")]
        public string LandlineNumber { get; set; } = string.Empty;

        [EmailAddress(ErrorMessage = "Please enter a valid personal email address.")]
        [StringLength(100, ErrorMessage = "Personal Email Address must be {1} characters long.")]
        public string PersonalEmail { get; set; } = string.Empty;
    }
}
