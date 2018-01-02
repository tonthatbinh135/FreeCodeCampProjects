var api = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&format=json&exsentences=1&exintro=&explaintext=&generator=search&gsrlimit=10&gsrsearch=";
var wikiUrl = "http://en.wikipedia.org/?curid=";
var htmlResult=""
$(document).ready(function(){
    $("#Search").click(function(){
        searchWiki();
    });
    $('#searchbox').keydown(function(e){
        if(e.keyCode===13){
            $("#Search").click();
        }
    });
});
function searchWiki() {
    if (!$('#searchbox').val()) {
        alert("Search box is empty!");
        window.location.reload();
    }
    var resultUrl = api + $('#searchbox').val();
    $.ajax({
        url:resultUrl,
        type:"POST",
        dataType:"jsonp",
        success:function(data){
            // Empty before inserting everything
            $(".display").empty();
            htmlResult="";
            var results= data.query.pages;
            var pages =Object.keys(results);
            pages.forEach(function(page){
                //article title
                var title = results[page].title;
                //article description
                var desc = results[page].extract;
                //article links
                var articleLink=wikiUrl+results[page].pageid;
                htmlResult+="<div class='result'><div class='title'><a href='"+articleLink+"' class='titleLink' target='_blank'>"+title+"</a></div><div class='desc'>"+desc+"</div></div>";
            });
            $(".display").append(htmlResult);
        },error:function(x,s,e){
            alert(s);
          }
         
    });
    $(".display").addClass("displayResults");
}