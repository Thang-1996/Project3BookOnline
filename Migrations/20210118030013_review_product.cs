using Microsoft.EntityFrameworkCore.Migrations;

namespace BookOnlineShop.Migrations
{
    public partial class review_product : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    ReviewID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Message = table.Column<string>(nullable: true),
                    Rate = table.Column<int>(nullable: false),
                    UserID = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.ReviewID);
                });

            migrationBuilder.CreateTable(
                name: "ReviewProducts",
                columns: table => new
                {
                    ReviewID = table.Column<int>(nullable: false),
                    ProductID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewProducts", x => new { x.ReviewID, x.ProductID });
                    table.ForeignKey(
                        name: "FK_ReviewProducts_Products_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReviewProducts_Reviews_ReviewID",
                        column: x => x.ReviewID,
                        principalTable: "Reviews",
                        principalColumn: "ReviewID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReviewProducts_ProductID",
                table: "ReviewProducts",
                column: "ProductID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReviewProducts");

            migrationBuilder.DropTable(
                name: "Reviews");
        }
    }
}
