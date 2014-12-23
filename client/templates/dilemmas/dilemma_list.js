Template.dilemmasList.helpers({
	dilemmasWithRank: function() {
		return this.dilemmas.map(function(dilemma, index, cursor) {
			dilemma._rank = index;
			return dilemma;
		});
	},

	latestDilemma: function() {
		console.log(this.myLatestDilemma);
		return this.myLatestDilemma ? this.myLatestDilemma : false;
	},
});