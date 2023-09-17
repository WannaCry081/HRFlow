using AutoMapper;
using HRIS.Dtos;
using HRIS.Models.AuthModels;

namespace HRIS.Mappings
{
    public class AuthMapper : Profile
    {
        public AuthMapper() 
        {
            //Two way mapping
            CreateMap<ForgotPassword, ForgotPasswordDto>().ReverseMap();
        }
    }
}
