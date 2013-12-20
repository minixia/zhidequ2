define("finish3nd/config", ["finish3nd/utils/BitString"], function (d, c, e) {
    var b = d("finish3nd/utils/BitString");
    var f = function (g) {
        return g ? g.split(/、|\s|\t/).join(" ") : "";
    };
    var a = function (l) {
        var k = function (h) {
            return (h < 10 ? "0" : "") + h;
        };
        var i = new Date(),
            p, o, n, j, g;
        if (i.setTime(l)) {
            p = i.getFullYear();
            o = k(i.getMonth() + 1);
            n = k(i.getDate());
            j = k(i.getHours());
            g = k(i.getMinutes());
            return p + "-" + o + "-" + n + " " + j + ":" + g;
        } else {
            return "";
        }
    };
    return {
        URLS: {
            TRAVEL_PLACE: "http://travel.qunar.com/place",
            BOOKS_DETAIL: "http://travel.qunar.com/travelbook/books/detail",
            IMAGE_AUTHOR: "http://travel.qunar.com/place/api/book/image/" + window.__BOOK_ID__,
            IMAGE_SYSTEM: "http://travel.qunar.com/place/api/dest/best_image/detail",
            IMAGE_UPLOAD: "http://travel.qunar.com/space/images/book/" + window.__BOOK_ID__,
            SET_IMGVALID: "http://travel.qunar.com/space/images/book/set_valid/" + window.__BOOK_ID__,
            IMAGE_DELETE: "http://travel.qunar.com/space/images",
            BOOK_COMMENT: "http://travel.qunar.com/travelbook/comments",
            SEND_COMMENT: "http://travel.qunar.com/space/comments",
            IMAGES_INTRO: "http://travel.qunar.com/space/images/intro/",
            COLLECT_ADD: "http://travel.qunar.com/space/bookcollection/add"
        },
        PLAN_ELE_CONFIG: {
            ELE_TYPE_DISTRICT: b.or(24, 3, 17),
            ELE_TYPE_DESTPOI: b.or(4, 5, 6, 7, 8),
            ELE_TYPE_CUSTOMIZE: b.or(15, 16, 18, 19, 20),
            ELE_TYPE_TRAFFIC: b.or(12, 13, 14, 21, 22, 23),
            ELE_TYPE_OTHERS: b.or(2, 9, 10),
            ELE_TYPE_CUSTOMIZE_MAP: {
                15: 6,
                16: 4,
                18: 5,
                19: 7,
                20: 8
            },
            ELE_TYPE_POI: b.or(4, 5, 6, 7, 8, 16, 18, 15, 19, 20),
            IS_CITY_TRAFFIC: b.or(22, 23),
            NOT_CITY_TRAFFIC: b.or(13, 12, 14),
            MEMO_MAX_LENGTH: 300
        }
    };
});
(function (a, c, b) {
    a.idFactory = function (d) {
        var e = 0;
        return function () {
            return d + (e++);
        };
    };
    a.winScroll = (function () {
        var d;
        document.body.scrollTop = 1;
        if (document.body.scrollTop === 1) {
            d = document.body;
        } else {
            d = document.documentElement;
        }
        document.body.scrollTop = 0;
        return function (h, i, j) {
            var e = a.type(i);
            var f = 10;
            if (e === "function") {
                j = i;
                i = f;
            } else {
                if (e !== "number") {
                    i = f;
                }
            }
            var g = Math.ceil(h / i);
            c(d).animate({
                scrollTop: h
            }, g, function () {
                j && j();
            });
        };
    })();
    a.getHashParams = function () {
        var f = b.location.hash || "#",
            d = {};
        var e = f.replace(/.*?#.*?!*/, "");
        a.forEach(e.split("&"), function (h) {
            var g = h.split("=");
            if (g[1]) {
                d[g[0]] = decodeURIComponent(g[1]);
            }
        });
        return d;
    };
})(QNR, jQuery, window);
define("finish3nd/utils/Http", [], function (c, b, d) {
    var g = c("jquery");
    var e = {
        dataType: "json",
        type: "get",
        timeout: 30000,
        error: h
    };
    var a = {
        ajax: f,
        post: function (k, l, m, j) {
            j = j || h;
            var i = f({
                url: k,
                data: l,
                success: m,
                type: "post",
                error: j
            });
            return i;
        },
        get: function (k, l, m, j) {
            j = j || h;
            var i = f({
                url: k,
                data: l,
                success: m,
                error: j
            });
            return i;
        },
        jsonp: function (k, l, m, j) {
            j = j || h;
            var i = f({
                url: k,
                data: l,
                dataType: "jsonp",
                success: QNR.proxy(m, context),
                error: QNR.proxy(j, context)
            });
            return i;
        }
    };

    function h() {
        console.log(arguments);
    }

    function f(k) {
        var m = function (o) {
            var n = [].slice.call(arguments, 0);
            if ((o.success === true || o.ret === true) && QNR.isFunction(l.success)) {
                k.success.apply(this, n);
            } else {
                k.error.apply(this, n);
            }
        };
        var l = g.extend({}, e, k, {
            success: m,
            error: k.error || h
        });
        var j = QNR.UserInfo._getCookie("csrfToken");
        if (j) {
            switch (QNR.type(l.data)) {
                case "object":
                    l.data.csrfToken = j;
                    break;
                case "string":
                    l.data += "&csrfToken=" + j;
                default:
                    l.data = {
                        csrfToken: j
                    };
                    break;
            }
        }
        var i = g.ajax(l);
        return i;
    }
    return a;
});
define("finish3nd/utils/Fixed", ["jquery"], function (f, i, c) {
    var j = f("jquery");
    var h = QNR.Browser.isIE6;
    var n = j(window);
    var o = n[0].document;
    var b = "fixed_",
        m = 0;
    var e = 100;
    var d = {
        type: "bottom",
        offset: 0,
        handler: {
            fixed: j.noop,
            reset: j.noop,
            start: j.noop,
            end: j.noop
        }
    };
    var g = function (t, q) {
        q = QNR.mix(q || {}, d);
        var v = t.offset();
        var A = {
            width: n.width(),
            height: n.height()
        };
        var u = q.offset || 0;
        var y = q.type || "bottom";
        var z = b + m++;
        var x = t.clone().hide().addClass("js_fixed_clone");
        if (!x.attr("id")) {
            x.attr("id", z);
        } else {
            x.addClass(t[0].tagName + z);
        }
        t.after(x);
        var B = {
            position: t.css("position"),
            top: t.css("top"),
            bottom: t.css("bottom"),
            "z-index": t.css("z-index")
        };
        t.data({
            org_css: B,
            fixed_id: z
        });
        var s = false;
        var r = null;
        var w = function () {
            if (r) {
                clearTimeout(r);
            }
            r = setTimeout(function () {
                if (a[y](v.top, u)) {
                    x.css("visibility", "hidden").show();
                    q.handler.fixed(t);
                    k[y](t, u);
                    if (!s) {
                        s = true;
                        q.handler.start();
                    }
                } else {
                    x.hide();
                    q.handler.reset(t);
                    p(t, B);
                    if (s) {
                        s = false;
                        q.handler.end();
                    }
                }
            }, 25);
        };
        n.bind("scroll." + z, w);
        n.bind("resize." + z, function () {
            if (s) {
                v = x.show().offset();
                x.hide();
            } else {
                v = t.offset();
            }
        });
    };
    var l = function (s) {
        if (s.data("org_css")) {
            var q = s.data("org_css");
            var r = s.data("fixed_id");
            var t = j("#" + r);
            if (!t[0]) {
                t = j("." + s[0].tagName + r);
            }
            n.unbind("scroll." + r).unbind("resize." + r);
            t.hide().remove();
            s.removeData("org_css").removeData("fixed_id");
        }
        return s;
    };
    var p = function (r, q) {
        r.data("fixed", false);
        r.css(q);
    };
    var k = {
        top: function (r, q) {
            if (!r.data("fixed")) {
                r.css({
                    position: "fixed",
                    top: q,
                    "z-index": e
                });
                r.data("fixed", false);
            }
        },
        bottom: function (r, q) {
            if (!r.data("fixed")) {
                r.css({
                    position: "fixed",
                    bottom: q,
                    "z-index": e
                });
                r.data("fixed", false);
            }
        }
    };
    var a = {
        top: function (r, s) {
            var q = n.scrollTop();
            if (q + s >= r) {
                return true;
            }
            return false;
        },
        bottom: function (r, s) {
            var q = n.height();
            var r = n.scrollTop();
            if (r + q - s > s) {
                return true;
            }
            return false;
        }
    };
    if (h) {
        g = function (s, q) {
            q = QNR.mix(q || {}, d);
            var v = s.css("position");
            var u = s.offset();
            var z = {
                width: n.width(),
                height: n.height()
            };
            var t = q.offset || 0;
            var x = q.type || "bottom";
            var y = b + m++;
            var w = s.clone().hide().addClass("js_fixed_clone");
            var r = false;
            if (!w.attr("id")) {
                w.attr("id", y);
            } else {
                w.addClass(s[0].tagName + y);
            }
            s.after(w);
            s.data("fixed_id", y);
            n.bind("scroll." + y, function () {
                if (a[x](u.top, t)) {
                    if (!r) {
                        w.css({
                            visibility: "hidden"
                        }).show();
                        s.appendTo("body").css({
                            position: "absolute",
                            top: u.top,
                            left: u.left
                        }).show();
                        r = true;
                        q.handler.start();
                    }
                    q.handler.fixed(s);
                    if (x === "top") {
                        s.css("top", n.scrollTop() + t);
                    } else {
                        s.css("top", n.scrollTop() + n.height() - t);
                    }
                } else {
                    q.handler.reset(s);
                    p(s);
                    if (r) {
                        r = false;
                        q.handler.end();
                    }
                }
            });
            n.bind("resize." + y, function () {
                if (r) {
                    u = w.show().offset();
                    w.hide();
                } else {
                    u = s.offset();
                }
            });
        };
        p = function (r) {
            var q = r.data("fixed_id");
            if (!q) {
                return;
            }
            var s = j("#" + q);
            if (!s[0]) {
                s = j("." + r[0].tagName + q);
            }
            s.hide();
            s.before(r.css({
                position: "static",
                top: "auto",
                left: "auto"
            }));
        };
        l = function (r) {
            p();
            var q = r.data("fixed_id");
            if (!q) {
                return;
            }
            var s = j("#" + q);
            if (!s[0]) {
                s = j("." + r[0].tagName + q);
            }
            n.unbind("scroll." + q).unbind("resize." + q);
            s.remove();
            r.removeData("fixed_id");
        };
    }
    return {
        fixed: g,
        unfixed: l
    };
});
define("finish3nd/utils/BitString", [], function (b, a, c) {
    var d = function (f) {
        var e, g = [];
        for (e = 0; e < f; e++) {
            g.push("0");
        }
        return g;
    };
    return {
        or: function () {
            var h, g, f = arguments.length;
            var e = Math.max.apply(null, arguments);
            var j = d(e);
            for (h = 0; h < f; h++) {
                g = arguments[h];
                j[g] = "1";
            }
            return j.join("");
        },
        testAnd: function (f, e) {
            return "1" === f.charAt(e);
        }
    };
});
define("finish3nd/utils/StringUtil", [], function (c, a, d) {
    var e = function (g) {
        var h = 0,
            j = 0,
            f = g.length;
        for (; h < f; h++) {
            j += (g.charCodeAt(h) > 127 ? 2 : 1);
        }
        return j;
    };
    var b = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
    return {
        daulBitCut: function (k, o, g) {
            var m = 0,
                p = 0,
                j = k.length,
                h = false,
                f = "";
            k = k || "";
            g = g || "……";
            p = e(k);
            o *= 2;
            if (p < o) {
                return k;
            } else {
                o -= e(g);
                for (m = 0, p = 0; m < j; m++) {
                    p += (k.charCodeAt(m) > 127 ? 2 : 1);
                    if (p > o) {
                        break;
                    } else {
                        f += k.charAt(m);
                    }
                }
                return f + g;
            }
        },
        encodeHTML: function (f) {
            return (typeof f != "string") ? f : f.replace(b, function (g) {
                var i = g.charCodeAt(0),
                    h = ["&#"];
                i = (i == 32) ? 160 : i;
                h.push(i);
                h.push(";");
                return h.join("");
            });
        }
    };
});
define("finish3nd/utils/Switchable", ["jquery", "lib/QNR"], function (c, e, b) {
    var f = c("jquery");
    var i = c("lib/QNR");
    var a = i.idFactory("switchable");
    var h = Math.max,
        d = Math.min;
    var k = {
        itemSelector: ".js_sw_item",
        prevSelector: ".js_sw_prev",
        nextSelector: ".js_sw_next",
        containerSelector: null,
        steps: 1,
        visible: 5,
        initIndex: 0,
        speed: 700,
        mouseInit: false,
        visibleWidth: null,
        disableFunc: function (m, l) {},
        ableFunc: function (l, m) {}
    };
    var j = function (m, l) {
        this._id = a();
        this._options = i.mix({}, l, k);
        j.$super.call(this);
        this.init(m);
    };
    i.extend(j, i.Event, {
        constructor: j,
        init: function (m) {
            var l = this._options;
            this._dom = m;
            this._items = f(l.itemSelector, m);
            this._prev = f(l.prevSelector, m);
            this._next = f(l.nextSelector, m);
            this._container = l.containerSelector ? f(l.containerSelector, m) : this._items.parent();
            this._curIndex = l.initIndex;
            this._width = this.height = 0;
            this._prevable = this._nextable = true;
            this.initEvents();
        },
        initEvents: function () {
            var m = this;
            var n = this._id;
            var l = m._options.steps;
            if (m._options.mouseInit) {
                this._dom.one("mouseenter." + n, function () {
                    m.initWidth();
                });
            } else {
                m.initWidth();
            }
            this._prev.bind("click." + n, function (o) {
                o.preventDefault();
                if (f(this).data("disabled")) {
                    return;
                }
                setTimeout(function () {
                    m.move(l);
                }, 0);
            });
            this._next.bind("click." + n, function (o) {
                o.preventDefault();
                if (f(this).data("disabled")) {
                    return;
                }
                setTimeout(function () {
                    m.move(-l);
                }, 0);
            });
        },
        setOptions: function (m, p) {
            var o = this,
                n = o._options;
            if (i.type(m) === "object") {
                for (var l in m) {
                    n[l] = m[l];
                }
            } else {
                if (i.type(m) === "string") {
                    n[m] = p;
                }
            }
        },
        initWidth: function () {
            var s = this;
            s._width = i.reduce(s._items, function (l, t) {
                return l + f(t).outerWidth(true);
            }, 0);
            s._itemWidth = s._items.outerWidth(true);
            var n = s._options.visibleWidth ? s._options.visibleWidth : s._itemWidth * s._options.visible;
            if (s._width <= n) {
                s._minleft = 0;
                return;
            }
            var q = s._width,
                p = 0;
            for (var o = 0, m = s._items.length; o < m; o++) {
                var r = s._items.eq(o);
                q -= r.outerWidth(true);
                p += r.outerWidth(true);
                if (q < n) {
                    break;
                }
            }
            s._minleft = p;
        },
        unbindEvents: function () {
            var l = this._id;
            this._prev.unbind("click." + l);
            this._next.unbind("click." + l);
        },
        move: function (l) {
            var o = this;
            if (o._moving || o._minleft === 0) {
                return;
            }
            o._moving = true;
            o.initWidth();
            var m = -o._minleft;
            var p = g(o._container.css("margin-left"));
            var n = o.getOffset(l);
            var r = n.offset;
            var q = p + r;
            if (l > 0) {
                q = d(q, 0);
            } else {
                q = h(q, m);
            }
            o._curIndex = n.index;
            o.fire("before_moved");
            o._container.animate({
                "margin-left": q
            }, o._options.speed, function () {
                var s = g(o._container.css("margin-left"));
                if (s >= 0) {
                    o._prev.data("disabled", true);
                    o._next.data("disabled", false);
                    o._options.disableFunc(o._prev, o._next);
                } else {
                    if (s <= m) {
                        o._prev.data("disabled", false);
                        o._next.data("disabled", true);
                        o._options.disableFunc(o._next, o._prev);
                    } else {
                        o._prev.data("disabled", false);
                        o._next.data("disabled", false);
                        o._options.ableFunc(o._next, o._prev);
                    }
                }
                o.fire("moved");
                o._moving = false;
            });
        },
        resizeCurrent: function () {
            var q = this;
            if (i.type(q._curIndex) !== "undefined") {
                var n = q._curIndex;
                var r = g(q._container.css("margin-left"));
                var s = 0;
                for (var o = 0, m = n; o < m; o++) {
                    var p = q._items.eq(o);
                    s += p.outerWidth(true);
                }
                q._container.css("margin-left", -s);
            }
        },
        selectIndex: function (q) {
            var r = this;
            var t = 0;
            var n = g(r._container.css("margin-left"));
            for (var p = 0, o = q; p < o; p++) {
                var u = r._items.eq(p);
                t += u.outerWidth(true);
            }
            if (n < -t || t > -n + r._minleft) {
                var m = r._curIndex;
                var s = m - q;
                this.move(s);
            }
        },
        check: function () {},
        getOffset: function (n) {
            var q = this;
            var p = q._curIndex;
            var l = p - n;
            var s = h(d(p, l), 0);
            var m = d(h(p, l), q._items.length);
            var r = i.reduce([].slice.call(q._items, s, m), function (v, u, t) {
                return v + f(u).outerWidth(true);
            }, 0);
            var o = s;
            if (n < 0) {
                r = -r;
                o = m;
            }
            return {
                offset: r,
                index: o
            };
        },
        getPrevNext: function () {
            return [this._prev, this._next];
        },
        getWidth: function () {
            return this._width;
        }
    });

    function g(m) {
        var l = parseInt(m, 10);
        return l === l ? l : 0;
    }
    return {
        switchable: function (m, l) {
            return new j(m, l);
        }
    };
});

var finishBc = (function (b) {
    var c = b.BC_ID;
    var a = encodeURIComponent;
    return function (e) {
        e = a(e);
        var d = new Image();
        d.width = 1;
        d.height = 1;
        d.src = "http://bc.qunar.com/clk?s=" + c + "&a=" + e + "&t=" + Math.random();
    };
})(window);
define("finish3nd/module/Observer", ["lib/QNR"], function (d, b, e) {
    var a = d("lib/QNR");
    var c = new a.Event();
    var f = a.idFactory("Observer.Event");
    return c;
});
define("finish3nd/module/NavCity", ["jquery", "lib/QNR", "./Observer", "../utils/Switchable", "finish3nd/module/City"], function (f, r, a) {
    var d = f("jquery");
    var l = f("lib/QNR");
    var n = f("./Observer");
    var i = f("finish3nd/module/City");
    var k = d(window);
    var p = l.Browser;
    var g = d("#b_panel_schedule");
    var b = '<div class="e_no_exist">        <div class="center">        <div class="text"><b class="icon_404"></b>该攻略行程线路还没有安排</a>        </div></div></div>';
    var h = '<div class="e_no_exist">        <div class="center">        <div class="text"><b class="icon_404"></b>你的行程线路还没有安排，        <a href="http://travel.qunar.com/plan?book=' + window.__BOOK_ID__ + '">立即安排行程</a>        </div></div></div>';
    var o = Hogan.compile('<a class="q_prev{{^prevStation}} hide{{/prevStation}}" data-beacon="{{prevBeacon}}" href="javascript:;">{{prevStation}}</a>                <span class="q_now">{{nowStation}}</span>                <a class="q_next{{^nextStation}} hide{{/nextStation}}" data-beacon="{{nextBeacon}}" href="javascript:;">{{nextStation}}</a>');
    var q = !window.__IS_MINE__ ? b : h;
    var c = l.getHashParams();

    function e(t, u) {
        if (l.type(t) === "object") {
            for (var s in t) {
                c[s] = encodeURIComponent(t[s]);
            }
        } else {
            if (l.type(t) === "string") {
                c[t] = encodeURIComponent(u);
            }
        }
        location.hash = (function () {
            html = [];
            for (var v in c) {
                html.push(v + "=" + c[v]);
            }
            if (html[0]) {
                return "#!" + html.join("&");
            }
            return "";
        })();
    }
    n.on("CHANNGE_DEST", function (s) {
        e(s);
    });

    function j(s) {
        this.container = s;
        this.scrollBox = this.container.find(".m_tab_list");
        this.scrollCon = this.container.find(".m_tab_list ul");
        this.needMove = false;
        this.lis = this.scrollCon.find(".js_city");
        this.newcamer = true;
        this.hashObj = this.creatNewHashObj(c);
        this.scrollBoxWidth = this.container.find(".m_tab_list").width();
        this.eMains = g.find("div.e_main");
        this.scrollConWidth = (function (v) {
            var t = v.find("li");
            var w = 0;
            for (var u = 0; u < t.length; u++) {
                w = w + t.eq(u).width();
            }
            return w;
        })(this.scrollCon);
        this.preBt = this.container.find(".arrow_prev");
        this.nextBt = this.container.find(".arrow_next");
    }
    j.prototype = {
        init: function () {
            var s = this;
            if (s.scrollConWidth > s.scrollBoxWidth) {
                s.preBt.click(function () {
                    var t = parseInt(s.scrollCon.css("marginLeft"), 10) || 0;
                    s.move(t + s.scrollBoxWidth);
                });
                s.nextBt.click(function () {
                    var t = parseInt(s.scrollCon.css("marginLeft"), 10) || 0;
                    s.move(t - s.scrollBoxWidth);
                });
                s.needMove = true;
            } else {
                s.preBt.hide();
                s.nextBt.hide();
            }
            s.lis.mouseenter(function () {
                d(this).addClass("tab_hover");
            }).mouseleave(function () {
                    d(this).removeClass("tab_hover");
                });
            this.lis.bind("click", function () {
                s.changeCity(d(this));
            });
            n.on("CHANGE_CITY", function (t) {
                s.changeCity(t);
            });
            s.selectCity();
            s.fix();
        },
        changeCity: function (s) {
            var t = this;
            t.newcamer = false;
            t.hashObj = {
                q: s.find("span").text(),
                ind: s.index() - 1
            };
            t.selectCity();
            finishBc("chenshifanye");
        },
        selectCity: function () {
            var u = this;
            var s = parseInt(u.hashObj.ind, 10);
            var t = u.lis.eq(s);
            var v = u.eMains;
            n.fire("CHANNGE_DEST", u.hashObj);
            t.addClass("tab_active").siblings().removeClass("tab_active");
            if (!v.eq(s).find("div.e_day").length) {
                u.loadCityInfo(v.eq(s));
                if (u.newcamer) {
                    g.find("div.e_loading").remove();
                }
            }
            v.eq(s).show().siblings("div.e_main").hide();
            if (!u.newcamer) {
                k.scrollTop(g.offset().top - u.container.height());
                k.scroll();
            }
            if (u.lis.length > 1) {
                u.quickEnter();
            }
            u.thinkMove(t);
        },
        thinkMove: function (u) {
            var w = this;
            if (!w.needMove) {
                return;
            }
            var s = (parseInt(w.scrollCon.css("marginLeft"), 10) || 0);
            var v = u.offset().left - w.scrollCon.offset().left;
            if (v < (-s + 100) || (v + u.width()) > (-s + w.scrollBoxWidth - 100)) {
                var t = v - (w.scrollBoxWidth - u.width()) / 2;
                w.move(-t);
            }
        },
        loadCityInfo: function (v, s) {
            var t = v.find("script");
            if (v.length) {
                var u = new i(t.html());
                v.append(u._dom);
                u.iniQiTi();
                n.fire("LOAD_DEST", u._dom);
                l.PubSub.trigger("PlanEleOk", u);
                k.scroll();
            } else {
                v.append("<div class='noplan' style='height:100px;text-align:Center;'>尚未安排</div>");
            }
        },
        move: function (s) {
            var t = this;
            var s = s;
            if (s >= 0) {
                s = 0;
            } else {
                if (s < -(t.scrollConWidth - t.scrollBoxWidth)) {
                    s = -(t.scrollConWidth - t.scrollBoxWidth);
                }
            }
            this.scrollCon.animate({
                marginLeft: s + "px"
            }, "easing", function () {
                s == 0 ? t.preBt.addClass("arrow_prev_disable") : t.preBt.removeClass("arrow_prev_disable");
                s == -(t.scrollConWidth - t.scrollBoxWidth) ? t.nextBt.addClass("arrow_next_disable") : t.nextBt.removeClass("arrow_next_disable");
            });
        },
        fix: function () {
            var s = this;
            if (!p.isIE6) {
                k.bind("scroll.slideNav  resize load", function () {
                    var u = d(this).scrollTop();
                    var v = g.offset().top;
                    var w = s.container.height();
                    if (u > v - w - 5) {
                        s.container.css("top", "0").show();
                    } else {
                        s.container.hide();
                    }
                });
            } else {
                d(window).bind("scroll.slideNav resize load", function () {
                    var u = d(this).scrollTop();
                    var v = g.offset().top;
                    var w = s.container.height();
                    if (u > v - w - 5) {
                        s.container.css({
                            position: "absolute",
                            top: u + "px"
                        }).show();
                    } else {
                        s.container.hide();
                    }
                });
            }
        },
        creatNewHashObj: function (s) {
            var u = this;
            var y = this.container.find(".js_city span");
            var w = s.q;
            var v = s.ind;
            var x = {};
            var t = (function () {
                var z = [];
                if (!w) {
                    return z;
                }
                l.forEach(y, function (C, B) {
                    var A = y.eq(B).text();
                    if (d.trim(w) == A || d.trim(w) == A.replace(/\([^)]*\)/, "")) {
                        z.push({
                            q: A,
                            ind: B
                        });
                    }
                });
                return z;
            })();
            if (t.length) {
                if (t.length == 1) {
                    x = t[0];
                } else {
                    l.forEach(t, function (A, z) {
                        if (v == (z + 1)) {
                            x = A;
                        }
                    });
                    if (!x.ind) {
                        x = t[0];
                    }
                }
            } else {
                if (!v || v < 0 || v >= u.lis.length) {
                    v = 0;
                }
                x = {
                    q: y.eq(v).text(),
                    ind: v
                };
            }
            return x;
        },
        quickEnter: function () {
            var z = this;
            var B = z.lis;
            var w = parseInt(z.hashObj.ind, 10);
            var u = B.eq(w);
            var y = w + 1;
            var A = B.eq(y);
            var x = w - 1;
            var v = x >= 0 ? z.lis.eq(x) : null;
            var s = d("#quickenter");
            var t = {
                prevStation: v ? "上一站：" + v.find(".title").text() : null,
                prevBeacon: "prev_station",
                nowStation: u.length ? u.hasClass("unarranged") ? "当前：我的收集" : "当前城市：" + u.find(".title").text() : "",
                nextStation: A.length ? A.hasClass("unarranged") ? "下一页：我的收集" : "下一站：" + A.find(".title").text() : null,
                nextBeacon: A.length ? A.hasClass("unarranged") ? "next_myCollect" : "next_station" : "next_station"
            };
            if (s.length) {
                s.html(o.render(t));
            } else {
                s = d('<div id="quickenter" class="quickenter">' + o.render(t) + "</div>");
                g.after(s);
            }
            s.undelegate(".q_prev", "click").undelegate(".q_next", "click");
            s.delegate(".q_prev", "click", function () {
                z.newcamer = false;
                z.hashObj = {
                    q: v.find(".title").text(),
                    ind: x
                };
                z.selectCity();
            }).delegate(".q_next", "click", function () {
                    z.newcamer = false;
                    z.hashObj = {
                        q: A.find(".title").text(),
                        ind: y
                    };
                    z.selectCity();
                });
        }
    };
    return {
        init: function (u) {
            var s = u;
            if (u.length) {
                var t = new j(s);
                t.init();
            } else {
                g.find(".e_loading").replaceWith(q);
            }
        }
    };
});
define("finish3nd/module/LazyLoadImg", ["jquery", "lib/QNR"], function (c, b, d) {
    var e = c("jquery");
    var a = c("lib/QNR");
    var h = e(window);
    var g = function (l, m) {
        this.oImg = l;
        var k = l.parent(".pic");
        this.boxW = k.width();
        this.boxH = k.height();
        this.fixW = true;
        var i = m[0].width;
        var j = m[0].height;
        this.ori_src = m.attr("src");
        this.boxscale = this.boxW / this.boxH;
        this.oriscale = i / j;
        if (k.parent(".img").hasClass("img1")) {
            if (i < this.boxW) {
                this.finiH = Math.max(j, this.boxH);
                this.fixW = false;
            } else {
                this.fixW = this.boxscale > this.oriscale ? true : false;
            }
        } else {
            this.fixW = this.boxscale > this.oriscale ? true : false;
        }
    };
    g.prototype = {
        init: function () {
            this.resizeImg();
            this.fixCenter();
        },
        resizeImg: function () {
            if (this.fixW) {
                this.finiW = this.finiW || this.boxW;
                this.finiH = this.finiW / this.oriscale;
            } else {
                this.finiH = this.finiH || this.boxH;
                this.finiW = this.finiH * this.oriscale;
            }
        },
        fixCenter: function () {
            this.oImg.css({
                display: "none",
                width: this.finiW + "px",
                height: this.finiH + "px",
                marginTop: (this.finiH > this.boxH) ? -(this.finiH - this.boxH) / 2 + "px" : "",
                marginLeft: (this.finiW > this.boxW) ? -(this.finiW - this.boxW) / 2 + "px" : ""
            });
            this.oImg.attr("src", this.ori_src).show().removeAttr("ori_src");
        }
    };

    function f(i) {
        i.each(function () {
            var l = e(this);
            if (!l.attr("ori_src")) {
                return;
            }
            var k = l.offset().top;
            var m = h.scrollTop();
            var j = h.height();
            if (k > m - 400 && k < m + j + 400) {
                e(new Image()).load(function () {
                    var n = new g(l, e(this));
                    n.init();
                }).attr("src", l.attr("ori_src"));
            }
        });
    }
    return {
        lazyload: function (i) {
            h.bind("scroll resize", function () {
                f(i);
            });
        },
        refresh: function (k, q) {
            var m = q.length;
            if (m === 0) {
                e("#ele-" + k).find(".img").remove();
                return;
            }
            if (m > 3) {
                m = 3;
            }
            var p = e('<div class="img img' + m + ' clrfix">' + (q.length > 3 ? '<a class="imgall pngfix" href="javascript:;">共' + m + "张图</a>" : "") + "</div>");
            var o = [];
            for (var l = 1; l < (m + 1); l++) {
                o.push('<div class="pic pic' + l + '"><img src="http://source.qunar.com/site/images/travel/finish/space_3nd.png" ori_src="' + q[l - 1] + '"><span class="glass pngfix"></span></div>');
            }
            p.append(o.join(""));
            var n = e("#ele-" + k);
            var r = n.find(".img");
            if (r.length) {
                r.replaceWith(p);
            } else {
                n.find("div.bottom").prepend(p);
            }
            var j = p.find("img");
            f(j);
        }
    };
});
define("finish3nd/module/DelEle", ["../config", "../utils/Http", "./Observer"], function (d, f, a) {
    var i = d("../config");
    var h = d("../utils/Http");
    var e = d("./Observer");
    var g = ['<div class="b_dialog b_deleteprompt" style="width:456px">', '<div class="e_dialog_hd paddingpatch">删除提示</div>', '<div class="e_dialog_ct">', '<div class="ct_cont">确定要删除该行程点么？</div>', "</div>", '<div class="e_dialog_ft js_content"><button class="btn_confirm">确 定</button><button class="btn_cancel js_close">取 消</button></div>', '<a href="#" class="btn_close js_close" title="关闭">x</a>', "</div>"].join("");
    var b = '<div class="b_dialog b_deleteprompt" style="width:456px;">    <div class="e_dialog_hd">提示</div>    <div class="e_dialog_ct"><div class="ct_cont">{{msg}}</div></div>    <div class="e_dialog_ft hide"></div>    <a href="#" class="btn_close js_close" title="关闭">x</a></div>';
    var c = function (o, p) {
        var n = p.getDom();
        var l = p.get("id");
        var k = p.get("type");
        var j = p.get("dayDom");
        var m = p.getDom().attr("id").replace("ele-", "");
        var q = new QNR.Dialog({
            content: g,
            titleVisible: false,
            closeCls: "btn_close",
            hideCloseBtn: false,
            width: "456px"
        });
        var r = function (s) {
            var t = {
                bookId: window.__BOOK_ID__,
                userId: s,
                data: "[" + JSON.stringify({
                    command: "delete",
                    type_id: k,
                    id: l
                }) + "]"
            };
            h.post(i.URLS.BOOKS_DETAIL + "/" + window.__BOOK_ID__, t, function (u) {
                if (u.status == 0) {
                    var w = j.find(".b_poi_info").length == 1 ? 140 : 0;
                    n.animate({
                        height: w + "px"
                    }, 300, function () {
                        n.remove();
                        if (j.find(".b_poi_info").length == 0) {
                            j.find(".period_ct").html('<div class="e_no_exist"><div class="center"><div class="text"><b class="icon_404"></b>您已全部删除!</div></div></div>');
                        }
                        $(window).scroll();
                        e.fire("DELETE_MARK_ELE", m);
                        QNR.PubSub.trigger("COLLECTBOOK_FINISH_DEL_ELE", window.__BOOK_ID__, l, k);
                    });
                    q.destory();
                } else {
                    q.destory();
                    var x = Hogan.compile(b);
                    var v = new QNR.Dialog({
                        content: x.render({
                            msg: u.message
                        }),
                        titleVisible: false,
                        closeCls: "btn_close",
                        hideCloseBtn: false,
                        width: "456px"
                    });
                    v.show();
                    var y;
                    y = setTimeout(function () {
                        v.remove();
                    }, 2000);
                }
            }, function () {});
        };
        q.getContent().find("button.btn_confirm").click(function (s) {
            s.preventDefault();
            if (window.__LOGIN_USER__) {
                r(window.__LOGIN_USER__.qunarUserId);
            } else {
                QNR.UserInfo.getTempId(function (t) {
                    r(t);
                });
            }
        });
        q.show();
    };
    return c;
});
define("finish3nd/module/City", ["jquery", "./Day", "./NavCity", "./LazyLoadImg"], function (c, b, d) {
    var f = c("jquery");
    var g = c("./Day");
    var h = f("#b_slide_nav");
    var e = c("./LazyLoadImg");

    function a(i) {
        this._dom = f(i);
    }
    a.prototype = {
        iniQiTi: function () {
            e.lazyload(this._dom.find("div.img img"));
            this._days = g(this._dom);
            this._eles = this.creatEles();
        },
        creatEles: function () {
            var j = this;
            var i = [];
            QNR.map(j._days, function (k) {
                i = i.concat(k.eles);
            });
            return QNR.expand(i);
        }
    };
    d.exports = a;
});
define("finish3nd/module/Day", ["jquery", "./Ele"], function (b, c, a) {
    var d = b("jquery");
    var j = b("./Ele");
    var h = '<div class="e_no_exist">        <div class="center">        <div class="text">        <b class="icon_404"></b>这一天没有安排行程，        <a href="http://travel.qunar.com/plan?book=' + window.__BOOK_ID__ + '">马上安排</a>        </div></div></div>';
    var e = '<div class="e_no_exist">        <div class="center">        <div class="text">        <b class="icon_404"></b>尚未安排</div></div></div>';
    var i = !window.__IS_MINE__ ? e : h;

    function g(m, k) {
        this.dom = m.eq(k);
        this.index = k;
        var l = (this.dom.attr("class") || "").split("-");
        this.dayId = parseInt(l[1], 10);
        if (this.dom.find(".b_poi_info").length) {
            this.eles = j(this.dom, this);
        } else {
            this.eles = [];
            this.dom.find(".period_ct").append(i);
        }
    }
    g.prototype = {};

    function f(k) {
        if (k.hasClass("mycollecteles")) {
            k = k.find(".e_day");
        }
        var l = [];
        k.each(function (m) {
            l.push(new g(k, m));
        });
        return l;
    }
    return f;
});
define("finish3nd/module/Ele", ["jquery", "lib/QNR", "./DelEle", "./PlanEleComment", "./PlanEleMemo", "./Observer"], function (d, g, b) {
    var h = d("jquery");
    var k = d("lib/QNR");
    var c = d("./DelEle");
    var i = d("./PlanEleComment");
    var e = d("./PlanEleMemo");
    var f = d("./Observer");

    function a(n, m, l) {
        this._index = m;
        this._dom = n.eq(m);
        this._day = l;
        this._info = {
            id: parseInt((this._dom.attr("id") || "").split("-")[1], 10),
            type: parseInt((this._dom.attr("id") || "").split("-")[2], 10),
            poiId: this._dom.attr("poi-id"),
            name: this._dom.find(".top .type").text(),
            memo: this._dom.find(".top .add_note_content").text(),
            dayId: l.dayId,
            dayDom: l.dom,
            startCity: this._dom.data("startcity") || "",
            endCity: this._dom.data("endcity") || "",
            cityName: this._dom.data("city") || ""
        };
    }
    a.prototype = {
        initEvent: function () {
            var l = this;
            this._dom.delegate(".control_btn", "click", function () {
                if (h(this).hasClass("btn_expand")) {
                    l.expand(h(this));
                } else {
                    l.up(h(this));
                }
            }).delegate("", "mouseenter", function () {
                    l._dom.addClass("b_poi_info_hover");
                    l._dom.find("div.top h5 div.e_collect_box").addClass("e_collect_box_hover");
                }).delegate("", "mouseleave", function () {
                    l._dom.removeClass("b_poi_info_hover");
                    l._dom.find("div.top h5 div.e_collect_box").removeClass("e_collect_box_hover");
                }).delegate(".delete", "click", function () {
                    c(h(this), l);
                }).delegate(".upload", "click", function (m) {
                    m.preventDefault();
                    finishBc("upload_img_show");
                    if (__IS_MINE__ && !__LOGIN_USER__) {
                        k.loadModule("login_panel", function () {
                            loginDialog = new LoginDialog({
                                callbackFun: function (o) {
                                    var n = o.errcode;
                                    if (n === 0) {
                                        window.location.reload();
                                    } else {
                                        this.showErrorMsg(o.errmsg);
                                    }
                                },
                                callback: window.location.href
                            });
                            loginDialog.show();
                        });
                        return;
                    }
                    f.fire("POI_IMG_UPLOAD_SHOW", l);
                }).delegate(".pic", "click", function (n) {
                    n.preventDefault();
                    var m = this.className.match(/\d/);
                    if (m) {
                        var o = l.get("type") + "_" + l.get("id");
                        f.fire("Photo_View_Show", o, (m[0] - 1));
                        finishBc("single_img");
                    }
                }).delegate(".more_img", "click", function (m) {
                    m.preventDefault();
                    var n = l.get("type") + "_" + l.get("id");
                    f.fire("Photo_View_Show", n, 0);
                    finishBc("more_img");
                }).delegate(".imgall", "click", function (m) {
                    m.preventDefault();
                    var n = l.get("type") + "_" + l.get("id");
                    f.fire("Photo_View_Show", n, 0);
                    finishBc("more_img");
                }).delegate(".check", "click", function (r) {
                    r.preventDefault();
                    var m = l._dom.find(".js_route");
                    var n = m.text();
                    if (n) {
                        var q = m.attr("map-abroad") === "true" ? true : false;
                        var p = l._dom.find("div.b_traffic_stage").parent().html();
                        var o = l._dom.find("a.type").text();
                        f.fire("Traffic_Map_Show", n, p, o, q);
                        finishBc("traffic_map_show");
                    }
                }).delegate(".pic", "hover", function () {
                    h(this).toggleClass("pic_hover");
                });
            l._dom.delegate(".ops .comment", "click", function () {
                if (!l._dom.find(".js_expandBox").length) {
                    finishBc("pinglun");
                    i.expand(h(this), l);
                } else {
                    i.collapse(h(this), l);
                }
            });
            l._dom.delegate("div.b_comment_reply div.q_comment_box_btn a.js_expendSubmit", "click", function (m) {
                m.preventDefault();
                finishBc("tjpinglunbutton");
                i.submit(h(this), l);
            }).delegate("div.b_comment_reply div.js_selectRefreshWrap a.js_expendDelete", "click", function (m) {
                    m.preventDefault();
                    i.remove(h(this), l);
                }).delegate("div.b_comment_reply div.js_selectRefreshWrap a.link_reply", "click", function () {
                    finishBc("huifu");
                });
            e.init(l);
        },
        expand: function (l) {
            this._dom.addClass("b_expand_info");
            l.removeClass("btn_expand").addClass("btn_fold");
            finishBc("xinxizhankai");
        },
        up: function (l) {
            this._dom.removeClass("b_expand_info");
            l.removeClass("btn_fold").addClass("btn_expand");
        },
        getDom: function () {
            return this._dom;
        },
        getEleData: function () {
            return this._info;
        },
        getDayData: function () {
            return this._day;
        },
        get: function (l) {
            return this._info[l];
        },
        set: function (l, m) {
            this._info[l] = m;
        }
    };

    function j(o, m) {
        var l = [];
        var n = o.find(".b_poi_info");
        n.each(function (p) {
            var q = new a(n, p, m);
            q.initEvent();
            l.push(q);
        });
        return l;
    }
    return j;
});
define("finish3nd/module/PlanEleComment", ["finish3nd/config", "finish3nd/utils/Http", "finish3nd/utils/BitString"], function (h, i, d) {
    var q = h("finish3nd/config");
    var n = h("finish3nd/utils/Http");
    var b = h("finish3nd/utils/BitString");
    var e = "有什么建议或评论，来说两句吧！（不超过300字）";
    var k = ['<div class="b_dialog b_deleteprompt" style="width:456px;">', '<div class="e_dialog_hd paddingpatch">删除提示</div>', '<div class="e_dialog_ct js_content">', '<div class="ct_cont">确定要删除这条评论吗？</div>', "</div>", '<div class="e_dialog_ft"><button class="btn_confirm">确 定</button><button class="btn_cancel js_close">取 消</button></div>', '<a href="#" class="btn_close js_close" title="关闭">x</a>', "</div>"].join("");
    var g = ['<div class="b_dialog b_invitefriend" style="width:500px;">', '<div class="e_dialog_hd" style="margin-left:-10px; margin-right:-10px; padding-left:10px; "><div class="hd_title">提示</div></div>', '<div class="e_dialog_ct js_content">', '<div class="e_invitefriend" style="background:none;"><div class="b_friendlogin" style="height:auto;">', '<div class="info_prompt"><span class="icon_finish"></span>恭喜你，发表成功，<span class="sum">2</span> 秒后自动跳转至您浏览的页面</div>', "</div></div>", "</div>", '<div class="e_dialog_ft hide"></div>', '<a href="#" class="btn_close js_close" title="关闭">x</a>', "</div>"].join("");
    var c = function (r) {
        var s = $(this);
        if ("placeholder" in document.createElement("input")) {
            if ("" === s.val() || e === s.val()) {
                s.val("");
                s.attr("placeholder", e);
            }
        } else {
            if ("" === s.val() || e === s.val()) {
                s.val(e);
            }
        }
        s.next().hide();
        s.css({
            color: "#D5D5D5"
        }).show();
        if ("" === s.val() || e === s.val()) {
            s.parent().next().find("div.js_errorTip").html("");
        }
    };
    var p = function (r) {
        var s = $(this);
        if ("placeholder" in document.createElement("input")) {
            if (s.val() == "" || s.val() == e) {
                s.attr("placeholder", "");
            }
        } else {
            if (s.val() == "" || s.val() == e) {
                s.val("");
            }
        }
        s.css({
            color: "#666"
        });
    };
    var a = function (t) {
        var w = $(this);
        var s = q.PLAN_ELE_CONFIG.MEMO_MAX_LENGTH;
        var v = w.val();
        var u = w.parent().next().find("div.js_errorTip");
        var r = e == v ? 0 : v.length;
        if (r > s) {
            u.html('<b class="num">超过字数限制，最多输入300字</b>');
        } else {
            u.html('还可以输入<span style="color:#f60">' + (s - v.length) + "</span>个字");
        }
    };
    var m = function (r, u, w, v) {
        var s = q.URLS.BOOK_COMMENT + "/" + window.__BOOK_ID__ + "/" + r;
        var t = {
            elementType: u,
            viewLevel: w,
            offset: 0,
            limit: 10
        };
        n.get(s, t, function (x) {
            v && v(x);
        });
    };
    var o = function (t) {
        var r = $(".b_ugc_operation div.left dd.text span.txt_commentcount");
        var s = parseInt(r.html());
        r.html(s + t);
    };
    var j = function (r) {
        QNR.loadModule("login_panel", function () {
            var s = new LoginDialog({
                callbackFun: function (u) {
                    var t = u.errcode;
                    if (t === 0) {
                        window.location.reload();
                    } else {
                        this.showErrorMsg(u.errmsg);
                    }
                },
                callback: window.location.href
            });
            s.show();
        });
    };
    return {
        collapse: function (r, s) {
            var t = s.getDom();
            t.find(".js_expandBox").remove();
        },
        expand: function (s, t) {
            var v = t.getDom();
            var r = t.get("id");
            var u = t.get("type");
            m(r, u, 2, function (y) {
                var x = s.parents(".ops");
                var w = $(y.data.html);
                var A = w.find("textarea.js_textarea");
                var z = s.closest("div.bottom");
                z.find(".js_expandBox").remove();
                w.insertAfter(x);
                c.call(A);
                A.bind({
                    focus: p,
                    blur: c,
                    input: a,
                    propertychange: a,
                    keydown: a
                }).focus();
            });
        },
        submit: function (x, y) {
            var w = this;
            var u = y.getDom();
            var A = y.getEleData();
            var s = y.get("id");
            var r = y.get("type");
            var v = x.parent().parent().find("textarea.js_textarea");
            var z = $.trim(v.val());
            var t;
            if (z.length > 300) {
                return false;
            } else {
                if (0 === z.length || z == e) {
                    x.parent().find(".js_errorTip").html("内容不能为空");
                    return false;
                } else {
                    t = {
                        csrfToken: QNR.UserInfo._getCookie("csrfToken"),
                        bookId: window.__BOOK_ID__,
                        elementId: s,
                        elementType: r,
                        body: z
                    };
                    if (17 == r) {
                        t.commentType = 10303;
                    } else {
                        if (b.testAnd(q.PLAN_ELE_CONFIG.ELE_TYPE_DISTRICT, r)) {
                            t.distId = y.get("poiId");
                            t.commentType = 10309;
                        } else {
                            if (b.testAnd(q.PLAN_ELE_CONFIG.ELE_TYPE_POI, r)) {
                                if (y.get("poiId")) {
                                    t.poiId = y.get("poiId");
                                    t.commentType = 10302;
                                } else {
                                    t.commentType = 10303;
                                }
                            } else {
                                t.commentType = 10303;
                            }
                        }
                    }
                    n.post(q.URLS.SEND_COMMENT, t, function (B) {
                        v.val("");
                        v.hide();
                        u.find(".js_successTip").show();
                        u.find(".js_errorTip").html("");
                        setTimeout(function () {
                            c.call(v);
                        }, 2000);
                        m(s, r, 1, function (C) {
                            u.find(".js_selectRefreshWrap").html(C.data.html);
                            u.find(".comment i").html("(" + C.data.count + ")");
                            o(1);
                        });
                    }, function (B) {
                        if (B.statusText && "error" == B.statusText) {
                            u.find(".js_errorTip").html("输入内容违反相关规定，请修改后提交");
                            return;
                        }
                        switch (B.errcode) {
                            case 13:
                            case 10311:
                                l.showBox(B.errcode, B.errmsg);
                                break;
                            case 6:
                                u.find(".js_errorTip").html("输入内容违反相关规定，请修改后提交");
                                break;
                            case 7:
                                QNR.Storage.setItem("bookToDo", window.__BOOK_ID__);
                                QNR.Storage.setItem("bookToDoCommentBody", JSON.stringify(t));
                                j();
                                break;
                            case 11:
                                u.find(".js_errorTip").html(B.errmsg);
                                break;
                        }
                    });
                }
            }
        },
        remove: function (s, t) {
            var u = t.getDom();
            var r = new QNR.Dialog({
                content: k,
                titleVisible: false,
                closeCls: "btn_close",
                hideCloseBtn: false,
                width: "456px"
            });
            r.getContent().parent().find("div.e_dialog_ft button.btn_confirm").click(function (v) {
                v.preventDefault();
                var w = s.attr("data");
                n.post(w, {
                    _method: "DELETE"
                }, function (x) {
                    m(t.get("id"), t.get("type"), 1, function (y) {
                        u.find(".js_selectRefreshWrap").html(y.data.html);
                        u.find(".comment i").html("(" + y.data.count + ")");
                        o(-1);
                        r.remove();
                    });
                }, function (x) {
                    r.remove();
                });
            });
            r.show();
        },
        resume: function () {
            var s = QNR.Storage.getItem("bookToDoCommentBody");
            var r = new QNR.Dialog({
                content: g,
                titleVisible: false,
                closeCls: "btn_close",
                hideCloseBtn: false,
                width: "500px"
            });
            QNR.Storage.removeItem("bookToDo");
            QNR.Storage.removeItem("bookToDoCommentBody");
            if (!s || null == window.__LOGIN_USER__) {
                return false;
            }
            s = JSON.parse(s);
            n.post(q.URLS.SEND_COMMENT, s, function (w) {
                var u = null,
                    v;
                r.show();
                setTimeout(function () {
                    r.remove();
                }, 2000);
                u = $("div#ele-" + s.elementId + "-" + s.elementType);
                if (u.length) {
                    (function () {
                        var t = u.find(".comment i");
                        var x = t.text().match(/^\(([0-9]+)\)$/);
                        if (null === x) {
                            t.html("(1)");
                        } else {
                            t.html("(" + (parseInt(x[1], 10) + 1) + ")");
                        }
                    })();
                }
                o(1);
            }, function (t) {
                switch (t.errcode) {
                    case 6:
                        r.getContent().find(".info_prompt").html('输入内容违反相关规定，请修改后提交，<span class="sum">10</span> 秒后自动跳转至您浏览的页面');
                        r.show();
                        setTimeout(function () {
                            r.remove();
                        }, 10000);
                        break;
                    case 7:
                        break;
                }
            });
        }
    };
});
define("finish3nd/module/PlanEleMemo", ["../config", "../utils/BitString", "../utils/Http", "../utils/StringUtil"], function (e, g, d) {
    var l = e("../config");
    var a = e("../utils/BitString");
    var k = e("../utils/Http");
    var h = e("../utils/StringUtil");
    var f = ['<div style="display:block" class="edit_note_content">', '<textarea name="" cols="" rows="" class="edit_note_content_inner"></textarea><a href="#" class="btn_save">保存</a>', "</div>", '<div style="display:block;">还可以输入<span style="color:#f60"  class="numtip">300</span>个字</div>', '<div style="color:#f60; display:none;">达到300字了，不能再输了</div>'].join("");
    var i = QNR.popMsg;
    var c = '<div class="b_dialog b_deleteprompt" style="width:456px;">    <div class="e_dialog_hd">提示</div>    <div class="e_dialog_ct"><div class="ct_cont">{{msg}}</div></div>    <div class="e_dialog_ft hide"></div>    <a href="#" class="btn_close js_close" title="关闭">x</a></div>';
    var b = function (n) {
        var p = $(this);
        var m = l.PLAN_ELE_CONFIG.MEMO_MAX_LENGTH;
        var o = p.val();
        if (o.length == m) {
            p.parent().next().hide();
            p.parent().next().next().show();
            return;
        } else {
            if (o.length > m) {
                p.val(o.substring(0, 300));
                p.parent().next().hide();
                p.parent().next().next().show();
            } else {
                p.parent().next().next().hide();
                p.parent().next().show();
                p.parents(".edit_note_content").next().find("span.numtip").text(m - o.length);
            }
        }
    };
    var j = function (q, n) {
        var u = $(q);
        var s = u.prop("tagName") == "TEXTAREA" ? u : u.prev();
        var p = s.parent().parent();
        var m = n.getDom();
        var r = $.trim(s.val());
        var o = function (t) {
            var v = {
                bookId: window.__BOOK_ID__,
                userId: t,
                data: "[" + JSON.stringify({
                    command: "update",
                    type_id: n.get("type"),
                    day_id: n.get("dayId"),
                    id: n.get("id"),
                    memo: r
                }) + "]"
            };
            k.post(l.URLS.BOOKS_DETAIL + "/" + window.__BOOK_ID__, v, function (w) {
                var x = w.status;
                if (x == 0) {
                    if (r.length) {
                        p.html('<div class="add_note_content"><i class="quote q_l"></i>' + h.encodeHTML(r) + '<i class="quote q_r"></i></div>');
                    } else {
                        p.html('<div class="note_title">点击这里，添加旅行备注</div>');
                    }
                    n.set("memo", r);
                } else {
                    i(w.message);
                }
            }, function () {
                console.log(2);
            });
        };
        if (300 < r.length) {
            return false;
        } else {
            if (window.__LOGIN_USER__) {
                o(window.__LOGIN_USER__.qunarUserId);
            } else {
                QNR.UserInfo.getTempId(function (t) {
                    o(t);
                });
            }
        }
    };
    return {
        init: function (n) {
            var m = n.getDom();
            var o = m.find("div.top>div.text");
            o.find(".add_note_content").mouseenter(function () {
                $(this).addClass("add_note_content_hover");
            }).mouseleave(function () {
                    $(this).removeClass("add_note_content_hover");
                });
            o.delegate("div.add_note_content", "click", function (p) {
                var q = $(this).parent(".text");
                if (q.hasClass("editable")) {
                    p.stopPropagation();
                    p.preventDefault();
                    o.empty();
                    o.html(f);
                    o.find("textarea").focus();
                    o.find("textarea").val(n.get("memo"));
                    o.find("textarea").trigger("input");
                }
            });
            o.delegate("div.note_title", "click", function (p) {
                var q = $(this).parent();
                p.stopPropagation();
                p.preventDefault();
                q.empty();
                q.html(f);
                q.find("textarea").focus();
            });
            o.delegate("div.edit_note_content textarea", "keydown", function (p) {
                if (p.which == 13) {
                    p.preventDefault();
                    j(this, n);
                } else {
                    b.call(this);
                }
            });
            o.delegate("div.edit_note_content textarea", "input", b);
            o.delegate("div.edit_note_content textarea", "propertychange", b);
            o.delegate("div.edit_note_content textarea", "blur", function (p) {
                p.preventDefault();
                p.stopPropagation();
                j(this, n);
            });
            o.delegate("div.edit_note_content a.btn_save", "click", function (p) {
                p.preventDefault();
                j(this, n);
            });
        }
    };
});

QNR.Share = (function (c, i) {
    var a = Object.prototype;
    var e = encodeURIComponent;
    var g = "100244931";
    var b = function (m) {
        var n = [];
        for (var k in m) {
            var j = k;
            var l = m[j];
            if (a.toString.call(l) === "[object Array]") {
                l = l.join(",");
            }
            if (l != null) {
                l = e(l);
                n.push(j + "=" + l);
            }
        }
        return n.join("&");
    };
    var d = '<div class="b_share_winxin" >                        <a href="javascript:;" class="btn_close js_close"></a>                        <div class="e_share_header clrfix">                            <div class="weixin_code_wrap">                                <img class="js_erweicode" src="" width="122" height="122"  />                            </div>                            <h3>分享到微信</h3>                            <p class="share_summary">用微信扫一扫右侧的二维码，即可把攻略分享给你的微信好友或朋友圈。<br/>马上来试试吧！</p>                        </div>                        <div class="e_intro_section">                            <h4>如何分享</h3>                            <table>                                <tbody>                                    <tr>                                        <td><img src="http://source.qunar.com/site/images/travel/finish/finish3nd/screen_dlg/share_update_img_1.jpg"></td>                                        <td><img src="http://source.qunar.com/site/images/travel/finish/finish3nd/screen_dlg/share_update_img_2.jpg"></td>                                        <td class="no_pr"><img src="http://source.qunar.com/site/images/travel/finish/finish3nd/screen_dlg/share_update_img_3.jpg"></td>                                    </tr>                                    <tr>                                        <td><img src="http://source.qunar.com/site/images/travel/finish/finish3nd/screen_dlg/share_update_img_4.jpg"></td>                                        <td class="no_pr" colspan="2"><img src="http://source.qunar.com/site/images/travel/finish/finish3nd/screen_dlg/share_update_img_5.jpg"></td>                                    </tr>                                </tbody>                            </table>                        </div>                    </div>';
    var f = {
        weibo: {
            url: "http://service.weibo.com/share/share.php",
            parse: function (m) {
                var k = null;
                var j = i.type(m.pic) === "string" ? m.pic : (i.type(m.pic) === "array" ? m.pic[0] : "");
                var l = {
                    url: m.url || location.href,
                    type: "3",
                    count: m.count || k,
                    appkey: m.appkey || g,
                    title: m.title || document.title,
                    pic: j || k,
                    ralateUid: m.uid || k,
                    language: m.language || k,
                    dpc: 1
                };
                return l;
            }
        },
        qq_weibo: {
            url: "http://share.v.t.qq.com/index.php",
            parse: function (m) {
                var k = null;
                var j = i.type(m.pic) === "string" ? m.pic : (i.type(m.pic) === "array" ? m.pic.join(",") : "");
                var l = {
                    c: "share",
                    a: "index",
                    title: m.title || document.title,
                    url: m.url || location.href,
                    site: m.site || location.hostname,
                    appkey: m.appkey || g,
                    pic: j || k
                };
                return l;
            }
        },
        weixin: {
            special: function (k) {
                var l = new i.Dialog({
                    content: d,
                    closeBtn: {
                        handler: function () {
                            l.hide();
                            l.remove();
                        }
                    }
                });
                var j = k.url;
                l.getContainer().find("img.js_erweicode").attr("src", "http://s.jiathis.com/qrcode.php?url=" + j);
                l.show();
            }
        }
    };

    function h(n, m) {
        var l = f[n];
        if (!l) {
            console.error("没有此配置项");
        }
        m = m || {};
        if (l.special) {
            l.special(m);
            return;
        } else {
            var k = l.url;
            var o = l.parse(m);
            var j = b(o);
            k += "?" + j;
            window.open(k);
        }
    }
    return {
        sendShare: h
    };
})(jQuery, QNR);
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.CITYINFO_CITY = new Hogan.Template(function (e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="e_mod_rinfo">\r');
    a.b("\n" + b);
    a.b('    <div class="mod_prev"></div>\r');
    a.b("\n" + b);
    a.b('    <ul class="mod_tab clrfix">\r');
    a.b("\n" + b);
    if (a.s(a.f("repo", e, d, 1), e, d, 0, 111, 161, "{{ }}")) {
        a.rs(e, d, function (h, g, f) {
            f.b('            <li class="">');
            f.b(f.v(f.f("city", h, g, 0)));
            f.b("</li>\r");
            f.b("\n");
        });
        e.pop();
    }
    a.b("    </ul>\r");
    a.b("\n" + b);
    a.b('    <div class="mod_next"></div>\r');
    a.b("\n" + b);
    a.b("</div>");
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.CITYINFO_CONTENT = new Hogan.Template(function (e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="title">');
    a.b(a.v(a.f("typeName", e, d, 0)));
    a.b("</div>\r");
    a.b("\n" + b);
    a.b('<div class="content ');
    a.b(a.v(a.f("className", e, d, 0)));
    a.b('">\r');
    a.b("\n" + b);
    a.b("	");
    a.b(a.t(a.f("img", e, d, 0)));
    a.b(a.t(a.f("detail", e, d, 0)));
    a.b("\r");
    a.b("\n" + b);
    a.b("</div>");
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.CITYINFO_SUBMENU = new Hogan.Template(function (e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<ul class="type_list clrfix">\r');
    a.b("\n" + b);
    if (a.s(a.f("submenu", e, d, 1), e, d, 0, 47, 191, "{{ }}")) {
        a.rs(e, d, function (h, g, f) {
            f.b('    <li class="type">\r');
            f.b("\n" + b);
            f.b('        <a href="#" class="pngfix" style="background-image:url(');
            f.b(f.v(f.f("url", h, g, 0)));
            f.b(')"><span>');
            f.b(f.v(f.f("typeName", h, g, 0)));
            f.b("</span></a>\r");
            f.b("\n" + b);
            f.b("    </li>\r");
            f.b("\n");
        });
        e.pop();
    }
    a.b("</ul>");
    return a.fl();
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
QTMPL.recommendSuccess = new Hogan.Template(function (e, d, b) {
    var a = this;
    a.b(b = b || "");
    a.b('<div class="b_dialog b_flayer_success_tip" style="width:456px;">\r');
    a.b("\n" + b);
    a.b('    <div class="e_dialog_hd">提示</div>\r');
    a.b("\n" + b);
    a.b('    <div class="e_dialog_ct">\r');
    a.b("\n" + b);
    a.b('        <div class="e_tip"><b></b>');
    a.b(a.v(a.f("msg", e, d, 0)));
    a.b("</div>\r");
    a.b("\n" + b);
    a.b("    </div>\r");
    a.b("\n" + b);
    a.b('    <div class="e_dialog_ft hide"></div>\r');
    a.b("\n" + b);
    a.b('    <a href="#" class="btn_close js_recommendSuccessClose" title="关闭">x</a>\r');
    a.b("\n" + b);
    a.b("</div>");
    return a.fl();
});
define("finish3nd/module/photo/PhotoTpl", function (d, b, e) {
    var c = '<div id="pic_viewer" class="b_full_dialog">                    <div class="e_fdlg_header clrfix">                        <a href="#" class="e_fdlg_close pngfix">                            <span>关闭照片浏览</span>                        </a>                        <div class="e_fdlg_hd_txt">                            <h4 class="photo_title js_pic_name">三亚湾潜水</h4>                            <span class="js_pic_info">共10张图片</span>                        </div>                    </div>                    <div class="e_fdlg_body clrfix" style="padding-top:50px;">                         <div class="photo_list_box">                            <div class="photo_up">                                <a class="pngfix" href="#"></a>                            </div>                            <div class="photo_list">                                <ul>                                </ul>                            </div>                            <div class="photo_down">                                <a class="pngfix" href="#"></a>                            </div>                        </div>                        <div class="photo_box">                            <div class="td_outer">                            <table>                                <tbody>                                    <tr>                                        <td class="big_img" align="center" valign="middle" >                                                <div class="pic"><div class="pic_wrap"></div></div>                                                <div class="loading">图片正在加载中</div>                                        </td>                                    </tr>                                </tbody>                            </table>                            <div class="pic_lr_wrap clrfix" >                                <div class="p_prev"></div>                                <div class="p_next"></div>                                <a class="view_org pngfix" href="#" target="_blank">查看原图</a>                            </div>                            </div>                        </div>                    </div>            </div>';
    var a = Hogan.compile(c);
    e.exports = {
        ViewTpl: a
    };
});
define("finish3nd/module/photo/PhotoReady", [], function (c, b, d) {
    var a = (function () {
        var h = [],
            g = null,
            f = function () {
                var j = 0;
                for (; j < h.length; j++) {
                    h[j].end ? h.splice(j--, 1) : h[j]();
                }!h.length && e();
            }, e = function () {
                clearInterval(g);
                g = null;
            };
        return function (j, o, q, n) {
            var p, k, r, m, i, l = new Image();
            l.src = j;
            if (l.complete) {
                o.call(l);
                q && q.call(l);
                return l;
            }
            k = l.width;
            r = l.height;
            l.onerror = function () {
                n && n.call(l);
                p.end = true;
                l = l.onload = l.onerror = null;
            };
            p = function () {
                m = l.width;
                i = l.height;
                if (m !== k || i !== r || m * i > 1024) {
                    o.call(l);
                    p.end = true;
                }
            };
            p();
            l.onload = function () {
                !p.end && p();
                q && q.call(l);
                l = l.onload = l.onerror = null;
            };
            if (!p.end) {
                h.push(p);
                if (g === null) {
                    g = setInterval(f, 40);
                }
            }
            return l;
        };
    })();
    d.exports = a;
});
define("finish3nd/module/photo/PhotoView", ["jquery", "lib/QNR", "./PhotoTpl", "../../utils/Http", "../../config", "../../utils/BitString", "./PhotoReady", "../Observer"], function (n, D, d) {
    var i = n("jquery"),
        t = n("lib/QNR"),
        j = n("./PhotoTpl"),
        o = n("../../config"),
        r = n("../../utils/BitString"),
        w = n("../../utils/Http"),
        c = n("./PhotoReady"),
        x = n("../Observer");
    var h = window,
        s = i(h);
    var z = function (H, F, G) {
        var J = null;
        var I = 100;
        return function () {
            if (J) {
                h.clearTimeout(J);
                J = null;
            }
            if (!G && i.type(F) === "array") {
                G = F;
                F = I;
            }
            G = G || [];
            F = i.type(F) !== "number" ? I : F;
            J = h.setTimeout(function () {
                H.apply(h, G);
            }, F);
        };
    };
    var k = {
        4: "spot",
        16: "spot",
        17: "spot",
        6: "hotel",
        15: "hotel",
        5: "food",
        18: "food",
        7: "entertain",
        19: "entertain",
        8: "shopping",
        20: "shopping",
        2: "event",
        12: "train",
        13: "flight",
        14: "bus",
        22: "bus",
        23: "bus",
        3: "spot",
        24: "spot",
        9: "location",
        21: "bus"
    };
    var l = ["飞机", "火车", "汽车", "轮船"];
    var e = ["flight", "train", "bus", "wharf"];

    function C(H, G) {
        if (H != 21 || !G) {
            return k[H];
        } else {
            var F = t.indexOf(l, G);
            return e[F];
        }
    }
    var E = "";

    function g(F) {
        var G = j.ViewTpl.render();
        var H = i(G).css("display", "none");
        i("body").append(H);
        this.imgloader = F;
        this.init(H);
    }
    var q = {
        _HEAD_HEIGHT_: 40,
        _MARGIN_TOP_: 50,
        _MARGIN_LEFT_: 100,
        _RIGHT_WIDTH_: 150,
        _SMALL_PIC_HEIGHT_: 155,
        init: function (F) {
            this.dom = F;
            this.pic_con = F.find("td.big_img");
            this.pic_list = F.find("div.photo_list");
            this.pic_win = F.find("div.photo_box");
            this.pic_up = F.find("div.photo_up");
            this.pic_down = F.find("div.photo_down");
            this.pic_name = F.find("h4.js_pic_name");
            this.pic_info = F.find("span.js_pic_info");
            this.cursor_wrap = F.find("div.pic_lr_wrap");
            this.pic_view_org = F.find("a.view_org");
            this._initEvents();
            this._layoutWin();
        },
        _initEvents: function () {
            var F = this;
            s.resize(i.proxy(F._layoutWin, F));
            F.dom.find(".e_fdlg_close").click(function (G) {
                G.preventDefault();
                F.hide();
            });
            this.pic_win.delegate(".p_prev", "click", function (G) {
                G.preventDefault();
                G.stopPropagation();
                F.loadImg(-1);
            }).delegate(".p_next", "click", function (G) {
                    G.preventDefault();
                    G.stopPropagation();
                    F.loadImg(1);
                });
            this.pic_up.click(function (G) {
                G.preventDefault();
                F.loadImg(-1);
            });
            this.pic_down.click(function (G) {
                G.preventDefault();
                F.loadImg(1);
            });
            this.pic_list.delegate("li", "click", function (I) {
                var G = i(this);
                var J = G.data("id"),
                    H = G.data("index");
                if (G.find("span").length) {
                    F.showImg(J, 0);
                } else {
                    F.showImg(J, H);
                }
            });
        },
        _layoutWin: function () {
            var I = this;
            var K = s.width(),
                F = s.height();
            this.dom.css({
                width: K,
                height: F
            });
            var H = K - this._RIGHT_WIDTH_ - this._MARGIN_LEFT_ * 2,
                L = F - this._HEAD_HEIGHT_ - this._MARGIN_TOP_ * 2;
            var J = L;
            this.pic_con.css({
                width: H,
                height: L
            });
            this.cursor_wrap.css({
                width: H,
                height: L
            });
            this.pic_list.css("max-height", J);
            this.pic_con_w = H;
            this.pic_con_h = L;
            this.pic_list_h = J;
            var G = this.pic_con.find("img");
            if (G.length) {
                this._layoutImg(G[0], G.data("width"), G.data("height"));
                I.pic_view_org.css({
                    top: ((L - G[0].height) / 2 + 3),
                    right: ((H - G[0].width) / 2 + 3)
                });
            }
            if (this.current_id) {
                this._renderPicList(this.current_id, this.current_index);
            }
        },
        _layoutImg: function (G, J, F) {
            var K = this.pic_con_w,
                M = this.pic_con_h;
            var I = J || G.width,
                L = F || G.height;
            if (I > K) {
                G.width = K;
                var H = G.height = K * L / I;
                if (H > M) {
                    G.height = M;
                    G.width = M * G.width / H;
                }
            } else {
                if (L > M) {
                    G.height = M;
                    G.width = M * I / L;
                } else {
                    G.height = L;
                    G.width = I;
                }
            }
        },
        loadImg: function (H) {
            var G = this;
            F(H);
            return;

            function F(N) {
                if (G.current_id && i.type(G.current_index) !== "undefined") {
                    var I = G.current_index + N;
                    var K = G.imgloader.getImgById(G.current_id);
                    var M = K.index;
                    if (I < 0) {
                        var L = M - 1;
                        if (L >= 0) {
                            var J = G.imgloader.getImgByIndex(L);
                            G.showImg(J.id, J.bigImages.length - 1, N < 0);
                        } else {
                            var J = G.imgloader.getImgByIndex(G.imgloader.len() - 1);
                            G.showImg(J.id, J.bigImages.length - 1, N < 0);
                        }
                    } else {
                        if (I >= K.bigImages.length) {
                            var O = M + 1;
                            if (O < G.imgloader.len()) {
                                var J = G.imgloader.getImgByIndex(O);
                                G.showImg(J.id, 0, N < 0);
                            } else {
                                var J = G.imgloader.getImgByIndex(0);
                                G.showImg(J.id, 0, N < 0);
                            }
                        } else {
                            G.showImg(G.current_id, I, N < 0);
                        }
                    }
                }
            }
        },
        showImg: function (K, I, F) {
            var J = this;
            var H = J.imgloader.getImgById(K);
            if (!H) {
                return;
            }
            J.current_id = K;
            J.current_index = I;
            J.current_total_index = J.imgloader.getTotalIndex(K, I);
            J.pic_name.html(H.name).get(0).className = "photo_title js_pic_name " + C(H.type, H.style);
            J.pic_info.html("共" + H.bigImages.length + "张图片");
            var G = J.imgloader.getImgInfo(K, I, function (L) {
                setTimeout(function () {
                    J.pic_con.find("div.loading").hide();
                    var N = J.pic_con.find("div.pic_wrap").html('<img data-width="' + L.width + '" data-height="' + L.height + '" src="' + L.src + '" />');
                    var M = J.pic_con.find("img");
                    J.pic_con.find("div.pic").show();
                    J._layoutImg(M[0], L.width, L.height);
                    J.pic_con.find("p").remove();
                    if (L.intro) {
                        J.pic_con.find("div.pic").append("<p ><span >" + L.user + ":</span><span>" + L.intro + "</span></p>");
                    }
                    J.pic_view_org.css({
                        top: ((J.pic_con_h - M[0].height) / 2 + 14) + "px",
                        right: ((J.pic_con_w - M[0].width) / 2 + 14) + "px"
                    }).attr("href", L.org_url);
                    J._renderPicList(K, I);
                }, 25);
            }, F);
            if (!G) {
                J.pic_con.find("div.loading").show();
                J.pic_con.find("div.pic").hide();
            }
            if (J.dom.css("display") === "none") {
                J.show();
            }
        },
        _renderPicList: function (S, M) {
            var V = this,
                H = this.imgloader;
            var F = V.pic_list_h / 155 >> 0;
            var L = H.getPicById(S);
            var T = H.getImgById(S);
            var X = T.index;
            var J = X + 1;
            var N = H.getImgByIndex(J);
            var W = X - 1;
            var K = H.getImgByIndex(W);
            if (N) {
                var Q = H.getPicById(N.id);
                L.push(Q[0]);
            }
            if (K) {
                var O = H.getPicById(K.id);
                L.splice(0, 0, O[O.length - 1]);
            }
            var R = L.length;
            var I = Math.max(M, 0);
            var G = I + F;
            if (G >= R) {
                I = Math.max(R - F, 0);
            }
            var U = L.slice(I, G);
            var P = i.map(U, function (Z, ab) {
                var aa = "",
                    Y = "";
                if (Z.id !== S) {
                    if (ab === 0) {
                        aa = "<span>浏览上一地点照片</span>";
                    } else {
                        aa = "<span>浏览下一地点照片</span>";
                    }
                }
                if (Z.id === S && Z.index === M) {
                    Y = "class='active'";
                }
                return "<li " + Y + ' data-index="' + Z.index + '" data-tind="' + Z.total_index + '" data-id="' + Z.id + '"><img src="' + Z.small_src + '" />' + aa + "</li>";
            });
            V.pic_list.find("ul").html(P.join(""));
        },
        show: function () {
            i("html").css("overflow", "hidden");
            this._layoutWin();
            if (t.Browser.isIE6) {
                var F = i(document).scrollTop();
                this.dom.css("top", F);
            }
            this.dom.show();
        },
        hide: function () {
            if (t.Browser.isIE6) {
                i("html").css({
                    overflow: "auto",
                    "padding-right": "0px"
                });
            } else {
                i("html").css("overflow", "auto");
            }
            this.dom.hide();
        }
    };
    i.extend(g.prototype, q);
    var B = ["loading", "loaded"];

    function p(K, I, F, L) {
        if (!(K instanceof i) && i.type(K) !== "array") {
            K = [K];
        }
        if ((i.type(F) === "undefined" || i.type(F) === "number") && i.type(I) === "function") {
            L = F;
            F = I;
            I = i.noop;
        }
        I = I || i.noop;
        F = F || i.noop;
        var M = K.length;
        var G = function () {
            if (M === 0) {
                F(H, K);
            }
        };
        var O = function (T, R) {
            var S = {
                src: T,
                status: B[0],
                width: null,
                height: null
            };
            var P = function () {
                var U = this;
                S.status = B[1];
                S.width = U.width;
                S.height = U.height;
                M--;
                I(S, U, R);
                G();
            };
            var Q = c(T, P);
            S.img = Q;
            return S;
        };
        var J;
        if (L) {
            var N = K.splice(L, 1)[0];
            var J = O(N, L);
        }
        var H = i.map(K, function (P, Q) {
            return O(P, Q);
        });
        if (L) {
            H.splice(L, 0, J);
        }
        return H;
    }

    function y(G, F, H) {
        this.img_map = G;
        this.img_ele_ids = F;
        this.pics = H;
        this.pubsub = i({});
    }
    var f = {
        _PRE_LOAD_COUNT_: 6,
        getIdByIndex: function (F) {
            return this.img_ele_ids[F];
        },
        getImgByIndex: function (F) {
            var G = this.getIdByIndex(F);
            if (G != null) {
                return this.getImgById(this.getIdByIndex(F));
            }
            return null;
        },
        getImgById: function (F) {
            return this.img_map[F];
        },
        getPicById: function (G) {
            function F(I, H) {
                I.total_index = H;
            }
            return i.grep(this.pics, function (I, H) {
                if (I.id === G) {
                    F(I, H);
                    return true;
                }
                return false;
            });
        },
        totalLen: function () {
            return this.pics.length;
        },
        len: function () {
            return this.img_ele_ids.length;
        },
        __addNewEleImg__: function (I, F) {
            var G = m(I, this.img_ele_ids);
            var H = G + 1;
            return this.__addImgMap__(F, H);
        },
        __addImgMap__: function (N, V) {
            var R = this;
            var F = N.type + "_" + N.id;
            var J = this.img_map;
            var G = this.img_ele_ids;
            var H = this.pics;
            if (J[N.id]) {
                return;
            }
            var O = null;
            if (V === 0) {
                O = 0;
            } else {
                if (V >= this.len()) {
                    O = this.totalLen();
                } else {
                    var T = V - 1;
                    var S = this.getImgByIndex(T);
                    var I = this.getTotalIndex(S.id, S.bigImages.length - 1);
                    O = I + 1;
                }
            }
            var L = [],
                Q = [],
                U = [];
            i.each(N.images, function (X, W) {
                var Y = {
                    id: F,
                    ele_id: N.id,
                    org_url: W.url,
                    big_src: W.bigImageURL,
                    middle_src: W.bigImageURL,
                    small_src: W.middleImageURL,
                    index: X,
                    image_id: W.id,
                    user: W.userName === "author" ? A() : "qunar",
                    intro: W.intro
                };
                L.push(Y.big_src);
                Q.push(Y.small_src);
                U.push(Y);
                H.splice(O++, 0, Y);
            });
            var P = {
                id: F,
                ele_id: N.id,
                type: N.type,
                name: N.name,
                bigImages: L,
                smallImages: Q
            };
            G.splice(V, 0, F);
            J[F] = P;
            for (var M = V, K = G.length; M < K; M++) {
                J[G[M]].index = M;
            }
            return U;
        },
        __isNewEle__: function (H) {
            var F = this.getImgById(H);
            if (F) {
                var G = this.getPicById(H);
                if (G[0] && v(G[0])) {
                    this.__rmImgById__(H);
                    return true;
                }
            }
            return !F;
        },
        __addImage__: function (K, H) {
            var G = this;
            G.__rmSysImgById__(K);
            if (i.type(H) === "object") {
                H = [H];
            }
            t.forEach(H, function (L, M) {
                I(K, L);
            });
            var J = G.getPicById(K);
            t.forEach(J, function (M, L) {
                M.index = L;
            });
            var F = J.slice(J.length - 1);
            return F;

            function I(S, Q) {
                var N = G.getImgById(S);
                var M = 0;
                var L = Q.bigImageURL;
                var P = Q.middleImageURL;
                var O = G.getTotalIndex(S, M);
                N.bigImages.push(L);
                N.smallImages.push(P);
                var R = {
                    id: S,
                    image_id: Q.id,
                    ele_id: N.ele_id,
                    org_url: Q.url,
                    big_src: L,
                    middle_src: Q.bigImageURL,
                    small_src: P,
                    user: Q.userName === "author" ? A() : "qunar",
                    intro: Q.intro
                };
                G.pics.push(R);
            }
        },
        __rmImgByInd__: function (L, H, J) {
            var I = this;
            var F = this.getImgById(L);
            var G = this.getTotalIndex(L, H);
            F.bigImages.splice(H, 1);
            F.smallImages.splice(H, 1);
            this.pics.splice(G, 1);
            var K = this.getPicById(L);
            t.forEach(K, function (N, M) {
                N.index = M;
            });
            if (K.length === 0) {
                I.__rmImgById__(L);
                if (J) {
                    u(J, function (N) {
                        if (N.length) {
                            var M = {
                                id: F.ele_id,
                                type: F.type,
                                name: F.name,
                                images: N
                            };
                            I.__addNewEleImg__(L, M);
                            x.fire("POI_IMG_DELETE_SUCCESSED", F, I.getPicById(L));
                        } else {
                            x.fire("POI_IMG_DELETE_SUCCESSED", F, []);
                        }
                    });
                }
                return;
            }
            x.fire("POI_IMG_DELETE_SUCCESSED", F, K);
        },
        __rmImgById__: function (J) {
            var G = this.getImgById(J);
            var F = G.bigImages.length;
            for (var I = 0; I < F; I++) {
                this.__rmImgByInd__(J, 0);
            }
            var H = t.indexOf(this.img_ele_ids, J);
            this.img_ele_ids.splice(H, 1);
            delete this.img_map[J];
        },
        __rmSysImgById__: function (K) {
            var J = this.getPicById(K);
            if (J[0] && v(J[0])) {
                var H = this.getImgById(K);
                var F = H.bigImages.length;
                for (var I = 0, G = F; I < G; I++) {
                    this.__rmImgByInd__(K, I);
                }
            }
        },
        getTotalIndex: function (J, F) {
            var H = this;
            var G = H.getPicById(J);
            var I = i.grep(G, function (L, K) {
                return K === F;
            })[0];
            if (I && I.total_index != null) {
                return I.total_index;
            }
            return -1;
        },
        slicePics: function (G, F) {
            return this.pics.slice(G, F);
        },
        getPic: function (G, N, I) {
            var O = this;
            var Q = O.getPicById(G);
            var F = i.grep(Q, function (S, R) {
                return R === N;
            })[0];
            var J = F.total_index;
            if (I) {
                var H = Math.max(J - O._PRE_LOAD_COUNT_, 0);
                var L = J + 1;
                var Q = i.grep(O.pics.slice(H, L), function (R) {
                    return !R.status;
                }).reverse();
            } else {
                var H = J;
                var L = Math.min(H + O._PRE_LOAD_COUNT_, O.pics.length);
                var Q = i.grep(O.pics.slice(H, L), function (R) {
                    return !R.status;
                });
            }
            var P = [];
            var K = i.map(Q, function (R) {
                P.push(R.small_src);
                return R.big_src;
            });
            var M = p(K, function (U, T, R) {
                var S = Q[R];
                O._listenLoad(S.id, U, S, S.index);
            }, null);
            p(P, i.noop);
            i.each(Q, function (S, R) {
                i.extend(R, M[S]);
            });
            return F;
        },
        _listenLoad: function (I, H, G, F) {
            i.extend(G, H);
            G.status = B[1];
            this.pubsub.trigger("img_loaded_" + I + "_" + F, [].slice.call(arguments, 0));
        },
        getImgInfo: function (L, I, G, F) {
            var J = this;
            var K = J.getPic(L, I, F);
            var H = K.status;
            if (H !== B[1]) {
                J.pubsub.one("img_loaded_" + L + "_" + I, function (P, Q, O, N, M) {
                    G(N, Q, M);
                });
            } else {
                G(K, L, I);
                return K;
            }
        }
    };
    f.__getPicById__ = f.getPicById;
    i.extend(y.prototype, f);
    var b = function (J) {
        var H = {};
        var I = [];
        var F = 0;
        var G = i.map(J, function (P, O) {
            var R = P.images;
            var Q = P.type + "_" + P.id;
            var M = [],
                L = [];
            for (var N = 0, K = R.length; N < K; N++) {
                (function (S, U) {
                    var X = S.bigImageURL;
                    var W = S.middleImageURL;
                    var T = S.bigImageURL;
                    var V = {
                        id: Q,
                        ele_id: P.id,
                        org_url: S.url,
                        big_src: T,
                        middle_src: X,
                        small_src: W,
                        index: U,
                        user: S.userName,
                        intro: S.intro,
                        image_id: S.id
                    };
                    M.push(W);
                    L.push(T);
                    I.push(V);
                    F++;
                })(R[N], N);
            }
            H[Q] = {
                id: Q,
                ele_id: P.id,
                name: P.name,
                type: P.type,
                smallImages: M,
                bigImages: L,
                index: O,
                style: P.style
            };
            return Q;
        });
        return {
            image_map: H,
            imgs_ids: G,
            pic_datas: I
        };
    };
    (function () {
        var G = g.prototype,
            I = y.prototype;
        var H = Array.prototype.slice;
        var F = /__(\w+)__/;
        for (var J in I) {
            (function (M, L) {
                if (I.hasOwnProperty(M) && F.test(M)) {
                    var K = M.replace(F, function (O, N) {
                        return N;
                    });
                    G[K] = function () {
                        var O = H.call(arguments, 0);
                        var N = this.imgloader;
                        return L.apply(N, O);
                    };
                }
            })(J, I[J]);
        }
    })();

    function v(F) {
        return F.user === "qunar";
    }

    function m(L, K) {
        var F = h.__ELE_IDS__;
        var G = t.indexOf(F, L);
        var I = -1;
        for (var H = G - 1; H >= 0; H--) {
            var J = F[H];
            I = t.indexOf(K, J);
            if (I > -1) {
                break;
            }
        }
        return I;
    }

    function A() {
        return (window.__AUTHOR_USER__ || {}).nickName || "";
    }

    function u(I, K) {
        var G = I.get("type");
        var J = [];
        if (false && 17 == G) {
            J.push({
                url: I.get("image"),
                bigImageURL: I.get("image"),
                middleImageURL: I.get("image"),
                smallImageURL: I.get("image"),
                id: 1,
                intro: "",
                user: "qunar"
            });
            K(J);
            return;
        }
        if (!I.get("poiId")) {
            K([]);
            return;
        }
        var F = r.testAnd(o.PLAN_ELE_CONFIG.ELE_TYPE_DISTRICT, I.get("type"));
        var H = I.get("poiId") + ":" + (F & 1 || 2);
        w.get(o.URLS.IMAGE_SYSTEM, {
            dest_info: H,
            size: 6
        }, function (L) {
            var M = L.data;
            var N = t.map(M, function (P) {
                var Q = P.destId;
                var O = a(P.images, Q);
                return O;
            });
            K(N[0] || []);
        }, function (L) {
            K([]);
        });
    }
    var a = function (F, K) {
        var G = window.__BOOK_ID__ * K;
        var H = ((G % 3) + 1) * 2;
        var J, I = [];
        if (F.length <= H) {
            return F;
        } else {
            for (J = 0; J < H; J++) {
                I = I.concat(F.splice(G % F.length, 1));
            }
            return I;
        }
    };
    d.exports = {
        createView: function (G) {
            var I = b(G);
            var H = new y(I.image_map, I.imgs_ids, I.pic_datas);
            var F = new g(H);
            return F;
        },
        isSystemImg: v,
        preload: p
    };
});
define("finish3nd/module/photo/PhotoUpload", ["../../config", "../../utils/Http", "../../utils/BitString", "../../utils/StringUtil", "../Observer"], function (k, B, d) {
    var j = window.__BOOK_ID__;
    var A = k("../../config");
    var x = k("../../utils/Http");
    var r = k("../../utils/BitString");
    var i = k("../../utils/StringUtil");
    var y = k("../Observer");
    var w = 100;
    var c = null,
        C = null;
    var b = false,
        a = null;
    var g = ['<div class="b_dialog b_upload_image" style="width: 680px">', '<div class="e_dialog_hd paddingpatch">上传我的旅行照片</div>', '<div class="e_dialog_ct js_content">', '<div class="upload_ct">', "<h2>当前使用的照片如下：</h2>", '<ul class="list-item clrfix"></ul>', '<p class="errormsg hide">照片上传失败，请稍后重试。</p>', '<ul class="tips">', "<li>最多可以上传100张照片，按住Ctrl可多选照片。 支持jpg、png格式，大小不超过10MB。</li>", '<li>我承诺上传的照片不侵犯他人权利，并接受<a href="http://www.qunar.com/site/zh/Rules.shtml" target="_blank">《去哪儿旅游搜索引擎服务协议》</a>。</li>', "</ul>", "</div>", "</div>", '<div class="e_dialog_ft"><button class="btn_confirm">完&nbsp;成</button></div>', '<a href="#" class="btn_close" title="关闭">x</a>', "</div>"].join("");
    var h = ['<div class="b_dialog b_deleteprompt" style="width:456px;">', '<div class="e_dialog_hd paddingpatch">删除提示</div>', '<div class="e_dialog_ct js_content">', '<div class="ct_cont">确定要删除这张照片吗？</div>', "</div>", '<div class="e_dialog_ft"><button class="btn_confirm">确 定</button><button class="btn_cancel js_close_new">取 消</button></div>', '<a href="#" class="btn_close js_close_new" title="关闭">x</a>', "</div>"].join("");
    var o = function () {
        c = new QNR.Dialog({
            content: g,
            titleVisible: false,
            closeCls: "btn_close",
            hideCloseBtn: false,
            width: "68px"
        });
    };
    var p = function () {
        C = new QNR.Dialog({
            content: h,
            titleVisible: false,
            closeCls: "btn_close",
            hideCloseBtn: false,
            width: "456px"
        });
    };
    var t = function (H) {
        var E, D, G, F;
        if (null == C) {
            p();
        }
        E = C.getContent().parent();
        D = C.getMask()._dom;
        G = parseInt(D.css("zIndex"), 10);
        F = parseInt(E.parent().css("zIndex"), 10);
        E.find("button.btn_confirm").unbind("click").click(function (I) {
            H.call(this);
            C.close(function () {
                D.css("zIndex", G);
                C.getMask().show();
            });
        });
        E.find(".js_close_new").unbind("click").click(function (I) {
            C.close(function () {
                D.css("zIndex", G);
                C.getMask().show();
            });
        });
        D.css("zIndex", F - 5);
        C.show();
    };
    var u = function (E) {
        var F = $(this);
        var I = c.getContent().data("data");
        var H, K, G, J, D;
        a && a.destroy();
        a = null;
        E.stopPropagation();
        E.preventDefault();
        c.close();
        if (b) {}
    };
    var e = function (D, F) {
        var G = D.find("div.upload div.object");
        var E = D.find("li:first");
        if (1 == F) {
            E.css({
                position: "absolute",
                top: "-20000px"
            });
            return;
        } else {
            E.css({
                position: "relative",
                top: "auto"
            });
            return;
        }
    };
    var m = function () {
        return $("<li></li>");
    };
    var v = function (F) {
        var D = $('<li class="image" style="overflow: hidden;" />');
        var E = $('<img class="pic2resize" data-width="200" data-height="150" data-grid="1" alt="" src="' + F.small_src + '" />');
        D.data("data", F);
        D.append(E, $('<span class="item_close" />'), $('<div class="des_bg" />'), $('<div class="des" />'));
        D.find("div.des").append(q(F.intro));
        return D;
    };
    var q = function (D) {
        return D ? ('<div class="des_finish">' + i.encodeHTML(D) + "</div>") : '<div class="des_title">添加图解</div>';
    };
    var l = function (E) {
        var F = "img_ph_" + E.id;
        var D = $("<li id='" + F + "' class='js_img_ph' style='border:1px solid #e2e2e2;width:198px;height:148px;position:relative;' ></li>");
        return D;
    };
    var z = function (F, D, G) {
        if (G) {
            F.empty();
        }
        var E = '<li><div class="item_default current upload">';
        E += '<div style="z-index: 10" class="object"><span><img src="http://source.qunar.com/site/images/travel/finish/add_image_default.png" width="132" height="132" /><input type="file" name="file" /></span></div>';
        E += '<span class="uploading hide" style="z-index: 10">照片上传中</span>';
        E += "</div></li>";
        F.append(E);
        QNR.forEach(D, function (I) {
            var H = v(I);
            F.append(H);
        });
    };
    var s = function () {
        var E = c.getContent();
        var G = function (I) {
            var L = $(this).parent();
            var J = L.data("data");
            var K = E.data("data");
            I.preventDefault();
            I.stopPropagation();
            t(function (M) {
                x.post(A.URLS.IMAGE_DELETE, {
                    _method: "DELETE",
                    imageIds: J.image_id
                }, function (N) {
                    var Q = L.parent(),
                        O, R = -1;
                    var S = Q.find("li.image");
                    var P = S.index(L);
                    var T = K.get("type") + "_" + K.get("id");
                    L.remove();
                    y.fire("POI_IMG_DELETE", T, P, K);
                }, function (N) {
                    E.find("p.errormsg").text("删除照片失败，请稍后重试。").show().stop(true, true).fadeOut(5000);
                });
            });
        };
        var F = function (I) {
            var N = $(this).parent().parent();
            var K = N.data("data");
            var J, M, L;
            J = ['<div class="des_edit">', '<textarea class="textarea_box" rows="10" cols="30" id="" name="">' + (K.intro || "") + "</textarea>", "</div>"].join("");
            $(this).replaceWith(J);
            M = N.find("textarea");
            L = M.val();
            M.focus();
            M.val(L + " ");
            M.val(L);
        };
        var D = function (I) {
            I.preventDefault();
            I.stopPropagation();
            var N = $(this),
                M = N.parent().parent().parent();
            var L = N.val(),
                K = M.data("data");
            var J = A.URLS.IMAGES_INTRO + K.image_id;
            if (L.length > 20) {
                E.find("p.errormsg").text("照片图解最多只能输入20个字符，请返回修改。").show().stop(true, true).fadeOut(5000);
            } else {
                E.find("p.errormsg").hide();
                x.post(J, {
                    _method: "PUT",
                    intro: L
                }, function (O) {
                    M.find("div.des").empty().append(q(L));
                    K.intro = L;
                    M.data("data", K);
                }, function (O) {
                    E.find("p.errormsg").text("更新照片图解失败，请重试。").show().stop(true, true).fadeOut(5000);
                });
            }
        };
        var H = function (I) {
            I.stopPropagation();
            var L = $(this);
            var K = L.val();
            var J = E.find("p.errormsg");
            if (K.length > 20) {
                J.stop(true, true).text("照片图解最多只能输入20个字符，请返回修改。").show().fadeOut(5000);
                L.val(K.substring(0, 20));
            } else {
                J.hide();
            }
        };
        E.delegate("span.item_close", "click", G);
        E.delegate("div.des div.des_title", "click", F);
        E.delegate("div.des div.des_finish", "click", F);
        E.delegate("div.des div.des_edit textarea", "blur", D);
        E.delegate("div.des div.des_edit textarea", "keydown", function (I) {
            if (I.which == 13) {
                I.preventDefault();
                D.call(this, I);
            } else {
                H.call(this, I);
            }
        });
        E.delegate("div.des div.des_edit textarea", "input", H);
        E.delegate("div.des div.des_edit textarea", "propertychange", H);
    };
    var n = {};
    var f = function (F) {
        var D = c.getContent();
        var E = 0;
        a = QNR.Uploader.getSWFUploader({
            upload_url: A.URLS.IMAGE_UPLOAD,
            file_upload_limit: 0,
            file_size_limit: "10 MB",
            file_types: "*.jpg;*.png;*.jpeg",
            button_placeholder: D.find("div.upload div.object span")[0],
            button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
            button_image_url: "http://source.qunar.com/site/images/travel/finish/add_image_upload_v2.png",
            button_text: "",
            button_text_style: ".upload { color: #ffffff;font-size:14px;font-weight:bold;margin-top:-10px; }",
            button_text_left_padding: 0,
            button_text_top_padding: 0,
            button_width: 200,
            button_height: 150,
            file_queue_error_handler: function (G, H) {
                if (H === SWFUpload.QUEUE_ERROR.INVALID_FILETYPE) {
                    QNR.popMsg("仅支持JPG，JPEG， PNG格式照片，请重新选择照片。");
                } else {
                    if (H === SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT) {
                        QNR.popMsg("上传照片不能超过10M，请重新选择照片。");
                    } else {
                        if (H === SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE) {
                            QNR.popMsg("请不要上传空文件，请重新选择照片。");
                        }
                    }
                }
                return false;
            },
            file_dialog_start_handler: function () {
                while (this.getFile()) {
                    this.cancelUpload();
                }
                E = 0;
            },
            file_queued_handler: function (I) {
                var J = l(I);
                var G = D.find("li.js_img_ph:first");
                if (!G[0]) {
                    G = D.find("li:first");
                }
                G.after(J);
                var H = new FileProgress(I, "img_ph_" + I.id);
                H.setStatus("等待...");
                H.toggleCancel(true, this);
            },
            file_dialog_complete_handler: function (I, G, J) {
                var K = c.getContent().find("ul.list-item");
                var H = K.find("li:first");
                var L = K.find("li.image").size();
                if (I + L > w) {
                    if (L) {
                        QNR.popMsg("最多可以上传" + w + "张照片，您还可以上传" + (w - L) + "张照片哦。");
                    } else {
                        QNR.popMsg("您最多可以选择" + w + "张照片上传，请重新选择。");
                    }
                    return false;
                } else {
                    if (-1 === E) {
                        return false;
                    } else {
                        E = I;
                        this.startUpload();
                    }
                }
            },
            upload_start_handler: function (I) {
                var J = F.get("poiId"),
                    K = F.get("type");
                var G = 8;
                var L = {
                    bookId: j,
                    bookElementId: F.get("id"),
                    bookElementType: K,
                    destId: 0
                };
                if (17 == K) {
                    L.destType = 8;
                } else {
                    if (r.testAnd(A.PLAN_ELE_CONFIG.ELE_TYPE_DISTRICT, K)) {
                        L.destType = 1;
                        L.destId = J;
                    } else {
                        if (r.testAnd(A.PLAN_ELE_CONFIG.ELE_TYPE_DESTPOI, K)) {
                            L.destType = 2;
                            L.destId = J;
                        } else {
                            if (r.testAnd(A.PLAN_ELE_CONFIG.ELE_TYPE_CUSTOMIZE, K)) {
                                if (J) {
                                    L.destType = 2;
                                    L.destId = J;
                                } else {
                                    L.destType = 8;
                                }
                            } else {
                                L.destType = 8;
                            }
                        }
                    }
                }
                this.setPostParams(L);
                e(D, 1);
                n[I.id] = true;
                var H = new FileProgress(I, "img_ph_" + I.id);
                H.setStatus("上传中...");
                H.toggleCancel(true, this);
                return true;
            },
            upload_progress_handler: function (H, K, J) {
                var I = Math.ceil((K / J) * 100);
                var G = new FileProgress(H, "img_ph_" + H.id);
                G.setProgress(I);
                G.setStatus("上传中...");
            },
            upload_success_handler: function (I, P) {
                var M = I.index;
                var O = c.getContent().find("ul.list-item");
                var L = O.find("li.js_img_ph");
                var H = new FileProgress(I, "img_ph_" + I.id);
                H.setComplete();
                H.setStatus("完成.");
                H.toggleCancel(false);
                var N = [],
                    K, J, G = [];
                P = $.parseJSON(P);
                if (P) {
                    if (true == P.ret && 0 == P.errcode) {
                        QNR.forEach(P.data.images, function (Q) {
                            N.push({
                                url: Q.originalUrl,
                                smallImageURL: Q.smallUrl,
                                middleImageURL: Q.middleUrl,
                                bigImageURL: Q.bigUrl,
                                id: Q.id,
                                width: Q.width,
                                height: Q.height,
                                intro: "",
                                userName: "author"
                            });
                            G.push(Q.id);
                        });
                        x.post(A.URLS.SET_IMGVALID, {
                            image_ids: G.join(",")
                        }, function (Q) {
                            var T = c.getContent().find("ul.list-item"),
                                S, R;
                            var V = y.fire("POI_IMG_UPLOAD_SUCCESS", {
                                id: F.get("id"),
                                name: F.get("name"),
                                type: F.get("type")
                            }, N);
                            var U = T.find("li.js_img_ph");
                            QNR.forEach(V, function (X, W) {
                                S = v(X);
                                $("#img_ph_" + I.id).replaceWith(S);
                            });
                            delete n[I.id];
                            b = true;
                            if (QNR.isEmpty(n)) {
                                e(D, 2);
                            }
                        }, function (Q) {
                            D.find("p.errormsg").text("照片上传失败，请稍后重试。").show().stop(true, true).fadeOut(5000);
                            doms.remove();
                            e(D, 2);
                            return;
                        });
                    } else {
                        if (7 == P.errcode) {
                            L.remove();
                            e(D, 2);
                            alert("请登录后上传");
                        } else {
                            console.error("错误", arguments);
                            L.remove();
                            e(D, 2);
                            alert("系统错误");
                        }
                    }
                } else {
                    setTimeout(function () {
                        D.find("p.errormsg").text("照片上传失败，请稍后重试。").show().stop(true, true).fadeOut(5000);
                        e(D, 2);
                    }, 200);
                    return;
                }
            },
            upload_error_handler: function () {
                if (E) {
                    console.error("错误", arguments);
                    QNR.popMsg("网络繁忙，请稍后重试");
                }
                E = 0;
                D.find("li.js_img_ph").remove();
                e(D, 2);
            }
        });
    };
    return {
        uploadDlgShow: function (F, D) {
            var E;
            D = D || [];
            if (null === c) {
                o();
                c.getContent().parent().find("button.btn_confirm").click(u);
                c.getContent().parent().find("a.btn_close").click(u);
                s(F);
            }
            c.getContent().data("data", F);
            if (D.length) {
                c.getContent().find("h2").text("当前信息正在使用的照片如下，你可以继续上传或删除原有照片");
            } else {
                c.getContent().find("h2").text("你还没有上传这个信息的相关照片，快快上传吧～");
            }
            E = c.getContent().find("ul.list-item");
            z(E, D, true);
            f(F);
            b = false;
            c.show();
        }
    };
});
if (typeof QTMPL === "undefined") {
    var QTMPL = {};
}
$(function () {

    seajs.use(["finish3nd/module/Observer", "finish3nd/module/NavCity", "finish3nd/module/City", "finish3nd/module/PlanEleMemo", "finish3nd/module/PlanEleComment"], function (f, e, i, h, j) {

        e.init($("#b_slide_nav"));

    });



});