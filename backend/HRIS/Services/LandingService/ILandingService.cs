using HRIS.Dtos.LandingDto;

namespace HRIS.Services.LandingService
{
    public interface ILandingService
    {
        Task<string> ContactUs(ContactUsDto request);
    }
}
