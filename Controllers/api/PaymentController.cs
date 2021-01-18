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
        private IPasswordHasher<ApplicationUser> passwordHasher;
        public PaymentController(UserManager<ApplicationUser> userManager, ApplicationDbContext context, IPasswordHasher<ApplicationUser> passwordHash)
        {
    
            _userManager = userManager;
            _context = context;
            passwordHasher = passwordHash;

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
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrdersByUser(string id)
        {
            var orders = await _context.Orders
                .Include(od => od.OrderProducts)
                .ThenInclude(p => p.Products)
                .Where(od => od.UserID == id).ToListAsync();
            if (orders == null) { 
            
                return NotFound();
            }
            return orders;
        }
        [HttpPost]
        [ActionName("saveOrder")]
        public async Task<ActionResult<Payment>> saveOrder(Payment payment)
        {
            var cart = payment.carts;
            var orders = payment.orders;
            decimal total = 0;
       
            Console.WriteLine(JsonConvert.SerializeObject(payment));
            if(orders.GrandTotal < 500000)
            {
                total = orders.GrandTotal + 30000;
            }
            else
            {
                total = orders.GrandTotal;
            }
            Orders orders1 = new Orders
            {
                CustomerName = orders.CustomerName,
                Address = orders.Address,
                paymenttype = orders.paymenttype,
                Telephone = orders.Telephone,
                OrderNote = orders.OrderNote,
                Status = orders.Status,
                GrandTotal = total,
                UserID = orders.UserID,
                CreateAt = DateTime.Now,
                UpdateAt = DateTime.Now
            };
            _context.Orders.Add(orders1);
            _context.SaveChanges();
            foreach (var item in cart)
            {
                OrderProducts orderProducts = new OrderProducts();
                orderProducts.OrderID = orders1.ID;
                orderProducts.ProductID = item.product.ProductID;
                orderProducts.UserID = orders.UserID;
                orderProducts.quantity = item.quantity;
                _context.Add(orderProducts);
                _context.SaveChanges();
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPost]
        [ActionName("saveChangeUser")]
        public async Task<ActionResult<ApplicationUser>> saveChangeUser(ApplicationUser user)
        {
            Console.WriteLine(user.Address);

            ApplicationUser us = await _userManager.FindByIdAsync(user.Id);
            if(user != null)
            {
                    if (!string.IsNullOrEmpty(user.Email))
                    {
                    us.Email = user.Email;
                    us.NormalizedEmail = user.Email;

                    }
                if (!string.IsNullOrEmpty(user.Address))
                {
                    us.Address = user.Address;

                }
                if (!string.IsNullOrEmpty(user.UserName))
                {
                    us.name = user.name;
                    us.UserName = user.UserName;
                    us.NormalizedUserName = user.NormalizedUserName;
                }
                if (!string.IsNullOrEmpty(user.PasswordHash) && !us.PasswordHash.Equals(user.PasswordHash))
                {
                    us.PasswordHash = passwordHasher.HashPassword(us, user.PasswordHash);
                }
                if (!string.IsNullOrEmpty(user.PhoneNumber))
                {
                    us.PhoneNumber = user.PhoneNumber;
                }
                IdentityResult result = await _userManager.UpdateAsync(us);
                if (result.Succeeded)
                {
                    return user;
                }
             
            }
            return NotFound();

        }
        [HttpPost]
        [ActionName("sendReview")]
        public async Task<ActionResult<Review>> sendReview(ReviewP review)
        {
            Console.WriteLine(_context.OrderProducts.Any(od => od.UserID == review.idUser && od.ProductID == review.ProductID));
            var response = false;
            if (_context.OrderProducts.Any(od => od.UserID == review.idUser && od.ProductID == review.ProductID))
            {

                response = true;
                Review rw = new Review()
                {
                    Message = review.Message,
                    Status = review.Status,
                    UserID = review.UserID,
                    idUser = review.idUser,
                    Rate = review.Rate,
                    ReviewTime = DateTime.Now,
                };
                _context.Add(rw);
                _context.SaveChanges();
                ReviewProduct rp = new ReviewProduct()
                {
                    ReviewID = rw.ReviewID,
                    ProductID = review.ProductID,
                };
                _context.Add(rp);
                _context.SaveChanges();
                await _context.SaveChangesAsync();
           
            }
            return Ok(response);
        }

    }
   
}
