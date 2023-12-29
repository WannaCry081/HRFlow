using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRIS.Models
{
    [Table("Notifications")]
    public class Notification
    {
        [Key]
        public Guid Id { get; set; }
        public string Image { get; set; } = string.Empty;

        [StringLength(50)]
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [ForeignKey("TeamId")]
        [JsonIgnore]
        public Guid TeamId { get; set; }
    }
}
