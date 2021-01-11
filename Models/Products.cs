using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookOnlineShop.Models
{
    public class Products
    {
        [Key]
        public int ProductID { get; set; }
        [Required(ErrorMessage = "The ProductName field is required"), Column(TypeName = "nvarchar(255)")]
        public string ProductName { get; set; }

       [Required(ErrorMessage = "The ProductCode field is required"), Column(TypeName = "nvarchar(255)")]
        public string ProductCode { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [Required(AllowEmptyStrings = true)]
        public string ProductImage { get; set; }
        public string ProductDescription { get; set; }
   
        public string ProductContent { get; set; }
        public double Price { get; set; }
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
        [DefaultValue(1)]
        public int Status { get; set; }
        public DateTime? PublishingTime { get; set; }
        public int? Reprinttimes { get; set; }
        public int CategoryID { get; set; }
        public virtual Categories Category { get; set; }

        /*public Products()
        {
            AuthorProducts = new Collection<AuthorProducts>();
            Comments = new Collection<Comments>();
            OrderProducts = new Collection<OrderProducts>();
            PublisherProducts = new Collection<PublisherProducts>();

        }*/

        public ICollection<OrderProducts> OrderProducts { get; set; }
        public ICollection<PublisherProducts> PublisherProducts { get; set; }
        public ICollection<AuthorProducts> AuthorProducts { get; set; }
        public ICollection<Comments> Comments { get; set; }
    }
}
