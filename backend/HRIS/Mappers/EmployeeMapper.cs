using AutoMapper;
using HRIS.dtos.EmployeeDto;
using HRIS.Models;

namespace HRIS.Mappers
{
    public class EmployeeMapper : Profile
    {
        public EmployeeMapper()
        {
            CreateMap<User, UpsertEmployeeRecordDto>()
                .ReverseMap();

            CreateMap<User, GetEmployeeRecordDto>()
                .ReverseMap();
        }
    }
}
