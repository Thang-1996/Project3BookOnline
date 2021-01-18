using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class ReviewProduct
    {
        public int ReviewID { get; set; }
        public int ProductID { get; set; }
        public Review Review { get; set; }
        public Products Product { get; set; }
    }
}
