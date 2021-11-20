
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using UsuarioBackEnd.Models;

namespace UsuarioBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EscolaridadeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EscolaridadeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<ActionResult<IEnumerable<Escolaridade>>> GetEscolaridade()
        {
            return await _context.Escolaridade.ToListAsync();
        }
    }
}
