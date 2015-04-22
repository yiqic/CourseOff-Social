var userService = {
	debug: false,
	friendsList: [],
	rawSchedules: [],
	schedules: {},
	ready: false,
	init: function () {
		getFriendList(this.consumeFriendsList.bind(this));
	},
	getFriendsList: function () {
		return this.friendsList;
	},
	getFriendScheduleById: function (id) {
		if (!this.ready) {
			if (this.debug) console.log('Not ready when getFriendScheduleById');
			return null;
		}
		for (var i = 0; i < rawSchedules.length; i++) {
			var friendId = rawSchedules[i].id;
			if (friendId === id) {
				return rawSchedules[i].info;
			}
		}
		return null;
	},
	getFriendsByCourseId: function (id) {
		if (!this.ready) {
			if (this.debug) console.log('Not ready when getFriendScheduleById');
			return null;
		}

	},
	getFriendsByCourseName: function (term, courseName, past) {
		if (!this.ready) {
			if (this.debug) console.log('Not ready when getFriendScheduleById');
			return null;
		}
		var courseName = courseName.split('-');
		if (courseName.length != 2) {
			if (this.debug) {
				console.log('Invalid courseName: ');
				console.log(courseName);
			}
			return null;
		}
		if (!term) {
			if (this.debug) console.log('Term not defined: ' + term);
		}
		var majorIdent = courseName[0];
		var courseIdent = courseName[1];
		var termObject = this.schedules[term];
		if (!termObject) {
			if (this.debug) console.log('Term not found: ' + term);
			return null;
		}
		if (past) {
			var allFriends = [];
			for (var pastTerm in this.schedules) {
				if (Number(pastTerm) < Number(term)) {
					var friends = this.getFriendsByCourseNameHelper(this.schedules[pastTerm], majorIdent, courseIdent);
					for (var i = 0; i < friends.length; i++) {
						allFriends.push(friends[i]);
					}
				}
			}
			return allFriends;
		} else {
			var allFriends = [];
			for (var pastTerm in this.schedules) {
				if (Number(pastTerm) >= Number(term)) {
					var friends = this.getFriendsByCourseNameHelper(this.schedules[pastTerm], majorIdent, courseIdent);
					for (var i = 0; i < friends.length; i++) {
						allFriends.push(friends[i]);
					}
				}
			}
			return allFriends;
		}
	},
	getFriendsByCourseNameHelper: function (termObject, majorIdent, courseIdent) {
		for (var t = 0; t < termObject.length; t++) {
			if (termObject[t].major_ident === majorIdent && termObject[t].course_ident === courseIdent) {
				courseFound = true;
				var sections = termObject[t].sections;
				if (!sections) {
					if (this.debug) console.log('Sections not defined for course: ' + courseName);
					return null;
				}
				var sectionKeys = Object.keys(sections);
				var friends = [];
				for (var i = 0; i < sectionKeys.length; i++) {
					var sectionFriends = sections[sectionKeys[i]];
					for (var j = 0; j < sectionFriends.length; j++) {
						for (var k = 0; k < this.friendsList.length; k++) {
							if (this.friendsList[k].id === sectionFriends[j]) {
								friends.push(this.friendsList[k]);
							}
						}
					}
				}
				return friends;
			}
		}
		return [];
	},
	consumeFriendsList: function (friendsList) {
		this.friendsList = friendsList;
		for (var i = 0; i < friendsList.length; i++) {
			getFriendScheduleById(friendsList[i].id, this.consumeSchedule.bind(this));
		}
	},
	consumeSchedule: function (id, schedule) {
		var oneSchedule = schedule[0];
		if (!oneSchedule.owner_id) {
			if (this.debug) console.log('Structure for schedule is not as expected: ');
			if (this.debug) console.log(oneSchedule);
			return;
		}
		for (var i = 0; i < this.friendsList.length; i++) {
			var friendId = this.friendsList[i].id;
			if (id === friendId) {
				var processed = {};
				processed.id = friendId;
				processed.name = this.friendsList[i].name;
				processed.info = schedule;
				this.rawSchedules.push(processed);
			}
		}
		if (this.rawSchedules.length === this.friendsList.length) {
			this.schedules = parseSchedule(this.rawSchedules);
			this.ready = true;
		}
	}
};

userService.init();