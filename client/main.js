Meteor.startup(function() {
	Tracker.autorun(function() {
	console.log('There are ' + Problems.find().count() + ' problems');
	});
});