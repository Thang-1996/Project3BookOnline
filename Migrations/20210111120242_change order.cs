using Microsoft.EntityFrameworkCore.Migrations;

namespace BookOnlineShop.Migrations
{
    public partial class changeorder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderName",
                table: "Orders",
                newName: "Address");

            migrationBuilder.AddColumn<string>(
                name: "OrderNote",
                table: "Orders",
                type: "ntext",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Telephone",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "OrderProducts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderNote",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Telephone",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "quantity",
                table: "OrderProducts");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Orders",
                newName: "OrderName");
        }
    }
}
