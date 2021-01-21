using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class ReactAPIModelWithUser
    {
        public ICollection<Orders> Orders { get; set; }
        public ApplicationUser currentUser { get; set; }
    }
}
