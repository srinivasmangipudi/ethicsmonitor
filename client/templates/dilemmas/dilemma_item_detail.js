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
	credits: function() {
		var cc = this.dilemma ? this.dilemma.credits : '';
		if(!cc || cc === '')
			cc = 'unspecified';
		return cc;
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
	},
	/*shareData: function() {
		return {
			title: this.dilemma ? this.dilemma.title : '',
			author: this.dilemma ? this.dilemma.author : '',
			description: this.dilemma ? this.dilemma.message : '',
			image: this.dilemma ? this.dilemma.imageUrl : false,
			thumbnail: this.dilemma ? this.dilemma.imageUrl : false,
		}
	}*/
	shareData: function() {
		//console.log(this.dilemma.title + " " + this.dilemma.author + " " + this.dilemma.message);

		return {
			title: this.dilemma.title,
			author: this.dilemma.author,
			summary: this.dilemma.message,
			image: this.dilemma.imageUrl,
			thumbnail: this.dilemma.imageUrl,
		}
	}
});