using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRIS.Models
{
    [Table("Teams")]
    public class Team
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [StringLength(8)]
        public string Code { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<User> Users { get; set; } = new List<User>();

        [JsonIgnore]
        public ICollection<Department> Departments { get; set; } = new List<Department>();

        [JsonIgnore]
        public ICollection<Applicant> Applicants { get; set; } = new List<Applicant>();

        [JsonIgnore]
        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}