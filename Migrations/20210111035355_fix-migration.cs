using Microsoft.EntityFrameworkCore.Migrations;

namespace BookOnlineShop.Migrations
{
    public partial class fixmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ProductContent",
                table: "Products",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "ntext");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ProductContent",
                table: "Products",
                type: "ntext",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
