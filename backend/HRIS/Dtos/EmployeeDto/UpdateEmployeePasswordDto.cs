using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace HRIS.Dtos.EmployeeDto
{
    public class UpdateEmployeePasswordDto
    {
        [PasswordPropertyText]
        [Required(ErrorMessage = "Old Password is required.")]
        [StringLength(100, ErrorMessage = "Old Password must be between {2} and {1} characters long.", MinimumLength = 8)]
        public string OldPassword { get; set; } = string.Empty;

        [PasswordPropertyText]
        [Required(ErrorMessage = "New Password is required.")]
        [StringLength(100, ErrorMessage = "New Password must be between {2} and {1} characters long.", MinimumLength = 8)]
        public string NewPassword { get; set; } = string.Empty;

        [PasswordPropertyText]
        [Compare("NewPassword", ErrorMessage = "Password does not match.")]
        [Required(ErrorMessage = "Confirm New Password is required.")]
        [StringLength(100, ErrorMessage = "Confirm New Password must be between {2} and {1} characters long.", MinimumLength = 8)]
        public string ConfirmNewPassword { get; set; } = string.Empty;
    }
}
