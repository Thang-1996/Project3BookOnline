using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class Employees
    {

        [Key]
        public int ID { get; set; }

        [Required(ErrorMessage = "The EmployeeName field is required"), Column(TypeName = "nvarchar(255)")]
        public string EmployeeName { get; set; }

        [Display(Name = "Email Address")]
        [Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [Required(AllowEmptyStrings = true)]
        [Display(Name = "Phone Number")]
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Not a valid phone number")]
        public string PhoneNumber { get; set; }

        [Column(TypeName = "nvarchar (255)")]
        public string Address { get; set; }

        [DefaultValue(1)]
        public int Status { get; set; }

        public virtual ICollection<Comments> Comments { get; set; }
    }
}
