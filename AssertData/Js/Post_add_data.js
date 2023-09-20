{
    let createPost= function(){
        let newPost=$('#post-form-data')
        newPost.submit(function(e){
            e.preventDefault()
            $.ajax({
                type: 'post',
                url: '/post/save',
                data: newPost.serialize(),
                success: function(data){
                    // console.log(data)
                    let addDataPost= addPostDom(data.data.post)
                    $('#post-list-container>ul').prepend(addDataPost)
                    deletePostData(' .delete-post-button',addDataPost)
                    addCommentData(data.data.post._id)

                },
                error: function(error){
                    console.log(error.responseText)
                }
            })
        })
    }

    // add post with dom in post list
    let addPostDom=function(post){
        return $(`
          
        <li id="${post._id}"  style="margin-top: 10px;background-color: black;color:white">
                <p>
                        <small><a href="/post/delete/${post._id}" class="delete-post-button">X</a></small>
                            POST :- ${post.content}
                                <br>
                                <small>BY:- ${post.user.name}</small>
                </p>
                <div class="post-comments">
                        <form  action="/comment/save" method="post" class="comment-data">
                            <input type="text" name="content" placeholder="Type here to add comment" />
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form>
            
                        <div>
                                <ul id="post-comments-${post._id}">
                                    
                                </ul>
                        </div>
                </div>
        </li>
        
        `)
    }


    //  for the delte post
     let deletePostData = function(deletelink) {
        $(deletelink).click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function(data) {
                    deleteListItem(data.data.post_id);
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    function deleteListItem(itemId){
        var listItem=document.getElementById(itemId)
        if(listItem){
            listItem.parentNode.removeChild(listItem)
        }else{
            console.log("Item not found")
        }
    }


    // add comment on post
    let addCommentData= function(postId){
        let newPost= $('.comment-data')
        newPost.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comment/save',
                data: newPost.serialize(),
                success: function(data){
                    console.log(data.data.comment)
                    let comment=data.data.comment;
                    // alert(comment._id)
                    let commentDom1 = commentDom(comment)

                    $(`#post-comments-${postId}`).prepend(commentDom1)

                },
                error: function(error){
                    console.log(error.responseText)
                }
            })
        })
    }

    function commentDom(comment){
        return $(`
         
        <li id="comment-${comment._id}">
                        <p>
                            <small>
                                <a href="/comment/delete/${comment.id}" class="delete-comment-button">X</a>
                            </small>
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                        </p>
                    </li>
        
        `)
    }

    function deleteComment(deleteCommentLink){
        $(deleteCommentLink).click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteCommentLink).prop('href'),
                success: function(data) {
                    deleteListItem(data.data.comment_id);
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    

    createPost();
    addCommentData();
}