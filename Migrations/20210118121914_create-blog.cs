using Microsoft.EntityFrameworkCore.Migrations;

namespace BookOnlineShop.Migrations
{
    public partial class createblog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReviewAnswer_Answer_AnswerID",
                table: "ReviewAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_ReviewAnswer_Reviews_ReviewID",
                table: "ReviewAnswer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReviewAnswer",
                table: "ReviewAnswer");

            migrationBuilder.RenameTable(
                name: "ReviewAnswer",
                newName: "ReviewAnswers");

            migrationBuilder.RenameIndex(
                name: "IX_ReviewAnswer_AnswerID",
                table: "ReviewAnswers",
                newName: "IX_ReviewAnswers_AnswerID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReviewAnswers",
                table: "ReviewAnswers",
                columns: new[] { "ReviewID", "AnswerID" });

            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    BlogID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    BlogImage = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    UserName = table.Column<int>(nullable: false),
                    ViewCount = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.BlogID);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ReviewAnswers_Answer_AnswerID",
                table: "ReviewAnswers",
                column: "AnswerID",
                principalTable: "Answer",
                principalColumn: "AnswerID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReviewAnswers_Reviews_ReviewID",
                table: "ReviewAnswers",
                column: "ReviewID",
                principalTable: "Reviews",
                principalColumn: "ReviewID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReviewAnswers_Answer_AnswerID",
                table: "ReviewAnswers");

            migrationBuilder.DropForeignKey(
                name: "FK_ReviewAnswers_Reviews_ReviewID",
                table: "ReviewAnswers");

            migrationBuilder.DropTable(
                name: "Blogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReviewAnswers",
                table: "ReviewAnswers");

            migrationBuilder.RenameTable(
                name: "ReviewAnswers",
                newName: "ReviewAnswer");

            migrationBuilder.RenameIndex(
                name: "IX_ReviewAnswers_AnswerID",
                table: "ReviewAnswer",
                newName: "IX_ReviewAnswer_AnswerID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReviewAnswer",
                table: "ReviewAnswer",
                columns: new[] { "ReviewID", "AnswerID" });

            migrationBuilder.AddForeignKey(
                name: "FK_ReviewAnswer_Answer_AnswerID",
                table: "ReviewAnswer",
                column: "AnswerID",
                principalTable: "Answer",
                principalColumn: "AnswerID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReviewAnswer_Reviews_ReviewID",
                table: "ReviewAnswer",
                column: "ReviewID",
                principalTable: "Reviews",
                principalColumn: "ReviewID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
