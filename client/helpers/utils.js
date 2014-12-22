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

UI.registerHelper('currentUserId', function() {
	return Meteor.userId();
});


UI.registerHelper('profilePhotoSmall', function() {
	var user = Meteor.users.findOne(Meteor.userId());
	//console.log(user);
	if(user && user.services && user.services.facebook)
		return "http://graph.facebook.com/" + user.services.facebook.id + "/picture";
	else if(user && user.services && user.services.twitter)
		return user.services.twitter.profile_image_url;
	else
		return "/images/user_chashma.png";
});

UI.registerHelper('userPhotoSmall', function(id) {
	var user = Meteor.users.findOne(id);
	//console.log(id);
	//console.log(user);
	if(user && user.services && user.services.facebook)
	{
		console.log("http://graph.facebook.com/" + user.services.facebook.id + "/picture");
		return "http://graph.facebook.com/" + user.services.facebook.id + "/picture";
	}
	else if(user && user.services && user.services.twitter)
		return user.services.twitter.profile_image_url;
	else
		return "/images/user_chashma.png";
});

