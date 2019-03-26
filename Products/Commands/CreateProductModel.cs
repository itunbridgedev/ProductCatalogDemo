using System.ComponentModel.DataAnnotations;

namespace ProductCatalogDemo.Products.Commands
{
    public class CreateProductModel
    {
        public int ProductId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
