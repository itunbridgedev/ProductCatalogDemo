using System.Threading.Tasks;

namespace ProductCatalogDemo.Products.Commands
{
    public interface ICreateProductCommand
    {
        Task Execute(CreateProductModel model);
    }
}