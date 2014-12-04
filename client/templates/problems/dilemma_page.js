Template.dilemmaPage.helpers({
	comments: function() {
		return Comments.find({dilemmaId: this._id});
	}
});