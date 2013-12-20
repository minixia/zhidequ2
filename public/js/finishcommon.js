this.seajs = {
    _seajs: this.seajs
};
seajs.version = "1.3.0-dev";
seajs._util = {};
seajs._config = {
    debug: "",
    preload: []
};
(function (g) {
    var j = Object.prototype.toString,
        i = Array.prototype;
    g.isString = function (b) {
        return "[object String]" === j.call(b);
    };
    g.isFunction = function (b) {
        return "[object Function]" === j.call(b);
    };
    g.isRegExp = function (b) {
        return "[object RegExp]" === j.call(b);
    };
    g.isObject = function (b) {
        return b === Object(b);
    };
    g.isArray = Array.isArray || function (b) {
        return "[object Array]" === j.call(b);
    };
    g.indexOf = i.indexOf ? function (b, d) {
        return b.indexOf(d);
    } : function (e, k) {
        for (var d = 0; d < e.length; d++) {
            if (e[d] === k) {
                return d;
            }
        }
        return -1;
    };
    var f = g.forEach = i.forEach ? function (b, d) {
        b.forEach(d);
    } : function (e, k) {
        for (var d = 0; d < e.length; d++) {
            k(e[d], d, e);
        }
    };
    g.map = i.map ? function (b, d) {
        return b.map(d);
    } : function (b, k) {
        var e = [];
        f(b, function (d, c, l) {
            e.push(k(d, c, l));
        });
        return e;
    };
    g.filter = i.filter ? function (b, d) {
        return b.filter(d);
    } : function (b, k) {
        var e = [];
        f(b, function (d, c, l) {
            k(d, c, l) && e.push(d);
        });
        return e;
    };
    var h = g.keys = Object.keys || function (e) {
        var k = [],
            d;
        for (d in e) {
            e.hasOwnProperty(d) && k.push(d);
        }
        return k;
    };
    g.unique = function (b) {
        var d = {};
        f(b, function (c) {
            d[c] = 1;
        });
        return h(d);
    };
    g.now = Date.now || function () {
        return (new Date).getTime();
    };
})(seajs._util);
(function (b, f) {
    var e = Array.prototype;
    b.log = function () {
        if ("undefined" !== typeof console) {
            var c = e.slice.call(arguments),
                d = "log";
            console[c[c.length - 1]] && (d = c.pop());
            if ("log" !== d || f.debug) {
                c = "dir" === d ? c[0] : e.join.call(c, " "), console[d](c);
            }
        }
    };
})(seajs._util, seajs._config);
(function (F, D, C) {
    function E(b) {
        b = b.match(t);
        return (b ? b[0] : ".") + "/";
    }

    function B(g) {
        A.lastIndex = 0;
        A.test(g) && (g = g.replace(A, "$1/"));
        if (-1 === g.indexOf(".")) {
            return g;
        }
        for (var j = g.split("/"), f = [], i, h = 0; h < j.length; h++) {
            if (i = j[h], ".." === i) {
                if (0 === f.length) {
                    throw Error("The path is invalid: " + g);
                }
                f.pop();
            } else {
                "." !== i && f.push(i);
            }
        }
        return f.join("/");
    }

    function s(b) {
        var b = B(b),
            d = b.charAt(b.length - 1);
        if ("/" === d) {
            return b;
        }
        "#" === d ? b = b.slice(0, -1) : -1 === b.indexOf("?") && !v.test(b) && (b += ".js");
        0 < b.indexOf(":80/") && (b = b.replace(":80/", "/"));
        return b;
    }

    function u(f) {
        if ("#" === f.charAt(0)) {
            return f.substring(1);
        }
        var c = D.alias;
        if (c && p(f)) {
            var h = f.split("/"),
                g = h[0];
            c.hasOwnProperty(g) && (h[0] = c[g], f = h.join("/"));
        }
        return f;
    }

    function y(b) {
        return 0 < b.indexOf("://") || 0 === b.indexOf("//");
    }

    function z(b) {
        return "/" === b.charAt(0) && "/" !== b.charAt(1);
    }

    function p(b) {
        var d = b.charAt(0);
        return -1 === b.indexOf("://") && "." !== d && "/" !== d;
    }
    var t = /.*(?=\/.*$)/,
        A = /([^:\/])\/\/+/g,
        v = /\.(?:css|js)$/,
        x = /^(.*?\w)(?:\/|$)/,
        w = {}, C = C.location,
        r = C.protocol + "//" + C.host + function (b) {
            "/" !== b.charAt(0) && (b = "/" + b);
            return b;
        }(C.pathname);
    0 < r.indexOf("\\") && (r = r.replace(/\\/g, "/"));
    F.dirname = E;
    F.realpath = B;
    F.normalize = s;
    F.parseAlias = u;
    F.parseMap = function (a) {
        var l = D.map || [];
        if (!l.length) {
            return a;
        }
        for (var k = a, j = 0; j < l.length; j++) {
            var c = l[j];
            if (F.isArray(c) && 2 === c.length) {
                var i = c[0];
                if (F.isString(i) && -1 < k.indexOf(i) || F.isRegExp(i) && i.test(k)) {
                    k = k.replace(i, c[1]);
                }
            } else {
                F.isFunction(c) && (k = c(k));
            }
        }
        k !== a && (w[k] = a);
        return k;
    };
    F.unParseMap = function (b) {
        return w[b] || b;
    };
    F.id2Uri = function (b, f) {
        if (!b) {
            return "";
        }
        b = u(b);
        f || (f = r);
        var c;
        y(b) ? c = b : 0 === b.indexOf("./") || 0 === b.indexOf("../") ? (0 === b.indexOf("./") && (b = b.substring(2)), c = E(f) + b) : c = z(b) ? f.match(x)[1] + b : D.base + "/" + b;
        return s(c);
    };
    F.isAbsolute = y;
    F.isRoot = z;
    F.isTopLevel = p;
    F.pageUri = r;
})(seajs._util, seajs._config, this);
(function (F, D) {
    function C(d, c) {
        d.onload = d.onerror = d.onreadystatechange = function () {
            t.test(d.readyState) && (d.onload = d.onerror = d.onreadystatechange = null, d.parentNode && !D.debug && y.removeChild(d), d = void 0, c());
        };
    }

    function E(d, a) {
        w || r ? (F.log("Start poll to fetch css"), setTimeout(function () {
            B(d, a);
        }, 1)) : d.onload = d.onerror = function () {
            d.onload = d.onerror = null;
            d = void 0;
            a();
        };
    }

    function B(f, h) {
        var e;
        if (w) {
            f.sheet && (e = !0);
        } else {
            if (f.sheet) {
                try {
                    f.sheet.cssRules && (e = !0);
                } catch (g) {
                    "NS_ERROR_DOM_SECURITY_ERR" === g.name && (e = !0);
                }
            }
        }
        setTimeout(function () {
            e ? h() : B(f, h);
        }, 1);
    }

    function s() {}
    var u = document,
        y = u.head || u.getElementsByTagName("head")[0] || u.documentElement,
        z = y.getElementsByTagName("base")[0],
        p = /\.css(?:\?|$)/i,
        t = /loaded|complete|undefined/,
        A, v;
    F.fetch = function (g, f, b) {
        var a = p.test(g),
            d = document.createElement(a ? "link" : "script");
        b && (b = F.isFunction(b) ? b(g) : b) && (d.charset = b);
        f = f || s;
        "SCRIPT" === d.nodeName ? C(d, f) : E(d, f);
        a ? (d.rel = "stylesheet", d.href = g) : (d.async = "async", d.src = g);
        A = d;
        z ? y.insertBefore(d, z) : y.appendChild(d);
        A = null;
    };
    F.getCurrentScript = function () {
        if (A) {
            return A;
        }
        if (v && "interactive" === v.readyState) {
            return v;
        }
        for (var e = y.getElementsByTagName("script"), f = 0; f < e.length; f++) {
            var d = e[f];
            if ("interactive" === d.readyState) {
                return v = d;
            }
        }
    };
    F.getScriptAbsoluteSrc = function (b) {
        return b.hasAttribute ? b.src : b.getAttribute("src", 4);
    };
    F.importStyle = function (e, f) {
        if (!f || !u.getElementById(f)) {
            var d = u.createElement("style");
            f && (d.id = f);
            y.appendChild(d);
            d.styleSheet ? d.styleSheet.cssText = e : d.appendChild(u.createTextNode(e));
        }
    };
    var x = navigator.userAgent,
        w = 536 > Number(x.replace(/.*AppleWebKit\/(\d+)\..*/, "$1")),
        r = 0 < x.indexOf("Firefox") && !("onload" in document.createElement("link"));
})(seajs._util, seajs._config, this);
(function (b) {
    var d = /(?:^|[^.$])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g;
    b.parseDependencies = function (f) {
        var a = [],
            c, f = f.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/mg, "").replace(/^\s*\/\/.*$/mg, "");
        for (d.lastIndex = 0; c = d.exec(f);) {
            c[2] && a.push(c[2]);
        }
        return b.unique(a);
    };
})(seajs._util);
(function (R, P, O) {
    function Q(b, d) {
        this.uri = b;
        this.status = d || 0;
    }

    function N(b, c) {
        return P.isString(b) ? Q._resolve(b, c) : P.map(b, function (d) {
            return N(d, c);
        });
    }

    function E(b, d) {
        var c = P.parseMap(b);
        p[c] ? (M[b] = M[c], d()) : D[c] ? A[c].push(d) : (D[c] = !0, A[c] = [d], Q._fetch(c, function () {
            p[c] = !0;
            var a = M[b];
            a.status === I.FETCHING && (a.status = I.FETCHED);
            z && (G(b, z), z = null);
            B && a.status === I.FETCHED && (M[b] = B, B.realUri = b);
            B = null;
            D[c] && delete D[c];
            A[c] && (P.forEach(A[c], function (e) {
                e();
            }), delete A[c]);
        }, O.charset));
    }

    function G(b, e) {
        var c = M[b] || (M[b] = new Q(b));
        c.status < I.SAVED && (c.id = e.id || b, c.dependencies = N(P.filter(e.dependencies || [], function (d) {
            return !!d;
        }), b), c.factory = e.factory, c.status = I.SAVED);
        return c;
    }

    function K(e, f) {
        var d = e(f.require, f.exports, f);
        void 0 !== d && (f.exports = d);
    }

    function L(d) {
        var c = d.realUri || d.uri,
            f = H[c];
        f && (P.forEach(f, function (a) {
            K(a, d);
        }), delete H[c]);
    }

    function C(d) {
        var c = d.uri;
        return P.filter(d.dependencies, function (b) {
            y = [c];
            if (b = F(M[b], c)) {
                y.push(c), P.log("Found circular dependencies:", y.join(" --> "), void 0);
            }
            return !b;
        });
    }

    function F(f, c) {
        if (!f || f.status !== I.SAVED) {
            return !1;
        }
        y.push(f.uri);
        var g = f.dependencies;
        if (g.length) {
            if (-1 < P.indexOf(g, c)) {
                return !0;
            }
            for (var h = 0; h < g.length; h++) {
                if (F(M[g[h]], c)) {
                    return !0;
                }
            }
        }
        return !1;
    }
    var M = {}, H = {}, J = [],
        I = {
            FETCHING: 1,
            FETCHED: 2,
            SAVED: 3,
            READY: 4,
            COMPILING: 5,
            COMPILED: 6
        };
    Q.prototype._use = function (e, c) {
        P.isString(e) && (e = [e]);
        var f = N(e, this.uri);
        this._load(f, function () {
            var b = P.map(f, function (d) {
                return d ? M[d]._compile() : null;
            });
            c && c.apply(null, b);
        });
    };
    Q.prototype._load = function (b, k) {
        function l(d) {
            (d || {}).status < I.READY && (d.status = I.READY);
            0 === --c && k();
        }
        var m = P.filter(b, function (d) {
                return d && (!M[d] || M[d].status < I.READY);
            }),
            f = m.length;
        if (0 === f) {
            k();
        } else {
            for (var c = f, j = 0; j < f; j++) {
                (function (d) {
                    function h() {
                        g = M[d];
                        if (g.status >= I.SAVED) {
                            var a = C(g);
                            a.length ? Q.prototype._load(a, function () {
                                l(g);
                            }) : l(g);
                        } else {
                            P.log("It is not a valid CMD module: " + d), l();
                        }
                    }
                    var g = M[d] || (M[d] = new Q(d, I.FETCHING));
                    g.status >= I.FETCHED ? h() : E(d, h);
                })(m[j]);
            }
        }
    };
    Q.prototype._compile = function () {
        function e(a) {
            a = N(a, c.uri);
            a = M[a];
            if (!a) {
                return null;
            }
            if (a.status === I.COMPILING) {
                return a.exports;
            }
            a.parent = c;
            return a._compile();
        }
        var c = this;
        if (c.status === I.COMPILED) {
            return c.exports;
        }
        if (c.status < I.READY && !H[c.realUri || c.uri]) {
            return null;
        }
        c.status = I.COMPILING;
        e.async = function (b, d) {
            c._use(b, d);
        };
        e.resolve = function (b) {
            return N(b, c.uri);
        };
        e.cache = M;
        c.require = e;
        c.exports = {};
        var f = c.factory;
        P.isFunction(f) ? (J.push(c), K(f, c), J.pop()) : void 0 !== f && (c.exports = f);
        c.status = I.COMPILED;
        L(c);
        return c.exports;
    };
    Q._define = function (e, c, n) {
        var l = arguments.length;
        1 === l ? (n = e, e = void 0) : 2 === l && (n = c, c = void 0, P.isArray(e) && (c = e, e = void 0));
        !P.isArray(c) && P.isFunction(n) && (c = P.parseDependencies(n.toString()));
        var l = {
            id: e,
            dependencies: c,
            factory: n
        }, m;
        if (document.attachEvent) {
            var j = P.getCurrentScript();
            j && (m = P.unParseMap(P.getScriptAbsoluteSrc(j)));
            m || P.log("Failed to derive URI from interactive script for:", n.toString(), "warn");
        }
        if (j = e ? N(e) : m) {
            if (j === m) {
                var f = M[m];
                f && (f.realUri && f.status === I.SAVED) && (M[m] = null);
            }
            l = G(j, l);
            if (m) {
                if ((M[m] || {}).status === I.FETCHING) {
                    M[m] = l, l.realUri = m;
                }
            } else {
                B || (B = l);
            }
        } else {
            z = l;
        }
    };
    Q._getCompilingModule = function () {
        return J[J.length - 1];
    };
    Q._find = function (e) {
        var c = [];
        P.forEach(P.keys(M), function (a) {
            if (P.isString(e) && -1 < a.indexOf(e) || P.isRegExp(e) && e.test(a)) {
                a = M[a], a.exports && c.push(a.exports);
            }
        });
        var f = c.length;
        1 === f ? c = c[0] : 0 === f && (c = null);
        return c;
    };
    Q._modify = function (a, h) {
        var f = N(a),
            e = M[f];
        e && e.status === I.COMPILED ? K(h, e) : (H[f] || (H[f] = []), H[f].push(h));
        return R;
    };
    Q.STATUS = I;
    Q._resolve = P.id2Uri;
    Q._fetch = P.fetch;
    Q.cache = M;
    var D = {}, p = {}, A = {}, z = null,
        B = null,
        y = [],
        s = new Q(P.pageUri, I.COMPILED);
    R.use = function (a, f) {
        var d = O.preload;
        d.length ? s._use(d, function () {
            O.preload = [];
            s._use(a, f);
        }) : s._use(a, f);
        return R;
    };
    R.define = Q._define;
    R.cache = Q.cache;
    R.find = Q._find;
    R.modify = Q._modify;
    R.pluginSDK = {
        Module: Q,
        util: P,
        config: O
    };
})(seajs, seajs._util, seajs._config);
(function (h, m, j) {
    var f = "seajs-ts=" + m.now(),
        i = document.getElementById("seajsnode");
    i || (i = document.getElementsByTagName("script"), i = i[i.length - 1]);
    var k = m.getScriptAbsoluteSrc(i) || m.pageUri,
        k = m.dirname(function (d) {
            if (d.indexOf("??") === -1) {
                return d;
            }
            var c = d.split("??"),
                d = c[0],
                c = m.filter(c[1].split(","), function (b) {
                    return b.indexOf("sea.js") !== -1;
                });
            return d + c[0];
        }(k));
    m.loaderDir = k;
    var g = k.match(/^(.+\/)seajs\/[\d\.]+\/$/);
    g && (k = g[1]);
    j.base = k;
    if (i = i.getAttribute("data-main")) {
        j.main = i;
    }
    j.charset = "utf-8";
    h.config = function (p) {
        for (var n in p) {
            if (p.hasOwnProperty(n)) {
                var b = j[n],
                    a = p[n];
                if (b && n === "alias") {
                    for (var o in a) {
                        if (a.hasOwnProperty(o)) {
                            var c = b[o],
                                d = a[o];
                            /^\d+\.\d+\.\d+$/.test(d) && (d = o + "/" + d + "/" + o);
                            c && c !== d && m.log("The alias config is conflicted:", "key =", '"' + o + '"', "previous =", '"' + c + '"', "current =", '"' + d + '"', "warn");
                            b[o] = d;
                        }
                    }
                } else {
                    if (b && (n === "map" || n === "preload")) {
                        m.isString(a) && (a = [a]);
                        m.forEach(a, function (e) {
                            e && b.push(e);
                        });
                    } else {
                        j[n] = a;
                    }
                }
            }
        }
        if ((p = j.base) && !m.isAbsolute(p)) {
            j.base = m.id2Uri((m.isRoot(p) ? "" : "./") + p + "/");
        }
        if (j.debug === 2) {
            j.debug = 1;
            h.config({
                map: [
                    [/^.*$/,
                        function (e) {
                            e.indexOf("seajs-ts=") === -1 && (e = e + ((e.indexOf("?") === -1 ? "?" : "&") + f));
                            return e;
                        }
                    ]
                ]
            });
        }
        if (j.debug) {
            h.debug = !! j.debug;
        }
        return this;
    };
    j.debug && (h.debug = !! j.debug);
})(seajs, seajs._util, seajs._config);
(function (b, f, e) {
    b.log = f.log;
    b.importStyle = f.importStyle;
    b.config({
        alias: {
            seajs: f.loaderDir
        }
    });
    if (-1 < e.location.search.indexOf("seajs-debug") || -1 < document.cookie.indexOf("seajs=1")) {
        b.config({
            debug: 2
        }).use("seajs/plugin-debug"), b._use = b.use, b._useArgs = [], b.use = function () {
            b._useArgs.push(arguments);
            return b;
        };
    }
})(seajs, seajs._util, this);
(function (f, h, g) {
    var e = f._seajs;
    if (e && !e.args) {
        g.seajs = f._seajs;
    } else {
        g.define = f.define;
        h.main && f.use(h.main);
        if (h = (e || 0).args) {
            g = {
                "0": "config",
                1: "use",
                2: "define"
            };
            for (e = 0; e < h.length; e += 2) {
                f[g[h[e]]].apply(f, h[e + 1]);
            }
        }
        delete f.define;
        delete f._util;
        delete f._config;
        delete f._seajs;
    }
})(seajs, seajs._config, this);
(function (a) {
    if (typeof define === "function") {
        define("jquery", function () {
            return a;
        });
        if (window.seajs) {
            seajs.use("jquery");
        }
    }
})(jQuery);
if (!this.JSON) {
    JSON = {};
}(function () {
    function f(n) {
        return n < 10 ? "0" + n : n;
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function (key) {
            return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z";
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null";
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null";
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === "string") {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else {
                if (typeof space === "string") {
                    indent = space;
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", {
                "": value
            });
        };
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j;
            }
            throw new SyntaxError("JSON.parse");
        };
    }
})();
(function (d) {
    var c = {
            className: "autosizejs",
            append: "",
            callback: false
        }, f = "hidden",
        b = "border-box",
        k = "lineHeight",
        a = '<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',
        g = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
        i = "oninput",
        e = "onpropertychange",
        j, h = d(a).data("autosize", true)[0];
    h.style.lineHeight = "99px";
    if (d(h).css(k) === "99px") {
        g.push(k);
    }
    h.style.lineHeight = "";
    d.fn.autosize = function (l) {
        l = d.extend({}, c, l || {});
        if (h.parentNode !== document.body) {
            d(document.body).append(h);
        }
        return this.each(function () {
            var q = this,
                o = d(q),
                u, p, n, m = 0,
                t = d.isFunction(l.callback);
            if (o.data("autosize")) {
                return;
            }
            if (o.css("box-sizing") === b || o.css("-moz-box-sizing") === b || o.css("-webkit-box-sizing") === b) {
                m = o.outerHeight() - o.height();
            }
            u = Math.max(parseInt(o.css("minHeight"), 10) - m, o.height());
            n = (o.css("resize") === "none" || o.css("resize") === "vertical") ? "none" : "horizontal";
            o.css({
                overflow: f,
                overflowY: f,
                wordWrap: "break-word",
                resize: n
            }).data("autosize", true);

            function s() {
                j = q;
                h.className = l.className;
                d.each(g, function (v, w) {
                    h.style[w] = o.css(w);
                });
            }

            function r() {
                var v, y, w;
                if (j !== q) {
                    s();
                }
                if (!p) {
                    p = true;
                    h.value = q.value + l.append;
                    h.style.overflowY = q.style.overflowY;
                    w = parseInt(q.style.height, 10);
                    h.style.width = Math.max(o.width(), 0) + "px";
                    h.scrollTop = 0;
                    h.scrollTop = 90000;
                    v = h.scrollTop;
                    var x = parseInt(o.css("maxHeight"), 10);
                    x = x && x > 0 ? x : 90000;
                    if (v > x) {
                        v = x;
                        y = "scroll";
                    } else {
                        if (v < u) {
                            v = u;
                        }
                    }
                    v += m;
                    q.style.overflowY = y || f;
                    if (w !== v) {
                        q.style.height = v + "px";
                        if (t) {
                            l.callback.call(q, v);
                        }
                    }
                    setTimeout(function () {
                        p = false;
                    }, 1);
                }
            }
            if (e in q) {
                if (i in q) {
                    q[i] = q.onkeyup = r;
                } else {
                    q[e] = r;
                }
            } else {
                q[i] = r;
            }
            o.bind("autosize", r);
            r();
        });
    };
}(window.jQuery || window.Zepto));
(function (z) {
    var C = z,
        l;
    if (typeof C.QNR === "undefined") {
        l = C.QNR = {};
    } else {
        l = C.QNR;
    } if (l._TRAVEL_INIT_) {
        return;
    }
    l._TRAVEL_INIT_ = true;
    var g = C.document,
        t = Object.prototype,
        v = Array.prototype,
        f = t.toString,
        i = t.hasOwnProperty,
        w = /^\s+/,
        p = /\s+$/;
    var u = {
        map: function (O, S, R) {
            var N = O.length;
            var Q = new Array(N);
            for (var P = 0; P < N; P++) {
                if (P in O) {
                    Q[P] = S.call(R, O[P], P, O);
                }
            }
            return Q;
        },
        forEach: function (O, R, Q) {
            for (var P = 0, N = O.length; P < N; P++) {
                if (P in O) {
                    R.call(Q, O[P], P, O);
                }
            }
        },
        filter: function (O, S, R) {
            var Q = [];
            for (var P = 0, N = O.length; P < N; P++) {
                if ((P in O) && S.call(R, O[P], P, O)) {
                    Q.push(O[P]);
                }
            }
            return Q;
        },
        some: function (O, R, Q) {
            for (var P = 0, N = O.length; P < N; P++) {
                if (P in O && R.call(Q, O[P], P, O)) {
                    return true;
                }
            }
            return false;
        },
        every: function (O, R, Q) {
            for (var P = 0, N = O.length; P < N; P++) {
                if (P in O && !R.call(Q, O[P], P, O)) {
                    return false;
                }
            }
            return true;
        },
        indexOf: function (O, Q, P) {
            var N = O.length;
            P |= 0;
            if (P < 0) {
                P += N;
            }
            if (P < 0) {
                P = 0;
            }
            for (; P < N; P++) {
                if (P in O && O[P] === Q) {
                    return P;
                }
            }
            return -1;
        },
        lastIndexOf: function (O, Q, P) {
            var N = O.length;
            P |= 0;
            if (!P || P >= N) {
                P = N - 1;
            }
            if (P < 0) {
                P += N;
            }
            for (; P > -1; P--) {
                if (P in O && O[P] === Q) {
                    return P;
                }
            }
            return -1;
        },
        contains: function (N, O) {
            return (u.indexOf(N, O) >= 0);
        },
        clear: function (N) {
            N.length = 0;
        },
        remove: function (O, S) {
            var N = -1;
            for (var Q = 1; Q < arguments.length; Q++) {
                var R = arguments[Q];
                for (var P = 0; P < O.length; P++) {
                    if (R === O[P]) {
                        if (N < 0) {
                            N = P;
                        }
                        O.splice(P--, 1);
                    }
                }
            }
            return N;
        },
        unique: function (O) {
            var S = [],
                R = null,
                Q = Array.indexOf || u.indexOf;
            for (var P = 0, N = O.length; P < N; P++) {
                if (Q(S, R = O[P]) < 0) {
                    S.push(R);
                }
            }
            return S;
        },
        reduce: function (O, S, P) {
            var N = O.length;
            var R = 0;
            if (arguments.length < 3) {
                var Q = 0;
                for (; R < N; R++) {
                    if (R in O) {
                        P = O[R++];
                        Q = 1;
                        break;
                    }
                }
                if (!Q) {
                    throw new Error("No component to reduce");
                }
            }
            for (; R < N; R++) {
                if (R in O) {
                    P = S(P, O[R], R, O);
                }
            }
            return P;
        },
        reduceRight: function (O, S, P) {
            var N = O.length;
            var R = N - 1;
            if (arguments.length < 3) {
                var Q = 0;
                for (; R > -1; R--) {
                    if (R in O) {
                        P = O[R--];
                        Q = 1;
                        break;
                    }
                }
                if (!Q) {
                    throw new Error("No component to reduceRight");
                }
            }
            for (; R > -1; R--) {
                if (R in O) {
                    P = S(P, O[R], R, O);
                }
            }
            return P;
        },
        expand: function (N) {
            return [].concat.apply([], N);
        },
        toArray: function (N) {
            var O = [];
            for (var P = 0; P < N.length; P++) {
                O[P] = N[P];
            }
            return O;
        },
        wrap: function (N, O) {
            return new O(N);
        }
    };
    for (var o in u) {
        (function (N) {
            if (!v[N]) {
                l[N] = u[N];
            } else {
                l[N] = function () {
                    var P = v.slice.call(arguments, 0);
                    var O = P.splice(0, 1)[0];
                    return v[N].apply(O, P);
                };
            }
        })(o);
    }
    var b = l.forEach,
        x = l.some,
        n = l.indexOf;
    var a = function (O) {
        var N = O.toString();
        if (N.trim) {
            return N.trim();
        } else {
            return N.replace(w, "").replace(p, "");
        }
    };
    var A = {};
    b("Boolean Number String Function Array Date RegExp Object".split(" "), function (N, O) {
        A["[object " + N + "]"] = N.toLowerCase();
    }, A);
    var M = function (N) {
        return N == null ? String(N) : A[f.call(N)] || "object";
    };
    var m = function (N) {
        return M(N) === "function";
    };
    var r = Array.isArray || function (N) {
        return M(N) === "array";
    };
    var y = function (N) {
        return N && typeof N === "object" && "setInterval" in N;
    };
    var G = function (P, N) {
        var O = v.slice.call(arguments, 2);
        return function () {
            var Q = v.slice.call(arguments, 0);
            Q = O.concat(Q);
            if (m(P)) {
                return P.apply(N, Q);
            } else {
                return function () {
                    console.error("proxy func is  not function");
                };
            }
        };
    };
    var s = function () {
        this._eventList = {};
    };
    s.prototype = {
        constructor: s,
        _getOne: function (N) {
            return this._eventList[N] || (this._eventList[N] = []);
        },
        bind: function (O, Q, P) {
            if (M(O) === "object") {
                for (var R in O) {
                    this.bind(R, O[R], P);
                }
            } else {
                if (P) {
                    Q = G(Q, P);
                }
                var N = this._getOne(O);
                if (N.fired) {
                    Q(N.args);
                    return this;
                }
                this._getOne(O).push(Q);
                return this;
            }
        },
        unbind: function (N, O) {
            var P = this._getOne(N);
            if (O) {
                var Q = n(P, O);
                if (Q > -1) {
                    P.slice(Q, 1);
                }
            } else {
                P.length = 0;
            }
        },
        trigger: function (Q) {
            var N = this._getOne(Q) || [];
            var P = v.slice.call(arguments, 1);
            var R = this;
            var O;
            b(this._getOne(Q), function (S) {
                O = S.apply(R, P);
                if (O === false) {
                    return true;
                }
            });
            return O;
        },
        once: function (N, Q, O) {
            var P = this;
            var R = function () {
                Q.apply(O || P, arguments);
                P.unbind(N, R);
            };
            P.bind(N, R);
            return R;
        },
        delay: function (O, Q) {
            var N = v.slice.call(arguments, 2);
            var P = this;
            return setTimeout(function () {
                P.trigger.apply(P, O.concat(N));
            }, Q || 10);
        },
        triggerReady: function (O) {
            var P = this._getOne(O);
            var N = v.slice.call(arguments, 1);
            b(P, function (R, Q) {
                if (typeof R != "function") {
                    return null;
                }
                return R.apply(null, N);
            });
            P.fired = true;
            P.args = N;
        }
    };
    s.prototype.fire = s.prototype.trigger;
    s.prototype.on = s.prototype.bind;
    var k = function (R, P, O) {
        var N = function () {};
        N.prototype = P.prototype;
        var Q = R.prototype;
        R.prototype = new N();
        R.prototype.constructor = R;
        R.$super = P;
        E(R.prototype, Q, O, true);
        return R;
    };
    var E = function (Q) {
        var O = arguments.length;
        var N = false;
        var P = v.slice.call(arguments, 1, O);
        if (M(arguments[O - 1]) === "boolean") {
            N = arguments[O - 1];
            P = v.slice.call(arguments, 1, O - 1);
        }
        b(P, function (S) {
            for (var R in S) {
                if (M(Q[R]) === "undefined" || N) {
                    Q[R] = S[R];
                }
            }
        });
        return Q;
    };
    E(l, {
        _config: {
            debug: true
        },
        type: M,
        trim: a,
        extend: k,
        mix: E,
        proxy: G,
        Event: s,
        isFunction: m,
        isArray: r,
        isWindow: y,
        isEmpty: function (O) {
            if (r(O) || M(O) === "string") {
                return O.length === 0;
            }
            for (var N in O) {
                if (i.call(O, N)) {
                    return false;
                }
            }
            return true;
        },
        HTMLEncode: function (N) {
            return (N || "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;");
        },
        countStr: function (Q) {
            var O = 0;
            for (var P = 0, N = Q.length; P < N; P++) {
                if (Q.charCodeAt(P) > 128) {
                    O++;
                } else {
                    O += 0.5;
                }
            }
            return O;
        },
        subStr: function (T, R, Q) {
            if (!T) {
                return "";
            }
            var U = 0,
                S = false,
                O = [];
            for (var P = 0, N = T.length; P < N; P++) {
                T.charCodeAt(P) > 127 ? U += 1 : U += 0.5;
                if (U > R) {
                    S = true;
                    break;
                }
                O.push(T.charAt(P));
            }
            return O.join("") + (S ? (typeof Q !== "undefined" ? Q : "...") : "");
        },
        getHashParams: function () {
            var P = z.location.hash || "#",
                N = {};
            var O = P.replace(/.*?#.*?!/, "");
            b(O.split("&"), function (R) {
                var Q = R.split("=");
                N[Q[0]] = Q[1];
            });
            return N;
        },
        formatDate: function (Q, O) {
            O = O || "yyyy-MM-dd";
            var R = Q.getFullYear().toString(),
                P = {
                    M: Q.getMonth() + 1,
                    d: Q.getDate(),
                    h: Q.getHours(),
                    m: Q.getMinutes(),
                    s: Q.getSeconds()
                };
            O = O.replace(/(y+)/ig, function (T, S) {
                return R.substr(4 - Math.min(4, S.length));
            });
            for (var N in P) {
                O = O.replace(new RegExp("(" + N + "+)", "g"), function (T, S) {
                    return (P[N] < 10 && S.length > 1) ? "0" + P[N] : P[N];
                });
            }
            return O;
        },
        plusDay: function (O, N) {
            var P = 24 * 60 * 60 * 1000;
            return new Date(O.getTime() + N * P);
        }
    });
    l.namespace = function (P, R) {
        if (!P || !P.length) {
            return null;
        }
        var S = P.split(".");
        var O = S[0] == "QNR" ? 1 : 0;
        var N = S.length;
        var Q = this;
        for (; O < N; O++) {
            if (M(Q[S[O]]) === "undefined") {
                Q[S[O]] = {};
            }
            Q = Q[S[O]];
        }
        if (m(R)) {
            R.call(Q, this);
        }
        return Q;
    };
    (function (W) {
        var O = {};
        var ab = {};
        var Y = [];
        var ac = [];
        var N;
        var U = function (Q) {
            if (/^\/\/\/?/.test(Q)) {
                Q = location.protocol + Q;
            }
            return Q;
        };
        var S = function () {
            var ah = g.getElementsByTagName("link"),
                ag = ah.length,
                Q;
            while (ag) {
                Q = ah[--ag];
                if ((Q.rel == "stylesheet" || Q.type == "text/css") && Q.href) {
                    O[U(Q.href)] = true;
                }
            }
            ah = g.getElementsByTagName("script");
            ag = ah.length;
            while (ag) {
                Q = ah[--ag];
                if ((!Q.type || Q.type == "text/javascript") && Q.src) {
                    O[U(Q.src)] = true;
                }
            }
            S = function () {};
        };
        var ad = function (ah) {
            var ai = Y,
                ag, Q;
            delete ab[ah];
            O[ah] = true;
            for (Q = 0; Q < ai.length; Q++) {
                ag = ai[Q];
                delete ag.resources[ah];
                if (W.isEmpty(ag.resources)) {
                    ag.callback && ag.callback();
                    ai.splice(Q--, 1);
                }
            }
        };
        var R = function () {
            var ak = g.styleSheets,
                ai = ak.length,
                ag = ac;
            while (ai--) {
                var aj = ak[ai],
                    Q = aj.ownerNode || aj.owningElement,
                    ah = ag.length;
                if (Q) {
                    while (ah--) {
                        if (Q == ag[ah]) {
                            ad(ag[ah]["data-href"]);
                            ag.splice(ah, 1);
                        }
                    }
                }
            }
            if (!ag.length) {
                clearInterval(N);
                N = null;
            }
        };
        var P = function (ag) {
            var Q = g.createElement("script");
            var ah = function () {
                Q.onload = Q.onerror = Q.onreadystatechange = null;
                ad(ag);
            };
            E(Q, {
                type: "text/javascript",
                src: ag
            }, true);
            Q.onload = Q.onerror = ah;
            Q.onreadystatechange = function () {
                var ai = this.readyState;
                if (ai == "complete" || ai == "loaded") {
                    ah();
                }
            };
            g.getElementsByTagName("head")[0].appendChild(Q);
        };
        var T = function (ag) {
            var Q = g.createElement("link");
            E(Q, {
                type: "text/css",
                rel: "stylesheet",
                href: ag,
                "data-href": ag
            }, true);
            g.getElementsByTagName("head")[0].appendChild(Q);
            if (Q.attachEvent) {
                var ah = function () {
                    ad(ag);
                };
                Q.onload = ah;
            } else {
                ac.push(Q);
                if (!N) {
                    N = setInterval(R, 20);
                }
            }
        };
        var af = function (aj, am) {
            var Q = {}, ag, an, al, ak;
            S();
            aj = r(aj) ? aj : [aj];
            for (var ai = 0, ah = aj.length; ai < ah; ai++) {
                ag = U(aj[ai]);
                Q[ag] = true;
                if (O[ag]) {
                    setTimeout(G(ad, null, ag), 0);
                } else {
                    if (!ab[ag]) {
                        ab[ag] = true;
                        if (ag.match(/[\?\.]css$/)) {
                            T(ag);
                        } else {
                            P(ag);
                        }
                    }
                }
            }
            if (am) {
                Y.push({
                    resources: Q,
                    callback: am
                });
            }
        };
        W.loadJS = function (Q, ag) {
            af(Q, ag);
        };
        W.loadCSS = function (Q, ag) {
            af(Q, ag);
        };
        W.loadListJs = W.loadSource = function (Q, ag) {
            af(Q, ag);
        };
        var ae = "LOADING",
            V = "LOADED";
        var X = {};
        W.loadModule = function (ai, aq, ao) {
            var al = ao || z.QZZ_TRAVEL_MODULES;
            if (!al) {
                console.error("没有SRC的配置项");
                return;
            }
            if (aa(ai) === V) {
                var ak = X[ai]["callbacks"];
                var ah;
                while (ah = ak.shift()) {
                    M(ah) === "function" && ah();
                }
                M(aq) === "function" && aq();
                return;
            }
            var ag = al[ai],
                Q, ap = {};
            if (M(ag) === "string") {
                Q = [ag];
            } else {
                if (M(ag) === "array") {
                    Q = ag;
                } else {
                    if (M(ag) === "object") {
                        Q = ag.src;
                        var am = ag.depends;
                        if (M(am) === "array") {
                            b(am, function (ar) {
                                ap[ar] = ar;
                            });
                        } else {
                            if (M(am) === "string") {
                                ap[am] = am;
                            }
                        }
                    } else {
                        console.error("需要加载的M格式错误 。。", ai, ag);
                        return;
                    }
                }
            }
            var aj = function () {
                if (!X[ai]) {
                    X[ai] = {
                        status: ae,
                        callbacks: []
                    };
                    if (M(aq) === "function") {
                        X[ai]["callbacks"].push(aq);
                    }
                } else {
                    if (aa(ai) === ae) {
                        aq && X[ai]["callbacks"].push(aq);
                        if (M(aq) === "function") {
                            X[ai]["callbacks"].push(aq);
                        }
                        return;
                    }
                }
                W.loadSource(Q, function () {
                    X[ai]["status"] = V;
                    var at = X[ai]["callbacks"];
                    var ar;
                    while (ar = at.shift()) {
                        M(ar) === "function" && ar();
                    }
                });
            };
            if (!Z(ap)) {
                for (var an in ap) {
                    (function (ar) {
                        W.loadModule(ar, function () {
                            delete ap[ar];
                            if (Z(ap)) {
                                aj();
                            }
                        }, al);
                    })(an);
                }
            } else {
                aj();
            }
        };

        function aa(Q) {
            if (X[Q]) {
                return X[Q]["status"] || null;
            }
            return null;
        }

        function Z(ag) {
            for (var Q in ag) {
                return false;
            }
            return true;
        }
    })(l);
    var B = z.navigator.userAgent.toLowerCase(),
        q = function (N) {
            return N.test(B);
        };
    var c = q(/opera/),
        K = q(/\bchrome\b/),
        D = q(/webkit/),
        e = !K && D,
        j = q(/msie/) && g.all && !c,
        J = q(/msie 7/),
        I = q(/msie 8/),
        H = q(/msie 9/),
        h = q(/msie 10/),
        L = j && !J && !I && !H && !h,
        d = q(/gecko/) && !D,
        F = q(/mac/);
    l.Browser = {
        isOpera: c,
        isChrome: K,
        isWebKit: D,
        isSafari: e,
        isIE: j,
        isIE7: J,
        isIE8: I,
        isIE9: H,
        isIE6: L,
        isGecko: d,
        isMac: F
    };
    l.clickLog = function (P, O) {
        var N = new Image();
        N.width = 1;
        N.height = 1;
        N.src = "http://bc.qunar.com/clk?s=" + P + "&a=" + O + "&t=" + Math.random();
    };
    l.DEBUG = false;
    z.console = (function (P) {
        var O = l.DEBUG;
        var Q = function () {};
        var R = function (T) {
            return function () {
                var U = v.slice.call(arguments, 0);
                if (l.DEBUG && M(T) === "function") {
                    return T.apply(P, U);
                }
            };
        };
        if (!P) {
            return {
                log: Q,
                error: Q,
                info: Q
            };
        }
        if (O) {
            return P;
        } else {
            var N = {
                log: 1,
                error: 1,
                info: 1,
                debug: 1
            };
            for (var S in P) {
                (function (U, T) {
                    if (N[U]) {
                        P[U] = R(T);
                    }
                })(S, P[S]);
            }
            return P;
        }
    })(z.console);
    C.QN = C.QNR;
    if (typeof define === "function") {
        define("lib/QNR", l);
        if (z.seajs) {
            seajs.use("lib/QNR");
        }
    }
    l.PubSub = new l.Event();
})(window);
(function (a, e) {
    if (a.Storage) {
        return;
    }
    var d = {
        _store: null,
        _getStore: function () {
            if (this._store) {
                return this._store;
            }
            if ( !! e.localStorage) {
                this._store = b;
            } else {
                this._store = c;
            }
            return this._store;
        },
        isAvailable: function () {
            return !!(this._getStore());
        },
        setItem: function (g, h) {
            var f = this._getStore();
            return f && f.setItem(g, h);
        },
        getItem: function (g) {
            var f = this._getStore();
            return f && f.getItem(g);
        },
        removeItem: function (g) {
            var f = this._getStore();
            return f && f.removeItem(g);
        },
        clear: function () {
            var f = this._getStore();
            f && f.clear();
        },
        onstorage: function (g, h) {
            var f = this._getStore();
            f && f.onstorage(g, h);
        },
        sync: function (h, g, k, f) {
            if (!a.isFunction(h)) {
                return false;
            }
            var m = this._genSyncKey(h);
            var l = "~{##}~";
            var j = "~{###}~";
            var n = false;
            this.onstorage(f || m, function (q) {
                if (!n || !d.isStoreTriggerSelf()) {
                    var p = q.split(l)[1],
                        o = p.split(j);
                    h.apply(g, o);
                }
                n = false;
            });
            var i = this;
            return function () {
                if (!k) {
                    h.apply(g, arguments);
                }
                n = true;
                i.setItem(f || m, (new Date()) * 1 + "" + Math.random() + l + ([].slice.call(arguments).join(j)));
            };
        },
        _genSyncKey: function (k) {
            var f = 30,
                k = k.toString();
            var n = "",
                h = /^function\s+([^\(]+)\s*\(/ig,
                m = h.exec(k);
            if (m) {
                n = m[1];
                n = n.replace(/[^\w]+/ig, "");
            }
            k = k.replace(/(function|[^\w]+)/ig, "");
            f -= n.length;
            if (f <= 0) {
                return n.substring(0, 30);
            }
            if (k.length <= f) {
                return n + k;
            }
            var g = f,
                p = k.length,
                j = Math.ceil(k.length / f),
                o = [];
            for (var l = 0; l < k.length; l += j) {
                o.push(k.substring(l, l + 1));
                g--;
                p -= j;
                if (p <= g) {
                    o.push(k.substring(l));
                    break;
                }
            }
            return n + o.join("");
        },
        isStoreUseTimer: function () {
            return this._getStore().useTimer;
        },
        isStoreTriggerSelf: function () {
            return this._getStore().triggerSelf;
        },
        getStoreInterval: function () {
            return this._getStore().interval;
        }
    };
    var b = (function () {
        var f = e.localStorage;

        function g(i, j) {
            var h = f[i];
            return function (k) {
                setTimeout(function () {
                    k = k || e.storageEvent;
                    var m = k.key,
                        n = k.newValue;
                    if (!m) {
                        var l = f[i];
                        if (l != h) {
                            m = i;
                            n = l;
                        }
                    }
                    if (m == i) {
                        j && j(n);
                        h = n;
                    }
                }, 0);
            };
        }
        return {
            getItem: function (h) {
                return f.getItem(h);
            },
            setItem: function (h, i) {
                return f.setItem(h, i);
            },
            removeItem: function (h, i) {
                return f.removeItem(h);
            },
            clear: function () {
                return f.clear();
            },
            onstorage: function (i, k) {
                var h = a.Browser;
                if (!this.useTimer) {
                    if (document.attachEvent && !h.isOpera) {
                        document.attachEvent("onstorage", g(i, k));
                    } else {
                        e.addEventListener("storage", g(i, k), false);
                    }
                } else {
                    var j = g(i, k);
                    setInterval(function () {
                        j({});
                    }, this.interval);
                }
            },
            useTimer: (a.Browser.isIE6 || a.Browser.isIE9) || a.Browser.isChrome,
            triggerSelf: a.Browser.isIE || a.Browser.isChrome,
            interval: 1000
        };
    })();
    var c = (function () {
        var g = "testlocal_storage";

        function f(i, j) {
            var h = c.getItem(i);
            return function () {
                var k = c.getItem(i);
                if (h != k) {
                    j && j(k);
                    h = k;
                }
            };
        }
        return {
            _store: null,
            _getStore: function () {
                if (!this._store) {
                    try {
                        this._store = document.createElement("input");
                        this._store.type = "hidden";
                        this._store.addBehavior("#default#userData");
                        document.body.appendChild(this._store);
                    } catch (k) {
                        var j = [];
                        for (var h in k) {
                            j.push(h + ": " + k[h]);
                        }
                        document.title = (j.join("\n"));
                        return false;
                    }
                }
                return this._store;
            },
            getItem: function (i) {
                var h = this._getStore();
                if (!h) {
                    return false;
                }
                h.load(g);
                return h.getAttribute(i);
            },
            setItem: function (i, j) {
                var h = this._getStore();
                if (!h) {
                    return false;
                }
                h.load(g);
                h.setAttribute(i, j);
                h.save(g);
            },
            removeItem: function (i, j) {
                var h = this._getStore();
                if (!h) {
                    return false;
                }
                h.load(g);
                h.removeAttribute(i);
                h.save(g);
            },
            clear: function () {
                var k = this._getStore();
                if (!k) {
                    return false;
                }
                var m = k.XMLDocument;
                var j = m.selectSingleNode("ROOTSTUB");
                for (var l = 0; l < j.attributes.length; ++l) {
                    var h = j.attributes[l];
                    k.removeAttribute(h.baseName);
                }
                k.save(g);
            },
            onstorage: function (h, j) {
                var i = f(h, j);
                setInterval(function () {
                    i();
                }, this.interval);
            },
            isAvailable: function () {
                try {
                    var h = this._getStore();
                    if (!h) {
                        return false;
                    }
                    h.save();
                    return true;
                } catch (i) {
                    if (i.number && Math.abs(parseInt(i.number)) == 2146827838) {
                        return true;
                    }
                    if (i.description && (i.description.indexOf("Wrong number") != -1 || i.description.indexOf("\u9519\u8bef\u7684\u53c2\u6570\u4e2a\u6570") != -1)) {
                        return true;
                    }
                    return false;
                }
            },
            useTimer: true,
            interval: 1000,
            triggerSelf: true
        };
    })();
    a.Storage = d;
})(QNR, window);

window.Hogan = {};
(function (j, h) {
    j.Template = function (o, p, n, m) {
        this.r = o || this.r;
        this.c = n;
        this.options = m;
        this.text = p || "";
        this.buf = (h) ? [] : "";
    };
    j.Template.prototype = {
        r: function (o, n, m) {
            return "";
        },
        v: c,
        t: e,
        render: function b(o, n, m) {
            return this.ri([o], n || {}, m);
        },
        ri: function (o, n, m) {
            return this.r(o, n, m);
        },
        rp: function (o, q, p, m) {
            var n = p[o];
            if (!n) {
                return "";
            }
            if (this.c && typeof n == "string") {
                n = this.c.compile(n, this.options);
            }
            return n.ri(q, p, m);
        },
        rs: function (p, o, q) {
            var m = p[p.length - 1];
            if (!g(m)) {
                q(p, o, this);
                return;
            }
            for (var n = 0; n < m.length; n++) {
                p.push(m[n]);
                q(p, o, this);
                p.pop();
            }
        },
        s: function (s, n, q, o, t, m, p) {
            var r;
            if (g(s) && s.length === 0) {
                return false;
            }
            if (typeof s == "function") {
                s = this.ls(s, n, q, o, t, m, p);
            }
            r = (s === "") || !! s;
            if (!o && r && n) {
                n.push((typeof s == "object") ? s : n[n.length - 1]);
            }
            return r;
        },
        d: function (q, n, p, r) {
            var s = q.split("."),
                t = this.f(s[0], n, p, r),
                m = null;
            if (q === "." && g(n[n.length - 2])) {
                return n[n.length - 1];
            }
            for (var o = 1; o < s.length; o++) {
                if (t && typeof t == "object" && s[o] in t) {
                    m = t;
                    t = t[s[o]];
                } else {
                    t = "";
                }
            }
            if (r && !t) {
                return false;
            }
            if (!r && typeof t == "function") {
                n.push(m);
                t = this.lv(t, n, p);
                n.pop();
            }
            return t;
        },
        f: function (q, m, p, r) {
            var t = false,
                n = null,
                s = false;
            for (var o = m.length - 1; o >= 0; o--) {
                n = m[o];
                if (n && typeof n == "object" && q in n) {
                    t = n[q];
                    s = true;
                    break;
                }
            }
            if (!s) {
                return (r) ? false : "";
            }
            if (!r && typeof t == "function") {
                t = this.lv(t, m, p);
            }
            return t;
        },
        ho: function (s, m, p, r, o) {
            var q = this.c;
            var n = this.options;
            n.delimiters = o;
            var r = s.call(m, r);
            r = (r == null) ? String(r) : r.toString();
            this.b(q.compile(r, n).render(m, p));
            return false;
        },
        b: (h) ? function (m) {
            this.buf.push(m);
        } : function (m) {
            this.buf += m;
        },
        fl: (h) ? function () {
            var m = this.buf.join("");
            this.buf = [];
            return m;
        } : function () {
            var m = this.buf;
            this.buf = "";
            return m;
        },
        ls: function (n, u, r, o, m, p, v) {
            var q = u[u.length - 1],
                s = null;
            if (!o && this.c && n.length > 0) {
                return this.ho(n, q, r, this.text.substring(m, p), v);
            }
            s = n.call(q);
            if (typeof s == "function") {
                if (o) {
                    return true;
                } else {
                    if (this.c) {
                        return this.ho(s, q, r, this.text.substring(m, p), v);
                    }
                }
            }
            return s;
        },
        lv: function (q, o, p) {
            var n = o[o.length - 1];
            var m = q.call(n);
            if (typeof m == "function") {
                m = e(m.call(n));
                if (this.c && ~m.indexOf("{\u007B")) {
                    return this.c.compile(m, this.options).render(n, p);
                }
            }
            return e(m);
        }
    };
    var i = /&/g,
        d = /</g,
        a = />/g,
        l = /\'/g,
        k = /\"/g,
        f = /[&<>\"\']/;

    function e(m) {
        return String((m === null || m === undefined) ? "" : m);
    }

    function c(m) {
        m = e(m);
        return f.test(m) ? m.replace(i, "&amp;").replace(d, "&lt;").replace(a, "&gt;").replace(l, "&#39;").replace(k, "&quot;") : m;
    }
    var g = Array.isArray || function (m) {
        return Object.prototype.toString.call(m) === "[object Array]";
    };
})(typeof exports !== "undefined" ? exports : Hogan, true);
(function (n) {
    var f = /\S/,
        j = /\"/g,
        o = /\n/g,
        k = /\r/g,
        u = /\\/g,
        a = {
            "#": 1,
            "^": 2,
            "/": 3,
            "!": 4,
            ">": 5,
            "<": 6,
            "=": 7,
            _v: 8,
            "{": 9,
            "&": 10
        };
    n.scan = function m(G, B) {
        var O = G.length,
            y = 0,
            D = 1,
            x = 2,
            z = y,
            C = null,
            Q = null,
            P = "",
            J = [],
            F = false,
            N = 0,
            K = 0,
            H = "{{",
            M = "}}";

        function L() {
            if (P.length > 0) {
                J.push(new String(P));
                P = "";
            }
        }

        function A() {
            var S = true;
            for (var R = K; R < J.length; R++) {
                S = (J[R].tag && a[J[R].tag] < a._v) || (!J[R].tag && J[R].match(f) === null);
                if (!S) {
                    return false;
                }
            }
            return S;
        }

        function I(U, R) {
            L();
            if (U && A()) {
                for (var S = K, T; S < J.length; S++) {
                    if (!J[S].tag) {
                        if ((T = J[S + 1]) && T.tag == ">") {
                            T.indent = J[S].toString();
                        }
                        J.splice(S, 1);
                    }
                }
            } else {
                if (!R) {
                    J.push({
                        tag: "\n"
                    });
                }
            }
            F = false;
            K = J.length;
        }

        function E(V, S) {
            var U = "=" + M,
                R = V.indexOf(U, S),
                T = q(V.substring(V.indexOf("=", S) + 1, R)).split(" ");
            H = T[0];
            M = T[1];
            return R + U.length - 1;
        }
        if (B) {
            B = B.split(" ");
            H = B[0];
            M = B[1];
        }
        for (N = 0; N < O; N++) {
            if (z == y) {
                if (w(H, G, N)) {
                    --N;
                    L();
                    z = D;
                } else {
                    if (G.charAt(N) == "\n") {
                        I(F);
                    } else {
                        P += G.charAt(N);
                    }
                }
            } else {
                if (z == D) {
                    N += H.length - 1;
                    Q = a[G.charAt(N + 1)];
                    C = Q ? G.charAt(N + 1) : "_v";
                    if (C == "=") {
                        N = E(G, N);
                        z = y;
                    } else {
                        if (Q) {
                            N++;
                        }
                        z = x;
                    }
                    F = N;
                } else {
                    if (w(M, G, N)) {
                        J.push({
                            tag: C,
                            n: q(P),
                            otag: H,
                            ctag: M,
                            i: (C == "/") ? F - M.length : N + H.length
                        });
                        P = "";
                        N += M.length - 1;
                        z = y;
                        if (C == "{") {
                            if (M == "}}") {
                                N++;
                            } else {
                                r(J[J.length - 1]);
                            }
                        }
                    } else {
                        P += G.charAt(N);
                    }
                }
            }
        }
        I(F, true);
        return J;
    };

    function r(x) {
        if (x.n.substr(x.n.length - 1) === "}") {
            x.n = x.n.substring(0, x.n.length - 1);
        }
    }

    function q(x) {
        if (x.trim) {
            return x.trim();
        }
        return x.replace(/^\s*|\s*$/g, "");
    }

    function w(x, B, z) {
        if (B.charAt(z) != x.charAt(0)) {
            return false;
        }
        for (var A = 1, y = x.length; A < y; A++) {
            if (B.charAt(z + A) != x.charAt(A)) {
                return false;
            }
        }
        return true;
    }

    function b(D, A, y, C) {
        var x = [],
            B = null,
            z = null;
        while (D.length > 0) {
            z = D.shift();
            if (z.tag == "#" || z.tag == "^" || e(z, C)) {
                y.push(z);
                z.nodes = b(D, z.tag, y, C);
                x.push(z);
            } else {
                if (z.tag == "/") {
                    if (y.length === 0) {
                        throw new Error("Closing tag without opener: /" + z.n);
                    }
                    B = y.pop();
                    if (z.n != B.n && !g(z.n, B.n, C)) {
                        throw new Error("Nesting error: " + B.n + " vs. " + z.n);
                    }
                    B.end = z.i;
                    return x;
                } else {
                    x.push(z);
                }
            }
        }
        if (y.length > 0) {
            throw new Error("missing closing tag: " + y.pop().n);
        }
        return x;
    }

    function e(A, y) {
        for (var z = 0, x = y.length; z < x; z++) {
            if (y[z].o == A.n) {
                A.tag = "#";
                return true;
            }
        }
    }

    function g(B, z, y) {
        for (var A = 0, x = y.length; A < x; A++) {
            if (y[A].c == B && y[A].o == z) {
                return true;
            }
        }
    }
    n.generate = function (x, A, y) {
        var z = 'var _=this;_.b(i=i||"");' + t(x) + "return _.fl();";
        if (y.asString) {
            return "function(c,p,i){" + z + ";}";
        }
        return new n.Template(new Function("c", "p", "i", z), A, n, y);
    };

    function v(x) {
        return x.replace(u, "\\\\").replace(j, '\\"').replace(o, "\\n").replace(k, "\\r");
    }

    function i(x) {
        return (~x.indexOf(".")) ? "d" : "f";
    }

    function t(y) {
        var B = "";
        for (var A = 0, z = y.length; A < z; A++) {
            var x = y[A].tag;
            if (x == "#") {
                B += h(y[A].nodes, y[A].n, i(y[A].n), y[A].i, y[A].end, y[A].otag + " " + y[A].ctag);
            } else {
                if (x == "^") {
                    B += s(y[A].nodes, y[A].n, i(y[A].n));
                } else {
                    if (x == "<" || x == ">") {
                        B += d(y[A]);
                    } else {
                        if (x == "{" || x == "&") {
                            B += c(y[A].n, i(y[A].n));
                        } else {
                            if (x == "\n") {
                                B += l('"\\n"' + (y.length - 1 == A ? "" : " + i"));
                            } else {
                                if (x == "_v") {
                                    B += p(y[A].n, i(y[A].n));
                                } else {
                                    if (x === undefined) {
                                        B += l('"' + v(y[A]) + '"');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return B;
    }

    function h(y, C, B, A, x, z) {
        return "if(_.s(_." + B + '("' + v(C) + '",c,p,1),c,p,0,' + A + "," + x + ',"' + z + '")){_.rs(c,p,function(c,p,_){' + t(y) + "});c.pop();}";
    }

    function s(x, z, y) {
        return "if(!_.s(_." + y + '("' + v(z) + '",c,p,1),c,p,1,0,0,"")){' + t(x) + "};";
    }

    function d(x) {
        return '_.b(_.rp("' + v(x.n) + '",c,p,"' + (x.indent || "") + '"));';
    }

    function c(y, x) {
        return "_.b(_.t(_." + x + '("' + v(y) + '",c,p,0)));';
    }

    function p(y, x) {
        return "_.b(_.v(_." + x + '("' + v(y) + '",c,p,0)));';
    }

    function l(x) {
        return "_.b(" + x + ");";
    }
    n.parse = function (y, z, x) {
        x = x || {};
        return b(y, "", [], x.sectionTags || []);
    }, n.cache = {};
    n.compile = function (A, x) {
        x = x || {};
        var z = A + "||" + !! x.asString;
        var y = this.cache[z];
        if (y) {
            return y;
        }
        y = this.generate(this.parse(this.scan(A, x.delimiters), A, x), A, x);
        return this.cache[z] = y;
    };
})(typeof exports !== "undefined" ? exports : Hogan);
if (typeof define === "function") {
    define("lib/Hogan", Hogan);
}(function (b, a) {
    b.Mustache = {
        to_html: function (d, e) {
            var c = a.compile(d);
            return c.render(e);
        }
    };
})(window, Hogan);
(function (f) {
    var g = (function () {
        var n = "data-detect-oninput",
            k = {}, m = {}, o = 1,
            p = 1;
        var q = function (t, v, u, s) {
            if (t.addEventListener) {
                t.addEventListener(v, u, false);
            } else {
                if (t.attachEvent) {
                    t.attachEvent("on" + v, u);
                }
            }(k[s] || (k[s] = [])).push({
                t: v,
                h: u
            });
        };
        var r = function (v, s) {
            if (!k[s]) {
                return;
            }
            for (var u = 0, t; t = k[s][u]; u++) {
                if (v.removeEventListener) {
                    v.removeEventListener(t.t, t.h, false);
                } else {
                    if (v.detachEvent) {
                        v.detachEvent("on" + t.t, t.h);
                    }
                }
            }
            delete k[s];
        };
        var l = function (u, v) {
            var t = u.value;
            var s = function () {
                var w;
                if ((w = u.value) !== t) {
                    if (s._sleep !== true) {
                        v.call(u, w, t);
                    }
                    t = u.value;
                }
            };
            return s;
        };
        var j = navigator.userAgent.toLowerCase();
        return {
            version: "1.3",
            bind: function (t, x) {
                var u, s = x[n];
                if (!s) {
                    x[n] = s = o++;
                }
                if (!(u = t.getAttribute(n))) {
                    t.setAttribute(n, u = "" + p++);
                }
                var v = l(t, x);
                if ("oninput" in t && !/opera/.test(j)) {
                    q(t, "input", v, s);
                } else {
                    var w;
                    q(t, "focus", function () {
                        if (!w) {
                            w = setInterval(v, 100);
                        }
                    }, s);
                    q(t, "blur", function () {
                        if (w) {
                            clearInterval(w);
                            w = null;
                        }
                    }, s);
                }
                m[s] = {
                    eid: u,
                    checker: v
                };
                return t;
            },
            unbind: function (s, t) {
                if (t[n]) {
                    r(s, t[n]);
                    delete m[t[n]];
                }
                return s;
            },
            set: function (t, y) {
                var v = t.getAttribute(n);
                if (v) {
                    var x = [];
                    for (var u in m) {
                        if (m[u]["eid"] === v) {
                            x.push(m[u]["checker"]);
                            m[u]["checker"]._sleep = true;
                        }
                    }
                    t.value = y;
                    for (var w = 0, s = x.length; w < s; w++) {
                        x[w].call(t);
                        x[w]._sleep = false;
                    }
                } else {
                    t.value = y;
                }
            }
        };
    })();
    f.qsuggest = {
        version: "1.2"
    };
    var i = f.qsuggest.ROOT_KEY = "q-suggest";
    var d = 0;
    var c = {
        ajax: {
            url: null,
            cache: false,
            success: function () {}
        },
        reader: function (j) {
            return j;
        },
        loader: function (j) {
            return j;
        },
        max: 10,
        min: 1,
        container: null,
        delay: 100,
        rdelay: 1000,
        requestWithNothing: false,
        trimQuery: true,
        autoSelect: true,
        css: {
            "z-index": 500
        },
        setValue: function (j) {
            return j;
        },
        render: function (j) {
            return String(j).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        exattr: function (j) {
            return j;
        }
    };

    function b(j) {
        var k = j.offset();
        k.top += j.outerHeight();
        return k;
    }

    function h(j) {
        return j.closest("table").data("data")[j.attr("data-ind") * 1];
    }

    function a(r) {
        var s = this;
        var o = s.visible();
        var l = r.keyCode;
        if (l === 40 && !o) {
            s.show();
            return;
        }
        var j = s.el.find("tr");
        var q = j.filter(".active");
        switch (l) {
            case 38:
            case 40:
                if (o) {
                    s._excludeEl = s._mouseFocus;
                    q.removeClass("active");
                    var k = r.keyCode === 38 ? q.prev() : q.next();
                    if (k.size() === 0) {
                        k = j.filter(l === 38 ? ":last" : ":first");
                    }
                    var m = s.args.getData || h;
                    var n = m(k);
                    s.setValue(n);
                    k.addClass("active");
                    r.preventDefault();
                    s._trigger("q-suggest-user-action", [r.type, n, l, k]);
                }
                break;
            case 13:
                if (o) {
                    var n = s.getValue();
                    s.hide();
                    s._trigger("q-suggest-user-action", [r.type, n, l, q]);
                }
                break;
            case 27:
                if (o) {
                    s.hide();
                    s._trigger("q-suggest-user-action", [r.type, s.getValue(), l, q]);
                }
                break;
            case 18:
            case 9:
                break;
            default:
        }
    }

    function e(k, j) {
        if (!this.init) {
            return new qsuggest(k, j);
        } else {
            return this.init(k, j);
        }
    }
    f.extend(e.prototype, {
        init: function (m, l) {
            this.key = ++d;
            var n = this.ns = i + this.key;
            l = this.args = f.extend(true, {}, c, l || {});
            var o = this.activeEl = f(m);
            var k = this;
            this.el = f('<div class="' + i + (l.customClass ? " " + l.customClass : "") + '"></div>').appendTo(l.container || document.body).hide();
            this.el.data(i, this);
            this._handler = null;
            this._ajaxHandler = null;
            this._excludeEl = null;
            this._mouseFocus = null;
            this._last = [];
            this._cache = {};
            this._value = null;
            f.each(l.on || {}, function (q, p) {
                o.bind(q + "." + n, p);
            });
            if (l.css) {
                this.el.css(k.args.css);
            }
            var k = this;
            var j = false;
            o.bind("keydown." + n, function (p) {
                var q = p.keyCode;
                if (q >= 229) {
                    j = true;
                }
            });
            g.bind(o[0], function () {
                k.show();
            });
            o.bind("keydown." + n, function (p) {
                if (j) {
                    j = false;
                    return;
                }
                var q = k.args.keyevent || a;
                q.call(k, p);
                j = false;
            });
            o.bind("blur." + n, function (q) {
                if (k.visible()) {
                    var r = k.el.find("tr.active");
                    if (r.length > 0) {
                        var p = k.args.getData || h;
                        if (k.args.autoSelect) {
                            k.setValue(p(r));
                        }
                    } else {
                        k._trigger("q-suggest-noresult", [o]);
                    }
                    k.hide();
                }
            });
            f("tr", this.el[0]).live("mouseover." + n + " mouseout." + n + " mousedown." + n, function (q) {
                var s = f.nodeName(q.target, "tr") ? f(q.target) : f(q.target).parents("tr").eq(0);
                if (f(s[0]).attr("data-sug_type") == 1) {
                    q.preventDefault();
                    return;
                }
                var r = s[0] != k._excludeEl;
                if (q.type === "mouseover") {
                    if (r) {
                        s.parents().children().removeClass("active");
                        s.addClass("active");
                        k._excludeEl = null;
                    }
                    k._mouseFocus = s[0];
                } else {
                    if (q.type === "mouseout") {
                        k._mouseFocus = null;
                    } else {
                        var p = k.args.getData || h;
                        k.setValue(p(s));
                        k.hide();
                        k._trigger("q-suggest-user-action", [q.type, k.getValue(), null, s]);
                    }
                }
            });
            return this;
        },
        req: function () {
            var j = this;
            if (j._handler) {
                clearTimeout(j._handler);
            }
            if (j._timeoutHandler) {
                clearTimeout(j._timeoutHandler);
                j._timeoutHandler = null;
            }
            if (j._ajaxHandler) {
                j._ajaxHandler = null;
            }
            j._handler = setTimeout(function () {
                var l = j.activeEl.val(),
                    p = j.args.loader(l),
                    o = null,
                    k;
                if (j.args.trimQuery) {
                    p = f.trim(p);
                }
                if (!p && !j.args.requestWithNothing) {
                    j.draw(null);
                    return;
                }
                if (j._last && j._last[0] === p) {
                    j.draw(j._last[1]);
                    return;
                }
                if (j._last && j._last[0] == p) {
                    o = j._last;
                } else {
                    if (j.args.cache && j._cache[p]) {
                        o = j._cache[p];
                    }
                }
                var m = typeof j.args.ajax.url == "function" ? j.args.ajax.url() : j.args.ajax.url;
                if (o) {
                    j.draw((j._last = o)[1]);
                } else {
                    if (!m) {
                        j.draw(null);
                    } else {
                        m = m.replace(/\*|([^*]+)$/, encodeURIComponent(p) + "$1");
                        var n = j.args.ajax.success;
                        j._timeoutHandler = setTimeout(function () {
                            j.hide();
                        }, j.args.rdelay);
                        j._ajaxHandler = f.ajax(f.extend({}, j.args.ajax, {
                            url: m,
                            success: function (s, q) {
                                clearTimeout(j._timeoutHandler);
                                j._timeoutHandler = null;
                                j._ajaxHandler = null;
                                if (l !== j.activeEl.val()) {
                                    return;
                                }
                                var r = j.args.reader.call(j, s, q);
                                if (j.type(r) === "Array") {
                                    j.draw(r);
                                    j._last = j._cache[p] = [p, r, q];
                                }
                                n.apply(this, arguments);
                            }
                        }));
                    }
                }
            }, j.args.delay);
        },
        type: function (j) {
            return Object.prototype.toString.call(j).slice(8, -1);
        },
        show: function () {
            this.req();
        },
        hide: function () {
            if (this.visible()) {
                this.el.hide();
                this._trigger("q-suggest-hide");
            }
        },
        draw: function (s) {
            var u = this;
            this.el.empty();
            var q = this.args.min,
                v = this.args.max;
            if (!s || !s.length || s.length < q) {
                this.hide();
                return;
            }
            var w = [],
                k = this.args.render,
                t = this.args.exattr,
                y = true;
            var p = f.type(this.args.firstChoose) === "undefined" ? true : this.args.firstChoose;
            var j = f.type(this.args.firstFunc) === "undefined" ? function () {
                return true;
            } : this.args.firstFunc;
            w.push('<table cellspacing="0" cellpadding="2"><tbody>');
            f.each(s, function (x, o) {
                if (x >= v) {
                    return false;
                }
                var z = "";
                var r = j;
                if (y && p && r(o)) {
                    y = false;
                    z = ' class="active" ';
                }
                w.push("<tr", z, ' data-ind="', x, '" ', t(o), "><td>", k(o), "</td></tr>");
            });
            w.push("</tbody></table>");
            var n = f(w.join("")).appendTo(this.el).data("data", s);
            if (!this.args.container) {
                this.el.css(b(this.activeEl));
            }
            var m = this.args.width,
                l = this.activeEl.outerWidth();
            if (typeof m === "function") {
                m = m();
            }
            if (!m || m < l) {
                m = l;
            }
            this.el.css("width", m);
            this.el.show();
            this._trigger("q-suggest-show", [s]);
        },
        dispose: function () {
            this._trigger("q-suggest-dispose");
            this.activeEl.unbind("." + this.ns);
            f(window).unbind("." + this.ns);
            this.el.remove();
        },
        visible: function () {
            return this.el.is(":visible");
        },
        _trigger: function () {
            this.activeEl.triggerHandler.apply(this.activeEl, arguments);
        },
        setValue: function (j) {
            g.set(this.activeEl[0], j);
            this._value = j;
            this._setExtData();
            this._trigger("q-suggest-setvalue", [j, this.activeEl]);
        },
        _setExtData: function () {
            var k = this.el.find("tr.active");
            var j = this.args.getExtData ? this.args.getExtData(this.el.find("tr.active")) : {};
            this._trigger("q-suggest-setextdata", [j, this.activeEl]);
        },
        getValue: function () {
            return this._value;
        },
        set: function (m, n) {
            var o = false;
            switch (m) {
                case "container":
                    this.el.appendTo(n || document.body);
                    this.el.css({
                        top: "",
                        left: ""
                    });
                    break;
            }
            if (!o) {
                for (var l = 0, k = m.split("."), j = k.length, p = this.args; l < j && (l !== j - 1 && (p[k[l]] || (p[k[l]] = {})) || (p[k[l]] = n)); p = p[k[l]], l++) {}
            }
            return n;
        },
        get: function (m) {
            for (var l = 0, n = this.args, k = m.split("."), j = k.length; l < j && (n = n[k[l]]); l++) {}
            return n;
        }
    });
    f.fn.qsuggest = function () {
        var j = arguments;
        if (arguments.length > 1 && this.data(i)) {
            var k = null;
            if (arguments[0] === "option" || arguments[0] === "setting") {
                this.each(function (o, n) {
                    var m = f(n);
                    var l = this.data(i);
                    if (l) {
                        k = k || (j.length > 2 ? l.set(j[1], j[2]) : l.get(j[1]));
                    }
                });
            }
            return k;
        } else {
            if (arguments.length <= 1) {
                this.each(function (o, n) {
                    var m = f(n);
                    if (m.data(i)) {
                        m.data(i).dispose();
                        m.removeData(i);
                    }
                    var l = new e(n, j[0]);
                    m.data(i, l);
                });
            }
        }
        return this;
    };
})(jQuery);
(function (i) {
    var f = this.jQuery;
    var d = f(document.body);
    var h = "PLACEHOLDER-INPUT";
    var g = "PLACEHOLDER-LABEL";
    var a = false;
    var e = {
        labelClass: "PlaceHolder",
        labelStyle: ""
    };
    var k = Math;

    function b() {
        var l = f(this),
            m = f(l.data(g));
        m.css("display", "none");
    }

    function j() {
        var l = this;
        setTimeout(function () {
            var u = f(l);
            var m = u.attr("id");
            if (!f("#" + m).length) {
                u.unplaceholder();
                return;
            }
            var q = u.position(),
                o = u.css("marginLeft"),
                n = u.css("marginTop");
            if (u.attr("placeholder")) {
                u.attr("data-placeholder", u.attr("placeholder")).removeAttr("placeholder");
            }
            var t = f(u.data(g)).css({
                left: q.left,
                top: Math.max(q.top - 1, 0),
                "margin-left": o,
                "margin-top": n,
                display: !! u.val() ? "none" : "block"
            }).text(u.attr("data-placeholder"));
            var v = u.attr("data-placeholder-css");
            if (v) {
                var s = v.split(";");
                for (var p = s.length; p--; p > 0) {
                    var r = s[p].split(":");
                    t.css(r[0], r[1]);
                }
            }
        }, 200);
    }

    function c() {
        if (a) {
            return;
        }
        d.delegate("." + h, "click", b);
        d.delegate("." + h, "focusin", b);
        d.delegate("." + h, "focusout", j);
        var l = true;
        a = true;
    }
    f.fn.placeholder = function (l) {
        c();
        var m = f.extend({}, e, l);
        this.each(function () {
            var p = Math.random().toString(32).replace(/\./, ""),
                n = f(this),
                o = f('<label style="position:absolute;display:none;top:0;left:0;cursor:text"></label>');
            if ((!n.attr("data-placeholder") && !n.attr("placeholder")) || n.data(h) === h) {
                return;
            }
            if (!n.attr("id")) {
                n.attr("id", "input_" + p);
            }
            o.attr("id", n.attr("id") + "_placeholder").data(h, "#" + n.attr("id")).attr("for", n.attr("id")).addClass(m.labelClass).addClass(m.labelClass + "-for-" + this.tagName.toLowerCase()).addClass(g).text(n.attr("data-placeholder"));
            n.data(g, "#" + o.attr("id")).data(h, h).addClass(h).after(o).attr("data-placeholder-css", m.labelStyle).attr("data-placeholder", n.attr("placeholder")).removeAttr("placeholder");
            o.click(function (q) {
                n.focus();
            });
            b.call(this);
            j.call(this);
        });
    };
    f.fn.unplaceholder = function () {
        this.each(function () {
            var l = f(this),
                m = f(l.data(g));
            if (l.data(h) !== h) {
                return;
            }
            m.remove();
            l.removeData(h).removeData(g).removeClass(h);
        });
    };
})();
QNR.InputCmp = (function (e, c) {
    var d = 0;
    var a = {
        maxlength: 150,
        s_msg: ".js_msg",
        s_submit: ".js_submit"
    };
    var b = function (g) {
        b.$super.call(this);
        var h = this.opts = g;
        this._dom = h.dom;
        this._input = this._dom.find(h.s_input);
        this._maxlength = h.maxlength || a.maxlength;
        this._msg_dom = this._dom.find(h.s_msg || a.s_msg);
        this._submit_btn = this._dom.find(h.s_submit || a.s_submit);
        this._init();
    };
    c.extend(b, c.Event, {
        _init: function () {
            this._cid = "input_cmp_" + (++d);
            this._initEvents();
            this.reset();
        },
        _initEvents: function () {
            var g = this._input;
            var h = this;
            var j = h._cid;
            g.attr("placeholder") && g.placeholder({
                labelStyle: "font-size:12px;"
            });
            var i = {
                focus: h.opts.focus,
                blur: h.opts.blur,
                input: h._check,
                propertychange: h._check
            };
            if (h.opts.key_submit) {
                i.keyup = function (k) {
                    if (k.ctrlKey == true && k.keyCode == 13) {
                        h._postData();
                    }
                };
            }
            f(g, i, h);
            this._submit_btn.length && this._submit_btn.click(e.proxy(h._postData, h));
            if (c.Browser.isIE9) {
                g.bind("keyup", function (k) {
                    if (k.keyCode == 8 || k.keyCode == 46) {
                        g.trigger("input");
                    }
                });
            }
        },
        _check: function () {
            var g = this._input,
                h = this._maxlength;
            var i = g.val();
            if (i.length > h) {
                this._msg_dom.html("最多不能超过" + h + "个字").css("color", "#FF6600").show();
                return false;
            } else {
                if (i.length > 0) {
                    this._msg_dom.html("还可以输入<span style='color:#FF6600'>" + (h - i.length) + "</span>个字").css("color", "#555").show();
                    return true;
                } else {
                    this._msg_dom.hide();
                    return false;
                }
            }
        },
        _postData: function (i) {
            i.preventDefault();
            var g = this._input,
                j = e.trim(g.val());
            var h = this.opts.post;
            if (j && this._check() && c.isFunction(h)) {
                h(j, this);
            } else {
                if (j) {
                    this._msg_dom.html("输入内容字数已经超出限制").css("color", "#FF6600").show();
                } else {
                    this._msg_dom.html("请输入内容再发表").css("color", "#FF6600").show();
                }
            }
        },
        getSubmitBtn: function () {
            return this._submit_btn;
        },
        getInputDom: function () {
            return this._input;
        },
        getMsgDom: function () {
            return this._msg_dom;
        },
        showMsg: function (g) {
            this._msg_dom.html(c.HTMLEncode(g)).css("color", "#FF6600").show();
        },
        getDom: function () {
            return this._dom;
        },
        getValue: function () {
            return e.trim(this._input.val());
        },
        reset: function (g) {
            this._input.val("");
            this._msg_dom.hide();
        }
    });

    function f(k, j, g) {
        g = g || null;
        for (var i in j) {
            var h = j[i];
            if (c.isFunction(h)) {
                k.bind(i, e.proxy(h, g));
            }
        }
        return k;
    }
    return b;
})(jQuery, QNR);
(function (d, i, m) {
    if (m.Dialog) {
        return;
    }
    var f = !! (d.browser.msie),
        b = (f && d.browser.version === "6.0"),
        g = d(i.document),
        o = d("body"),
        l = d(i);
    var c = 16;
    d(function () {
        o = d("body");
    });
    var n = '<div class="dlg_mask"></div>',
        j = '<div class="g_dlg_box"></div>';
    var h = "dlg",
        t = ids = 0,
        r = 100000;
    var p = {
        content: "",
        maskVisible: true,
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        newMask: false,
        contentStyle: "",
        borderStyle: "",
        titleStyle: "",
        closeCls: "",
        closeBtn: {
            handler: function (v) {
                v.close();
            }
        },
        hideCloseBtn: false
    };
    var s = function (y, x) {
        var v = {}, w;
        for (w in x) {
            if (x.hasOwnProperty(w)) {
                v[w] = typeof y[w] !== "undefined" ? y[w] : x[w];
            }
        }
        return v;
    };
    var k = function () {
        var v = l;
        return {
            scrollTop: g.scrollTop(),
            scrollLeft: g.scrollLeft(),
            width: v.width(),
            height: v.height()
        };
    };
    var q = "dlg_mask_";
    var u = function () {
        this.id = q + (++t);
        this._dom = d('<div id="' + (this.id) + '" class="dlg_mask" style="z-index:' + (++r) + '"></div>');
        this._init();
    };
    u.prototype = {
        _init: function () {
            o.append(this._dom);
            this._dom.hide();
            this._initEvents();
            this.adaptWin();
            if (this._needIframe() || true) {
                this._createIframe();
            }
        },
        _initEvents: function () {
            var v = this;
        },
        _createIframe: function () {
            this._iframe = d('<iframe class="dlg_miframe" frameborder="0" src="about:blank"></iframe>');
            this._dom.append(this._iframe);
        },
        _needIframe: function () {
            var v = !! i.ActiveXObject && ((b && d("select").length) || d("object").length);
            return v;
        },
        adaptWin: function () {
            if (b) {
                this._dom.css({
                    top: g.scrollTop(),
                    left: g.scrollLeft(),
                    height: l.height(),
                    width: l.width()
                });
            }
        },
        hide: function () {
            this._dom.hide();
            var v = d("html").css("overflow", "");
            if (b) {
                v.css("padding-right", "0px");
            }
        },
        show: function () {
            var w = this;
            var v = d("html").css("overflow", "hidden");
            w._dom.show();
            if (b) {
                v.css("padding-right", c + "px");
            }
        },
        getDom: function () {
            return this._dom;
        },
        remove: function () {
            this._dom.remove();
        }
    };
    var a;
    var e = function (v) {
        var w = v || {};
        this.config = s(w, p);
        this._init();
    };
    e.prototype = {
        constructor: e,
        _init: function () {
            if (!this.config) {
                return;
            }
            this.id = h + (++ids);
            var v = this.config;
            if (v.newMask) {
                this._mask = new u();
            } else {
                if (!a) {
                    a = new u();
                    this._mask = a;
                } else {
                    this._mask = a;
                }
            }
            this._creatDialog();
            this._initEvents();
            this.inited = true;
        },
        _initEvents: function () {
            var w = this,
                x = this.id;
            this._closeBtn.bind({
                click: function (y) {
                    y.preventDefault();
                    w.config.closeBtn.handler.call(w, w);
                }
            });
            l.bind("resize." + x, v);
            w._unbindEvents = function () {
                l.unbind("resize." + x);
            };

            function v() {
                if (b) {
                    w._dlg_container.css({
                        top: g.scrollTop(),
                        left: g.scrollLeft(),
                        width: l.width(),
                        height: l.height()
                    });
                } else {
                    w._dlg_container.css({
                        width: l.width(),
                        height: l.height()
                    });
                }
                w.toCenter();
                w._mask.adaptWin();
            }
        },
        _creatDialog: function () {
            var v = this.config;
            var y = this._dlg_container = d(j).attr("id", this.id).css("z-index", (r += 10));
            if (v.content instanceof d) {
                this._dialog = v.content;
            } else {
                this._dialog = d(v.content);
            }
            var w = this._dialog;
            w.addClass("g_dlg_wrap_css3");
            y.html(w);
            this._content = d(".js_content", w);
            this._closeBtn = d(".js_close", w);
            o.append(y);
            if (v.hideCloseBtn) {
                this._closeBtn.hide();
            }
            var x = "fixed";
            if (b) {
                y.css({
                    top: g.scrollTop(),
                    left: g.scrollLeft(),
                    width: l.width(),
                    height: l.height()
                });
                x = "absoulte";
            } else {
                y.css({
                    width: l.width(),
                    height: l.height()
                });
            }
            w.css("position", "absolute");
            this.setPos(x);
        },
        setPos: function (v) {
            this._dlg_container.css("position", v);
        },
        getContainer: function () {
            return this._dlg_container;
        },
        getContent: function () {
            return this._content;
        },
        setContent: function (v) {
            this._content.empty();
            this._content.html(v);
        },
        getCloseBtn: function () {
            return this._closeBtn;
        },
        _setStyle: function (w, v) {
            if (typeof v == "string") {
                if (f) {
                    w[0].style.cssText = v;
                } else {
                    w.attr("style", v);
                }
            } else {
                w.css(v);
            }
        },
        toCenter: function () {
            var A = k(),
                x = this._dialog.width(),
                z = this._dialog.height(),
                y = 0,
                v = 0;
            var D = Math.max((A.height / 2 - z / 2) >> 0 + y, 0);
            var C = (A.width / 2 - x / 2) >> 0 + v;
            if (b) {
                C -= c / 2;
            }
            var B = {
                left: C,
                top: D
            };
            this._dialog.css(B);
            return this;
        },
        show: function (x, v) {
            var w = this;
            if (w.config.maskVisible) {
                w._mask.show();
            }
            w._dlg_container.css({
                width: l.width(),
                height: l.height()
            });
            w._dlg_container.show();
            w.toCenter();
            if (x) {
                x.call(v || w, w);
            }
            w.showed = true;
            return this;
        },
        close: function (x, v) {
            var w = this;
            this._mask.hide();
            this._dlg_container.hide();
            if (x) {
                x.call(v || w, w);
            }
            this.showed = false;
            return this;
        },
        destory: function () {
            this.close();
            this._unbindEvents();
            this.config.newMask && this._mask.remove();
            this._dlg_container.remove();
            this._dialog.remove();
            for (var v in this) {
                delete this[v];
            }
        },
        getMask: function () {
            return this._mask;
        }
    };
    e.prototype.In = e.prototype.show;
    e.prototype.out = e.prototype.close;
    e.prototype.hide = e.prototype.close;
    e.prototype.remove = e.prototype.destory;
    m.Dialog = e;
    m.popMsg = function (w) {
        var v = new e({
            maskVisible: false,
            newMask: true,
            content: ['<div class="pop_msg" style="position:relative;" ><table><tr><td>', w, '</td></tr></table><i class="js_close" style="position:absolute;width:16px;height:20px;right:5px;top:5px;"></i></div>'].join(""),
            closeBtn: {
                handler: function (y) {
                    if (x) {
                        clearTimeout(x);
                    }
                    y.remove();
                }
            }
        });
        v.show();
        var x = setTimeout(function () {
            v.remove();
        }, 1500);
    };
})(jQuery, window, QNR);
(function (c) {
    var b = c.scrollTo = function (e, d, f) {
        c(window).scrollTo(e, d, f);
    };
    b.defaults = {
        axis: "xy",
        duration: parseFloat(c.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    b.window = function (d) {
        return c(window)._scrollable();
    };
    c.fn._scrollable = function () {
        return this.map(function () {
            var e = this,
                f = !e.nodeName || c.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!f) {
                return e;
            }
            var d = (e.contentWindow || e).document || e.ownerDocument || e;
            return /webkit/i.test(navigator.userAgent) || d.compatMode == "BackCompat" ? d.body : d.documentElement;
        });
    };
    c.fn.scrollTo = function (i, h, d) {
        if (typeof h == "object") {
            d = h;
            h = 0;
        }
        if (typeof d == "function") {
            d = {
                onAfter: d
            };
        }
        if (i == "max") {
            i = 9000000000;
        }
        d = c.extend({}, b.defaults, d);
        h = h || d.duration;
        d.queue = d.queue && d.axis.length > 1;
        if (d.queue) {
            h /= 2;
        }
        d.offset = a(d.offset);
        d.over = a(d.over);
        return this._scrollable().each(function () {
            if (i == null) {
                return;
            }
            var m = this,
                j = c(m),
                k = i,
                g, e = {}, l = j.is("html,body");
            switch (typeof k) {
                case "number":
                case "string":
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)) {
                        k = a(k);
                        break;
                    }
                    k = c(k, this);
                    if (!k.length) {
                        return;
                    }
                case "object":
                    if (k.is || k.style) {
                        g = (k = c(k)).offset();
                    }
            }
            c.each(d.axis.split(""), function (s, q) {
                var o = q == "x" ? "Left" : "Top",
                    u = o.toLowerCase(),
                    r = "scroll" + o,
                    p = m[r],
                    n = b.max(m, q);
                if (g) {
                    e[r] = g[u] + (l ? 0 : p - j.offset()[u]);
                    if (d.margin) {
                        e[r] -= parseInt(k.css("margin" + o)) || 0;
                        e[r] -= parseInt(k.css("border" + o + "Width")) || 0;
                    }
                    e[r] += d.offset[u] || 0;
                    if (d.over[u]) {
                        e[r] += k[q == "x" ? "width" : "height"]() * d.over[u];
                    }
                } else {
                    var t = k[u];
                    e[r] = t.slice && t.slice(-1) == "%" ? parseFloat(t) / 100 * n : t;
                } if (d.limit && /^\d+$/.test(e[r])) {
                    e[r] = e[r] <= 0 ? 0 : Math.min(e[r], n);
                }
                if (!s && d.queue) {
                    if (p != e[r]) {
                        f(d.onAfterFirst);
                    }
                    delete e[r];
                }
            });
            f(d.onAfter);

            function f(n) {
                j.animate(e, h, d.easing, n && function () {
                    n.call(this, i, d);
                });
            }
        }).end();
    };
    b.max = function (h, g) {
        var k = g == "x" ? "Width" : "Height",
            f = "scroll" + k;
        if (!c(h).is("html,body")) {
            return h[f] - c(h)[k.toLowerCase()]();
        }
        var j = "client" + k,
            i = h.ownerDocument.documentElement,
            e = h.ownerDocument.body;
        return Math.max(i[f], e[f]) - Math.min(i[j], e[j]);
    };

    function a(d) {
        return typeof d == "object" ? d : {
            top: d,
            left: d
        };
    }
})(jQuery);
(function () {
    this.ConfirmDialog = function (a) {
        this.init(a);
    };
    ConfirmDialog.prototype = {
        init: function (a) {
            this.initDialog(a);
            this._init_events();
        },
        initDialog: function (a) {
            this.dialog = new QNR.Dialog({
                content: a,
                titleVisible: false,
                contentStyle: {
                    background: "#fff"
                },
                closeCls: "dlg_close_black",
                borderStyle: {
                    "border-width": "0px"
                },
                hideCloseBtn: true,
                width: "300px"
            });
            this.dom = this.dialog.getContainer();
        },
        _init_events: function () {
            var b = this.dom;
            var a = this;
            b.delegate(".ke-dialog-yes", "click", function (c) {
                c.preventDefault();
                a.dialog.close();
                a.callbacks.ok();
            });
            b.delegate(".ke-dialog-no", "click", function (c) {
                c.preventDefault();
                a.callbacks.cancel();
            });
            b.delegate(".ke-dialog-icon-close", "click", function (c) {
                c.preventDefault();
                a.dialog.close();
            });
        },
        setCallbacks: function (c, b) {
            var a = this;
            this.callbacks = {
                ok: c || null,
                cancel: b || function () {
                    a.dialog.close();
                }
            };
            return this.dialog;
        }
    };
})();
QNR.NewInputCmp = (function (b, a) {
    var c = function (d) {
        c.$super.call(this, d);
    };
    a.extend(c, a.InputCmp, {
        reset: function (d) {
            this._msg_dom.hide();
            d && this._input.focus();
        },
        check: function () {
            return this._check();
        },
        setMaxLength: function (d) {
            this._maxlength = d;
        },
        _check: function () {
            var e = this._input,
                f = this._maxlength;
            var g = e.val();
            var d = a.countStr(g);
            if (d > f) {
                this._msg_dom.html("最多不能超过" + f + "个字").css("color", "#FF6600").show();
                return false;
            } else {
                this._msg_dom.html("还可以输入<span style='color:#FF6600'>" + Math.round(f - d) + "</span>个字").css("color", "#555").show();
                return true;
            }
        }
    });
    return c;
})(jQuery, QNR);
$(function () {
    if ($("#js_msgTip").length && (QNR.travelSpace == undefined || QNR.travelSpace.travelSpaceTip == undefined)) {
        var a = "http://travel.qunar.com/travelbook/qzzCommon.js?_=" + (new Date()).getTime();
        var b = "http://qunarzz.com/travel_common/prd/scripts/exports/travelSpaceTip-srclist.js";
        var c = this;
        QNR.loadJS(a, function () {
            b = b.replace("srclist", QZZ_VER["travel-common"]);
            QNR.loadListJs([b], function () {
                QNR.travelSpace.travelSpaceTip.change();
            });
        });
    }
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.advice_dialog = new Hogan.Template(function (e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('	<div class="b_dialog b_askadvice" id="js_advice_dialog" style="width: 540px;">');
    a.b("\n" + b);
    a.b('		<div class="e_dialog_hd">求建议咯~</div>');
    a.b("\n" + b);
    a.b('		<div class="e_dialog_ct">');
    a.b("\n" + b);
    a.b('			<div class="e_askadvice">');
    a.b("\n" + b);
    a.b('				<div class="e_info_describe js_advice_input">');
    a.b("\n" + b);
    a.b('					<div class="info_error right js_advice_more_words" style="display:block; color:rgb(85, 85, 85);">');
    a.b("\n" + b);
    a.b('						还可以输入<span style="color:#FF6600">119</span>个字');
    a.b("\n" + b);
    a.b("					</div>");
    a.b("\n" + b);
    a.b('					<div class="textarea_box">');
    a.b("\n" + b);
    a.b('						<textarea class="textarea PLACEHOLDER-INPUT" cols="5" rows="5" id="input_00i2gua"></textarea>');
    a.b("\n" + b);
    a.b("					</div>");
    a.b("\n" + b);
    a.b('					<div class="info_error js_advice_msg" style="display:none;"></div>');
    a.b("\n" + b);
    a.b("				</div>");
    a.b("\n" + b);
    a.b('				<div class="e_info_share">');
    a.b("\n" + b);
    a.b('					<div class="title">发给以下账户好友，看看大家的意见吧~</div>');
    a.b("\n" + b);
    a.b('					<div class="share_type clrfix">');
    a.b("\n" + b);
    a.b('						<div class="type"><a class="icon_type icon_sina_d js_advice_sina" data-beacon="Click _advice_sina" href="http://oauth.qunar.com/oauth-client/sina/login?appname=www&reference=ext&method=login&ret=http%3a%2f%2ftravel.qunar.com%2fspace%2ftools%2fpartnerback" target="_blank"><span>sina</span></a></div>');
    a.b("\n" + b);
    a.b('						<div class="type"><a class="icon_type icon_qq_d js_advice_qq" data-beacon="Click _advice_tencent" href="http://oauth.qunar.com/oauth-client/qq/login?reference=ext&method=login&ret=http%3a%2f%2ftravel.qunar.com%2fspace%2ftools%2fpartnerback" target="_blank"><span>qq</span></a></div>');
    a.b("\n" + b);
    a.b('						<div class="type"><a class="icon_type icon_pp_d js_advice_renren" data-beacon="Click _advice_renren" href="http://oauth.qunar.com/oauth-client/renren/login?reference=ext&method=login&ret=http%3a%2f%2ftravel.qunar.com%2fspace%2ftools%2fpartnerback" target="_blank"><span>人人</span></a></div>');
    a.b("\n" + b);
    a.b("					</div>");
    a.b("\n" + b);
    a.b("				</div>");
    a.b("\n" + b);
    a.b("			</div>");
    a.b("\n" + b);
    a.b("		</div>");
    a.b("\n" + b);
    a.b('		<div class="e_dialog_ft">');
    a.b("\n" + b);
    a.b('			<div class="box_ops">');
    a.b("\n" + b);
    a.b('				<button class="ops_btn js_advice_submit">发送</button>');
    a.b("\n" + b);
    a.b("			</div>");
    a.b("\n" + b);
    a.b("		</div>");
    a.b("\n" + b);
    a.b('		<a href="javascript:;" class="btn_close js_close" title="关闭">x</a>');
    a.b("\n" + b);
    a.b("	</div>");
    return a.fl();
});
var SWFUpload;
if (SWFUpload == undefined) {
    SWFUpload = function (a) {
        this.initSWFUpload(a);
    };
}
SWFUpload.prototype.initSWFUpload = function (b) {
    try {
        this.customSettings = {};
        this.settings = b;
        this.eventQueue = [];
        this.movieName = "SWFUpload_" + SWFUpload.movieCount++;
        this.movieElement = null;
        SWFUpload.instances[this.movieName] = this;
        this.initSettings();
        this.loadFlash();
        this.displayDebugInfo();
    } catch (a) {
        delete SWFUpload.instances[this.movieName];
        throw a;
    }
};
SWFUpload.instances = {};
SWFUpload.movieCount = 0;
SWFUpload.version = "2.2.0 2009-03-25";
SWFUpload.QUEUE_ERROR = {
    QUEUE_LIMIT_EXCEEDED: -100,
    FILE_EXCEEDS_SIZE_LIMIT: -110,
    ZERO_BYTE_FILE: -120,
    INVALID_FILETYPE: -130
};
SWFUpload.UPLOAD_ERROR = {
    HTTP_ERROR: -200,
    MISSING_UPLOAD_URL: -210,
    IO_ERROR: -220,
    SECURITY_ERROR: -230,
    UPLOAD_LIMIT_EXCEEDED: -240,
    UPLOAD_FAILED: -250,
    SPECIFIED_FILE_ID_NOT_FOUND: -260,
    FILE_VALIDATION_FAILED: -270,
    FILE_CANCELLED: -280,
    UPLOAD_STOPPED: -290
};
SWFUpload.FILE_STATUS = {
    QUEUED: -1,
    IN_PROGRESS: -2,
    ERROR: -3,
    COMPLETE: -4,
    CANCELLED: -5
};
SWFUpload.BUTTON_ACTION = {
    SELECT_FILE: -100,
    SELECT_FILES: -110,
    START_UPLOAD: -120
};
SWFUpload.CURSOR = {
    ARROW: -1,
    HAND: -2
};
SWFUpload.WINDOW_MODE = {
    WINDOW: "window",
    TRANSPARENT: "transparent",
    OPAQUE: "opaque"
};
SWFUpload.completeURL = function (a) {
    if (typeof (a) !== "string" || a.match(/^https?:\/\//i) || a.match(/^\//)) {
        return a;
    }
    var c = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    var b = window.location.pathname.lastIndexOf("/");
    if (b <= 0) {
        path = "/";
    } else {
        path = window.location.pathname.substr(0, b) + "/";
    }
    return path + a;
};
SWFUpload.prototype.initSettings = function () {
    this.ensureDefault = function (b, a) {
        this.settings[b] = (this.settings[b] == undefined) ? a : this.settings[b];
    };
    this.ensureDefault("upload_url", "");
    this.ensureDefault("preserve_relative_urls", false);
    this.ensureDefault("file_post_name", "Filedata");
    this.ensureDefault("post_params", {});
    this.ensureDefault("use_query_string", false);
    this.ensureDefault("requeue_on_error", false);
    this.ensureDefault("http_success", []);
    this.ensureDefault("assume_success_timeout", 0);
    this.ensureDefault("file_types", "*.*");
    this.ensureDefault("file_types_description", "All Files");
    this.ensureDefault("file_size_limit", 0);
    this.ensureDefault("file_upload_limit", 0);
    this.ensureDefault("file_queue_limit", 0);
    this.ensureDefault("flash_url", "swfupload.swf");
    this.ensureDefault("prevent_swf_caching", true);
    this.ensureDefault("button_image_url", "");
    this.ensureDefault("button_width", 1);
    this.ensureDefault("button_height", 1);
    this.ensureDefault("button_text", "");
    this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
    this.ensureDefault("button_text_top_padding", 0);
    this.ensureDefault("button_text_left_padding", 0);
    this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
    this.ensureDefault("button_disabled", false);
    this.ensureDefault("button_placeholder_id", "");
    this.ensureDefault("button_placeholder", null);
    this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
    this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW);
    this.ensureDefault("debug", false);
    this.settings.debug_enabled = this.settings.debug;
    this.settings.return_upload_start_handler = this.returnUploadStart;
    this.ensureDefault("swfupload_loaded_handler", null);
    this.ensureDefault("file_dialog_start_handler", null);
    this.ensureDefault("file_queued_handler", null);
    this.ensureDefault("file_queue_error_handler", null);
    this.ensureDefault("file_dialog_complete_handler", null);
    this.ensureDefault("upload_start_handler", null);
    this.ensureDefault("upload_progress_handler", null);
    this.ensureDefault("upload_error_handler", null);
    this.ensureDefault("upload_success_handler", null);
    this.ensureDefault("upload_complete_handler", null);
    this.ensureDefault("debug_handler", this.debugMessage);
    this.ensureDefault("custom_settings", {});
    this.customSettings = this.settings.custom_settings;
    if ( !! this.settings.prevent_swf_caching) {
        this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + new Date().getTime();
    }
    if (!this.settings.preserve_relative_urls) {
        this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url);
        this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url);
    }
    delete this.ensureDefault;
};
SWFUpload.prototype.loadFlash = function () {
    var a, b;
    if (document.getElementById(this.movieName) !== null) {
        throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
    }
    a = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder;
    if (a == undefined) {
        throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
    }
    b = document.createElement("div");
    b.innerHTML = this.getFlashHTML();
    a.parentNode.replaceChild(b.firstChild, a);
    if (window[this.movieName] == undefined) {
        window[this.movieName] = this.getMovieElement();
    }
};
SWFUpload.prototype.getFlashHTML = function () {
    return ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="menu" value="false" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>"].join("");
};
SWFUpload.prototype.getFlashVars = function () {
    var b = this.buildParamString();
    var a = this.settings.http_success.join(",");
    return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(a), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(b), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("");
};
SWFUpload.prototype.getMovieElement = function () {
    if (this.movieElement == undefined) {
        this.movieElement = document.getElementById(this.movieName);
    }
    if (this.movieElement === null) {
        throw "Could not find Flash element";
    }
    return this.movieElement;
};
SWFUpload.prototype.buildParamString = function () {
    var c = this.settings.post_params;
    var b = [];
    if (typeof (c) === "object") {
        for (var a in c) {
            if (c.hasOwnProperty(a)) {
                b.push(encodeURIComponent(a.toString()) + "=" + encodeURIComponent(c[a].toString()));
            }
        }
    }
    return b.join("&amp;");
};
SWFUpload.prototype.destroy = function () {
    try {
        this.cancelUpload(null, false);
        var a = null;
        a = this.getMovieElement();
        if (a && typeof (a.CallFunction) === "unknown") {
            for (var c in a) {
                try {
                    if (typeof (a[c]) === "function") {
                        a[c] = null;
                    }
                } catch (e) {}
            }
            try {
                a.parentNode.removeChild(a);
            } catch (b) {}
        }
        window[this.movieName] = null;
        SWFUpload.instances[this.movieName] = null;
        delete SWFUpload.instances[this.movieName];
        this.movieElement = null;
        this.settings = null;
        this.customSettings = null;
        this.eventQueue = null;
        this.movieName = null;
        return true;
    } catch (d) {
        return false;
    }
};
SWFUpload.prototype.displayDebugInfo = function () {
    this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "\t", "upload_url:               ", this.settings.upload_url, "\n", "\t", "flash_url:                ", this.settings.flash_url, "\n", "\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "\t", "http_success:             ", this.settings.http_success.join(", "), "\n", "\t", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "\t", "file_post_name:           ", this.settings.file_post_name, "\n", "\t", "post_params:              ", this.settings.post_params.toString(), "\n", "\t", "file_types:               ", this.settings.file_types, "\n", "\t", "file_types_description:   ", this.settings.file_types_description, "\n", "\t", "file_size_limit:          ", this.settings.file_size_limit, "\n", "\t", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "\t", "debug:                    ", this.settings.debug.toString(), "\n", "\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "\t", "button_placeholder:       ", (this.settings.button_placeholder ? "Set" : "Not Set"), "\n", "\t", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "\t", "button_width:             ", this.settings.button_width.toString(), "\n", "\t", "button_height:            ", this.settings.button_height.toString(), "\n", "\t", "button_text:              ", this.settings.button_text.toString(), "\n", "\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "\t", "button_action:            ", this.settings.button_action.toString(), "\n", "\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "\t", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n", "\t", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler === "function").toString(), "\n", "\t", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n", "\t", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n", "\t", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n", "\t", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n", "\t", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n", "\t", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n", "\t", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n", "\t", "debug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\n"].join(""));
};
SWFUpload.prototype.addSetting = function (b, c, a) {
    if (c == undefined) {
        return (this.settings[b] = a);
    } else {
        return (this.settings[b] = c);
    }
};
SWFUpload.prototype.getSetting = function (a) {
    if (this.settings[a] != undefined) {
        return this.settings[a];
    }
    return "";
};
SWFUpload.prototype.callFlash = function (functionName, argumentArray) {
    argumentArray = argumentArray || [];
    var movieElement = this.getMovieElement();
    var returnValue, returnString;
    try {
        returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + "</invoke>");
        returnValue = eval(returnString);
    } catch (ex) {
        throw "Call to " + functionName + " failed";
    }
    if (returnValue != undefined && typeof returnValue.post === "object") {
        returnValue = this.unescapeFilePostParams(returnValue);
    }
    return returnValue;
};
SWFUpload.prototype.selectFile = function () {
    this.callFlash("SelectFile");
};
SWFUpload.prototype.selectFiles = function () {
    this.callFlash("SelectFiles");
};
SWFUpload.prototype.startUpload = function (a) {
    this.callFlash("StartUpload", [a]);
};
SWFUpload.prototype.cancelUpload = function (a, b) {
    if (b !== false) {
        b = true;
    }
    this.callFlash("CancelUpload", [a, b]);
};
SWFUpload.prototype.stopUpload = function () {
    this.callFlash("StopUpload");
};
SWFUpload.prototype.getStats = function () {
    return this.callFlash("GetStats");
};
SWFUpload.prototype.setStats = function (a) {
    this.callFlash("SetStats", [a]);
};
SWFUpload.prototype.getFile = function (a) {
    if (typeof (a) === "number") {
        return this.callFlash("GetFileByIndex", [a]);
    } else {
        return this.callFlash("GetFile", [a]);
    }
};
SWFUpload.prototype.addFileParam = function (a, b, c) {
    return this.callFlash("AddFileParam", [a, b, c]);
};
SWFUpload.prototype.removeFileParam = function (a, b) {
    this.callFlash("RemoveFileParam", [a, b]);
};
SWFUpload.prototype.setUploadURL = function (a) {
    this.settings.upload_url = a.toString();
    this.callFlash("SetUploadURL", [a]);
};
SWFUpload.prototype.setPostParams = function (a) {
    this.settings.post_params = a;
    this.callFlash("SetPostParams", [a]);
};
SWFUpload.prototype.addPostParam = function (a, b) {
    this.settings.post_params[a] = b;
    this.callFlash("SetPostParams", [this.settings.post_params]);
};
SWFUpload.prototype.removePostParam = function (a) {
    delete this.settings.post_params[a];
    this.callFlash("SetPostParams", [this.settings.post_params]);
};
SWFUpload.prototype.setFileTypes = function (a, b) {
    this.settings.file_types = a;
    this.settings.file_types_description = b;
    this.callFlash("SetFileTypes", [a, b]);
};
SWFUpload.prototype.setFileSizeLimit = function (a) {
    this.settings.file_size_limit = a;
    this.callFlash("SetFileSizeLimit", [a]);
};
SWFUpload.prototype.setFileUploadLimit = function (a) {
    this.settings.file_upload_limit = a;
    this.callFlash("SetFileUploadLimit", [a]);
};
SWFUpload.prototype.setFileQueueLimit = function (a) {
    this.settings.file_queue_limit = a;
    this.callFlash("SetFileQueueLimit", [a]);
};
SWFUpload.prototype.setFilePostName = function (a) {
    this.settings.file_post_name = a;
    this.callFlash("SetFilePostName", [a]);
};
SWFUpload.prototype.setUseQueryString = function (a) {
    this.settings.use_query_string = a;
    this.callFlash("SetUseQueryString", [a]);
};
SWFUpload.prototype.setRequeueOnError = function (a) {
    this.settings.requeue_on_error = a;
    this.callFlash("SetRequeueOnError", [a]);
};
SWFUpload.prototype.setHTTPSuccess = function (a) {
    if (typeof a === "string") {
        a = a.replace(" ", "").split(",");
    }
    this.settings.http_success = a;
    this.callFlash("SetHTTPSuccess", [a]);
};
SWFUpload.prototype.setAssumeSuccessTimeout = function (a) {
    this.settings.assume_success_timeout = a;
    this.callFlash("SetAssumeSuccessTimeout", [a]);
};
SWFUpload.prototype.setDebugEnabled = function (a) {
    this.settings.debug_enabled = a;
    this.callFlash("SetDebugEnabled", [a]);
};
SWFUpload.prototype.setButtonImageURL = function (a) {
    if (a == undefined) {
        a = "";
    }
    this.settings.button_image_url = a;
    this.callFlash("SetButtonImageURL", [a]);
};
SWFUpload.prototype.setButtonDimensions = function (c, a) {
    this.settings.button_width = c;
    this.settings.button_height = a;
    var b = this.getMovieElement();
    if (b != undefined) {
        b.style.width = c + "px";
        b.style.height = a + "px";
    }
    this.callFlash("SetButtonDimensions", [c, a]);
};
SWFUpload.prototype.setButtonText = function (a) {
    this.settings.button_text = a;
    this.callFlash("SetButtonText", [a]);
};
SWFUpload.prototype.setButtonTextPadding = function (b, a) {
    this.settings.button_text_top_padding = a;
    this.settings.button_text_left_padding = b;
    this.callFlash("SetButtonTextPadding", [b, a]);
};
SWFUpload.prototype.setButtonTextStyle = function (a) {
    this.settings.button_text_style = a;
    this.callFlash("SetButtonTextStyle", [a]);
};
SWFUpload.prototype.setButtonDisabled = function (a) {
    this.settings.button_disabled = a;
    this.callFlash("SetButtonDisabled", [a]);
};
SWFUpload.prototype.setButtonAction = function (a) {
    this.settings.button_action = a;
    this.callFlash("SetButtonAction", [a]);
};
SWFUpload.prototype.setButtonCursor = function (a) {
    this.settings.button_cursor = a;
    this.callFlash("SetButtonCursor", [a]);
};
SWFUpload.prototype.queueEvent = function (b, c) {
    if (c == undefined) {
        c = [];
    } else {
        if (!(c instanceof Array)) {
            c = [c];
        }
    }
    var a = this;
    if (typeof this.settings[b] === "function") {
        this.eventQueue.push(function () {
            this.settings[b].apply(this, c);
        });
        setTimeout(function () {
            a.executeNextEvent();
        }, 0);
    } else {
        if (this.settings[b] !== null) {
            throw "Event handler " + b + " is unknown or is not a function";
        }
    }
};
SWFUpload.prototype.executeNextEvent = function () {
    var a = this.eventQueue ? this.eventQueue.shift() : null;
    if (typeof (a) === "function") {
        a.apply(this);
    }
};
SWFUpload.prototype.unescapeFilePostParams = function (c) {
    var e = /[$]([0-9a-f]{4})/i;
    var f = {};
    var d;
    if (c != undefined) {
        for (var a in c.post) {
            if (c.post.hasOwnProperty(a)) {
                d = a;
                var b;
                while ((b = e.exec(d)) !== null) {
                    d = d.replace(b[0], String.fromCharCode(parseInt("0x" + b[1], 16)));
                }
                f[d] = c.post[a];
            }
        }
        c.post = f;
    }
    return c;
};
SWFUpload.prototype.testExternalInterface = function () {
    try {
        return this.callFlash("TestExternalInterface");
    } catch (a) {
        return false;
    }
};
SWFUpload.prototype.flashReady = function () {
    var a = this.getMovieElement();
    if (!a) {
        this.debug("Flash called back ready but the flash movie can't be found.");
        return;
    }
    this.cleanUp(a);
    this.queueEvent("swfupload_loaded_handler");
};
SWFUpload.prototype.cleanUp = function (a) {
    try {
        if (a && typeof (a.CallFunction) === "unknown") {
            this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
            for (var c in a) {
                try {
                    if (typeof (a[c]) === "function" && c[0] <= "Z") {
                        a[c] = null;
                    }
                } catch (b) {}
            }
        }
    } catch (d) {}
    window.__flash__removeCallback = function (e, f) {
        try {
            if (e) {
                e[f] = null;
            }
        } catch (g) {}
    };
};
SWFUpload.prototype.fileDialogStart = function () {
    this.queueEvent("file_dialog_start_handler");
};
SWFUpload.prototype.fileQueued = function (a) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("file_queued_handler", a);
};
SWFUpload.prototype.fileQueueError = function (a, c, b) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("file_queue_error_handler", [a, c, b]);
};
SWFUpload.prototype.fileDialogComplete = function (b, c, a) {
    this.queueEvent("file_dialog_complete_handler", [b, c, a]);
};
SWFUpload.prototype.uploadStart = function (a) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("return_upload_start_handler", a);
};
SWFUpload.prototype.returnUploadStart = function (a) {
    var b;
    if (typeof this.settings.upload_start_handler === "function") {
        a = this.unescapeFilePostParams(a);
        b = this.settings.upload_start_handler.call(this, a);
    } else {
        if (this.settings.upload_start_handler != undefined) {
            throw "upload_start_handler must be a function";
        }
    } if (b === undefined) {
        b = true;
    }
    b = !! b;
    this.callFlash("ReturnUploadStart", [b]);
};
SWFUpload.prototype.uploadProgress = function (a, c, b) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("upload_progress_handler", [a, c, b]);
};
SWFUpload.prototype.uploadError = function (a, c, b) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("upload_error_handler", [a, c, b]);
};
SWFUpload.prototype.uploadSuccess = function (b, a, c) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("upload_success_handler", [b, a, c]);
};
SWFUpload.prototype.uploadComplete = function (a) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("upload_complete_handler", a);
};
SWFUpload.prototype.debug = function (a) {
    this.queueEvent("debug_handler", a);
};
SWFUpload.prototype.debugMessage = function (c) {
    if (this.settings.debug) {
        var a, d = [];
        if (typeof c === "object" && typeof c.name === "string" && typeof c.message === "string") {
            for (var b in c) {
                if (c.hasOwnProperty(b)) {
                    d.push(b + ": " + c[b]);
                }
            }
            a = d.join("\n") || "";
            d = a.split("\n");
            a = "EXCEPTION: " + d.join("\nEXCEPTION: ");
            SWFUpload.Console.writeLine(a);
        } else {
            SWFUpload.Console.writeLine(c);
        }
    }
};
SWFUpload.Console = {};
SWFUpload.Console.writeLine = function (d) {
    var b, a;
    try {
        b = document.getElementById("SWFUpload_Console");
        if (!b) {
            a = document.createElement("form");
            document.getElementsByTagName("body")[0].appendChild(a);
            b = document.createElement("textarea");
            b.id = "SWFUpload_Console";
            b.style.fontFamily = "monospace";
            b.setAttribute("wrap", "off");
            b.wrap = "off";
            b.style.overflow = "auto";
            b.style.width = "700px";
            b.style.height = "350px";
            b.style.margin = "5px";
            a.appendChild(b);
        }
        b.value += d + "\n";
        b.scrollTop = b.scrollHeight - b.clientHeight;
    } catch (c) {
        alert("Exception: " + c.name + " Message: " + c.message);
    }
};
SWFUpload.prototype.getFlashHTML = function () {
    var a = ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">'].join(""),
        b = ['<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="menu" value="false" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="', this.getFlashVars(), '" />'].join("");
    if (navigator.userAgent.toLowerCase().search(/msie 9/) > -1) {
        a = ['<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="', this.movieName, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">'].join("");
        b += '<param name="src" value="' + this.settings.flash_url + '" />';
    }
    return [a, b, "</object>"].join("");
};
QNR.Uploader = (function (e) {
    var d = e.SWFUpload;
    var h = 0,
        f = {}, a = {}, b = 0,
        k = {}, j = 2,
        i = function () {};
    if (!d) {
        console.error("no swfupload");
    }
    var g = {
        upload_url: "/space/images",
        file_post_name: "images",
        file_size_limit: "2 MB",
        file_types: "*.jpg;*.png;*.bmp;*.jpeg",
        file_types_description: "图片文件",
        file_upload_limit: j,
        file_queue_error_handler: i,
        file_queued_handler: i,
        file_dialog_start_handler: i,
        file_dialog_complete_handler: i,
        upload_start_handler: i,
        upload_error_handler: i,
        upload_success_handler: i,
        upload_complete_handler: i,
        upload_progress_handler: i,
        button_placeholder_id: "js_upload_pic",
        button_image_url: "http://source.qunar.com/site/images/travel/plan/btn_upload_pic_v2.png",
        button_action: d.BUTTON_ACTION.SELECT_FILE,
        button_text: "<span class='upload'>上传照片<span>",
        button_text_style: ".upload { color: #ffffff;font-size:14px;margin-top:-10px; }",
        button_text_left_padding: 5,
        button_text_top_padding: 2,
        button_width: 78,
        button_height: 25,
        button_window_mode: d.WINDOW_MODE.TRANSPARENT,
        button_cursor: d.CURSOR.HAND,
        post_params: {},
        flash_url: "/place/video/swfupload.swf",
        prevent_swf_caching: false,
        debug: false
    };
    var c = function (l) {
        l = $.extend({}, g, l);
        return new d(l);
    };
    return {
        getSWFUploader: c
    };
})(window);
if (typeof window.QNR == "undefined") {
    window.QNR = {};
}
window.QNR.Map = QNR.Map || {};
(function () {
    QNR.Map = function (k, m, l) {
        k = k.toLowerCase();
        if ("baidu" === k) {
            return new QNR.Map.Adapter.Baidu(m, l);
        } else {
            if ("google" === k) {
                return new QNR.Map.Adapter.Google(m, l);
            } else {
                throw "No such adapter vendor.";
            }
        }
    };
    QNR.Map.LatLng = function (m, l, k) {
        this._objs = {};
        this.addObject(m, l, k);
    };
    QNR.Map.LatLng.prototype = {
        addObject: function (m, l, k) {
            if (window.BMap && BMap.Point && m instanceof BMap.Point) {
                this._objs.baidu = {
                    lat: m.lat,
                    lng: m.lng,
                    obj: m
                };
            } else {
                if (window.google && google.maps && google.maps.LatLng && m instanceof google.maps.LatLng) {
                    this._objs.google = {
                        lat: m.lat(),
                        lng: m.lng(),
                        obj: m
                    };
                } else {
                    this._objs[k] = {
                        lat: m,
                        lng: l,
                        obj: null
                    };
                }
            }
        },
        getLat: function (l) {
            var m = c(this._objs),
                n;
            if (this._objs[l]) {
                n = this._objs[l];
            } else {
                n = this._objs[m[0]];
            }
            return n.lat;
        },
        getLng: function (l) {
            var m = c(this._objs),
                n;
            if (this._objs[l]) {
                n = this._objs[l];
            } else {
                n = this._objs[m[0]];
            }
            return n.lng;
        },
        equals: function (k) {},
        _toBaidu: function () {
            if (!this._objs.baidu) {
                this._transLatLng("baidu");
            } else {
                if (!this._objs.baidu.obj) {
                    this._objs.baidu.obj = new BMap.Point(this._objs.baidu.lng, this._objs.baidu.lat);
                }
            }
            return this._objs.baidu.obj;
        },
        _toGoogle: function () {
            if (!this._objs.google) {
                this._transLatLng("google");
            }
            if (!this._objs.google.obj) {
                this._objs.google.obj = new google.maps.LatLng(this._objs.google.lat, this._objs.google.lng);
            }
            return this._objs.google.obj;
        },
        _transLatLng: function (o) {
            var n, p, m, q;
            n = c(this._objs);
            m = n.length;
            for (p = 0; p < m; p++) {
                q = "_" + n[p].toLowerCase() + "To" + o.charAt(0).toUpperCase() + o.substring(1).toLowerCase();
                if (this[q] && "function" == typeof (this[q])) {
                    this._objs[o] = this[q](this._objs[n[p]]);
                    break;
                }
            }
            if (!this._objs[o]) {
                throw "Can't convert to " + o.charAt(0).toUpperCase() + o.substring(1).toLowerCase();
            }
        },
        _baiduToGoogle: function (k) {
            return {
                lat: k.lat - 0.006,
                lng: k.lng - 0.0065,
                obj: null
            };
        },
        _googleToBaidu: function (k) {
            return {
                lat: k.lat + 0.006,
                lng: k.lng + 0.0065,
                obj: null
            };
        }
    };
    QNR.Map.Pixel = function (k, l) {
        this.x = k;
        this.y = l;
        this._objs = {};
    };
    QNR.Map.Pixel.prototype._toBaidu = function () {
        if (!this._objs.baidu) {
            this._objs.baidu = BMap.Pixel(this.x, this.y);
        }
        return this._objs.baidu;
    };
    QNR.Map.Pixel.prototype._toGoogle = function () {
        if (!this._objs.google) {
            this._objs.google = new google.maps.Point(this.x, this.y);
        }
        return this._objs.google;
    };
    QNR.Map.Bounds = function (k, l, m) {
        this._sw = k, this._ne = l;
        this._objs = [];
        if ("baidu" == m) {
            this._toBaidu();
        } else {
            if ("google" == m) {
                this._toGoogle();
            }
        }
    };
    QNR.Map.Bounds.prototype._toBaidu = function () {
        if (!this._objs.baidu) {
            this._objs.baidu = new BMap.Bounds(this._sw ? this._sw._toBaidu() : null, this._ne ? this._ne._toBaidu() : null);
            h(this._toBaidu, this);
        }
        return this._objs.baidu;
    };
    QNR.Map.Bounds.prototype._toBaidu.prototype.equals = function (k) {
        return this._objs.baidu.equals(k._toBaidu);
    };
    QNR.Map.Bounds.prototype._toBaidu.prototype.getSouthWest = function () {
        var k = this._objs.baidu.getSouthWest();
        return new QNR.Map.LatLng(new BMap.Point(k.lng, k.lat));
    };
    QNR.Map.Bounds.prototype._toBaidu.prototype.getNorthEast = function () {
        var k = this._objs.baidu.getNorthEast();
        return new QNR.Map.LatLng(new BMap.Point(k.lng, k.lat));
    };
    QNR.Map.Bounds.prototype._toBaidu.prototype.isEmpty = function () {
        return this._objs.baidu.isEmpty();
    };
    QNR.Map.Bounds.prototype._toBaidu.prototype.toSpan = function () {
        var k = this._objs.baidu.toSpan();
        return new QNR.Map.LatLng(new BMap.Point(k.lng, k.lat));
    };
    QNR.Map.Bounds.prototype._toBaidu.prototype.intersects = function (k) {
        return !(this._objs.baidu.intersects(k._toBaidu()).isEmpty());
    };
    QNR.Map.Bounds.prototype._toBaidu.prototype.getCenter = function () {
        var k = this._objs.baidu.getCenter();
        return new QNR.Map.LatLng(new BMap.Point(k.lng, k.lat));
    };
    QNR.Map.Bounds.prototype._toBaidu.prototype.extend = function (k) {
        this._objs.baidu.extend(k._toBaidu());
        this._sw = this.getSouthWest();
        this._ne = this.getNorthEast();
    };
    QNR.Map.Bounds.prototype._toBaidu.prototype.containsPoint = function (k) {
        var m = this._objs.baidu;
        var l = k._toBaidu();
        return m.containsPoint(l);
    };
    QNR.Map.Bounds.prototype._toGoogle = function (k) {
        if (!this._objs.google) {
            if (this._sw && this._ne) {
                this._objs.google = new google.maps.LatLngBounds(this._sw._toGoogle(), this._ne._toGoogle());
            } else {
                this._objs.google = new google.maps.LatLngBounds();
            }
            h(this._toGoogle, this);
        }
        return this._objs.google;
    };
    QNR.Map.Bounds.prototype._toGoogle.prototype.equals = function (k) {
        return this._objs.google.equals(k._toGoogle());
    };
    QNR.Map.Bounds.prototype._toGoogle.prototype.getSouthWest = function () {
        var k = this._objs.google.getSouthWest();
        return new QNR.Map.LatLng(k.lat(), k.lng(), "google");
    };
    QNR.Map.Bounds.prototype._toGoogle.prototype.getNorthEast = function () {
        var k = this._objs.google.getNorthEast();
        return new QNR.Map.LatLng(k.lat(), k.lng(), "google");
        return new QNR.Map.LatLng(google.maps.LatLng(k.lat(), k.lng()));
    };
    QNR.Map.Bounds.prototype._toGoogle.prototype.isEmpty = function () {
        return this._objs.google.isEmpty();
    };
    QNR.Map.Bounds.prototype._toGoogle.prototype.toSpan = function () {
        var k = this._objs.google.toSpan();
        return new QNR.Map.LatLng(google.maps.LatLng(k.lat(), k.lng()));
    };
    QNR.Map.Bounds.prototype._toGoogle.prototype.intersects = function (k) {
        return this._objs.google.intersects(k._toGoogle());
    };
    QNR.Map.Bounds.prototype._toGoogle.prototype.getCenter = function () {
        var k = this._objs.google.getCenter();
        return new QNR.Map.LatLng(new google.maps.LatLng(k.lat(), k.lng()));
    };
    QNR.Map.Bounds.prototype._toGoogle.prototype.extend = function (k) {
        this._objs.google.extend(k._toGoogle());
        this._sw = this.getSouthWest();
        this._ne = this.getNorthEast();
    };
    QNR.Map.Bounds.prototype._toGoogle.prototype.containsPoint = function (k) {
        var m = this._objs.google;
        var l = k._toGoogle();
        return m.contains(l);
    };
    QNR.Map.Size = function (l, k) {
        this.width = l;
        this.height = k;
        this._objs = [];
    };
    QNR.Map.Size.prototype._toBaidu = function () {
        if (!this._objs.baidu) {
            this._objs.baidu = new BMap.Size(this.width, this.height);
        }
        return this._objs.baidu;
    };
    QNR.Map.Size.prototype._toGoogle = function () {
        if (!this._objs.google) {
            this._objs.google = new google.maps.Size(this.width, this.height);
        }
        return this._objs.google;
    };
    QNR.Map.Icon = function (m, n, k, l) {
        this._url = m, this._size = n, this._origin = k, this._anchor = l;
        this._objs = [];
    };
    QNR.Map.Icon.prototype._toBaidu = function () {
        var k = {};
        if (!this._objs.baidu) {
            if (this._origin) {
                k.imageOffset = new BMap.Size(0 - this._origin.x, this._origin.y);
            }
            if (this._anchor) {
                k.anchor = new BMap.Size(this._anchor.x, this._anchor.y);
            }
            this._objs.baidu = new BMap.Icon(this._url, this._size._toBaidu(), k);
        }
        return this._objs.baidu;
    };
    QNR.Map.Icon.prototype._toGoogle = function () {
        var l, k;
        if (!this._objs.google) {
            if (this._anchor) {
                l = this._anchor._toGoogle();
                k = this._origin._toGoogle();
                this._objs.google = new google.maps.MarkerImage(this._url, this._size._toGoogle(), k, l);
            } else {
                if (this._origin) {
                    k = this._origin._toGoogle();
                    this._objs.google = new google.maps.MarkerImage(this._url, this._size._toGoogle(), k);
                } else {
                    this._objs.google = new google.maps.MarkerImage(this._url, this._size._toGoogle());
                }
            }
        }
        return this._objs.google;
    };
    QNR.Map.Control = function (l, k, m) {
        this._map = l;
        this._objs = [];
        this._opts = k || {};
        this._init = m;
    };
    QNR.Map.Control.prototype._toBaidu = function () {
        var k = this;
        if (!this._objs.baidu) {
            this._objs.baidu = new BMap.Control();
            this._objs.baidu.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
            this._objs.baidu.defaultOffset = new BMap.Size(0, 0);
            this._objs.baidu.initialize = function () {
                return k._init.apply(k._objs.baidu, [k._map]);
            };
        }
        return this._objs.baidu;
    };
    QNR.Map.Control.prototype._toGoogle = function () {
        var k = this;
        if (!this._objs.google) {
            var l = this._init(this._map);
            this._objs.google = {
                pos: google.maps.ControlPosition.RIGHT_BOTTOM,
                div: l
            };
        }
        return this._objs.google;
    };
    QNR.Map.Control.Position = {};
    QNR.Map.Control.Position.TOP_LEFT = 1;
    QNR.Map.Control.Position.TOP_RIGHT = 2;
    QNR.Map.Control.Position.BOTTOM_LEFT = 3;
    QNR.Map.Control.Position.BOTTOM_RIGHT = 4;
    QNR.Map.Control.Position._toBaidu = function (k) {
        var l = [null, BMAP_ANCHOR_TOP_LEFT, BMAP_ANCHOR_TOP_RIGHT, BMAP_ANCHOR_BOTTOM_LEFT, BMAP_ANCHOR_BOTTOM_RIGHT];
        return l[k];
    };
    QNR.Map.Control.Position._toGoogle = function (k) {
        var l = [null, google.maps.ControlPosition.LEFT_TOP, google.maps.ControlPosition.TOP_RIGHT, google.maps.ControlPosition.BOTTOM_LEFT, google.maps.ControlPosition.BOTTOM_RIGHT];
        return l[k];
    };
    QNR.Map.Control.Navigation = function (l, k) {
        QNR.Map.Control.apply(this, [l, k, null]);
        this._opts.position = this._opts.position || QNR.Map.Control.Position.TOP_LEFT;
    };
    QNR.Map.Control.Navigation.prototype = new QNR.Map.Control();
    QNR.Map.Control.Navigation.prototype.constructor = QNR.Map.Control.Navigation;
    QNR.Map.Control.Navigation.prototype._toBaidu = function () {
        if (!this._objs.baidu) {
            var k = this._opts.style;
            this._objs.baidu = new BMap.NavigationControl({
                anchor: QNR.Map.Control.Position._toBaidu(this._opts.position),
                type: k
            });
        }
        return this._objs.baidu;
    };
    QNR.Map.Control.Navigation.prototype._toGoogle = function () {
        var k = QNR.Map.Control.Position._toGoogle(this._opts.position);
        var l = this._opts.style;
        if (!this._objs.google) {
            this._objs.google = {
                pos: k,
                obj: {
                    panControl: true,
                    panControlOptions: {
                        position: k
                    },
                    zoomControl: true,
                    zoomControlOptions: {
                        position: k,
                        style: l
                    }
                }
            };
        }
        return this._objs.google;
    };
    QNR.Map.Control.OverviewMap = function (l, k) {
        QNR.Map.Control.apply(this, arguments);
    };
    QNR.Map.Control.OverviewMap.prototype = new QNR.Map.Control();
    QNR.Map.Control.OverviewMap.prototype.constructor = QNR.Map.Control.OverviewMap;
    QNR.Map.Control.OverviewMap.prototype._toBaidu = function () {
        return new BMap.OverviewMapControl({
            isOpen: f(this._options.open, false)
        });
    };
    QNR.Map.Control.OverviewMap.prototype._toGoogle = function () {
        var k = {
            overviewMapControl: true,
            overviewMapControlOptions: {
                opened: f(this._options.open, false)
            }
        };
        return k;
    };
    QNR.Map.Overlay = function () {};
    QNR.Map.Overlay.prototype._toBaidu = function (n) {
        var l = this.constructor.prototype;
        var o = l._objs = l._objs || [];
        var m = this,
            k;
        if (!o.baidu) {
            o.baidu = function (p, q) {
                this._overlay = p;
                this._map = q;
            };
            e(o.baidu, BMap.Overlay);
            o.baidu.prototype.initialize = function () {
                var p = this._map;
                return l.onInit.apply(this, [p, this._overlay]);
            };
            o.baidu.prototype.draw = function () {
                var p = this._map;
                return l.onDraw.apply(this, [p, this._overlay]);
            };
            o.baidu.prototype.getPanes = function () {
                var p = this._map;
                return p.getPanes();
            };
        }
        this.addEventListener = i;
        this.removeEventListener = d;
        if (!this.hasOwnProperty("_objs")) {
            this._objs = [];
        }
        if (!this._objs.baidu) {
            this._objs.baidu = new o.baidu(m, n);
        }
        return this._objs.baidu;
    };
    QNR.Map.Overlay.prototype._toGoogle = function (n) {
        var l = this.constructor.prototype;
        var o = l._objs = l._objs || [];
        var m = this,
            k;
        if (!o.google) {
            o.google = function (p, q) {
                this._overlay = p;
                this._map = q;
            };
            e(o.google, google.maps.OverlayView);
            o.google.prototype.onAdd = function () {
                var p = this._map;
                this._div = l.onInit.apply(this, [p, this._overlay]);
                return this._div;
            };
            o.google.prototype.draw = function () {
                var p = this._map;
                return l.onDraw.apply(this, [p, this._overlay]);
            };
            o.google.prototype.onRemove = function () {
                this._div.parentNode.removeChild(this._div);
                this._div = null;
            };
        }
        m.addEventListener = a;
        m.removeEventListener = b;
        if (!this.hasOwnProperty("_objs")) {
            this._objs = [];
        }
        if (!this._objs.google) {
            this._objs.google = new o.google(m, n);
        }
        return this._objs.google;
    };
    QNR.Map.Overlay.Marker = function (k, l) {
        this._point = k, this._options = l;
        this._map = null, this._objs = [], this._event = [];
    };
    QNR.Map.Overlay.Marker.prototype = new QNR.Map.Overlay();
    QNR.Map.Overlay.Marker.prototype.constructor = QNR.Map.Overlay.Marker;
    QNR.Map.Overlay.Marker.prototype._toBaidu = function (l) {
        this._map = l;
        var k = {
            enableDragging: this._options.draggable || false,
            enableClicking: this._options.clickable || true,
            raiseOnDrag: this._options.raiseOnDrag || false,
            title: this._options.title || ""
        };
        if (this._options.icon) {
            k.icon = this._options.icon._toBaidu();
        }
        if (!this._objs.baidu) {
            this._objs.baidu = new BMap.Marker(this._point._toBaidu(), k);
            h(this._toBaidu, this);
        }
        return this._objs.baidu;
    };
    QNR.Map.Overlay.Marker.prototype._toBaidu.prototype.addEventListener = i;
    QNR.Map.Overlay.Marker.prototype._toBaidu.prototype.removeEventListener = d;
    QNR.Map.Overlay.Marker.prototype._toBaidu.prototype.setPosition = function (k) {};
    QNR.Map.Overlay.Marker.prototype._toBaidu.prototype.getPosition = function () {};
    QNR.Map.Overlay.Marker.prototype._toBaidu.prototype.getPoint = function () {
        return this._point;
    };
    QNR.Map.Overlay.Marker.prototype._toGoogle = function () {
        var l = {
            clickable: this._options.clickable || true,
            draggable: this._options.draggable || false,
            position: this._point._toGoogle(),
            raiseOnDrag: this._options.raiseOnDrag || false,
            title: this._options.title || ""
        };
        if (this._options.icon) {
            l.icon = this._options.icon._toGoogle();
        }
        var k = new google.maps.Marker(l);
        if (!this._objs.google) {
            this._objs.google = new google.maps.Marker(l);
            h(this._toGoogle, this);
        }
        return this._objs.google;
    };
    QNR.Map.Overlay.Marker.prototype._toGoogle.prototype.getPoint = function () {
        return this._point;
    };
    QNR.Map.Overlay.Marker.prototype._toGoogle.prototype.addEventListener = a;
    QNR.Map.Overlay.Marker.prototype._toGoogle.prototype.removeEventListener = b;
    QNR.Map.Overlay.Marker.prototype._toGoogle.prototype.setIcon = function (k) {
        this._objs.google.setIcon(k);
    };
    QNR.Map.Overlay.Marker.prototype._toGoogle.prototype.getIcon = function (k) {
        return QNR.Map.Icon._fromBaidu(this._objs.baidu.getIcon());
    };
    QNR.Map.Overlay.Polyline = function (l, k) {
        this._map = null;
        this._points = l;
        this._options = k;
        this._objs = [];
        this._event = [];
    };
    QNR.Map.Overlay.Polyline.prototype = new QNR.Map.Overlay();
    QNR.Map.Overlay.Polyline.prototype.constructor = QNR.Map.Overlay.Polyline;
    QNR.Map.Overlay.Polyline.prototype._toBaidu = function (p) {
        this._map = p;
        var n = [],
            k = this._points.length;
        for (var m = 0; m < k; m++) {
            n.push(this._points[m]._toBaidu());
        }
        var o = {
            strokeStyle: "solid",
            enableMassClear: true,
            enableEditing: false
        };
        QNR.mix(o, this._options, true);
        if (!this._objs.baidu) {
            this._objs.baidu = new BMap.Polyline(n, o);
            h(this._toBaidu, this);
        }
        return this._objs.baidu;
    };
    QNR.Map.Overlay.Polyline.prototype._toBaidu.prototype.addEventListener = i;
    QNR.Map.Overlay.Polyline.prototype._toBaidu.prototype.removeEventListener = d;
    QNR.Map.Overlay.Polyline.prototype._toBaidu.prototype.getPath = function () {
        var o = this._objs.baidu.getPath();
        var n = [],
            m, k = o.length;
        for (m = 0; m < k; m++) {
            n.push(new QNR.Map.LatLng(o[m]));
        }
        return n;
    };
    QNR.Map.Overlay.Polyline.prototype._toBaidu.prototype.setPath = function (n) {
        var o = [],
            m, k = n.length;
        for (m = 0; m < k; m++) {
            o.push(n[m]._toBaidu());
        }
        this._objs.baidu.setPath(o);
    };
    QNR.Map.Overlay.Polyline.prototype._toBaidu.prototype.setStrokeColor = function (k) {
        this._objs.baidu.setStrokeColor(k);
    };
    QNR.Map.Overlay.Polyline.prototype._toGoogle = function (p) {
        this._map = p;
        var n = [],
            k = this._points.length;
        for (var m = 0; m < k; m++) {
            n.push(this._points[m]._toGoogle());
        }
        var o = {
            path: n,
            strokeColor: "#0096ff"
        };
        if (this._options.strokeColor) {
            o.strokeColor = this._options.strokeColor;
        }
        if (this._options.strokeOpacity) {
            o.strokeOpacity = this._options.strokeOpacity;
        }
        if (this._options.strokeWeight) {
            o.strokeWeight = this._options.strokeWeight;
        }
        if (this._options.clickable) {
            o.clickable = this._options.clickable;
        }
        if (!this._objs.google) {
            this._objs.google = new google.maps.Polyline(o);
            h(this._toGoogle, this);
        }
        return this._objs.google;
    };
    QNR.Map.Overlay.Polyline.prototype._toGoogle.prototype.addEventListener = a;
    QNR.Map.Overlay.Polyline.prototype._toGoogle.prototype.removeEventListener = b;
    QNR.Map.Overlay.Polyline.prototype._toGoogle.prototype.getPath = function () {
        var o = this._objs.google.getPath();
        var n = [],
            m, k = o.length;
        for (m = 0; m < k; m++) {
            n.push(new QNR.Map.LatLng(o[m]));
        }
        return n;
    };
    QNR.Map.Overlay.Polyline.prototype._toGoogle.prototype.setPath = function (n) {
        var o = [],
            m, k = n.length;
        for (m = 0; m < k; m++) {
            o.push(n[m]._toGoogle());
        }
        this._objs.google.setPath(o);
    };
    QNR.Map.Overlay.Polyline.prototype._toGoogle.prototype.setStrokeColor = function (k) {
        this._objs.google.setOptions({
            strokeColor: k
        });
    };
    QNR.Map.Overlay.Polygon = function (l, k) {
        this._map = null;
        this._points = l;
        this._options = k;
        this._objs = [];
        this._event = [];
    };
    QNR.Map.Overlay.Polygon.prototype = new QNR.Map.Overlay();
    QNR.Map.Overlay.Polygon.prototype.constructor = QNR.Map.Overlay.Polygon;
    QNR.Map.Overlay.Polygon.prototype._toBaidu = function (p) {
        this._map = p;
        var n = [],
            k = this._points.length;
        for (var m = 0; m < k; m++) {
            n.push(this._points[m]._toBaidu());
        }
        var o = {
            strokeStyle: "solid",
            enableMassClear: true,
            enableEditing: false
        };
        if (this._options.strokeColor) {
            o.strokeColor = this._options.strokeColor;
        }
        if (this._options.strokeOpacity) {
            o.strokeOpacity = this._options.strokeOpacity;
        }
        if (this._options.strokeWeight) {
            o.strokeWeight = this._options.strokeWeight;
        }
        if (this._options.fillColor) {
            o.fillColor = this._options.fillColor;
        }
        if (this._options.fillOpacity) {
            o.fillOpacity = this._options.fillOpacity;
        }
        if (this._options.clickable) {
            o.enableClicking = this._options.clickable;
        }
        if (!this._objs.baidu) {
            this._objs.baidu = new BMap.Polygon(n, o);
            h(this._toBaidu, this);
        }
        return this._objs.baidu;
    };
    QNR.Map.Overlay.Polygon.prototype._toBaidu.prototype.addEventListener = i;
    QNR.Map.Overlay.Polygon.prototype._toBaidu.prototype.removeEventListener = d;
    QNR.Map.Overlay.Polygon.prototype._toBaidu.prototype.getPath = function () {
        var o = this._objs.baidu.getPath();
        var n = [],
            m, k = o.length;
        for (m = 0; m < k; m++) {
            n.push(new QNR.Map.LatLng(o[m]));
        }
        return n;
    };
    QNR.Map.Overlay.Polygon.prototype._toBaidu.prototype.setPath = function (n) {
        var o = [],
            m, k = n.length;
        for (m = 0; m < k; m++) {
            o.push(n[m]._toBaidu());
        }
        this._objs.baidu.setPath(o);
    };
    QNR.Map.Overlay.Polygon.prototype._toBaidu.prototype.setStrokeColor = function (k) {
        this._objs.baidu.setStrokeColor(k);
    };
    QNR.Map.Overlay.Polygon.prototype._toBaidu.prototype.setFillColor = function (k) {
        this._objs.baidu.setFillColor(k);
    };
    QNR.Map.Overlay.Polygon.prototype._toBaidu.prototype.setFillOpacity = function (k) {
        this._objs.baidu.setFillOpacity(k);
    };
    QNR.Map.Overlay.Polygon.prototype._toBaidu.prototype.getBounds = function (k) {
        return this._objs.baidu.getBounds();
    };
    QNR.Map.Overlay.Polygon.prototype._toGoogle = function (p) {
        this._map = p;
        var n = [],
            k = this._points.length;
        for (var m = 0; m < k; m++) {
            n.push(this._points[m]._toGoogle());
        }
        n.push(this._points[0]._toGoogle());
        var o = {
            paths: n
        };
        if (this._options.strokeColor) {
            o.strokeColor = this._options.strokeColor;
        }
        if (this._options.strokeOpacity) {
            o.strokeOpacity = this._options.strokeOpacity;
        }
        if (this._options.strokeWeight) {
            o.strokeWeight = this._options.strokeWeight;
        }
        if (this._options.fillColor) {
            o.fillColor = this._options.fillColor;
        }
        if (this._options.fillOpacity) {
            o.fillOpacity = this._options.fillOpacity;
        }
        if (this._options.clickable) {
            o.clickable = this._options.clickable;
        }
        if (!this._objs.google) {
            this._objs.google = new google.maps.Polygon(o);
            h(this._toGoogle, this);
        }
        return this._objs.google;
    };
    QNR.Map.Overlay.Polygon.prototype._toGoogle.prototype.addEventListener = a;
    QNR.Map.Overlay.Polygon.prototype._toGoogle.prototype.removeEventListener = b;
    QNR.Map.Overlay.Polygon.prototype._toGoogle.prototype.getPath = function () {
        var o = this._objs.google.getPath();
        var n = [],
            m, k = o.length;
        for (m = 0; m < k; m++) {
            n.push(new QNR.Map.LatLng(o[m]));
        }
        return n;
    };
    QNR.Map.Overlay.Polygon.prototype._toGoogle.prototype.setPath = function (n) {
        var o = [],
            m, k = n.length;
        for (m = 0; m < k; m++) {
            o.push(n[m]._toGoogle());
        }
        this._objs.google.setPath(o);
    };
    QNR.Map.Overlay.Polygon.prototype._toGoogle.prototype.setStrokeColor = function (k) {
        this._objs.google.setOptions({
            strokeColor: k
        });
    };
    QNR.Map.Overlay.Polygon.prototype._toGoogle.prototype.setFillColor = function (k) {
        this._objs.google.setOptions({
            fillColor: k
        });
    };
    QNR.Map.Overlay.Polygon.prototype._toGoogle.prototype.setFillOpacity = function (k) {
        this._objs.google.setOptions({
            fillOpacity: k
        });
    };
    QNR.Map.Overlay.Polygon.prototype._toGoogle.prototype.getBounds = function () {
        return this._objs.google.getBounds();
    };
    QNR.Map.Adapter = {};
    QNR.Map.Adapter.Baidu = function (m, k) {
        this._overlays = [], this._controls = [], this._event = [], this._objs = [];
        var l = {
            mapType: BMAP_NORMAL_MAP,
            enableHighResolution: false,
            enableAutoResize: true
        };
        if ("number" == typeof (k.minZoom)) {
            l.minZoom = k.minZoom;
        }
        if ("number" == typeof (k.maxZoom)) {
            l.maxZoom = k.maxZoom;
        }
        this._map = new BMap.Map(m, l);
        if (k.center && "number" == typeof (k.zoom)) {
            this._map.centerAndZoom(k.center._toBaidu(), k.zoom);
        }
        f(k.scrollwheel, false) ? this._map.enableScrollWheelZoom() : this._map.disableScrollWheelZoom();
        f(k.doubleClickZoom, true) ? this._map.enableDoubleClickZoom() : this._map.disableDoubleClickZoom();
        f(k.keyboard, false) ? this._map.enableKeyboard() : this._map.disableKeyboard();
        this._objs.baidu = this._map;
    };
    QNR.Map.Adapter.Google = function (l, k) {
        this._overlays = [], this._controls = [], this._event = [], this._objs = [];
        l = "string" == typeof (l) ? document.getElementById(l) : l;
        this._options = {
            center: k.center._toGoogle(),
            zoom: k.zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        this._options.draggable = f(k.draggable, true);
        this._options.scrollwheel = f(k.scrollwheel, false);
        this._options.disableDoubleClickZoom = !f(k.doubleClickZoom, true);
        this._options.keyboardShortcuts = f(k.keyboard, false);
        if ("number" == typeof (k.minZoom)) {
            this._options.minZoom = k.minZoom;
        }
        if ("number" == typeof (k.maxZoom)) {
            this._options.maxZoom = k.maxZoom;
        }
        this._options.styles = [{
            featureType: "poi",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }];
        this._map = new google.maps.Map(l, this._options);
        this._objs.google = this._map;
    };
    QNR.Map.Adapter.Baidu.prototype.getContainer = function () {
        return this._map.getContainer();
    };
    QNR.Map.Adapter.Google.prototype.getContainer = function () {
        return this._map.getDiv();
    };
    QNR.Map.Adapter.Baidu.prototype.getMap = function () {
        return this._map;
    };
    QNR.Map.Adapter.Google.prototype.getMap = function () {
        return this._map;
    };
    QNR.Map.Adapter.Baidu.prototype.getCenter = QNR.Map.Adapter.Google.prototype.getCenter = function () {
        return QNR.Map.LatLng(this._map.getCenter());
    };
    QNR.Map.Adapter.Baidu.prototype.setCenter = function (k) {
        this._map.setCenter(k._toBaidu());
    };
    QNR.Map.Adapter.Google.prototype.setCenter = function (k) {
        this._map.setCenter(k._toGoogle());
    };
    QNR.Map.Adapter.Baidu.prototype.getZoom = QNR.Map.Adapter.Google.prototype.getZoom = function () {
        return this._map.getZoom();
    };
    QNR.Map.Adapter.Baidu.prototype.setZoom = QNR.Map.Adapter.Google.prototype.setZoom = function (k) {
        this._map.setZoom(k);
    };
    QNR.Map.Adapter.Baidu.prototype.getBounds = function () {
        var k = this._map.getBounds();
        return new QNR.Map.Bounds(new QNR.Map.LatLng(k.getSouthWest()), new QNR.Map.LatLng(k.getNorthEast()), "baidu");
    };
    QNR.Map.Adapter.Google.prototype.getBounds = function () {
        var k = this._map.getBounds();
        return new QNR.Map.Bounds(new QNR.Map.LatLng(k.getSouthWest()), new QNR.Map.LatLng(k.getNorthEast()), "google");
    };
    QNR.Map.Adapter.Baidu.prototype.setCursor = function (k) {
        this._map.setDefaultCursor(k);
    };
    QNR.Map.Adapter.Google.prototype.setCursor = function (k) {
        this._map.setOptions({
            draggableCursor: k
        });
    };
    QNR.Map.Adapter.Baidu.prototype.setViewport = function (n, m) {
        var p = [],
            o, k;
        if (n instanceof QNR.Map.Bounds) {
            p.push(n.getSouthWest()._toBaidu());
            p.push(n.getNorthEast()._toBaidu());
        } else {
            if (n instanceof Array) {
                k = n.length;
                for (o = 0; o < k; o++) {
                    p.push(n[o]._toBaidu());
                }
            }
        }
        this._map.setViewport(p, m);
    };
    QNR.Map.Adapter.Google.prototype.setViewport = function (m, p) {
        var u;
        if (m instanceof QNR.Map.Bounds) {
            u = m._toGoogle();
        } else {
            if (m instanceof Array) {
                var u = new google.maps.LatLngBounds(),
                    B, w = m.length;
                for (B = 0; B < w; B++) {
                    u.extend(m[B]._toGoogle());
                }
            }
        } if (p && p.margins) {
            var t = this._map.getDiv().clientHeight,
                r = this._map.getDiv().clientWidth;
            var o = p.margins[0],
                q = p.margins[1],
                s = p.margins[2],
                y = p.margins[3];
            var z = t - o - s,
                v = r - y - q;
            var x = u.toSpan();
            var D;
            if (z / x.lat() < v / x.lng()) {
                D = z / x.lat();
                y += (v - x.lng() * D) * y / (y + q);
                q += (v - x.lng() * D) * q / (y + q);
            } else {
                D = v / x.lng();
                o += (z - x.lat() * D) * o / (o + s);
                s += (z - x.lat() * D) * s / (o + s);
            }
            var k = u.getSouthWest(),
                A = u.getNorthEast();
            var n = new google.maps.LatLng(k.lat() - y / D, k.lng() - s / D);
            var C = new google.maps.LatLng(A.lat() + q / D, A.lng() + o / D);
            u.extend(n);
            u.extend(C);
        }
        this._map.fitBounds(u);
    };
    QNR.Map.Adapter.Google.prototype.setViewport = function (o, n) {
        var s;
        var r = this;
        if (o instanceof QNR.Map.Bounds) {
            s = o._toGoogle();
        } else {
            if (o instanceof Array) {
                var s = new google.maps.LatLngBounds(),
                    p, m = o.length;
                for (p = 0; p < m; p++) {
                    s.extend(o[p]._toGoogle());
                }
            }
        }
        this._map.fitBounds(s);
        if (n && n.margins) {
            var q = null;
            var k = function () {
                var y = new google.maps.LatLngBounds();
                var v = r._map.getDiv().clientHeight,
                    l = r._map.getDiv().clientWidth;
                var t = n.margins[0],
                    z = n.margins[1],
                    x = n.margins[2],
                    w = n.margins[3];
                if (t) {
                    var A = new google.maps.Point(0, t);
                    var u = j.getGLatLng(r._map, A, s);
                    y.extend(u);
                }
                if (w) {
                    var A = new google.maps.Point(w, 0);
                    var u = j.getGLatLng(r._map, A, s);
                    y.extend(u);
                }
                if (z) {
                    var A = new google.maps.Point(l - z, 0);
                    var u = j.getGLatLng(r._map, A, s);
                    y.extend(u);
                }
                if (x) {
                    var A = new google.maps.Point(0, v - x);
                    var u = j.getGLatLng(r._map, A, s);
                    y.extend(u);
                }
                r._map.fitBounds(s.union(y));
                if (q) {
                    google.maps.event.removeListener(q);
                }
            };
            if (!r._map.getProjection()) {
                q = google.maps.event.addListener(r._map, "projection_changed", k);
            } else {
                k();
            }
        }
    };
    QNR.Map.Adapter.Baidu.prototype.MAP_TYPE = "baidu";
    QNR.Map.Adapter.Google.prototype.MAP_TYPE = "google";
    QNR.Map.Adapter.Baidu.prototype.panBy = function (k, l) {
        this._map.panBy(k, l);
    };
    QNR.Map.Adapter.Google.prototype.panBy = function (k, l) {
        this._map.panBy(-k, -l);
    };
    QNR.Map.Adapter.Baidu.prototype.panTo = function (k) {
        this._map.panTo(k._toBaidu());
    };
    QNR.Map.Adapter.Google.prototype.panTo = function (k) {
        this._map.panTo(k._toGoogle());
    };
    QNR.Map.Adapter.Baidu.prototype.addControl = function (k) {
        this._map.addControl(k._toBaidu());
        this._controls.push(k);
    };
    QNR.Map.Adapter.Google.prototype.addControl = function (l) {
        var k = l._toGoogle();
        if (k.obj instanceof QNR.Map.Control) {
            this._map.controls[k.pos].push(k.obj);
            this._controls.push(l);
        } else {
            this._map.setOptions(k.obj);
            this._controls.push(l);
        }
    };
    QNR.Map.Adapter.Baidu.prototype.removeControl = function (k) {
        this._map.removeControl(k._toBaidu());
        g(this._controls, k);
    };
    QNR.Map.Adapter.Google.prototype.removeControl = function (o) {
        var n = o._toGoogle(),
            k, m;
        if (o instanceof QNR.Map.Control) {
            k = this._map.controls[n.pos].getLength();
            for (m = 0; m < k; m++) {
                if (this._map.controls[n.pos].getAt(m) == o._toGoogle()) {
                    this._map.controls[n.pos].removeAt(m);
                    g(this._controls, o);
                }
            }
        } else {
            for (m in n) {
                if (n.hasOwnProperty(m)) {
                    if (true == n[m]) {
                        n[m] = false;
                    }
                }
            }
            this._map.setOptions(n);
            g(this._controls, o);
        }
    };
    QNR.Map.Adapter.Baidu.prototype.addOverlay = function (k) {
        k._adapter = "baidu";
        this._map.addOverlay(k._toBaidu(this));
    };
    QNR.Map.Adapter.Baidu.prototype.removeOverlay = function (k) {
        this._map.removeOverlay(k._toBaidu(this));
    };
    QNR.Map.Adapter.Baidu.prototype.getPanes = function () {
        var k;
        k = this._map.getPanes();
        return {
            map: k.mapPane,
            markerShadow: k.markerShadow,
            markerPane: k.markerPane,
            floatShadow: k.floatShadow,
            markerMouseTarget: k.overlayMouseTarget,
            floatPane: k.floatPane
        };
    };
    QNR.Map.Adapter.Baidu.prototype.pointToPixel = function (k, l) {
        return this._map.pointToOverlayPixel(k._toBaidu());
    };
    QNR.Map.Adapter.Baidu.prototype.addEventListener = i;
    QNR.Map.Adapter.Baidu.prototype.removeEventListener = d;
    QNR.Map.Adapter.Google.prototype.addEventListener = a;
    QNR.Map.Adapter.Google.prototype.removeEventListener = b;
    QNR.Map.Adapter.Google.prototype.addOverlay = function (k) {
        var l = k._toGoogle(this);
        k._adapter = "google";
        l.setMap(this._map);
    };
    QNR.Map.Adapter.Google.prototype.removeOverlay = function (k) {
        var l = k._toGoogle(this);
        l.setMap(null);
    };
    QNR.Map.Adapter.Google.prototype.getPanes = function () {
        var n, m = 0,
            k = this._overlays.length,
            p;
        for (var m = 0; m < k; m++) {
            if (this._overlays[m]) {
                p = this._overlays[m]._toGoogle(this);
                if (!(p.getPanes && p.getPanes())) {
                    continue;
                }
                n = p.getPanes();
                return {
                    map: n.mapPane,
                    markerShadow: n.overlayShadow,
                    markerPane: n.overlayImage,
                    floatShadow: n.floatShadow,
                    markerMouseTarget: n.overlayMouseTarget,
                    floatPane: n.floatPane
                };
            }
        }
        return {};
    };
    QNR.Map.Adapter.Google.prototype.pointToPixel = function (k, l) {
        var m = l.getProjection();
        return m.fromLatLngToDivPixel(k._toGoogle());
    };

    function i(o, n) {
        var m = this;
        this._event = this._event || [];
        this._event.baidu = this._event.baidu || [];
        this._event.baidu[o] = this._event.baidu[o] || [];
        var k = this._event.baidu[o].length;
        this._event.baidu[o][k] = function (l) {
            l.target = m;
            if (l.point) {
                l.latlng = new QNR.Map.LatLng(new BMap.Point(l.point.lng, l.point.lat));
            }
            if (l.pixel) {
                l.pixel = {
                    x: l.pixel.x,
                    y: l.pixel.y
                };
            }
            n.apply(m, [l]);
        };
        this._objs.baidu.addEventListener(o, this._event.baidu[o][k]);
        return this._event.baidu[o][k];
    }

    function d(l, k) {
        g(this._event.baidu[l], k);
        this._objs.baidu.removeEventListener(l, k);
    }

    function a(p, o) {
        var n = this;
        this._event = this._event || [];
        this._event.google = this._event.google || [];
        this._event.google[p] = this._event.google[p] || [];
        var k = this._event.google[p].length;
        var m = google.maps.event.addListener(this._objs.google, p, function (q) {
            var l = q;
            if (q && q.latLng) {
                q.latlng = new QNR.Map.LatLng(new google.maps.LatLng(q.latLng.lat(), q.latLng.lng()));
            }
            if (q && q.pixel) {
                q.pixel = {
                    x: q.pixel.x,
                    y: q.pixel.y
                };
            }
            o.apply(n, [q]);
        });
        this._event.google[p][k] = m;
        return m;
    }

    function b(l, k) {
        g(this._event.google[l], k);
        google.maps.event.removeListener(k);
    }

    function e(m, k) {
        var l = function () {};
        l.prototype = k.prototype;
        m.prototype = new l();
        m.prototype.constructor = m;
    }

    function h(m, k) {
        for (var l in m.prototype) {
            if ("function" == typeof (m.prototype[l])) {
                k[l] = m.prototype[l];
            }
        }
    }

    function f(l, k) {
        if ("undefined" == typeof (l)) {
            return k;
        } else {
            if (l) {
                return true;
            } else {
                return false;
            }
        }
    }

    function g(m, l) {
        var k = m.length;
        while (k--) {
            if (k in m && m[k] === l) {
                m.splice(k, 1);
            }
        }
        return m;
    }

    function c(o) {
        var l = [],
            n = 0,
            m;
        for (m in o) {
            if (o.hasOwnProperty(m)) {
                l[n++] = m;
            }
        }
        return l;
    }
    var j = (function () {
        var l = 6378.137;

        function k(p) {
            return p * Math.PI / 180;
        }

        function o(q, w, p, u) {
            var t = k(q);
            var r = k(p);
            var x = t - r;
            var v = k(w) - k(u);
            var y = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(x / 2), 2) + Math.cos(t) * Math.cos(r) * Math.pow(Math.sin(v / 2), 2)));
            y = y * l;
            return y;
        }

        function m(s, v) {
            var u = Math.pow(2, s.getZoom());
            var p = new google.maps.LatLng(s.getBounds().getNorthEast().lat(), s.getBounds().getSouthWest().lng());
            var t = s.getProjection().fromLatLngToPoint(p);
            var r = s.getProjection().fromLatLngToPoint(v);
            var q = new google.maps.Point(Math.floor((r.x - t.x) * u), Math.floor((r.y - t.y) * u));
            return q;
        }

        function n(r, w, p) {
            var v = r.getProjection();
            var t = Math.pow(2, r.getZoom());
            var u = new google.maps.LatLng((p || r.getBounds()).getNorthEast().lat(), (p || r.getBounds()).getSouthWest().lng());
            var q = r.getProjection().fromLatLngToPoint(u);
            var x = new google.maps.Point(w.x / t + q.x, w.y / t + q.y);
            var s = r.getProjection().fromPointToLatLng(x);
            return s;
        }
        return {
            calDistance: o,
            getGPix: m,
            getGLatLng: n
        };
    })();
})();
(function () {
    function a() {
        this._attrdb = {};
    }
    a.prototype = {
        constructor: a,
        attr: function () {
            var e = this._attrdb;
            var g = [].slice.call(arguments);
            var b = g.length;
            if (b === 2) {
                e[g[0]] = g[1];
            } else {
                if (b === 1) {
                    var f = g[0];
                    var d = Object.prototype.toString.call(f);
                    if (d === "[object Object]") {
                        for (var c in f) {
                            if (f.hasOwnProperty(c)) {
                                e[c] = f[c];
                            }
                        }
                    } else {
                        if (d === "[object String]") {
                            return e[f];
                        }
                    }
                } else {
                    throw "不支持该类型的参数";
                }
            }
        },
        removeAttr: function (b) {
            delete this._attrdb[b];
        }
    };
    window.HashMap = a;
})();
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.confirmdialog = new Hogan.Template(function (e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="b_dialog b_deleteprompt js_content" style="width:456px;">\r');
    a.b("\n" + b);
    a.b('	<div class="e_dialog_hd paddingpatch">删除提示</div>\r');
    a.b("\n" + b);
    a.b('	<div class="e_dialog_ct">\r');
    a.b("\n" + b);
    a.b('		<div class="ct_cont">');
    a.b(a.v(a.f("msg", e, d, 0)));
    a.b("</div>\r");
    a.b("\n" + b);
    a.b("	</div>\r");
    a.b("\n" + b);
    a.b('	<div class="e_dialog_ft">\r');
    a.b("\n" + b);
    a.b('		<button class="btn_confirm ke-dialog-yes">确 定</button>\r');
    a.b("\n" + b);
    a.b('		<button class="btn_cancel ke-dialog-no">取 消</button>\r');
    a.b("\n" + b);
    a.b("	</div>\r");
    a.b("\n" + b);
    a.b('	<a href="#" class="btn_close ke-dialog-icon-close" title="关闭">x</a>\r');
    a.b("\n" + b);
    a.b("</div>");
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.comment_tipbox = new Hogan.Template(function (e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="b_download_dialog" style="width:456px; height:180px;">\r');
    a.b("\n" + b);
    a.b('    <div class="b_download_dialog_mark"></div>\r');
    a.b("\n" + b);
    a.b('    <div class="b_download_dialog_body js_content">\r');
    a.b("\n" + b);
    a.b('        <div class="e_dialog_hd"><a href="#" target="_blank" class="btn_close_small js_close"></a>提示</div>\r');
    a.b("\n" + b);
    a.b('        <div class="e_dialog_ct">\r');
    a.b("\n" + b);
    a.b('            <div class="ct_box clrfix">\r');
    a.b("\n" + b);
    a.b('                <div class="e_icon">icon2</div>\r');
    a.b("\n" + b);
    a.b('                <div class="e_text">抱歉，您两次发表间隔少于15秒,<br />请稍后再发布。</div>\r');
    a.b("\n" + b);
    a.b("            </div>\r");
    a.b("\n" + b);
    a.b("        </div>\r");
    a.b("\n" + b);
    a.b("    </div>\r");
    a.b("\n" + b);
    a.b("</div>");
    return a.fl();
});
(function () {
    var a = function (c) {
        id = 168;
        var b = new Image();
        b.width = 1;
        b.height = 1;
        b.src = "http://bc.qunar.com/clk?s=" + id + "&a=" + c + "&t=" + Math.random();
    };
    $(function () {
        $("body").delegate("*", "mousedown", function (c) {
            var b = $(c.currentTarget).data("headerclk");
            if (b) {
                a(b);
                c.stopPropagation();
            }
        });
    });
})();
(function (b, c) {
    var a = {
        getItem: function (d) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(d).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (g, j, f, e, d, h) {
            if (!g || /^(?:expires|max\-age|path|domain|secure)$/i.test(g)) {
                return false;
            }
            var i = "";
            if (f) {
                switch (f.constructor) {
                    case Number:
                        i = f === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + f;
                        break;
                    case String:
                        i = "; expires=" + f;
                        break;
                    case Date:
                        i = "; expires=" + f.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(g) + "=" + encodeURIComponent(j) + i + (d ? "; domain=" + d : "") + (e ? "; path=" + e : "") + (h ? "; secure" : "");
            return true;
        },
        removeItem: function (f, e, d) {
            if (!f || !this.hasItem(f)) {
                return false;
            }
            document.cookie = encodeURIComponent(f) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (d ? "; domain=" + d : "") + (e ? "; path=" + e : "");
            return true;
        },
        hasItem: function (d) {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(d).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function () {
            var d = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var e = 0; e < d.length; e++) {
                d[e] = decodeURIComponent(d[e]);
            }
            return d;
        }
    };
    window.docCookies = a;
})(jQuery);
(function (d, b) {
    var e = window.DataPuller;
    var a = function (g) {
        var f = document.cookie.match(new RegExp("(^| )" + g + "=([^;]*)(;|$)"));
        if (f != null) {
            return unescape(f[2]);
        }
        return null;
    };

    function c() {}
    c.prototype = {
        setIsProfessor: function (f) {
            this._isProfessor = f;
        },
        getPullUrl: function () {
            return "/space/user/message/unreadcount";
        },
        getTMPL: function () {
            return QTMPL.HEADER_PANNEL;
        },
        dataParser: function (f) {
            if (f && f.data) {
                var g = f.data;
                var h = g.RECOMMEND_COUNT + g.COMMEND_COUNT;
                h = this._isProfessor ? h + (g.NOTICE_TYPE_GOOD_APPLY + g.NOTICE_TYPE_NEW_DESTINATION) : h;
                d.extend(g, {
                    len: h,
                    isProfessor: this._isProfessor
                });
                return g;
            }
        },
        getYellowTip: function (f) {
            return ['<div class="tip_message">', '<span class="img_triangle"></span>', '<span class="icon"></span>您有<span class="sum">', f, "</span>条新消息哦~", "</div>"].join("");
        },
        renderHTML: function (g) {
            var f = [];
            f.push('<ul class="tag_item clrfix">');
            f.push('<li class="item" data-url="http://travel.qunar.com/space/?from=traveltop#js_book#1"><a href="#" class="link">我的攻略</a></li>');
            f.push('<li class="item" data-url="http://travel.qunar.com/space/?from=traveltop#js_collect#1#_c_f_f"><a href="#" class="link">我的收藏</a></li>');
            f.push(this.renderOneItem(1, g.RECOMMEND_COUNT, "http://travel.qunar.com/space/?from=traveltop#js_recommend#1", "我的推荐"));
            f.push(this.renderOneItem(2, g.COMMEND_COUNT, "http://travel.qunar.com/space/?from=traveltop#js_commt#1", "我的评论"));
            if (g.isProfessor) {
                f.push(this.renderOneItem(8, g.NOTICE_TYPE_GOOD_APPLY, "http://travel.qunar.com/space/?from=traveltop#js_placeControl#1", "精华申请"));
                f.push(this.renderOneItem(7, g.NOTICE_TYPE_NEW_DESTINATION, "http://travel.qunar.com/space/?from=traveltop#js_place#1", "目的地评论"));
            }
            return f.join("");
        },
        renderOneItem: function (j, i, h, g) {
            var f = [];
            f.push('<li class="item" data-url="' + h + '" data-type="' + j + '" data-num="' + i + '">');
            f.push('<a href="#" class="link">' + g);
            if (i > 0) {
                f.push('<span class="sum">' + i + "</span>");
            }
            f.push("</a></li>");
            return f.join("");
        },
        successDone: function (g, f) {
            var h = this.dataParser(g);
            f(this.getYellowTip(h.len), this.renderHTML(h), h.len);
        },
        loadBooks: function (j, f) {
            var h = {};
            var i = a("csrfToken");
            if (i) {
                h.csrf = i;
            }
            var g = this;
            d.ajax({
                url: g.getPullUrl(),
                data: h,
                success: function (k) {
                    g.successDone(k, f);
                },
                error: function () {
                    console.log("error");
                }
            });
        }
    };
    window.MessagePuller = c;
})(jQuery, window.xQNR);
(function (d, b) {
    var e = window.DataPuller;
    var c = function (m, k, j) {
        if (!m) {
            return "";
        }
        var o = 0,
            l = false,
            g = [];
        for (var h = 0, f = m.length; h < f; h++) {
            m.charCodeAt(h) > 127 ? o += 1 : o += 0.5;
            if (o > k) {
                l = true;
                break;
            }
            g.push(m.charAt(h));
        }
        return g.join("") + (l ? (typeof j !== "undefined" ? j : "...") : "");
    };

    function a() {}
    a.prototype = {
        getPullUrl: function () {
            return "/travelbook/index/getSideUserInfo";
        },
        getPullParms: function (f) {
            return {
                u: f
            };
        },
        getTMPL: function () {
            return QTMPL.HEADER_BOOKLST;
        },
        renderHTML: function (n) {
            var l = n.books;
            var k = [];
            k.push('<ul class="list_item clrfix">');
            for (var h = 0, g = l.length; h < g; h++) {
                var f = l[h];
                k.push('<li class="item"><a title="' + f.title + '" target="_blank" href="/travelbook/books/detail/finish/' + f.id + '/view" class="link"><span class="date">' + f.ctime + "</span>" + c(f.title, 10) + "</a></li>");
            }
            k.push("</ul>");
            return k.join("");
        },
        dataParser: function (f) {
            if (f && f.data && f.data.books) {
                var g = f.data.books;
                return {
                    books: g,
                    len: g.length
                };
            }
        },
        getYellowTip: function (f) {
            return ['<div class="tip_message">', '<span class="img_triangle"></span>', '<span class="icon"></span>您有<span class="sum">', f, "</span>篇临时攻略", "</div>"].join("");
        },
        successDone: function (g, f) {
            var h = this.dataParser(g);
            f(this.getYellowTip(h.len), this.renderHTML(h), h.len);
        },
        loadBooks: function (h, f) {
            var g = this;
            d.ajax({
                url: g.getPullUrl(),
                data: g.getPullParms(h),
                success: function (i) {
                    g.successDone(i, f);
                },
                error: function () {
                    console && console.log("error");
                }
            });
        }
    };
    window.BooksPuller = a;
})(jQuery, window.xQNR);

(function (a) {
    a.fn.menuAim = function (c) {
        this.each(function () {
            b.call(this, c);
        });
        return this;
    };

    function b(c) {
        var d = a(this),
            q = null,
            g = [],
            r = null,
            p = null,
            s = a.extend({
                rowSelector: "> li",
                submenuSelector: "*",
                submenuDirection: "right",
                tolerance: 75,
                enter: a.noop,
                exit: a.noop,
                activate: a.noop,
                deactivate: a.noop,
                exitMenu: a.noop
            }, c);
        var j = 3,
            f = 300;
        var e = function (t) {
            g.push({
                x: t.pageX,
                y: t.pageY
            });
            if (g.length > j) {
                g.shift();
            }
        };
        var o = function () {
            if (p) {
                clearTimeout(p);
            }
            if (s.exitMenu(this)) {
                if (q) {
                    s.deactivate(q);
                }
                q = null;
            }
            console.log("mouseleave Menu");
            console.log(q);
        };
        var l = function () {
            if (p) {
                clearTimeout(p);
            }
            s.enter(this);
            h(this);
        }, k = function () {
            s.exit(this);
        };
        var m = function () {
            i(this);
        };
        var i = function (t) {
            if (t == q) {
                return;
            }
            if (q) {
                s.deactivate(q);
            }
            s.activate(t);
            q = t;
        };
        var h = function (u) {
            var t = n();
            if (t) {
                p = setTimeout(function () {
                    h(u);
                }, t);
            } else {
                i(u);
            }
        };
        var n = function () {
            if (!q || !a(q).is(s.submenuSelector)) {
                return 0;
            }
            var x = d.offset(),
                t = {
                    x: x.left,
                    y: x.top - s.tolerance
                }, E = {
                    x: x.left + d.outerWidth(),
                    y: t.y
                }, G = {
                    x: x.left,
                    y: x.top + d.outerHeight() + s.tolerance
                }, y = {
                    x: x.left + d.outerWidth(),
                    y: G.y
                }, z = g[g.length - 1],
                D = g[0];
            if (!z) {
                return 0;
            }
            if (!D) {
                D = z;
            }
            if (D.x < x.left || D.x > y.x || D.y < x.top || D.y > y.y) {
                return 0;
            }
            if (r && z.x == r.x && z.y == r.y) {
                return 0;
            }

            function A(I, H) {
                return (H.y - I.y) / (H.x - I.x);
            }
            var C = E,
                u = y;
            if (s.submenuDirection == "left") {
                C = G;
                u = t;
            } else {
                if (s.submenuDirection == "below") {
                    C = y;
                    u = G;
                } else {
                    if (s.submenuDirection == "above") {
                        C = t;
                        u = E;
                    }
                }
            }
            var v = A(z, C),
                B = A(z, u),
                F = A(D, C),
                w = A(D, u);
            if (v < F && B > w) {
                r = z;
                return f;
            }
            r = null;
            return 0;
        };
        d.mouseleave(o).find(s.rowSelector).mouseenter(l).mouseleave(k).click(m);
        a(document).mousemove(e);
    }
})(jQuery);
(function () {
    var p = !! ($(".q_header_travel_home").size() > 0);
    var m = "/travelbook/index/getSideNavigation";
    var q = $(".q_header_quick_nav");
    if (q.size() == 0) {
        return;
    }
    var g = q.find(".list_item");
    var n = q.find(".list_item > li");
    var h = q.find("#sub_nav_box");
    var j, b;
    var a, c, f;
    var i = 0,
        d = 0;
    n.find("a").bind("click", function () {
        return false;
    });
    q.find("a.header_quick_nav").bind("click", function () {
        return false;
    });
    g.menuAim({
        activate: l,
        exitMenu: e
    });

    function l(s) {
        if (i != 0) {
            clearTimeout(i);
        }
        h.show();
        var t = n.index(s);
        if (f != null) {
            f.removeClass("current");
        }
        f = $(s).addClass("current");
        if (c != t) {
            c = t;
            if (a != null) {
                a.hide();
            }
            if (t == 0) {
                a = b.show();
            } else {
                if (t > 0) {
                    a = j.eq(t - 1).show();
                }
            }
        }
    }

    function e() {
        i = setTimeout(k, 200);
        return true;
    }
    if (!p) {
        var o = q.find(".l_menu_box");
        q.bind("mouseenter", function () {
            if (d != 0) {
                clearTimeout(d);
            }
            o.show();
        }).bind("mouseleave", function () {
                d = setTimeout(r, 200);
            });
    }

    function r() {
        o.fadeOut(100);
    }
    h.bind("mouseenter", function () {
        if (i != 0) {
            clearTimeout(i);
        }
    }).bind("mouseleave", function () {
            i = setTimeout(k, 200);
        });
    $.getJSON(m, function (s) {
        if (s.data != undefined) {
            var v = "";
            var u = s.data;
            for (var t = 1; t < 6; t++) {
                v += u["" + t];
            }
            h.html(v);
            b = h.find(".inthehot_detailbox").hide();
            j = h.find(".inland_detailbox").hide();
        }
    });

    function k() {
        h.hide();
        if (f != null) {
            f.removeClass("current");
        }
    }
})();
(function (a, e) {
    if (a.Storage) {
        return;
    }
    var d = {
        _store: null,
        _getStore: function () {
            if (this._store) {
                return this._store;
            }
            if ( !! e.localStorage) {
                this._store = b;
            } else {
                this._store = c;
            }
            return this._store;
        },
        isAvailable: function () {
            return !!(this._getStore());
        },
        setItem: function (g, h) {
            var f = this._getStore();
            return f && f.setItem(g, h);
        },
        getItem: function (g) {
            var f = this._getStore();
            return f && f.getItem(g);
        },
        removeItem: function (g) {
            var f = this._getStore();
            return f && f.removeItem(g);
        },
        clear: function () {
            var f = this._getStore();
            f && f.clear();
        },
        onstorage: function (g, h) {
            var f = this._getStore();
            f && f.onstorage(g, h);
        },
        sync: function (h, g, k, f) {
            if (!a.isFunction(h)) {
                return false;
            }
            var m = this._genSyncKey(h);
            var l = "~{##}~";
            var j = "~{###}~";
            var n = false;
            this.onstorage(f || m, function (q) {
                if (!n || !d.isStoreTriggerSelf()) {
                    var p = q.split(l)[1],
                        o = p.split(j);
                    h.apply(g, o);
                }
                n = false;
            });
            var i = this;
            return function () {
                if (!k) {
                    h.apply(g, arguments);
                }
                n = true;
                i.setItem(f || m, (new Date()) * 1 + "" + Math.random() + l + ([].slice.call(arguments).join(j)));
            };
        },
        _genSyncKey: function (k) {
            var f = 30,
                k = k.toString();
            var n = "",
                h = /^function\s+([^\(]+)\s*\(/ig,
                m = h.exec(k);
            if (m) {
                n = m[1];
                n = n.replace(/[^\w]+/ig, "");
            }
            k = k.replace(/(function|[^\w]+)/ig, "");
            f -= n.length;
            if (f <= 0) {
                return n.substring(0, 30);
            }
            if (k.length <= f) {
                return n + k;
            }
            var g = f,
                p = k.length,
                j = Math.ceil(k.length / f),
                o = [];
            for (var l = 0; l < k.length; l += j) {
                o.push(k.substring(l, l + 1));
                g--;
                p -= j;
                if (p <= g) {
                    o.push(k.substring(l));
                    break;
                }
            }
            return n + o.join("");
        },
        isStoreUseTimer: function () {
            return this._getStore().useTimer;
        },
        isStoreTriggerSelf: function () {
            return this._getStore().triggerSelf;
        },
        getStoreInterval: function () {
            return this._getStore().interval;
        }
    };
    var b = (function () {
        var f = e.localStorage;

        function g(i, j) {
            var h = f[i];
            return function (k) {
                setTimeout(function () {
                    k = k || e.storageEvent;
                    var m = k.key,
                        n = k.newValue;
                    if (!m) {
                        var l = f[i];
                        if (l != h) {
                            m = i;
                            n = l;
                        }
                    }
                    if (m == i) {
                        j && j(n);
                        h = n;
                    }
                }, 0);
            };
        }
        return {
            getItem: function (h) {
                return f.getItem(h);
            },
            setItem: function (h, i) {
                return f.setItem(h, i);
            },
            removeItem: function (h, i) {
                return f.removeItem(h);
            },
            clear: function () {
                return f.clear();
            },
            onstorage: function (i, k) {
                var h = a.Browser;
                if (!this.useTimer) {
                    if (document.attachEvent && !h.isOpera) {
                        document.attachEvent("onstorage", g(i, k));
                    } else {
                        e.addEventListener("storage", g(i, k), false);
                    }
                } else {
                    var j = g(i, k);
                    setInterval(function () {
                        j({});
                    }, this.interval);
                }
            },
            useTimer: (a.Browser.isIE6 || a.Browser.isIE9) || a.Browser.isChrome,
            triggerSelf: a.Browser.isIE || a.Browser.isChrome,
            interval: 1000
        };
    })();
    var c = (function () {
        var g = "testlocal_storage";

        function f(i, j) {
            var h = c.getItem(i);
            return function () {
                var k = c.getItem(i);
                if (h != k) {
                    j && j(k);
                    h = k;
                }
            };
        }
        return {
            _store: null,
            _getStore: function () {
                if (!this._store) {
                    try {
                        this._store = document.createElement("input");
                        this._store.type = "hidden";
                        this._store.addBehavior("#default#userData");
                        document.body.appendChild(this._store);
                    } catch (k) {
                        var j = [];
                        for (var h in k) {
                            j.push(h + ": " + k[h]);
                        }
                        document.title = (j.join("\n"));
                        return false;
                    }
                }
                return this._store;
            },
            getItem: function (i) {
                var h = this._getStore();
                if (!h) {
                    return false;
                }
                h.load(g);
                return h.getAttribute(i);
            },
            setItem: function (i, j) {
                var h = this._getStore();
                if (!h) {
                    return false;
                }
                h.load(g);
                h.setAttribute(i, j);
                h.save(g);
            },
            removeItem: function (i, j) {
                var h = this._getStore();
                if (!h) {
                    return false;
                }
                h.load(g);
                h.removeAttribute(i);
                h.save(g);
            },
            clear: function () {
                var k = this._getStore();
                if (!k) {
                    return false;
                }
                var m = k.XMLDocument;
                var j = m.selectSingleNode("ROOTSTUB");
                for (var l = 0; l < j.attributes.length; ++l) {
                    var h = j.attributes[l];
                    k.removeAttribute(h.baseName);
                }
                k.save(g);
            },
            onstorage: function (h, j) {
                var i = f(h, j);
                setInterval(function () {
                    i();
                }, this.interval);
            },
            isAvailable: function () {
                try {
                    var h = this._getStore();
                    if (!h) {
                        return false;
                    }
                    h.save();
                    return true;
                } catch (i) {
                    if (i.number && Math.abs(parseInt(i.number)) == 2146827838) {
                        return true;
                    }
                    if (i.description && (i.description.indexOf("Wrong number") != -1 || i.description.indexOf("\u9519\u8bef\u7684\u53c2\u6570\u4e2a\u6570") != -1)) {
                        return true;
                    }
                    return false;
                }
            },
            useTimer: true,
            interval: 1000,
            triggerSelf: true
        };
    })();
    a.Storage = d;
})(QNR, window);
(function (a) {
    var c = {
        dom: $('<a class="e_handler_gotop" title="向上" href="#"></a>'),
        initEvent: function () {
            var e = this;
            var h = 100;
            var g = e.dom;
            var f = a.Browser;
            $(window).bind("scroll.gototop", function () {
                var i = $(this).scrollTop();
                if (i > h) {
                    g.show();
                } else {
                    g.hide();
                }
            });
        }
    };
    var d = {
        dom: $('<a href="#" title="反馈" class="e_handler_feedback" data-beacon="Feedback"></a>'),
        FEEDBACK_HTML: ['<div class="b_dialog feedbackwrap js_feedbackwrap" style="width:612px">', '<div class="e_dialog_hd">意见反馈</div>', '<div class="e_dialog_ct">', '<div class="ct_cont feedback_innerbox">', '<div class="feedback_con">', '<div class="pack backcon_pack"><textarea class="gray">如果您在过程中有任何疑问或对产品有任何意见或者建议，欢迎随时向我们提出~，我们会认真听取您的建议，将产品做得更好用，谢谢！</textarea><div class="tipmsg"></div></div>', '<div class="pack userinfo_pack clrfix">', "<p>请尽量填写联系方式，以便我们及时与您联系</p>", '<div class="f_email f_bag"><label for="femail">邮箱：</label><input type="text" name="email" id="femail"/><div class="tipmsg"></div></div>', '<div class="f_tel" f_bag><label for="ftel">电话：</label><input type="text" name="tel" id="ftel"/><div class="tipmsg"></div></div>', "</div>", "</div>", '<a href="javascript:;" class="st" data-beacon="Feedback_ed">提交</a>', "</div>", "</div>", '<div class="e_dialog_ft hide"></div>', '<a href="#" class="btn_close js_close" title="关闭">x</a>', "</div>"].join(""),
        DEFAULT_TIP: "如果您在过程中有任何疑问或对产品有任何意见或者建议，欢迎随时向我们提出~，我们会认真听取您的建议，将产品做得更好用，谢谢！",
        timer: null,
        initEvent: function () {
            var e = this;
            e.dom.bind("click", e.loadFeedBack);
        },
        loadFeedBack: function (e) {
            var f = d;
            e.preventDefault();
            var g = new a.Dialog({
                content: d.FEEDBACK_HTML,
                newMask: true,
                closeBtn: {
                    handler: function () {
                        clearTimeout(f.timer);
                        g.hide();
                        g.remove();
                        g = null;
                    }
                }
            });
            g.show();
            f.initEventPanel(g);
        },
        initEventPanel: function (h) {
            var q = this;
            var o = "http://travel.qunar.com/space/suggest";
            var g = d.DEFAULT_TIP;
            var j = h.getContainer();
            var l = j.find("textarea");
            var f = j.find("#femail");
            var n = j.find("#ftel");
            var p = function () {
                var r = l.next();
                if (l.val() == g) {
                    l.val("").removeClass("gray");
                }
                k();
            };
            var i = function () {
                var r = $.trim(l.val());
                var s = l.next();
                if (r == "" || r == g) {
                    l.val(g).addClass("gray");
                    s.html("请输入您的意见或者建议").addClass("error");
                } else {
                    s.removeClass("error");
                }
            };
            var m = function () {
                var s = $(this).prev(".feedback_con");
                $("textarea", s).blur();
                $("input", s).blur();
                if (!s.find(".error").length) {
                    a.UserInfo.getTempId(function (u) {
                        var t = o;
                        var v = {
                            csrfToken: a.UserInfo._getCookie("csrfToken"),
                            userId: u,
                            body: $.trim(l.val()),
                            email: $.trim(f.val()),
                            tel: $.trim(n.val())
                        };
                        $.ajax({
                            type: "POST",
                            url: t,
                            cache: false,
                            data: v,
                            success: function (w) {
                                if (w.data && !w.errcode) {
                                    r(true);
                                } else {
                                    r(false);
                                }
                            },
                            error: function () {
                                r(false);
                            }
                        });
                    });
                }

                function r(v) {
                    var u = {
                        "1": {
                            txt: "您的反馈已提交成功，谢谢您的支持和帮助~",
                            className: "okcon"
                        },
                        "2": {
                            txt: "发送失败，请稍后重试",
                            className: "failcon"
                        }
                    };
                    if (v) {
                        var t = u[1];
                    } else {
                        var t = u[2];
                    }
                    j.find(".feedback_innerbox").html('<div class="sendend"><div class="' + t.className + '">' + t.txt + "</div></div>");
                    h.toCenter();
                    q.timer = setTimeout(function () {
                        if (h) {
                            h.hide();
                            h.remove();
                            h = null;
                        }
                    }, 2000);
                }
            };
            var k = function () {
                var s = 500;
                var u = l.next();
                var t = $.trim(l.val());
                var r = t.length;
                if (r >= s) {
                    u.html("数字达到<span class='num'>" + s + "</span>个了，不能再输了").removeClass("error");
                    l.val(t.substring(0, s));
                    return;
                } else {
                    if (r >= 0) {
                        u.html("还可以输入<span class='num'>" + (s - t.length) + "</span>个字").removeClass("error");
                    }
                }
            };
            var e = function () {
                var u = /^[a-zA-Z0-9_+.-]+@([a-zA-Z0-9-]+\.)+[a-z0-9]{2,4}$/i;
                var x = /^1[0-9]{10}$/;
                var s = $(this);
                var w = s.attr("name");
                var r = $.trim(s.val());
                var t = s.next();
                var v = "";
                if (w == "email" && r !== "" && !u.test(r)) {
                    v = "请输入正确的邮箱";
                } else {
                    if (w == "tel" && r != "" && !x.test(r)) {
                        v = "请输入正确的电话";
                    }
                }
                v && t.html(v).addClass("error");
                !v && t.html("").removeClass("error");
            };
            l.bind("focus", p).bind("change", k).bind("blur", i).bind("keyup", k).bind("keydown", k);
            j.delegate("input", "blur", e);
            j.delegate("a.st", "click", m);
        }
    };
    var b = {
        container: null,
        titBox: null,
        init: function () {
            var e = this;
            e.beforeInit();
            $(window).trigger("scroll.sideTool");
        },
        initCommonTools: function () {
            var e = this;
            e.addTool(d);
            e.addTool(c);
            d.initEvent();
            c.initEvent();
        },
        beforeInit: function () {
            var e = this;
            var f = $("#sidetool");
            if (!f.length) {
                var f = $('<div id="sidetool" class="b_sidetool clrfix"><div class="sidetool_inner"><div class="e_tool"></div><div class="e_tool_con"></div></div></div>');
                $("body").append(f);
                e.fixed();
            }
            e.container = f;
            e.titBox = f.find(".e_tool");
        },
        fixed: function () {
            var f = this;
            var g = a.Browser;
            var h = $(window);
            if (g.isIE6) {
                var e = function () {
                    var i = h.scrollTop();
                    f.container.css({
                        position: "absolute",
                        height: h.height() + "px",
                        top: (i) + "px",
                        right: "0px"
                    });
                    f.container.find(".sidetool_inner").css({
                        height: h.height() + "px"
                    });
                };
                $(window).bind("scroll.sideTool", e);
                $(window).bind("resize.sideTool", e);
            }
        },
        addTool: function (g, f) {
            var e = this;
            var h = f - 1;
            if (f) {
                var i = $(">a", e.titBox);
                if (i.length >= h) {
                    i.eq(h).before(g.dom);
                } else {
                    e.titBox.append(g.dom);
                }
            } else {
                e.titBox.append(g.dom);
            }
        },
        getTitBox: function () {
            return this.titBox;
        },
        getConBox: function () {
            return this.container.find("div.e_tool_con");
        }
    };
    a.namespace("sideTools", function () {
        a.sideTools = b;
        a.sideTools.init();
        a.sideTools.initCommonTools();
    });
})(QNR);
define("module/comment/class/TipBox", [], function (b, a, c) {
    function d() {
        this._constructor();
    }
    c.exports = d;
    d.prototype = {
        _constructor: function () {
            this._initDialog();
        },
        _initDialog: function () {
            this._box = new QNR.Dialog({
                content: QTMPL.comment_tipbox.render({})
            });
            this.$dom = this._box.getContent();
            this.$ct_box = this.$dom.find(".ct_box");
            this.$e_text = this.$dom.find(".e_text");
        },
        showBox: function (g, h) {
            var f = this;
            var e = this.$dom;
            if (g === 13) {
                this.$ct_box.addClass("ct_box_2");
                this.$e_text.html("抱歉，您两次发表间隔少于15秒，<br>请稍后再发布。");
            } else {
                if (g === 10311) {
                    this.$ct_box.removeClass("ct_box_2");
                    this.$e_text.html("相同内容请间隔十分钟再进行发布哦！");
                } else {}
            }
            this._box.show();
            window.setTimeout(function () {
                f._box.hide();
            }, 2000);
        }
    };
});
define("module/comment/class/AddComment", ["./TipBox"], function (b, a, d) {
    var c = QNR.Storage;
    var e = b("./TipBox");
    var g = new e();

    function f(i, h) {
        f.$super.call(this);
        this.basedom = i;
        this.attr("globalvars", h);
        this._constructor();
    }
    QNR.extend(f, HashMap, {
        _constructor: function () {
            this.initInputBox();
            this.checkUncommitData();
        },
        getTypeMap: function () {
            return {
                BOOK: 10301,
                BOOKPOI: 10302
            };
        },
        buildPostParms: function () {
            var h = this;
            var i = h.attr("globalvars");
            return {
                body: h.attr("body"),
                bookId: i.bookId,
                commentType: h.getTypeMap()["BOOK"]
            };
        },
        initInputBox: function () {
            var i = this,
                j = this.basedom;
            var h = new QNR.InputCmp({
                dom: j,
                s_input: "textarea",
                s_msg: ".info_error",
                s_submit: ".js_submit_comment",
                maxlength: 300,
                post: function (k, l) {
                    i.attr("body", $.trim(k));
                    i.saveToLocalDb("tmp_comment_str", i.buildPostParms());
                    i.doSubmit();
                }
            });
            this.commitInput = h;
            this.success_tip = j.find(".success_tip");
            this.textarea = j.find("textarea");
        },
        beforeAjax: function (i) {
            var h = QNR.UserInfo._getCookie("csrfToken");
            if (h) {
                i.csrfToken = h;
            }
            return i;
        },
        afterSuccess: function (j, i) {
            $(this).trigger("event_AfteraddNew", [j, i]);
            var h = this;
            h.textarea.hide();
            h.success_tip.show();
            setTimeout(function () {
                h.success_tip.hide();
                h.commitInput.reset();
                h.textarea.show().focus();
            }, 1000);
            h.delFromLocalDb("tmp_comment_str");
        },
        saveToLocalDb: function (i, h) {
            c.setItem(i, JSON.stringify(h));
        },
        delFromLocalDb: function (h) {
            c.removeItem(h);
        },
        doSubmit: function (h) {
            var i = this.buildPostParms();
            var j = this;
            this.beforeAjax(i);
            $.ajax({
                url: "/space/comments",
                type: "post",
                data: i,
                success: function (k) {
                    if (k) {
                        if (k.errcode === 0) {
                            j.afterSuccess(k.data.comment, k.data.id);
                        } else {
                            if (k.errcode === 7) {
                                j._showLogin(window.location.href, j.doSubmit, "tmp_comment_str");
                            } else {
                                if (k.errcode === 10311 || k.errcode === 13) {
                                    g.showBox(k.errcode, k.errmsg);
                                } else {
                                    j.commitInput._msg_dom.html(k.errmsg).css("color", "#FF6600").show();
                                }
                            }
                        }
                    }
                },
                error: function (k) {
                    if (k.statusText && "error" == k.statusText) {
                        j.basedom.find(".info_error").css("color", "#FF6600").html("输入内容违反相关规定，请修改后提交");
                    }
                }
            });
        },
        _showLogin: function (j, h, i) {
            var k = this;
            QNR.loadModule("login_panel", function () {
                var l = new LoginDialog({
                    callbackFun: function (n) {
                        var m = n.errcode;
                        if (m === 0) {
                            k.delFromLocalDb(i);
                            h.call(k);
                            this.hide();
                        } else {
                            this.showErrorMsg(n.errmsg);
                        }
                    },
                    callback: j
                });
                l.show();
            });
        },
        checkUncommitData: function () {
            var h = c.getItem("tmp_comment_str");
            if (h) {
                this.attr(JSON.parse(h));
                this.delFromLocalDb("tmp_comment_str");
                this.doSubmit();
            }
        }
    });
    d.exports = f;
});
define("module/comment/CommentAdd", ["module/comment/class/AddComment"], function (c, b, d) {
    var e = c("module/comment/class/AddComment");

    function a(g, f) {
        a.$super.call(this, g, f);
    }
    QNR.extend(a, e, {});
    d.exports = a;
});
define("module/comment/class/CommentList", [], function (b, a, d) {
    var c = QNR.Storage;

    function e(g, f) {
        e.$super.call(this);
        this.basedom = g;
        this.attr("globalvars", f);
        this._constructor();
    }
    QNR.extend(e, HashMap, {
        _constructor: function () {
            this.initEvents();
            this.initConfirmDialog();
            this.checkUncommitData();
        },
        initEvents: function () {
            var f = this.basedom;
            var g = this;
            f.delegate("dl.e_ct", "mouseenter", function (h) {
                $(this).addClass("e_ct_hover");
            });
            f.delegate("dl.e_ct", "mouseleave", function (h) {
                $(this).removeClass("e_ct_hover");
            });
            f.delegate(".js_delete", "click", function (j) {
                j.preventDefault();
                var i = $(this);
                var h = i.attr("data");
                g._confirm.setCallbacks(function () {
                    g.attr("data-url", h);
                    g.saveToLocalDb("tmp_delstr", {
                        "data-url": h
                    });
                    g.submitDel();
                }).show();
            });
        },
        initConfirmDialog: function () {
            this._confirm = new ConfirmDialog(QTMPL.confirmdialog.render({
                msg: "确定要删除该评论么？"
            }));
            this._cfmdialog = this._confirm.dialog;
        },
        buildPostParms: function () {
            return {
                bookId: this.attr("globalvars")["bookId"],
                pageSize: 4
            };
        },
        beforeAjax: function (g) {
            var f = QNR.UserInfo._getCookie("csrfToken");
            if (f) {
                g.csrfToken = f;
            }
            return g;
        },
        renderList: function (f) {
            var g = this.basedom;
            if (f && f.data) {
                if (f.data.count > 0) {
                    g.html(f.data.html).show();
                } else {
                    g.empty().hide();
                }
                $(this).trigger("rendersuccess");
            }
        },
        saveToLocalDb: function (g, f) {
            c.setItem(g, JSON.stringify(f));
        },
        delFromLocalDb: function (f) {
            c.removeItem(f);
        },
        loadList: function () {
            var f = this.buildPostParms();
            var g = this;
            this.beforeAjax(f);
            $.ajax({
                url: "/travelbook/comments",
                type: "get",
                data: f,
                success: function (h) {
                    g.renderList(h);
                }
            });
        },
        submitDel: function () {
            var f = this;
            var g = {
                _method: "delete"
            };
            f.beforeAjax(g);
            $.post(f.attr("data-url"), g, function (h) {
                if (h) {
                    if (h.errcode === 0) {
                        f.delFromLocalDb("tmp_delstr");
                        f.loadList();
                    } else {
                        if (h.errcode === 7) {
                            f._showLogin(window.location.href, f.submitDel, "tmp_delstr");
                        } else {}
                    }
                }
            });
        },
        _showLogin: function (h, f, g) {
            var i = this;
            QNR.loadModule("login_panel", function () {
                var j = new LoginDialog({
                    callbackFun: function (l) {
                        var k = l.errcode;
                        if (k === 0) {
                            i.delFromLocalDb(g);
                            f.call(i);
                            this.hide();
                        } else {
                            this.showErrorMsg(l.errmsg);
                        }
                    },
                    callback: h
                });
                j.show();
            });
        },
        checkUncommitData: function () {
            var f = c.getItem("tmp_delstr");
            if (f) {
                this.attr("data-url", JSON.parse(f)["data-url"]);
                this.delFromLocalDb("tmp_delstr");
                this.submitDel();
            }
        }
    });
    d.exports = e;
});
define("module/comment/CommentList", ["module/comment/class/CommentList"], function (b, a, c) {
    var e = b("module/comment/class/CommentList");

    function d(g, f) {
        d.$super.call(this, g, f);
    }
    QNR.extend(d, e, {});
    c.exports = d;
});