var utils = angular.module('utils', []);

utils.directive('bsHolder', function() {
	return {
		link: function (scope, element, attrs) {
			Holder.run({images:element[0], nocss:true});
		}
	};
});

MathJax.Hub.Config({
    skipStartupTypeset: true,
    messageStyle: "none",
    "HTML-CSS": {
        showMathMenu: false
    }
});
MathJax.Hub.Configured();

utils.directive("mathjaxBind", function() {
	return {
		restrict: "A",
		controller: ["$scope", "$element", "$attrs",
			function($scope, $element, $attrs) {
				$scope.$watch($attrs.mathjaxBind, function(value) {
					var $script = angular.element("<script type='math/tex'>")
					.html(value == undefined ? "" : value);
					$element.html("");
					$element.append($script);
					MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
				});
			}]
	};
});

//utils.directive('scrollTo', function ($location, $anchorScroll) {
	//return function(scope, element, attrs) {
		//element.bind('click', function(event) {
			//event.preventDefault();
			//event.stopPropagation();
			//var location = attrs.scrollTo;
			//$location.hash(location);
			//$anchorScroll();
		//});
	//}
//});

utils.directive("scrollTo", ["$window", function($window){
	return {
		restrict : "AC",
		compile : function(){

			function scrollInto(elementId) {
				if(!elementId) $window.scrollTo(0, 0);
				var el = document.getElementById(elementId);
				if(el) el.scrollIntoView();
			}

			return function(scope, element, attr) {
				element.bind("click", function(event){
					event.preventDefault();
					event.stopPropagation();
					scrollInto(attr.scrollTo);
				});
			};
		}
	};
}]);

utils.directive('scrollSpy', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, elem, attr) {
			var offset = parseInt(attr.scrollOffset, 10)
			if(!offset) offset = 10;
			elem.scrollspy({ "offset" : offset });
			scope.$watch(attr.scrollSpy, function(value) {
				$timeout(function() { 
					elem.scrollspy('refresh', { "offset" : offset });
				}, 1);
			}, true);
		}
	}
});
