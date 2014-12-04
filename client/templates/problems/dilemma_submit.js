Template.dilemmaSubmit.created = function() {
	Session.set('dilemmaSubmitErrors', {});
}

Template.dilemmaSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('dilemmaSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('dilemmaSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.dilemmaSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var dilemma = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		};

		var errors = validateDilemma(dilemma);
		if(errors.title || errors.url || errors.message)
			return Session.set('dilemmaSubmitErrors', errors);

		Meteor.call('dilemmaInsert', dilemma, function(error, result)
		{
			if(error)
				return throwError(error.reason);

			if(result.dilemmaExists)
			{
				throwError("This link has already been posted! Please discuss it.");
			}

			Router.go('dilemmaPage', {_id: result._id});
		});
	}
});