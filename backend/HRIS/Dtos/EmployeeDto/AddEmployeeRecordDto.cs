using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.EmployeeDto
{
    public class AddEmployeeRecordDto
    {
        [Required(ErrorMessage = "First Name is required.")]
        [StringLength(100, ErrorMessage = "First Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last Name is required.")]
        [StringLength(100, ErrorMessage = "Last Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string LastName { get; set; } = string.Empty;
        public string Suffix { get; set; } = string.Empty;

        [Required(ErrorMessage = "Age is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Age must be greater than 0")]
        public int? Age { get; set; }

        [Required(ErrorMessage = "Birthdate is required.")]
        public DateTime Birthdate { get; set; }

        [Required(ErrorMessage = "Mobile Number is required.")]
        [StringLength(13, ErrorMessage = "Mobile Number must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string MobileNumber { get; set; } = string.Empty;
        public string LandlineNumber { get; set; } = string.Empty;
        public string PersonalEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Company Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(150, ErrorMessage = "Company Email Address must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string CompanyEmail { get; set; } = string.Empty;
    }
}
