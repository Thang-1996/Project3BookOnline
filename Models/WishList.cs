using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class WishList
    {
        public int WishListID { get; set; }
        public Products Product { get; set; }
        public string UserID { get; set; }
    }
}
