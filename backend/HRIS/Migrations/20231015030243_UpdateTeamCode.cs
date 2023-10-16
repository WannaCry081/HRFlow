using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRIS.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTeamCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GroupCode",
                table: "Users",
                newName: "TeamCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TeamCode",
                table: "Users",
                newName: "GroupCode");
        }
    }
}
