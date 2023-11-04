using AutoMapper;
using HRIS.Dtos.ApplicantDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.ApplicantRepository;
using Microsoft.AspNetCore.JsonPatch;

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

        public async Task<GetApplicantRecordDto> CreateApplicantRecord(Guid hrId, CreateApplicantRecordDto request)
        {
            var hr = await _applicantRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var applicant = _mapper.Map<Applicant>(request);
            applicant.TeamId = hr.TeamId;
            var isApplicantExists = await _applicantRepository.IsApplicantExists(hr, applicant);
            if (isApplicantExists)
            {
                throw new ApplicantExistsException("Duplicate entry of applicants. Please try again.");
            }

            var isApplicantAdded = await _applicantRepository.CreateApplicationRecord(hr, applicant);
            if (!isApplicantAdded)
            {
                throw new Exception("Failed to add new applicant.");
            }
            return _mapper.Map<GetApplicantRecordDto>(applicant);
        }

        public async Task<bool> DeleteApplicantRecord(Guid hrId, Guid applicantId)
        {
            var hr = await _applicantRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var applicant = await _applicantRepository.GetApplicantRecord(hr, applicantId) ??
                throw new ApplicantNotFoundException("Invalid applicant credential. Please try again.");
            return await _applicantRepository.DeleteApplicantRecord(applicant);
        }

        public async Task<GetApplicantRecordDto> GetApplicantRecord(Guid hrId, Guid applicantId)
        {
            var hr = await _applicantRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var applicant = await _applicantRepository.GetApplicantRecord(hr, applicantId) ??
                throw new ApplicantNotFoundException("Invalid applicant credential. Please try again.");

            return _mapper.Map<GetApplicantRecordDto>(applicant);
        }

        public async Task<ICollection<GetApplicantRecordDto>> GetApplicantRecords(Guid hrId)
        {
            var hr = await _applicantRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var response = await _applicantRepository.GetApplicantRecords(hr);
            return _mapper.Map<ICollection<GetApplicantRecordDto>>(response);
        }

        public async Task<bool> UpdateApplicantRecord(Guid hrId, Guid applicantId, JsonPatchDocument<Applicant> request)
        {
            var hr = await _applicantRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var applicant = await _applicantRepository.GetApplicantRecord(hr, applicantId) ??
                throw new ApplicantNotFoundException("Invalid applicant credential. Please try again.");

            return await _applicantRepository.UpdateApplicantRecord(applicant, request);
        }

        public async Task<bool> UpdateApplicantRecords(Guid hrId, Guid applicantId, UpdateApplicantRecordDto request)
        {
            var hr = await _applicantRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var applicant = await _applicantRepository.GetApplicantRecord(hr, applicantId) ??
                throw new ApplicantNotFoundException("Invalid applicant credential. Please try again.");

            return await _applicantRepository.UpdateApplicantRecords(applicant, _mapper.Map<Applicant>(request));
        }
    }
}
