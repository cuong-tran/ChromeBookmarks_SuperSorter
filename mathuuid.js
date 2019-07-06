(function () {
    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    Math.uuid = function (d, c) {
        var b = [];
        c = c || e.length;
        if (d)
            for (var a = 0; a < d; a++) b[a] = e[0 | Math.random() * c];
        else {
            var f;
            b[8] = b[13] = b[18] = b[23] = "-";
            b[14] = "4";
            for (a = 0; 36 > a; a++) b[a] || (f = 0 | 16 * Math.random(), b[a] = e[19 == a ? f & 3 | 8 : f])
        }
        return b.join("")
    };
    Math.uuidFast = function () {
        for (var d = Array(36), c = 0, b, a = 0; 36 > a; a++) 8 == a || 13 == a || 18 == a || 23 == a ? d[a] = "-" : 14 == a ? d[a] = "4" : (2 >= c && (c = 33554432 + 16777216 * Math.random() | 0), b = c & 15, c >>= 4, d[a] =
            e[19 == a ? b & 3 | 8 : b]);
        return d.join("")
    };
    Math.uuidCompact = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (d) {
            var c = 16 * Math.random() | 0;
            return ("x" == d ? c : c & 3 | 8).toString(16)
        }).toUpperCase()
    }
})();