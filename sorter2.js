function Sorter2() {
    try {
        Sorter2.loadOptions(), this.rootId = null, this.didLastMergeMakeChanges = !1, this.mergeIterationCount = 0, this.idsToDelete = [], this.superSequence = new Devign.Sequence, Array.prototype.contains = function (a) {
            for (var c = this.length; c--;)
                if (this[c] === a) return !0;
            return !1
        }
    } catch (a) {
        Util.reportError("Sorter2 constructor", a)
    }
}

Sorter2.WRITE_MODE = "debug";
Sorter2.write = function (a) {
    try {
        if ("info" === Sorter2.WRITE_MODE) Util.info(a);
        else if ("debug" === Sorter2.WRITE_MODE) Util.debug(a);
        else throw Error("Sorter2.WRITE_MODE is not set properly; " + a);
    } catch (b) {
        Util.reportError("Sorter2.write", b)
    }
};
Sorter2.options = null;
Sorter2.loadOptions = function () {
    try {
        var a = Util.loadObject(BookmarkSortPrefs.OBJECT_NAME);
        a || (Sorter2.write("No saved preferences found. Creating new."), a = PrefsHelper.getNewPrefs());
        Sorter2.options = a
    } catch (b) {
        throw Error(Util.reportError(fn, b));
    }
};
Sorter2.COLOR_AUTO_BACKGROUND = {
    color: [155, 200, 155, 115]
};
Sorter2.COLOR_WAIT_BACKGROUND = {
    color: [255, 90, 90, 115]
};
Sorter2.COLOR_DONE_BACKGROUND = {
    color: [0, 255, 0, 115]
};
Sorter2.BADGE_MESSAGE_DISPLAY_MILLISECONDS = 3E3;
Sorter2.MAX_MERGE_ITERATIONS_ALLOWED = 30;
Sorter2.showCompletionMessage = function () {
    try {
        chrome.browserAction.setBadgeBackgroundColor(Sorter2.COLOR_DONE_BACKGROUND), chrome.browserAction.setBadgeText({
            text: "Done"
        }), setTimeout(function () {
            Sorter2.clearBadgeText()
        }, Sorter2.BADGE_MESSAGE_DISPLAY_MILLISECONDS)
    } catch (a) {
        throw Error(Util.reportError("Sorter2.showCompletionMessage", a));
    }
};
Sorter2.complete = function () {
    try {
        Sorter2.setSortInProgress(!1), Sorter2.showCompletionMessage()
    } catch (a) {
        throw Error(Util.reportError("Sorter2.complete", a));
    }
};
Sorter2.showBeginMessage = function () {
    try {
        chrome.browserAction.setBadgeBackgroundColor(Sorter2.COLOR_WAIT_BACKGROUND), chrome.browserAction.setBadgeText({
            text: "Wait"
        })
    } catch (a) {
        throw Error(Util.reportError("Sorter2.showBeginMessage", a));
    }
};
Sorter2.clearBadgeText = function () {
    try {
        Sorter2.write("Sorter2.clearBadgeText - Autosort enabled? " + Sorter2.isAutoSortEnabled()), Sorter2.isAutoSortEnabled() ? (chrome.browserAction.setBadgeBackgroundColor(Sorter2.COLOR_AUTO_BACKGROUND), chrome.browserAction.setBadgeText({
            text: "Auto"
        })) : chrome.browserAction.setBadgeText({
            text: ""
        })
    } catch (a) {
        throw Error(Util.reportError("Sorter2.clearBadgeText", a));
    }
};
Sorter2.go = function () {
    try {
        Sorter2.write("go()");
        var a = new Sorter2;
        a ? (Sorter2.write("Created sorter."), Sorter2.showBeginMessage(), a.begin(function () {
            Sorter2.complete()
        })) : Util.error("Unable to create sorter.")
    } catch (b) {
        throw Error(Util.reportError("Sorter2.go", b));
    }
};
Sorter2.isSortInProgress = function () {
    try {
        Sorter2.write("Checking whether sort is in progress."), chrome.runtime.getBackgroundPage(function (a) {
            if (a)
                if (Sorter2.write("found background page."), a = a.document) {
                    Sorter2.write("got document.");
                    if (a = a.getElementById("isSorting")) return Sorter2.write("found isSorting element."), a = a.innerHTML, Sorter2.write("Status string: '" + a + "'"), "yes" == a;
                    Util.error("Could not find isSorting element.")
                } else Util.error("Could not get document.");
            else Util.error("Could not find background page.")
        })
    } catch (a) {
        throw Error(Util.reportError("Sorter2.isSortInProgress",
            a));
    }
};
Sorter2.setSortInProgress = function (a) {
    try {
        chrome.runtime.getBackgroundPage(function (b) {
            (b = b.document) ? (b = b.getElementById("isSorting")) ? b.innerHTML = !0 == a ? "yes" : "no" : Util.error("Couldn't find isSorting element.") : Util.error("Couldn't get document.")
        })
    } catch (b) {
        throw Error(Util.reportError("Sorter2.setSortInProgress", b));
    }
};
Sorter2.intervalId = -1;
Sorter2.AUTOSORT_PERIOD_MILLISECONDS = 18E4;
Sorter2.isAutoSortEnabled = function () {
    try {
        Sorter2.options || (Sorter2.write("Sorter2 loading options."), Sorter2.loadOptions());
        var a = Sorter2.options.autoSort;
        Sorter2.write("isAutoSortEnabled? " + a);
        return a
    } catch (b) {
        throw Error(Util.reportError("Sorter2.isAutoSortEnabled", b));
    }
};
Sorter2.enableAutoSort = function () {
    try {
        null != Sorter2.intervalId && Sorter2.disableAutoSort(), Sorter2.write("enableAutoSort"), chrome.browserAction.setBadgeBackgroundColor(Sorter2.COLOR_AUTO_BACKGROUND), chrome.browserAction.setBadgeText({
            text: "Auto"
        }), Sorter2.intervalId = setInterval(function () {
            Sorter2.doAutoSort()
        }, Sorter2.AUTOSORT_PERIOD_MILLISECONDS), Sorter2.write("Enabled autosort: " + Sorter2.AUTOSORT_PERIOD_MILLISECONDS), Sorter2.write("intervalId: " + Sorter2.intervalId)
    } catch (a) {
        throw Error(Util.reportError("Sorter2.enableAutoSort",
            a));
    }
};
Sorter2.disableAutoSort = function () {
    try {
        Sorter2.intervalId && (Sorter2.write("Clearing interval " + Sorter2.intervalId), clearInterval(Sorter2.intervalId), Sorter2.intervalId = null), chrome.browserAction.setBadgeText({
            text: ""
        }), Sorter2.write("Disabled autosort"), Sorter2.write("Is autosort enabled? " + Sorter2.isAutoSortEnabled())
    } catch (a) {
        throw Error(Util.reportError("Sorter2.disableAutoSort", a));
    }
};
Sorter2.doAutoSort = function () {
    try {
        Sorter2.write("Doing autosort."), Sorter2.go()
    } catch (a) {
        throw Error(Util.reportError("Sorter2.doAutoSort", a));
    }
};
Sorter2.compareBookmarks = function (bookmark1, bookmark2, options) {
    Sorter2.write("Sorter2.compareBookmarks");
    try {
        if (options.foldersFirst) {
            if (bookmark1.url && !bookmark2.url) return 1;
            if (bookmark2.url && !bookmark1.url) return -1
        }
        var title1 = (bookmark1.title ? bookmark1.title : "").toLowerCase(),
            title2 = (bookmark2.title ? bookmark2.title : "").toLowerCase();
        return title1 === title2 ? Sorter2.compareBookmarksByUrl(bookmark1, bookmark2, options) : options.sortOrder === BookmarkSortPrefs.SORT_ASCENDING ? title1 < title2 ? -1 : 1 : title1 > title2 ? -1 : 1
    } catch (err) {
        throw Error(Util.reportError("Sorter2.compareBookmarks", err));
    }
};
Sorter2.compareBookmarksByUrl = function (a, b, c) {
    try {
        var e = a.url ? a.url : "",
            d = b.url ? b.url : "";
        return e === d ? 0 : c.sortOrder === BookmarkSortPrefs.SORT_ASCENDING ? e < d ? -1 : 1 : e > d ? -1 : 1
    } catch (f) {
        throw Error(Util.reportError("Sorter2.compareBookmarksByUrl", f));
    }
};
Sorter2.prototype = {
    begin: function (a) {
        try {
            Sorter2.write("Sorter2.begin: autosort enabled? " + Sorter2.isAutoSortEnabled());
            var b = this;
            !0 === Sorter2.isSortInProgress() ? Sorter2.write("Sort already running. Aborting.") : (Sorter2.write("No sort is running."), Sorter2.setSortInProgress(!0), this.superSequence.onStart = function () {
                Sorter2.write("superSequence is starting.")
            }, this.superSequence.onEnd = function () {
                Sorter2.write("superSequence.onEnd()");
                Sorter2.setSortInProgress(!1);
                a && a()
            }, Sorter2.options.deleteEmptyFolders &&
            b.superSequence.add(function (a) {
                var d = new Devign.Sequence;
                d.onEnd = function () {
                    Util.debug("Delete sequence.onEnd() calling superSeq.next()");
                    a.next()
                };
                chrome.bookmarks.getTree(function (a) {
                    b.sequenceDeleteEmptyFolders(a, d)
                })
            }), this.superSequence.add(function (a) {
                Sorter2.write("After deleteEmptyFolders in super sequence.");
                a.next()
            }), this.mergeIterationCount = 0, Sorter2.options.mergeNeighbouringFolders && (Sorter2.write("Queing merge identical sibling folders."), this.superSequence.add(function (a) {
                b.mergeNewStart(a)
            })),
                b.superSequence.add(function (a) {
                    Sorter2.write("Sort is next in the super sequence.");
                    a.next()
                }), Sorter2.write("Adding sort to super sequence..."), b.superSequence.add(function (a) {
                Sorter2.write("Running function to create sort sequencing function.");
                var d = new Devign.Sequence;
                d.onEnd = function () {
                    Sorter2.write("Sorting sequence onEnd.");
                    a.next()
                };
                chrome.bookmarks.getTree(function (a) {
                    b.sequenceSortBookmarkTree(a, d)
                })
            }), b.superSequence.add(function (a) {
                Sorter2.write("After sort in super sequence.");
                a.next()
            }),
            Sorter2.options.deDupeLocal && this.superSequence.add(function (a) {
                Util.debug("Adding sequencing of deDupeLocal to superSequence.");
                var d = new Devign.Sequence;
                d.onEnd = function () {
                    Sorter2.write("DeDupeLocal sequence onEnd.");
                    a.next()
                };
                chrome.bookmarks.getTree(function (a) {
                    b.sequenceDeDupeLocal(a, d)
                })
            }), this.superSequence.add(function (a) {
                Sorter2.write("After deDupeLocal in super sequence.");
                a.next()
            }), Sorter2.write("Starting the superSequence..."), this.superSequence.start())
        } catch (c) {
            throw Error(Util.reportError("Sorter2.begin",
                c));
        }
    },
    mergeNewStart: function (a) {
        try {
            var b = this;
            this.didLastMergeMakeChanges = !1;
            this.mergeIterationCount++;
            var c = new Devign.Sequence;
            c.onEnd = function (a) {
                return function () {
                    b.onMergeEnd(a)
                }
            }(a);
            this.sequenceMerge(c)
        } catch (e) {
            throw Error(Util.reportError("Sorter2.mergeNewStart", e));
        }
    },
    sequenceMerge: function (a) {
        try {
            var b = this;
            this.didLastMergeMakeChanges = !1;
            chrome.bookmarks.getTree(function (c) {
                b.sequenceMergeIdenticallyNamedFolders(c, a)
            })
        } catch (c) {
            throw Error(Util.reportError("Sorter2.sequenceMerge",
                c));
        }
    },
    onMergeEnd: function (a) {
        try {
            Sorter2.write("Sorter2.onMergeEnd"), !0 == this.didLastMergeMakeChanges && this.mergeIterationCount < Sorter2.MAX_MERGE_ITERATIONS_ALLOWED ? (Sorter2.write("Last merge did make changes. Running merge again (" + this.mergeIterationCount + "/" + Sorter2.MAX_MERGE_ITERATIONS_ALLOWED + ")..."), this.mergeNewStart(a)) : (Util.debug("Last merge made no changes. Calling superSequence's next()..."), a.next())
        } catch (b) {
            throw Error(Util.reportError("Sorter2.onMergeEnd", b));
        }
    },
    sequenceDeleteEmptyFolders: function (a,
                                          b) {
        try {
            var c = this;
            Sorter2.write("sequenceDeleteEmptyFolders...");
            var e = a[0];
            e && this.markForDeletionIfEmptyFolder(e);
            Util.debug("Finished marking nodes for deletion if empty. Nodes marked: " + this.idsToDelete.length);
            0 < this.idsToDelete.length ? chrome.bookmarks.get(this.idsToDelete, function (a) {
                c.queueDeleteWithDescendants(a, b, function () {
                    Sorter2.write("Starting delete operations.");
                    c.startSequence(b)
                })
            }) : (Sorter2.write("Nothing to delete."), b.add(function (a) {
                Sorter2.write("Dummy method just advances the sequence.");
                a.next()
            }), c.startSequence(b))
        } catch (d) {
            throw Error(Util.reportError("Sorter2.sequenceDeleteEmptyFolders", d));
        }
    },
    queueDeleteWithDescendants: function (a, b, c) {
        try {
            Sorter2.write("Queueing delete with descendants for " + a.length + " nodes.");
            for (var e = this, d = 0; d < a.length; d++) Sorter2.write("Queueing delete operation for node " + a[d].id), b.add(function (a) {
                Sorter2.write("Running function to return function (" + a.id + ")");
                return function (b) {
                    Sorter2.write("Removing bookmark tree for node " + a.id + ": " + a.title);
                    e.removeBookmarkTree(a,
                        function () {
                            b.next()
                        });
                    Sorter2.write("Removed.")
                }
            }(a[d]));
            c && c(b)
        } catch (f) {
            throw Error(Util.reportError("Sorter2.queueDeleteWithDescendants", f));
        }
    },
    markForDeletionIfEmptyFolder: function (a) {
        try {
            if (!0 === Sorter2.options.ignoreBookmarksBar && a.id == BookmarkSortPrefs.BOOKMARKS_BAR_ID) Sorter2.write("Sorter2.markForDeletionIfEmptyFolder is ignoring the Bookmarks Bar."), Sorter2.write("Sorter2.markForDeletionIfEmptyFolder: Bookmarks Bar title is '" + a.title + "'.");
            else {
                if (a.children)
                    for (var b = 0; b < a.children.length; b++) this.markForDeletionIfEmptyFolder(a.children[b]);
                a.url || a.children && 0 != a.children.length && !this.areAllChildrenMarkedForDeletion(a) || (Sorter2.write("EMPTY FOLDER WILL BE DELETED: " + a.title), this.markNodeForDeletion(a))
            }
        } catch (c) {
            throw Error(Util.reportError("Sorter2.markForDeletionIfEmptyFolder", c));
        }
    },
    areAllChildrenMarkedForDeletion: function (a) {
        try {
            if (!a.children) return !0;
            for (var b = 0; b < a.children.length; b++)
                if (!this.isMarkedForDeletion(a.children[b])) return !1;
            Sorter2.write("All children marked for deletion: " + a.title);
            return !0
        } catch (c) {
            throw Error(Util.reportError("Sorter2.areAllChildrenMarkedForDeletion",
                c));
        }
    },
    isMarkedForDeletion: function (a) {
        try {
            for (var b = 0; b < this.idsToDelete.length; b++)
                if (this.idsToDelete[b] == a.id) return !0;
            return !1
        } catch (c) {
            throw Error(Util.reportError("Sorter2.isMarkedForDeletion", c));
        }
    },
    markNodeForDeletion: function (a) {
        try {
            Sorter2.write("Marking for deletion: " + a.id + " (" + a.title + ")"), this.idsToDelete.push(a.id), Sorter2.write("IDs to delete: " + this.idsToDelete.length)
        } catch (b) {
            throw Error(Util.reportError("Sorter2.markNodeForDeletion", b));
        }
    },
    removeBookmarkTree: function (a, b) {
        try {
            a ||
            Util.debug("WARNING: removeBookmarkTree was called with a null bmTreeNode argument.");
            var c = a.id;
            chrome.bookmarks.removeTree(a.id, function () {
                Sorter2.write("Executing callback - " + c);
                b ? (Sorter2.write("Callback.toString(): " + b.toString()), b()) : Sorter2.write("Callback is nothing.")
            });
            Sorter2.write("Requested removeTree for ID " + c)
        } catch (e) {
            throw Error(Util.reportError("Sorter2.removeBookmarkTree", e));
        }
    },
    onDeleteEnd: function () {
        try {
            Sorter2.write("Delete operations finished. Clearing master sequence..."),
                this.masterSequence = new Devign.Sequence
        } catch (a) {
            throw Error(Util.reportError("Sorter2.onDeleteEnd", a));
        }
    },
    sequenceSortBookmarkTree: function (a, b) {
        try {
            Sorter2.write("Sorter2.sequenceSortBookmarkTree");
            if (!a) throw Error("bmTree argument was nothing!");
            if (!b) throw Error("sequence argument was nothing!");
            var c = a[0];
            if (c) this.rootId = c.id;
            else throw Error("Bookmarks tree has no root!");
            this.sequenceSortBookmarks(a, b);
            Sorter2.write("Starting bookmark sort...");
            this.startSequence(b)
        } catch (e) {
            throw Error(Util.reportError("Sorter2.sequenceSortBookmarkTree",
                e));
        }
    },
    startSequence: function (a) {
        try {
            Sorter2.write("Starting sequence."), a ? a.start() : Util.error("No sequence to start!")
        } catch (b) {
            throw Error(Util.reportError("Sorter2.startSequence", b));
        }
    },
    sequenceSortBookmarks: function (a, b) {
        try {
            Sorter2.write("Sorter2.sequenceSortBookmarks");
            var c = !1;
            if (!a) throw Error("bmArray argument was nothing!");
            if (!b) throw Error("sequence argument was nothing!");
            !0 === Sorter2.options.ignoreBookmarksBar && Sorter2.write("Sorter2.sequenceSortBookmarks: set to ignore Bookmarks Bar.");
            for (var e = a.slice(0), d = 0; d < a.length; d++) Util.debug(Util.bookmarkToString(a[d]));
            Sorter2.write("copyArray.length = " + e.length);
            e.sort(function (a, b) {
                return Sorter2.compareBookmarks(a, b, Sorter2.options)
            });
            for (d = e.length - 1; 0 <= d; d--) e[d].parentId && (this.rootId && e[d].parentId != this.rootId) && (!0 !== Sorter2.options.ignoreBookmarksBar || e[d].id != BookmarkSortPrefs.BOOKMARKS_BAR_ID && e[d].parentId != BookmarkSortPrefs.BOOKMARKS_BAR_ID ? e[d].index == d ? Util.debug("Already in right place.") : (Sorter2.write("Sequencing move from " +
                e[d].index + " to " + d + " ..."), b.add(function (a, b) {
                return function (d) {
                    Util.debug("(Sort) moving " + a.id + " to " + a.parentId + "[" + b + "]");
                    chrome.bookmarks.move(a.id, {
                        parentId: a.parentId,
                        index: b
                    }, function () {
                        d.next()
                    })
                }
            }(e[d], d))) : (Sorter2.write("Sorter2.sequenceSortBookmarks is ignoring the Bookmarks Bar. *************"), c = !0)), !1 === c && (e[d].children && 0 < e[d].children.length) && this.sequenceSortBookmarks(e[d].children, b);
            delete e
        } catch (f) {
            throw Error(Util.reportError("Sorter2.sequenceSortBookmarks", f));
        }
    },
    sequenceMergeIdenticallyNamedFolders: function (a,
                                                    b) {
        try {
            Sorter2.write("Sequencing merge of matching sibling folders.");
            var c = a[0];
            if (!c) throw Error("No root node supplied. Cannot merge descendants.");
            var e = this.sequenceMergeNeighboursAmongDescendants(c, b);
            this.didLastMergeMakeChanges = e && 0 < e.length;
            Sorter2.write("Did merge make changes? " + this.didLastMergeMakeChanges);
            Sorter2.write("Built merge sequence. Sequencing deletes ( " + e.length + ")...");
            this.sequenceDeletes(e, b);
            Sorter2.write("Done sequencing deletes. Starting sequence...");
            this.startSequence(b)
        } catch (d) {
            throw Error(Util.reportError("Sorter2.sequenceMergeIdenticallyNamedFolders",
                d));
        }
    },
    sequenceMergeNeighboursAmongDescendants: function (a, b) {
        try {
            var c = [],
                e = [];
            if (!a.children) return Util.debug("Sorter2.sequenceMergeNeighboursAmongDescendants: node " + a.id + " has no children."), [];
            if (!0 === Sorter2.options.ignoreBookmarksBar && a.id == BookmarkSortPrefs.BOOKMARKS_BAR_ID) return Sorter2.write("Sorter2.sequenceMergeNeighboursAmongDescendants is ignoring the Bookmarks Bar ('" + a.title + "')."), [];
            for (var d = 0; d < a.children.length; d++) {
                for (var f = this.sequenceMergeNeighboursAmongDescendants(a.children[d],
                    b), h = 0; h < f.length; h++) c.push(f[h]);
                var k = a.children[d];
                if (!k.url)
                    for (h = 0; h < a.children.length; h++) {
                        var g = a.children[h],
                            l = !0 == Sorter2.options.caseSensitive ? k.title : k.title.toLowerCase(),
                            m = !0 == Sorter2.options.caseSensitive ? g.title : g.title.toLowerCase();
                        h > d && (!g.url && m == l && !e.contains(g.id)) && (Util.debug("sequenceMergeNeighboursAmongDescendants marking for deletion: " + g.id + " ('" + g.title + "')."), c.push(g), this.sequenceMoveAllChildren(g, k, b), e.push(g.id))
                    }
            }
            return c
        } catch (n) {
            throw Error(Util.reportError("Sorter2.sequenceMergeNeighboursAmongDescendants",
                n));
        }
    },
    sequenceMoveAllChildren: function (a, b, c) {
        try {
            if (a)
                if (b)
                    if (a.children) {
                        Sorter2.write("Bookmark '" + a.title + "' has " + a.children.length + " children.");
                        for (var e = a.children.length - 1; 0 <= e; e--) this.sequenceMoveBookmark(a.children[e], b, c)
                    } else Sorter2.write("Parent node " + a.id + " ('" + a.title + "') has no children.");
                else Util.debug("moveAllChildren requires toParent parameter, which was not supplied.");
            else Util.debug("moveAllChildren requires fromParent parameter, not supplied.")
        } catch (d) {
            throw Error(Util.reportError("Sorter2.sequenceMoveAllChildren",
                d));
        }
    },
    sequenceMoveBookmark: function (a, b, c) {
        try {
            c.add(function (a, b, c) {
                return function (c) {
                    var e = b.children ? b.children.length - 1 : 0;
                    Util.debug("sequenceMoveBookmark anon function: moving " + a.id + " to " + b.id + "[" + e + "].");
                    chrome.bookmarks.move(a.id, {
                        parentId: b.id,
                        index: e
                    }, function () {
                        c.next()
                    })
                }
            }(a, b, c))
        } catch (e) {
            throw Error(Util.reportError("Sorter2.sequenceMoveBookmark", e));
        }
    },
    sequenceDeletes: function (a, b) {
        try {
            for (var c = 0; c < a.length; c++) b.add(function (a) {
                return function (b) {
                    Sorter2.write("sequenceDeletes removing node " +
                        a.id + " ('" + a.title + "')");
                    chrome.bookmarks.remove(a.id, function () {
                        b.next()
                    })
                }
            }(a[c]))
        } catch (e) {
            throw Error(Util.reportError("Sorter2.sequenceDeletes", e));
        }
    },
    sequenceDeDupeLocal: function (a, b) {
        try {
            var c = a[0];
            if (c) {
                var e = this.buildListOfDuplicateDescendants(c);
                Sorter2.write("Number of duplicates to delete: " + e.length);
                for (c = 0; c < e.length; c++) b.add(function (a) {
                    return function (b) {
                        Sorter2.write("Deleting duplicate " + a.id + ": '" + a.title + "'.");
                        chrome.bookmarks.remove(a.id, function () {
                            b.next()
                        })
                    }
                }(e[c]));
                Sorter2.write("Starting sequence to delete local duplicates.");
                b.start()
            } else Sorter2.write("sequenceDeDupeLocal could not find root!")
        } catch (d) {
            throw Error(Util.reportError("Sorter2.sequenceDeDupeLocal", d));
        }
    },
    buildListOfDuplicateDescendants: function (a) {
        try {
            var b = [];
            if (a.children)
                if (!0 === Sorter2.options.ignoreBookmarksBar && a.id == BookmarkSortPrefs.BOOKMARKS_BAR_ID) Sorter2.write("Sorter2.buildListOfDuplicateDescendants is ignoring the Bookmarks Bar.");
                else
                    for (var c = "", e = "", d = 0; d < a.children.length; d++) {
                        var f = a.children[d];
                        if (f.url) {
                            var h = !0 == Sorter2.options.caseSensitive ?
                                f.title : f.title.toLowerCase();
                            0 < d && f.url == c && h == e ? (Sorter2.write("Marking for deletion: " + f.id + " ('" + f.title + "')."), b.push(f)) : (c = f.url, e = h)
                        } else
                            for (var k = this.buildListOfDuplicateDescendants(f), g = 0; g < k.length; g++) b.push(k[g])
                    }
            return b
        } catch (l) {
            throw Error(Util.reportError("Sorter2.buildListOfDuplicateDescendants", l));
        }
    }
};