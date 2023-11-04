using AutoMapper;
using HRIS.Dtos.DepartmentDto;
using HRIS.Models;

namespace HRIS.Mappers
{
    public class DepartmentMapper : Profile
    {
        public DepartmentMapper()
        {
            CreateMap<Department, CreateDepartmentDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => NameFormatter(src.Name)))
                .ReverseMap();
            CreateMap<Department, GetDepartmentDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => NameFormatter(src.Name)))
                .ForMember(dest => dest.Manager, opt => opt.MapFrom(src => NameFormatter(src.Manager)))
                .ForMember(dest => dest.Assistant, opt => opt.MapFrom(src => NameFormatter(src.Assistant)))
                .ReverseMap();
            CreateMap<Department, UpdateDepartmentDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => NameFormatter(src.Name)))
                .ForMember(dest => dest.Manager, opt => opt.MapFrom(src => NameFormatter(src.Manager)))
                .ForMember(dest => dest.Assistant, opt => opt.MapFrom(src => NameFormatter(src.Assistant)))
                .ReverseMap();
        }

        private string NameFormatter(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                return input;
            }

            string[] text = input.Split(" ");
            for (int i = 0; i < text.Length; i++)
            {
                if (!string.IsNullOrEmpty(text[i]))
                {
                    text[i] = char.ToUpper(text[i][0]) + text[i].Substring(1);
                }
            }
            return string.Join(" ", text);

        }
    }
}
