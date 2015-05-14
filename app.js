$(document).ready(function () {

	//Adding 300px to the bottom of the screen
	$('#workspace').append('<div style="height:300px"></div>');
    
    var year = "201508";
	var findCurrentTerm = function () {
		var term = $(".nav[data-visible=term]").find("a").first().text().split(" ");
		year = term[1];
		var semester = term[0];
		if (semester == "Fall") {
			year = year + "08";
		} else if (semester == "Summer") {
			year = year + "05";
		} else if (semester == "Spring") {
			year = year + "01";
		}
	};

	var fadeOwnSchedule = function () {
		$(".course-box").each(function (i, d) {
			$(d).css("opacity", 0.2);
		});
	};

	var addFriendToggle = function () {
		$(".friends").find(".course-info-container").each(function (i) {
			var toggleButton = $(this).find(".pull-right").first().append("<button style='float:right;top:0px'>+</button>");
			var that = this;
			toggleButton.click(function (ev) {
				// fadeOwnSchedule();        // removed since it is unable to keep courses that you and your friend are both taking
				$(that).find(".section").click();
				ev.preventDefault();
			});
		});
	};

	var addCourseInfoListener = function () {
		$(".course-list").find(".course-info-container").find(".name").on("mouseenter", function (e) {
			var courseBar = $(e.target);
			var abbr = "";
			if (courseBar.hasClass('name')) {
				abbr = getAbbr(courseBar.text());
			} else {
				abbr = getAbbr(courseBar.find(".name").text());
			}
			if (abbr != "") {
				var willTakeResult = userService.getFriendsByCourseName(year, abbr, false);
				var takenResult = userService.getFriendsByCourseName(year, abbr, true);
				var friends;
				if (willTakeResult) {
					friends = getFriendsName(willTakeResult.concat(takenResult)).filter(function (item, pos, self) {
						return self.indexOf(item) == pos;
					}).join(", ");
				} else {
					friends = getFriendsName(takenResult).filter(function (item, pos, self) {
						return self.indexOf(item) == pos;
					}).join(", ");
				}
				if (friends != "") {
					courseBar.attr("title", friends);
                    // trackFriendShown("course-info-bar")
				} else {
					courseBar.attr("title", "No friend found");
				}
			}
			e.preventDefault();
		});
	};

	var insertListener = function (event) {
		findCurrentTerm();
		if (event.animationName == "popup") {
			var popupBody = $(event.target).find('.body');
			var refID = popupBody.find("em").first().html();
			var courseName = $(event.target).find(".title").html();
			var abbr = $(".course-box:hover").find(".course-content").text().split(" ").join("");
			var willTakeResult = userService.getFriendsByCourseName(year, abbr, false);
			var takenResult = userService.getFriendsByCourseName(year, abbr, true);
			var willTakefriends = getFriendsName(willTakeResult).filter(function (item, pos, self) {
				return self.indexOf(item) == pos;
			}).join("<br>");

			var takenFrends = getFriendsName(takenResult).filter(function (item, pos, self) {
				return self.indexOf(item) == pos;
			}).join("<br>");

			if (popupBody.find(".myFriends").length == 0) {

				if (willTakefriends != "") {
					trackFriendShown("WillTake");
					popupBody.append("<div class='myFriends'>" +
						"<h5>Friends will take the course</h5>" + willTakefriends + "</div>");
				}
				if (takenFrends != "") {
					trackFriendShown("Taken");
					popupBody.append("<div class='myFriends'>" +
						"<h5>Friends Taken the course </h5>" + takenFrends + "</div>");
				}
			}

		} else if (event.animationName == "courseAdded") {
			addCourseInfoListener();
		}
	};

	var courseSelect = $(".nav[data-visible=term]").find("a:not([data-toggle])");
	courseSelect.each(function (i) {
		$(this).on("click", function () {
			setTimeout(function () {
				addCourseInfoListener();
				findCurrentTerm();
			}, 1000);
		});
	});

	var atlSelect = $(".nav[data-visible=user]").find("a.item");
	atlSelect.each(function (i) {
		$(this).on("click", function (ev) {
			setTimeout(function () {
				addFriendToggle();
			}, 1000);
			ev.preventDefault();
		});
	});

	var newAtlSelect = $(".nav[data-visible=user]").find(".li-icon");
	newAtlSelect.click(function () {
		setTimeout(function () {
			addFriendToggle();
		}, 1000);
	});

	addCourseInfoListener();
	findCurrentTerm();
	setTimeout(function () {
		addFriendToggle();
	}, 1000);

	document.addEventListener("animationstart", insertListener, false); // standard + firefox
	document.addEventListener("MSAnimationStart", insertListener, false); // IE
	document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome + Safari

});

var trackFriendShown = function (e) {
    chrome.runtime.sendMessage({
        purpose: "trackEvent",
        action: "trackFriends", 
        opt_label: e, 
        opt_value: ""}, function(response) {
    });
};

var getFriendsName = function (results) {
	if (results) {
		return results.map(function (d) {
			return d.name;
		});
	} else {
		return [];
	}
};

var getAbbr = function (name) {
	return name.split("-")[0].slice(1, -1).split(" ").join("-");
};