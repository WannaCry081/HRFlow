using AutoMapper;
using HRIS.Dtos.UserDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.UserRepository;
using HRIS.Utils;

namespace HRIS.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public UserService(IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public async Task<GetUserProfileDto> GetUserProfile(Guid userId)
        {
            var response = await _userRepository.GetUserById(userId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            return _mapper.Map<GetUserProfileDto>(response);
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

        public async Task<bool> JoinTeam(Guid userId, JoinTeamDto request)
        {
            var user = await _userRepository.GetUserById(userId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var team = await _userRepository.GetTeamByCode(request.Code) ??
                throw new TeamNotFoundException("Invalid team code. Please try again.");

            return await _userRepository.JoinTeam(user, team, request.Code);
        }
    }
}
