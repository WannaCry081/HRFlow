using HRIS.Repositories.AuthRepository;
using AutoMapper;
using HRIS.Dtos;
using HRIS.Models.AuthModels;

namespace HRIS.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepository;

        public AuthService(IMapper mapper, IAuthRepository authRepository)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _authRepository = authRepository ?? throw new ArgumentNullException(nameof(authRepository));
        }

        public async Task<string> SendEmail(ForgotPasswordDto request)
        {
            var response = await _authRepository.SendEmail(_mapper.Map<ForgotPassword>(request));
            return response;
        }
    }
}
