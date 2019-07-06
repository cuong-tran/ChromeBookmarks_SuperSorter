function DuplicateView(a) {
    Util.debug("DuplicateView constructor");
    try {
        this.containingElement = a
    } catch (err) {
        throw Error(Util.reportError("DuplicateView constructor", err));
    }
}

DuplicateView.checkboxChanged = function (a) {
    DuplicateView.updateDeleteButtonStatus(a)
};
DuplicateView.TIMEOUT_MILLISECONDS = 5;
DuplicateView.selectAllButFirstPerGroup = function (a) {
    Util.debug("DuplicateView.selectFirstInEachGroup");
    try {
        DuplicateView.setWorking(a, !0), setTimeout(function () {
            var b = a.getElementsByTagName("ul");
            Util.debug(b.length + " lists of duplicates found.");
            for (var c = 0; c < b.length; c++)
                for (var e = b[c].getElementsByTagName("li"), f = 0; f < e.length; f++) e[f].getElementsByTagName("input")[0].checked = 0 !== f;
            DuplicateView.setWorking(a, !1);
            DuplicateView.updateDeleteButtonStatus(a)
        }, DuplicateView.TIMEOUT_MILLISECONDS)
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.selectFirstInEachGroup",
            err));
    }
};
DuplicateView.selectAllButLastPerGroup = function (a) {
    Util.debug("DuplicateView.selectLastInEachGroup");
    try {
        DuplicateView.setWorking(a, !0), setTimeout(function () {
            var b = a.getElementsByTagName("ul");
            Util.debug(b.length + " lists of duplicates found.");
            for (var c = 0; c < b.length; c++)
                for (var e = b[c].getElementsByTagName("li"), f = 0; f < e.length; f++) e[f].getElementsByTagName("input")[0].checked = f !== e.length - 1;
            DuplicateView.setWorking(a, !1);
            DuplicateView.updateDeleteButtonStatus(a)
        }, DuplicateView.TIMEOUT_MILLISECONDS)
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.selectLastInEachGroup", err));
    }
};
DuplicateView.invertSelection = function (a) {
    Util.debug("DuplicateView.invertSelection");
    try {
        DuplicateView.setWorking(a, !0), setTimeout(function () {
            for (var b = a.ownerDocument.getElementById(DuplicateView.DUPLICATE_LIST_DIV_ID).getElementsByTagName("input"), c = 0; c < b.length; c++) b[c].checked = !b[c].checked;
            DuplicateView.setWorking(a, !1);
            DuplicateView.updateDeleteButtonStatus(a)
        }, DuplicateView.TIMEOUT_MILLISECONDS)
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.invertSelection", err));
    }
};
DuplicateView.deleteDuplicates = function (a) {
    Util.debug("DuplicateView.deleteDuplicates");
    try {
        DuplicateView.setWorking(a, !0), setTimeout(function () {
            var b = [],
                c = a.getElementsByTagName("input");
            Util.debug(c.length);
            for (var e = 0; e < c.length; e++)
                if (c[e].checked) {
                    var f = c[e].id.split("_");
                    2 === f.length && b.push(f[1])
                } else Util.debug("Unchecked :" + c[e].id);
            DeDuper2.deleteBookmarks(b, function () {
                DuplicateView.setWorking(a, !1);
                DuplicateView.refreshList(a)
            })
        }, DuplicateView.TIMEOUT_MILLISECONDS)
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.deleteDuplicates",
            err));
    }
};
DuplicateView.updateDeleteButtonStatus = function (a) {
    var b = $("#" + DuplicateView.DUPLICATE_LIST_DIV_ID, a)[0];
    if (b) {
        for (var b = b.getElementsByTagName("input"), d = !1, c = 0; c < b.length; c++)
            if (b[c].checked && !0 === b[c].checked) {
                d = !0;
                break
            }
        DuplicateView.toggleDeleteButton(a, d)
    } else Util.info("Erk - List element not found!")
};
DuplicateView.toggleDeleteButton = function (a, b) {
    try {
        var d = a.ownerDocument.getElementById("globalDeDupeButton");
        b ? d.disabled = !1 : (DuplicateView.hideConfirmCancelButtons(a), d.disabled = !0)
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.toggleDeleteButton", err));
    }
};
DuplicateView.confirmDeletion = function (a) {
    try {
        if (!a) throw Error("containingHtmlElement was undefined.");
        a.ownerDocument.getElementById("confirmCancelButtons").style.visibility = "visible"
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.confirmDeletion", err));
    }
};
DuplicateView.hideConfirmCancelButtons = function (a) {
    try {
        if (!a) throw Error("containingHtmlElement was undefined.");
        a.ownerDocument.getElementById("confirmCancelButtons").style.visibility = "hidden"
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.hideConfirmCancelButtons", err));
    }
};
/***
 * Call to refresh duplicate lists
 * @param a element to hold duplicate results
 */
DuplicateView.refreshList = function (a) {
    Util.debug("DuplicateView.refreshList");
    a.ownerDocument.getElementById("deDupeGlobalButton").disabled = !0;
    DuplicateView.showAnimation(a);
    DuplicateView.clearList(a);
    DeDuper2.go(new DuplicateView(a))
};
DuplicateView.clearList = function (a) {
    Util.debug("DuplicateView.clearList");
    (a = a.ownerDocument.getElementById(DuplicateView.DUPLICATE_LIST_DIV_ID)) ? (console && console.log && console.log("Found list div."), listParent = a.parentNode, listParent.removeChild(a)) : console && console.log && console.log("Didn't find list div.")
};
DuplicateView.hide = function (a) {
    try {
        DuplicateView.clearList(a), DuplicateView.hideConfirmCancelButtons(a), a.style.visibility = "hidden", a.ownerDocument.getElementById("deDupeGlobalButton").disabled = !1
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.hide", err));
    }
};
DuplicateView.deselectAll = function (a) {
    Util.debug("DuplicateView.deselectAll");
    try {
        DuplicateView.setWorking(a, !0), setTimeout(function () {
            for (var b = a.ownerDocument.getElementById(DuplicateView.DUPLICATE_LIST_DIV_ID).getElementsByTagName("input"), c = 0; c < b.length; c++) b[c].checked = !1;
            DuplicateView.setWorking(a, !1)
        }, 1)
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.deselectAll", err));
    }
};
DuplicateView.DUPLICATE_LIST_DIV_ID = "globalDuplicateList";
DuplicateView.DUPLICATE_LIST_DIV_CLASS = "duplicateListDiv";
DuplicateView.BUTTON_DIV_ID = "deDupeButtons";
DuplicateView.prototype = {
    displayDuplicates2: function (a) {
        Util.debug("DuplicateView.displayDuplicates2");
        try {
            if (!this.containingElement) throw Error("Cannot display duplicates since containingElement is null.");
            if (!a) throw Error("pathsArray argument was null.");
            Util.debug("DuplicateView.displayDuplicates2 is displaying " + a.length + " paths.");
            this.hideLoader();
            DuplicateView.hideConfirmCancelButtons(this.containingElement);
            var b = this.getUserPreferences(),
                d = !0,
                c = "<div class='" + DuplicateView.DUPLICATE_LIST_DIV_CLASS +
                    "' id='" + DuplicateView.DUPLICATE_LIST_DIV_ID + "'><h2>Duplicate bookmarks</h2>";
            if (0 < a.length) {
                for (var e = 0; e < a.length; e++) {
                    var f = a[e],
                        g = f[f.length - 1];
                    if (0 !== e) var h = a[e - 1],
                        d = 0 !== Sorter2.compareBookmarks(g, h[h.length - 1], b);
                    var k = DuplicateView.getPathAsString(f);
                    0 === e ? c += "<ul>" : !0 === d && (c += "</ul><ul>");
                    c += "<li id='dupe_" + g.id + "'><input type='checkbox' id='delete_" + g.id + "'/>" + k + "</li>"
                }
                c += "</ul>"
            } else c += "<p>You have no duplicate bookmarks.", !0 === b.ignoreBookmarksBar && (c += " (The Bookmarks Bar was ignored.)"),
                c += "</p>";
            this.containingElement.innerHTML += c + "</div>";
            $("#" + DuplicateView.DUPLICATE_LIST_DIV_ID).on("change", "input:checkbox", function () {
                DuplicateView.checkboxChanged($("#dupeDisplay")[0])
            });
            this.containingElement.style.visibility = "visible";
            DuplicateView.updateDeleteButtonStatus(this.containingElement)
        } catch (err) {
            throw Error(Util.reportError("DuplicateView.displayDuplicates2", err));
        }
    },
    getUserPreferences: function () {
        try {
            if (!this.userPrefs && (this.userPrefs = PrefsHelper.loadOptions(), !this.userPrefs)) throw Error("Could not load user options.");
            return this.userPrefs
        } catch (err) {
            throw Error(Util.reportError("DuplicateView.getUserPreferences", err));
        }
    },
    showLoader: function () {
        DuplicateView.setWorking(this.containingElement, !0)
    },
    hideLoader: function () {
        DuplicateView.setWorking(this.containingElement, !1)
    }
};
DuplicateView.prototype.containingElement = null;
DuplicateView.prototype.userPrefs = null;
DuplicateView.getPathString = function (a) {
    Util.debug("DuplicateView.getPathString");
    try {
        var b = "";
        a.sortByUpLevel();
        for (var d = 0; d < a.array.length; d++) {
            var c = a.array[a.array.length - (d + 1)].bookmark;
            1 < d && (b += " : ");
            c.url && (b += "<a target='_blank' href='" + c.url + "'>");
            b = 0 === d ? "" : b + (c.title ? c.title : "-");
            c.url && (b += "</a>")
        }
        return b
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.getPathString", err));
    }
};
DuplicateView.getPathAsString = function (a) {
    Util.debug("DuplicateView.getPathAsString");
    try {
        for (var b = "", d = 0; d < a.length; d++) {
            var c = a[d];
            1 < d && (b += " : ");
            c.url && (b += "<a target='_blank' href='" + c.url + "'>");
            b = 0 === d ? "" : b + (c.title ? c.title : "-");
            c.url && (b += "</a>")
        }
        return b
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.getPathAsString", err));
    }
};
DuplicateView.hideAnimation = function (a) {
    try {
        var b = a.ownerDocument;
        if (!b) throw Error("Couldn't find document.");
        var d = b.getElementById("deDupeLoaderSpan");
        d || Util.info("Couldn't find animation span.");
        d.style.visibility = "hidden"
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.hideAnimation", err));
    }
};
DuplicateView.disableDupeButtons = function (a) {
    DuplicateView.toggleDupeButtons(a, !1)
};
DuplicateView.enableDupeButtons = function (a) {
    DuplicateView.toggleDupeButtons(a, !0);
    DuplicateView.updateDeleteButtonStatus(a)
};
DuplicateView.toggleDupeButtons = function (a, b) {
    for (var d = a.ownerDocument.getElementById(DuplicateView.BUTTON_DIV_ID).getElementsByTagName("button"), c = 0; c < d.length; c++) d[c].disabled = !b
};
DuplicateView.setWorking = function (a, b) {
    Util.debug("DuplicateView.setWorking(" + a + ", " + b + ")");
    try {
        !0 === b ? (DuplicateView.hideConfirmCancelButtons(a), DuplicateView.showAnimation(a), DuplicateView.disableDupeButtons(a)) : (DuplicateView.hideAnimation(a), DuplicateView.enableDupeButtons(a))
    } catch (err) {
        throw new Util.reportError("DuplicateView.setWorking", err);
    }
};
DuplicateView.showAnimation = function (a) {
    try {
        var b = a.ownerDocument;
        if (!b) throw Error("Couldn't find document.");
        var d = b.getElementById("deDupeLoaderSpan");
        d || Util.info("Couldn't find animation span.");
        d.style.visibility = "visible"
    } catch (err) {
        throw Error(Util.reportError("DuplicateView.showAnimation", err));
    }
};

function DeDuper2() {
}

DeDuper2.name = "DeDuper2";
DeDuper2.BOOKMARKS_BAR_ID = 1;
DeDuper2.go = function (duplicateView) {
    console.log('DeDuper2.go')
    try {
        DeDuper2.write("DeDuper2.go")
        DeDuper2.getPaths(function (paths) {
            DeDuper2.handlePaths(paths, duplicateView)
        })
    } catch (err) {
        throw Error(Util.reportError("DeDuper2.go", err));
    }
};
DeDuper2.getPaths = function (handle_callback) {
    try {
        chrome.bookmarks.getTree(function (items) {
            DeDuper2.handleTree(items, handle_callback)
        })
    } catch (err) {
        throw Error(Util.reportError("DeDuper2.getPaths", err));
    }
};
DeDuper2.handleTree = function (treeItems, handle_callback) {
    try {
        const options = PrefsHelper.loadOptions();
        if (!options) throw Error("Could not load preferences!");
        DeDuper2.write("bmTree items: " + treeItems.length);
        const bookmarkTree = treeItems[0]; // There should be only 1 child, which is the whole chrome bookmark tree
        if (!bookmarkTree) throw Error("Could not find root.");
        const paths = DeDuper2.buildPaths(bookmarkTree, [bookmarkTree], options);
        "function" === typeof handle_callback && handle_callback(paths)
    } catch (err) {
        throw Error(Util.reportError("DeDuper2.handleTree", err));
    }
};
/**
 * Recursive scan all tree items
 * @param bookmarkTreeItem
 * @param pathToCurrentBookmarkItem An array of objects, each object is a folder level from top folder down to current
 * bookmark tree item.
 * @param options
 * @returns {Array} An array of all sub-items, includes sub-folders and sub-bookmark. First item is the current
 * folder. Each item is also an array of objects. Each objects is a level of folder from top level down to each
 * bookmark.
 */
DeDuper2.buildPaths = function (bookmarkTreeItem, pathToCurrentBookmarkItem, options) {
    try {
        if (!options) throw Error("prefs argument was nothing!");
        let allBookmarkPaths = [];
        if (!0 === options.ignoreBookmarksBar && bookmarkTreeItem.id === BookmarkSortPrefs.BOOKMARKS_BAR_ID)
            DeDuper2.write("DeDuper2.buildPaths: ignoring the Bookmarks Bar.");
        else {
            allBookmarkPaths.push(pathToCurrentBookmarkItem);

            if (bookmarkTreeItem.children)
                for (let idx = 0; idx < bookmarkTreeItem.children.length; idx++) {
                    const bookmarkTreeItemChild = bookmarkTreeItem.children[idx];
                    if (!bookmarkTreeItemChild) throw Error("Child at index " + idx + " was nothing!");
                    let pathToCurrentChildItem = [];
                    pathToCurrentChildItem = pathToCurrentChildItem.concat(pathToCurrentBookmarkItem);
                    pathToCurrentChildItem.push(bookmarkTreeItemChild);
                    // If current child is a folder, this will get all sub-item paths then merge to current folder's
                    // items paths. If current child is an bookmark, this will return an array of all path objects from
                    // top level down to current bookmark.
                    allBookmarkPaths = allBookmarkPaths.concat(DeDuper2.buildPaths(bookmarkTreeItemChild, pathToCurrentChildItem, options))
                }
        }
        return allBookmarkPaths
    } catch (err) {
        throw Error(Util.reportError("DeDuper2.buildPaths", err));
    }
};
DeDuper2.handlePaths = function (allBookmarkPaths, duplicateView) {
    try {
        // Define contains method if current browser does not support it
        Array.prototype.contains || (Array.prototype.contains = function (a) {
            for (let b = this.length; b--;)
                if (this[b] === a) return !0;
            return !1
        });
        if (!allBookmarkPaths) throw Error("pathsArray argument was nothing.");
        DeDuper2.write("Paths: " + allBookmarkPaths.length + " items (folders & bookmarks)");
        let d = [],
            options = PrefsHelper.loadOptions();
        DeDuper2.sortPathsByLeafThenPath(allBookmarkPaths, options);
        DeDuper2.write("Sorted paths.");
        for (var e = 1; e < allBookmarkPaths.length; e++) {
            var f = allBookmarkPaths[e - 1],
                g = allBookmarkPaths[e],
                h = f[f.length - 1],
                k = g[g.length - 1];
            h.url && k.url && !0 === (0 === Sorter2.compareBookmarks(h, k, options)) && (DeDuper2.write("DUPLICATE 1: " +
                h.title + "|" + h.url), DeDuper2.write("DUPLICATE 2: " + k.title + "|" + k.url), d.contains(f) || d.push(f), d.push(g))
        }
        duplicateView.displayDuplicates2(d)
    } catch (err) {
        throw Error(Util.reportError("DeDuper2.handlePaths", err));
    }
};
DeDuper2.sortPathsByLeafThenPath = function (paths, options) {
    paths.sort(function (bookmark1, bookmark2) {
        const order = Sorter2.compareBookmarks(bookmark1[bookmark1.length - 1], bookmark2[bookmark2.length - 1], options);
        if (0 !== order) return order;
        const path1 = DeDuper2.getPathString(bookmark1),
            path2 = DeDuper2.getPathString(bookmark2);
        return DeDuper2.comparePathStrings(path1, path2, options)
    })
};
DeDuper2.comparePathStrings = function (a, b, d) {
    try {
        if (!a) throw Error("pathString1 was nothing!");
        if (!b) throw Error("pathString2 was nothing!");
        if (!d) throw Error("prefs was nothing!");
        d.caseSensitive || (a = a.toLowerCase(), b = b.toLowerCase());
        return a < b ? -1 : a > b ? 1 : 0
    } catch (err) {
        throw Error(Util.reportError("DeDuper2.comparePathStrings", err));
    }
};
DeDuper2.getPathString = function (bookmarkPath) {
    try {
        if (!bookmarkPath) throw Error("orderedBookmarkArray was nothing.");
        for (var path = "", idx = 0; idx < bookmarkPath.length; idx++) {
            0 < idx && (path += " : ");
            var bookmark = bookmarkPath[idx];
            if (!bookmark) throw Error("Item at index " + idx + " was nothing.");
            path += bookmark.title ? bookmark.title : "-"
        }
        return path
    } catch (err) {
        throw Error(Util.reportError("DeDuper2.getPathString", err));
    }
};
DeDuper2.deleteBookmarks = function (a, b) {
    Util.debug("DeDuper2.deleteBookmarks");
    try {
        for (var d = new Devign.Sequence, c = 0; c < a.length; c++) d.add(function (a, b) {
            return function (b) {
                chrome.bookmarks.remove(a, function () {
                    b.next()
                })
            }
        }(a[c], d));
        b && (d.onEnd = function () {
            b()
        });
        d.start()
    } catch (err) {
        throw Error(Util.reportError("DeDuper2.deleteBookmarks", err));
    }
};
DeDuper2.WRITE_MODE = "debug";
DeDuper2.write = function (a) {
    "info" === DeDuper2.WRITE_MODE ? Util.info(a) : Util.debug(a)
};