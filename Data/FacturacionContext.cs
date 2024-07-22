using Microsoft.EntityFrameworkCore;
using FacturacionAPI.Models;

namespace FacturacionAPI.Data
{
    public class FacturacionContext : DbContext
    {
        public FacturacionContext(DbContextOptions<FacturacionContext> options) : base(options)
        {
        }

        public DbSet<Empresa> Empresas { get; set; }
        public DbSet<Boleta> Boletas { get; set; }
        public DbSet<DetalleBoleta> DetalleBoletas { get; set; }
    }
}
