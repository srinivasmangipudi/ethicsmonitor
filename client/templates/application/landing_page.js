Template.landingPage.rendered = function() {
    Session.set('feedbackGiven', false);
};

Template.landingPage.helpers({
	lastDilemmaImage: function() {
		//console.log(this.dbGems);
		return this.dbGems.lastImageDilemmaUrl;
	},
	lastDilemmaCredits: function() {
		return this.dbGems.lastImageDilemmaCredits;
	},
	feedbackGiven: function() {
		return Session.get('feedbackGiven');
	}
});

Template.landingPage.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var user = Meteor.user();
		var from = '';

		if(user)
			{
				from = contactEmail(user);
				user = user._id;
			}
			
		else
			user = "Not Logged User"

		if(!from)
			from = "userwithnoemail@ethicsmonitor.org";

		var to = "em@goa-cap.org";

		var $body = $(e.target).find('[name=feedback]');
		var subject = "Feedback/Suggestion from: " + user || undefined;

		// In your client code: asynchronously send an email
		Meteor.call('sendEmail',
            to,
            from,
            subject,
            $body.val());

		Session.set('feedbackGiven', true);
	},

	'click .newSuggestion':function(){
    	//console.log("new suggestion clicked");
    	Session.set('feedbackGiven', false);
  },
});

var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};