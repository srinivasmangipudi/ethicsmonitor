if (Problems.find().count() === 0)
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

	var p1Id = Problems.insert({
	title: 'Potholed roads',
	userId: sri._id,
	author: sri.profile.name,
	url: 'http://timesofindia.indiatimes.com/city/chennai/Potholed-roads-pose-a-deadly-threat-to-seniors/articleshow/44966477.cms',
	submitted: now - 7 * 3600 * 1000,
	commentsCount: 2,
	upvoters: [],
	votes: 0
	});

	Comments.insert({
		problemId: p1Id,
		userId: uma._id,
		author: uma.profile.name,
		submitted: now - 5 * 3600 * 1000,
		body: 'Interesting project Sacha, can I get involved?'
	});

	Comments.insert({
		problemId: p1Id,
		userId: sri._id,
		author: sri.profile.name,
		submitted: now - 3 * 3600 * 1000,
		body: 'You sure can Tom!'
	});

	Problems.insert({
	title: 'Garbage in my neighbourhood not being collected',
	url: 'http://www.wsbtv.com/news/news/local/trash-piles-local-apartment-complex-despite-tenant/nh2Mr/',
	userId: uma._id,
	author: uma.profile.name,
	submitted: now - 7 * 3600 * 1000,
	commentsCount: 0,
	upvoters: [],
	votes: 0
	});

	Problems.insert({
	title: 'Traffic congestion increasing pollution',
	url: 'http://www.coventrytelegraph.net/news/coventry-news/coventrys-bus-lanes-could-scrapped-8055383',
	userId: sri._id,
	author: sri.profile.name,
	submitted: now - 7 * 3600 * 1000,
	commentsCount: 0,
	upvoters: [],
	votes: 0
	});

	for(var i=0; i<10; i++)
	{
		Problems.insert({
			title: "Test Problem #" + i,
			author: sri.profile.name,
			userId: sri._id,
			url: 'http://google.com/?q=test-' + i,
			submitted: now - i * 3600 * 1000,
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});
	}
}