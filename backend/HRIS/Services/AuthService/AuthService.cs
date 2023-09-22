using HRIS.Repositories.AuthRepository;
using AutoMapper;
using HRIS.Dtos;
using HRIS.Models;
using HRIS.Models.AuthModels;
using HRIS.Exceptions;
using HRIS.Utils;
using Microsoft.AspNetCore.Identity;

namespace HRIS.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IMapper mapper, IAuthRepository authRepository, IConfiguration configuration)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _authRepository = authRepository ?? throw new ArgumentNullException(nameof(authRepository));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<string> RegisterUser(RegisterUserDto request)
        {
            var isEmailExists = await _authRepository.IsEmailExists(request.Email);
            if (!isEmailExists)
            {
                throw new UserExistsException("User is already recorded to the database.");
            }

            Password.Encrypt(request.Password, out string passwordHash, out string passwordSalt);

            var newUser = _mapper.Map<User>(request);
            newUser.PasswordHash = passwordHash;
            newUser.PasswordSalt = passwordSalt;

            var isUserAdded = await _authRepository.AddUser(newUser);
            if (!isUserAdded)
            {
                throw new Exception("Failed to save user information to database.");
            }

            return CodeGenerator.Token(_configuration, request.Email, DateTime.Now.AddDays(1));
        }

        public async Task<string> LoginUser(LoginUserDto request)
        {
            var user = await _authRepository.GetUserByEmail(request.Email);
            if (user is null)
            {
                throw new UserNotFoundException("User is not recorded to the database.");
            }

            if (!Password.Verify(user.PasswordHash, request.Password))
            {
                throw new UnauthorizedAccessException("Password does not match with the user's credentials.");
            }

            return CodeGenerator.Token(_configuration, request.Email, DateTime.Now.AddDays(1));
        }

        public async Task<string> SendEmail(ForgotPasswordDto request)
        {
            var response = await _authRepository.SendEmail(_mapper.Map<ForgotPassword>(request));
            return response;
        }
    }
}
