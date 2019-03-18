using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class BlogAddRequest
    {
        [Required]
        [StringLength(maximumLength: 1000)]
        public string Title { get; set; }

        [Required]
        [StringLength(maximumLength: 4000)]
        public string Description { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        [StringLength(maximumLength: 100)]
        public string Name { get; set; }
    }
}