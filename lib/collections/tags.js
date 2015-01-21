Tags = new Mongo.Collection('tags');

Tags.allow({
	insert: function(tag) {
		return true;
	},
	update: function(tag) {
		return true;
	}
});

createTag = function(tag) {
	Tags.upsert({_id: tag.toLowerCase()}, {$inc: {count: 1}});
};

Meteor.methods({
	updateTag : function(tag) {
		//when calling from client upsert needs to be in the following format with _id not specified
		Tags.upsert(tag.toLowerCase(), {$inc: {count: 1}});
	}
});

/*updateTags = function(oldTags, newTags) {
	oldTags.forEach(function(tag) {
    		console.log(tag);
			Tags.update({_id: tag}, {$inc: {count: -1}});
		});

	newTags.forEach(function(tag) {
			console.log(tag);
			Tags.upsert(tag, {$inc: {count: 1}});
		});
}*/

removeTag = function(tag) {
	Tags.update({_id: tag}, {$inc: {count: -1}});
};

/*removeTags = function(tagNames) {
	tagNames.forEach(function(tag) {
    			console.log(tag);
				Tags.update({_id: tag}, {$inc: {count: -1}});
			});
	
}*/
