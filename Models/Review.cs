using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class Review
    {
        public int ReviewID { get; set; }
        public string Message { get; set; }
        public int Rate { get; set; }
        public string UserID { get; set; }
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime ReviewTime { get; set; }
        public string idUser { get; set; }
        public int Status { get; set; }
        public ICollection<ReviewProduct> ReviewProducts { get; set; }
        public ICollection<ReviewAnswer> ReviewAnswers { get; set; }
    }
}
