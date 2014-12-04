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

ProblemsListController = RouteController.extend({
	template: 'problemsList',
	increment: 5,
	problemsLimit: function() {
		return parseInt(this.params.problemsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.problemsLimit()};
	},
	subscriptions: function() {
		this.problemsSub = Meteor.subscribe('problems', this.findOptions());
	},
	problems: function() {
		return Problems.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.problems().count() === this.problemsLimit();
		return {
			problems: this.problems(),
			ready: this.problemsSub.ready,
			nextPath: hasMore ? this.nextPath() : null
		};
	}
});

NewProblemsController = ProblemsListController.extend({
	sort: {submited: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newProblems.path({problemsLimit: this.problemsLimit() + this.increment});
	}
});

BestProblemsController = ProblemsListController.extend({
	sort: {votes: -1, submited: -1, _id: -1},
	nextPath: function() {
		return Router.routes.bestProblems.path({problemsLimit: this.problemsLimit() + this.increment});
	}
});

Router.route('/', {
	name: 'home',
	controller: NewProblemsController
});

Router.route('/new/:problemsLimit?', {name: "newProblems"});

Router.route('/best/:problemsLimit?', {name: "bestProblems"});

Router.route('/problems/:_id', {
	name: 'problemPage',
	waitOn: function() {
		return [
			Meteor.subscribe('singleProblem', this.params._id),
			Meteor.subscribe('comments', this.params._id),
		];
	},
	data: function () { return Problems.findOne(this.params._id); }
});


Router.route('/problems/:_id/edit', {
	name: 'problemEdit',
	waitOn: function() {
		return Meteor.subscribe('singleProblem', this.params._id);
	},
	data: function () { return Problems.findOne(this.params._id); }
});

Router.route('/submit', {name: 'problemSubmit'});

Router.route('/:problemsLimit?', {
	name: 'problemsList'
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

Router.onBeforeAction(requireLogin, {only: 'problemSubmit'});
Router.onBeforeAction('dataNotFound', {only: 'problemPage'});

/*Router.onBeforeAction(function() {
 clearErrors();
 this.next();
});*/