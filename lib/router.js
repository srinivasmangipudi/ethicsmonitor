Router.configure({
	trackPageView: true,
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	'clearErrors': function(page) {
		Errors.clearSeen();
		return page;
	},
	waitOn: function() {
		return [Meteor.subscribe('notifications')];
	}
});

Router.route('/aboutUs', {
	name: 'aboutUs',
	waitOn: function() {
		return Meteor.subscribe('dbGems');
	},
	data: function () { return DbGems.findOne(); }
});

Router.route('/howitworks', {
	name: 'howItWorks',
	waitOn: function() {
		return Meteor.subscribe('dbGems');
	},
	data: function () { return DbGems.findOne(); }
});

DilemmasListController = RouteController.extend({
	template: 'dilemmasList',
	increment: 5,
	fastRender: true,
	dilemmasLimit: function() {
		return parseInt(this.params.dilemmasLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.dilemmasLimit()};
	},
	subscriptions: function() {
		this.dbGemsSub = Meteor.subscribe('dbGems');
		this.dilemmasSub = Meteor.subscribe('dilemmas', this.findOptions());
		this.userProfileSub = Meteor.subscribe('singleUser', this.myId());
		//this.myLatestDilemmaSub = Meteor.subscribe('myLatestDilemma', this.myId());
	},
	dbGems: function() {
		return DbGems.findOne();
	},
	dilemmas: function() {
		return Dilemmas.find({}, this.findOptions());
	},
	myId: function() {
		var userId = Meteor.userId();

		if(!userId)
			{ userId = ''; }

		return userId;
	},
	user: function() {
		return Meteor.users.findOne(this.myId());
	},
	/*myLatestDilemma: function() {	
		return Dilemmas.findOne({userId: this.myId()}, {sort: {submitted: -1, _id: -1}});
	},*/
	data: function() {
		var hasMore = this.dilemmas().count() === this.dilemmasLimit();

		return {
				dbGems: this.dbGems(),
				user: this.user(),
				dilemmas: this.dilemmas(),
				//myLatestDilemma: this.myLatestDilemma(),
				ready: this.dilemmasSub.ready && this.userProfileSub.ready && this.dbGemsSub.ready,
				nextPath: hasMore ? this.nextPath() : null
			};
	}
});

NewDilemmasController = DilemmasListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newDilemmas.path({dilemmasLimit: this.dilemmasLimit() + this.increment});
	}
});

BestDilemmasController = DilemmasListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.bestDilemmas.path({dilemmasLimit: this.dilemmasLimit() + this.increment});
	}
});

Router.route('/', {
	name: 'home',
	controller: NewDilemmasController
});

Router.route('/new/:dilemmasLimit?', {name: "newDilemmas"});

Router.route('/best/:dilemmasLimit?', {name: "bestDilemmas"});



/*DilemmaPageController = RouteController.extend({
	template: 'dilemmaPage',
	increment: 5,
	commentsLimit: function() {
		return parseInt(this.params.commentsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.commentsLimit()};
	},
	subscriptions: function() {
		this.dilemmaSub = Meteor.subscribe('singleDilemma', this.params._id);
		this.commentsSub = Meteor.subscribe('comments', this.params._id, this.findOptions());
		this.userProfileSub = Meteor.subscribe('singleUser', this.myId());
	},
	comments: function() {
		return Comments.find({dilemmaId: this.params._id}, this.findOptions());
	},
	myId: function() {
		var userId = Meteor.userId();

		console.log(this.dilemma());
		if(!userId)
			{ userId = this.dilemma().userId; }

		return userId;
	},
	user: function() {
		return Meteor.users.findOne(this.myId());
	},
	dilemma: function() {
		return Dilemmas.findOne(this.params._id);
	},
	data: function() {
		var hasMore = this.comments().count() === this.commentsLimit();
		
		return {
			_id: this.params._id,
			dilemma: this.dilemma(),
			user: this.user(),
			comments: this.comments(),
			ready: this.commentsSub.ready && this.dilemmaSub.ready && this.userProfileSub.ready,
			nextPath: hasMore ? this.nextPath() : null
		};
	},
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.dilemmaPage.path({_id:this.params._id, commentsLimit: this.commentsLimit() + this.increment});
	}
});*/

DilemmaPageController = RouteController.extend({
	template: 'dilemmaPage',
	increment: 5,
	commentsLimit: function() {
		return parseInt(this.params.commentsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.commentsLimit()};
	},
	subscriptions: function() {
		this.dilemmaWithUserDetailSub = Meteor.subscribe('dilemmaWithUserDetail', this.params._id);
		this.commentsSub = Meteor.subscribe('comments', this.params._id, this.findOptions());
		//this.userProfileSub = Meteor.subscribe('singleUser', this.myId());
	},
	comments: function() {
		return Comments.find({dilemmaId: this.params._id}, this.findOptions());
	},
	/*myId: function() {
		var userId = Meteor.userId();

		console.log(this.dilemma());
		if(!userId)
			{ userId = this.dilemma().userId; }

		return userId;
	},
	user: function() {
		return Meteor.users.findOne(this.myId());
	},*/
	dilemma: function() {
		return Dilemmas.findOne(this.params._id);
	},
	data: function() {
		var hasMore = this.comments().count() === this.commentsLimit();
		
		return {
			_id: this.params._id,
			dilemma: this.dilemma(),
			//user: this.user(),
			comments: this.comments(),
			ready: this.commentsSub.ready && this.dilemmaWithUserDetailSub.ready,
			nextPath: hasMore ? this.nextPath() : null
		};
	},
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.dilemmaPage.path({_id:this.params._id, commentsLimit: this.commentsLimit() + this.increment});
	}
});
/*Router.route('/dilemmas/:_id', {
	name: 'dilemmaPage',
	waitOn: function() {
		return [
			Meteor.subscribe('singleDilemma', this.params._id),
			Meteor.subscribe('comments', this.params._id),
		];
	},
	data: function () { return Dilemmas.findOne(this.params._id); }
});*/

Router.route('/dilemma/detail/:_id/:commentsLimit?', {
	name: 'dilemmaPage',
	controller: DilemmaPageController
});

Router.route('/dilemma/edit/:_id', {
	name: 'dilemmaEdit',
	waitOn: function() {
		return Meteor.subscribe('singleDilemma', this.params._id);
	},
	data: function () { return Dilemmas.findOne(this.params._id); }
});

Router.route('/submit', {name: 'dilemmaSubmit'});

DilemmaUserController = RouteController.extend({
	template: 'dilemmaUser',
	increment: 5,
	dilemmasLimit: function() {
		return parseInt(this.params.dilemmasLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.dilemmasLimit()};
	},
	subscriptions: function() {
		this.userProfile = Meteor.subscribe('singleUser', this.params._id);
		this.userDilemmas = Meteor.subscribe('userDilemmas', this.params._id, this.findOptions());
	},
	dilemmas: function() {
		return Dilemmas.find({userId:this.params._id});
	},
	user: function() {
		//console.log(Meteor.users.find(this.params._id));
		return Meteor.users.findOne(this.params._id);
	},
	data: function() {
		var hasMore = this.dilemmas().count() === this.dilemmasLimit();
		
		return {
			userId: this.params._id,
			user: this.user(),
			dilemmas: this.dilemmas(),
			ready: this.userDilemmas.ready && this.userProfile.ready,
			nextPath: hasMore ? this.nextPath() : null
		};
	},
	sort: {submitted: -1, votes: -1, _id: -1},
	nextPath: function() {
		return Router.routes.dilemmaUser.path({_id:this.params._id, dilemmasLimit: this.dilemmasLimit() + this.increment});
	}
});

Router.route('/userDilemmas/:_id/:dilemmasLimit?', {
	name: 'dilemmaUser'
});

Router.route('/:dilemmasLimit?', {
	name: 'dilemmasList'
});



var requireLogin = function() {
	if (!Meteor.user()){
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireLogin, {only: 'dilemmaSubmit'});
Router.onBeforeAction('dataNotFound', {only: 'dilemmaPage'});
Router.onAfterAction(function() {
        document.title = 'Ethics Monitor';
      }
);
/*Router.onBeforeAction(function() {
 clearErrors();
 this.next();
});*/