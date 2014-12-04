Template.problemsList.helpers({
	problemsWithRank: function() {
		return this.problems.map(function(problem, index, cursor) {
			problem._rank = index;
			return problem;
		});
	}
});