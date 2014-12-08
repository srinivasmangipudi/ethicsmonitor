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
	},
	dilemmas: function() {
		return Dilemmas.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.dilemmas().count() === this.dilemmasLimit();
		return {
			dilemmas: this.dilemmas(),
			ready: this.dilemmasSub.ready,
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

Router.route('/dilemmas/:_id', {
	name: 'dilemmaPage',
	waitOn: function() {
		return [
			Meteor.subscribe('singleDilemma', this.params._id),
			Meteor.subscribe('comments', this.params._id),
		];
	},
	data: function () { return Dilemmas.findOne(this.params._id); }
});


Router.route('/dilemmas/:_id/edit', {
	name: 'dilemmaEdit',
	waitOn: function() {
		return Meteor.subscribe('singleDilemma', this.params._id);
	},
	data: function () { return Dilemmas.findOne(this.params._id); }
});

Router.route('/submit', {name: 'dilemmaSubmit'});

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