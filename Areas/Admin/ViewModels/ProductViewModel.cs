using BookOnlineShop.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookOnlineShop.Areas.Admin.ViewModels
{
    public class ProductViewModel
    {
        [Key]
        public int ProductID { get; set; }
        [Required(ErrorMessage = "The ProductName field is required"), Column(TypeName = "nvarchar(255)")]
        public string ProductName { get; set; }

        [Required(ErrorMessage = "The ProductCode field is required"), Column(TypeName = "nvarchar(255)")]
        public string ProductCode { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [Required(AllowEmptyStrings = true)]
        public IFormFile ProductImage { get; set; }

        public string EditImagePath { get; set; }
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

        public IEnumerable<Authors> Authors { get; set; }
        public List<int> SelectedAuthor { get; set; }
        public IEnumerable<Publishers> Publishers { get; set; }
        public List<int> SelectedPublisher { get; set; }
    }
}
