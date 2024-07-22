using FacturacionAPI.Data;
using FacturacionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FacturacionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalleBoletaController : ControllerBase
    {
        private readonly FacturacionContext _context;

        public DetalleBoletaController(FacturacionContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<DetalleBoleta>> PostDetalleBoleta(DetalleBoleta detalleBoleta)
        {
            _context.DetalleBoletas.Add(detalleBoleta);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDetalleBoleta), new { id = detalleBoleta.DetalleID }, detalleBoleta);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DetalleBoleta>> GetDetalleBoleta(int id)
        {
            var detalleBoleta = await _context.DetalleBoletas.FindAsync(id);
            if (detalleBoleta == null)
            {
                return NotFound();
            }
            return detalleBoleta;
        }
    }
}
