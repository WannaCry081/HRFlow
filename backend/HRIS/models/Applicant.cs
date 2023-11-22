using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRIS.Models
{
    [Table("Applicants")]
    public class Applicant
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

        [StringLength(100)]
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; } = 0;
        public char Sex { get; set; } = ' ';

        [StringLength(15)]
        public string MobileNumber { get; set; } = string.Empty;

        [StringLength(15)]
        public string LandlineNumber { get; set; } = string.Empty;

        [StringLength(20)]
        public string Status { get; set; } = string.Empty;

        public string Profile { get; set; } = string.Empty;

        public DateTime BirthDate { get; set; } = DateTime.Now;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [ForeignKey("TeamId")]
        public Guid TeamId { get; set; }
        public Team? Team { get; set; }
    }
}
