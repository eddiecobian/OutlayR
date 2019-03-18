using System;

namespace Sabio.Models.Domain
{
    public class Blog

    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int CreatedBy { get; set; }

        public DateTime DateCreated { get; set; }

        public string ImageUrl { get; set; }

        public string Name { get; set; }
    }
}