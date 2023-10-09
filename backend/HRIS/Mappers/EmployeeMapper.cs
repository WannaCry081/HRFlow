using AutoMapper;
using HRIS.dtos.EmployeeDto;
using HRIS.Models;

namespace HRIS.Mappers
{
    public class EmployeeMapper : Profile
    {
        public EmployeeMapper()
        {
            CreateMap<User, UpsertEmployeeDto>()
                .ReverseMap();
        }
    }
}
