using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookOnlineShop.Models
{
    public class Orders
    {
        [Key]
        public int ID { get; set; }

      

        public string CustomerName { get; set; }
        public string Address { get; set; }
        public string Telephone { get; set; }
        [Column(TypeName ="ntext")]
        public string OrderNote { get; set; }
  
        public DateTime? CreateAt { get; set; }
  
        public DateTime? UpdateAt { get; set; }
        public int paymenttype { get; set; }

        [DefaultValue(1)]
        public int Status { get; set; }

        public decimal GrandTotal { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [Required(AllowEmptyStrings = true)]

        public string UserID { get; set; }
        public Orders()
        {        
            OrderProducts = new Collection<OrderProducts>();

        }

        public ICollection<OrderProducts> OrderProducts { get; set; }

    }
}
