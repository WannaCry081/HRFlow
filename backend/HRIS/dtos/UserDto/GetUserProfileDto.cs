using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.UserDto
{
    public class GetUserProfileDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Suffix { get; set; } = string.Empty;
        public int Age { get; set; } = 0;
        public string MobileNumber { get; set; } = string.Empty;
        public string LandlineNumber { get; set; } = string.Empty;
        public string PersonalEmail { get; set; } = string.Empty;
        public string CompanyEmail { get; set; } = string.Empty;
        public string TeamCode { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public string UpdatedBy { get; set; } = string.Empty;
    }
}
