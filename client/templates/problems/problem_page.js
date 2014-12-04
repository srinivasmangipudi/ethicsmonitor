Template.problemPage.helpers({
	comments: function() {
		return Comments.find({problemId: this._id});
	}
});