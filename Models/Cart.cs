using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class Cart
    {
       public int quantity { get; set; }
       public Products product { get; set; }
    }
}
