Template.dilemmaSubmit.created = function() {
	Session.set('dilemmaSubmitErrors', {});
	Session.set("isUploaded", true);
};

Template.dilemmaSubmit.rendered = function() {
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

    $('#tags').selectize({
    delimiter: ',',
    persist: false,
	maxItems: 3,
    create: function(input) {
        return {
            value: input.toLowerCase(),
            text: input.toLowerCase()
        	}
    	}
	});
};

Template.dilemmaSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('dilemmaSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('dilemmaSubmitErrors')[field] ? 'has-error' : '';
	},
	isUploaded: function() {
		return Session.get("isUploaded");
	}
});

Template.dilemmaSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		//var something = $(e.target).find('[name=input-tags]').val();
		//console.log(something);

		var dilemma = {
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			credits: $(e.target).find('[name=credits]').val(),
			tags: $(e.target).find('[name=tags]').val(),
			imageUrl: document.getElementById('dilemmaImageInput').files[0],
		};

		var errors = validateDilemma(dilemma);
		if(errors.title || errors.message || errors.dilemmaImageInput || errors.tags || errors.imageUrl || errors.credits)
			return Session.set('dilemmaSubmitErrors', errors);

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
					Session.set("isUploaded", true);
					//console.log(error);
					var errors = {};
					errors.dilemmaImageInput = error.reason;
					return Session.set('dilemmaSubmitErrors', errors);
				}

				dilemma = _.extend(dilemma, {
					imageUrl: downloadUrl
				});

				Meteor.call('dilemmaInsert', dilemma, function(error, result)
				{
					if(error)
						return throwError(error.reason);

					// if everything went well, store a snapshot of this dilemma in dbGems object
					Meteor.call('dbgemsLastImageDilemmaUpdate', dilemma, function(error, dbgemid) {
						if(error)
							alert(error.reason);
					});
					
					Session.set("isUploaded", true);
					Router.go('dilemmaPage', {_id: result._id});
				});
			});
		}
		/*else
		{
			dilemma = _.extend(dilemma, {
						imageUrl: ""
					});

			Meteor.call('dilemmaInsert', dilemma, function(error, result)
			{
				if(error)
					return throwError(error.reason);

				Router.go('dilemmaPage', {_id: result._id});
			});
		}*/
	}
});