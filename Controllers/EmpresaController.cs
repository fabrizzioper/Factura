using Microsoft.AspNetCore.Mvc;
using FacturacionAPI.Data;
using FacturacionAPI.Models;
using System.Threading.Tasks;
using System;

namespace FacturacionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly FacturacionContext _context;

        public EmpresaController(FacturacionContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Empresa>> PostEmpresa(Empresa empresa)
        {
            try
            {
                _context.Empresas.Add(empresa);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetEmpresa", new { id = empresa.EmpresaID }, empresa);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Empresa>> GetEmpresa(int id)
        {
            var empresa = await _context.Empresas.FindAsync(id);

            if (empresa == null)
            {
                return NotFound();
            }

            return empresa;
        }
    }
}
