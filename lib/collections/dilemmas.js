Dilemmas = new Mongo.Collection('dilemmas');

Dilemmas.allow({
	update: function(userId, dilemma) { return ownsDocument(userId, dilemma); },
	remove: function(userId, dilemma) { return ownsDocument(userId, dilemma); },
});

Dilemmas.deny({
	update: function(userId, dilemma, fieldNames) {
		//may only edit the following fields
		return (_.without(fieldNames, 'title', 'message', 'credits', 'imageUrl', 'tags').length > 0);
	}
});

Dilemmas.deny({
	update: function(userId, dilemma, fieldNames, modifier) {
		var errors = validateDilemma(modifier.$set);
		return errors.title || errors.message || errors.inputTags;
	}
});

/*
Dilemmas.allow({
	update: function(userId, dilemma) {
		//allow uploading/updating of images
		if(!dilemma.imageUrl)
			return false;
		else
			return true;
	}
});*/

validateDilemma = function(dilemma, isNew) {
	var errors = {};

	if(isNew)
	{
		if(!dilemma.imageUrl)
		{
			errors.imageUrl = "Please select an image to upload"
		}
	}

	if(!dilemma.title)
		errors.title = "Please fill in a headline";
	if(!dilemma.message)
		errors.message = "Please fill in a message";
	if(!dilemma.tags)
	{
		errors.tags = "Atleast one tag must be specified";
	}
	if(!dilemma.credits)
	{
		errors.credits = "Photographer credits or source of image must be specified"
	}

	return errors;
};


Meteor.methods({
	dilemmaInsert: function(dilemmaAttributes) {
		check(this.userId, String);
		check(dilemmaAttributes, {
			title: String,
			message: String,
			credits: String,
			imageUrl: String,
			tags: String,
		});

		var errors = validateDilemma(dilemmaAttributes);
		if(errors.title || errors.message || errors.tags || errors.credits)
			throw new Meteor.Error('invalid-dilemma', 'You must set a title and message and tags for your dilemma');

		var user = Meteor.user();
		if(!user)
			throw new Meteor.Error(401, "You need to log in to post new dilemmas!");

		var author = "";
		if(user.username)
			author = user.username;
		else
			author = user.profile.name;

		var tags = dilemmaAttributes.tags.toLowerCase().split(",");

		var dilemma = _.extend(dilemmaAttributes, {
			userId: user._id,
			author: author,
			submitted: new Date(),
			commentsYesCount: 0,
			commentsNoCount: 0,
			//upvoters: [],
			tags: tags,
			votes: 0
		});

		var dilemmaId = Dilemmas.insert(dilemma);

		//save the tags in a seperate collection
		tags.forEach(function(tag) {
    		//console.log(tag);
    		createTag(tag);
		});

		return {
			_id: dilemmaId
		};
	},

	/*upvote: function(dilemmaId) {
		check(this.userId, String);
		check(dilemmaId, String);

		var affected = Dilemmas.update({
			_id: dilemmaId,
			upvoters: {$ne: this.userId}
		}, {
			$addToSet: {upvoters: this.userId},
			$inc: {votes: 1}
		});

		if(! affected)
			throw new Meteor.Error("invalid", "You weren't able to upvote the dilemma");
	}*/
});