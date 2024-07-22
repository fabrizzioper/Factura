using System;
using System.ComponentModel.DataAnnotations;

namespace FacturacionAPI.Models
{
    public class Boleta
    {
        [Key]
        public int BoletaID { get; set; }
        public int EmpresaID { get; set; }
        public DateTime Fecha { get; set; }
        public string Nro { get; set; } = string.Empty;
    }
}
