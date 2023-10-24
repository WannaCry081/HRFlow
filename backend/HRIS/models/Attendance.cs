using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRIS.Models
{
    [Table("Attendaces")]
    public class Attendance
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(10)]
        public string Month { get; set; } = string.Empty;

        [StringLength(10)]
        public string Day { get; set; } = string.Empty;

        [StringLength(10)]
        public string Year { get; set; } = string.Empty;

        public DateTime ClockIn { get; set; } = DateTime.Now;
        public DateTime ClockOut { get; set; } = DateTime.Now;

        public DateTime StartBreak { get; set; } = DateTime.Now;
        public DateTime EndBreak { get; set; } = DateTime.Now;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [ForeignKey("UserId")]
        [JsonIgnore]
        public User? UserId { get; set; }
    }
}
