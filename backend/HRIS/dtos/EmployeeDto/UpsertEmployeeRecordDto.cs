using System.ComponentModel.DataAnnotations;

namespace HRIS.dtos.EmployeeDto
{
    public class UpsertEmployeeRecordDto
    {
        [Required(ErrorMessage = "First Name is required.")]
        [StringLength(100, ErrorMessage = "First Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; } = string.Empty;


        [StringLength(100, ErrorMessage = "Middle Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string MiddleName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last Name is required.")]
        [StringLength(100, ErrorMessage = "Last Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string LastName { get; set; } = string.Empty;

        [StringLength(2, ErrorMessage = "Suffix must be between {2} and {1} characters long.", MinimumLength = 0)]
        public string Suffix { get; set; } = string.Empty;

        [Required(ErrorMessage = "Age is required.")]
        public int Age { get; set; } = 0;

        [StringLength(13, ErrorMessage = "Mobile Number must be between {2} and {1} characters long.", MinimumLength = 11)]
        public string MobileNumber { get; set; } = string.Empty;

        [StringLength(13, ErrorMessage = "Landline Number must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string LandlineNumber { get; set; } = string.Empty;

        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(150, ErrorMessage = "Personal Email Address must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string PersonalEmail { get; set; } = string.Empty;


        [Required(ErrorMessage = "Company Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(150, ErrorMessage = "Company Email Address must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string CompanyEmail { get; set; } = string.Empty;

        public string Role { get; set; } = "Employee";
        public string Status { get; set; } = "Active";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
