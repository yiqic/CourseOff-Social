var userService = {
	friendsList : [],
	rawSchedules: [],
	schedules: {},
	ready: false,
	init : function(){
		getFriendList(this.consumeFriendsList.bind(this));
	},
	getFriendsList : function(){
		return this.friendsList;
	},
	getFriendScheduleById : function(id){
		if(!this.ready){
			console.log('Not ready when getFriendScheduleById');
			return null;
		}
		for(var i=0; i < rawSchedules.length; i++){
			var friendId = rawSchedules[i].id;
			if(friendId === id){
				return rawSchedules[i].info;
			}
		}
		return null;
	},
	getFriendsByCourseId : function(id){
		if(!this.ready){
			console.log('Not ready when getFriendScheduleById');
			return null;
		}

	},
	consumeFriendsList : function(friendsList){
		this.friendsList = friendsList;
		for(var i=0; i< friendsList.length; i++){
			getFriendScheduleById( friendsList[i].id, this.consumeSchedule.bind(this) );
		}
	},
	consumeSchedule: function(id, schedule){
		var oneSchedule = schedule[0];
		if(!oneSchedule.owner_id){
			console.log('Structure for schedule is not as expected: ');
			console.log(oneSchedule);
			return;
		}
		for(var i=0; i < this.friendsList.length; i++){
			var friendId = this.friendsList[i].id;
			if( id === friendId ){
				var processed = {};
				processed.id = friendId;
				processed.name = this.friendsList[i].name;
				processed.info = schedule;
				this.rawSchedules.push(processed);
			}
		}
		if( this.rawSchedules.length === this.friendsList.length ){
			console.log(this.rawSchedules);
			this.schedules = parseSchedule(this.rawSchedules);
			console.log(this.schedules);
			this.ready = true;
		}
	}
};

userService.init();
