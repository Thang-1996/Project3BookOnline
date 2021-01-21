﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class ReactAPIModel
    {
        public ICollection<Products> Products { get; set; }
        public ApplicationUser currentUser { get; set; }
        public ICollection<Categories> Categories { get; set; }
        public ICollection<Orders> Orders { get; set; }
    }
}
