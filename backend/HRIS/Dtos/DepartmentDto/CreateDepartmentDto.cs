using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.DepartmentDto
{
    public class CreateDepartmentDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(50, ErrorMessage = "Name must be between {2} and {1} characters long.", MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;
    }
}
