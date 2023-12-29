using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRIS.Models
{
    [Table("Departments")]
    public class Department
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [StringLength(50)]
        public string Manager { get; set; } = string.Empty;

        [StringLength(50)]
        public string Assistant { get; set; } = string.Empty;

        [NotMapped]
        public ICollection<User> Supervisors { get; set; } = new List<User>();

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [ForeignKey("TeamId")]
        public Guid TeamId { get; set; }
        public Team? Team { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Position> Positions { get; set; } = new List<Position>();
    }
}
