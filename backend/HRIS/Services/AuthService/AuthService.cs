using HRIS.Repositories.AuthRepository;
using AutoMapper;
using HRIS.Dtos;
using HRIS.Models.AuthModels;

namespace HRIS.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _repository;
        private readonly IMapper _mapper;


        public AuthService(IAuthRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<string> SendEmail(ForgotPasswordDto request)
        {
            var response = await _repository.SendEmail(_mapper.Map<ForgotPassword>(request));

            return response;
        }
    }
}
