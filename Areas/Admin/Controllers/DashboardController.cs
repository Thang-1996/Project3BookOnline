using BookOnlineShop.Data;
using BookOnlineShop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "ADMIN")]
    public class DashboardController : Controller
    {
    
        private readonly ApplicationDbContext _context;
       


        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
       

        }
        public async Task<ActionResult<Dashboard>> Index()
        {
            var dashboard = new Dashboard();
            var productCount = _context.Products.Count();
            var orderCount = _context.Products.Count();
            var orderInProcess = _context.Orders.Where(o => o.Status == 1 && o.Status == 4).Count();
            var orderInComplete = _context.Orders.Where(o => o.Status == 2).Count();
            var orderInDay = _context.Orders.Where(o => o.CreateAt == DateTime.Now).Count();
            decimal totalBill = 0;
            var allOrder = await _context.Orders.ToListAsync();
            foreach(var item in allOrder)
            {
                totalBill += item.GrandTotal;
            }
            dashboard.orderCount = orderCount;
            dashboard.orderInDay = orderInDay;
            dashboard.orderInProcess = orderInProcess;
            dashboard.orderSuccess = orderInComplete;
            dashboard.totalBill = totalBill;
            dashboard.productCount = productCount;
            return View(dashboard);
        }
    }
}
