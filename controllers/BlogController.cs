using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/blogs")]
    [ApiController]
    public class BlogController : BaseApiController
    {
        private IBlogService _blogService;
        private IAuthenticationService<int> _authService;

        public BlogController(IAuthenticationService<int> authService, IBlogService blogService, ILogger<BlogController> logger) : base(logger)
        {
            _blogService = blogService;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Insert(BlogAddRequest request, int userId)
        {
            ActionResult result = null;
            ItemResponse<int> response = null;

            try
            {
                userId = _authService.GetCurrentUserId();

                int newId = _blogService.Insert(request, userId);
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

        [HttpGet]
        public ActionResult<ItemResponse<Blog>> GetAll()
        {
            ActionResult result = null;
            try
            {
                List<Blog> blogList = _blogService.GetAll();

                if (blogList == null)
                {
                    result = NotFound404(new ErrorResponse("The blog list is empty."));
                }
                else
                {
                    ItemsResponse<Blog> resp = new ItemsResponse<Blog>();
                    resp.Items = blogList;
                    result = Ok200(resp);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }

            return result;
        }

        [HttpDelete("{id}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            ActionResult result = null;
            try
            {
                _blogService.Delete(id);
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

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Blog>> GetById(int id)
        {
            ActionResult result = null;
            Blog blog = _blogService.GetById(id);
            try
            {
                if (blog == null)
                {
                    result = NotFound404(new ErrorResponse("Blog not found"));
                }
                else
                {
                    ItemResponse<Blog> response = new ItemResponse<Blog>();
                    response.Item = blog;
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

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(BlogUpdateRequest req)
        {
            ActionResult result = null;
            try
            {
                _blogService.Update(req);
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
    }
}