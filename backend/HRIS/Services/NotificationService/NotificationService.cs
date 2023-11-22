using AutoMapper;
using HRIS.Dtos.NotificationDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.NotificationRepository;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.NotificationService
{
    public class NotificationService : INotificationService
    {
        private readonly IMapper _mapper;
        private readonly INotificationRepository _notificationRepository;

        public NotificationService(IMapper mapper, INotificationRepository notificationRepository)
        {
            _mapper = mapper;
            _notificationRepository = notificationRepository;
        }

        public async Task<GetNotificationDto> CreateNotification(Guid hrId, CreateNotificationDto request)
        {
            var hr = await _notificationRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var notification = _mapper.Map<Notification>(request);
            notification.TeamId = hr.TeamId ?? Guid.Empty;
            notification.IsRead = false;

            var response = await _notificationRepository.CreateNotification(notification);
            if (!response)
            {
                throw new Exception("Failed to add new notification");
            }

            return _mapper.Map<GetNotificationDto>(notification);
        }

        public async Task<bool> DeleteNotification(Guid hrId, Guid notificationId)
        {
            var hr = await _notificationRepository.GetUserById(hrId) ??
               throw new UserNotFoundException("Invalid email address. Please try again.");
            var notification = await _notificationRepository.GetNotification(hr, notificationId) ??
                throw new NotificationNotFoundException("Notification does not exist. Please try again.");
            var response = await _notificationRepository.DeleteNotification(notification);
            if (!response)
            {
                throw new Exception("Failed to delete notification.");
            }

            return response;
        }

        public async Task<GetNotificationDto> GetNotification(Guid hrId, Guid notificationId)
        {
            var hr = await _notificationRepository.GetUserById(hrId) ??
              throw new UserNotFoundException("Invalid email address. Please try again.");
            var notification = await _notificationRepository.GetNotification(hr, notificationId) ??
                throw new NotificationNotFoundException("Notification does not exist. Please try again.");
            return _mapper.Map<GetNotificationDto>(notification);
        }

        public async Task<ICollection<GetNotificationDto>> GetNotifications(Guid hrId)
        {
            var hr = await _notificationRepository.GetUserById(hrId) ??
             throw new UserNotFoundException("Invalid email address. Please try again.");
            var notifications = await _notificationRepository.GetNotifications(hr);
            return _mapper.Map<ICollection<GetNotificationDto>>(notifications);
        }

        public async Task<bool> UpdateNotification(Guid hrId, Guid notificationId, JsonPatchDocument<Notification> request)
        {
            var hr = await _notificationRepository.GetUserById(hrId) ??
             throw new UserNotFoundException("Invalid email address. Please try again.");
            var notification = await _notificationRepository.GetNotification(hr, notificationId) ??
               throw new NotificationNotFoundException("Notification does not exist. Please try again.");

            return await _notificationRepository.UpdateNotification(notification, request);

        }

        public Task<GetNotificationDto> UpdateNotifications(Guid hrId, Guid notificationId, UpdateNotificationDto request)
        {
            throw new NotImplementedException();
        }
    }
}
