Template.dilemmaEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentDilemmaId = this._id;

		var dilemmaProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		Dilemmas.update(currentDilemmaId, {$set: dilemmaProperties}, function(error) {
			if(error) {
				//display the error to the user
				alert(error.reason);
			} else {
				Router.go('dilemmaPage', {_id: currentDilemmaId});
			}
		});
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