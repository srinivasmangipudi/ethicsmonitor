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
	commentsCount: 2,
	upvoters: [],
	votes: 0
	});

	Comments.insert({
		problemId: p1Id,
		userId: uma._id,
		author: uma.profile.name,
		submitted: new Date(),
		body: 'Interesting project Sacha, can I get involved?'
	});

	Comments.insert({
		problemId: p1Id,
		userId: sri._id,
		author: sri.profile.name,
		submitted: new Date(),
		body: 'You sure can Tom!'
	});

	Dilemmas.insert({
	title: 'Garbage in my neighbourhood not being collected',
	message: 'dirty dirty dirty',
	userId: uma._id,
	author: uma.profile.name,
	submitted: new Date(),
	commentsCount: 0,
	upvoters: [],
	votes: 0
	});

	Dilemmas.insert({
	title: 'Traffic congestion increasing pollution',
	message: 'smoking poluutants',
	userId: sri._id,
	author: sri.profile.name,
	submitted: new Date(),
	commentsCount: 0,
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
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});
	}
}