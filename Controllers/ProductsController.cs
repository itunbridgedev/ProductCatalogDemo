using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductCatalogDemo.Products.Queries;
using ProductCatalogDemo.Products.Commands;
using ProductCatalogDemo.Filters;

namespace ProductCatalogDemo {
    [Produces("application/json")]
    [Route("api/[controller]")]

    public class ProductsController : Controller
    {
        private readonly IGetProductListQuery _getProductListQuery;
        private readonly IGetProductDetailQuery _getProductDetailQuery;
        private readonly ICreateProductCommand _createProductCommand;

        public ProductsController(
            IGetProductListQuery getProductListQuery,
            IGetProductDetailQuery getProductDetailQuery,
            ICreateProductCommand createProductCommand) 
        {
            _getProductListQuery = getProductListQuery;
            _getProductDetailQuery = getProductDetailQuery;
            _createProductCommand = createProductCommand;
        }

        // GET: api/Products
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ProductListModel>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProducts() 
        {
            return Ok(await _getProductListQuery.Execute());
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(ProductDetailModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProduct([FromRoute] string id)
        {
            var product = await _getProductDetailQuery.Execute(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // POST: api/Products
        [HttpPost]
        [ProducesResponseType(typeof(IDictionary<string, string>), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(CreateProductModel), (int)HttpStatusCode.Created)]
        [ValidateProductNameUnique]
        public async Task<IActionResult> PostProduct([FromBody] CreateProductModel product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _createProductCommand.Execute(product);

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

    }
}