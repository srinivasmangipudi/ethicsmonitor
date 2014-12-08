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
	}
});