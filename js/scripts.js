(function($) {
  //docutment ready shorthand
  $(function() {
    let lastPage = '';

    // show me another event
    $('#new-quote-button').on('click', getRandomQuote);
    $('#quote-submisison-form').on('submit', postQuote);

    function getRandomQuote(event) {
      event.preventDefault();
      lastPage = document.URL;

      $.ajax({
        method: 'get',
        url:
          api_vars.rest_url +
          'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      })
        .done(function(data) {
       
          const randomQuote = data[0];
          const title = randomQuote.title.rendered;
          const quote = randomQuote.excerpt.rendered;
          const qodSource= randomQuote._qod_quote_source;
          const sourceUrl = randomQuote._qod_quote_source_url;
          
          console.log(randomQuote);
           console.log(sourceUrl) ;
           console.log(qodSource);
          // updates URL link to current page
          history.pushState(null, null, randomQuote.slug);
          if( qodSource && sourceUrl){
            $(".post").html(
              `<div class="entry-content">
                    <p>${quote}</p>
                <div class="entry-meta">
                <h2>${title}</h2>
                </div>
                <span class="source">
                <a href="${sourceUrl}">${qodSource}   
                  </a>
                  </span>
              </div>`
            );
          } else if( qodSource ){
            $(".post").html(
              `<div class="entry-content">
                    <p>${quote}</p>
                <div class="entry-meta">
                <h2>${title}</h2>
                </div>
                <span class="source">
                ${qodSource}</span>
              </div>`
            )} else {
            $(".post").html(
              `<div class="entry-content">
                    <p>${quote}</p>
                <div class="entry-meta">
                <h2>${title}</h2>
                </div>
                <span class="source">
                </span>
              </div>`

            );
          }
        })// done function 
        .fail(function() {
             alert( 'Oops! something went wrong');
          //append a message telling the user soemthing went wrong
        });

      $(window).on('popstate', function() {
        window.location.replace(lastPage);
      });
    }

    // end of get random quote

    function postQuote(event) {
      console.log('post quote');
      event.preventDefault();
      console.log('form submitted');
      const quoteAuthor = $('#quote-author').val();
      const quoteContent = $('#quote-content').val();
      if (quoteAuthor !== '') {
        postAjax();
      }else if(quoteContent !== ''){
        postAjax();

      }
      function postAjax() {
        $.ajax({
          method: 'post',
          url: api_vars.rest_url + 'wp/v2/posts',
          data: {
            //TODO use the form input.val()- values for thetitle, content and other fields
            title: 'The most amazing quote by Gordon Ramsey'.val(),
            content:'The most amazing quote by Gordon Ramsey',
            status: 'pending',
            // _qod_quote_source: ($source).val(),
            // _qod_quote_source_url:($source_url).val(),
          },
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
          }
        })
          .done(function() {
            console.log('great success');
            $('#quote-submission-form').slideup(300);
          })
          .fail(function() {
            console.log('not so great ');
            alert('not so great!')
          });
      } //end of postAjax
      // TODO add POST REQUEST
    } // end of post request
  }); // end of Doc READY
})(jQuery);
