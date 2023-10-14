using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.UserDto
{
    public class CreateTeamDto
    {
        [Required(ErrorMessage = "Team Name is required.")]
        [StringLength(30, ErrorMessage = "Team name must be between {2} and {1} characters long.", MinimumLength = 3)]
        public string Name { get; set; } = String.Empty;
    }
}
