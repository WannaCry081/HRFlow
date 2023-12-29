using HRIS.Models;
using Microsoft.EntityFrameworkCore;

namespace HRIS.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Team> Teams => Set<Team>();
        public DbSet<Applicant> Applicants => Set<Applicant>();
        public DbSet<Department> Departments => Set<Department>();
        public DbSet<Position> Positions => Set<Position>();
        public DbSet<Record> Records => Set<Record>();
        public DbSet<Notification> Notifications => Set<Notification>();
        public DbSet<Salary> Salary => Set<Salary>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(x => x.Id);
        }
    }
}
