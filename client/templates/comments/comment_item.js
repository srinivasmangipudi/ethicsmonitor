Template.commentItem.helpers({
	submittedText: function() {
		return new Date(this.submitted).toString();
	},

	myOpinion: function() {
		if(this.opinion === "yes")
			//return "comment-opinion-yes";
			return true;
		else if(this.opinion === "no")
			//return "comment-opinion-no";
			return false;
		else
			//return "comment-opinion-no";
			return false;
	},

	commentBoxColor: function() {
		if(this.opinion === "yes")
			return "rgb(230, 249, 230)";
		else
			return "rgb(245, 217, 217)";
	}
});