using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.UserDto
{
    public class UpdateUserProfileDto
    {
        [StringLength(100, ErrorMessage = "First Name must be {1} characters long.")]
        public string? FirstName { get; set; }

        [StringLength(100, ErrorMessage = "Middle Name must be {1} characters long.")]
        public string? MiddleName { get; set; }

        [StringLength(100, ErrorMessage = "Last Name must be {1} characters long.")]
        public string? LastName { get; set; }

        [StringLength(10, ErrorMessage = "Suffix must be {1} characters long.")] 
        public string? Suffix { get; set; }
        public int? Age { get; set; }

        [StringLength(15, ErrorMessage = "Mobile Number must be {1} characters long.")]
        public string? MobileNumber { get; set; }

        [StringLength(15, ErrorMessage = "Landline Number must be {1} characters long.")]
        public string? LandlineNumber { get; set; }

        [EmailAddress(ErrorMessage = "Please enter a valid personal email address.")]
        [StringLength(150, ErrorMessage = "Personal Email Address must be {1} characters long.")]
        public string? PersonalEmail { get; set; }

        [EmailAddress(ErrorMessage = "Please enter a valid company email address.")]
        [StringLength(150, ErrorMessage = "Company Email Address must be {1} characters long.")]
        public string? CompanyEmail { get; set; }
    }
}
