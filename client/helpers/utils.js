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

UI.registerHelper('profilePhotoSmall', function() {
	var user = Meteor.users.findOne(Meteor.userId());
	//console.log(user);
	if(user && user.services && user.services.facebook)
		return "http://graph.facebook.com/" + user.services.facebook.id + "/picture";
	else
		return "/images/user_chashma.png";
});