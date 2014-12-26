Template.userCard.helpers({
	userId: function() {
		return this._id;
	},
	userName: function() {
		var user = Meteor.users.findOne(this._id);
		if(user && user.profile && user.profile.name)
		{
			return user.profile.name;
		}
		else
			return user.username;
	},
	profileLink: function() {
		var user = Meteor.users.findOne(this._id);
		if(user && user.services && user.services.facebook)
		{
			return "http://facebook.com/" + user.services.facebook.id;
		}
		else if(user && user.services && user.services.twitter)
		{
			return "http://twitter.com/" + user.services.twitter.screenName;
		}
		else
			return false;
	}
});