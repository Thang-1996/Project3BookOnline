using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class Visit
    {
        public int VisitID { get; set; }
        public string userIP { get; set; }
        public int ProductID { get; set; }
    }
}
