using AutoMapper;
using HRIS.Dtos;
using HRIS.Models;

namespace HRIS.Mappers
{
    public class RecordMapper : Profile
    {
        public RecordMapper()
        {
            CreateMap<Record, GetRecordDto>().ReverseMap();
        }
    }
}