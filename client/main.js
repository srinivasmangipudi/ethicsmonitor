Meteor.subscribe("directory", Meteor.userId());
Meteor.subscribe("dbGems", Meteor.userId());

Meteor.startup(function() {

	Tracker.autorun(function() {
	//console.log('There are ' + Dilemmas.find().count() + ' dilemmas');
	});
});