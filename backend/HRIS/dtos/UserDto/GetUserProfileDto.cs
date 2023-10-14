using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.UserDto
{
    public class GetUserProfileDto
    {
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? Suffix { get; set; }
        public int? Age { get; set; }
        public string? MobileNumber { get; set; }
        public string? LandlineNumber { get; set; }
        public string? PersonalEmail { get; set; }
        public string? CompanyEmail { get; set; }
        public string? GroupCode { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
    }
}
