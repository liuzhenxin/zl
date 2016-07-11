@first
var ajax = (function () {
    var map = {}, c = 0;
    var getCallback = function (u, p) {
        u += p ? (u.indexOf("?") != -1 ? "&" : "?") + p : "";
        var callback = "";
        var key = map[u];
        if (key) {
            callback = key;
        } else {
            callback = "callback" + c;
            map[u] = callback;
            c++;
        }
        return callback;
    };
    var parser = (function () {
        return{
            parseConfig: function (config) {
                config = config || {};
                config.url = config.url || '';
                config.type = config.type || 'get';
                config.async = config.async == false ? false : config.async || true;
                config.data = config.data || {};
                config.formdata = config.formdata || null;
                config.dataType = config.dataType || 'json';
                config.cache = config.cache || false;
                config.jsonp = config.jsonp || 'callback';
                config.callback = config.callback || null;
                config.timeout = config.timeout || 30000;
                config.ontimeout = config.ontimeout || function (e) {};
                config.beforeSend = config.beforeSend || function (xhr) {};
                config.success = config.success || function (data, xhr) {};
                config.error = config.error || function (xhr, e) {};
                config.complete = config.complete || function (xhr) {};
                return config;
            },
            parseData: function (data, encode) {
                encode = encode || false;
                var kvp = [];
                var value = "";
                for (var d in data) {
                    value = encode ? encodeURIComponent(data[d]) : data[d];
                    kvp.push(d + "=" + value);
                }
                return kvp.join("&");
            }
        }
    })();
    var jsonp = function (cfg,scope) {
        var params = parser.parseData(cfg.data);
        var callback = cfg.callback ?
            cfg.callback : getCallback(cfg.url, params);
        params += (params ? "&" : "") + cfg.jsonp + "=" + callback;
        cfg.url += (cfg.url.indexOf("?") != -1 ? "&" : "?") + params;
        var head = document.querySelector('head');
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = cfg.url + (!cfg.cache ? "&r=" + Math.random() : "");
        script.onerror = function (e) {
            cfg.complete.call(scope,{});
            cfg.error.call(scope,{}, e);
        };
        head.appendChild(script);
        cfg.beforeSend.call(scope,{});
        window[callback] = function (data) {
            cfg.complete.call(scope,{});
            head.removeChild(script);
            delete window[callback];
            cfg.success.call(scope,data,{});
        }
    };
    var ajax = function (cfg,scope) {
        var contentType, data = null;
        var xhr = new XMLHttpRequest();
        xhr.timeout = cfg.timeout;
        xhr.ontimeout = cfg.ontimeout;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 1) {
                cfg.beforeSend.call(scope,xhr);
            } else if (xhr.readyState == 4) {
                cfg.complete.call(scope,xhr);
                if (xhr.status == 200) {
                    var data = {};
                    try {
                        switch (cfg.dataType.toLowerCase()) {
                            case"json":
                                data = eval("(" + xhr.responseText + ")");
                                break;
                            case"xml":
                                data = xhr.responseXML;
                                break;
                            default:
                                data = xhr.responseText;
                                break
                        }
                    } catch (e) {
                        cfg.error.call(scope,xhr,e);
                    }
                    cfg.success.call(scope,data,xhr);
                } else {
                    cfg.error.call(scope,xhr,{});
                }
            }
        };
        if (cfg.type.toLowerCase() == "get") {
            var params = parser.parseData(cfg.data);
            if (!cfg.cache) {
                params += (params ? "&r=" : "r=") + Math.random();
            }
            if (cfg.url.indexOf('?') != -1) {
                cfg.url += params ? ("&" + params) : "";
            } else {
                cfg.url += params ? ("?" + params) : "";
            }
        } else {
            if (cfg.formdata) {
                data = cfg.formdata;
            } else {
                data = parser.parseData(cfg.data, true);
                contentType = "application/x-www-form-urlencoded;charset=utf-8";
            }
        }
        xhr.open(cfg.type, cfg.url, cfg.async);
        contentType ? xhr.setRequestHeader("Content-Type", contentType) : false;
        xhr.send(data);
    };
    return{
        /**
         * @param {Object} config
         * @param {Object} [scope]
         */
        request: function (config,scope) {
            config = parser.parseConfig(config);
            scope = typeof scope === 'object'?scope:config;
            if (config.dataType.toLowerCase() == 'jsonp') {
                jsonp(config,scope);
            } else {
                ajax(config,scope);
            }
        }
    }
})();

if (typeof define === "function" && define.amd) {
    define( "ajax", [], function() {
        return ajax;
    });
}else {
    window.Ajax = ajax;
}
