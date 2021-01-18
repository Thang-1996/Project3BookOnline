using Microsoft.EntityFrameworkCore.Migrations;

namespace BookOnlineShop.Migrations
{
    public partial class updateorders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)");

            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "Orders",
                type: "nvarchar(255)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "Orders");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Orders",
                type: "nvarchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
