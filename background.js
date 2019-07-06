function Background() {
}

Background.name = "Background";
Background.initializeExtension = function () {
    Util.debug("Initializing SS.");
    try {
        Util.debug("Here goes..."), Background.attemptedInitialize = !0, Util.debug("Initializing."), chrome.browserAction.setTitle({
            title: "Sort bookmarks"
        }), Util.debug("Restoring options."), PrefsHelper.restoreOptions(), chrome.browserAction.onClicked.addListener(Background.buttonHandler)
    } catch (a) {
        Util.reportError("Background.initializeExtension", a)
    }
};
Background.buttonHandler = function (a) {
    try {
        Util.debug("Button clicked. Autosort enabled? " + Sorter2.isAutoSortEnabled()), Sorter2.go()
    } catch (b) {
        throw Error(Util.reportError("Background.buttonHandler", b));
    }
};
$(function () {
    Background.initializeExtension()
});