var DILEMMA_HEIGHT = 80;
var Positions = new Meteor.Collection(null);

Template.dilemmaItem.helpers({
	
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
		var dilemma = _.extend({}, Positions.findOne({dilemmaId: this._id}), this);
		var newPosition = dilemma._rank * DILEMMA_HEIGHT;
		var attributes = {};

		if(_.isUndefined(dilemma.position))
		{
			attributes.class = "dilemma invisible";
		}
		else
		{
			var delta = dilemma.position - newPosition;
			attributes.style = "top: " + delta + "px";

			if(delta === 0)
				attributes.class = "dilemma animate";
		}

		Meteor.setTimeout(function(){
			Positions.upsert({dilemmaId: dilemma._id}, {$set: {position: newPosition}});
		});

		return attributes;
	}
});

Template.dilemmaItem.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});