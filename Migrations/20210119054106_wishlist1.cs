using Microsoft.EntityFrameworkCore.Migrations;

namespace BookOnlineShop.Migrations
{
    public partial class wishlist1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishLists_Products_ProductsProductID",
                table: "WishLists");

            migrationBuilder.DropIndex(
                name: "IX_WishLists_ProductsProductID",
                table: "WishLists");

            migrationBuilder.DropColumn(
                name: "ProductsProductID",
                table: "WishLists");

            migrationBuilder.AddColumn<int>(
                name: "ProductID",
                table: "WishLists",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WishLists_ProductID",
                table: "WishLists",
                column: "ProductID");

            migrationBuilder.AddForeignKey(
                name: "FK_WishLists_Products_ProductID",
                table: "WishLists",
                column: "ProductID",
                principalTable: "Products",
                principalColumn: "ProductID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishLists_Products_ProductID",
                table: "WishLists");

            migrationBuilder.DropIndex(
                name: "IX_WishLists_ProductID",
                table: "WishLists");

            migrationBuilder.DropColumn(
                name: "ProductID",
                table: "WishLists");

            migrationBuilder.AddColumn<int>(
                name: "ProductsProductID",
                table: "WishLists",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WishLists_ProductsProductID",
                table: "WishLists",
                column: "ProductsProductID");

            migrationBuilder.AddForeignKey(
                name: "FK_WishLists_Products_ProductsProductID",
                table: "WishLists",
                column: "ProductsProductID",
                principalTable: "Products",
                principalColumn: "ProductID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
