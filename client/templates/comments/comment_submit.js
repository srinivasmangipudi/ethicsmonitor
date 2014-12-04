Template.commentSubmit.created = function() {
	Session.set('commentSubmitErrors', {});
};

Template.commentSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('commentSubmitErrors')[field];
		//return '';
	},

	errorClass: function(field) {
		return !!Session.get('commentSubmitErrors')[field] ? 'has-error': '';
		//return '';
	}
});

Template.commentSubmit.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var $body = $(e.target).find('[name=body]');

		var comment = {
			body: $body.val(),
			problemId: template.data._id
		};

		var errors = {};
		if(! comment.body) {
			errors.body = "Please write some content";
			return Session.set('commentSubmitErrors', errors);
		}

		Meteor.call('commentInsert', comment, function(error, commentId) {
			if(error) {
				throwError(error.reason);
			} else {
				$body.val('');
			}
		});
	}
});