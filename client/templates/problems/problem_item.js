var PROBLEM_HEIGHT = 80;
var Positions = new Meteor.Collection(null);

Template.problemItem.helpers({
	ownProblem: function() {
		return this.userId === Meteor.userId();
	},

	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},

	upvotedClass: function() {
		var userId = Meteor.userId();
		if(userId && !_.include(this.upvoters, userId)) {
			return 'upvotable';
		} else if (!userId) {
			return 'disabled';
		} else {
			return 'btn-success disabled';
		}
	},

	attributes: function() {
		var problem = _.extend({}, Positions.findOne({problemId: this._id}), this);
		var newPosition = problem._rank * PROBLEM_HEIGHT;
		var attributes = {};

		if(_.isUndefined(problem.position))
		{
			attributes.class = "problem invisible";
		}
		else
		{
			var delta = problem.position - newPosition;
			attributes.style = "top: " + delta + "px";

			if(delta === 0)
				attributes.class = "problem animate";
		}

		Meteor.setTimeout(function(){
			Positions.upsert({problemId: problem._id}, {$set: {position: newPosition}});
		});

		return attributes;
	}
});

Template.problemItem.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});