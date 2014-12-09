Comments = new Meteor.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		check(this.userId, String);
		check(commentAttributes, {
			dilemmaId: String,
			body: String,
			opinion: String
		});

		var user = Meteor.user();
		var dilemma = Dilemmas.findOne(commentAttributes.dilemmaId);

		if(!dilemma)
			throw new Meteor.Error('invalid-comment', 'You must comment on a post!');

		comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		//increment the comment count based on yes or no opinion
		var opinion = commentAttributes.opinion;

		if(opinion === "yes") {
			Dilemmas.update(comment.dilemmaId, {$inc: {commentsYesCount:1}});
		} else if(opinion === "no") {
			Dilemmas.update(comment.dilemmaId, {$inc: {commentsNoCount:1}});
		} else {
			throw new Meteor.Error('invalid-opinion', 'Only yes or no are allowed');
		}
		
		//create the comment, save the id
		comment._id = Comments.insert(comment);

		//now create the notification, informing the user that there has been a comment
		createCommentNotification(comment);

		return comment._id;
	},

	commentUpdate: function(commentAttributes) {
		check(this.userId, String);
		check(commentAttributes, {
			_id: String,
			dilemmaId: String,
			body: String,
			opinion: String
		});

		comment = _.extend(commentAttributes, {
			submitted: new Date()
		});

		//increment the comment count based on yes or no opinion
		var opinion = commentAttributes.opinion;

		if(opinion === "yes") {
			Dilemmas.update(comment.dilemmaId, {$inc: {commentsYesCount:1}});
			Dilemmas.update(comment.dilemmaId, {$inc: {commentsNoCount:-1}});
		} else if(opinion === "no") {
			Dilemmas.update(comment.dilemmaId, {$inc: {commentsYesCount:-1}});
			Dilemmas.update(comment.dilemmaId, {$inc: {commentsNoCount:1}});
		} else {
			throw new Meteor.Error('invalid-opinion', 'Only yes or no are allowed');
		}

		//update the comment
		comment._id = Comments.update({_id: commentAttributes._id}, {$set: {
						body: commentAttributes.body,
						opinion: commentAttributes.opinion,
						submitted: commentAttributes.submitted
					}});

		//now create the notification, informing the user that there has been a comment
		createCommentNotification(comment);

		return comment._id;
	}
});