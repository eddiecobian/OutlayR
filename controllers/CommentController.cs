using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using myApp.Models.Domain;
using myApp.Models.Requests;
using myApp.Services;
using myApp.Services.Interfaces;
using myApp.Web.Controllers;
using myApp.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Net;

namespace myApp.Web.Api.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : BaseApiController
    {
        private ICommentService _commentService;
        private IAuthenticationService<int> _authService;

        public CommentController(IAuthenticationService<int> authService, ICommentService commentService
            , ILogger<CommentController> logger) : base(logger)
        {
            _commentService = commentService;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<Comment>> Get()
        {
            ActionResult result = null;
            try
            {
                List<Comment> comments = _commentService.SelectAll();
                ItemsResponse<Comment> response = new ItemsResponse<Comment>();
                response.Items = comments;

                result = Ok200(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = CustomResponse(HttpStatusCode.InternalServerError, new ErrorResponse("Internal Server Error, something went wrong!"));
            }
            return result;
        }

        [HttpGet("entity")]
        public ActionResult<ItemsResponse<Comment>> GetByEntityAndEntityTypeId (int entityId, int entityTypeId)
        {
            int userId = _authService.GetCurrentUserId();
            ActionResult result = null;
            try
            {
                List<Comment> comments = _commentService.GetByEntityAndEntityTypeId(entityId, entityTypeId, userId);
                if(comments == null)
                {
                    result = NotFound404(new ErrorResponse("No Comments Found"));
                }
                else
                {
                    ItemsResponse<Comment> response = new ItemsResponse<Comment>();
                    response.Items = comments;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Comment>> GetCommentById(int id)
        {
            ActionResult result = null;

            Comment comment = _commentService.GetCommentById(id);
            try
            {
                if (comment == null)
                {
                    result = NotFound404(new ErrorResponse("Comment not found"));
                }
                else
                {
                    ItemResponse<Comment> response = new ItemResponse<Comment>();
                    response.Item = comment;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = NotFound404(new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(CommentAddRequest req, int userId)
        {
            ActionResult result = null;
            ItemResponse<int> response = null;

            try
            {
                userId = _authService.GetCurrentUserId();

                int newId = _commentService.Insert(req, userId);
                response = new ItemResponse<int>();
                response.Item = newId;
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.ToString()));
            }

            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(CommentUpdateRequest req)
        {
            ActionResult result = null;
            try
            {
                _commentService.Update(req);
                SuccessResponse response = new SuccessResponse();
                result = Ok200(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }
            return result;
        }

        [HttpDelete("{id}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            ActionResult result = null;
            try
            {
                _commentService.Delete(id);
                SuccessResponse response = new SuccessResponse();
                result = Ok200(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = NotFound404(new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

    }
}
