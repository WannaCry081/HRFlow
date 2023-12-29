using AutoMapper;
using HRIS.Dtos.PositionDto;
using HRIS.Models;

namespace HRIS.Mappers
{
    public class PositionMapper : Profile
    {
        public PositionMapper()
        {
            CreateMap<Position, CreatePositionDto>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => NameFormatter(src.Title)))
                .ReverseMap();
            CreateMap<Position, GetPositionDto>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => NameFormatter(src.Title)))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => NameFormatter(src.Description)))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => NameFormatter(src.Type)))
                .ReverseMap();
            CreateMap<Position, UpdatePositionDto>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => NameFormatter(src.Title)))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => NameFormatter(src.Description)))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => NameFormatter(src.Type)))
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
