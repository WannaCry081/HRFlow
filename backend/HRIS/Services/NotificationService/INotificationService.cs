using HRIS.Dtos.NotificationDto;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.NotificationService
{
    public interface INotificationService
    {
        Task<GetNotificationDto> CreateNotification(Guid hrId, CreateNotificationDto request);
        Task<GetNotificationDto> GetNotification(Guid hrId, Guid notificationId);
        Task<ICollection<GetNotificationDto>> GetNotifications(Guid hrId);
        Task<GetNotificationDto> UpdateNotifications(Guid hrId, Guid notificationId, UpdateNotificationDto request);
        Task<bool> UpdateNotification(Guid hrId, Guid notificationId, JsonPatchDocument<Notification> request);
        Task<bool> DeleteNotification(Guid hrId, Guid notificationId);

    }
}
