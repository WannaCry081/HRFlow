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

        public async Task<bool> CreateEmployeeRecord(User employee)
        {
            _context.Add(employee);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public Task<bool> UpdateEmployeeRecord(User employee, User newEmployeeDetails)
        {
            throw new NotImplementedException();
        }
    }
}
