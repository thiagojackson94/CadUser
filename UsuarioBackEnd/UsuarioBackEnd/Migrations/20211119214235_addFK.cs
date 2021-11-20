using Microsoft.EntityFrameworkCore.Migrations;

namespace UsuarioBackEnd.Migrations
{
    public partial class addFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Escolaridade",
                table: "Usuario");

            migrationBuilder.AddColumn<int>(
                name: "escolaridadeId",
                table: "Usuario",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_escolaridadeId",
                table: "Usuario",
                column: "escolaridadeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuario_Escolaridade_escolaridadeId",
                table: "Usuario",
                column: "escolaridadeId",
                principalTable: "Escolaridade",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.InsertData(
            table: "Escolaridade",
            columns: new[] { "Descricao" },
            values: new object[,]
            {
                { "Infantil" },
                { "Fundamental" },
                { "Médio" },
                { "Superior" }
            });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuario_Escolaridade_escolaridadeId",
                table: "Usuario");

            migrationBuilder.DropIndex(
                name: "IX_Usuario_escolaridadeId",
                table: "Usuario");

            migrationBuilder.DropColumn(
                name: "escolaridadeId",
                table: "Usuario");

            migrationBuilder.AddColumn<string>(
                name: "Escolaridade",
                table: "Usuario",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
