// This is an events page and not a background page. We listen to certain events

chrome.storage.onChanged.addListener(function(changes) {
	// changes has both the newValue and oldValue
	chrome.browserAction.setBadgeText({
		'text': changes.total.newValue.toString()
	})
})

var menuItem = {
	"id": "addProtein",
	"title": "Add Protein",
	"contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {

	console.log(clickData.menuItemId, clickData.selectionText);

	// chceck if it is our menu item using the id set above
	if (clickData.menuItemId == 'addProtein' && clickData.selectionText) {
		var intRegExp = new RegExp('\\d+$');
		if (intRegExp.test(clickData.selectionText)) {
			chrome.storage.sync.get('total', function(items) {
				var newTotal = parseInt(items.total) || 0;
				newTotal += parseInt(clickData.selectionText);

				chrome.storage.sync.set({'total': newTotal});
			})
		};
	};
})