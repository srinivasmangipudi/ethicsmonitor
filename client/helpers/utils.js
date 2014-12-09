UI.registerHelper('pluralize', function(n, thing) {
	//fairly stupid pluralizer
	if(n == 1) {
		return '1 ' + thing;
	} else {
		return n + ' ' + thing + 's';
	}
});

UI.registerHelper('totalCommentsCount', function() {
	return this.commentsYesCount + this.commentsNoCount;
});

UI.registerHelper('ownDilemma', function() {
	return this.userId === Meteor.userId();
});

