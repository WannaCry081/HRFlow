using AutoMapper;
using HRIS.Dtos.EmployeeDto;
using HRIS.Models;

namespace HRIS.Mappers
{
    public class EmployeeMapper : Profile
    {
        public EmployeeMapper()
        {
            CreateMap<User, AddEmployeeRecordDto>()
                .ReverseMap();
            CreateMap<User, UpdateEmployeeRecordDto>()
                .ReverseMap();
            CreateMap<User, GetEmployeeRecordDto>()
                .ReverseMap();
        }
    }
}
