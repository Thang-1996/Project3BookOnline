using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class PublisherProducts
    {
        [Key]
        public int ID { get; set; }
        public int ProductID { get; set; }
        public int PublisherID { get; set; }

        public virtual Products Product { get; set; }
        public virtual Publishers Publisher { get; set; }
    }
}
