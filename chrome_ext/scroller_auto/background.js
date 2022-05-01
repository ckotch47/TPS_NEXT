
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        let my_url = details.url;        
        if(my_url.indexOf('.mp4') !== -1){
            $.post('http://192.168.31.14:9558/addlink',{links:details.url})
        }

        return {requestHeaders: details.requestHeaders};
    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
);