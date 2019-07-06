function Util() {
}

// Util.ENABLE_DEBUG_MESSAGES = !1;
// Util.ENABLE_INFO_MESSAGES = !1;
Util.ENABLE_DEBUG_MESSAGES = !0;
Util.ENABLE_INFO_MESSAGES = !0;
Util.console = console;
Util.saveObject = function (a, b) {
    Util.debug("Saving:" + JSON.stringify(b));
    localStorage[a] = JSON.stringify(b)
};
Util.loadObject = function (a) {
    var b = localStorage[a],
        c;
    b ? c = JSON.parse(b) : Util.debug("Local storage contains no value for '" + a + "'.");
    c && Util.debug("Loaded: " + JSON.stringify(c));
    return c
};
Util.wait = function (a) {
    for (var b = (new Date).getTime(), c = b; c - b < a;) c = (new Date).getTime()
};
Util.debug = function (a) {
    !0 == Util.ENABLE_DEBUG_MESSAGES && Util.console.log(a)
};
Util.error = function (a) {
    Util.console.log("*** ERROR *** " + a)
};
Util.reportError = function (a, b) {
    var c = " in " + a + ": " + b.message;
    Util.error(c);
    return c
};
Util.info = function (a) {
    !0 == Util.ENABLE_INFO_MESSAGES && Util.console.log(a)
};
Util.randomInt = function (a) {
    return Math.floor(Math.random() * (a + 1))
};
Util.bookmarkToString = function (a) {
    return a ? a.id + ": " + (a.title ? a.title : "-") + " (" + (a.url ? a.url : "-") + ")" : "undefined bookmark"
};
Util.getFunctionName = function (a) {
    a = a.toString();
    Util.info(a);
    return (a = /\W*function\s+([\w\$]+)\(/.exec(a)) ? a[1] : "No name"
};