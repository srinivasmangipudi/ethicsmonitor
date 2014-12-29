Template.landingPage.rendered = function() {
};

Template.landingPage.helpers({
	lastDilemmaImage: function() {
		//console.log(this.dbGems);
		return this.dbGems.lastImageDilemmaUrl;
	},
	lastDilemmaCredits: function() {
		return this.dbGems.lastImageDilemmaCredits;
	},
});

Template.landingPage.events({
});