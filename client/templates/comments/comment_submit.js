Template.commentSubmit.created = function() {
	Session.set('commentSubmitErrors', {});
};

Template.commentSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('commentSubmitErrors')[field];
	},

	errorClass: function(field) {
		return !!Session.get('commentSubmitErrors')[field] ? 'has-error': '';
	},

	opinionYesClass: function() {
		if(Session.get('commentOpinion') === "yes")
			return 'btn-success active';
		else
			return 'btn-default';
	},

	opinionNoClass: function() {
		if(Session.get('commentOpinion') === "no")
			return 'btn-danger active';
		else
			return 'btn-default';
	}
});

Template.commentSubmit.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var $body = $(e.target).find('[name=body]');

		var comment = {
			body: $body.val(),
			dilemmaId: template.data._id,
			opinion: Session.get('commentOpinion')
		};

		var errors = {};
		if(! comment.body) {
			errors.body = "Please write some content";
			return Session.set('commentSubmitErrors', errors);
		}

		if(typeof comment.opinion == 'undefined') {
			errors.body = "Please select 'Yes' or 'No'";
			return Session.set('commentSubmitErrors', errors);
		}

		Meteor.call('commentInsert', comment, function(error, commentId) {
			if(error) {
				throwError(error.reason);
			} else {
				$body.val('');
				Session.set('commentSubmitErrors', {});
			}
		});
	},

	'click .opinion-yes': function(e) {
		e.preventDefault();
		Session.set('commentSubmitErrors', {});
		return Session.set('commentOpinion', "yes");
	},

	'click .opinion-no': function(e) {
		e.preventDefault();
		Session.set('commentSubmitErrors', {});
		return Session.set('commentOpinion', "no");
	}
});