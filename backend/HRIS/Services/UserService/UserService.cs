using AutoMapper;
using HRIS.Context;
using HRIS.Dtos.UserDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.UserRepository;
using HRIS.Utils;
using Microsoft.EntityFrameworkCore;

namespace HRIS.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;

        public UserService(IMapper mapper, DataContext context, IUserRepository userRepository)
        {
            _mapper = mapper;
            _context = context;
            _userRepository = userRepository;
        }

        public async Task<GetUserProfileDto> GetUserProfile(Guid userId)
        {
            var response = await _userRepository.GetUserById(userId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var team = await _context.Teams
                        .Where(c => c.Id.Equals(response.TeamId))
                        .FirstOrDefaultAsync() ?? throw new TeamNotFoundException("Team does not exist");

            var user = _mapper.Map<GetUserProfileDto>(response);
            user.TeamCode = team.Code;

            return user;
        }

        public async Task<GetUserProfileDto> UpdateUserPassword(Guid userId, UpdateUserPasswordDto request)
        {
            var user = await _userRepository.GetUserById(userId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            if (!Password.Verify(user.PasswordHash, request.OldPassword))
            {
                throw new UnauthorizedAccessException("Invalid user's credentials. Please try again.");
            }

            if (!request.NewPassword.Equals(request.NewPassword))
            {
                throw new BadHttpRequestException("Password does not match. Please try again.");
            }

            Password.Encrypt(request.NewPassword, out string passwordHash, out string passwordSalt);
            var isUserUpdated = await _userRepository.UpdateUserPassword(user, passwordHash, passwordSalt);
            if (!isUserUpdated)
            {
                throw new Exception("Failed to update user's credential to database.");
            }
            return _mapper.Map<GetUserProfileDto>(user);
        }

        public async Task<GetUserProfileDto> UpdateUserProfile(Guid userId, UpdateUserProfileDto request)
        {
            var user = await _userRepository.GetUserById(userId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");
            var isUserUpdated = await _userRepository.UpdateUserProfile(
                user, _mapper.Map<User>(request));

            if (!isUserUpdated)
            {
                throw new Exception("Failed to update user's credential to database.");
            }
            return _mapper.Map<GetUserProfileDto>(user);
        }
    }
}
