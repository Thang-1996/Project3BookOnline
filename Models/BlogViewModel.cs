using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class BlogViewModel
    {
        public int BlogID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public IFormFile BlogImage { get; set; }
        public int Status { get; set; }
        public string UserName { get; set; }
        public int? ViewCount { get; set; }
    }
}
