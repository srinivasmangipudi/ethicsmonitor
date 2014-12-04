Meteor.publish('problems', function(options) {
	check(options, {
		sort: Object,
		limit: Number
	});
	return Problems.find({}, options);
});

Meteor.publish('singleProblem', function(id) {
	check(id, String);
	return Problems.find(id);
});

Meteor.publish('comments', function(problemId) {
	check(problemId, String);
	return Comments.find({problemId: problemId});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
});