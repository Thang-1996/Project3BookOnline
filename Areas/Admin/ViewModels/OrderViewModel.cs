using BookOnlineShop.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Areas.Admin.ViewModels
{
    public class OrderViewModel
    {
        [Key]
        public int ID { get; set; }

        [Required(ErrorMessage = "The Order Name field is required"), Column(TypeName = "nvarchar(255)")]
        public string OrderName { get; set; }

        public DateTime? CreateAt { get; set; }

        public DateTime? UpdateAt { get; set; }

        [DefaultValue(1)]
        public int Status { get; set; }

        public decimal GrandTotal { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [Required(AllowEmptyStrings = true)]
        public string UserID { get; set; }

        public IEnumerable<Products> Products { get; set; }
        public List<int> SelectedProduct { get; set; }


    }
}
