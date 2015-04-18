
$(document).ready(function() {


// .change(function(e){
//     console.log("aeg");
// })



var findCurrentTerm = function(){
    var term = $(".nav[data-visible=term]").find("a").first().text().split(" ");
    year = term[1];
    var semester = term[0];
    if(semester == "Fall"){
        year= year+"08";
    } else if (semester == "Summer") {
        // console.log("summer");
        year = year + "05";
    } else if (semester == "Spring") {
        year = year + "01";
    }
    console.log(year);
}

var year = "201508";
setTimeout(function(){

    // console.log();
    var courseSelect = $(".nav[data-visible=term]").find("a:not([data-toggle])");
    courseSelect.each(function(i){
        $(this).on("click", function(){
            setTimeout(function(){
                addCourseInfoListener();
                findCurrentTerm();
            }, 1000);
        })
    })
    var atlSelect = $(".nav[data-visible=user]").find(".item");
    atlSelect.each(function(i){
        $(this).on("click", function(){
            setTimeout(function(){
                // addCourseInfoListener();
                // findCurrentTerm();
                addFriendToggle();
            }, 1000);
        })
    })
    
    var newAtlSelect = $(".nav[data-visible=user]").find(".li-icon")
    console.log(newAtlSelect)
    newAtlSelect.click(function(){
        console.log("found!")
        setTimeout(function(){
                // addCourseInfoListener();
                // findCurrentTerm();
                addFriendToggle();
            }, 1000);
    })

    addCourseInfoListener();
    findCurrentTerm();
    addFriendToggle();
    
}, 2000);


var addFriendToggle = function(){
    $(".friends").find(".course-info-container").each(function(i){
        var toggleButton = $(this).find(".pull-right").first().append("<button style='float:right;top:0px' on-click='test()'>+</button>");
        var that = this;
        toggleButton.click(function(ev){
            // console.log("test");
            // console.log($(that).find(".section")); click
            // $(that).find(".section").first().trigger("mouseenter");
            // console.log('entered!')
            // $(that).find(".section").first().trigger("mousemove");
            $(that).find(".section").trigger("click");
            // $(that).find(".section").first().trigger("mouseleave");
            // $(that).find(".section").each(function(){
            //     console.log(this);
            //     $(this).trigger("click");
            // })
            ev.preventDefault();
        })
    // toggleButton.hover(function(e) {
    //     // mouseenter($(that).find(".section").first());
    //     // console.log('e')
    //     // $(that).find(".section").trigger(e.type);
    // })
        // toggleButton.on('mouseenter mouseleave', function(e) {

        // })

    })
}
var test = function(){
    console.log('test')
}
var addCourseInfoListener= function(){
    $(".course-list").find(".course-info-container").on("mouseover", function(e){
        var courseBar = $(e.target);
        var abbr="";
        if(courseBar.hasClass('name')){
            abbr = getAbbr(courseBar.text());
        } else {
            abbr = getAbbr(courseBar.find(".name").text());
        }
        if (abbr!=""){
            var willTakeResult = userService.getFriendsByCourseName(year, abbr, false);
            var takenResult = userService.getFriendsByCourseName(year, abbr, true);
            console.log(willTakeResult,takenResult);
            var friends;
            if (willTakeResult){
                friends = getFriendsName(willTakeResult.concat(takenResult));
            } else {
                friends = getFriendsName(takenResult);
            }
            
            // var takenFrends = getFriendsName(takenResult);

            // var friends = 
            if (friends!=""){
                console.log(friends);
                courseBar.attr("title",friends);
            } else {
                courseBar.attr("title","No friend found");
            }
        } else {
            console.log(abbr)
        }
        e.preventDefault();
    })
}

var insertListener = function(event){
    if (event.animationName == "popup") {
        var popupBody = $(event.target).find('.body');
        var refID = popupBody.find("em").first().html();
        var courseName = $(event.target).find(".title").html();
        var abbr = $(".course-box:hover").find(".course-content").text().split(" ").join("");
        var willTakeResult = userService.getFriendsByCourseName(year, abbr, false);
        var takenResult = userService.getFriendsByCourseName(year, abbr, true);
        var willTakefriends = getFriendsName(willTakeResult);
        var takenFrends = getFriendsName(takenResult);
        console.log(year, abbr);
        if(popupBody.find(".myFriends").length==0){
            if (willTakefriends!=""){
                popupBody.append("<div class='myFriends'>"+
                "<h5>Friends will take the course</h5>"+willTakefriends+"</div>");
            }
            if (takenFrends!=""){

            popupBody.append("<div class='myFriends'>"+
                "<h5>Friends Taken the course </h5>"+takenFrends+"</div>");
            }
        }

    } else if (event.animationName == "courseAdded") {
        addCourseInfoListener();
    }
}



document.addEventListener("animationstart", insertListener, false); // standard + firefox
document.addEventListener("MSAnimationStart", insertListener, false); // IE
document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome + Safari
// console.log('test');
});

var getFriendsName = function(results){
    if (results){
        return results.map(function(d){
                return d.name;});
    } else {
        return "";
    }
}
// console.log(year);
var getAbbr = function(name){
    return name.split("-")[0].slice(1,-1).split(" ").join("-");
}
