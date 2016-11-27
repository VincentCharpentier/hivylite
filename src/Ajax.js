var Ajax = (function() {
    function send(method, url, data, success, error) {
        var method = method || "GET";
        var url = url || "";
        var data = data || {};
        var success = success || (() => {
            console.error("success handler undefined");
        });
        var error = error || (() => {
            console.error("Error handler undefined");
        });

        var dataString = JSON.stringify(data);

        var req = new XMLHttpRequest();
        req.open(method, url, true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200) {
                    let json;
                    try {
                        json = JSON.parse(req.responseText);
                    }
                    catch (e) {
                        console.error("Error while parsing server response");
                    }
                    success(json);
                }
                else {
                    error();
                }
            }
        };
        req.send(dataString);
    }
    return {
        get: function(url, data, success, error) {
            send("GET", url, data, success, error);
        },
        post: function(url, data, success, error) {
            send("POST", url, data, success, error);
        }
    }
})();

export default Ajax;
