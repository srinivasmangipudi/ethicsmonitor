Router.configure({
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

DilemmasListController = RouteController.extend({
	template: 'dilemmasList',
	increment: 5,
	dilemmasLimit: function() {
		return parseInt(this.params.dilemmasLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.dilemmasLimit()};
	},
	subscriptions: function() {
		this.dilemmasSub = Meteor.subscribe('dilemmas', this.findOptions());
		this.myLatestDilemmaSub = Meteor.subscribe('myLatestDilemma', this.myId());
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
	myLatestDilemma: function() {	
		return Dilemmas.findOne({userId: this.myId()}, {sort: {submitted: -1, _id: -1}});
	},
	data: function() {
		var hasMore = this.dilemmas().count() === this.dilemmasLimit();
		return {
			dilemmas: this.dilemmas(),
			myLatestDilemma: this.myLatestDilemma(),
			ready: this.dilemmasSub.ready && this.myLatestDilemmaSub.ready,
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
		this.dilemmaSub = Meteor.subscribe('singleDilemma', this.params._id);
		this.commentsSub = Meteor.subscribe('comments', this.params._id, this.findOptions());
	},
	comments: function() {
		return Comments.find({dilemmaId: this.params._id}, this.findOptions());
	},
	/*waitOn: function () {
		return Meteor.subscribe('singleDilemma', this.params._id);
	},*/
	dilemma: function() {
		return Dilemmas.findOne(this.params._id);
	},
	data: function() {
		var hasMore = this.comments().count() === this.commentsLimit();
		
		return {
			_id: this.params._id,
			dilemma: this.dilemma(),
			comments: this.comments(),
			ready: this.commentsSub.ready && this.dilemmaSub.ready,
			nextPath: hasMore ? this.nextPath() : null
		};
	},
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.dilemmaPage.path({_id:this.params._id, commentsLimit: this.commentsLimit() + this.increment});
	}
});

Router.route('/', {
	name: 'home',
	controller: NewDilemmasController
});

Router.route('/new/:dilemmasLimit?', {name: "newDilemmas"});

Router.route('/best/:dilemmasLimit?', {name: "bestDilemmas"});

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
		this.userDilemmas = Meteor.subscribe('userDilemmas', this.params._id, this.findOptions());
	},
	dilemmas: function() {
		return Dilemmas.find({userId:this.params._id});
	},
	data: function() {
		var hasMore = this.dilemmas().count() === this.dilemmasLimit();
		
		return {
			dilemmas: this.dilemmas(),
			ready: this.userDilemmas.ready,
			nextPath: hasMore ? this.nextPath() : null
		};
	},
	sort: {submitted: -1, votes: -1, _id: -1},
	nextPath: function() {
		return Router.routes.dilemmaUser.path({_id:this.params._id, commentsLimit: this.commentsLimit() + this.increment});
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

/*Router.onBeforeAction(function() {
 clearErrors();
 this.next();
});*/