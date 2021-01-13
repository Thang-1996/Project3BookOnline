using BookOnlineShop.Data;
using BookOnlineShop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "ADMIN")]
    /*[Authorize(Roles = "Manager")]*/
    public class PublishersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PublishersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Admin/Publishers
        /*[Authorize(Roles = "Admin, Manager")]*/
        public async Task<IActionResult> Index()
        {
            var publishers = _context.Publishers.
               Include(p => p.PublisherProducts)
               .ThenInclude(a => a.Product)
               .OrderByDescending(p => p.PublisherID);
            return View(await publishers.ToListAsync());
        }

        // GET: Admin/Publishers/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var publishers = await _context.Publishers.
               Include(pd => pd.PublisherProducts)
               .ThenInclude(p => p.Product)
               .FirstOrDefaultAsync(pl => pl.PublisherID == id);
            if (publishers == null)
            {
                return NotFound();
            }

            return View(publishers);
        }

        // GET: Admin/Publishers/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Admin/Publishers/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("PublisherID,PublisherName,Email,Address,PhoneNumber,Status")] Publishers publishers)
        {
            if (ModelState.IsValid)
            {
                _context.Add(publishers);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(publishers);
        }

        // GET: Admin/Publishers/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var publishers = await _context.Publishers.FindAsync(id);
            if (publishers == null)
            {
                return NotFound();
            }
            return View(publishers);
        }

        // POST: Admin/Publishers/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("PublisherID,PublisherName,Email,Address,PhoneNumber,Status")] Publishers publishers)
        {
            if (id != publishers.PublisherID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(publishers);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PublishersExists(publishers.PublisherID))
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
            return View(publishers);
        }

        // GET: Admin/Publishers/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var publishers = await _context.Publishers
                .FirstOrDefaultAsync(m => m.PublisherID == id);
            if (publishers == null)
            {
                return NotFound();
            }

            return View(publishers);
        }

        // POST: Admin/Publishers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var publishers = await _context.Publishers.FindAsync(id);
            _context.Publishers.Remove(publishers);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PublishersExists(int id)
        {
            return _context.Publishers.Any(e => e.PublisherID == id);
        }
    }
}
