    using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class AuthorProducts
    {
        [Key]

        public int ID { get; set; }

        public int ProductID { get; set; }
        public int AuthorID { get; set; }
        public Products Product { get; set; }
        public Authors Author { get; set; }
    }
}
