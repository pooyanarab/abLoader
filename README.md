abLoader
========

jQuery plugin - A/B Loader

Usage
---------
abLoader.add(url1, weight); <br />
abLoader.add(url2, weight); <br />
. <br />
. <br />
abLoader.run(); <br />

If weight is not mentioned, 1 is assumed. <br />


Simple Usage
-------------------
// Load one of three urls, with equal weight <br />
abLoader.add('urlA.html'); <br />
abLoader.add('urlB.html'); <br />
abLoader.add('urlC.html'); <br />
abLoader.run();


Weighted Usage
----------------------
// Load one of three urls, with different weights (20%, 30% and 50% chance) <br />
abLoader.add('urlA.html', 2); <br />
abLoader.add('urlB.html', 3); <br />
abLoader.add('urlC.html', 5); <br />
abLoader.run(); <br />
