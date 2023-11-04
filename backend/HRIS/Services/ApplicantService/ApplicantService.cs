using AutoMapper;
using HRIS.Dtos.ApplicantDto;
using HRIS.Exceptions;
using HRIS.Repositories.ApplicantRepository;

namespace HRIS.Services.ApplicantService
{
    public class ApplicantService : IApplicantService
    {
        private readonly IMapper _mapper;
        private readonly IApplicantRepository _applicantRepository;

        public ApplicantService(IMapper mapper, IApplicantRepository applicantRepository)
        {
            _mapper = mapper;
            _applicantRepository = applicantRepository;
        }

        public async Task<ICollection<GetApplicantDto>> GetApplicantRecords(Guid hrId)
        {
            var hr = await _applicantRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var response = await _applicantRepository.GetApplicantRecords(hr);
            return _mapper.Map<ICollection<GetApplicantDto>>(response);
        }
    }
}
