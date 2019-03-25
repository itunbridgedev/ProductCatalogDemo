using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ProductCatalogDemo.Products.Queries {
    public class GetProductDetailQuery : IGetProductDetailQuery
    {
        private readonly ApiContext _context;

        public GetProductDetailQuery(ApiContext context) {
            _context = context;
        }

        public async Task<ProductDetailModel> Execute(string id)
        {
            var product = await _context.Products.FindAsync(id);

            if(product == null) 
                return null;
            
            return new ProductDetailModel
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description
            };
        }
    }
}