﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace myApp.Models.Requests
{
    public class CommentUpdateRequest : CommentAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int Id { get; set; }

    
    }
}
