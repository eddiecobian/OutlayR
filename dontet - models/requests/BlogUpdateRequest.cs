using System;
using System.ComponentModel.DataAnnotations;

namespace myApp.Models.Requests
{
    public class BlogUpdateRequest : BlogAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int Id { get; set; }
    }
}
