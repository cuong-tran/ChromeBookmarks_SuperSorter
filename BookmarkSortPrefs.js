function BookmarkSortPrefs() {
    try {
        this.autoSort = BookmarkSortPrefs.AUTOSORT_DEFAULT, this.sortOrder = BookmarkSortPrefs.SORT_DEFAULT, this.foldersFirst = BookmarkSortPrefs.FOLDERS_FIRST_DEFAULT, this.deleteEmptyFolders = BookmarkSortPrefs.DELETE_EMPTY_FOLDERS_DEFAULT, this.mergeNeighbouringFolders = BookmarkSortPrefs.MERGE_NEIGHBOURS_DEFAULT, this.deDupeLocal = BookmarkSortPrefs.DEDUPE_LOCAL_DEFAULT, this.caseSensitive = BookmarkSortPrefs.CASE_SENSITIVE_DEFAULT, this.ignoreBookmarksBar = BookmarkSortPrefs.IGNORE_BOOKMARKS_BAR_DEFAULT,
            this.showDebugMessages = !1
    } catch (a) {
        Util.error("in BookmarkSortPrefs constructor: " + a.toString())
    }
}

BookmarkSortPrefs.OBJECT_NAME = "BookmarkSortPrefs";
BookmarkSortPrefs.SORT_ASCENDING = "ascending";
BookmarkSortPrefs.SORT_DESCENDING = "descending";
BookmarkSortPrefs.STATUS_CLEAR_MS = 1E3;
BookmarkSortPrefs.BOOKMARKS_BAR_ID = 1;
BookmarkSortPrefs.AUTOSORT_ID = "autoSort";
BookmarkSortPrefs.FOLDERS_FIRST_ID = "foldersFirst";
BookmarkSortPrefs.DELETE_EMPTY_FOLDERS_ID = "deleteEmptyFolders";
BookmarkSortPrefs.MERGE_NEIGHBOURS_ID = "mergeNeighbours";
BookmarkSortPrefs.DEDUPE_LOCAL_ID = "deDupeLocal";
BookmarkSortPrefs.SELECTOR_ID = "sortorder";
BookmarkSortPrefs.STATUS_DIV_ID = "status";
BookmarkSortPrefs.SAVE_BUTTON_ID = "savebutton";
BookmarkSortPrefs.CASE_SENSITIVE_ID = "caseSensitive";
BookmarkSortPrefs.IGNORE_BOOKMARKS_BAR_ID = "ignoreBookmarksBar";
BookmarkSortPrefs.AUTOSORT_DEFAULT = !1;
BookmarkSortPrefs.SORT_DEFAULT = "ascending";
BookmarkSortPrefs.FOLDERS_FIRST_DEFAULT = !0;
BookmarkSortPrefs.DELETE_EMPTY_FOLDERS_DEFAULT = !0;
BookmarkSortPrefs.MERGE_NEIGHBOURS_DEFAULT = !0;
BookmarkSortPrefs.DEDUPE_LOCAL_DEFAULT = !0;
BookmarkSortPrefs.CASE_SENSITIVE_DEFAULT = !1;
BookmarkSortPrefs.IGNORE_BOOKMARKS_BAR_DEFAULT = !0;
BookmarkSortPrefs.prototype.getSortOrder = function () {
    return this.sortOrder
};
BookmarkSortPrefs.prototype.setSortOrder = function (a) {
    this.sortOrder = a == BookmarkSortPrefs.SORT_DESCENDING ? a : BookmarkSortPrefs.SORT_ASCENDING
};