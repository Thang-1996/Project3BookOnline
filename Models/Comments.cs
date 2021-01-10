using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class Comments
    {
        [Key]
        public int ID { get; set; }
        [Column(TypeName = "nvarchar (255)")]
        public string Content { get; set; }

        public int UserID { get; set; }
        public int ProductID { get; set; }
        public int EmployeeID { get; set; }

        public virtual Products Product { get; set; }
        public virtual Employees Employee { get; set; }
    }
}
