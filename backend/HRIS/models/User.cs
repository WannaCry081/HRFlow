using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRIS.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(100)]
        public string MiddleName { get; set; } = string.Empty;

        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [StringLength(10)]
        public string Suffix { get; set; } = string.Empty;
        public int Age { get; set; } = 0;
        public DateTime Birthdate { get; set; }

        [StringLength(15)]
        public string MobileNumber { get; set; } = string.Empty;

        [StringLength(15)]
        public string LandlineNumber { get; set; } = string.Empty;

        [StringLength(150)]
        public string PersonalEmail { get; set; } = string.Empty;

        [StringLength(150)]
        public string CompanyEmail { get; set; } = string.Empty;

        [StringLength(150)]
        public string PasswordHash { get; set; } = string.Empty;

        [StringLength(6)]
        public string PasswordToken { get; set; } = string.Empty;

        [StringLength(150)]
        public string PasswordSalt { get; set; } = string.Empty;

        [StringLength(10)]
        public string Status { get; set; } = string.Empty;

        [StringLength(20)]
        public string Role { get; set; } = string.Empty;
        [StringLength(8)]
        public string TeamCode { get; set; } = string.Empty;

        [StringLength(100)]
        public string CreatedBy { get; set; } = string.Empty;

        [StringLength(100)]
        public string UpdatedBy { get; set; } = string.Empty;

        [ForeignKey("TeamId")]
        [JsonIgnore]
        public Guid? TeamId { get; set; }

        [JsonIgnore]
        public Team? Team { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
