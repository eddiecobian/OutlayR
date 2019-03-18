using myApp.Models.Domain;
using myApp.Models.Requests;
using System;
using System.Collections.Generic;
using System.Text;

namespace myApp.Services.Interfaces
{
    public interface IBlogService
    {
        int Insert(BlogAddRequest blog, int userId);
        List<Blog> GetAll();
        void Delete(int id);
        Blog GetById(int id);
        void Update(BlogUpdateRequest blog);   
    }
}
