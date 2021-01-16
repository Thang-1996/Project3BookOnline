using Microsoft.AspNetCore.Identity;
using System;

namespace BookOnlineShop.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Address { get; set; }
        public DateTime age { get; set; }
        public string telephone { get; set; }
    }
}
