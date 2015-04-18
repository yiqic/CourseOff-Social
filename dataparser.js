
var getFriendList = function(callback) {
	$.ajax({
	  url: "https://gatech.courseoff.com/api/me/friends",
	})
	.done(function(data) {
		callback(data);
	})
	.error(function() {
		alert("unable to get friend list");
	});
};

var getFriendScheduleById = function(id, callback) {
	$.ajax({
	  url: "https://gatech.courseoff.com/api/users/" + id + "/schedules",
	})
	.done(function(data) {
		callback(data);
	})
	.error(function() {
		alert("unable to get schedule of a friend");
	});
};

// var parseSchedule = function(schedule) {
// 	var newSchedule = {};
// 	$.each(schedule, function(i1, friend) {
// 		var friendId = friend["id"];
// 		var friendName = friend["name"];
// 		$.each(friend["info"], function(i2, term) {
// 			if (term in newSchedule.keys()) {
// 				newSchedule[term] = [];
// 			}
// 			$.each(term["courses"], function(i3, course) {
// 				$.each(newSchedule[term])
// 				$.each(course["sections"], function(i4, section) {

// 				});
// 			});
// 		});
// 	});
// }
// var friendList;
// 	$.ajax({
// 	  url: "https://gatech.courseoff.com/api/me/friends",
// 	  async: false
// 	})
// 	.done(function(data) {
// 		callback(data);
// 	})
// 	.error(function() {
// 		alert("unable to get friend list");
// 	});

// 	$.ajax({
// 	  url: "https://gatech.courseoff.com/api/users/" + id + "/schedules",
// 	  async: false
// 	})
// 	.done(function(data) {
// 		callback(data);
// 	})
// 	.error(function() {
// 		alert("unable to get schedule of a friend");
// 	});