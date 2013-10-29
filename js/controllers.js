app.controller('MainNavCtrl', function($scope, $location) {
	var multiLocations = {
		'contributions': [
			'/individual-listening-behavior',
			'/global-listening-behavior',
			'/latent-factor-models',
			'/k-fold-cross-validation',
			'/python-jldlab'
		]
	};

	$scope.isActive = function(route) {
		if (route === $location.path()) {
			return true;
		}

		var multi = multiLocations[route];
		if (multi === undefined) {
			return false;
		}

		return multi.indexOf($location.path()) != -1;		
	}

	$scope.navCollapsed = true;

	$scope.navCollapsedToggle = function() {
		$scope.navCollapsed = !$scope.navCollapsed;
	}
	
	$scope.navClose = function() {
		$scope.navCollapsed = true;
	}
});

app.controller('OffcanvasCtrl', function($scope) {
	$scope.offcanvasToggled = false;

	$scope.toggleOffcanvas = function() {
		$scope.offcanvasToggled = !$scope.offcanvasToggled;
	}
});

app.controller('MainCarouselCtrl', function($scope, $location) {
	$('.carousel').carousel('pause');
});

app.controller('CarouselCtrl', function($scope, $location) {
	$scope.carousel = function() {
		if ($location.path() === '/home') {
			return 'carousel.partial.html';
		}
		return null;
	}
});

app.controller('BreadcrumbsCtrl', function($scope) {
	$('#breadcrumbs-carousel').carousel('pause');

	$scope.screenshots = [
		"breadcrumbs-2012-09-21-102414_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102437_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102453_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102512_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102519_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102547_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102607_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102637_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102714_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102743_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102801_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102809_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102825_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102832_1920x1080_scrot",
		"breadcrumbs-2012-09-21-102902_1920x1080_scrot",
		"breadcrumbs-2012-10-26-150238_1920x1080_scrot",
		"breadcrumbs-2012-10-26-150332_1920x1080_scrot",
		"breadcrumbs-2012-10-26-150415_1920x1080_scrot",
		"breadcrumbs-2012-10-26-150500_1920x1080_scrot",
		"breadcrumbs-2012-10-26-150536_1920x1080_scrot",
		"breadcrumbs-2012-10-26-150604_1920x1080_scrot",
		"breadcrumbs-2012-10-26-150632_1920x1080_scrot",
		"breadcrumbs-2012-11-02-144914_1920x1080_scrot"
	];
});

app.controller('JuggleCtrl', function($scope) {
	$('#juggle-carousel').carousel('pause');

	$scope.screenshots = [
		"juggle-20130517T155220",
		"juggle-20130517T155244",
		"juggle-20130517T165436",
		"juggle-20130517T165446",
		"juggle-20130517T165459",
		"juggle-20130517T165547",
		
		"juggle-20130517T155425",
	];
});

app.controller('JuggleMobileCtrl', function($scope) {
	$('#jugglemobile-carousel').carousel('pause');

	$scope.screenshots = [
		// Desktop
		"juggle_mobile-20131018T084844",
		"juggle_mobile-20130926T150023",
		"juggle_mobile-20130926T145948",
		"juggle_mobile-20130808T173209",
		"juggle_mobile-20130926T150206",
		"juggle_mobile-20131018T084741",
		"juggle_mobile-20130926T145918",
		"juggle_mobile-20130926T150040",
		"juggle_mobile-20130926T150142",

		// Mobile
		"juggle_mobile-20130926T155544",
		"juggle_mobile-20130926T145735",
		"juggle_mobile-20130926T141152",
		"juggle_mobile-20130926T141254",
		"juggle_mobile-20130926T145855",
	];
});

app.controller('CiclopeCtrl', function($scope) {
	$('#ciclope-carousel').carousel('pause');

	$scope.screenshots = [
		"ciclope-realtime",
		"ciclope-history",
		"ciclope-flowtree",
		"ciclope-blognetwork",
		"ciclope-bloginfo"
	];
});

app.controller('IndividualListeningBehaviorCtrl', function($scope) {
	var vis = null;
	var opt = {
		streamgraph: "#stream-graph",
		streamtooltip: "#stream-tooltip",
		artistmonthlychart: "#artist-monthly-chart",
		artistmonthlytooltip: "#artist-monthly-tooltip",
		artistmonthlyname: "#artist-monthly-name",
		artistweeklychart: "#artist-weekly-chart",
		artistweeklytooltip: "#artist-weekly-tooltip",
		artistweeklyname: "#artist-weekly-name",
		topartistweeklychart: "#top-artist-weekly-chart",
		topartistweeklytooltip: "#top-artist-weekly-tooltip",
		preferredweekdays: "#preferred-weekdays",
		avoidedweekdays: "#avoided-weekdays"
	};

	d3.tsv("data/userid-profile.tsv", function(data) {
		var $drop = $("#user-select");

		data.forEach(function(row) {
			var $optGroup = $drop.find("optgroup[label='" + row.country + "']");

			if ($optGroup.length == 0) {
				$optGroup = $("<optgroup>").attr("label", row.country);
				$drop.append($optGroup);
			}
			
			$optGroup.append($("<option>")
				.val(row.id)
				.attr("data-country", row.country)
				.attr("data-age", row.age)
				.attr("data-gender", row.gender)
				.text(row.id));
		});

		$drop.select2({
			width: 300,
			matcher: function(term, text, opt) {
				if (!isNaN(parseFloat(term)) && isFinite(term))
					return opt.attr("data-age") == term;

				var termUpper = term.toUpperCase();
				return text.toUpperCase().indexOf(termUpper)>=0
					|| opt.attr("data-country").toUpperCase().indexOf(termUpper) >= 0;
			}
		}).on("change", function(e) {
			var $selected = $("#user-select").find("option[value='" + $(this).val() + "']");
			var country = $selected.attr("data-country");
			var age = $selected.attr("data-age");
			var gender = $selected.attr("data-gender");

			if (country != "")
				$("#user-country").html("&nbsp;<strong>from:</strong> " + country);
			else
				$("#user-country").html("");
				
			if (age != "")
				$("#user-age").html("&nbsp;<strong>age:</strong> " + age);
			else
				$("#user-age").html("");
			
			if (gender != "")
				$("#user-gender").html("&nbsp;<strong>gender:</strong> "
					+ (gender == "m" ? "male" : (gender == "f" ? "female" : gender)));
			else
				$("#user-gender").html("");

			if (vis != null) vis.clear();
			vis = new JldVisualization(null, null, null, opt);

			var userId = $(this).val();
			d3.csv("data/" + userId + "_monthly_activity.csv", function(monthlyData) {
				vis.setMonthlyData(monthlyData);
				vis.makeMonthlyArtistSelector();
				vis.listeningBehaviorStreamGraph();
				vis.listeningBehaviorMonthlyArtistChart(vis.mostFrequentArtist(monthlyData));
			});
			
			d3.csv("data/" + userId + "_weekly_activity.csv", function(weeklyData) {
				vis.setWeeklyData(weeklyData);
				vis.makeWeeklyArtistSelector();
				vis.listeningBehaviorWeeklyArtistChart(vis.mostFrequentArtist(weeklyData));
				vis.listeningBehaviorWeeklyTopArtistChart();
			});
			
			d3.csv("data/" + userId + "_weekly_analysis.csv", function(weeklyAnalysisData) {
				vis.setWeeklyAnalysisData(weeklyAnalysisData);
				vis.makeWeeklyAnalysisTable(10);
			});


			var selectedIndex = $("#user-select").prop("selectedIndex");
			
			if ((selectedIndex+1) >= $("#user-select").find("option").length)
				$("#button-next").prop("disabled", true);
			else
				$("#button-next").prop("disabled", false);

			if (selectedIndex <= 0)
				$("#button-previous").prop("disabled", true);
			else
				$("#button-previous").prop("disabled", false);
		});

		$("#user-select").val("user_000001").change();

		function nextUser() {
			var selectedIndex = $("#user-select").prop("selectedIndex");
			$("#user-select").prop("selectedIndex", selectedIndex+1).change();
		}

		function previousUser() {
			var selectedIndex = $("#user-select").prop("selectedIndex");
			$("#user-select").prop("selectedIndex", selectedIndex-1).change();
		}

		$("#button-previous").on("click", previousUser);
		$("#button-next").on("click", nextUser);
		$("#visualizing-listening-behavior").on("keydown", function(e) {
			if (e.keyCode == 78) {
				nextUser();
			} else if (e.keyCode == 80) {
				previousUser();
			}
		});
	});
});
