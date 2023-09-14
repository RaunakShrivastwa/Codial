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
          
        <li id="post-${post._id}"  style="margin-top: 10px;background-color: black;color:white">
                <p>
                        <small><a href="/post/delete/${post._id}" class="delete-post-button">X</a></small>
                            POST :- ${post.content}
                                <br>
                                <small>BY:- ${post.user.name}</small>
                </p>
                <div class="post-comments">
                        <form  action="/comment/save" method="post" id="${post._id}" class="comment-data">
                            <input type="text" name="content" placeholder="Type here to add comment" />
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form>
            
                        <div class="post-comments-list">
                                <ul id="post-comments-${post._id}">
                                    
                                </ul>
                        </div>
                </div>
        </li>
        
        `)
    }

    let addCommentData= function(){
        let newPost= $('.comment-data')
        newPost.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comment/save',
                data: newPost.serialize(newPost),
                success: function(data){
                    console.log(data)
                },
                error: function(error){
                    console.log(error.responseText)
                }
            })
        })
    }


    let deletePostData = function(deletelink) {
        $(deletelink).click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function(data) {
                    $(`#post-${data.post_id}`).remove();
                    // Reload the page
                   // location.reload();
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