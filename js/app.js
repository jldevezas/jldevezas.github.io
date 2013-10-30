var app = angular.module('jldApp', [ 'utils', 'hljs' ]);

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'home.partial.html',
		controller: function($rootScope) { $rootScope.title = "Home"; }
	}).when('/research', {
		templateUrl : 'research.partial.html',
		controller: function($rootScope) {
			$rootScope.title = "Research";
			angular.element('body').scrollspy({ target: '.spy-target' });
		},
		reloadOnSearch: false
	}).when('/individual-listening-behavior', {
		templateUrl : 'individual-listening-behavior.partial.html',
		controller: function($rootScope) {
			$rootScope.title = "Individual Music Listening Behavior";
			angular.element('body').unbind('scroll');
			angular.element('#control').affix({ offset: { top: 50 } });
		}
	}).when('/global-listening-behavior', {
		templateUrl : 'global-listening-behavior.partial.html',
		controller: function($rootScope) { $rootScope.title = "Global Music Listening Behavior"; }
	}).when('/latent-factor-models', {
		templateUrl : 'latent-factor-models.partial.html',
		controller: function($rootScope) { $rootScope.title = "Latent Factor Models"; }
	}).when('/k-fold-cross-validation', {
		templateUrl : 'k-fold-cross-validation.partial.html',
		controller: function($rootScope) { $rootScope.title = "k-Fold Cross Validation"; }
	}).when('/python-jldlab', {
		templateUrl : 'python-jldlab.partial.html',
		controller: function($rootScope) { $rootScope.title = "python-jldlab"; }
	}).when('/about', {
		templateUrl : 'about.partial.html',
		controller: function($rootScope) { $rootScope.title = "About"; }
	}).when('/contact', {
		templateUrl : 'contact.partial.html',
		controller: function($rootScope) { $rootScope.title = "Contact"; }
	}).otherwise({
		redirectTo : '/home'
	});
} ]);
