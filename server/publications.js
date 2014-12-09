Meteor.publish('dilemmas', function(options) {
	check(options, {
		sort: Object,
		limit: Number
	});
	return Dilemmas.find({}, options);
});

Meteor.publish('singleDilemma', function(id) {
	check(id, String);
	return Dilemmas.find(id);
});

Meteor.publish('comments', function(dilemmaId) {
	check(dilemmaId, String);
	return Comments.find({dilemmaId: dilemmaId}, {sort: {submitted: -1}});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
});