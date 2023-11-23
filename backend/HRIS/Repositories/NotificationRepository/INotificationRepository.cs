using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Repositories.NotificationRepository
{
    public interface INotificationRepository
    {
        Task<User?> GetUserById(Guid id);
        Task<Notification?> GetNotification(User hr, Guid notificationId);
        Task<ICollection<Notification>> GetNotifications(User hr);
        Task<bool> CreateNotification(Notification notification);
        Task<bool> UpdateNotifications(Notification notification, Notification request);
        Task<bool> UpdateNotification(Notification notification, JsonPatchDocument<Notification> request);
        Task<bool> DeleteNotification(Notification notification);
    }
}
