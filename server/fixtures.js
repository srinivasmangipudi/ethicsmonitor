if (Dilemmas.find().count() === 0)
{
	var now = new Date().getTime();

	//create two users
	var sriId = Meteor.users.insert({
		profile: {name: "Srinivas Mangipudi"}
	});
	var sri = Meteor.users.findOne(sriId);

	var umaId = Meteor.users.insert({
		profile: {name: "Uma Mangipudi"}
	});
	var uma = Meteor.users.findOne(umaId);

	var p1Id = Dilemmas.insert({
	title: 'Potholed roads',
	message: 'this is too bad',
	userId: sri._id,
	author: sri.profile.name,
	submitted: new Date(),
	commentsYesCount: 1,
	commentsNoCount: 1,
	upvoters: [],
	votes: 0
	});

	Comments.insert({
		dilemmaId: p1Id,
		userId: uma._id,
		author: uma.profile.name,
		submitted: new Date(),
		body: 'Interesting project Sacha, can I get involved?',
		opinion: "yes"
	});

	Comments.insert({
		dilemmaId: p1Id,
		userId: sri._id,
		author: sri.profile.name,
		submitted: new Date(),
		body: 'You sure can Tom!',
		opinion: "no"
	});

	Dilemmas.insert({
	title: 'Garbage in my neighbourhood not being collected',
	message: 'dirty dirty dirty',
	userId: uma._id,
	author: uma.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	upvoters: [],
	votes: 0
	});

	Dilemmas.insert({
	title: 'Traffic congestion increasing pollution',
	message: 'smoking poluutants',
	userId: sri._id,
	author: sri.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	upvoters: [],
	votes: 0
	});

	for(var i=0; i<10; i++)
	{
		Dilemmas.insert({
			title: "Test Dilemma #" + i,
			message: 'test message #' + i,
			author: sri.profile.name,
			userId: sri._id,
			submitted: new Date(),
			commentsYesCount: 0,
			commentsNoCount: 0,
			upvoters: [],
			votes: 0
		});
	}

	anyDilemma = Dilemmas.insert({
	title: 'Comment Testing Dilemma',
	message: 'lot of comments',
	userId: sri._id,
	author: sri.profile.name,
	submitted: new Date(),
	commentsYesCount: 20,
	commentsNoCount: 0,
	upvoters: [],
	votes: 0
	});

	anyDilemma = Dilemmas.findOne({title:"Comment Testing Dilemma"});
	for(var i=0; i<20; i++)
	{
		var uId = Meteor.users.insert({
			profile: {name: "Test User #" + i}
		});

		Comments.insert({
			dilemmaId: anyDilemma._id,
			userId: uId,
			author: "Test User #" + i,
			submitted: new Date(),
			body: 'test test comment#' + i,
			opinion: "yes"
		});
	}
	
}