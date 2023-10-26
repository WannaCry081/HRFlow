using HRIS.Dtos.LandingDto;
using HRIS.Utils;

namespace HRIS.Services.LandingService
{
    public class LandingService : ILandingService
    {
        private readonly IConfiguration _configuration;
        public LandingService(IConfiguration configuration)
        {
            _configuration = configuration ??
                throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<string> ContactUs(ContactUsDto request)
        {
            return await SMTP.SendEmailToPage(
                _configuration, request.Email, request.Subject, request.Body);
        }
    }
}
