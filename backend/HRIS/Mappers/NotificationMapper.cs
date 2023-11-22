using AutoMapper;
using HRIS.Dtos.NotificationDto;
using HRIS.Models;

namespace HRIS.Mappers
{
    public class NotificationMapper : Profile
    {
        public NotificationMapper()
        {
            CreateMap<Notification, CreateNotificationDto>()
                .ReverseMap();
            CreateMap<Notification, GetNotificationDto>()
                .ReverseMap();
            CreateMap<Notification, UpdateNotificationDto>()
                .ReverseMap();

        }
    }
}
