using AutoMapper;
using HRIS.Dtos.ApplicantDto;
using HRIS.Models;

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
