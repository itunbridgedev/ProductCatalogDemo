using System.Threading.Tasks;
using ProductCatalogDemo.Models;

namespace ProductCatalogDemo.Products.Commands
{
    public class CreateProductCommand : ICreateProductCommand
    {
        public readonly ApiContext _context;

        public CreateProductCommand(ApiContext context)
        {
            _context = context;
        }

        public async Task Execute(CreateProductModel model)
        {
            var entity = new Product
            {
                Id = model.ProductId,
                Name = model.Name,
                Description = model.Description
            };

            _context.Products.Add(entity);

            await _context.SaveChangesAsync();
        }
    }
}
