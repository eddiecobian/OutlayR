using myApp.Models.Domain;
using myApp.Models.Requests;
using System;
using System.Collections.Generic;
using System.Text;

namespace myApp.Services.Interfaces
{
    public interface ICommentService
    {
        List<Comment> SelectAll();
        List<Comment> GetByEntityAndEntityTypeId(int entityId, int entityTypeId, int userId);
        Comment GetCommentById(int id);
        int Insert(CommentAddRequest comment, int userId);
        void Delete(int id);
        void Update(CommentUpdateRequest comment);
    }
}
