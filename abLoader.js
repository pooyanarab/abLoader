/*
    abLoader - jQuery plugin
    version 0.1.0
    by Pooyan Arab (http://www.pooyanarab.com)
    2014-05-04
    http://github.com/pooyanarab/abLoader

	Simple Usage
	------------
	// Load one of three urls, with equal weight
	abLoader.add('urlA.html');
	abLoader.add('urlB.html');
	abLoader.add('urlC.html');
	abLoader.run();


	Weighted Usage
	--------------
	// Load one of three urls, with different weights (20%, 30% and 50% chance)
	abLoader.add('urlA.html', 2);
	abLoader.add('urlB.html', 3);
	abLoader.add('urlC.html', 5);
	abLoader.run();
*/
var abLoader = (function () {

	function abLoader() {
		abLoader.urls = [];
		abLoader.total = 0;
		abLoader.select = -1;
		abLoader.jQueryInitialized = false;
		abLoader.jQueryLoaded = false;
		abLoader.runPending = false;

		abLoader.jQueryLoader();
	}

	abLoader.jQueryLoader = function () {
		if (typeof(jQuery) == 'undefined') {
			if (!abLoader.jQueryInitialized) {
				abLoader.jQueryInitialized = true;
				document.write('<scr' + 'ipt type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></scr' + 'ipt>');
			}
			setTimeout(abLoader.jQueryLoader, 50);
		} else {
			abLoader.jQueryLoaded = true;
			if (abLoader.runPending) {
				abLoader.load();
			}
		}
	};

	abLoader.add = function (url, weight) {
		weight = weight || 1;
		if (weight < 0) {
			return;
		}
		abLoader.total += weight;
		abLoader.urls.push({'url': url, 'weight': weight});
	};

	abLoader.run = function () {
		if (abLoader.urls.length == 0 || abLoader.total == 0) {
			return;
		}
		var weighted = [], sum = 0, i;
		for (i = 0; i < abLoader.urls.length; i++) {
			sum += abLoader.urls[i].weight;
			weighted.push(sum / abLoader.total);
		}
		var rnd = Math.random();
		for (i = 0; i < weighted.length; i++) {
			if (rnd <= weighted[i]) {
				abLoader.select = i;
				break;
			}
		}
		if (abLoader.select == -1) {
			abLoader.select = 0;
		}
		if (abLoader.jQueryLoaded) {
			abLoader.load();
		} else {
			abLoader.runPending = true;
		}
	};

	abLoader.load = function () {
		var url = abLoader.urls[abLoader.select].url;
		jQuery.ajax({
			url: url
		}).done(function (response) {
			document.open();
			document.write(response);
			document.close();
		}).fail(function () {
			window.location.assign(url);
		});
	};

	abLoader();
	return abLoader;
})();
