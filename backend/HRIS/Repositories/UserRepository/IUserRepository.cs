﻿using HRIS.Models;

namespace HRIS.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<User?> GetUserById(Guid userId);
        Task<bool> UpdateUserProfile(User user, User request);
        Task<bool> UpdateUserPassword(User user, string passwordHash, string passwordSalt);
    }
}
