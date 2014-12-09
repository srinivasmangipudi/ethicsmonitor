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
	},

	myComment: function() {
		var myComment = Comments.findOne({userId: Meteor.userId()});
		if(myComment) {
			var opinion = myComment.opinion;

			if(opinion === "yes")
				Session.set('commentOpinion', "yes");
			else if(opinion === "no")
				Session.set('commentOpinion', "no");

			Session.set('commentBtnState', "Update Comment");
			Session.set('commentInfoText', "Your opinion");
			Session.set('myCommentId', myComment._id);

			return myComment.body;
		}
		else {
			Session.set('commentInfoText', "What's your opinion?");
			Session.set('commentBtnState', "Add Comment");
			Session.set('myCommentId', '');

			return '';
		}
			
	},

	commentInfoText: function() {
		return Session.get('commentInfoText');
	},

	commentBtnState: function() {
		return Session.get('commentBtnState');
	},
	
});

Template.commentSubmit.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var $body = $(e.target).find('[name=body]');

		var comment = {
			_id: Session.get('myCommentId'),
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

		if(comment._id === '')
		{
			Meteor.call('commentInsert', comment, function(error, commentId) {
				if(error) {
					throwError(error.reason);
				} else {
					//$body.val('');
					Session.set('commentSubmitErrors', {});
				}
			});			
		}
		else
		{
			Meteor.call('commentUpdate', comment, function(error, commentId) {
				if(error) {
					throwError(error.reason);
				} else {
					//$body.val('');
					Session.set('commentSubmitErrors', {});
				}
			});
		}
		
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