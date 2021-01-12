using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BookOnlineShop.Data;
using BookOnlineShop.Models;
using Microsoft.AspNetCore.Hosting;
using BookOnlineShop.Areas.Admin.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;

namespace BookOnlineShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    /*[Authorize(Roles = "Manager")]*/
    public class OrdersController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public OrdersController(ApplicationDbContext context, IWebHostEnvironment hostEnvironment, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            webHostEnvironment = hostEnvironment;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: Admin/Orders
        /*[Authorize(Roles = "Admin, Manager")]*/
        public async Task<IActionResult> Index()
        {
            var orders = _context.Orders
                .Include(p => p.OrderProducts)
                .ThenInclude(a => a.Products)
                .OrderByDescending(p => p.ID);
            return View(await orders.ToListAsync());
        }

        // GET: Admin/Orders/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var orders = await _context.Orders
                .Include(ap => ap.OrderProducts)
                .ThenInclude(a => a.Products)
                .FirstOrDefaultAsync(m => m.ID == id);
            if (orders == null)
            {
                return NotFound();
            }


            return View(orders);
        }

        // GET: Admin/Orders/Create
        public async Task<IActionResult> Create()
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null) return Challenge();

            var orders = new OrderViewModel();
            orders.Products = _context.Products.ToList();
            orders.UserID = currentUser.Id;
       
            ViewBag.Products = new SelectList(_context.Products, "ProductID", "ProductName");
            return View(orders);
        }

        // POST: Admin/Orders/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
/*        public async Task<IActionResult> Create(OrderViewModel model)
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null) return Challenge();

            if (ModelState.IsValid)
            {
               
                Orders order = new Orders
                {
                    OrderName = model.OrderName,
                    CreateAt = model.CreateAt,
                    UpdateAt = model.UpdateAt,
                    Status = model.Status,
                    GrandTotal = model.GrandTotal,
                    UserID = model.UserID,
                };
                _context.Add(order);
                _context.SaveChanges();
                foreach (var product in model.SelectedProduct)
                {
                    OrderProducts orderProducts = new OrderProducts();
                    orderProducts.OrderID = order.ID;
                    orderProducts.ProductID = product;
                    orderProducts.UserID = model.UserID;
                    _context.Add(orderProducts);
                    _context.SaveChanges();
                }

                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Products = new SelectList(_context.Products, "ProductID", "ProductName");
            ViewData["UserID"] = new SelectList(_context.Users, "UserID", "Name", model.UserID);
            return View();
        }
*/
        // GET: Admin/Orders/Edit/5
/*        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            OrderViewModel newOrder = new OrderViewModel
            {
                OrderName = order.OrderName,
                CreateAt = order.CreateAt,
                UpdateAt = order.UpdateAt,
                Status = order.Status,
                GrandTotal = order.GrandTotal,
                SelectedProduct = order.OrderProducts.Select(op => op.ProductID).ToList()
            };

            if (order == null)
            {
                return NotFound();
            }
            ViewBag.Products = new SelectList(_context.Products, "ProductID", "ProductName");
            return View(newOrder);
        }
*/
        // POST: Admin/Orders/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
       /* [HttpPost]
   *//*     [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, OrderViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Orders order = new Orders
                    {
                        OrderName = model.OrderName,
                        CreateAt = model.CreateAt,
                        UpdateAt = model.UpdateAt,
                        Status = model.Status,
                        GrandTotal = model.GrandTotal,
                    };
                    foreach (var ProductID in model.SelectedProduct)
                    {
                        order.OrderProducts.Add(new OrderProducts { ProductID = ProductID });
                    }
                    _context.Update(order);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrdersExists(model.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Products = new SelectList(_context.Products, "ProductID", "ProductName");
            return View();
        }

        // GET: Admin/Orders/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var orders = await _context.Orders
                .Include(ap => ap.OrderProducts)
                .ThenInclude(a => a.Products)
                .FirstOrDefaultAsync(m => m.ID == id);
            if (orders == null)
            {
                return NotFound();
            }


            return View(orde*//*rs);
        }*/

        // POST: Admin/Orders/Delete/5
        [HttpPost, ActionName("Delete")]
/*        [ValidateAntiForgeryToken]*/
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var orders = await _context.Orders.FindAsync(id);
            _context.Orders.Remove(orders);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OrdersExists(int id)
        {
            return _context.Orders.Any(e => e.ID == id);
        }
    }
}
