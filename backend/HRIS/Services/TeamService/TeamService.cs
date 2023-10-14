using HRIS.Dtos.UserDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.TeamRepository;
using HRIS.Utils;

namespace HRIS.Services.TeamService
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;

        public TeamService(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository ??
                throw new ArgumentNullException(nameof(teamRepository));
        }

        public async Task<bool> CreateTeam(Guid userId, CreateTeamDto request)
        {
            var user = await _teamRepository.GetUserById(userId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var newTeam = new Team()
            {
                Id = Guid.NewGuid(),
                Code = CodeGenerator.AlphaNumeric(8),
                Name = request.Name
            };

            return await _teamRepository.CreateTeam(user, newTeam);
        }
    }
}
