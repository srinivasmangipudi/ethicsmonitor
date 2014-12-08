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

		//increment the comment count
		Dilemmas.update(comment.dilemmaId, {$inc: {commentsCount:1}});

		//create the comment, save the id
		comment._id = Comments.insert(comment);

		//now create the notification, informing the user that there has been a comment
		createCommentNotification(comment);

		return comment._id;		
	}
});