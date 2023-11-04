using AutoMapper;
using HRIS.Dtos;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.RecordRepository;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Services.RecordService
{
    public class RecordService : IRecordService
    {
        private readonly IRecordRepository _recordRepository;
        private readonly IMapper _mapper;

        public RecordService(IRecordRepository recordRepository, IMapper mapper)
        {
            _recordRepository = recordRepository;
            _mapper = mapper;
        }

        public async Task<GetRecordDto> CreateRecord(Guid userId)
        {
            DateTime clockIn = DateTime.Now;
            var existingRecord = await _recordRepository.GetRecordByDate(userId, clockIn);
            if (existingRecord is not null)
            {
                throw new RecordExistsException("User has already clocked in for today.");
            }

            Record newRecord = new() {
                ClockIn = clockIn,
                UserId = userId,
                Day = clockIn.ToString("dddd"),
                Month = clockIn.ToString("MMMM"),
                Year = clockIn.ToString("yyyy")
            };

            var response = await _recordRepository.CreateRecord(newRecord);
            if(!response)
            {
                throw new RecordExistsException("Failed to add clock in record.");
            }
            return _mapper.Map<GetRecordDto>(newRecord);
        }

        public async Task<ICollection<GetRecordDto>> GetRecords(Guid userId)
        {
            var records = await _recordRepository.GetRecords(userId);
            return _mapper.Map<ICollection<GetRecordDto>>(records);
        }

        public async Task<bool> UpdateRecord(Guid userId, Guid recordId, JsonPatchDocument<Record> request)
        {
            var record = await _recordRepository.GetRecordById(userId, recordId)
                ?? throw new RecordNotFoundException("Record not found. Please try again later.");

            return await _recordRepository.UpdateRecord(record, request);
        }
    }
}