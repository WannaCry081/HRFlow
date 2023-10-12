using HRIS.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace HRIS.Repositories.HumanResourceRepository
{
    public interface IHumanResourceRepository
    {
        Task<bool> CreateEmployeeRecord(Guid id, User request);
        Task<bool> UpdateEmployeeRecords(User user);
        Task<bool> UpdateEmployeeRecord(User user, JsonPatchDocument<User> request);
    }
}
