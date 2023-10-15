﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace HRIS.Dtos.UserDto
{
    public class UpdateUserPasswordDto
    {
        [PasswordPropertyText]
        [Required(ErrorMessage = "Old Password is required.")]
        [StringLength(150, ErrorMessage = "Old Password must be between {2} and {1} characters long.", MinimumLength = 8)]
        public string OldPassword { get; set; } = string.Empty;

        [PasswordPropertyText]
        [Required(ErrorMessage = "New Password is required.")]
        [StringLength(150, ErrorMessage = "New Password must be between {2} and {1} characters long.", MinimumLength = 8)]
        public string NewPassword { get; set; } = string.Empty;

        [PasswordPropertyText]
        [Compare("NewPassword", ErrorMessage = "Password does not match.")]
        [Required(ErrorMessage = "Confirm New Password is required.")]
        [StringLength(150, ErrorMessage = "Confirm New Password must be between {2} and {1} characters long.", MinimumLength = 8)]
        public string ConfirmNewPassword { get; set; } = string.Empty;
    }
}