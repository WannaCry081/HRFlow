using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.PositionDto
{
    public class CreatePositionDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(50, ErrorMessage = "Title must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string Title { get; set; } = string.Empty;
    }
}
