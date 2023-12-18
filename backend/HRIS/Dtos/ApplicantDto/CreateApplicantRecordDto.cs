using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.ApplicantDto
{
    public class CreateApplicantRecordDto
    {
        [Required(ErrorMessage = "First Name is required.")]
        [StringLength(50, ErrorMessage = "First Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Middle Name is required.")]
        [StringLength(50, ErrorMessage = "Middle Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string MiddleName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last Name is required.")]
        [StringLength(50, ErrorMessage = "Last Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string LastName { get; set; } = string.Empty;
        public string Suffix { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email Address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(100, ErrorMessage = "Email Address must be between {2} and {1} characters long.", MinimumLength = 5)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Age is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Age must be greater than 0")]
        public int Age { get; set; } = 0;

        [Required(ErrorMessage = "Sex is required.")]
        public char Sex { get; set; } = ' ';

        [Required(ErrorMessage = "Mobile Number is required.")]
        [StringLength(15, ErrorMessage = "Mobile Number must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string MobileNumber { get; set; } = string.Empty;
        public string LandlineNumber { get; set; } = string.Empty;

        public DateTime Birthdate { get; set; }
    }
}
