using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRIS.Models
{
    [Table("Positions")]
    public class Position
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(50)]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [StringLength(20)]
        public string Type { get; set; } = string.Empty;

        [ForeignKey("DepartmentId")]
        [JsonIgnore]
        public Guid? DepartmentId { get; set; }

        [JsonIgnore]
        public ICollection<User> Users { get; set; } = new List<User>();

        [JsonIgnore]
        public ICollection<Applicant> Applicants { get; set; } = new List<Applicant>();
    }
}
