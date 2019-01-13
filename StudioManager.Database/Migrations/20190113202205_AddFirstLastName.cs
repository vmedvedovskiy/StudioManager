using Microsoft.EntityFrameworkCore.Migrations;

namespace StudioManager.Database.Migrations
{
    public partial class AddFirstLastName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Bookings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Bookings");
        }
    }
}
