using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookOnlineShop.Models
{
    public class Categories
    {
        [Key]
        public int CategoryID { get; set; }

        [Required(ErrorMessage = "The CategoryName field is required"), Column(TypeName = "nvarchar(255)")]
        public string CategoryName { get; set; }

        [Required(ErrorMessage = "The CategoryCode field is required"), Column(TypeName = "nvarchar(255)")]
        public string CategoryCode { get; set; }

        [DefaultValue(1)]
        public int Status { get; set; }

        public virtual ICollection<Products> Products { get; set; }

    }
}
