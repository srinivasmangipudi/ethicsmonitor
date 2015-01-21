Template.dilemmasList.rendered = function() {
    //console.log(this.data);
    //var controller = Router.current();
    //console.log(controller.params.tagName);
};

Template.dilemmasList.helpers({
	dilemmasWithRank: function() {
		return this.dilemmas.map(function(dilemma, index, cursor) {
			dilemma._rank = index;
			return dilemma;
		});
	},

	customPage: function() {
		var controller = Router.current();
		if(controller.params.tagName && controller.params.tagName.toUpperCase() === 'GOAPHOTO')
			return 'https://s3.amazonaws.com/ethicsmonitor/siteimages/goaphoto.png';
		else
			return false;
	}
	/*latestDilemma: function() {
		console.log(this.myLatestDilemma);
		return this.myLatestDilemma ? this.myLatestDilemma : false;
	},*/
});