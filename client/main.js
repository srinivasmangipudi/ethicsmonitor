Meteor.startup(function() {
	Meteor.subscribe("directory", Meteor.userId());

	Tracker.autorun(function() {
	//console.log('There are ' + Dilemmas.find().count() + ' dilemmas');
	});
});