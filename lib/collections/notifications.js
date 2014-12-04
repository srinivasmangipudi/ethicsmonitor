Notifications = new Mongo.Collection('notifications');

Notifications.allow({
	update: function(userId, doc, fieldNames) {
		return ownsDocument(userId, doc) &&
			fieldNames.length === 1 && fieldNames[0] === 'read';
	}
});

createCommentNotification = function(comment) {
	var dilemma = Dilemmas.findOne(comment.dilemmaId);
	if(comment.userId !== dilemma.userId) {
		Notifications.insert({
			userId: dilemma.userId,
			dilemmaId: dilemma._id,
			commentId: comment._id,
			commenterName: comment.author,
			read: false
		});
	}
}