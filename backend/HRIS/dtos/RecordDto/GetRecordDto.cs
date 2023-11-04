using System;
using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos
{
    public class GetRecordDto
    {
        [StringLength(10)]
        public string Month { get; set; }

        [StringLength(10)]
        public string Day { get; set; }

        [StringLength(10)]
        public string Year { get; set; }

        public DateTime ClockIn { get; set; }

        public DateTime ClockOut { get; set; }
    }
}
