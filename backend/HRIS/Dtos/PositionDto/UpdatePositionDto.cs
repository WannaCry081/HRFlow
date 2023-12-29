using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.PositionDto
{
    public class UpdatePositionDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(50, ErrorMessage = "Title must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(50, ErrorMessage = "Description must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Type is required.")]
        [StringLength(50, ErrorMessage = "Type must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string Type { get; set; } = string.Empty;
    }
}
