using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRIS.Models
{
    [Table("Salaries")]
    public class Salary
    {
        [Key]
        public Guid Id { get; set; }

        public int WorkHours { get; set; }
        public int HourlyRate { get; set; }

        [ForeignKey("UserId")]
        [JsonIgnore]
        public Guid? UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

    }
}
