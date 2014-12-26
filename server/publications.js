Meteor.publish("directory", function (id) {
  return Meteor.users.find({_id:id}, {fields: { emails: 1,
												profile: 1,
												"services.facebook.id": 1,
												"services.twitter.screenName": 1,
												"services.twitter.profile_image_url": 1}});
});

Meteor.publish('singleUser', function(id) {
	check(id, String);
	return Meteor.users.find({_id:id}, {fields: { emails: 1,
												profile: 1,
												"services.facebook.id": 1,
												"services.twitter.screenName": 1,
												"services.twitter.profile_image_url": 1}});
});

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

Meteor.publish('myLatestDilemma', function(id) {
	check(id, String);
	return Dilemmas.find({userId:id}, {sort: {submitted: -1, _id: -1}});
});

Meteor.publish('userDilemmas', function(id, options) {
	check(id, String);
	check(options, {
		sort: Object,
		limit: Number
	});
	return Dilemmas.find({userId:id}, options);
});

/*Meteor.publish('comments', function(dilemmaId) {
	check(dilemmaId, String);
	return Comments.find({dilemmaId: dilemmaId}, {sort: {submitted: -1}});
});*/


Meteor.publish('comments', function(dilemmaId, options) {
	check(dilemmaId, String);
	check(options, {
		sort: Object,
		limit: Number
	});
	return Comments.find({dilemmaId: dilemmaId}, options);
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
});