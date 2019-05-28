(function($){

    $("#toggle-status").on("click", function(event){
        event.preventDefault();
    
    $.ajax({
        method: "post",
        // url:api_vars.ajax_url,
        url: api_vars.rest_url + 'wp/v2/posts/'+ api_vars.post_id,
        data: {
        //  action : "qod_status_ajax",
        //  security: api_vars.status_nonce,
        // the_post_id: api_vars.post_id
        post_status: "draft"
        },
        beforeSend: function(xhr){
            xhr.setRequestHeader('X-WP-Nonce',api_vars.wpapi_nonce)
        }
    }).done(function(response){

        alert('Success! the status has been changed.');
         });
    });
})(jQuery);