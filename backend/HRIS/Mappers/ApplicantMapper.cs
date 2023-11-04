using AutoMapper;
using HRIS.Models;
using HRIS.Dtos.ApplicantDto;

namespace HRIS.Mappers
{
    public class ApplicantMapper : Profile
    {
        public ApplicantMapper()
        {
            CreateMap<Applicant, GetApplicantRecordDto>()
                .ReverseMap();
            CreateMap<Applicant, CreateApplicantRecordDto>()
                .ReverseMap(); 
        }
    }
}
