using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restore.API.Data;
using Restore.API.Entities;
using Restore.API.Extensions;
using Restore.API.Helpers;
using System.Text.Json;

namespace Restore.API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext context;

        public ProductsController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = context.Products
                .Sort(productParams.OrderBy) // ProductExtension class
                .Search(productParams.Search)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.Metadata);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return Ok(product);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
