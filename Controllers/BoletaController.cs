using FacturacionAPI.Data;
using FacturacionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FacturacionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoletaController : ControllerBase
    {
        private readonly FacturacionContext _context;

        public BoletaController(FacturacionContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Boleta>> PostBoleta(Boleta boleta)
        {
            _context.Boletas.Add(boleta);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBoleta), new { id = boleta.BoletaID }, boleta);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Boleta>> GetBoleta(int id)
        {
            var boleta = await _context.Boletas.FindAsync(id);
            if (boleta == null)
            {
                return NotFound();
            }
            return boleta;
        }
    }
}
