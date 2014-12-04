Template.problemSubmit.created = function() {
	Session.set('problemSubmitErrors', {});
}

Template.problemSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('problemSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('problemSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.problemSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var problem = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		};

		var errors = validateProblem(problem);
		if(errors.title || errors.url || errors.message)
			return Session.set('problemSubmitErrors', errors);

		Meteor.call('problemInsert', problem, function(error, result)
		{
			if(error)
				return throwError(error.reason);

			if(result.problemExists)
			{
				throwError("This link has already been posted! Please discuss it.");
			}

			Router.go('problemPage', {_id: result._id});
		});
	}
});