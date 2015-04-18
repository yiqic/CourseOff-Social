
$(document).ready(function() {

$(".course-info-container").on("mouseover", function(e){
    var courseBar = $(e.target);
    courseBar.attr("title","Jason Zhang, Haoli Du, Victor Chen");
    if(courseBar.hasClass('name')){
        console.log(getAbbr(courseBar.text()));
    } else {
        console.log(getAbbr(courseBar.find(".name").text()));
    }
})

var getAbbr = function(name){
    return name.split("-")[0].slice(1,-1).split(" ").join("-");
}

var insertListener = function(event){
        // console.log("eventCatched!")
    if (event.animationName == "nodeInserted") {
        var friends = "Jason Zhang, Haoli Du, Victor Chen";
        var popupBody = $(event.target).find('.body');
        var refID = popupBody.find("em").first().html();
        var courseName = $(event.target).find(".title").html();
        // console.log(courseName, refID);
        var abbr = $(".course-box:hover").find(".course-content").text();
        console.log(abbr.split(" ").join(""));

        if(popupBody.find(".myFriends").length==0){
            popupBody.append("<div class='myFriends'>"+
                "<h5>Friends will take the course</h5>"+friends+"</div>");
            popupBody.append("<div class='myFriends'>"+
                "<h5>Friends Taken the course </h5>"+friends+"</div>");
        };

    }
}
document.addEventListener("animationstart", insertListener, false); // standard + firefox
document.addEventListener("MSAnimationStart", insertListener, false); // IE
document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome + Safari
// console.log('test');
});
