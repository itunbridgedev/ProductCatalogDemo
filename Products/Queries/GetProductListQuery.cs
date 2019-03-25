using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ProductCatalogDemo.Products.Queries
{
    public class GetProductListQuery : IGetProductListQuery
    {
        public readonly ApiContext _context;

        public GetProductListQuery(ApiContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductListModel>> Execute()
        {
            return await _context.Products.Select(p =>
                new ProductListModel
                {
                    Id = p.Id,
                    Name = p.Name
                }).ToListAsync();
            // return new List<ProductListModel> {
            //     new ProductListModel {
            //         Name = "Franc",
            //         Id = "2"
            //     }
            // };
        }
    }
}