using AutoMapper;
using HRIS.Dtos;
using HRIS.Dtos.PositionDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.RecordRepository;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.RecordService
{
    public class RecordService : IRecordService
    {
        private readonly IRecordRepository _recordRepository;
        private readonly IMapper _mapper;

        public RecordService(IRecordRepository recordRepository, IMapper mapper)
        {
            _recordRepository = recordRepository ?? throw new ArgumentNullException(nameof(recordRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CreateRecordDto> CreateRecord(Guid hrId, CreateRecordDto request)
        {
            var hr = await _recordRepository.GetUserById(hrId) ??
                throw new UserNotFoundException("User is not found in the database.");

            var existingRecord = await _recordRepository.GetRecordByUserIdAndDate(hrId, request.ClockIn);
            if (existingRecord != null)
            {
                throw new RecordExistsException("User has already clocked in for today.");
            }

            var record = _mapper.Map<Record>(request);
            record.ClockIn = request.ClockIn;
            record.UserId = hr.Id;
            record.Day = request.ClockIn.ToString("dddd");
            record.Month = request.ClockIn.ToString("MMMM");
            record.Year = request.ClockIn.ToString("yyyy");

            var response = await _recordRepository.CreateRecord(record);
            if(!response)
            {
                throw new RecordExistsException("Failed to add clock in record.");
            }
            return _mapper.Map<CreateRecordDto>(record);
        }

        public async Task<ICollection<GetRecordDto>> GetRecords(Guid hrId)
        {
            var hr = await _recordRepository.GetUserById(hrId) ??
            throw new UserNotFoundException("User is not found in the database.");

            var records = await _recordRepository.GetRecords(hrId);
            return _mapper.Map<ICollection<GetRecordDto>>(records);
        }

        public async Task<UpdateRecordDto> UpdateRecord(Guid hrId, Guid recordId, JsonPatchDocument<Record> request)
        {
            var hr = await _recordRepository.GetUserById(hrId) ??
            throw new UserNotFoundException("User not found");

            var record = await _recordRepository.GetUserByRecord(recordId) ??
            throw new UserNotFoundException("ID not found");

            var isRecordUpdated = await _recordRepository.UpdateRecord(record, request);
            if (!isRecordUpdated)
            {
                throw new Exception("Failed to update information.");
            }

            return _mapper.Map<UpdateRecordDto>(request);
        }
    }
}