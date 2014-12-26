Template.dilemmaSubmit.created = function() {
	Session.set('dilemmaSubmitErrors', {});
	//Session.set('uploader', new Slingshot.Upload("myFileUploads"));
};

Template.dilemmaSubmit.rendered = function() {
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

Template.dilemmaSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('dilemmaSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('dilemmaSubmitErrors')[field] ? 'has-error' : '';
	},
	uploader: function() {
		return Session.get("uploader");
	},
});

Template.dilemmaSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var dilemma = {
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			credits: $(e.target).find('[name=credits]').val(),
		};

		var errors = validateDilemma(dilemma);
		if(errors.title || errors.message)
			return Session.set('dilemmaSubmitErrors', errors);

		Meteor.call('dilemmaInsert', dilemma, function(error, result)
		{
			if(error)
				return throwError(error.reason);

			var imgUpload = document.getElementById('dilemmaImageInput').files[0];

			if(imgUpload)
			{
				//use slingshot to upload the file first
				var uploader = new Slingshot.Upload("myFileUploads");
				Session.set('uploader', uploader);
				//console.log(uploader);

				uploader.send(imgUpload, function (error, downloadUrl) {
					//console.log("downloadURL:" + downloadUrl);

					if(error)
						return throwError(error.reason);

					//If dilemma is created, we will create an update call to update the image seperately
					var currentDilemmaId = result._id;
					var dilemmaProperties = {
						title: $(e.target).find('[name=title]').val(),
						message: $(e.target).find('[name=message]').val(),
						credits: $(e.target).find('[name=credits]').val(),
						imageUrl: downloadUrl
					};
					//dilemma.imageUrl = downloadUrl;

					Dilemmas.update(currentDilemmaId, {$set: dilemmaProperties}, function(error) {
						if(error) {
							//display the error to the user
							alert(error.reason);
						} else {
							Router.go('dilemmaPage', {_id: currentDilemmaId});
						}
					});
				});
				//Session.set('uploader', "");
			}
			else
				Router.go('dilemmaPage', {_id: result._id});
		});
	}
});