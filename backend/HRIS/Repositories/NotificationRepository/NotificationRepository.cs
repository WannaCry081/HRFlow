using HRIS.Context;
using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;

namespace HRIS.Repositories.NotificationRepository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataContext _context;

        public NotificationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserById(Guid id)
        {
            return await _context.Users
                .Where(c => c.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<bool> CreateNotification(Notification notification)
        {
            _context.Notifications.Add(notification);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteNotification(Notification notification)
        {
            _context.Notifications.Remove(notification);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Notification?> GetNotification(User hr, Guid notificationId)
        {
            return await _context.Notifications
                .Where(c => c.Id.Equals(notificationId) && c.TeamId.Equals(hr.TeamId)).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Notification>> GetNotifications(User hr)
        {
            return await _context.Notifications
                .Where(c => c.TeamId.Equals(hr.TeamId)).ToListAsync();
        }

        public async Task<bool> UpdateNotification(Notification notification, JsonPatchDocument<Notification> request)
        {
            request.ApplyTo(notification);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateNotifications(Notification notification, Notification request)
        {
            notification.Image = request.Image;
            notification.Subject = request.Subject;
            notification.Message = request.Message;
            notification.IsRead = request.IsRead;
            notification.UpdatedAt = DateTime.Now;

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
