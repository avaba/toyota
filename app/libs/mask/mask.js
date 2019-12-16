!function(t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : t.Numbered = e()
}(this, function() {
    "use strict";
    var a = {
        mask: "+7 (###) ### - ## - ##",
        numbered: "#",
        empty: "_",
        placeholder: !1
    };
    return function(t, e) {
        var g = this;
        for (var n in "object" != typeof t ? g.inputs = document.querySelectorAll(t) : void 0 !== t.length ? g.inputs = t : g.inputs = [t],
        g.inputs = Array.prototype.slice.call(g.inputs),
        e = e || (void 0 !== g.inputs[0].numbered ? g.inputs[0].numbered.params : {}),
        a)
            void 0 === e[n] && (e[n] = a[n]);
        for (var i in g.params = e,
        g.config = {},
        g.config.placeholder = g.params.mask.replace(new RegExp(g.params.numbered,"g"), g.params.empty),
        g.config.numbered = g.params.numbered.replace(/([()[\]\.^\#$|?+-])/g, "\\\\$1"),
        g.config.numberedCol = g.params.mask.split(g.params.numbered).length - 1,
        g.config.empty = g.params.empty.replace(/([()[\]\.^\#$|?+-])/g, "\\$1"),
        g.config.mask = g.params.mask.replace(/([()[\]\.^\#$|?+-])/g, "\\$1").replace(new RegExp(g.config.numbered,"g"), "(\\d)"),
        g.config.maskNums = g.params.mask.replace(/[^\d]/gi, "").split(""),
        g.config.maskNumsCol = g.config.maskNums.length,
        g.config.regexp = new RegExp("^" + g.config.mask + "$"),
        g.config.events = ["input", "change", "click", "focusin", "blur"],
        g._eventFire = function(t, e) {
            if (t.fireEvent)
                t.fireEvent("on" + e);
            else {
                var n = document.createEvent("Events");
                n.initEvent(e, !0, !1),
                t.dispatchEvent(n)
            }
        }
        ,
        g._getSelectionRange = function(t) {
            var e = {
                text: "",
                start: 0,
                end: 0,
                length: 0
            };
            if (t.setSelectionRange)
                e.start = t.selectionStart,
                e.end = t.selectionEnd,
                e.text = e.start != e.end ? t.value.substring(e.start, e.end) : "";
            else if (document.selection) {
                var n;
                if (t.tagName && "TEXTAREA" === t.tagName) {
                    var i = document.selection.createRange().duplicate();
                    n = t.createTextRange();
                    var r = i.getBookmark();
                    n.moveToBookmark(r)
                } else
                    n = document.selection.createRange().duplicate();
                for (e.text = n.text; 0 !== n.moveStart("character", -1); e.start++)
                    ;
                e.end = e.text.length + e.start
            }
            return e.length = e.text.length,
            e
        }
        ,
        g.magic = function(t) {
            var e = this.numbered
              , n = e.input.value || " "
              , i = n.replace(/[^\d]/gi, "").split("").join("").split("")
              , r = i.length
              , o = 0
              , s = -1
              , a = -1
              , l = (g._getSelectionRange(e.input),
            0)
              , c = []
              , u = e.params.mask.split("");
            for (var d in u) {
                var p = u[d];
                d = parseInt(d),
                l <= e.config.maskNumsCol && p == e.config.maskNums[l] && p == i[o] ? (c.push(p),
                l++,
                o++) : p == e.params.numbered ? (s < 0 && (s = d),
                o < r ? (c.push(i[o]),
                o++,
                a = d) : c.push(e.params.empty)) : c.push(p)
            }
            n = c.join("");
            var f = 0 <= a ? a + 1 : s;
            if ("click" !== t.type && ("blur" !== t.type && "change" !== t.type || o - l != 0 || e.params.placeholder ? e.oldValue === e.input.value && "focusin" !== t.type || (this.value = n) : this.value = ""),
            "change" !== t.type && "blur" !== t.type && ("click" !== t.type || "focusin" === e.lastEvent && "click" === t.type))
                if (e.input.setSelectionRange)
                    e.input.setSelectionRange(f, f);
                else if (e.input.createTextRange) {
                    var h = e.input.createTextRange();
                    h.collapse(!0),
                    h.moveEnd("character", f),
                    h.moveStart("character", f),
                    h.select()
                }
            return e.oldValue = this.value,
            e.lastEvent = t.type,
            t.target
        }
        ,
        g.inputs) {
            var r = g.inputs[i]
              , o = !1;
            if ("оbject" != typeof r.numbered && void 0 === r.numbered || (o = !0),
            r.numbered = {
                input: g.inputs[i],
                config: g.config,
                params: g.params,
                oldValue: !1
            },
            !o) {
                for (var s in g.config.events)
                    r.addEventListener(g.config.events[s], g.magic);
                g._eventFire(r, "blur")
            }
            g.inputs[i] = r
        }
        return g.destroy = function() {
            var t = this;
            for (var e in t.inputs) {
                var n = t.inputs[e];
                for (var i in t.config.events)
                    n.removeEventListener(t.config.events[i], t.magic),
                    n.numbered = null
            }
            return null
        }
        ,
        g.validate = function(t) {
            var e = t || !1
              , n = 1 < this.inputs.length && []
              , i = !1 !== e ? [e] : this.inputs;
            for (var r in i) {
                var o;
                i[r],
                o = i[r].numbered.config.regexp.test(i[r].numbered.input.value) ? 1 : "" === i[r].numbered.input.value || i[r].numbered.input.value === i[r].numbered.config.placeholder ? 0 : -1,
                1 < i.length ? n.push(o) : n = o
            }
            return n
        }
        ,
        g.reInit = function() {
            var t = 1 < this.inputs.length && [];
            for (var e in this.inputs) {
                var n = this.inputs[e];
                this._eventFire(n, "blur")
            }
            return t
        }
        ,
        g.setVal = function(t) {
            var e = 1 < this.inputs.length && [];
            for (var n in this.inputs) {
                var i = this.inputs[n];
                i.value = t,
                this._eventFire(i, "blur")
            }
            return e
        }
        ,
        g.getVal = function(t) {
            var e = t || !1
              , n = [];
            for (var i in this.inputs) {
                var r = this.inputs[i]
                  , o = r.value;
                if (e)
                    if (0 < this.validate(r)) {
                        var s = o.match(this.config.regexp);
                        o = s.slice(1, s.length).join("")
                    } else
                        o = r.value.replace(/[^\d]/gi, "");
                n.push(o)
            }
            return 1 < n.length ? n : n[0]
        }
        ,
        g
    }
}),