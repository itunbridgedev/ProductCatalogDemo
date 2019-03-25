using Microsoft.EntityFrameworkCore;
using ProductCatalogDemo.Models;

namespace ProductCatalogDemo {
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) 
            : base(options)
        {            
        }

        public DbSet<Product> Products { get; set; }
    }
}