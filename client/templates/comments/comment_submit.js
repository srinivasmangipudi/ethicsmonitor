Template.commentSubmit.created = function() {
	Session.set('commentSubmitErrors', {});
	Session.set('commentOpinion', null);
	Session.set('commentInfoText', "What's your opinion?");
	Session.set('commentBtnState', "Submit");
	Session.set('myCommentId', '');
};

Template.commentSubmit.rendered = function() {
	$('#body').maxlength({
      alwaysShow: true,
      threshold: 10,
      warningClass: "label label-success",
      limitReachedClass: "label label-danger",
      separator: ' of ',
      preText: 'You have ',
      postText: ' chars remaining.',
      validate: true,
      placement: 'bottom'
    });
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

			Session.set('commentBtnState', "Update");
			Session.set('commentInfoText', "Your opinion");
			Session.set('myCommentId', myComment._id);

			return myComment.body;
		}
		else {
			Session.set('commentInfoText', "What's your opinion?");
			Session.set('commentBtnState', "Submit");
			Session.set('myCommentId', '');
			//Session.set('commentOpinion', null);
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

		//console.log(template.data);
		var comment = {
			body: $body.val(),
			dilemmaId: template.data._id,
			opinion: Session.get('commentOpinion')
		};

		var errors = {};
		if(! comment.opinion) {
			errors.vote = "Please select 'Agree' or 'Disagree'";
			return Session.set('commentSubmitErrors', errors);
		}
		
		if(! comment.body) {
			errors.body = "Please explain your decision in brief";
			return Session.set('commentSubmitErrors', errors);
		}

		var commentId = Session.get('myCommentId');

		if(commentId === '')
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
			comment._id = commentId;
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