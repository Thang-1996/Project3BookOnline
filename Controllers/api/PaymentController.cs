using BookOnlineShop.Data;
using BookOnlineShop.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookOnlineShop.Controllers.api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        public PaymentController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
    
            _userManager = userManager;
            _context = context;
   
        }
        // GET: api/<PaymentController>
        [HttpGet]
        [ActionName("getUserInfo")]
        public async Task<ApplicationUser> getUserInfo()
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null) return null;
         
            return currentUser;
        }
        [HttpGet]
        [ActionName("GetOrders")]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(od => od.OrderProducts)
                .ThenInclude(p => p.Products)
                .ToListAsync();

            if (orders == null)
            {
                return NotFound();
            }

            return orders;
        }
        [HttpGet]
        [ActionName("GetOrdersByUser")]
        public async Task<ActionResult<Orders>> GetOrdersByUser(string id)
        {
            var order = await _context.Orders
                .Include(od => od.OrderProducts)
                .ThenInclude(p => p.Products)
                .Where(o => o.UserID == id).FirstOrDefaultAsync();

            if (order == null) { 
            
                return NotFound();
            }

            return order;
        }
        [HttpPost]
        [ActionName("saveOrder")]
        public void saveOrder([FromBody] dynamic payment)
        {
            /*_context.Orders.Add(checkout);
            await _context.SaveChangesAsync();*/
            Console.WriteLine(JsonConvert.SerializeObject(payment));
            
            /*return CreatedAtAction("GetOrders", new { id = orders.ID }, orders);*/
        }

    }
}
