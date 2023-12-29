namespace HRIS.Dtos.EmployeeDto
{
    public class GetEmployeeRecordDto
    {
        public Guid Id { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? Suffix { get; set; }
        public int? Age { get; set; }
        public DateTime Birthdate { get; set; }
        public string? MobileNumber { get; set; }
        public string? LandlineNumber { get; set; }
        public string? PersonalEmail { get; set; }
        public string? CompanyEmail { get; set; }
        public string? Status { get; set; }
        public Guid TeamId { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid? PositionId { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
    }
}
