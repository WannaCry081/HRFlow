using HRIS.Context;
using HRIS.Models;

namespace HRIS.Repositories.HumanResourceRepository
{
    public class HumanResourceRepository : IHumanResourceRepository
    {
        private readonly DataContext _context;
        
        public HumanResourceRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public Task<bool> CreateEmployeeRecord(User employee)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateEmployeeRecord(User employee, User newEmployeeDetails)
        {
            throw new NotImplementedException();
        }
    }
}
