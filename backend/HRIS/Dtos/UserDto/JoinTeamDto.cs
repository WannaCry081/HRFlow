using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.UserDto
{
    public class JoinTeamDto
    {
        [Required(ErrorMessage = "Team code is required.")]
        [StringLength(8, ErrorMessage = "Team code must be 8 characters long.")]
        public string Code { get; set; } = String.Empty;
    }
}
