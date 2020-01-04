chrome.storage.sync.get(['show_piano'], function(result) {
    var next_value;
    if (result.show_piano !== true) {
        next_value = true;
    }
    else {
        next_value = false;
    }
    chrome.storage.sync.set({'show_piano': next_value});
});