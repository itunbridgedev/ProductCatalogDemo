using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ProductCatalogDemo.Filters {
    public class ValidateProductNameUniqueAttribute : TypeFilterAttribute
    {
        public ValidateProductNameUniqueAttribute() : base(typeof(ValidateProductNameUniqueAttribute)) {}

        private class ValidateProductNameUniqueFilterImpl : IAsyncActionFilter
        {
            private readonly ApiContext _context;

            public ValidateProductNameUniqueFilterImpl(ApiContext context) 
            {
                _context = context;
            }
            public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
            {
                var name = context.ActionArguments["name"] as string;
                if (name != null) {
                    if (_context.Products.Any(p=> p.Name == name)) {
                        context.Result = new BadRequestObjectResult(context.ModelState);
                    }
                }
                await next();
            }
        }
    }
}