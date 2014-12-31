if (Dilemmas.find().count() === 0)
{
	var now = new Date().getTime();

	//create test user
	var testuserId = Meteor.users.insert({
		profile: {name: "TestUser"}
	});
	var testuser = Meteor.users.findOne(testuserId);

	/*
	Dilemmas.insert({
	title: "Can I use that picture?",
	message: "This graphic shows a flow-chart of copyright issues of the use a picture. Just wanted to know your opinion about it.",
	imageUrl: "https://s3.amazonaws.com/ethicsmonitor/TestUser/Infographic_CanIUseThatPicture.jpg",
	userId: testuser._id,
	author: testuser.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	votes: 0
	});*/

	Dilemmas.insert({
	title: 'Teen sisters allegedly gang-raped, hanged to death in Uttar Pradesh',
	message: 'Is it ethical to put human remains on public display',
	imageUrl: "https://s3.amazonaws.com/ethicsmonitor/TestUser/baudhan_rape.jpg",
	userId: testuser._id,
	author: testuser.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	votes: 0
	});

	Dilemmas.insert({
	title: 'The Ethics of Digital Manipulation',
	message: "How can we believe anything we see anymore? With today's technology, we can literally do anything we want with images.",
	imageUrl: "https://s3.amazonaws.com/ethicsmonitor/TestUser/M8.png",
	userId: testuser._id,
	author: testuser.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	votes: 0
	});

	Dilemmas.insert({
	title: 'Ethical limits in documentary photography',
	message: "Who is the predator?",
	imageUrl: "https://s3.amazonaws.com/ethicsmonitor/TestUser/kc.jpg",
	userId: testuser._id,
	author: testuser.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	votes: 0
	});

	Dilemmas.insert({
	title: 'Monkey selfie copyright issues!',
	message: "If the monkey has clicked the selfie using photographer's camera and his created situation, is he not ethically entitled to the rights of the monetary benefits from that photo being used in social media, by all the corporations for monetary gain?",
	imageUrl: "https://s3.amazonaws.com/ethicsmonitor/TestUser/MONKEY-SELFIE.jpg",
	userId: testuser._id,
	author: testuser.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	votes: 0
	});

	/*Dilemmas.insert({
	title: "A struggling Photogapher",
	message: "If photographer is not able to make a living from photography, then can his work remain ethical?",
	imageUrl: "",
	userId: testuser._id,
	author: testuser.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	votes: 0
	});

	Dilemmas.insert({
	title: "Don't Feed the Bears: Ethics in Wildlife Photography and Filmmaking",
	message: "The ethics behind photography of wildlife like this great gray owl have come into question after a marine biologist was fined for baiting whales to come closer in order to film them.",
	imageUrl: "https://s3.amazonaws.com/ethicsmonitor/TestUser/wildlife-filmmaking-ethics-hogan.jpg",
	credits: "National Geographic",
	userId: testuser._id,
	author: testuser.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	votes: 0
	});

	Dilemmas.insert({
	title: "Is it ethical to use photography to sell a product, when you know the product is harmful.",
	message: "If I am paid for the job, which I need to make a living, how can I do that job if I know that what I am doing might be bad for people? I also really need the job, and my work is fine, but I am not sure of its implications. Please advice!",
	imageUrl: "",
	userId: testuser._id,
	author: testuser.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	votes: 0
	});*/

	var lastId = Dilemmas.insert({
	title: "Amanda and her cousin",
	message: "This photo is ethically evaluative because it shows a chubby girl and smoking girl who are obviously young, in their swimsuits, which is ethically wrong. The looks on their faces also show how they are not very happy, proving that the situation is not ideal.",
	imageUrl: "https://s3.amazonaws.com/ethicsmonitor/TestUser/amanda-and-her-cousin-amy-valese-north-carolina-1990.jpg",
	credits: "Mary Ellen Mark",
	userId: testuser._id,
	author: testuser.profile.name,
	submitted: new Date(),
	commentsYesCount: 0,
	commentsNoCount: 0,
	votes: 0
	});

	var lastImageDilemma = Dilemmas.findOne(lastId);

	//create the DbGems object which will store unique stats about the website for constant time fetch
	DbGems.insert({
		lastImageDilemmaId: lastId,
		lastImageDilemmaUrl: lastImageDilemma.imageUrl,
		lastImageDilemmaCredits: lastImageDilemma.credits,
		lastImageDilemmaCommentsYesCount: lastImageDilemma.commentsYesCount,
		lastImageDilemmaCommentsNoCount: lastImageDilemma.commentsNoCount,
		lastImageDilemmaVotes: lastImageDilemma.votes,
		submitted: new Date(),
	});
}