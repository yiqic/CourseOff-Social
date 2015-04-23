function checkForValidUrl(tabId, changeInfo, tab) {
if (tab.url.indexOf('courseoff.com/workspace') >= 0) {
	// ... show the page action.
	chrome.pageAction.show(tabId);
}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

//Listen for event to track from content script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.purpose == "trackEvent"){
        console.log(['_trackEvent', request.action, request.opt_label, request.opt_value,""]);
        _gaq.push(['_trackEvent', request.action, request.opt_label, request.opt_value]);
        sendResponse({result: "good"});
    } else {
        sendResponse({result: "bad"});
    }
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-62008251-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
