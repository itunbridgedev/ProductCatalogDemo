using System;
using Microsoft.AspNetCore.Mvc;

namespace ProductCatalogDemo.Filters {
    public class ValidateProductNameUniqueAttribute : TypeFilterAttribute
    {
        public ValidateProductNameUniqueAttribute() : base(typeof(ValidateProductNameUniqueAttribute)) {}

        
    }
}