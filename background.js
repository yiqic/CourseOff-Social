function checkForValidUrl(tabId, changeInfo, tab) {
// If the tabs url starts with "http://specificsite.com"...
if (tab.url.indexOf('courseoff') >= 0) {
	// ... show the page action.
	chrome.pageAction.show(tabId);
}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-62008251-1']);
_gaq.push(['_trackPageview']);

(function() {
    console.log("loaded");
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();



// //load Google Analytics API
// (function() {
//   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//   ga.src = 'https://ssl.google-analytics.com/ga.js';
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//     console.log("loaded")
// })();

// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'UA-62008251-1']);
// _gaq.push(['_trackPageview']);