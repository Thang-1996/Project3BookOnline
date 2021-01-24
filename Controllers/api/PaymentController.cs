using BookOnlineShop.Areas.Identity.Pages.Account;
using BookOnlineShop.Data;
using BookOnlineShop.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<LogoutModel> _logger;
        public PaymentController(UserManager<ApplicationUser> userManager, ApplicationDbContext context, IPasswordHasher<ApplicationUser> passwordHash, SignInManager<ApplicationUser> signInManager, ILogger<LogoutModel> logger)
        {
    
            _userManager = userManager;
            _context = context;
            passwordHasher = passwordHash;
            _signInManager = signInManager;
            _logger = logger;

        }
        [HttpPost]
        [ActionName("logOut")]
        public async Task<ActionResult<returnUrlReact>> logOut(returnUrlReact url)
        {
            var returnUrl = url.returnUrl;
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            if (returnUrl != null)
            {
                return LocalRedirect(returnUrl);
            }
            else
            {
                return NotFound("erorr");
            }
        }
        [HttpGet]
        [ActionName("reactAPICall")]
        public ActionResult<ReactAPIModel> reactAPICall()
        {
        
            var product =   _context.Products
                .Include(at => at.AuthorProducts)
                .ThenInclude(a => a.Author)
                  .Include(pp => pp.PublisherProducts)
                .ThenInclude(p => p.Publisher)
                    .Include(rp => rp.ReviewProducts)
                .ThenInclude(r => r.Review)
                .ThenInclude(ra => ra.ReviewAnswers)
                .ThenInclude(a => a.Answer)
                     .Include(op => op.OrderProducts)
                .ThenInclude(o => o.Orders)
                .Include(c => c.Category) 
                .ToList();
            var category =  _context.Categories.ToList();
            var blogs =  _context.Blogs.ToList();
            var reactapicall = new  ReactAPIModel();
            reactapicall.Blogs = blogs;
            reactapicall.Products = product;
            reactapicall.Categories = category;
       
            return reactapicall;
        }
        [HttpGet]
        [ActionName("reactAPICallWithUser")]
        public async Task<ActionResult<ReactAPIModelWithUser>> reactAPICallWithUser()
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null) return null;
            
           
            var orders = _context.Orders
                .Include(od => od.OrderProducts)
                .ThenInclude(p => p.Products)
                .Where(od => od.UserID == currentUser.Id).ToList();
            var reactapicallwithuser = new ReactAPIModelWithUser();
            reactapicallwithuser.currentUser = currentUser;
         
            reactapicallwithuser.Orders = orders;
            return reactapicallwithuser;
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
            var statuspaypal = payment.PayPalStatus;
            decimal total = 0;
            var status = orders.Status;
            if (statuspaypal.Equals("success"))
            {

                status = 4;
            }
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
                Status = status,
                GrandTotal = total,
                UserID = orders.UserID,
                CreateAt = DateTime.Now,
                UpdateAt = DateTime.Now
            };
            _context.Orders.Add(orders1);
            _context.SaveChanges();
            foreach (var item in cart)
            {
                var product = _context.Products.Where(p => p.ProductID == item.product.ProductID).FirstOrDefault();
                product.Quantity -= item.quantity;
                product.SellCount = item.quantity;
                _context.Update(product);
                _context.SaveChanges();
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
        public async Task<ActionResult<Answer>> sendAnswer(AnswerP answer)
        {
            Answer ans = new Answer()
            {
                AnswerTime = DateTime.Now,
                Message = answer.Message,
                UserName = answer.UserName,
                Status = 1,
            };
            _context.Add(ans);
            _context.SaveChanges();
            ReviewAnswer ra = new ReviewAnswer()
            {
                AnswerID = ans.AnswerID,
                ReviewID = answer.ReviewID,
            };
            _context.Add(ra);
            _context.SaveChanges();
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPost]
        [ActionName("SaveWishList")]
        public async Task<ActionResult<WishList>> SaveWishList(WishList wishlist)
        {
            var response = true;
            if (_context.WishLists.Any(w => w.Product.ProductID == wishlist.Product.ProductID && w.UserID.Equals(wishlist.UserID)))
            {
                response = false;
                return Ok(response);

            }

            var product = _context.Products.Where(p => p.ProductID == wishlist.Product.ProductID).FirstOrDefault();
            Console.WriteLine(product);

            var wishlist1 = new WishList();
            wishlist1.Product = product;
            wishlist1.UserID = wishlist.UserID;
            _context.Add(wishlist1);
            await _context.SaveChangesAsync();



            return Ok(response);
        }
        [HttpGet]
        [ActionName("getWishList")]
        public async Task<ActionResult<IEnumerable<WishList>>> getWishList(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
              
                var wishlist = await _context.WishLists.Where(w => w.UserID.Equals(id))
                    .Include(p=>p.Product)
                    .ToListAsync();
                return wishlist;
            }
            return NotFound();
         
        }
        [HttpPost]
        [ActionName("deleteWishList")]
        public async Task<ActionResult<WishList>> deleteWishList(WishList wishlist)
        {
            var wishlist1 = _context.WishLists.Where(w => w.WishListID == wishlist.WishListID).FirstOrDefault();
            _context.WishLists.Remove(wishlist1);
            await _context.SaveChangesAsync();
            return Ok(true);

        }
        [HttpPost]
        [ActionName("increaseCount")]
        public async Task<ActionResult<Visit>> increaseCount(Visit visit)
        {
            var response = true;
            if (_context.Visits.Any(v => v.ProductID == visit.ProductID && v.userIP.Equals(visit.userIP)))
            {
                response = false;
                return Ok(response);

            }

            var visit1 = new Visit()
            {
                ProductID = visit.ProductID,
                userIP = visit.userIP,
            };
         
            _context.Add(visit1);
            _context.SaveChanges();
            var product = _context.Products.Where(p => p.ProductID == visit.ProductID).FirstOrDefault();
            product.ViewCount += 1;
            _context.Update(product);
            _context.SaveChanges();
            await _context.SaveChangesAsync();
            return Ok(response);
        }
    }
   
}
