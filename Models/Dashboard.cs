using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class Dashboard
    {
        public int productCount { get; set; }
        public int orderCount { get; set; }
        public int orderInProcess { get; set; }
        public int orderSuccess { get; set; }
        public decimal totalBill { get; set; }
        public int orderInDay { get; set; }
    }
}
