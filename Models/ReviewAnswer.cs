using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookOnlineShop.Models
{
    public class ReviewAnswer
    {
        public int AnswerID { get; set; }
        public int ReviewID { get; set; }
        public Answer Answer { get; set; }
        public Review Review { get; set; }
    }
}
