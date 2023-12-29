using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.DepartmentDto
{
    public class UpdateDepartmentDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(50, ErrorMessage = "Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Manager is required.")]
        [StringLength(50, ErrorMessage = "Manager must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string Manager { get; set; } = string.Empty;

        [Required(ErrorMessage = "Assistant is required.")]
        [StringLength(50, ErrorMessage = "Assistant must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string Assistant { get; set; } = string.Empty;
    }
}
