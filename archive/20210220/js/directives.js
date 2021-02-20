var utils = angular.module('utils', []);

utils.directive('bsHolder', function() {
	return {
		link: function (scope, element, attrs) {
			Holder.run({images:element[0], nocss:true});
		}
	};
});

utils.directive("mathjaxBind", function() {
  MathJax.Hub.Config({
    skipStartupTypeset: true,
    messageStyle: "none",
    "HTML-CSS": {
      showMathMenu: false
    }
  });
  MathJax.Hub.Configured();

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
