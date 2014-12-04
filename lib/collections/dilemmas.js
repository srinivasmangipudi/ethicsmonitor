Dilemmas = new Mongo.Collection('dilemmas');

Dilemmas.allow({
	update: function(userId, dilemma) { return ownsDocument(userId, dilemma); },
	remove: function(userId, dilemma) { return ownsDocument(userId, dilemma); },
});

Dilemmas.deny({
	update: function(userId, dilemma, fieldNames) {
		//may only edit the following fields
		return (_.without(fieldNames, 'url', 'title', 'message').length > 0);
	}
});

Dilemmas.deny({
	update: function(userId, dilemma, fieldNames, modifier) {
		var errors = validateDilemma(modifier.$set);
		return errors.title || errors.url || errors.message;
	}
});

validateDilemma = function(dilemma) {
	var errors = {};

	if(!dilemma.title)
		errors.title = "Please fill in a headline";

	if(!dilemma.url)
		errors.url = "Please fill in a URL";

	if(!dilemma.message)
		errors.message = "Please fill in a message";

	return errors;
};

Meteor.methods({
	dilemmaInsert: function(dilemmaAttributes) {
		check(this.userId, String);
		check(dilemmaAttributes, {
			title: String,
			url: String,
			message: String
		});

		/*if(Meteor.isServer) {
			dilemmaAttributes.title += "(server)";
			//wait for 5 secs
			Meteor._sleepForMs(5000);
		} else {
			dilemmaAttributes.title += "(client)";
		}*/

		var errors = validateDilemma(dilemmaAttributes);
		if(errors.title || errors.url || errors.message)
			throw new Meteor.Error('invalid-dilemma', 'You must set a title, URL and message for your dilemma');

		var dilemmaWithSameLink = Dilemmas.findOne({url:dilemmaAttributes.url});
		if(dilemmaWithSameLink) {
			return {
				dilemmaExists: true,
				_id: dilemmaWithSameLink._id
			}
		}

		var user = Meteor.user();
		if(!user)
			throw new Meteor.Error(401, "You need to log in to post new dilemmas!");

		var dilemma = _.extend(dilemmaAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});

		var dilemmaId = Dilemmas.insert(dilemma);

		return {
			_id: dilemmaId
		};
	},

	upvote: function(dilemmaId) {
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
	}
});