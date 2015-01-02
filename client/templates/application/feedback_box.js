Template.feedbackBox.created = function() {
	Session.set('feedbackSubmitErrors', {});
};

Template.feedbackBox.rendered = function() {
    Session.set('feedbackGiven', false);
};

Template.feedbackBox.helpers({
	feedbackGiven: function() {
		return Session.get('feedbackGiven');
	},
	showEmailBox: function() {
		if(Meteor.user())
			return false;
		else
			return true;
	},
	errorMessage: function(field) {
		return Session.get('feedbackSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('feedbackSubmitErrors')[field] ? 'has-error' : '';
	},
});

Template.feedbackBox.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var feedback = {
			message: $(e.target).find('[name=feedback]').val(),
			email: $(e.target).find('[name=email]').val(),
		};

		var errors = {};
		if(!feedback.message)
			errors.message = "Please fill in a message";
		if(!feedback.email)
			errors.email = "Please fill in your email";

		if(errors.message || errors.email)
			return Session.set('feedbackSubmitErrors', errors);

		var user = Meteor.user();
		var from = '';

		if(user)
		{
			from = contactEmail(user);
			user = user._id;
		}
		else
		{
			var $email = $(e.target).find('[name=email]');
			from = $email.val();
			//console.log(from);
			user = "Not Logged User";
		}
			
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
    	Session.set('feedbackSubmitErrors', {});
  },
});

var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};