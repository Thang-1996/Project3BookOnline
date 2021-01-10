using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookOnlineShop.Models
{
    public class Authors
    {
        [Key]
        public int AuthorID { get; set; }
        [Required(ErrorMessage = "The AuthorName field is required"), Column(TypeName = "nvarchar(255)")]
        public string AuthorName { get; set; }
        [Display(Name = "Email Address")]
        [Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar (255)")]
        public string Address { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [Required(AllowEmptyStrings = true)]
        [Display(Name = "Phone Number")]
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Not a valid phone number")]
        public string PhoneNumber { get; set; }
        [DefaultValue(1)]
        public int Status { get; set; }
        public IEnumerable<Products> Products { get; set; }
        public ICollection<AuthorProducts> AuthorProducts { get; set; }

        /*public Authors()
        {
            AuthorProducts = new Collection<AuthorProducts>();
            
        }
        [NotMapped]
        public List<int> SelectedProduct { get; set; }*/
    }
}
