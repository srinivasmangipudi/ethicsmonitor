Template.notifications.helpers({
	notifications: function() {
		return Notifications.find({userId: Meteor.userId(), read:false});
	},
	notificationCount: function() {
		return Notifications.find({userId: Meteor.userId(), read:false}).count();
	}
});

Template.notificationItem.helpers({
	notificationProblemPath: function() {
		return Router.routes.problemPage.path({_id: this.problemId});
	}
});

Template.notificationItem.events({
	'click a': function() {
		Notifications.update(this._id, {$set: {read:true}});
	}
});