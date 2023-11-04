using AutoMapper;
using HRIS.Models;
using HRIS.Dtos.ApplicantDto;

namespace HRIS.Mappers
{
    public class ApplicantMapper : Profile
    {
        public ApplicantMapper()
        {
            CreateMap<Applicant, GetApplicantDto>()
                .ReverseMap();
            CreateMap<Applicant, CreateApplicantDto>()
                .ReverseMap(); 
        }
    }
}
