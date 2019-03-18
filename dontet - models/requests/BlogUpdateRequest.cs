using System;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class BlogUpdateRequest : BlogAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int Id { get; set; }
    }
}