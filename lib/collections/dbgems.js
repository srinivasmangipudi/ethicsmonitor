DbGems = new Mongo.Collection('dbgems');


DbGems.deny({
	update: function(fieldNames) {
		//may only edit the following fields
		return (_.without(fieldNames, 	"lastImageDilemmaId", "lastImageDilemmaUrl", "lastImageDilemmaCredits", 
										"lastImageDilemmaCommentsYesCount", "lastImageDilemmaCommentsNoCount",
										"lastImageDilemmaVotes", "submitted").length > 0);
	}
});

Meteor.methods({
	dbgemsLastImageDilemmaUpdate: function(dilemma) {
		var dbgemObj = DbGems.findOne();

		if(!dbgemObj)
			throw new Meteor.Error('invalid-dbgem', 'DbGems object does not exists!');

		dbgemObj._id = DbGems.update({_id: dbgemObj._id}, {$set: {
						lastImageDilemmaId: dilemma._id,
						lastImageDilemmaUrl: dilemma.imageUrl,
						lastImageDilemmaTitle: dilemma.title,
						lastImageDilemmaCredits: dilemma.credits,
						lastImageDilemmaCommentsYesCount: dilemma.commentsYesCount,
						lastImageDilemmaCommentsNoCount: dilemma.commentsNoCount,
						lastImageDilemmaVotes: dilemma.votes,
						submitted: new Date()
					}});

		return dbgemObj._id;

	}
});