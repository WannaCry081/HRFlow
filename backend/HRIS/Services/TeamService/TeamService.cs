using HRIS.Dtos.TeamDto;
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
            _teamRepository = teamRepository;
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

        public async Task<bool> JoinTeam(Guid userId, JoinTeamDto request)
        {
            var user = await _teamRepository.GetUserById(userId) ??
                throw new UserNotFoundException("Invalid email address. Please try again.");

            var team = await _teamRepository.GetTeamByCode(request.Code) ??
                throw new TeamNotFoundException("Invalid team code. Please try again.");

            return await _teamRepository.JoinTeam(user, team, request.Code);
        }
    }
}
