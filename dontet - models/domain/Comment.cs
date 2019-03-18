using System;

namespace Sabio.Models.Domain
{
    public class Comment
    {
        public int Id { get; set; }

        public int ParentId { get; set; }

        public int EntityId { get; set; }

        public int EntityTypeId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public int CreatedBy { get; set; }

        public int TotalCount { get; set; }
        public int UserId { get; set; }
    }
}