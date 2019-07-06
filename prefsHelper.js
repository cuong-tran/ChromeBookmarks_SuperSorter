function PrefsHelper() {
}

PrefsHelper.name = "PrefsHelper";
PrefsHelper.checkAutoSort = function (a) {
    try {
        if (!a) throw Error("prefs argument was empty");
        var b = a.autoSort;
        Util.debug("checkAutoSort: " + b);
        b ? Sorter2.enableAutoSort() : Sorter2.disableAutoSort()
    } catch (d) {
        Util.reportError("PrefsHelper.checkAutoSort", d)
    }
};
PrefsHelper.getNewPrefs = function () {
    try {
        var a = new BookmarkSortPrefs;
        PrefsHelper.savePreferences(a);
        return a
    } catch (b) {
        throw Error(Util.reportError("PrefsHelper.getNewPrefs", b));
    }
};
PrefsHelper.saveOptions = function (a) {
    try {
        var b = document.getElementById(BookmarkSortPrefs.AUTOSORT_ID).checked,
            d = document.getElementById(BookmarkSortPrefs.SELECTOR_ID),
            e = d.children[d.selectedIndex].value,
            g = document.getElementById(BookmarkSortPrefs.FOLDERS_FIRST_ID).checked,
            h = document.getElementById(BookmarkSortPrefs.DELETE_EMPTY_FOLDERS_ID).checked,
            f = document.getElementById(BookmarkSortPrefs.MERGE_NEIGHBOURS_ID).checked,
            k = document.getElementById(BookmarkSortPrefs.DEDUPE_LOCAL_ID).checked,
            l = document.getElementById(BookmarkSortPrefs.CASE_SENSITIVE_ID).checked,
            m = document.getElementById(BookmarkSortPrefs.IGNORE_BOOKMARKS_BAR_ID).checked;
        Util.debug("Got options from form.");
        Util.debug("Creating BookmarkSortPrefs object.");
        var c = new BookmarkSortPrefs;
        Util.debug("Created; setting values.");
        c.autoSort = b;
        c.setSortOrder(e);
        c.foldersFirst = g;
        c.deleteEmptyFolders = h;
        c.mergeNeighbouringFolders = f;
        c.deDupeLocal = k;
        c.caseSensitive = l;
        c.ignoreBookmarksBar = m;
        Util.debug("Prefs: " + JSON.stringify(c));
        PrefsHelper.savePreferences(c);
        PrefsHelper.checkAutoSort(c);
        var n = !0 === c.autoSort ?
            "on" : "off";
        Util.debug("Saved.");
        "function" == typeof a && a("Saved. Autosort is " + n + ".")
    } catch (p) {
        Util.reportError("PrefsHelper.saveOptions", p)
    }
};
PrefsHelper.savePreferences = function (a) {
    try {
        if (!a) throw Error("bookmarkSortPrefs argument was empty");
        Util.debug("Saving preferences.");
        Util.debug("Auto sort enabled? " + Sorter2.isAutoSortEnabled());
        Util.saveObject(BookmarkSortPrefs.OBJECT_NAME, a);
        PrefsHelper.checkAutoSort(a);
        Util.debug("Saved preferences.")
    } catch (b) {
        Util.reportError("PrefsHelper.savePreferences", b)
    }
};
PrefsHelper.restoreOptions = function () {
    try {
        Util.debug("Restoring options");
        var a = PrefsHelper.loadOptions();
        if (!a) throw Error("PrefsHelper.loadOptions returned nothing.");
        PrefsHelper.restoreOptionsForm(a);
        Util.debug("Restored options.");
        PrefsHelper.checkAutoSort(a)
    } catch (b) {
        Util.reportError("PrefsHelper.restoreOptions", b)
    }
};
PrefsHelper.loadOptions = function () {
    try {
        var a = Util.loadObject(BookmarkSortPrefs.OBJECT_NAME);
        a ? Util.debug("Loaded prefs: " + JSON.stringify(a)) : (Util.debug("Could not load prefs. Creating new prefs."), a = PrefsHelper.getNewPrefs());
        return a
    } catch (b) {
        Util.reportError("PrefsHelper.loadOptions", b)
    }
};
PrefsHelper.restoreOptionsForm = function (a) {
    try {
        if (!a) throw Error("prefs argument was empty.");
        if (document.getElementById("thisIsTheOptionsPage")) {
            try {
                for (var b = a.sortOrder, d = document.getElementById(BookmarkSortPrefs.SELECTOR_ID), e = 0; e < d.children.length; e++) {
                    var g = d.children[e];
                    if (g.value == b) {
                        g.selected = "true";
                        break
                    }
                }
            } catch (h) {
                var f = "Problem restoring sort order: " + h.toString();
                Util.error(f)
            }
            try {
                Util.debug("Restoring checkboxes and radio buttons..."), document.getElementById(BookmarkSortPrefs.AUTOSORT_ID).checked =
                    a.autoSort, document.getElementById(BookmarkSortPrefs.FOLDERS_FIRST_ID).checked = a.foldersFirst, document.getElementById(BookmarkSortPrefs.DELETE_EMPTY_FOLDERS_ID).checked = a.deleteEmptyFolders, document.getElementById(BookmarkSortPrefs.MERGE_NEIGHBOURS_ID).checked = a.mergeNeighbouringFolders, document.getElementById(BookmarkSortPrefs.DEDUPE_LOCAL_ID).checked = a.deDupeLocal, document.getElementById(BookmarkSortPrefs.CASE_SENSITIVE_ID).checked = a.caseSensitive, document.getElementById(BookmarkSortPrefs.IGNORE_BOOKMARKS_BAR_ID).checked =
                    a.ignoreBookmarksBar
            } catch (k) {
                f = "Problem restoring checkboxes: " + k.toString(), Util.error(f)
            }
        } else Util.debug("Skipped restoring form fields since not on options page.")
    } catch (l) {
        Util.reportError("PrefsHelper.restoreOptionsForm", l)
    }
};
PrefsHelper.restoreDefaults = function () {
    try {
        Util.debug("restoreDefaults");
        var a = new BookmarkSortPrefs;
        Util.debug("Saving preferences " + a);
        PrefsHelper.savePreferences(a);
        PrefsHelper.restoreOptions()
    } catch (b) {
        Util.reportError("PrefsHelper.restoreDefaults", b)
    }
};