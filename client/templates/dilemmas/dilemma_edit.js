Template.dilemmaEdit.created = function() {
	Session.set('dilemmaEditErrors', {});
}

Template.dilemmaEdit.helpers({
	errorMessage: function(field) {
		return Session.get('dilemmaEditErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('dilemmaEditErrors')[field] ? 'has-error' : '';
	}
});

Template.dilemmaEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentDilemmaId = this._id;

		var dilemmaProperties = {
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		};

		var errors = validateDilemma(dilemmaProperties);
		if(errors.title || errors.message)
			return Session.set('dilemmaEditErrors', errors);

		Dilemmas.update(currentDilemmaId, {$set: dilemmaProperties}, function(error) {
			if(error) {
				//display the error to the user
				alert(error.reason);
			} else {
				Router.go('dilemmaPage', {_id: currentDilemmaId});
			}
		});
	},

	'click .cancel': function(e) {
		e.preventDefault();
		Router.go('dilemmaPage', {_id: this._id});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if(confirm("Delete this dilemma?")) {
			var currentDilemmaId = this._id;
			Dilemmas.remove(currentDilemmaId);
			Router.go('home');
		}
	}
});