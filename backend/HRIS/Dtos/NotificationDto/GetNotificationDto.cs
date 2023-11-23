namespace HRIS.Dtos.NotificationDto
{
    public class GetNotificationDto
    {
        public Guid Id { get; set; }
        public string Subject { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;
    }
}
