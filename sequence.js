if ("undefined" == typeof Devign) var Devign = {};
Devign.Sequence = function () {
    this.list = [];
    this.index = -1;
    this.finished = this.aborted = !1
};
Devign.Sequence.prototype = {
    add: function (a) {
        this.list.push(a)
    },
    start: function () {
        Util.debug("sequence start()");
        this.index = -1;
        this.aborted = !1;
        this.next();
        if ("function" == typeof this.onStart) this.onStart()
    },
    end: function () {
        if ("function" == typeof this.onEnd) this.onEnd();
        this.finished = !0
    },
    next: function () {
        if (this.aborted) Util.debug("Sequence.next() aborted!");
        else {
            this.index++;
            Util.debug("Sequence.next() - index is " + this.index);
            if (this.index == this.list.length) return this.end();
            var a = this.list[this.index];
            a && a(this)
        }
    },
    abort: function () {
        this.index = -1;
        this.aborted = !0
    }
};