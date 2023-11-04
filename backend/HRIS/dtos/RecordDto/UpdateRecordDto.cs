using System;
using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos
{
    public class UpdateRecordDto
    {

        [Required]
        public DateTime ClockOut { get; set; } = DateTime.Now;
    }
}
