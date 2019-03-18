using System.ComponentModel.DataAnnotations;

namespace myApp.Models.Requests
{
    public class CommentAddRequest
    {
        public int? ParentId { get; set; }

        public int EntityId { get; set; }

        public int EntityTypeId { get; set; }

        [Required]
        [StringLength(maximumLength: 2000)]
        public string Title { get; set; }

        [Required]
        [StringLength(maximumLength: 2000)]
        public string Description { get; set; }
    }
}
