Notifications = new Mongo.Collection('notifications');

Notifications.allow({
	update: function(userId, doc, fieldNames) {
		return ownsDocument(userId, doc) &&
			fieldNames.length === 1 && fieldNames[0] === 'read';
	}
});

createCommentNotification = function(comment) {
	var problem = Problems.findOne(comment.problemId);
	if(comment.userId !== problem.userId) {
		Notifications.insert({
			userId: problem.userId,
			problemId: problem._id,
			commentId: comment._id,
			commenterName: comment.author,
			read: false
		});
	}
}