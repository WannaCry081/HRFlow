﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HRIS.Models
{
    [Table("Departments")]
    public class Department
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [StringLength(50)]
        public string Manager { get; set; } = string.Empty;

        [StringLength(50)]
        public string Assistant { get; set; } = string.Empty;
        public ICollection<User> Supervisors { get; set; } = new List<User>();

        [JsonIgnore]
        public ICollection<User> Users { get; set; } = new List<User>();

        [JsonIgnore]
        public ICollection<Position> Positions { get; set; } = new List<Position>();
    }
}