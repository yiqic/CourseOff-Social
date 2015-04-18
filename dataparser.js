var getNull = function() {
	console.log("shit");
}


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
		callback(id, data);
	})
	.error(function() {
		alert("unable to get schedule of a friend");
	});
};

var parseSchedule = function(schedule) {
	var newSchedule = {};
	$.each(schedule, function(i1, friend) {
		$.each(friend["info"], function(i2, term) {
			var term_ident = term["term_ident"];
			if (!(term_ident in newSchedule)) {
				newSchedule[term_ident] = [];
			}
			$.each(term["courses"], function(i3, course) {
				var exist = false;
				var index;
				$.each(newSchedule[term_ident], function(i, d) {
					if (d["major_ident"] == course["major_ident"] && d["course_ident"] == course["course_ident"]) {
						exist = true;
						index = i;
					}
				})
				if (!exist) {
					newSchedule[term_ident].push({
						"major_ident": course["major_ident"], 
						"course_ident": course["course_ident"], 
						"sections": {}
					});
					index = newSchedule[term_ident].length - 1;
				}
				$.each(course["sections"], function(i4, section) {
					if (!(section in newSchedule[term_ident][index])) {
						newSchedule[term_ident][index]["sections"][section] = []
					}
					newSchedule[term_ident][index]["sections"][section].push(friend["id"]);
				});
			});
		});
	});
	return newSchedule;
}
