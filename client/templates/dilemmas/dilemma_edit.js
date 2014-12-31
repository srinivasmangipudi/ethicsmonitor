Template.dilemmaEdit.created = function() {
	Session.set('dilemmaEditErrors', {});
	Session.set("isUploaded", true);
};

Template.dilemmaEdit.rendered = function() {
	$('#credits').maxlength({
      alwaysShow: true,
      threshold: 10,
      warningClass: "label label-success",
      limitReachedClass: "label label-danger",
      separator: ' of ',
      preText: 'You have ',
      postText: ' chars remaining.',
      validate: true,
      placement: 'bottom'
    });

	$('#title').maxlength({
      alwaysShow: true,
      threshold: 10,
      warningClass: "label label-success",
      limitReachedClass: "label label-danger",
      separator: ' of ',
      preText: 'You have ',
      postText: ' chars remaining.',
      validate: true,
      placement: 'bottom'
    });

	$('#message').maxlength({
      alwaysShow: true,
      threshold: 10,
      warningClass: "label label-success",
      limitReachedClass: "label label-danger",
      separator: ' of ',
      preText: 'You have ',
      postText: ' chars remaining.',
      validate: true,
      placement: 'bottom'
    });
};

Template.dilemmaEdit.helpers({
	errorMessage: function(field) {
		return Session.get('dilemmaEditErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('dilemmaEditErrors')[field] ? 'has-error' : '';
	},
	isUploaded: function() {
		return Session.get("isUploaded");
	}
});

Template.dilemmaEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentDilemmaId = this._id;

		var dilemmaProperties = {
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			credits: $(e.target).find('[name=credits]').val(),
		};

		var errors = validateDilemma(dilemmaProperties);
		if(errors.title || errors.message || errors.dilemmaImageInput)
			return Session.set('dilemmaEditErrors', errors);

		var imgUpload = document.getElementById('dilemmaImageInput').files[0];

		if(imgUpload)
		{
			Session.set("isUploaded", false);

			//use slingshot to upload the file first
			var uploader = new Slingshot.Upload("myFileUploads");

			uploader.send(imgUpload, function (error, downloadUrl) 
			{
				//console.log("downloadURL:" + downloadUrl);

				if(error)
				{
					//console.log(error);
					Session.set("isUploaded", true);
					var errors = {};
					errors.dilemmaImageInput = error.reason;
					return Session.set('dilemmaEditErrors', errors);
				}

				dilemmaProperties = _.extend(dilemmaProperties, {
					imageUrl: downloadUrl
				});

				Dilemmas.update(currentDilemmaId, {$set: dilemmaProperties}, function(error) {
					if(error) {
						//display the error to the user
						alert(error.reason);
					} else {
						Session.set("isUploaded", true);
						Router.go('dilemmaPage', {_id: currentDilemmaId});
					}
				});
			});
		}
		else
		{
			Dilemmas.update(currentDilemmaId, {$set: dilemmaProperties}, function(error) {
				if(error) {
					//display the error to the user
					alert(error.reason);
				} else {
					Router.go('dilemmaPage', {_id: currentDilemmaId});
				}
			});			
		}
	},

	'click .cancel': function(e) {
		e.preventDefault();
		Router.go('dilemmaPage', {_id: this._id});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if(confirm("Delete this dilemma?")) {
			//TODO: Delete 
			var currentDilemmaId = this._id;
			Dilemmas.remove(currentDilemmaId);
			Router.go('home');
		}
	}
});