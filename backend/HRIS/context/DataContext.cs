using Microsoft.EntityFrameworkCore;

namespace HRIS.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        //USER table
        // public DbSet<User> Users { get; set; }
    }
}
