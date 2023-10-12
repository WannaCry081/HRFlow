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

        [StringLength(20)]
        public string Name { get; set; } = String.Empty;

        [StringLength(8)]
        public string Code { get; set; } = String.Empty;

        [JsonIgnore]
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
