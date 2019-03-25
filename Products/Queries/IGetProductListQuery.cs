using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductCatalogDemo.Products.Queries {
    public interface IGetProductListQuery
    {
        Task<IEnumerable<ProductListModel>> Execute();
    }
}