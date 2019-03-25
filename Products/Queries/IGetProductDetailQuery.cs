using System.Threading.Tasks;

namespace ProductCatalogDemo.Products.Queries {
    public interface IGetProductDetailQuery
    {
        Task<ProductDetailModel> Execute(string id);
    }
}