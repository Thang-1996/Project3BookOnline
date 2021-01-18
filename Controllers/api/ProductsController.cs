using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookOnlineShop.Data;
using BookOnlineShop.Models;

namespace BookOnlineShop.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
        {
            
            return await _context.Products
                .Include(at => at.AuthorProducts)
                .ThenInclude(a => a.Author)
                  .Include(pp => pp.PublisherProducts)
                .ThenInclude(p => p.Publisher)
                    .Include(rp => rp.ReviewProducts)
                .ThenInclude(r => r.Review)
                     .Include(op => op.OrderProducts)
                .ThenInclude(o => o.Orders)
             .ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        

        public async Task<ActionResult<Products>> GetProducts(int id)
        {
            var products = await _context.Products

                .Include(ap => ap.AuthorProducts)
                .ThenInclude(a => a.AuthorID)
                .Include(pp => pp.PublisherProducts)
                .ThenInclude(p => p.PublisherID)
                .Include(rp => rp.ReviewProducts)
                .ThenInclude(r => r.Review)
                  .Include(op => op.OrderProducts)
                .ThenInclude(o => o.Orders)
                .Where(p => p.ProductID == id).FirstOrDefaultAsync();
            if (products == null)
            {
                return NotFound();
            }

            return products;
        }
        // GET: api/Products/detail/5
        [HttpGet("Detail/{id}")]
        
        public async Task<ActionResult<Products>> Detail(int id)
        {
            var products = await _context.Products
                .Include(c => c.Category)
                
                .Include(at=>at.AuthorProducts)
                .ThenInclude(a=>a.Author)
                .Include(pp=>pp.PublisherProducts)
                .ThenInclude(pb=>pb.Publisher)
                .Include(op=>op.OrderProducts)
                .ThenInclude(o=>o.Orders)
                .Where(p => p.ProductID == id).FirstOrDefaultAsync();

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        

        public async Task<ActionResult<Products>> PutProducts(int id, Products products)
        {

            if (id != products.ProductID)
            {
                return BadRequest();
            }

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return products;
        }

        // POST: api/Products
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        

        public async Task<ActionResult<Products>> PostProducts(Products products)
        {
            _context.Products.Add(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = products.ProductID }, products);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        

        public async Task<ActionResult<Products>> DeleteProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            _context.Products.Remove(products);
            await _context.SaveChangesAsync();
            
            return products;
        }

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.ProductID == id);
        }
    }
}
