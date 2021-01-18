using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class AnswerP
    {
        public int AnswerID { get; set; }
        public string Message { get; set; }
        public int Status { get; set; }
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public string UserName { get; set; }
        public int ReviewID { get; set; }
        public ICollection<ReviewAnswer> ReviewAnswers { get; set; }
    }
}
