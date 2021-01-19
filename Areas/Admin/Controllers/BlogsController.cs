using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BookOnlineShop.Data;
using BookOnlineShop.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;

namespace BookOnlineShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class BlogsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly UserManager<ApplicationUser> _userManager;

        public BlogsController(ApplicationDbContext context, IWebHostEnvironment hostEnvironment, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            webHostEnvironment = hostEnvironment;
            _userManager = userManager;
        }

        // GET: Admin/Blogs
        public async Task<IActionResult> Index()
        {
            return View(await _context.Blogs.ToListAsync());
        }
        private string UploadedFile(BlogViewModel model)
        {
            string uniqueFileName = null;

            if (model.BlogImage != null)
            {
                string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "images");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + model.BlogImage.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.BlogImage.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }

        // GET: Admin/Blogs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var blog = await _context.Blogs
                .FirstOrDefaultAsync(m => m.BlogID == id);
            if (blog == null)
            {
                return NotFound();
            }

            return View(blog);
        }

        // GET: Admin/Blogs/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Admin/Blogs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(BlogViewModel model)
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null) return null;
            if (ModelState.IsValid)
            {
                string uniqueFileName = UploadedFile(model);
                Blog blog = new Blog
                {
                   Title = model.Title,
                   BlogImage = uniqueFileName,
                   Description = model.Description,
                   Content = model.Content,
                   Status = model.Status,
                    UserName = currentUser.UserName,
                    ViewCount = 0,
                };
         
                _context.Add(blog);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View();
        }

        // GET: Admin/Blogs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null) return null;
            if (id == null)
            {
                return NotFound();
            }

            var blog = await _context.Blogs.FindAsync(id);
            BlogViewModel newBlog = new BlogViewModel
            {
                BlogID = blog.BlogID,
                Title = blog.Title,
           
                Description = blog.Description,
                Content = blog.Content,
                Status = blog.Status,
                UserName = currentUser.UserName,
                ViewCount = 0,
            };

            if (blog == null)
            {
                return NotFound();
            }
            return View(newBlog);
        }

        // POST: Admin/Blogs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, BlogViewModel model)
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null) return null;
            if (id != model.BlogID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var blog = await _context.Blogs.Where(p => p.BlogID == id).FirstOrDefaultAsync();
                    string uniqueFileName = UploadedFile(model);

                    blog.Title = blog.Title;
           
                    blog.Description = model.Description;
                    blog.Content = model.Content;
                    blog.Status = model.Status;
                    blog.UserName = currentUser.UserName;
                    blog.ViewCount = 0;
                    _context.Update(blog);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BlogExists(model.BlogID))
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
            return View();
        }

        // GET: Admin/Blogs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var blog = await _context.Blogs
                .FirstOrDefaultAsync(m => m.BlogID == id);
            if (blog == null)
            {
                return NotFound();
            }

            return View(blog);
        }

        // POST: Admin/Blogs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BlogExists(int id)
        {
            return _context.Blogs.Any(e => e.BlogID == id);
        }
    }
}
