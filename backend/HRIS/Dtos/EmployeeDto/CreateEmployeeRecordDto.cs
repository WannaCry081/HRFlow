using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.EmployeeDto
{
    public class CreateEmployeeRecordDto
    {
        [Required(ErrorMessage = "First Name is required.")]
        [StringLength(50, ErrorMessage = "First Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; } = string.Empty;

        public string MiddleName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last Name is required.")]
        [StringLength(50, ErrorMessage = "Last Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string LastName { get; set; } = string.Empty;

        public string Suffix { get; set; } = string.Empty;

        [Required(ErrorMessage = "Age is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Age must be greater than 0")]
        public int? Age { get; set; }

        [Required(ErrorMessage = "Birthdate is required.")]
        public DateTime Birthdate { get; set; }

        [Required(ErrorMessage = "Sex is required.")]
        public char Sex { get; set; }

        [Required(ErrorMessage = "Mobile Number is required.")]
        [StringLength(15, ErrorMessage = "Mobile Number must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string MobileNumber { get; set; } = string.Empty;

        public string LandlineNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Personal Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid personal email address.")]
        [StringLength(100, ErrorMessage = "Personal Email Address must be between {2} and {1} characters long.", MinimumLength = 5)]
        public string PersonalEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Company Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(100, ErrorMessage = "Company Email Address must be between {2} and {1} characters long.", MinimumLength = 5)]
        public string CompanyEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Department is required.")]
        public string Department { get; set; } = string.Empty;

        [Required(ErrorMessage = "Position is required.")]
        public string Position { get; set; } = string.Empty;

        [PasswordPropertyText]
        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, ErrorMessage = "Password must be between {2} and {1} characters long.", MinimumLength = 8)]
        public string Password { get; set; } = string.Empty;

        [PasswordPropertyText]
        [Compare("Password", ErrorMessage = "Confirm Password does not match with your password.")]
        [Required(ErrorMessage = "Confirm Password is required.")]
        [StringLength(100, ErrorMessage = "Password must be between {2} and {1} characters long.", MinimumLength = 8)]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
