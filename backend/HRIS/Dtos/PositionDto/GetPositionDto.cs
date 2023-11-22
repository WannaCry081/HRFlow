using HRIS.Dtos.EmployeeDto;

namespace HRIS.Dtos.PositionDto
{
    public class GetPositionDto
    {
        public Guid Id { get; set; }
        public Guid DepartmentId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public List<GetEmployeeRecordDto> Users { get; set; } = new List<GetEmployeeRecordDto>();
    }
}
