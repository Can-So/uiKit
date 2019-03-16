var result = {
    mac: false,
    ie: false,
    ie_version: 0,
    gecko: false,
    chrome: false,
    ios: false,
    webkit: false,
};
if (typeof navigator !== 'undefined') {
    var ieEdge = /Edge\/(\d+)/.exec(navigator.userAgent);
    var ieUpTo10 = /MSIE \d/.test(navigator.userAgent);
    var ie11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
    result.mac = /Mac/.test(navigator.platform);
    var ie = (result.ie = !!(ieUpTo10 || ie11up || ieEdge));
    result.ie_version = ieUpTo10
        ? document.documentMode || 6
        : ie11up
            ? +ie11up[1]
            : ieEdge
                ? +ieEdge[1]
                : null;
    result.gecko = !ie && /gecko\/\d/i.test(navigator.userAgent);
    result.chrome = !ie && /Chrome\//.test(navigator.userAgent);
    result.ios =
        !ie &&
            /AppleWebKit/.test(navigator.userAgent) &&
            /Mobile\/\w+/.test(navigator.userAgent);
    result.webkit =
        !ie &&
            !!document.documentElement &&
            'WebkitAppearance' in document.documentElement.style;
}
export default result;
//# sourceMappingURL=browser.js.map