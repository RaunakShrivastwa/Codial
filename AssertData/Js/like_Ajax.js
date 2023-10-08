$(document).ready(function() {
    let CreateLike = function() {
        
        let likeForm = $('.like');
       likeForm.submit(function(e){
           e.preventDefault();
           let postId = $(this).data('id'); // Get the post ID from data attribute
           let totalLikes = $(this).data('likes'); // Get the total likes from data attribute
           let actionUrl = $(this).attr('action'); // Get the action URL from the form                 
           console.log(postId)
           console.log(totalLikes)
           console.log(actionUrl)
           $.ajax({
               type: 'post',
               url: actionUrl,
               data: likeForm.serialize(),
               success: function(data) {
                   console.log(data);
                   let likeCountElement = $(`#like-${postId} > span`);
                   totalLikes++; // Assuming the like operation increments the total likes count
                   likeCountElement.text(totalLikes); // Update the displayed like count

                   
                   // You can update the like count or handle the response as needed here
               },
               error: function(error) {
                   console.log(error.responseText);
                   // Handle errors here
               }
           });
       })
    }

    CreateLike();
});