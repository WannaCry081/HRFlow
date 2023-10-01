using AutoMapper;
using HRIS.Dtos.UserDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.UserRepository;

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

        public async Task<GetUserProfileDto> GetUserProfile(Guid id)
        {
            var response = await _userRepository.GetUserById(id) ??
                throw new UserNotFoundException("User is not recorded in the database.");

            return _mapper.Map<GetUserProfileDto>(response);
        }

        public async Task<GetUserProfileDto> UpdateUserProfile(Guid id, UpdateUserProfileDto request)
        {
            var user = await _userRepository.GetUserById(id) ??
                throw new UserNotFoundException("User is not recorded in the database.");
            var isUserUpdated = await _userRepository.UpdateUserProfile(
                user, _mapper.Map<User>(request));

            if (!isUserUpdated)
            {
                throw new Exception("Failed to update user profile to database.");
            }
            return _mapper.Map<GetUserProfileDto>(user);
        }
    }
}
