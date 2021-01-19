using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BookOnlineShop.Migrations
{
    public partial class answerreview : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CustomerName",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)");

            migrationBuilder.CreateTable(
                name: "Answer",
                columns: table => new
                {
                    AnswerID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Message = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    AnswerTime = table.Column<DateTime>(nullable: false),
                    UserName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer", x => x.AnswerID);
                });

            migrationBuilder.CreateTable(
                name: "ReviewAnswer",
                columns: table => new
                {
                    AnswerID = table.Column<int>(nullable: false),
                    ReviewID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewAnswer", x => new { x.ReviewID, x.AnswerID });
                    table.ForeignKey(
                        name: "FK_ReviewAnswer_Answer_AnswerID",
                        column: x => x.AnswerID,
                        principalTable: "Answer",
                        principalColumn: "AnswerID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReviewAnswer_Reviews_ReviewID",
                        column: x => x.ReviewID,
                        principalTable: "Reviews",
                        principalColumn: "ReviewID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReviewAnswer_AnswerID",
                table: "ReviewAnswer",
                column: "AnswerID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReviewAnswer");

            migrationBuilder.DropTable(
                name: "Answer");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerName",
                table: "Orders",
                type: "nvarchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
