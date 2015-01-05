Template.landingPage.rendered = function() {
};

Template.landingPage.helpers({
	lastDilemmaImage: function() {
		//console.log(this.dbGems);
		return this.dbGems.lastImageDilemmaUrl;
	},
	lastDilemmaTitle: function() {
		//console.log(this.dbGems.lastImageDilemmaTitle);
		return this.dbGems.lastImageDilemmaTitle;
	},
	lastDilemmaCredits: function() {
		//console.log(this.dbGems.lastImageDilemmaCredits);
		var cc = this.dbGems.lastImageDilemmaCredits;
		if(!cc || cc === '')
			cc = 'unspecified';
		return cc;
	},
});

Template.landingPage.events({
});