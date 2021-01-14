using BookOnlineShop.Areas.Admin.ViewModels;
using BookOnlineShop.Data;
using BookOnlineShop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "ADMIN")]
    /*[Authorize(Roles = "Manager")]*/
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment webHostEnvironment;

        public ProductsController(ApplicationDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            webHostEnvironment = hostEnvironment;
        }

        // GET: Admin/Products
        /*[Authorize(Roles = "Admin, Manager")]*/
        public async Task<IActionResult> Index()
        {
            var products = _context.Products.Include(c => c.Category)
                .Include(p => p.AuthorProducts)
                .ThenInclude(a => a.Author)
                .Include(p => p.PublisherProducts)
                .ThenInclude(a => a.Publisher)
                .OrderByDescending(p => p.ProductID);
            return View(await products.ToListAsync());
        }

        // GET: Admin/Products/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var products = await _context.Products
                .Include(c => c.Category)
                .Include(ap => ap.AuthorProducts)
                .ThenInclude(a => a.Author)
                .Include(p => p.PublisherProducts)
                .ThenInclude(a => a.Publisher)
                .FirstOrDefaultAsync(m => m.ProductID == id);
            if (products == null)
            {
                return NotFound();
            }


            return View(products);
        }
        private string UploadedFile(ProductViewModel model)
        {
            string uniqueFileName = null;

            if (model.ProductImage != null)
            {
                string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "images");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + model.ProductImage.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.ProductImage.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }
        // GET: Admin/Products/Create
        public IActionResult Create()
        {
            var products = new ProductViewModel();
            products.Authors = _context.Authors.ToList();
            products.Publishers = _context.Publishers.ToList();
            ViewBag.Authors = new SelectList(_context.Authors, "AuthorID", "AuthorName");
            ViewBag.Publishers = new SelectList(_context.Publishers, "PublisherID", "PublisherName");
            ViewData["CategoryID"] = new SelectList(_context.Categories, "CategoryID", "CategoryName");
            return View(products);
        }

        // POST: Admin/Products/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProductViewModel model)
        {
            if (ModelState.IsValid)
            {
                string uniqueFileName = UploadedFile(model);
                Products product = new Products
                {
                    ProductName = model.ProductName,
                    ProductImage = uniqueFileName,
                    ProductDescription = model.ProductDescription,
                    ProductContent = model.ProductContent,
                    ProductCode = model.ProductCode,
                    Quantity = model.Quantity,
                    Price = model.Price,
                    Status = model.Status,
                    PublishingTime = model.PublishingTime,
                    Reprinttimes = model.Reprinttimes,
                    CategoryID = model.CategoryID,

                };
                _context.Add(product);
                _context.SaveChanges();
                foreach (var author in model.SelectedAuthor)
                {
                    AuthorProducts authorProducts = new AuthorProducts();
                    authorProducts.ProductID = product.ProductID;
                    authorProducts.AuthorID = author;
                    _context.Add(authorProducts);
                    _context.SaveChanges();
                }
                foreach (var publisher in model.SelectedPublisher)
                {
                    PublisherProducts publisherProducts = new PublisherProducts();
                    publisherProducts.ProductID = product.ProductID;
                    publisherProducts.PublisherID = publisher;
                    _context.Add(publisherProducts);
                    _context.SaveChanges();
                }

                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Authors = new SelectList(_context.Authors, "AuthorID", "AuthorName");
            ViewBag.Publishers = new SelectList(_context.Publishers, "PublisherID", "PublisherName");
            ViewData["CategoryID"] = new SelectList(_context.Categories, "CategoryID", "CategoryName", model.CategoryID);

            return View();
        }

        // GET: Admin/Products/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            ProductViewModel newProduct = new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                ProductContent = product.ProductContent,
                ProductCode = product.ProductCode,
                Quantity = product.Quantity,
                Price = product.Price,
                Status = product.Status,
                PublishingTime = product.PublishingTime,
                Reprinttimes = product.Reprinttimes,
                CategoryID = product.CategoryID,
                SelectedAuthor = product.AuthorProducts.Select(au => au.AuthorID).ToList(),
                SelectedPublisher = product.PublisherProducts.Select(pp => pp.PublisherID).ToList()
            };

            if (product == null)
            {
                return NotFound();
            }
            ViewBag.Authors = new SelectList(_context.Authors, "AuthorID", "AuthorName");
            ViewBag.Publishers = new SelectList(_context.Publishers, "PublisherID", "PublisherName");
            ViewData["CategoryID"] = new SelectList(_context.Categories, "CategoryID", "CategoryName", product.CategoryID);
            return View(newProduct);
        }

        // POST: Admin/Products/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, ProductViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string uniqueFileName = UploadedFile(model);
                    Console.WriteLine(uniqueFileName);
                    Products product = new Products
                    {
                        ProductID = model.ProductID,
                        ProductName = model.ProductName,
                        ProductImage = uniqueFileName,
                        ProductDescription = model.ProductDescription,
                        ProductContent = model.ProductContent,
                        ProductCode = model.ProductCode,
                        Quantity = model.Quantity,
                        Price = model.Price,
                        Status = model.Status,
                        PublishingTime = model.PublishingTime,
                        Reprinttimes = model.Reprinttimes,
                        CategoryID = model.CategoryID,
                    };
                    foreach (var AuthorID in model.SelectedAuthor)
                    {
                        product.AuthorProducts.Add(new AuthorProducts { AuthorID = AuthorID });
                    }
                    foreach (var PublisherID in model.SelectedPublisher)
                    {
                        product.PublisherProducts.Add(new PublisherProducts { PublisherID = PublisherID });
                    }
                    _context.Update(product);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductsExists(model.ProductID))
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
            ViewBag.Authors = new SelectList(_context.Authors, "AuthorID", "AuthorName");
            ViewBag.Publishers = new SelectList(_context.Publishers, "PublisherID", "PublisherName");
            ViewData["CategoryID"] = new SelectList(_context.Categories, "CategoryID", "CategoryName", model.CategoryID);
            return View();
        }

        // GET: Admin/Products/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var products = await _context.Products
               .Include(c => c.Category)
               .Include(ap => ap.AuthorProducts)
               .ThenInclude(a => a.Author)
               .Include(p => p.PublisherProducts)
               .ThenInclude(a => a.Publisher)
               .FirstOrDefaultAsync(m => m.ProductID == id);
            if (products == null)
            {
                return NotFound();
            }

            return View(products);
        }

        // POST: Admin/Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var products = await _context.Products.FindAsync(id);
            _context.Products.Remove(products);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.ProductID == id);
        }
    }
}
