! function(e) {
    "undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define("hljs", [], function() {
        return window.hljs
    }))
}(function(e) {
    function n(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function t(e) {
        return e.nodeName.toLowerCase()
    }

    function r(e, n) {
        var t = e && e.exec(n);
        return t && 0 == t.index
    }

    function a(e) {
        return /no-?highlight|plain|text/.test(e)
    }

    function i(e) {
        var n, t, r, i = e.className + " ";
        if (i += e.parentNode ? e.parentNode.className : "", t = /\blang(?:uage)?-([\w-]+)\b/.exec(i)) return E(t[1]) ? t[1] : "no-highlight";
        for (i = i.split(/\s+/), n = 0, r = i.length; r > n; n++)
            if (E(i[n]) || a(i[n])) return i[n]
    }

    function o(e, n) {
        var t, r = {};
        for (t in e) r[t] = e[t];
        if (n)
            for (t in n) r[t] = n[t];
        return r
    }

    function u(e) {
        var n = [];
        return function r(e, a) {
            for (var i = e.firstChild; i; i = i.nextSibling) 3 == i.nodeType ? a += i.nodeValue.length : 1 == i.nodeType && (n.push({
                event: "start",
                offset: a,
                node: i
            }), a = r(i, a), t(i).match(/br|hr|img|input/) || n.push({
                event: "stop",
                offset: a,
                node: i
            }));
            return a
        }(e, 0), n
    }

    function c(e, r, a) {
        function i() {
            return e.length && r.length ? e[0].offset != r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" == r[0].event ? e : r : e.length ? e : r
        }

        function o(e) {
            function r(e) {
                return " " + e.nodeName + '="' + n(e.value) + '"'
            }
            f += "<" + t(e) + Array.prototype.map.call(e.attributes, r).join("") + ">"
        }

        function u(e) {
            f += "</" + t(e) + ">"
        }

        function c(e) {
            ("start" == e.event ? o : u)(e.node)
        }
        for (var s = 0, f = "", l = []; e.length || r.length;) {
            var g = i();
            if (f += n(a.substr(s, g[0].offset - s)), s = g[0].offset, g == e) {
                l.reverse().forEach(u);
                do c(g.splice(0, 1)[0]), g = i(); while (g == e && g.length && g[0].offset == s);
                l.reverse().forEach(o)
            } else "start" == g[0].event ? l.push(g[0].node) : l.pop(), c(g.splice(0, 1)[0])
        }
        return f + n(a.substr(s))
    }

    function s(e) {
        function n(e) {
            return e && e.source || e
        }

        function t(t, r) {
            return new RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""))
        }

        function r(a, i) {
            if (!a.compiled) {
                if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
                    var u = {},
                        c = function(n, t) {
                            e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function(e) {
                                var t = e.split("|");
                                u[t[0]] = [n, t[1] ? Number(t[1]) : 1]
                            })
                        };
                    "string" == typeof a.k ? c("keyword", a.k) : Object.keys(a.k).forEach(function(e) {
                        c(e, a.k[e])
                    }), a.k = u
                }
                a.lR = t(a.l || /\b\w+\b/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = t(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []);
                var s = [];
                a.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(n) {
                        s.push(o(e, n))
                    }) : s.push("self" == e ? a : e)
                }), a.c = s, a.c.forEach(function(e) {
                    r(e, a)
                }), a.starts && r(a.starts, i);
                var f = a.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([a.tE, a.i]).map(n).filter(Boolean);
                a.t = f.length ? t(f.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }
            }
        }
        r(e)
    }

    function f(e, t, a, i) {
        function o(e, n) {
            for (var t = 0; t < n.c.length; t++)
                if (r(n.c[t].bR, e)) return n.c[t]
        }

        function u(e, n) {
            if (r(e.eR, n)) {
                for (; e.endsParent && e.parent;) e = e.parent;
                return e
            }
            return e.eW ? u(e.parent, n) : void 0
        }

        function c(e, n) {
            return !a && r(n.iR, e)
        }

        function g(e, n) {
            var t = N.cI ? n[0].toLowerCase() : n[0];
            return e.k.hasOwnProperty(t) && e.k[t]
        }

        function h(e, n, t, r) {
            var tag = '<span class="';
            if (e==='persiancomment') tag = '<p class="';
            var a = r ? "" : w.classPrefix,
                i = tag + a,
                o = t ? "" : "</span>";
            return i += e + '">', i + n + o
        }

        function p() {
            if (!L.k) return n(y);
            var e = "",
                t = 0;
            L.lR.lastIndex = 0;
            for (var r = L.lR.exec(y); r;) {
                e += n(y.substr(t, r.index - t));
                var a = g(L, r);
                a ? (B += a[1], e += h(a[0], n(r[0]))) : e += n(r[0]), t = L.lR.lastIndex, r = L.lR.exec(y)
            }
            return e + n(y.substr(t))
        }

        function d() {
            var e = "string" == typeof L.sL;
            if (e && !x[L.sL]) return n(y);
            var t = e ? f(L.sL, y, !0, M[L.sL]) : l(y, L.sL.length ? L.sL : void 0);
            return L.r > 0 && (B += t.r), e && (M[L.sL] = t.top), h(t.language, t.value, !1, !0)
        }

        function b() {
            return void 0 !== L.sL ? d() : p()
        }

        function v(e, t) {
            var r = e.cN ? h(e.cN, "", !0) : "";
            e.rB ? (k += r, y = "") : e.eB ? (k += n(t) + r, y = "") : (k += r, y = t), L = Object.create(e, {
                parent: {
                    value: L
                }
            })
        }

        function m(e, t) {
            if (y += e, void 0 === t) return k += b(), 0;
            var r = o(t, L);
            if (r) return k += b(), v(r, t), r.rB ? 0 : t.length;
            var a = u(L, t);
            if (a) {
                var i = L;
                i.rE || i.eE || (y += t), k += b();
                do L.cN && (k += (L.cN!=="persiancomment" ? "</span>" : "</p>")), B += L.r, L = L.parent; while (L != a.parent);
                return i.eE && (k += n(t)), y = "", a.starts && v(a.starts, ""), i.rE ? 0 : t.length
            }
            if (c(t, L)) throw new Error('Illegal lexeme "' + t + '" for mode "' + (L.cN || "<unnamed>") + '"');
            return y += t, t.length || 1
        }
        var N = E(e);
        if (!N) throw new Error('Unknown language: "' + e + '"');
        s(N);
        var R, L = i || N,
            M = {},
            k = "";
        for (R = L; R != N; R = R.parent) R.cN && (k = h(R.cN, "", !0) + k);
        var y = "",
            B = 0;
        try {
            for (var C, j, I = 0;;) {
                if (L.t.lastIndex = I, C = L.t.exec(t), !C) break;
                j = m(t.substr(I, C.index - I), C[0]), I = C.index + j
            }
            for (m(t.substr(I)), R = L; R.parent; R = R.parent) R.cN && (k += "</span>");
            return {
                r: B,
                value: k,
                language: e,
                top: L
            }
        } catch (O) {
            if (-1 != O.message.indexOf("Illegal")) return {
                r: 0,
                value: n(t)
            };
            throw O
        }
    }

    function l(e, t) {
        t = t || w.languages || Object.keys(x);
        var r = {
                r: 0,
                value: n(e)
            },
            a = r;
        return t.forEach(function(n) {
            if (E(n)) {
                var t = f(n, e, !1);
                t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t)
            }
        }), a.language && (r.second_best = a), r
    }

    function g(e) {
        return w.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, n) {
            return n.replace(/\t/g, w.tabReplace)
        })), w.useBR && (e = e.replace(/\n/g, "<br>")), e
    }

    function h(e, n, t) {
        var r = n ? R[n] : t,
            a = [e.trim()];
        return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(r) && a.push(r), a.join(" ").trim()
    }

    function p(e) {
        var n = i(e);
        if (!a(n)) {
            var t;
            w.useBR ? (t = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : t = e;
            var r = t.textContent,
                o = n ? f(n, r, !0) : l(r),
                s = u(t);
            if (s.length) {
                var p = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                p.innerHTML = o.value, o.value = c(s, u(p), r)
            }
            o.value = g(o.value), e.innerHTML = o.value, e.className = h(e.className, n, o.language), e.result = {
                language: o.language,
                re: o.r
            }, o.second_best && (e.second_best = {
                language: o.second_best.language,
                re: o.second_best.r
            })
        }
    }

    function d(e) {
        w = o(w, e)
    }

    function b() {
        if (!b.called) {
            b.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, p)
        }
    }

    function v() {
        addEventListener("DOMContentLoaded", b, !1), addEventListener("load", b, !1)
    }

    function m(n, t) {
        var r = x[n] = t(e);
        r.aliases && r.aliases.forEach(function(e) {
            R[e] = n
        })
    }

    function N() {
        return Object.keys(x)
    }

    function E(e) {
        return x[e] || x[R[e]]
    }
    var w = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        },
        x = {},
        R = {};
    return e.highlight = f, e.highlightAuto = l, e.fixMarkup = g, e.highlightBlock = p, e.configure = d, e.initHighlighting = b, e.initHighlightingOnLoad = v, e.registerLanguage = m, e.listLanguages = N, e.getLanguage = E, e.inherit = o, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    }, e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    }, e.PWM = {
        b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
    }, e.C = function(n, t, r) {
        var a = e.inherit({
            cN: "comment",
            b: n,
            e: t,
            c: []
        }, r || {});
        return a.c.push(e.PWM), a.c.push({
            cN: "doctag",
            b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            r: 0
        }), a
    }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    }, e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    }, e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    }, e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    }, e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    }, e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    }, e
});
hljs.registerLanguage("julia", function(r) {
    var e = {
            keyword: "in abstract baremodule begin bitstype break catch ccall const continue do else elseif end export finally for function global if immutable import importall let local macro module quote return try type typealias using while",
            literal: "true false ANY ARGS CPU_CORES C_NULL DL_LOAD_PATH DevNull ENDIAN_BOM ENV I|0 Inf Inf16 Inf32 InsertionSort JULIA_HOME LOAD_PATH MS_ASYNC MS_INVALIDATE MS_SYNC MergeSort NaN NaN16 NaN32 OS_NAME QuickSort RTLD_DEEPBIND RTLD_FIRST RTLD_GLOBAL RTLD_LAZY RTLD_LOCAL RTLD_NODELETE RTLD_NOLOAD RTLD_NOW RoundDown RoundFromZero RoundNearest RoundToZero RoundUp STDERR STDIN STDOUT VERSION WORD_SIZE catalan cglobal e eu eulergamma golden im nothing pi γ π φ",
            built_in: "ASCIIString AbstractArray AbstractRNG AbstractSparseArray Any ArgumentError Array Associative Base64Pipe Bidiagonal BigFloat BigInt BitArray BitMatrix BitVector Bool BoundsError Box CFILE Cchar Cdouble Cfloat Char CharString Cint Clong Clonglong ClusterManager Cmd Coff_t Colon Complex Complex128 Complex32 Complex64 Condition Cptrdiff_t Cshort Csize_t Cssize_t Cuchar Cuint Culong Culonglong Cushort Cwchar_t DArray DataType DenseArray Diagonal Dict DimensionMismatch DirectIndexString Display DivideError DomainError EOFError EachLine Enumerate ErrorException Exception Expr Factorization FileMonitor FileOffset Filter Float16 Float32 Float64 FloatRange FloatingPoint Function GetfieldNode GotoNode Hermitian IO IOBuffer IOStream IPv4 IPv6 InexactError Int Int128 Int16 Int32 Int64 Int8 IntSet Integer InterruptException IntrinsicFunction KeyError LabelNode LambdaStaticData LineNumberNode LoadError LocalProcess MIME MathConst MemoryError MersenneTwister Method MethodError MethodTable Module NTuple NewvarNode Nothing Number ObjectIdDict OrdinalRange OverflowError ParseError PollingFileWatcher ProcessExitedException ProcessGroup Ptr QuoteNode Range Range1 Ranges Rational RawFD Real Regex RegexMatch RemoteRef RepString RevString RopeString RoundingMode Set SharedArray Signed SparseMatrixCSC StackOverflowError Stat StatStruct StepRange String SubArray SubString SymTridiagonal Symbol SymbolNode Symmetric SystemError Task TextDisplay Timer TmStruct TopNode Triangular Tridiagonal Type TypeConstructor TypeError TypeName TypeVar UTF16String UTF32String UTF8String UdpSocket Uint Uint128 Uint16 Uint32 Uint64 Uint8 UndefRefError UndefVarError UniformScaling UnionType UnitRange Unsigned Vararg VersionNumber WString WeakKeyDict WeakRef Woodbury Zip"
        },
        t = "[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*",
        o = {
            l: t,
            k: e
        },
        n = {
            cN: "type-annotation",
            b: /::/
        },
        a = {
            cN: "subtype",
            b: /<:/
        },
        i = {
            cN: "number",
            b: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
            r: 0
        },
        l = {
            cN: "char",
            b: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
        },
        c = {
            cN: "subst",
            b: /\$\(/,
            e: /\)/,
            k: e
        },
        u = {
            cN: "variable",
            b: "\\$" + t
        },
        d = {
            cN: "string",
            c: [r.BE, c, u],
            v: [{
                b: /\w*"/,
                e: /"\w*/
            }, {
                b: /\w*"""/,
                e: /"""\w*/
            }]
        },
        g = {
            cN: "string",
            c: [r.BE, c, u],
            b: "`",
            e: "`"
        },
        s = {
            cN: "macrocall",
            b: "@" + t
        },
        SS = {
            cN: "persiancomment",
            v: [{
                b: "#=!",
                e: "!=#",
                r: 10
            }]
        },
        S = {
            cN: "comment",
            v: [{
                b: "#=",
                e: "=#",
                r: 10
            }, {
                b: "#",
                e: "$"
            }]
        };
    return o.c = [i, l, n, a, d, g, s, SS, S, r.HCM], c.c = o.c, o
});
