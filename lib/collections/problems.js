Problems = new Mongo.Collection('problems');

Problems.allow({
	update: function(userId, problem) { return ownsDocument(userId, problem); },
	remove: function(userId, problem) { return ownsDocument(userId, problem); },
});

Problems.deny({
	update: function(userId, problem, fieldNames) {
		//may only edit the following fields
		return (_.without(fieldNames, 'url', 'title', 'message').length > 0);
	}
});

Problems.deny({
	update: function(userId, problem, fieldNames, modifier) {
		var errors = validateProblem(modifier.$set);
		return errors.title || errors.url || errors.message;
	}
});

validateProblem = function(problem) {
	var errors = {};

	if(!problem.title)
		errors.title = "Please fill in a headline";

	if(!problem.url)
		errors.url = "Please fill in a URL";

	if(!problem.message)
		errors.message = "Please fill in a message";

	return errors;
};

Meteor.methods({
	problemInsert: function(problemAttributes) {
		check(this.userId, String);
		check(problemAttributes, {
			title: String,
			url: String,
			message: String
		});

		/*if(Meteor.isServer) {
			problemAttributes.title += "(server)";
			//wait for 5 secs
			Meteor._sleepForMs(5000);
		} else {
			problemAttributes.title += "(client)";
		}*/

		var errors = validateProblem(problemAttributes);
		if(errors.title || errors.url || errors.message)
			throw new Meteor.Error('invalid-problem', 'You must set a title, URL and message for your problem');

		var problemWithSameLink = Problems.findOne({url:problemAttributes.url});
		if(problemWithSameLink) {
			return {
				problemExists: true,
				_id: problemWithSameLink._id
			}
		}

		var user = Meteor.user();
		if(!user)
			throw new Meteor.Error(401, "You need to log in to post new problems!");

		var problem = _.extend(problemAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});

		var problemId = Problems.insert(problem);

		return {
			_id: problemId
		};
	},

	upvote: function(problemId) {
		check(this.userId, String);
		check(problemId, String);

		var affected = Problems.update({
			_id: problemId,
			upvoters: {$ne: this.userId}
		}, {
			$addToSet: {upvoters: this.userId},
			$inc: {votes: 1}
		});

		if(! affected)
			throw new Meteor.Error("invalid", "You weren't able to upvote the problem");
	}
});