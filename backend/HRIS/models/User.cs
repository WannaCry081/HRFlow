using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRIS.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(100)]
        public string MiddleName { get; set; } = string.Empty;

        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [StringLength(10)]
        public string Suffix { get; set; } = string.Empty;
        public int Age { get; set; } = 0;

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

        [StringLength(150)]
        public string PasswordSalt { get; set; } = string.Empty;

        [StringLength(8)]
        public string GroupCode { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
