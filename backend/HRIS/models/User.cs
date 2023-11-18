using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRIS.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(50)]
        public string MiddleName { get; set; } = string.Empty;

        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [StringLength(10)]
        public string Suffix { get; set; } = string.Empty;
        public int Age { get; set; } = 0;
        public char Sex { get; set; } = ' ';

        [StringLength(15)]
        public string MobileNumber { get; set; } = string.Empty;

        [StringLength(15)]
        public string LandlineNumber { get; set; } = string.Empty;

        [StringLength(100)]
        public string PersonalEmail { get; set; } = string.Empty;

        [StringLength(100)]
        public string CompanyEmail { get; set; } = string.Empty;

        [StringLength(100)]
        public string PasswordHash { get; set; } = string.Empty;

        [StringLength(6)]
        public string PasswordToken { get; set; } = string.Empty;

        [StringLength(100)]
        public string PasswordSalt { get; set; } = string.Empty;

        [StringLength(20)]
        public string Status { get; set; } = string.Empty;

        [StringLength(20)]
        public string Role { get; set; } = string.Empty;

        [StringLength(50)]
        public string CreatedBy { get; set; } = string.Empty;

        [StringLength(50)]
        public string UpdatedBy { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
        public string Profile { get; set; } = string.Empty;

        public bool IsDeleted { get; set; } = false;

        public DateTime BirthDate { get; set; } = DateTime.Now;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [ForeignKey("TeamsId")]
        public Guid TeamId { get; set; }
        public Team? Team { get; set; }

        [ForeignKey("DepartmentsId")]
        public Guid DepartmentId { get; set; }
        public Department? Department { get; set; }

        [ForeignKey("PositionsId")]
        public Guid PositionId { get; set; } 
        public Position? Position { get; set; }

        public ICollection<Record> Records { get; set; } = new List<Record>();
    }
}