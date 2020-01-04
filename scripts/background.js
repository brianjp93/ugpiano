// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
    // for the current tab, inject the "inject.js" file & execute it
    // console.log('Soundfilter running.');
    chrome.tabs.executeScript(tab.id, {
        file: 'scripts/toggle.js'
    });
});

function set_badge() {
    chrome.storage.sync.get(['show_piano'], function(result) {
        if (result.show_piano === true) {
            chrome.browserAction.setBadgeText({text: 'on'});
        }
        else {
            chrome.browserAction.setBadgeText({text: 'off'});
        }
    })
}

chrome.storage.onChanged.addListener(function() {
    set_badge()
})
