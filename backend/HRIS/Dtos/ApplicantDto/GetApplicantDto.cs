namespace HRIS.Dtos.ApplicantDto
{
    public class GetApplicantDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Suffix { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; } = 0;
        public char Sex { get; set; } = ' ';
        public string MobileNumber { get; set; } = string.Empty;
        public string LandlineNumber { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; } = DateTime.Now;
    }
}
