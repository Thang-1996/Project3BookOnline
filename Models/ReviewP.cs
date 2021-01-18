using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class ReviewP
    {
        public int ReviewID { get; set; }
        public string Message { get; set; }
        public int Rate { get; set; }
        public string UserID { get; set; }
        public string idUser { get; set; }

        public int Status { get; set; }
        public int ProductID { get; set; }
    }
}
