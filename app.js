
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

$(".nav[data-visible=term]").on("change", function(e){
    console.log("aeg");
})
var year;
setTimeout(function(){

var term = $(".nav[data-visible=term]").find("a").first().text().split(" ");
year = term[1];
var semester = term[0];
if(semester == "Fall"){
    year= year+"08";
} else if (semester == "Summer") {
    year = year + "05";
} else if (semester == "Spring") {
    year = year + "01";
}
console.log(year);
}, 2000);

// console.log(year);
var getAbbr = function(name){
    return name.split("-")[0].slice(1,-1).split(" ").join("-");
}

var insertListener = function(event){
        // console.log("eventCatched!")
    if (event.animationName == "nodeInserted") {
        
        var popupBody = $(event.target).find('.body');
        var refID = popupBody.find("em").first().html();
        var courseName = $(event.target).find(".title").html();
        // console.log(courseName, refID);
        var abbr = $(".course-box:hover").find(".course-content").text().split(" ").join("");
        // console.log(abbr.split(" ").join(""));
        var results = userService.getFriendsByCourseName(year, abbr);
        var friends;
        if (results){
            friends = results.map(function(d){
                return d.name;
            }).join(", ")
        }
         // ="";userService.getFriendsByCourseName(year, abbr)
        // ) ;
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
