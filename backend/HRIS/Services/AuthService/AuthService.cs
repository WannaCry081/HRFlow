using HRIS.Repositories.AuthRepository;
using AutoMapper;
using HRIS.Dtos;
using HRIS.Models;
using HRIS.Models.AuthModels;
using HRIS.Exceptions;
using HRIS.Utils;

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
           throw new NotImplementedException();
        }

        public async Task<string> LoginUser(LoginUserDto request)
        {
           throw new NotImplementedException();
        }

        public async Task<string> SendEmail(ForgotPasswordDto request)
        {
            var response = await _authRepository.SendEmail(_mapper.Map<ForgotPassword>(request));
            return response;
        }
    }
}
