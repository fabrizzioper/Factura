using System.ComponentModel.DataAnnotations;

namespace FacturacionAPI.Models
{
    public class Empresa
    {
        [Key]
        public int EmpresaID { get; set; }
        public string RazonSocial { get; set; } = string.Empty;
        public string RUC { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
    }
}
