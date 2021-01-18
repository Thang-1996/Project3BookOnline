using Microsoft.EntityFrameworkCore.Migrations;

namespace BookOnlineShop.Migrations
{
    public partial class adduserid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "idUser",
                table: "Reviews",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "idUser",
                table: "Reviews");
        }
    }
}
