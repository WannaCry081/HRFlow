using AutoMapper;
using HRIS.Dtos.UserDto;
using HRIS.Exceptions;
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
    }
}
