using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos
{
    public class GetRecordDto
    {

        public Guid Id { get; set; }
        public string Month { get; set; } = string.Empty;
        public string Day { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public DateTime ClockIn { get; set; }
        public DateTime ClockOut { get; set; }
        public DateTime StartBreak { get; set; }
        public DateTime EndBreak { get; set; }
    }
}