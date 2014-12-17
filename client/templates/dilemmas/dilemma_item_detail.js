Template.dilemmaItemDetail.helpers({
	_id: function() {
		return this.dilemma ? this.dilemma._id : '';
	},
	imageUrl: function() {
		return this.dilemma ? this.dilemma.imageUrl : false;
	},
	title: function() {
		return this.dilemma ? this.dilemma.title : '';
	},
	message: function() {
		return this.dilemma ? this.dilemma.message : '';
	},
	author: function() {
		return this.dilemma ? this.dilemma.author : '';
	},
	userId: function() {
		return this.dilemma ? this.dilemma.userId : '';
	},
	submitted: function() {
		return this.dilemma ? this.dilemma.submitted : '';
	},
	commentsYesCount: function() {
		return this.dilemma ? this.dilemma.commentsYesCount : '';
	},
	commentsNoCount: function() {
		return this.dilemma ? this.dilemma.commentsNoCount : '';
	},

	totalCommentsCount: function() {
		return this.dilemma ? (this.dilemma.commentsYesCount + this.dilemma.commentsNoCount) : 0;
	},
	ownDilemma: function() {
		return this.dilemma ? (this.dilemma.userId === Meteor.userId()) : false;
	}
});