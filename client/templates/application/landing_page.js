Template.landingPage.helpers({
	lastDilemmaImage: function() {
		//console.log(this.dbGems);
		return this.dbGems.lastImageDilemmaUrl;
	},
	lastDilemmaCredits: function() {
		return this.dbGems.lastImageDilemmaCredits;
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

		var to = "shrinimann@gmail.com";

		var $body = $(e.target).find('[name=feedback]');
		var subject = "Feedback/Suggestion from: " + user || undefined;

		/*Email.send({
			from: "suggestions@ethicsmonitor.org",
			to: to,
			replyTo: from || undefined,
			subject: "Feedback/Suggestion from: " + user._id || undefined,
			text: body
		});*/

		// In your client code: asynchronously send an email
		Meteor.call('sendEmail',
            to,
            from,
            subject,
            $body.val());
	},
});

var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};