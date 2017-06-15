/**
 * Created by tjwms on 2017/6/13.
 */
function myFunction() {
    document.getElementById("demo-out-js").innerHTML = "My First JavaScript Function";
}

function getPage() {
    var e = window.navigator.userAgent, r = e.match(/(UCBrowser)/g) || e.match(/(UCNewsApp)/g), o = location.href,
        n = location.host, a = o.match(/\/?([^/]*)(\?)/gi), a = (a = RegExp.$1).replace(".html", "");
    if (!(n.indexOf("uczzd.cn") > -1 || n.indexOf("sm.cn") > -1 || n.indexOf("uc.cn") > -1 || n.indexOf(":") > -1))return a = "third_party";
    switch (a) {
        case"news":
            a = r || "share" !== getQueryString("pagetype") ? "index" : "share";
            break;
        case"xissAllComments":
            a = "comments";
            break;
        case"comment-detail":
            a = "detail";
            break;
        case"my-comments":
            a = "my_comments"
    }
    return a
}
function getQueryString(e) {
    var r = new RegExp("(\\?|^|&|#)" + e + "=([^&|^#]*)(&|$|#)", "i"), o = window.location.href.match(r), n = "";
    return null != o && (n = decodeURIComponent(o[2])), n
}
function addError(e) {
    window.$$ucLog && window.$$ucLog.errs && window.$$ucLog.errs.push({
        ev: "js_error",
        from_app: window.$$ucLog.from_app,
        aid: window.$$ucLog.aid,
        uc_param_str: window.$$ucLog.uc_param_str,
        host: location.origin,
        pathname: location.pathname,
        msg: e.message,
        file: e.filename,
        line: e.lineno,
        col: e.colno,
        stack: e.error && e.error.stack,
        d_model: "xss_js_error_stat",
        ua: navigator.userAgent,
        url: location.href.slice(0, 500)
    })
}
window.UAT = {}, window.UAT.head_start = Date.now(), window.__UAE_ID__ = "2715", window.$$ucLog = window.$$ucLog || {
        app: window.__UAE_ID__,
        path: getPage() || "",
        from_app: getQueryString("app") || "",
        aid: getQueryString("aid") || "",
        uc_param_str: "ntnwcpfrvebi",
        chance: 50,
        errs: [],
        performs: {}
    }, function (e, r) {
    var o = r.createElement("script"), n = r.getElementsByTagName("script")[0];
    o.async = 1, e.performance && e.performance.timing ? o.src = "//image.uc.cn/s/uae/g/36/per/1.1/m/c/performance.min.js" : o.src = "//bench.uc.cn/per/1.1/m/c/performance.err.min.js", n.parentNode.insertBefore(o, n)
}(window, document), window.ucLogger = function (e, r) {
    if ((window.$$ucLog.chance ? 100 * Math.random() < window.$$ucLog.chance : 100 * Math.random() < 30) && (r = r || ("https:" === location.protocol ? "https" : "http") + "://bench.uc.cn/c?uc_param_str=" + window.$$ucLog.uc_param_str, e.app_id = window.$$ucLog.app, e.path = window.$$ucLog.path, e.from_app = window.$$ucLog.from_app, e.aid = window.$$ucLog.aid, e.d_model = function (e) {
            var r = "";
            return [{ev: "js_error", d_model: "xss_js_error_stat"}, {
                ev: "api_err",
                d_model: "xss_api_error_stat"
            }, {ev: "jssdk_err", d_model: "xss_jssdk_error_stat"}, {
                ev: "wechat_log",
                d_model: "xss_wechat_log_stat"
            }].forEach(function (o) {
                o.ev === e && (r = o.d_model)
            }), r
        }(e.ev), Object.keys(e).forEach(function (r) {
            e[r] || delete e[r]
        }), e = JSON.stringify(e), !navigator.sendBeacon || !navigator.sendBeacon(r, e))) {
        var o = new XMLHttpRequest;
        o.open("post", r, !0), o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send(e)
    }
}, window.addEventListener("error", addError, !1), window.addEventListener("unhandledrejection", function (e) {
    var r = e.reason;
    addError({message: r.message, error: {stack: r.stack}})
})
