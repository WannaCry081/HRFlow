using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.EmployeeDto
{
    public class AddEmployeeRecordDto
    {
        [Required(ErrorMessage = "First Name is required.")]
        [StringLength(100, ErrorMessage = "First Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(100, ErrorMessage = "Middle Name must at least be less than {2} characters.")]
        public string MiddleName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last Name is required.")]
        [StringLength(100, ErrorMessage = "Last Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string LastName { get; set; } = string.Empty;

        [StringLength(10, ErrorMessage = "Suffix must at least be less than {2} characters.")]
        public string Suffix { get; set; } = string.Empty;
        public DateTime Birthdate { get; set; }

        [StringLength(13, ErrorMessage = "Mobile Number must be between {2} and {1} characters long.", MinimumLength = 11)]
        public string MobileNumber { get; set; } = string.Empty;

        [StringLength(13, ErrorMessage = "Landline Number must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string LandlineNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Personal Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(150, ErrorMessage = "Personal Email Address must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string PersonalEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Company Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(150, ErrorMessage = "Company Email Address must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string CompanyEmail { get; set; } = string.Empty;
    }
}
