using Microsoft.EntityFrameworkCore.Migrations;

namespace UsuarioBackEnd.Migrations
{
    public partial class addValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        }
    }
}
