
$(document).ready(function() {
    //Display the quotes from the array first
    displayQuoteFromArray();

    $("#new-quote").click(function() {
        $('.quote-box').fadeOut();
        getRandomQuote();
    });
    
    function getRandomQuote() {
        $.ajax({
        type: "POST",
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
        dataType: "json",
        success: displayQuote, 

        //@todo create a function that will display quotes from an array is AJAX fails
        error: displayQuoteFromArray,
        beforeSend: setHeader,
        
    });

    function setHeader(xhr) {
        xhr.setRequestHeader("X-Mashape-Key", "6aR81CWiWFmshsBCrvkiMM0o0ef3p15JhNSjsnf7OfjVoKpJpt");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Accept", "application/json");
      }
    }

    function displayQuote(response) {
            
            $("#text").text(response.quote);
            $('#author').text(response.author);
            //update the tweet href
            tweetQuote();
            $('.quote-box').fadeIn(500); 
        }
	
    function displayQuoteFromArray() {
        var myQuotes = [
	        {
	            author: "Confucius",
	            quote:"It does not matter how slowly you go as long as you do not stop."
	        },
	        {
	            author: "Og Mandino",
	            quote:"Failure will never overtake me if my determination to succeed is strong enough."
	        },
	        {
	            author: "Oscar Wilde",
	            quote:"The only way to get rid of a temptation is to yield to it."
	        },
	        {
	            author: "Aldous Huxley",
	            quote:"Maybe this world is another planet's Hell."
	        },
	        {
	            author: "Thomas Alba Edison",
	            quote:"I have not failed. I've just found 10,000 ways that won't work."
        } 
        ];
        var random = Math.floor(Math.random() * 5);
        displayQuote(myQuotes[random]);
        
    }
    
    function tweetQuote() {
        var twitterURL = 'https://twitter.com/intent/tweet?hashtags=quotes,freeCodeCamp&related=freecodecamp&text="';
        var quote = $("#text").text();
        var author = $('#author').text();
        twitterURL +=quote +'" - '+ author;
        //attach it the URL to the href attribute
        $('#tweet-quote').attr('href', twitterURL);
    }
    $('#facebook-quote').click( function() 
    {
        var shareurl = $(this).data('shareurl');
        window.open('https://www.facebook.com/sharer/sharer.php?u='+escape(shareurl)+'&t='+document.title, '', 
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
        return false;
    });
}); //end of document ready