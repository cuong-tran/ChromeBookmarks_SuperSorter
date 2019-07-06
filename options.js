function Options() {
}

Options.name = "Options";
Options.restore = function () {
    Util.debug("Options.restore()");
    try {
        PrefsHelper.restoreOptions()
    } catch (a) {
        throw "restoreOptions had a problem: " + a.message;
    }
};
Options.save = function () {
    try {
        Util.debug("Save function."), PrefsHelper.saveOptions(function (a) {
            Options.flashStatusMessage(Constants.MESSAGETYPE_OK, a)
        }), Util.debug("End of save() function.")
    } catch (a) {
        Util.error("Save problem: " + a.toString())
    }
};
Options.restoreDefaults = function () {
    try {
        PrefsHelper.restoreDefaults(), Options.flashStatusMessage(Constants.MESSAGETYPE_OK, "Restored and saved defaults.")
    } catch (a) {
        Util.error("restoreDefaults error: " + a.toString())
    }
};
Options.flashStatusMessage = function (a, b) {
    b = a == Constants.MESSAGETYPE_OK ? "<span class='messageOk'>" + b + "</span>" : "<span class='messageError'>" + b + "</span>";
    var c = document.getElementById(BookmarkSortPrefs.STATUS_DIV_ID),
        d = document.getElementById(BookmarkSortPrefs.SAVE_BUTTON_ID);
    c.innerHTML = b;
    d.enabled = !1;
    setTimeout(function () {
        c.innerHTML = "";
        d.enabled = !0
    }, BookmarkSortPrefs.STATUS_CLEAR_MS)
};