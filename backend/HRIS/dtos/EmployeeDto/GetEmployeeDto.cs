namespace HRIS.dtos.EmployeeDto
{
    public class GetEmployeeDto
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

        public string Role { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
