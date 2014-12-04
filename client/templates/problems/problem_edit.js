Template.problemEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentProblemId = this._id;

		var problemProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		Problems.update(currentProblemId, {$set: problemProperties}, function(error) {
			if(error) {
				//display the error to the user
				alert(error.reason);
			} else {
				Router.go('problemPage', {_id: currentProblemId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if(confirm("Delete this problem?")) {
			var currentProblemId = this._id;
			Problems.remove(currentProblemId);
			Router.go('home');
		}
	}
});