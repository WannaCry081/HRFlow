using System;
using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos
{
    public class CreateRecordDto
    {
        [Required]
        public DateTime ClockIn { get; set; } = DateTime.Now;
    }
}
