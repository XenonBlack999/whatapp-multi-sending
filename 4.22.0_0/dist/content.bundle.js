(()=>{
    var e = {
        757: (e,t,n)=>{
            e.exports = n(666)
        }
        ,
        460: function(e, t) {
            var n, o;
            n = function e() {
                "use strict";
                var t = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== t ? t : {}
                  , n = !t.document && !!t.postMessage
                  , o = n && /blob:/i.test((t.location || {}).protocol)
                  , r = {}
                  , i = 0
                  , a = {
                    parse: function(n, o) {
                        var s = (o = o || {}).dynamicTyping || !1;
                        if (x(s) && (o.dynamicTypingFunction = s,
                        s = {}),
                        o.dynamicTyping = s,
                        o.transform = !!x(o.transform) && o.transform,
                        o.worker && a.WORKERS_SUPPORTED) {
                            var c = function() {
                                if (!a.WORKERS_SUPPORTED)
                                    return !1;
                                var n, o, s = (n = t.URL || t.webkitURL || null,
                                o = e.toString(),
                                a.BLOB_URL || (a.BLOB_URL = n.createObjectURL(new Blob(["(", o, ")();"],{
                                    type: "text/javascript"
                                })))), c = new t.Worker(s);
                                return c.onmessage = g,
                                c.id = i++,
                                r[c.id] = c
                            }();
                            return c.userStep = o.step,
                            c.userChunk = o.chunk,
                            c.userComplete = o.complete,
                            c.userError = o.error,
                            o.step = x(o.step),
                            o.chunk = x(o.chunk),
                            o.complete = x(o.complete),
                            o.error = x(o.error),
                            delete o.worker,
                            void c.postMessage({
                                input: n,
                                config: o,
                                workerId: c.id
                            })
                        }
                        var m = null;
                        return a.NODE_STREAM_INPUT,
                        "string" == typeof n ? m = o.download ? new l(o) : new u(o) : !0 === n.readable && x(n.read) && x(n.on) ? m = new p(o) : (t.File && n instanceof File || n instanceof Object) && (m = new d(o)),
                        m.stream(n)
                    },
                    unparse: function(e, t) {
                        var n = !1
                          , o = !0
                          , r = ","
                          , i = "\r\n"
                          , s = '"'
                          , c = s + s
                          , l = !1
                          , d = null
                          , u = !1;
                        !function() {
                            if ("object" == typeof t) {
                                if ("string" != typeof t.delimiter || a.BAD_DELIMITERS.filter((function(e) {
                                    return -1 !== t.delimiter.indexOf(e)
                                }
                                )).length || (r = t.delimiter),
                                ("boolean" == typeof t.quotes || "function" == typeof t.quotes || Array.isArray(t.quotes)) && (n = t.quotes),
                                "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (l = t.skipEmptyLines),
                                "string" == typeof t.newline && (i = t.newline),
                                "string" == typeof t.quoteChar && (s = t.quoteChar),
                                "boolean" == typeof t.header && (o = t.header),
                                Array.isArray(t.columns)) {
                                    if (0 === t.columns.length)
                                        throw new Error("Option columns is empty");
                                    d = t.columns
                                }
                                void 0 !== t.escapeChar && (c = t.escapeChar + s),
                                "boolean" == typeof t.escapeFormulae && (u = t.escapeFormulae)
                            }
                        }();
                        var p = new RegExp(h(s),"g");
                        if ("string" == typeof e && (e = JSON.parse(e)),
                        Array.isArray(e)) {
                            if (!e.length || Array.isArray(e[0]))
                                return m(null, e, l);
                            if ("object" == typeof e[0])
                                return m(d || Object.keys(e[0]), e, l)
                        } else if ("object" == typeof e)
                            return "string" == typeof e.data && (e.data = JSON.parse(e.data)),
                            Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields),
                            e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : "object" == typeof e.data[0] ? Object.keys(e.data[0]) : []),
                            Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [e.data])),
                            m(e.fields || [], e.data || [], l);
                        throw new Error("Unable to serialize unrecognized input");
                        function m(e, t, n) {
                            var a = "";
                            "string" == typeof e && (e = JSON.parse(e)),
                            "string" == typeof t && (t = JSON.parse(t));
                            var s = Array.isArray(e) && 0 < e.length
                              , c = !Array.isArray(t[0]);
                            if (s && o) {
                                for (var l = 0; l < e.length; l++)
                                    0 < l && (a += r),
                                    a += f(e[l], l);
                                0 < t.length && (a += i)
                            }
                            for (var d = 0; d < t.length; d++) {
                                var u = s ? e.length : t[d].length
                                  , p = !1
                                  , m = s ? 0 === Object.keys(t[d]).length : 0 === t[d].length;
                                if (n && !s && (p = "greedy" === n ? "" === t[d].join("").trim() : 1 === t[d].length && 0 === t[d][0].length),
                                "greedy" === n && s) {
                                    for (var h = [], g = 0; g < u; g++) {
                                        var b = c ? e[g] : g;
                                        h.push(t[d][b])
                                    }
                                    p = "" === h.join("").trim()
                                }
                                if (!p) {
                                    for (var v = 0; v < u; v++) {
                                        0 < v && !m && (a += r);
                                        var y = s && c ? e[v] : v;
                                        a += f(t[d][y], v)
                                    }
                                    d < t.length - 1 && (!n || 0 < u && !m) && (a += i)
                                }
                            }
                            return a
                        }
                        function f(e, t) {
                            if (null == e)
                                return "";
                            if (e.constructor === Date)
                                return JSON.stringify(e).slice(1, 25);
                            !0 === u && "string" == typeof e && null !== e.match(/^[=+\-@].*$/) && (e = "'" + e);
                            var o = e.toString().replace(p, c)
                              , i = "boolean" == typeof n && n || "function" == typeof n && n(e, t) || Array.isArray(n) && n[t] || function(e, t) {
                                for (var n = 0; n < t.length; n++)
                                    if (-1 < e.indexOf(t[n]))
                                        return !0;
                                return !1
                            }(o, a.BAD_DELIMITERS) || -1 < o.indexOf(r) || " " === o.charAt(0) || " " === o.charAt(o.length - 1);
                            return i ? s + o + s : o
                        }
                    }
                };
                if (a.RECORD_SEP = String.fromCharCode(30),
                a.UNIT_SEP = String.fromCharCode(31),
                a.BYTE_ORDER_MARK = "\ufeff",
                a.BAD_DELIMITERS = ["\r", "\n", '"', a.BYTE_ORDER_MARK],
                a.WORKERS_SUPPORTED = !n && !!t.Worker,
                a.NODE_STREAM_INPUT = 1,
                a.LocalChunkSize = 10485760,
                a.RemoteChunkSize = 5242880,
                a.DefaultDelimiter = ",",
                a.Parser = f,
                a.ParserHandle = m,
                a.NetworkStreamer = l,
                a.FileStreamer = d,
                a.StringStreamer = u,
                a.ReadableStreamStreamer = p,
                t.jQuery) {
                    var s = t.jQuery;
                    s.fn.parse = function(e) {
                        var n = e.config || {}
                          , o = [];
                        return this.each((function(e) {
                            if ("INPUT" !== s(this).prop("tagName").toUpperCase() || "file" !== s(this).attr("type").toLowerCase() || !t.FileReader || !this.files || 0 === this.files.length)
                                return !0;
                            for (var r = 0; r < this.files.length; r++)
                                o.push({
                                    file: this.files[r],
                                    inputElem: this,
                                    instanceConfig: s.extend({}, n)
                                })
                        }
                        )),
                        r(),
                        this;
                        function r() {
                            if (0 !== o.length) {
                                var t, n, r, c = o[0];
                                if (x(e.before)) {
                                    var l = e.before(c.file, c.inputElem);
                                    if ("object" == typeof l) {
                                        if ("abort" === l.action)
                                            return "AbortError",
                                            t = c.file,
                                            n = c.inputElem,
                                            r = l.reason,
                                            void (x(e.error) && e.error({
                                                name: "AbortError"
                                            }, t, n, r));
                                        if ("skip" === l.action)
                                            return void i();
                                        "object" == typeof l.config && (c.instanceConfig = s.extend(c.instanceConfig, l.config))
                                    } else if ("skip" === l)
                                        return void i()
                                }
                                var d = c.instanceConfig.complete;
                                c.instanceConfig.complete = function(e) {
                                    x(d) && d(e, c.file, c.inputElem),
                                    i()
                                }
                                ,
                                a.parse(c.file, c.instanceConfig)
                            } else
                                x(e.complete) && e.complete()
                        }
                        function i() {
                            o.splice(0, 1),
                            r()
                        }
                    }
                }
                function c(e) {
                    this._handle = null,
                    this._finished = !1,
                    this._completed = !1,
                    this._halted = !1,
                    this._input = null,
                    this._baseIndex = 0,
                    this._partialLine = "",
                    this._rowCount = 0,
                    this._start = 0,
                    this._nextChunk = null,
                    this.isFirstChunk = !0,
                    this._completeResults = {
                        data: [],
                        errors: [],
                        meta: {}
                    },
                    function(e) {
                        var t = y(e);
                        t.chunkSize = parseInt(t.chunkSize),
                        e.step || e.chunk || (t.chunkSize = null),
                        this._handle = new m(t),
                        (this._handle.streamer = this)._config = t
                    }
                    .call(this, e),
                    this.parseChunk = function(e, n) {
                        if (this.isFirstChunk && x(this._config.beforeFirstChunk)) {
                            var r = this._config.beforeFirstChunk(e);
                            void 0 !== r && (e = r)
                        }
                        this.isFirstChunk = !1,
                        this._halted = !1;
                        var i = this._partialLine + e;
                        this._partialLine = "";
                        var s = this._handle.parse(i, this._baseIndex, !this._finished);
                        if (!this._handle.paused() && !this._handle.aborted()) {
                            var c = s.meta.cursor;
                            this._finished || (this._partialLine = i.substring(c - this._baseIndex),
                            this._baseIndex = c),
                            s && s.data && (this._rowCount += s.data.length);
                            var l = this._finished || this._config.preview && this._rowCount >= this._config.preview;
                            if (o)
                                t.postMessage({
                                    results: s,
                                    workerId: a.WORKER_ID,
                                    finished: l
                                });
                            else if (x(this._config.chunk) && !n) {
                                if (this._config.chunk(s, this._handle),
                                this._handle.paused() || this._handle.aborted())
                                    return void (this._halted = !0);
                                s = void 0,
                                this._completeResults = void 0
                            }
                            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(s.data),
                            this._completeResults.errors = this._completeResults.errors.concat(s.errors),
                            this._completeResults.meta = s.meta),
                            this._completed || !l || !x(this._config.complete) || s && s.meta.aborted || (this._config.complete(this._completeResults, this._input),
                            this._completed = !0),
                            l || s && s.meta.paused || this._nextChunk(),
                            s
                        }
                        this._halted = !0
                    }
                    ,
                    this._sendError = function(e) {
                        x(this._config.error) ? this._config.error(e) : o && this._config.error && t.postMessage({
                            workerId: a.WORKER_ID,
                            error: e,
                            finished: !1
                        })
                    }
                }
                function l(e) {
                    var t;
                    (e = e || {}).chunkSize || (e.chunkSize = a.RemoteChunkSize),
                    c.call(this, e),
                    this._nextChunk = n ? function() {
                        this._readChunk(),
                        this._chunkLoaded()
                    }
                    : function() {
                        this._readChunk()
                    }
                    ,
                    this.stream = function(e) {
                        this._input = e,
                        this._nextChunk()
                    }
                    ,
                    this._readChunk = function() {
                        if (this._finished)
                            this._chunkLoaded();
                        else {
                            if (t = new XMLHttpRequest,
                            this._config.withCredentials && (t.withCredentials = this._config.withCredentials),
                            n || (t.onload = w(this._chunkLoaded, this),
                            t.onerror = w(this._chunkError, this)),
                            t.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !n),
                            this._config.downloadRequestHeaders) {
                                var e = this._config.downloadRequestHeaders;
                                for (var o in e)
                                    t.setRequestHeader(o, e[o])
                            }
                            if (this._config.chunkSize) {
                                var r = this._start + this._config.chunkSize - 1;
                                t.setRequestHeader("Range", "bytes=" + this._start + "-" + r)
                            }
                            try {
                                t.send(this._config.downloadRequestBody)
                            } catch (e) {
                                this._chunkError(e.message)
                            }
                            n && 0 === t.status && this._chunkError()
                        }
                    }
                    ,
                    this._chunkLoaded = function() {
                        4 === t.readyState && (t.status < 200 || 400 <= t.status ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : t.responseText.length,
                        this._finished = !this._config.chunkSize || this._start >= function(e) {
                            var t = e.getResponseHeader("Content-Range");
                            return null === t ? -1 : parseInt(t.substring(t.lastIndexOf("/") + 1))
                        }(t),
                        this.parseChunk(t.responseText)))
                    }
                    ,
                    this._chunkError = function(e) {
                        var n = t.statusText || e;
                        this._sendError(new Error(n))
                    }
                }
                function d(e) {
                    var t, n;
                    (e = e || {}).chunkSize || (e.chunkSize = a.LocalChunkSize),
                    c.call(this, e);
                    var o = "undefined" != typeof FileReader;
                    this.stream = function(e) {
                        this._input = e,
                        n = e.slice || e.webkitSlice || e.mozSlice,
                        o ? ((t = new FileReader).onload = w(this._chunkLoaded, this),
                        t.onerror = w(this._chunkError, this)) : t = new FileReaderSync,
                        this._nextChunk()
                    }
                    ,
                    this._nextChunk = function() {
                        this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk()
                    }
                    ,
                    this._readChunk = function() {
                        var e = this._input;
                        if (this._config.chunkSize) {
                            var r = Math.min(this._start + this._config.chunkSize, this._input.size);
                            e = n.call(e, this._start, r)
                        }
                        var i = t.readAsText(e, this._config.encoding);
                        o || this._chunkLoaded({
                            target: {
                                result: i
                            }
                        })
                    }
                    ,
                    this._chunkLoaded = function(e) {
                        this._start += this._config.chunkSize,
                        this._finished = !this._config.chunkSize || this._start >= this._input.size,
                        this.parseChunk(e.target.result)
                    }
                    ,
                    this._chunkError = function() {
                        this._sendError(t.error)
                    }
                }
                function u(e) {
                    var t;
                    c.call(this, e = e || {}),
                    this.stream = function(e) {
                        return t = e,
                        this._nextChunk()
                    }
                    ,
                    this._nextChunk = function() {
                        if (!this._finished) {
                            var e, n = this._config.chunkSize;
                            return n ? (e = t.substring(0, n),
                            t = t.substring(n)) : (e = t,
                            t = ""),
                            this._finished = !t,
                            this.parseChunk(e)
                        }
                    }
                }
                function p(e) {
                    c.call(this, e = e || {});
                    var t = []
                      , n = !0
                      , o = !1;
                    this.pause = function() {
                        c.prototype.pause.apply(this, arguments),
                        this._input.pause()
                    }
                    ,
                    this.resume = function() {
                        c.prototype.resume.apply(this, arguments),
                        this._input.resume()
                    }
                    ,
                    this.stream = function(e) {
                        this._input = e,
                        this._input.on("data", this._streamData),
                        this._input.on("end", this._streamEnd),
                        this._input.on("error", this._streamError)
                    }
                    ,
                    this._checkIsFinished = function() {
                        o && 1 === t.length && (this._finished = !0)
                    }
                    ,
                    this._nextChunk = function() {
                        this._checkIsFinished(),
                        t.length ? this.parseChunk(t.shift()) : n = !0
                    }
                    ,
                    this._streamData = w((function(e) {
                        try {
                            t.push("string" == typeof e ? e : e.toString(this._config.encoding)),
                            n && (n = !1,
                            this._checkIsFinished(),
                            this.parseChunk(t.shift()))
                        } catch (e) {
                            this._streamError(e)
                        }
                    }
                    ), this),
                    this._streamError = w((function(e) {
                        this._streamCleanUp(),
                        this._sendError(e)
                    }
                    ), this),
                    this._streamEnd = w((function() {
                        this._streamCleanUp(),
                        o = !0,
                        this._streamData("")
                    }
                    ), this),
                    this._streamCleanUp = w((function() {
                        this._input.removeListener("data", this._streamData),
                        this._input.removeListener("end", this._streamEnd),
                        this._input.removeListener("error", this._streamError)
                    }
                    ), this)
                }
                function m(e) {
                    var t, n, o, r = Math.pow(2, 53), i = -r, s = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, c = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/, l = this, d = 0, u = 0, p = !1, m = !1, g = [], b = {
                        data: [],
                        errors: [],
                        meta: {}
                    };
                    if (x(e.step)) {
                        var v = e.step;
                        e.step = function(t) {
                            if (b = t,
                            E())
                                k();
                            else {
                                if (k(),
                                0 === b.data.length)
                                    return;
                                d += t.data.length,
                                e.preview && d > e.preview ? n.abort() : (b.data = b.data[0],
                                v(b, l))
                            }
                        }
                    }
                    function w(t) {
                        return "greedy" === e.skipEmptyLines ? "" === t.join("").trim() : 1 === t.length && 0 === t[0].length
                    }
                    function k() {
                        if (b && o && (S("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + a.DefaultDelimiter + "'"),
                        o = !1),
                        e.skipEmptyLines)
                            for (var t = 0; t < b.data.length; t++)
                                w(b.data[t]) && b.data.splice(t--, 1);
                        return E() && function() {
                            if (b)
                                if (Array.isArray(b.data[0])) {
                                    for (var t = 0; E() && t < b.data.length; t++)
                                        b.data[t].forEach(n);
                                    b.data.splice(0, 1)
                                } else
                                    b.data.forEach(n);
                            function n(t, n) {
                                x(e.transformHeader) && (t = e.transformHeader(t, n)),
                                g.push(t)
                            }
                        }(),
                        function() {
                            if (!b || !e.header && !e.dynamicTyping && !e.transform)
                                return b;
                            function t(t, n) {
                                var o, r = e.header ? {} : [];
                                for (o = 0; o < t.length; o++) {
                                    var i = o
                                      , a = t[o];
                                    e.header && (i = o >= g.length ? "__parsed_extra" : g[o]),
                                    e.transform && (a = e.transform(a, i)),
                                    a = I(i, a),
                                    "__parsed_extra" === i ? (r[i] = r[i] || [],
                                    r[i].push(a)) : r[i] = a
                                }
                                return e.header && (o > g.length ? S("FieldMismatch", "TooManyFields", "Too many fields: expected " + g.length + " fields but parsed " + o, u + n) : o < g.length && S("FieldMismatch", "TooFewFields", "Too few fields: expected " + g.length + " fields but parsed " + o, u + n)),
                                r
                            }
                            var n = 1;
                            return !b.data.length || Array.isArray(b.data[0]) ? (b.data = b.data.map(t),
                            n = b.data.length) : b.data = t(b.data, 0),
                            e.header && b.meta && (b.meta.fields = g),
                            u += n,
                            b
                        }()
                    }
                    function E() {
                        return e.header && 0 === g.length
                    }
                    function I(t, n) {
                        return o = t,
                        e.dynamicTypingFunction && void 0 === e.dynamicTyping[o] && (e.dynamicTyping[o] = e.dynamicTypingFunction(o)),
                        !0 === (e.dynamicTyping[o] || e.dynamicTyping) ? "true" === n || "TRUE" === n || "false" !== n && "FALSE" !== n && (function(e) {
                            if (s.test(e)) {
                                var t = parseFloat(e);
                                if (i < t && t < r)
                                    return !0
                            }
                            return !1
                        }(n) ? parseFloat(n) : c.test(n) ? new Date(n) : "" === n ? null : n) : n;
                        var o
                    }
                    function S(e, t, n, o) {
                        var r = {
                            type: e,
                            code: t,
                            message: n
                        };
                        void 0 !== o && (r.row = o),
                        b.errors.push(r)
                    }
                    this.parse = function(r, i, s) {
                        var c = e.quoteChar || '"';
                        if (e.newline || (e.newline = function(e, t) {
                            e = e.substring(0, 1048576);
                            var n = new RegExp(h(t) + "([^]*?)" + h(t),"gm")
                              , o = (e = e.replace(n, "")).split("\r")
                              , r = e.split("\n")
                              , i = 1 < r.length && r[0].length < o[0].length;
                            if (1 === o.length || i)
                                return "\n";
                            for (var a = 0, s = 0; s < o.length; s++)
                                "\n" === o[s][0] && a++;
                            return a >= o.length / 2 ? "\r\n" : "\r"
                        }(r, c)),
                        o = !1,
                        e.delimiter)
                            x(e.delimiter) && (e.delimiter = e.delimiter(r),
                            b.meta.delimiter = e.delimiter);
                        else {
                            var l = function(t, n, o, r, i) {
                                var s, c, l, d;
                                i = i || [",", "\t", "|", ";", a.RECORD_SEP, a.UNIT_SEP];
                                for (var u = 0; u < i.length; u++) {
                                    var p = i[u]
                                      , m = 0
                                      , h = 0
                                      , g = 0;
                                    l = void 0;
                                    for (var b = new f({
                                        comments: r,
                                        delimiter: p,
                                        newline: n,
                                        preview: 10
                                    }).parse(t), v = 0; v < b.data.length; v++)
                                        if (o && w(b.data[v]))
                                            g++;
                                        else {
                                            var y = b.data[v].length;
                                            h += y,
                                            void 0 !== l ? 0 < y && (m += Math.abs(y - l),
                                            l = y) : l = y
                                        }
                                    0 < b.data.length && (h /= b.data.length - g),
                                    (void 0 === c || m <= c) && (void 0 === d || d < h) && 1.99 < h && (c = m,
                                    s = p,
                                    d = h)
                                }
                                return {
                                    successful: !!(e.delimiter = s),
                                    bestDelimiter: s
                                }
                            }(r, e.newline, e.skipEmptyLines, e.comments, e.delimitersToGuess);
                            l.successful ? e.delimiter = l.bestDelimiter : (o = !0,
                            e.delimiter = a.DefaultDelimiter),
                            b.meta.delimiter = e.delimiter
                        }
                        var d = y(e);
                        return e.preview && e.header && d.preview++,
                        t = r,
                        n = new f(d),
                        b = n.parse(t, i, s),
                        k(),
                        p ? {
                            meta: {
                                paused: !0
                            }
                        } : b || {
                            meta: {
                                paused: !1
                            }
                        }
                    }
                    ,
                    this.paused = function() {
                        return p
                    }
                    ,
                    this.pause = function() {
                        p = !0,
                        n.abort(),
                        t = x(e.chunk) ? "" : t.substring(n.getCharIndex())
                    }
                    ,
                    this.resume = function() {
                        l.streamer._halted ? (p = !1,
                        l.streamer.parseChunk(t, !0)) : setTimeout(l.resume, 3)
                    }
                    ,
                    this.aborted = function() {
                        return m
                    }
                    ,
                    this.abort = function() {
                        m = !0,
                        n.abort(),
                        b.meta.aborted = !0,
                        x(e.complete) && e.complete(b),
                        t = ""
                    }
                }
                function h(e) {
                    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                }
                function f(e) {
                    var t, n = (e = e || {}).delimiter, o = e.newline, r = e.comments, i = e.step, s = e.preview, c = e.fastMode, l = t = void 0 === e.quoteChar ? '"' : e.quoteChar;
                    if (void 0 !== e.escapeChar && (l = e.escapeChar),
                    ("string" != typeof n || -1 < a.BAD_DELIMITERS.indexOf(n)) && (n = ","),
                    r === n)
                        throw new Error("Comment character same as delimiter");
                    !0 === r ? r = "#" : ("string" != typeof r || -1 < a.BAD_DELIMITERS.indexOf(r)) && (r = !1),
                    "\n" !== o && "\r" !== o && "\r\n" !== o && (o = "\n");
                    var d = 0
                      , u = !1;
                    this.parse = function(e, a, p) {
                        if ("string" != typeof e)
                            throw new Error("Input must be a string");
                        var m = e.length
                          , f = n.length
                          , g = o.length
                          , b = r.length
                          , v = x(i)
                          , y = []
                          , w = []
                          , k = []
                          , E = d = 0;
                        if (!e)
                            return j();
                        if (c || !1 !== c && -1 === e.indexOf(t)) {
                            for (var I = e.split(o), S = 0; S < I.length; S++) {
                                if (k = I[S],
                                d += k.length,
                                S !== I.length - 1)
                                    d += o.length;
                                else if (p)
                                    return j();
                                if (!r || k.substring(0, b) !== r) {
                                    if (v) {
                                        if (y = [],
                                        M(k.split(n)),
                                        R(),
                                        u)
                                            return j()
                                    } else
                                        M(k.split(n));
                                    if (s && s <= S)
                                        return y = y.slice(0, s),
                                        j(!0)
                                }
                            }
                            return j()
                        }
                        for (var B = e.indexOf(n, d), _ = e.indexOf(o, d), L = new RegExp(h(l) + h(t),"g"), T = e.indexOf(t, d); ; )
                            if (e[d] !== t)
                                if (r && 0 === k.length && e.substring(d, d + b) === r) {
                                    if (-1 === _)
                                        return j();
                                    d = _ + g,
                                    _ = e.indexOf(o, d),
                                    B = e.indexOf(n, d)
                                } else if (-1 !== B && (B < _ || -1 === _))
                                    k.push(e.substring(d, B)),
                                    d = B + f,
                                    B = e.indexOf(n, d);
                                else {
                                    if (-1 === _)
                                        break;
                                    if (k.push(e.substring(d, _)),
                                    q(_ + g),
                                    v && (R(),
                                    u))
                                        return j();
                                    if (s && y.length >= s)
                                        return j(!0)
                                }
                            else
                                for (T = d,
                                d++; ; ) {
                                    if (-1 === (T = e.indexOf(t, T + 1)))
                                        return p || w.push({
                                            type: "Quotes",
                                            code: "MissingQuotes",
                                            message: "Quoted field unterminated",
                                            row: y.length,
                                            index: d
                                        }),
                                        O();
                                    if (T === m - 1)
                                        return O(e.substring(d, T).replace(L, t));
                                    if (t !== l || e[T + 1] !== l) {
                                        if (t === l || 0 === T || e[T - 1] !== l) {
                                            -1 !== B && B < T + 1 && (B = e.indexOf(n, T + 1)),
                                            -1 !== _ && _ < T + 1 && (_ = e.indexOf(o, T + 1));
                                            var C = A(-1 === _ ? B : Math.min(B, _));
                                            if (e[T + 1 + C] === n) {
                                                k.push(e.substring(d, T).replace(L, t)),
                                                e[d = T + 1 + C + f] !== t && (T = e.indexOf(t, d)),
                                                B = e.indexOf(n, d),
                                                _ = e.indexOf(o, d);
                                                break
                                            }
                                            var z = A(_);
                                            if (e.substring(T + 1 + z, T + 1 + z + g) === o) {
                                                if (k.push(e.substring(d, T).replace(L, t)),
                                                q(T + 1 + z + g),
                                                B = e.indexOf(n, d),
                                                T = e.indexOf(t, d),
                                                v && (R(),
                                                u))
                                                    return j();
                                                if (s && y.length >= s)
                                                    return j(!0);
                                                break
                                            }
                                            w.push({
                                                type: "Quotes",
                                                code: "InvalidQuotes",
                                                message: "Trailing quote on quoted field is malformed",
                                                row: y.length,
                                                index: d
                                            }),
                                            T++
                                        }
                                    } else
                                        T++
                                }
                        return O();
                        function M(e) {
                            y.push(e),
                            E = d
                        }
                        function A(t) {
                            var n = 0;
                            if (-1 !== t) {
                                var o = e.substring(T + 1, t);
                                o && "" === o.trim() && (n = o.length)
                            }
                            return n
                        }
                        function O(t) {
                            return p || (void 0 === t && (t = e.substring(d)),
                            k.push(t),
                            d = m,
                            M(k),
                            v && R()),
                            j()
                        }
                        function q(t) {
                            d = t,
                            M(k),
                            k = [],
                            _ = e.indexOf(o, d)
                        }
                        function j(e) {
                            return {
                                data: y,
                                errors: w,
                                meta: {
                                    delimiter: n,
                                    linebreak: o,
                                    aborted: u,
                                    truncated: !!e,
                                    cursor: E + (a || 0)
                                }
                            }
                        }
                        function R() {
                            i(j()),
                            y = [],
                            w = []
                        }
                    }
                    ,
                    this.abort = function() {
                        u = !0
                    }
                    ,
                    this.getCharIndex = function() {
                        return d
                    }
                }
                function g(e) {
                    var t = e.data
                      , n = r[t.workerId]
                      , o = !1;
                    if (t.error)
                        n.userError(t.error, t.file);
                    else if (t.results && t.results.data) {
                        var i = {
                            abort: function() {
                                o = !0,
                                b(t.workerId, {
                                    data: [],
                                    errors: [],
                                    meta: {
                                        aborted: !0
                                    }
                                })
                            },
                            pause: v,
                            resume: v
                        };
                        if (x(n.userStep)) {
                            for (var a = 0; a < t.results.data.length && (n.userStep({
                                data: t.results.data[a],
                                errors: t.results.errors,
                                meta: t.results.meta
                            }, i),
                            !o); a++)
                                ;
                            delete t.results
                        } else
                            x(n.userChunk) && (n.userChunk(t.results, i, t.file),
                            delete t.results)
                    }
                    t.finished && !o && b(t.workerId, t.results)
                }
                function b(e, t) {
                    var n = r[e];
                    x(n.userComplete) && n.userComplete(t),
                    n.terminate(),
                    delete r[e]
                }
                function v() {
                    throw new Error("Not implemented.")
                }
                function y(e) {
                    if ("object" != typeof e || null === e)
                        return e;
                    var t = Array.isArray(e) ? [] : {};
                    for (var n in e)
                        t[n] = y(e[n]);
                    return t
                }
                function w(e, t) {
                    return function() {
                        e.apply(t, arguments)
                    }
                }
                function x(e) {
                    return "function" == typeof e
                }
                return o && (t.onmessage = function(e) {
                    var n = e.data;
                    if (void 0 === a.WORKER_ID && n && (a.WORKER_ID = n.workerId),
                    "string" == typeof n.input)
                        t.postMessage({
                            workerId: a.WORKER_ID,
                            results: a.parse(n.input, n.config),
                            finished: !0
                        });
                    else if (t.File && n.input instanceof File || n.input instanceof Object) {
                        var o = a.parse(n.input, n.config);
                        o && t.postMessage({
                            workerId: a.WORKER_ID,
                            results: o,
                            finished: !0
                        })
                    }
                }
                ),
                (l.prototype = Object.create(c.prototype)).constructor = l,
                (d.prototype = Object.create(c.prototype)).constructor = d,
                (u.prototype = Object.create(u.prototype)).constructor = u,
                (p.prototype = Object.create(c.prototype)).constructor = p,
                a
            }
            ,
            void 0 === (o = n.apply(t, [])) || (e.exports = o)
        },
        666: e=>{
            var t = function(e) {
                "use strict";
                var t, n = Object.prototype, o = n.hasOwnProperty, r = "function" == typeof Symbol ? Symbol : {}, i = r.iterator || "@@iterator", a = r.asyncIterator || "@@asyncIterator", s = r.toStringTag || "@@toStringTag";
                function c(e, t, n) {
                    return Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }),
                    e[t]
                }
                try {
                    c({}, "")
                } catch (e) {
                    c = function(e, t, n) {
                        return e[t] = n
                    }
                }
                function l(e, t, n, o) {
                    var r = t && t.prototype instanceof g ? t : g
                      , i = Object.create(r.prototype)
                      , a = new L(o || []);
                    return i._invoke = function(e, t, n) {
                        var o = u;
                        return function(r, i) {
                            if (o === m)
                                throw new Error("Generator is already running");
                            if (o === h) {
                                if ("throw" === r)
                                    throw i;
                                return C()
                            }
                            for (n.method = r,
                            n.arg = i; ; ) {
                                var a = n.delegate;
                                if (a) {
                                    var s = S(a, n);
                                    if (s) {
                                        if (s === f)
                                            continue;
                                        return s
                                    }
                                }
                                if ("next" === n.method)
                                    n.sent = n._sent = n.arg;
                                else if ("throw" === n.method) {
                                    if (o === u)
                                        throw o = h,
                                        n.arg;
                                    n.dispatchException(n.arg)
                                } else
                                    "return" === n.method && n.abrupt("return", n.arg);
                                o = m;
                                var c = d(e, t, n);
                                if ("normal" === c.type) {
                                    if (o = n.done ? h : p,
                                    c.arg === f)
                                        continue;
                                    return {
                                        value: c.arg,
                                        done: n.done
                                    }
                                }
                                "throw" === c.type && (o = h,
                                n.method = "throw",
                                n.arg = c.arg)
                            }
                        }
                    }(e, n, a),
                    i
                }
                function d(e, t, n) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, n)
                        }
                    } catch (e) {
                        return {
                            type: "throw",
                            arg: e
                        }
                    }
                }
                e.wrap = l;
                var u = "suspendedStart"
                  , p = "suspendedYield"
                  , m = "executing"
                  , h = "completed"
                  , f = {};
                function g() {}
                function b() {}
                function v() {}
                var y = {};
                c(y, i, (function() {
                    return this
                }
                ));
                var w = Object.getPrototypeOf
                  , x = w && w(w(T([])));
                x && x !== n && o.call(x, i) && (y = x);
                var k = v.prototype = g.prototype = Object.create(y);
                function E(e) {
                    ["next", "throw", "return"].forEach((function(t) {
                        c(e, t, (function(e) {
                            return this._invoke(t, e)
                        }
                        ))
                    }
                    ))
                }
                function I(e, t) {
                    function n(r, i, a, s) {
                        var c = d(e[r], e, i);
                        if ("throw" !== c.type) {
                            var l = c.arg
                              , u = l.value;
                            return u && "object" == typeof u && o.call(u, "__await") ? t.resolve(u.__await).then((function(e) {
                                n("next", e, a, s)
                            }
                            ), (function(e) {
                                n("throw", e, a, s)
                            }
                            )) : t.resolve(u).then((function(e) {
                                l.value = e,
                                a(l)
                            }
                            ), (function(e) {
                                return n("throw", e, a, s)
                            }
                            ))
                        }
                        s(c.arg)
                    }
                    var r;
                    this._invoke = function(e, o) {
                        function i() {
                            return new t((function(t, r) {
                                n(e, o, t, r)
                            }
                            ))
                        }
                        return r = r ? r.then(i, i) : i()
                    }
                }
                function S(e, n) {
                    var o = e.iterator[n.method];
                    if (o === t) {
                        if (n.delegate = null,
                        "throw" === n.method) {
                            if (e.iterator.return && (n.method = "return",
                            n.arg = t,
                            S(e, n),
                            "throw" === n.method))
                                return f;
                            n.method = "throw",
                            n.arg = new TypeError("The iterator does not provide a 'throw' method")
                        }
                        return f
                    }
                    var r = d(o, e.iterator, n.arg);
                    if ("throw" === r.type)
                        return n.method = "throw",
                        n.arg = r.arg,
                        n.delegate = null,
                        f;
                    var i = r.arg;
                    return i ? i.done ? (n[e.resultName] = i.value,
                    n.next = e.nextLoc,
                    "return" !== n.method && (n.method = "next",
                    n.arg = t),
                    n.delegate = null,
                    f) : i : (n.method = "throw",
                    n.arg = new TypeError("iterator result is not an object"),
                    n.delegate = null,
                    f)
                }
                function B(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]),
                    2 in e && (t.finallyLoc = e[2],
                    t.afterLoc = e[3]),
                    this.tryEntries.push(t)
                }
                function _(e) {
                    var t = e.completion || {};
                    t.type = "normal",
                    delete t.arg,
                    e.completion = t
                }
                function L(e) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }],
                    e.forEach(B, this),
                    this.reset(!0)
                }
                function T(e) {
                    if (e) {
                        var n = e[i];
                        if (n)
                            return n.call(e);
                        if ("function" == typeof e.next)
                            return e;
                        if (!isNaN(e.length)) {
                            var r = -1
                              , a = function n() {
                                for (; ++r < e.length; )
                                    if (o.call(e, r))
                                        return n.value = e[r],
                                        n.done = !1,
                                        n;
                                return n.value = t,
                                n.done = !0,
                                n
                            };
                            return a.next = a
                        }
                    }
                    return {
                        next: C
                    }
                }
                function C() {
                    return {
                        value: t,
                        done: !0
                    }
                }
                return b.prototype = v,
                c(k, "constructor", v),
                c(v, "constructor", b),
                b.displayName = c(v, s, "GeneratorFunction"),
                e.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name))
                }
                ,
                e.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, v) : (e.__proto__ = v,
                    c(e, s, "GeneratorFunction")),
                    e.prototype = Object.create(k),
                    e
                }
                ,
                e.awrap = function(e) {
                    return {
                        __await: e
                    }
                }
                ,
                E(I.prototype),
                c(I.prototype, a, (function() {
                    return this
                }
                )),
                e.AsyncIterator = I,
                e.async = function(t, n, o, r, i) {
                    void 0 === i && (i = Promise);
                    var a = new I(l(t, n, o, r),i);
                    return e.isGeneratorFunction(n) ? a : a.next().then((function(e) {
                        return e.done ? e.value : a.next()
                    }
                    ))
                }
                ,
                E(k),
                c(k, s, "Generator"),
                c(k, i, (function() {
                    return this
                }
                )),
                c(k, "toString", (function() {
                    return "[object Generator]"
                }
                )),
                e.keys = function(e) {
                    var t = [];
                    for (var n in e)
                        t.push(n);
                    return t.reverse(),
                    function n() {
                        for (; t.length; ) {
                            var o = t.pop();
                            if (o in e)
                                return n.value = o,
                                n.done = !1,
                                n
                        }
                        return n.done = !0,
                        n
                    }
                }
                ,
                e.values = T,
                L.prototype = {
                    constructor: L,
                    reset: function(e) {
                        if (this.prev = 0,
                        this.next = 0,
                        this.sent = this._sent = t,
                        this.done = !1,
                        this.delegate = null,
                        this.method = "next",
                        this.arg = t,
                        this.tryEntries.forEach(_),
                        !e)
                            for (var n in this)
                                "t" === n.charAt(0) && o.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t)
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type)
                            throw e.arg;
                        return this.rval
                    },
                    dispatchException: function(e) {
                        if (this.done)
                            throw e;
                        var n = this;
                        function r(o, r) {
                            return s.type = "throw",
                            s.arg = e,
                            n.next = o,
                            r && (n.method = "next",
                            n.arg = t),
                            !!r
                        }
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var a = this.tryEntries[i]
                              , s = a.completion;
                            if ("root" === a.tryLoc)
                                return r("end");
                            if (a.tryLoc <= this.prev) {
                                var c = o.call(a, "catchLoc")
                                  , l = o.call(a, "finallyLoc");
                                if (c && l) {
                                    if (this.prev < a.catchLoc)
                                        return r(a.catchLoc, !0);
                                    if (this.prev < a.finallyLoc)
                                        return r(a.finallyLoc)
                                } else if (c) {
                                    if (this.prev < a.catchLoc)
                                        return r(a.catchLoc, !0)
                                } else {
                                    if (!l)
                                        throw new Error("try statement without catch or finally");
                                    if (this.prev < a.finallyLoc)
                                        return r(a.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var r = this.tryEntries[n];
                            if (r.tryLoc <= this.prev && o.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                var i = r;
                                break
                            }
                        }
                        i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                        var a = i ? i.completion : {};
                        return a.type = e,
                        a.arg = t,
                        i ? (this.method = "next",
                        this.next = i.finallyLoc,
                        f) : this.complete(a)
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type)
                            throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
                        this.method = "return",
                        this.next = "end") : "normal" === e.type && t && (this.next = t),
                        f
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var n = this.tryEntries[t];
                            if (n.finallyLoc === e)
                                return this.complete(n.completion, n.afterLoc),
                                _(n),
                                f
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var n = this.tryEntries[t];
                            if (n.tryLoc === e) {
                                var o = n.completion;
                                if ("throw" === o.type) {
                                    var r = o.arg;
                                    _(n)
                                }
                                return r
                            }
                        }
                        throw new Error("illegal catch attempt")
                    },
                    delegateYield: function(e, n, o) {
                        return this.delegate = {
                            iterator: T(e),
                            resultName: n,
                            nextLoc: o
                        },
                        "next" === this.method && (this.arg = t),
                        f
                    }
                },
                e
            }(e.exports);
            try {
                regeneratorRuntime = t
            } catch (e) {
                "object" == typeof globalThis ? globalThis.regeneratorRuntime = t : Function("r", "regeneratorRuntime = r")(t)
            }
        }
    }
      , t = {};
    function n(o) {
        var r = t[o];
        if (void 0 !== r)
            return r.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, n),
        i.exports
    }
    n.n = e=>{
        var t = e && e.__esModule ? ()=>e.default : ()=>e;
        return n.d(t, {
            a: t
        }),
        t
    }
    ,
    n.d = (e,t)=>{
        for (var o in t)
            n.o(t, o) && !n.o(e, o) && Object.defineProperty(e, o, {
                enumerable: !0,
                get: t[o]
            })
    }
    ,
    n.o = (e,t)=>Object.prototype.hasOwnProperty.call(e, t),
    (()=>{
        "use strict";
        function e(e, t, n, o, r, i, a) {
            try {
                var s = e[i](a)
                  , c = s.value
            } catch (e) {
                return void n(e)
            }
            s.done ? t(c) : Promise.resolve(c).then(o, r)
        }
        function t(t) {
            return function() {
                var n = this
                  , o = arguments;
                return new Promise((function(r, i) {
                    var a = t.apply(n, o);
                    function s(t) {
                        e(a, r, i, s, c, "next", t)
                    }
                    function c(t) {
                        e(a, r, i, s, c, "throw", t)
                    }
                    s(void 0)
                }
                ))
            }
        }
        var o, r, i, a, s = n(757), c = n.n(s), l = function(e, t) {
            e.forEach((function(e) {
                e.classList.contains(t) || e.classList.add(t)
            }
            ))
        }, d = function(e, t) {
            e.forEach((function(e) {
                e.classList.contains(t) && e.classList.remove(t)
            }
            ))
        }, u = function(e, t) {
            document.getElementById(e).checked = t,
            document.getElementById(e).dispatchEvent(new Event("change"))
        }, p = "#pane-side div._ak8k > span[title]", m = '#pane-side div[role="gridcell"] div._ak8q', h = "#pane-side div.x1n2onr6.x14yjl9h.xudhj91.x18nykt9.xww2gxu", f = "#main > header > div[title] > div", g = "#main > header > div:nth-child(2) > div", b = "rsi-blur", v = "rsi-image-blur", y = function(e, t) {
            return new Promise((function(n) {
                var o = {};
                o[e] = t,
                chrome.storage.local.set(o, (function() {
                    n({
                        message: "Success"
                    })
                }
                ))
            }
            ))
        }, w = function(e) {
            return new Promise((function(t) {
                chrome.storage.local.get([e], (function(e) {
                    t(e)
                }
                ))
            }
            ))
        }, x = "whatsapp-rocket-accessories-data", k = function() {
            var e = t(c().mark((function e() {
                return c().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.abrupt("return", new Promise(function() {
                                var e = t(c().mark((function e(t) {
                                    var n;
                                    return c().wrap((function(e) {
                                        for (; ; )
                                            switch (e.prev = e.next) {
                                            case 0:
                                                return e.next = 2,
                                                w(x);
                                            case 2:
                                                n = e.sent,
                                                t(JSON.stringify(n) === JSON.stringify({}) ? {} : n[x]);
                                            case 4:
                                            case "end":
                                                return e.stop()
                                            }
                                    }
                                    ), e)
                                }
                                )));
                                return function(t) {
                                    return e.apply(this, arguments)
                                }
                            }()));
                        case 1:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }(), E = function() {
            var e = t(c().mark((function e(t, n) {
                var o;
                return c().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            k();
                        case 2:
                            return (o = e.sent)[t] = n,
                            e.next = 6,
                            y(x, o);
                        case 6:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t, n) {
                return e.apply(this, arguments)
            }
        }(), I = function() {
            var e, t, n = new Audio(chrome.runtime.getURL("audio/notification.mp3"));
            n.volume = .1,
            window.addEventListener("click", (function(t) {
                ["reached-limit-modal-link-button", "reached-limit-modal-close-button-top-right"].includes(t.target.id) && e && (clearInterval(e),
                document.getElementById("counter-wrapper").style.display = "none")
            }
            )),
            document.addEventListener("start-countdown", (function(t) {
                var n = 10;
                document.getElementById("counter-wrapper").style.display = "block",
                document.getElementById("reached-limit-modal-countdown").innerHTML = n,
                e && clearInterval(e),
                e = setInterval((function() {
                    n--,
                    document.getElementById("reached-limit-modal-countdown").innerHTML = n,
                    0 === n && (clearInterval(e),
                    "flex" === document.getElementById("reached-limit-modal-container").style.display && document.getElementById("reached-limit-modal-link-button").click())
                }
                ), 1e3)
            }
            )),
            document.addEventListener("play-audio", (function() {
                n.play(),
                t = setInterval((function() {
                    n.play()
                }
                ), 2e4)
            }
            )),
            document.addEventListener("stop-audio", (function() {
                n.pause(),
                t && clearInterval(t)
            }
            ))
        };
        function S(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, o = new Array(t); n < t; n++)
                o[n] = e[n];
            return o
        }
        function B(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return S(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? S(e, t) : void 0
            }
        }
        function _(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        function L(e, t) {
            if (t.length < e)
                throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present")
        }
        function T(e) {
            L(1, arguments);
            var t = Object.prototype.toString.call(e);
            return e instanceof Date || "object" == typeof e && "[object Date]" === t ? new Date(e.getTime()) : "number" == typeof e || "[object Number]" === t ? new Date(e) : ("string" != typeof e && "[object String]" !== t || "undefined" == typeof console || (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),
            console.warn((new Error).stack)),
            new Date(NaN))
        }
        function C(e, t) {
            L(2, arguments);
            var n = T(e)
              , o = T(t)
              , r = n.getTime() - o.getTime();
            return r < 0 ? -1 : r > 0 ? 1 : r
        }
        function z(e, t) {
            L(2, arguments);
            var n, o = T(e), r = T(t), i = C(o, r), a = Math.abs(function(e, t) {
                L(2, arguments);
                var n = T(e)
                  , o = T(t);
                return 12 * (n.getFullYear() - o.getFullYear()) + (n.getMonth() - o.getMonth())
            }(o, r));
            if (a < 1)
                n = 0;
            else {
                1 === o.getMonth() && o.getDate() > 27 && o.setDate(30),
                o.setMonth(o.getMonth() - i * a);
                var s = C(o, r) === -i;
                (function(e) {
                    L(1, arguments);
                    var t = T(e);
                    return function(e) {
                        L(1, arguments);
                        var t = T(e);
                        return t.setHours(23, 59, 59, 999),
                        t
                    }(t).getTime() === function(e) {
                        L(1, arguments);
                        var t = T(e)
                          , n = t.getMonth();
                        return t.setFullYear(t.getFullYear(), n + 1, 0),
                        t.setHours(23, 59, 59, 999),
                        t
                    }(t).getTime()
                }
                )(T(e)) && 1 === a && 1 === C(e, r) && (s = !1),
                n = i * (a - Number(s))
            }
            return 0 === n ? 0 : n
        }
        var M = "none"
          , A = "none"
          , O = {
            NON_REGISTERED: {
                title: "Create Account",
                content: "Please create an account below to be able to send more messages.\n                    <br><br>\n                    We have a free plan here that will allow you to send more free messages.",
                buttonText: "Create Account",
                link: ""
            },
            REGISTERED: {
                title: "Upgrade",
                content: "You can reached the limit of your present account.\n                    <br><br>\n                    Click below to upgrade.",
                buttonText: "Upgrade",
                link: ""
            }
        }
          , q = "rsi-usage-json"
          , j = function(e) {
            localStorage.setItem(q, e)
        }
          , R = function() {
            return localStorage.getItem(q)
        };
        function N(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, o)
            }
            return n
        }
        function H(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? N(Object(n), !0).forEach((function(t) {
                    _(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : N(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        var D = function() {
            var e = JSON.parse(R());
            return "month" + z(new Date, new Date(e["start-date"]))
        }
          , F = function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return new Promise((function(n, o) {
                var r = H(H({}, JSON.parse(R())), {}, {
                    "new-license-key": t ? e : ""
                });
                chrome.runtime.sendMessage({
                    name: "validateLicense",
                    params: r
                }, (function(t) {
                    var r, i;
                    t.success ? (r = H(H({}, t.data), {}, {
                        "new-license-key": e
                    }),
                    (i = JSON.parse(R()))["last-status-check-date"] = (new Date).toUTCString(),
                    i["license-type"] = r["is-license-active"] ? r["license-type"] : M,
                    i["signed-up-usage-limit-per-month"] = r["is-license-active"] ? r["maximum-month-send-limit"] : 0,
                    i["license-key"] = r["is-license-active"] ? r["new-license-key"] : "",
                    j(JSON.stringify(i)),
                    t.data["is-license-active"] ? n(t.message) : o("An error occurred. Please contact customer service.")) : o(t.message)
                }
                ))
            }
            ))
        }
          , P = function() {
            var e = t(c().mark((function e() {
                var t, n, o, r, i, a, s;
                return c().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            if (t = JSON.parse(R()),
                            n = {
                                "system-code": ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (function(e) {
                                    return (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16)
                                }
                                )),
                                "license-key": "",
                                "start-date": (new Date).toUTCString(),
                                "last-status-check-date": (new Date).toUTCString(),
                                "license-type": M,
                                "non-signed-up-free-usage-counter": 0,
                                "signed-up-usage-counter-per-month": {
                                    month0: 0
                                },
                                "signed-up-usage-limit-per-month": 0
                            },
                            t)
                                for (o = 0,
                                r = Object.entries(n); o < r.length; o++)
                                    c = r[o],
                                    l = 2,
                                    i = function(e) {
                                        if (Array.isArray(e))
                                            return e
                                    }(c) || function(e, t) {
                                        var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                        if (null != n) {
                                            var o, r, i = [], a = !0, s = !1;
                                            try {
                                                for (n = n.call(e); !(a = (o = n.next()).done) && (i.push(o.value),
                                                !t || i.length !== t); a = !0)
                                                    ;
                                            } catch (e) {
                                                s = !0,
                                                r = e
                                            } finally {
                                                try {
                                                    a || null == n.return || n.return()
                                                } finally {
                                                    if (s)
                                                        throw r
                                                }
                                            }
                                            return i
                                        }
                                    }(c, l) || B(c, l) || function() {
                                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                    }(),
                                    a = i[0],
                                    s = i[1],
                                    void 0 === t[a] && (t[a] = s);
                            else
                                t = n;
                            j(JSON.stringify(t));
                        case 4:
                        case "end":
                            return e.stop()
                        }
                    var c, l
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }()
          , U = function() {
            return JSON.parse(R())["license-type"].split("-").map((function(e) {
                return e[0].toUpperCase() + e.substring(1)
            }
            )).join(" ")
        }
          , W = function() {
            var e = JSON.parse(R());
            return e["license-type"] !== M ? e["license-key"] : ""
        }
          , J = function() {
            var e = JSON.parse(R());
            K(),
            e["license-type"] !== M && F(e["license-key"], !1)
        }
          , V = function() {
            var e, t = JSON.parse(R());
            if (t["license-type"] === M)
                return t["non-signed-up-free-usage-counter"] >= 200000000;
            if (t["signed-up-usage-limit-per-month"] === A)
                return !1;
            var n = D()
              , o = parseInt(t["signed-up-usage-limit-per-month"]);
            return (null !== (e = t["signed-up-usage-counter-per-month"][n]) && void 0 !== e ? e : 0) >= o
        }
          , Y = function() {
            var e = JSON.parse(R());
            if (e["license-type"] === M)
                e["non-signed-up-free-usage-counter"] += 1;
            else {
                var t, n = D(), o = null !== (t = e["signed-up-usage-counter-per-month"][n]) && void 0 !== t ? t : 0;
                e["signed-up-usage-counter-per-month"][n] = o + 1
            }
            j(JSON.stringify(e))
        }
          , G = function() {
            var e = JSON.parse(R())
              , t = "";
            if (e["license-type"] === M)
                t = "".concat(e["non-signed-up-free-usage-counter"], " of ").concat(200000, "  sent");
            else if (e["signed-up-usage-limit-per-month"] === A)
                t = "No limit";
            else {
                var n, o = D();
                t = "".concat(null !== (n = e["signed-up-usage-counter-per-month"][o]) && void 0 !== n ? n : 0, " of ").concat(e["signed-up-usage-limit-per-month"], "  sent")
            }
            document.getElementById("rsi-usage-display").innerHTML = "".concat(t, " - Click here to upgrade")
        }
          , K = function() {
            try {
                var e = H(H({}, JSON.parse(R())), {}, {
                    "new-license-key": "test"
                });
                chrome.runtime.sendMessage({
                    name: "validateLicense",
                    params: e
                }, (function(e) {
                    if (e.success) {
                        var t = e.data;
                        if (t["message-rsio1"])
                            return n = t["message-rsio1"],
                            (o = document.getElementById("whatsapp-rocket-modal")).style.cssText = "display: flex; flex-direction: column; height: 74%; padding: 16px",
                            o.innerHTML = '<button type="button"\n                        id="modal-close-button-top-right"\n                        class="close"\n                        data-dismiss="modal"\n                        aria-label="Close">\n                        <span aria-hidden="true">×</span>\n                      </button>\n                      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center">'.concat(n, "</div>"),
                            void document.getElementById("modal-close-button-top-right").addEventListener("click", (function(e) {
                                o.style.display = "none"
                            }
                            ))
                    }
                    var n, o
                }
                ))
            } catch (e) {}
        }
          , $ = function(e, t, n) {
            var o = "data:text/csv;charset=utf-8," + e.join(",") + "\n" + t.map((function(e) {
                return e.join(",")
            }
            )).join("\n")
              , r = encodeURI(o)
              , i = document.createElement("a");
            i.setAttribute("href", r),
            i.setAttribute("download", n + ".csv"),
            document.body.appendChild(i),
            i.click(),
            setTimeout((function() {
                i.remove()
            }
            ), 1e3)
        };
        function Q(e) {
            return function(e) {
                if (Array.isArray(e))
                    return S(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                    return Array.from(e)
            }(e) || B(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        var Z, X, ee, te, ne = "whatsapp-rocket-sending-logs", oe = function() {
            var e = t(c().mark((function e() {
                return c().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.abrupt("return", new Promise(function() {
                                var e = t(c().mark((function e(t) {
                                    var n;
                                    return c().wrap((function(e) {
                                        for (; ; )
                                            switch (e.prev = e.next) {
                                            case 0:
                                                return e.next = 2,
                                                w(ne);
                                            case 2:
                                                n = e.sent,
                                                t(JSON.stringify(n) === JSON.stringify({}) ? {} : n[ne]);
                                            case 4:
                                            case "end":
                                                return e.stop()
                                            }
                                    }
                                    ), e)
                                }
                                )));
                                return function(t) {
                                    return e.apply(this, arguments)
                                }
                            }()));
                        case 1:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }(), re = function() {
            var e = t(c().mark((function e(t, n, o) {
                var r, i, a;
                return c().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            oe();
                        case 2:
                            return r = e.sent,
                            i = [],
                            JSON.stringify(r) !== JSON.stringify({}) && (i = Q(r["phone-number-status"])),
                            i.push([t, n, o]),
                            5e3 === i.length && (i = i.splice(0, 2e3)),
                            a = {
                                "phone-number-status": i
                            },
                            e.next = 10,
                            y(ne, a);
                        case 10:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t, n, o) {
                return e.apply(this, arguments)
            }
        }(), ie = function() {
            var e = t(c().mark((function e() {
                return c().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.abrupt("return", new Promise(function() {
                                var e = t(c().mark((function e(t) {
                                    var n;
                                    return c().wrap((function(e) {
                                        for (; ; )
                                            switch (e.prev = e.next) {
                                            case 0:
                                                return e.next = 2,
                                                oe();
                                            case 2:
                                                n = e.sent,
                                                t(JSON.stringify(n) === JSON.stringify({}) ? [] : n["phone-number-status"]);
                                            case 4:
                                            case "end":
                                                return e.stop()
                                            }
                                    }
                                    ), e)
                                }
                                )));
                                return function(t) {
                                    return e.apply(this, arguments)
                                }
                            }()));
                        case 1:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }(), ae = "whatsapp-rocket-button", se = "message-display-location-for-bulk", ce = "bulk-message-section", le = "bulk-message-send-section-button", de = "whatsapp-rocket-modal", ue = "send-bulk-whatsapp-message-button", pe = '[data-icon="send"]', me = '[data-icon="send"]', he = "SelectContainer", fe = "text-field-section-button", ge = "upload-field-section-button", be = "upload-csv", ve = "excludeHeader", ye = "selectFields", we = "upload-error-message", xe = "csv-file-multi-message-phone-number-list", ke = "whatsapp-csv-file-multi-message-text-content", Ee = "send-bulk-csv-file-whatsapp-message-button", Ie = "message-display-location-for-bulk-csv-file", Se = "CSV_FILE", Be = "CSV_TEXT", _e = "SETTINGS", Le = "quick-chat-panel", Te = "tag-modal-container", Ce = "tag-message-display-location", ze = "new-tag-input", Me = "https://api.whatsapp.com/send", Ae = function() {
            return document.querySelector("#app header > div, header.g0rxnol2.ercejckq.cm280p3y.p357zi0d.gndfcl4n.kcgo1i74.ln8gz9je.e8h85j61.emrlamx0.aiput80m.lyvj5e2u.l9g3jx6n.f6ipylw5 > div, header.x1n2onr6.xfo81ep.x9f619.x78zum5.x6s0dn4.x13a6bvl.xh8yej3.x7j6532.x889kno.x1a8lsjc.x1swvt13.x1pi30zi.x1pl83jw > div")
        }, Oe = function() {
            return document.getElementById(de)
        }, qe = function(e) {
            document.getElementById(fe).disabled = e,
            document.getElementById(le).disabled = e,
            document.getElementById(fe).disabled = e,
            document.getElementById(ge).disabled = e
        }, je = function(e, t) {
            var n = ""
              , o = /^\d+$/;
            return o.test(e) && o.test(t) || (n = "The values always need to be int, no decimal allowed."),
            parseInt(e) > parseInt(t) && (n = "The first time value should be lesser than the second one."),
            e < 1 && (n = "The lowest value for time lag is 1."),
            t > 7200 && (n = "The highest value allowed is 7200 sec."),
            {
                isValid: 0 === n.length,
                message: n
            }
        }, Re = function(e) {
            for (var t = 0; t < e.length; t++)
                if (n = e[t].trim(),
                !/^[\s()+-]*([0-9][\s()+-]*){6,20}$/.test(n))
                    return !1;
            var n;
            return !0
        }, Ne = function(e, t) {
            return 1e3 * (Math.floor(Math.random() * (t - e + 1)) + e)
        }, He = function(e) {
            return '<span><img src="'.concat(chrome.runtime.getURL("images/".concat(e.iconName)), '"\n                style="width: ').concat(e.iconSize, ";\n                height: ").concat(e.iconSize, ';\n                position: relative;\n                top: 1px;">\n                </img></span>')
        }, De = "Not exist", Fe = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return new Promise((function(t) {
                var n = null
                  , o = JSON.parse(window.localStorage.getItem("last-wid"))
                  , r = JSON.parse(window.localStorage.getItem("last-wid-md"));
                o ? n = o.split("@")[0] : r && (n = r.split("@")[0].split(":")[0]);
                var i = new URLSearchParams;
                i.append("phone", n);
                var a = "_" + Math.random().toString(36).substr(2, 9);
                e && i.append("text", "Adding Attachment");
                var s = "".concat(Me, "?").concat(i)
                  , c = document.getElementById(a);
                if (c)
                    c.href = s;
                else {
                    var l = document.createElement("a");
                    l.id = a,
                    l.href = s,
                    l.style.visibility = "hidden",
                    document.body.appendChild(l)
                }
                setTimeout((function() {
                    document.getElementById(a).click(),
                    setTimeout((function() {
                        document.getElementById(a).remove(),
                        e ? setTimeout((function() {
                            document.querySelector(me).click(),
                            t()
                        }
                        ), 500) : t()
                    }
                    ), 100)
                }
                ), 1e3)
            }
            ))
        }, Pe = function() {
            return new Promise((function(e) {
                var t = 0
                  , n = setInterval((function() {
                    10 == ++t && (clearInterval(n),
                    e(!1));
                    var o = document.querySelector('span[data-icon="attach-menu-plus"], span[data-icon="plus"]').parentElement;
                    o && (clearInterval(n),
                    o.click(),
                    e())
                }
                ), 500)
            }
            ))
        }, Ue = function() {
            var e = t(c().mark((function e(t) {
                return c().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.abrupt("return", new Promise((function(e) {
                                setTimeout((function() {
                                    var n = setInterval((function() {
                                        var o = document.querySelector("div[data-animate-modal-body='true'] div[role='textbox'][contenteditable='true']");
                                        if (o && !document.hidden && document.hasFocus()) {
                                            clearInterval(n),
                                            o.blur(),
                                            o.focus(),
                                            t = Ve(t);
                                            var r = document.createRange();
                                            r.selectNodeContents(o),
                                            r.deleteContents(),
                                            r.insertNode(document.createTextNode(t));
                                            var i = new InputEvent("input",{
                                                bubbles: !0,
                                                cancelable: !1,
                                                inputType: "insertText",
                                                data: t
                                            });
                                            o.dispatchEvent(i);
                                            var a = 0
                                              , s = setInterval((function() {
                                                10 == ++a && (clearInterval(s),
                                                e(!1));
                                                var t = document.querySelectorAll("div[data-animate-modal-body='true'] div[role='listitem'] div[role='checkbox']")[0];
                                                t && (clearInterval(s),
                                                t.click(),
                                                setTimeout((function() {
                                                    e(!0)
                                                }
                                                ), 500))
                                            }
                                            ), 500)
                                        }
                                    }
                                    ), 500)
                                }
                                ), Ne(3, 5))
                            }
                            )));
                        case 1:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }(), We = function(e) {
            return new Promise(function() {
                var n = t(c().mark((function n(o) {
                    return c().wrap((function(n) {
                        for (; ; )
                            switch (n.prev = n.next) {
                            case 0:
                                if (Je()) {
                                    n.next = 3;
                                    break
                                }
                                return o(),
                                n.abrupt("return");
                            case 3:
                                Fe().then(t(c().mark((function n() {
                                    return c().wrap((function(n) {
                                        for (; ; )
                                            switch (n.prev = n.next) {
                                            case 0:
                                                setTimeout(t(c().mark((function n() {
                                                    var r, i;
                                                    return c().wrap((function(n) {
                                                        for (; ; )
                                                            switch (n.prev = n.next) {
                                                            case 0:
                                                                r = 0,
                                                                i = setInterval(t(c().mark((function t() {
                                                                    var n, a, s;
                                                                    return c().wrap((function(t) {
                                                                        for (; ; )
                                                                            switch (t.prev = t.next) {
                                                                            case 0:
                                                                                if (!((n = document.querySelectorAll("span[data-icon='forward-chat']")).length > 0)) {
                                                                                    t.next = 11;
                                                                                    break
                                                                                }
                                                                                return clearInterval(i),
                                                                                n[n.length - 1].click(),
                                                                                t.next = 7,
                                                                                Ue(e);
                                                                            case 7:
                                                                                t.sent ? (a = 0,
                                                                                s = setInterval((function() {
                                                                                    try {
                                                                                        ++a;
                                                                                        var e = document.querySelector(pe);
                                                                                        e && (clearInterval(s),
                                                                                        e.click(),
                                                                                        setTimeout((function() {
                                                                                            o()
                                                                                        }
                                                                                        ), 500)),
                                                                                        40 === a && (clearInterval(s),
                                                                                        o())
                                                                                    } catch (e) {
                                                                                        clearInterval(s),
                                                                                        o()
                                                                                    }
                                                                                }
                                                                                ), 500)) : (clearInterval(i),
                                                                                o()),
                                                                                t.next = 12;
                                                                                break;
                                                                            case 11:
                                                                                5 == ++r && clearInterval(i);
                                                                            case 12:
                                                                            case "end":
                                                                                return t.stop()
                                                                            }
                                                                    }
                                                                    ), t)
                                                                }
                                                                ))), 500);
                                                            case 2:
                                                            case "end":
                                                                return n.stop()
                                                            }
                                                    }
                                                    ), n)
                                                }
                                                ))), Ne(3, 5));
                                            case 1:
                                            case "end":
                                                return n.stop()
                                            }
                                    }
                                    ), n)
                                }
                                ))));
                            case 4:
                            case "end":
                                return n.stop()
                            }
                    }
                    ), n)
                }
                )));
                return function(e) {
                    return n.apply(this, arguments)
                }
            }())
        }, Je = function() {
            if ("block" === document.getElementById("bulk-message-section").style.display) {
                if ("block" === document.getElementById("numbers-field-section").style.display)
                    return document.getElementById("send-attachment-switch-for-bulk").checked;
                if ("block" === document.getElementById("upload-csv-section").style.display)
                    return document.getElementById("send-attachment-switch-for-csv").checked
            }
            return !1
        }, Ve = function(e) {
            return (e = e.replace(/[^\d]/g, "")).startsWith("55") && [12, 13].includes(e.length) && (e = e.substring(e.length - 8)),
            e
        }, Ye = function() {
            var e = t(c().mark((function e(t, n) {
                var o;
                return c().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            if (!((null == n ? void 0 : n.length) > 0)) {
                                e.next = 9;
                                break
                            }
                            if (nt(0, n.length),
                            document.getElementById("sending-usage").innerHTML = "0 of ".concat(n.length, " sent. ").concat(rt),
                            o = 0,
                            !Je()) {
                                e.next = 7;
                                break
                            }
                            return e.next = 7,
                            et();
                        case 7:
                            document.dispatchEvent(new CustomEvent("play-audio")),
                            Ge(t, o, n, Ge);
                        case 9:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t, n) {
                return e.apply(this, arguments)
            }
        }(), Ge = function() {
            var e = t(c().mark((function e(n, o, r, i) {
                var a, s, l, d, u, p, m;
                return c().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            if (a = function() {
                                return i(n, o + 1, r, i)
                            }
                            ,
                            s = r[o],
                            l = s.delay,
                            d = s.message,
                            u = s.phone,
                            p = o === r.length - 1,
                            d && u || a(),
                            !V()) {
                                e.next = 13;
                                break
                            }
                            it(),
                            document.getElementById("reached-limit-modal-container").style.display = "flex",
                            setTimeout((function() {
                                Ze(n)
                            }
                            ), 1e3),
                            document.dispatchEvent(new CustomEvent("start-countdown")),
                            JSON.parse(R())["license-type"].toString().includes("free") && (h = {
                                "license-key": W()
                            },
                            void 0,
                            f = "".concat(" ", "/email-notification-free-signed-up-exceeeded"),
                            fetch(f, {
                                method: "POST",
                                body: JSON.stringify(h),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })),
                            e.next = 37;
                            break;
                        case 13:
                            return Ke(u, d),
                            e.next = 16,
                            Xe();
                        case 16:
                            if (e.sent) {
                                e.next = 32;
                                break
                            }
                            if (!tt()) {
                                e.next = 27;
                                break
                            }
                            return e.next = 21,
                            re(u, "In blocked list", (new Date).toUTCString());
                        case 21:
                            if (!p) {
                                e.next = 24;
                                break
                            }
                            return setTimeout((function() {
                                Ze(n)
                            }
                            ), 750),
                            e.abrupt("return");
                        case 24:
                            setTimeout((function() {
                                a()
                            }
                            ), l),
                            e.next = 30;
                            break;
                        case 27:
                            m = setInterval(t(c().mark((function e() {
                                return c().wrap((function(e) {
                                    for (; ; )
                                        switch (e.prev = e.next) {
                                        case 0:
                                            if (e.prev = 0,
                                            !document.querySelector(pe)) {
                                                e.next = 15;
                                                break
                                            }
                                            return clearInterval(m),
                                            Qe(),
                                            e.next = 7,
                                            re(u, "Sent", (new Date).toUTCString());
                                        case 7:
                                            return e.next = 9,
                                            We(u);
                                        case 9:
                                            if (Y(),
                                            ot(),
                                            !p) {
                                                e.next = 14;
                                                break
                                            }
                                            return setTimeout((function() {
                                                Ze(n)
                                            }
                                            ), 750),
                                            e.abrupt("return");
                                        case 14:
                                            setTimeout((function() {
                                                a()
                                            }
                                            ), l);
                                        case 15:
                                            e.next = 22;
                                            break;
                                        case 18:
                                            e.prev = 18,
                                            e.t0 = e.catch(0),
                                            clearInterval(m),
                                            re(u, De, (new Date).toUTCString());
                                        case 22:
                                        case "end":
                                            return e.stop()
                                        }
                                }
                                ), e, null, [[0, 18]])
                            }
                            ))), 250);
                        case 30:
                            e.next = 37;
                            break;
                        case 32:
                            if (re(u, De, (new Date).toUTCString()),
                            !p) {
                                e.next = 36;
                                break
                            }
                            return setTimeout((function() {
                                Ze(n)
                            }
                            ), 750),
                            e.abrupt("return");
                        case 36:
                            setTimeout((function() {
                                a()
                            }
                            ), l);
                        case 37:
                        case "end":
                            return e.stop()
                        }
                    var h, f
                }
                ), e)
            }
            )));
            return function(t, n, o, r) {
                return e.apply(this, arguments)
            }
        }(), Ke = function(e, t) {
            var n = "_" + Math.random().toString(36).substr(2, 9)
              , o = $e(e, t)
              , r = document.getElementById(n);
            if (r)
                r.href = o;
            else {
                var i = document.createElement("a");
                i.id = n,
                i.href = o,
                i.style.visibility = "hidden",
                document.body.appendChild(i)
            }
            document.getElementById(n).click(),
            setTimeout((function() {
                document.getElementById(n).remove()
            }
            ), 100)
        }, $e = function(e, t) {
            var n = new URLSearchParams;
            return n.append("phone", e),
            n.append("text", t),
            "".concat(Me, "?").concat(n)
        }, Qe = function() {
            document.querySelector(me).click()
        }, Ze = function(e) {
            switch (e) {
            case Be:
            case Se:
                var t = document.getElementById(e === Se ? Ee : ue);
                t.innerHTML = He({
                    iconName: "logo_small.svg",
                    iconSize: "15px"
                }) + "Send WhatsApp",
                t.classList.remove("sending")
            }
            document.getElementById("whatsapp-rocket-overlay").style.display = "none",
            qe(!1),
            document.dispatchEvent(new CustomEvent("stop-audio"))
        }, Xe = function() {
            return new Promise((function(e) {
                var t = 0;
                setTimeout((function() {
                    var n = setInterval((function() {
                        try {
                            if (!document.querySelector(".app-wrapper-web div[data-animate-modal-popup='true'] div[data-animate-modal-body='true'] svg")) {
                                var o = document.querySelector(".app-wrapper-web div[data-animate-modal-popup='true'] div[data-animate-modal-body='true']  button.oixtjehm.hjo1mxmu.snayiamo.szmswy5k, .app-wrapper-web div[data-animate-modal-popup='true'] div[data-animate-modal-body='true']  button.x889kno.x1a8lsjc.xbbxn1n.xxbr6pl.x1n2onr6");
                                o ? (clearInterval(n),
                                setTimeout((function() {
                                    o.click(),
                                    e(!0)
                                }
                                ), 250)) : 10 == ++t && (clearInterval(n),
                                e(!1))
                            }
                        } catch (t) {
                            clearInterval(n),
                            e(!1)
                        }
                    }
                    ), 250)
                }
                ), 500)
            }
            ))
        }, et = function() {
            return new Promise(function() {
                var e = t(c().mark((function e(t) {
                    return c().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.prev = 0,
                                e.next = 3,
                                Fe();
                            case 3:
                                null !== document.querySelector('[data-icon="x"]') ? (Qe(),
                                setTimeout((function() {
                                    return t(!0)
                                }
                                ), 500)) : setTimeout((function() {
                                    return t(!1)
                                }
                                ), 500),
                                e.next = 9;
                                break;
                            case 6:
                                e.prev = 6,
                                e.t0 = e.catch(0),
                                setTimeout((function() {
                                    return t(!1)
                                }
                                ), 500);
                            case 9:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e, null, [[0, 6]])
                }
                )));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }())
        }, tt = function() {
            return null !== document.querySelector('footer > div[data-testid="block-message"], footer > div._amm8, footer._amm5')
        }, nt = function(e, t) {
            sessionStorage.setItem("sending-usage", JSON.stringify({
                counter: e,
                total: t
            }))
        }, ot = function() {
            var e = JSON.parse(sessionStorage.getItem("sending-usage"));
            e.counter += 1,
            nt(e.counter, e.total),
            document.getElementById("sending-usage").innerHTML = "".concat(e.counter, " of ").concat(e.total, " sent. ").concat(rt),
            G()
        }, rt = '<span>&nbsp;<img src="'.concat(chrome.runtime.getURL("images/rocket-send.gif"), '"\n                      style="width: 24px;\n                      height: 24px;\n                      position: relative;\n                      top: 1px;">\n                      </img></span>'), it = function() {
            var e = U().toLowerCase() === M ? O.NON_REGISTERED : O.REGISTERED;
            document.getElementById("reached-limit-modal-title").innerHTML = e.title,
            document.getElementById("reached-limit-modal-content").innerHTML = e.content,
            document.getElementById("reached-limit-modal-link-button").innerHTML = e.buttonText,
            document.getElementById("reached-limit-modal-link-button").href = e.link
        }, at = function(e, t) {
            switch (e) {
            case Be:
                var n = lt(t.message, t.recipients, t.interval);
                st(e, n);
                break;
            case Se:
                st(e, t)
            }
        }, st = function(e, t) {
            var n = document.getElementById(e === Se ? Ee : ue);
            n.disabled = !0,
            setTimeout((function() {
                n.disabled = !1,
                n.innerHTML = He({
                    iconName: "stop_icon.svg",
                    iconSize: "15px"
                }) + "Abort sending",
                n.classList.contains("sending") || n.classList.add("sending")
            }
            ), 500),
            qe(!0),
            document.getElementById("whatsapp-rocket-overlay").style.display = "flex",
            Ye(e, t)
        }, ct = function(e, t, n, o, r, i) {
            var a = Q(n)
              , s = []
              , c = ut(e);
            return o && a.shift(),
            a.forEach((function(n) {
                if (n[t]) {
                    var o = n[t].replace(/\D/g, "");
                    o = (+o).toString(),
                    s.push({
                        phone: o,
                        message: dt(e, n, c),
                        delay: Ne(r, i)
                    })
                }
            }
            )),
            s
        }, lt = function(e, t, n) {
            var o = [];
            return t.forEach((function(t) {
                o.push({
                    phone: t,
                    message: e,
                    delay: Ne(n.min, n.max)
                })
            }
            )),
            o
        }, dt = function(e, t, n) {
            return (null == n ? void 0 : n.length) > 0 && n.forEach((function(n) {
                var o = n.match(/[\d]+/g);
                if (o) {
                    var r = t[o - 1];
                    e = e.replaceAll(n, null != r ? r : "")
                }
            }
            )),
            e
        }, ut = function(e) {
            return e.match(/{{column_[\d]*}}/gi)
        }, pt = n(460), mt = function(e) {
            var t;
            null === (t = document.querySelector("#csv-file-number-container > div")) || void 0 === t || t.remove();
            var n = document.createElement("div");
            e.forEach((function(e) {
                if (e) {
                    var t = document.createElement("span");
                    t.innerHTML = e,
                    n.appendChild(t)
                }
            }
            )),
            document.querySelector("#csv-file-number-container").appendChild(n)
        }, ht = '\n\n<div id="whatsapp-rocket-modal-section">\n\n    <button type="button"\n            id="modal-close-button-top-right"\n            class="close"\n            data-dismiss="modal"\n            aria-label="Close">\n        <span aria-hidden="true">×</span>\n    </button>\n\n    <div class="modal-title">ADeskSender - ADesk.ai</div>\n\n    <div id="message-type-selection-tab">\n        <button id="bulk-message-send-section-button"\n                class="btn-primary tab-selection-button">\n            '.concat(He({
            iconName: "logo_small.svg",
            iconSize: "15px"
        }), '\n            Sender\n        </button>\n        <button id="settings-section-button"\n                class="btn-primary tab-selection-button btn-icon">\n            <span class="modal-svg">\n                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>\n            </span>\n            Settings\n        </button>\n\n    </div>\n\n    <div id="settings-section" style="display:none">\n\n        <form class="whatsapp-rocket-form">\n        <div class="whatsapp-rocket-form-group">\n        <label>License type: <span id="license-type"></span></label>\n        </div>\n\n            <div class="whatsapp-rocket-form-group">\n                <label for="license"\n                    >Activate License: \n                    <span\n                    aria-describedby="tooltipText"\n                    tabindex="0"\n                    data-tooltip="Enter the license key in the text field below and click activate."\n                    ><svg\n                        style="color: #0f756a"\n                        xmlns="http://www.w3.org/2000/svg"\n                        width="14"\n                        height="14"\n                        fill="currentColor"\n                        class="bi bi-question-circle-fill"\n                        viewBox="0 0 16 16"\n                    >\n                        <path\n                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"\n                        ></path></svg></span\n                ></label>\n                <div class="input-group">\n                    <input type="text" id="license" />\n                    <button type="button" class="btn-primary btn-send-whatsapp" id="activate-license-button">Activate</button>\n                </div>\n                <p id="activation-message" style="font-size: 14px; font-weight: bolder;"></p>\n                <small style="font-size: 12px;">Enter the license key in the text field above and click activate.<br/>You can get the license key from the <strong><a style="color:#0f756a" href=\'#\' target=\'_blank\'>dashboard</a>.</strong></small>\n            </div>\n        </form>\n\n        <div class="settings-section-buttons-wrapper">\n            <button id="download-logs-button" type="button" class="btn-primary tab-selection-button">\n                Download Report <span aria-describedby="tooltipText" tabindex="0" data-tooltip="This will download all the usage logs we have stored as CSV."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span>\n            </button>\n            <button id="delete-logs-button" type="button" class="btn-primary tab-selection-button">\n                Delete Report <span aria-describedby="tooltipText" tabindex="0" data-tooltip="This will delete all usage logs we have stored locally on the browser."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span>\n            </button>\n        </div>\n        <small id="delete-logs-message"></small>\n    </div>\n\n    <div id="bulk-message-section">\n\n        <div id="message-type-selection-tab">\n            <button id="text-field-section-button"\n                    class="btn-primary tab-selection-button btn-icon">\n                <span class="modal-svg">\n                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>\n                </span>\n                Number List\n            </button>\n            <button id="upload-field-section-button"\n                    class="btn-primary tab-selection-button btn-icon">\n                <span class="modal-svg">\n                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z"/></g></svg>\n                </span>\n                Upload CSV\n            </button>\n        </div>\n\n        <div id="numbers-field-section">\n            <form class="whatsapp-rocket-form">\n                <div class="whatsapp-rocket-form-group">\n                    <label for="multi-message-phone-number-list"\n                           id="multi-message-phone-number-list-label">Phone numbers(separate with comma or newline): <span aria-describedby="tooltipText" tabindex="0" data-tooltip="Add the phone numbers below. You can separate the numbers with a comma or new line. Please add the country code to the phone numbers."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span></label>\n                    <textarea id="multi-message-phone-number-list"\n                              type="text"\n                              class="form-control"\n                              value="+"\n                              placeholder="Enter phone numbers. Separate using comma or newline."></textarea>\n                    <small id="phoneNumberFieldBulk" style="font-size: 12px">\n                        Enter phone numbers in 17133003000 or +17133003000 format. Country code in front.\n                        Separate phone numbers using comma or newline.\n                    </small>\n                </div>\n                <div class="whatsapp-rocket-form-group">\n                    <label for="whatsapp-multi-message-text-content">Message <span aria-describedby="tooltipText" tabindex="0" data-tooltip="Type the message into the field below."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span></label>\n                    <textarea class="form-control"\n                              placeholder="Enter message."\n                              id="whatsapp-multi-message-text-content"\n                              row="5"></textarea>\n                    <p id="ai-rewrite-number-list" style="cursor: pointer; font-size: 14px; font-weight: bolder; color: #0f756a;">Rewrite message with AI</p>\n                </div>\n\n                <div class="whatsapp-rocket-form-group">\n                    <div class="form-check form-switch">\n                        <input class="form-check-input send-attachment-switch" data-message="send-attachment-message-for-bulk" data-for="send-attachment-buttons-for-bulk" type="checkbox" id="send-attachment-switch-for-bulk">\n                        <label class="form-check-label" for="send-attachment-switch-for-bulk">Send attachment <span aria-describedby="tooltipText" tabindex="0" data-tooltip="If this switch is on, then the extension will provide you an option to attach a document or image to a message. Even if you did not explicitly select a document or image now, the attachment will send the last send document or image to the recepient."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span></label>\n                    </div>\n                </div>\n                <small id="send-attachment-message-for-bulk" style="display:none; font-size: 12px; margin-bottom: 18px;">\n                When the \'Send Attachment\' feature is enabled, the most recent attachment you send to yourself will be forwarded to all contacts in the provided phone number list.\n                <br><br>\n                Select one of the buttons below to send an attachment to yourself. While attaching, you can also add a message to the attachment.\n                </small>\n                <div id="send-attachment-buttons-for-bulk" class="whatsapp-rocket-form-group" style="display:none;">\n                    <button id="attach-image-button-for-bulk" type="button" class="btn-primary tab-selection-button attachment-buttons">\n                        Attach Image/Video <span aria-describedby="tooltipText" tabindex="0" data-tooltip="When you click this button, you will get an option to upload an image or video. You can upload the image or video and then send it to yourself first."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span>\n                    </button>\n                    <button id="attach-document-button-for-bulk" type="button" class="btn-primary tab-selection-button attachment-buttons">\n                        Attach Document <span aria-describedby="tooltipText" tabindex="0" data-tooltip="When you click this button, you will get an option to upload a document. You can upload the document and then send it to yourself."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span>\n                    </button>\n                </div>\n\n                <div style="margin-bottom: 10px">\n                    <div style="display: inline">Add a random time delay of</div>\n                    <div style="display: inline">\n                        <input id="bulk-message-interval-from" type="number" value="3" />\n                    </div>\n                    <div style="display: inline">\n                        and\n                        <div style="display: inline">\n                            <input id="bulk-message-interval-to" type="number" value="6" />\n                        </div>\n                        <div style="display: flex; gap: 5px; align-items: center;">seconds between messages. <span aria-describedby="tooltipText" tabindex="0" data-tooltip="You can select the delay here. We will be adding a random delay between the values you select here. The longer the delay, the better."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span> </div>\n                    </div>\n                </div>\n\n                <div id="message-display-location-for-bulk" class="message-display"></div>\n                <div style="display: flex; gap: 5px;">\n                    <button id="send-bulk-whatsapp-message-button"\n                            type="submit"\n                            class="btn-primary btn-send-whatsapp">\n                            \n                            ').concat(He({
            iconName: "logo_small.svg",
            iconSize: "15px"
        }), '   \n                             Send WhatsApp\n                                                           \n                    </button>\n                    <button type="button"\n                            class="btn-primary btn-live-chat-whatsapp">\n                       \n                        Help <span aria-describedby="tooltipText" tabindex="0" data-tooltip="Click this button if you have any questions. This will connect you directly on this WhatsApp account with our customer service."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span>\n                    </button>\n                </div>\n                <small style="font-size: 12px;">Please use responsibly. Avoid spamming. <strong><a style="color:#0f756a" href=\'#\' target=\'_blank\'>More details here</a>.</strong></small>\n            </form>\n        </div>\n        \n        <div id="upload-csv-section">\n            <form class="whatsapp-rocket-form">\n                <div class="whatsapp-rocket-form-group">\n                    <label for="upload-csv">Upload CSV: <span aria-describedby="tooltipText" tabindex="0" data-tooltip="You can upload a CSV file here. Phone number and other variables can be in any of the columns. You can select the column once you upload. If you have an excel file, you can save it as CSV before uploading here."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span></label>\n                    <input type="file" id="upload-csv" accept=".csv" required />\n                    <small id="upload-error-message" style="font-size: 12px"></small>\n                    <small style="font-size: 12px; color: rgb(33, 37, 41);">How to send with CSV? <strong><a href="#" target="_blank" style="color: #0f756a;">Click here</a></strong>.</small>\n\n                </div>\n\n                <div class="whatsapp-rocket-form-group">\n                    <div id="SelectContainer" style="display: none">\n                        <label for="csv-file-select">Select column with phone numbers: <span aria-describedby="tooltipText" tabindex="0" data-tooltip="Select the dropdown below to select the column in the uploaded CSV from which we select the phone number."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span></label>\n                        <select id="selectFields" class="select"></select>\n                    </div>\n                </div>\n                <div class="show-after-upload" id="chkEnableHeader">\n                    <label class="labelForchkbox">\n                        Use first row for headers:  <span aria-describedby="tooltipText" tabindex="0" data-tooltip="Click this checkbox if the first row in CSV you uploaded is a header. This way we know to ignore this row when we send messages."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span>\n                        <input type="checkbox" checked="true" class="chkbox-size" id="excludeHeader" />\n                    </label>\n                </div>\n                <div class="whatsapp-rocket-form-group csv-tab-phone-section show-after-upload">\n                    <label for="multi-message-phone-number-list"\n                           id="multi-message-phone-number-list-label">Phone numbers: <span aria-describedby="tooltipText" tabindex="0" data-tooltip="This section shows the phone numbers from the CSV document to which we will be sending the messages. Please note that if you have selected the correct column above, then this should show only phone numbers. If heading is showing, then click \'Use first row for header\' checkbox above."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span></label>\n                    <textarea id="csv-file-multi-message-phone-number-list"\n                              type="text"\n                              class="form-control"\n                              value="+"\n                              placeholder="Enter phone numbers."></textarea>\n\n                    <div id="csv-file-number-container"></div>\n\n                    <small id="csv-file-phoneNumberFieldBulk" style="font-size: 12px">Selected phone number from uploaded CSV is shown above. Please review it for errors. <br />Phone numbers should be in 17133003000 or +17133003000 format. Country code in front.</small>\n                </div>\n                <div class="whatsapp-rocket-form-group">\n                    <label for="whatsapp-multi-message-text-content">Message <span aria-describedby="tooltipText" tabindex="0" data-tooltip="Type the message into the field below. You can use the dropdown below to insert any values from the columns in the CSV to the message."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span></label>\n\n                    <div id="csv-file-msg-select-section" class="show-after-upload">\n                        <select id="csv-file-msg-select-column" class="select"></select>\n                    </div>\n\n                    <textarea class="form-control"\n                              placeholder="Enter message."\n                              id="whatsapp-csv-file-multi-message-text-content"\n                              row="5"></textarea>\n                    <p id="ai-rewrite-csv" style="cursor: pointer; font-size: 14px; font-weight: bolder; color: #0f756a;">Rewrite message with AI</p>\n                </div>\n\n                <div class="whatsapp-rocket-form-group">\n                    <div class="form-check form-switch">\n                        <input class="form-check-input send-attachment-switch" data-message="send-attachment-message-for-csv" data-for="send-attachment-buttons-for-csv" type="checkbox" id="send-attachment-switch-for-csv">\n                        <label class="form-check-label" for="send-attachment-switch-for-csv">Send attachment <span aria-describedby="tooltipText" tabindex="0" data-tooltip="If this switch is on, then the extension will provide you an option to attach a document or image to a message. Even if you did not explicitly select a document or image now, the attachment will send the last send document or image to the recepient."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span></label>\n                    </div>\n                </div>\n                <small id="send-attachment-message-for-csv" style="display:none; font-size: 12px; margin-bottom: 18px;">\n                    When the \'Send Attachment\' feature is enabled, the most recent attachment you send to yourself will be forwarded to all contacts in the provided phone number list.\n                    <br><br>\n                    Select one of the buttons below to send an attachment to yourself. While attaching, you can also add a message to the attachment.\n                </small>\n                <div id="send-attachment-buttons-for-csv" class="whatsapp-rocket-form-group" style="display:none;">\n                    <button id="attach-image-button-for-csv" type="button" class="btn-primary tab-selection-button attachment-buttons">\n                        Attach Image/Video <span aria-describedby="tooltipText" tabindex="0" data-tooltip="When you click this button, you will get an option to upload an image or video. You can upload the image or video and then send it to yourself first."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span>\n                    </button>\n                    <button id="attach-document-button-for-csv" type="button" class="btn-primary tab-selection-button attachment-buttons">\n                        Attach Document <span aria-describedby="tooltipText" tabindex="0" data-tooltip="When you click this button, you will get an option to upload a document. You can upload the document and then send it to yourself."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span>\n                    </button>\n                </div>\n\n                <div style="margin-bottom: 10px">\n                    <div style="display: inline">Add a random time delay of</div>\n                    <div style="display: inline">\n                        <input id="bulk-message-csv-file-interval-from" type="number" value="3" />\n                    </div>\n                    <div style="display: inline">\n                        and\n                        <div style="display: inline">\n                            <input id="bulk-message-csv-file-interval-to" type="number" value="6" />\n                        </div>\n                        <div style="display: flex; gap: 5px; align-items: center;">seconds between messages. <span aria-describedby="tooltipText" tabindex="0" data-tooltip="You can select the delay here. We will be adding a random delay between the values you select here. The longer the delay, the better."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span> </div>\n                    </div>\n                </div>\n\n                <div id="message-display-location-for-bulk-csv-file" class="message-display"></div>\n                <div style="display: flex; gap: 5px;">\n                    <button id="send-bulk-csv-file-whatsapp-message-button"\n                            type="submit"\n                            class="btn-primary btn-send-whatsapp">\n                            \n                            ').concat(He({
            iconName: "logo_small.svg",
            iconSize: "15px"
        }), '   \n                                \n                             Send WhatsApp    \n                          \n                    </button>\n                    <button type="button"\n                            class="btn-primary btn-live-chat-whatsapp">\n                      \n                        Help <span aria-describedby="tooltipText" tabindex="0" data-tooltip="Click this button if you have any questions. This will connect you directly on this WhatsApp account with our customer service."><svg style="color: #0f756a;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path></svg></span>\n                    </button>\n                </div>\n                <small style="font-size: 12px;">Please use responsibly. Avoid spamming. <strong><a style="color:#0f756a" href=\'#\' target=\'_blank\'>More details here</a>.</strong></small>\n            </form>\n        </div>\n    </div>\n</div>\n<a href="#" target="_blank" class="modal-footer">\n    <span id="rsi-usage-display"></span>\n</a>\n'), ft = function(e) {
            switch (e) {
            case Be:
                document.getElementById(le).classList.add("dark-button"),
                document.getElementById(fe).classList.add("dark-button"),
                document.getElementById(ge).classList.remove("dark-button"),
                document.getElementById("settings-section-button").classList.remove("dark-button"),
                document.getElementById(ce).style.display = "block",
                document.getElementById("numbers-field-section").style.display = "block",
                document.getElementById("upload-csv-section").style.display = "none",
                document.getElementById("settings-section").style.display = "none";
                break;
            case Se:
                document.getElementById(ge).classList.add("dark-button"),
                document.getElementById(fe).classList.remove("dark-button"),
                document.getElementById("settings-section-button").classList.remove("dark-button"),
                document.getElementById(ce).style.display = "block",
                document.getElementById("numbers-field-section").style.display = "none",
                document.getElementById("upload-csv-section").style.display = "block",
                document.getElementById("settings-section").style.display = "none";
                break;
            case _e:
                document.getElementById("settings-section-button").classList.add("dark-button"),
                document.getElementById(le).classList.remove("dark-button"),
                document.getElementById(ge).classList.remove("dark-button"),
                document.getElementById(fe).classList.remove("dark-button"),
                document.getElementById(ce).style.display = "none",
                document.getElementById("numbers-field-section").style.display = "none",
                document.getElementById("upload-csv-section").style.display = "none",
                document.getElementById("settings-section").style.display = "block",
                document.getElementById("license-type").innerHTML = U()
            }
        }, gt = function() {
            document.getElementById(be).addEventListener("change", (function(e) {
                var n = document.getElementById(be);
                if (0 == n.files.length)
                    return document.getElementById(we).style.display = "block",
                    document.getElementById(we).innerHTML = "Imported file type not identified. We can import CSV file",
                    void (document.getElementById(se).innerHTML = "");
                !function(e) {
                    var n = document.getElementById(ve).checked
                      , o = document.getElementById(ye);
                    document.getElementById(he).style.display = "none",
                    o.innerHTML = "";
                    var r = document.querySelector("#csv-file-msg-select-column");
                    r.innerHTML = "";
                    var i = document.createElement("option");
                    i.value = "",
                    i.innerHTML = "Insert Variable",
                    r.appendChild(i),
                    "csv" != e.name.split(".")[1] ? (document.getElementById(we).style.display = "block",
                    document.getElementById(we).innerHTML = "Only CSV file can be uploaded",
                    document.getElementById(Ie).innerHTML = "",
                    document.querySelectorAll(".show-after-upload").forEach((function(e) {
                        e.style.display = "none"
                    }
                    ))) : e.size > 5e5 ? (document.getElementById(we).style.display = "block",
                    document.getElementById(we).innerHTML = "File size cannot be more than 500 KB",
                    document.getElementById(Ie).innerHTML = "",
                    document.querySelectorAll(".show-after-upload").forEach((function(e) {
                        e.style.display = "none"
                    }
                    ))) : (pt.parse(e, {
                        download: !0,
                        skipEmptyLines: !0,
                        complete: function(e, i) {
                            if (n = document.getElementById(ve).checked) {
                                if (e.data.length > 1e3)
                                    return document.getElementById(we).style.display = "block",
                                    document.getElementById(we).innerHTML = "You can import a maximum of only 1000 numbers at a time",
                                    document.getElementById(Ie).innerHTML = "",
                                    void document.querySelectorAll(".show-after-upload").forEach((function(e) {
                                        e.style.display = "none"
                                    }
                                    ));
                                for (var a = 0; a <= e.data[0].length - 1; a++) {
                                    var s = document.createElement("option");
                                    s.value = a,
                                    s.innerHTML = "Column ".concat(Number(a + 1), " - ").concat(e.data[0][a]),
                                    o.appendChild(s);
                                    var l = document.createElement("option");
                                    l.value = "{{column_".concat(Number(a + 1), "}}"),
                                    l.innerHTML = "Column ".concat(Number(a + 1), " - ").concat(e.data[0][a]),
                                    r.appendChild(l)
                                }
                                document.getElementById(he).style.display = "block";
                                for (var d = document.getElementById(ye).value, u = [], p = 1; p <= e.data.length - 1; p++)
                                    "" != e.data[p][d] && u.push(e.data[p][d]);
                                document.getElementById(xe).value = "",
                                document.getElementById(xe).value = u.join(",").trim(),
                                mt(u)
                            } else {
                                if (e.data.length > 1e3)
                                    return document.getElementById(we).style.display = "block",
                                    document.getElementById(we).innerHTML = "You can import a maximum of only 1000 numbers at a time",
                                    void (document.getElementById(Ie).innerHTML = "");
                                for (var m = 0; m <= e.data[0].length - 1; m++) {
                                    var h = document.createElement("option");
                                    h.value = m,
                                    h.innerHTML = "Column ".concat(Number(m + 1), "-").concat(e.data[0][m]),
                                    o.appendChild(h);
                                    var f = document.createElement("option");
                                    f.value = "{{column_".concat(Number(m + 1), "}}"),
                                    f.innerHTML = "Column ".concat(Number(m + 1), "-").concat(e.data[0][m]),
                                    r.appendChild(f)
                                }
                                document.getElementById(he).style.display = "block";
                                for (var g = document.getElementById(ye).value, b = [], v = 0; v <= e.data.length - 1; v++)
                                    b.push(e.data[v][g]);
                                document.getElementById(xe).value = b.join(",").trim(),
                                mt(b)
                            }
                            document.getElementById(we).style.display = "none",
                            document.querySelectorAll(".show-after-upload").forEach((function(e) {
                                e.style.display = "block"
                            }
                            )),
                            document.getElementById(Ie).innerHTML = "",
                            document.getElementById(ye).addEventListener("change", (function(t) {
                                if (n = document.getElementById(ve).checked) {
                                    for (var o = document.getElementById(ye).value, r = [], i = 1; i <= e.data.length - 1; i++)
                                        "" != e.data[i][o] && r.push(e.data[i][o]);
                                    document.getElementById(xe).value = "",
                                    document.getElementById(xe).value = r.join(","),
                                    mt(r)
                                } else {
                                    for (var a = document.getElementById(ye).value, s = [], c = 0; c <= e.data.length - 1; c++)
                                        s.push(e.data[c][a]);
                                    document.getElementById(xe).value = s.join(","),
                                    mt(s)
                                }
                                document.getElementById(we).style.display = "none",
                                document.getElementById("upload-csv-section").style.display = "block"
                            }
                            )),
                            document.getElementById(ve).onclick = function() {
                                if (n = document.getElementById(ve).checked) {
                                    for (var t = document.getElementById(ye).value, o = [], r = 1; r <= e.data.length - 1; r++)
                                        "" != e.data[r][t] && o.push(e.data[r][t]);
                                    document.getElementById(xe).value = "",
                                    document.getElementById(xe).value = o.join(","),
                                    mt(o)
                                } else {
                                    for (var i = document.getElementById(ye).value, a = [], s = 0; s <= e.data.length - 1; s++)
                                        a.push(e.data[s][i]);
                                    document.getElementById(xe).value = "",
                                    document.getElementById(xe).value = a.join(","),
                                    mt(a)
                                }
                            }
                            ,
                            document.getElementById(Ee).onclick = function() {
                                var o = t(c().mark((function t(o) {
                                    var r, i, a, s, l, d, u, p, m;
                                    return c().wrap((function(t) {
                                        for (; ; )
                                            switch (t.prev = t.next) {
                                            case 0:
                                                if (o.preventDefault(),
                                                !document.getElementById(Ee).classList.contains("sending")) {
                                                    t.next = 4;
                                                    break
                                                }
                                                return window.location.href = "https://web.whatsapp.com?mode=r-popup",
                                                t.abrupt("return");
                                            case 4:
                                                if (i = (i = (i = (i = (i = document.getElementById(xe).value).split("\n").join(",").split(",")).filter((function(e) {
                                                    return "" !== e.trim()
                                                }
                                                ))).map((function(e) {
                                                    return e.replace(/\D/g, "")
                                                }
                                                ))).map((function(e) {
                                                    return (+e).toString()
                                                }
                                                )),
                                                a = document.getElementById(ke).value,
                                                s = document.getElementById("send-attachment-switch-for-csv"),
                                                l = document.getElementById(Ie),
                                                0 !== (null === (r = i) || void 0 === r ? void 0 : r.length)) {
                                                    t.next = 15;
                                                    break
                                                }
                                                return l.innerHTML = "The phone number section cannot be empty. Check your CSV file",
                                                t.abrupt("return");
                                            case 15:
                                                if (Re(i)) {
                                                    t.next = 18;
                                                    break
                                                }
                                                return l.innerHTML = "\n          An error has occurred in the phone number section. This could be due to one or more of the following reasons:\n          <br><br>- One or more phone numbers in the CSV file may have errors. Verify each row, ensuring the phone numbers are properly formatted. They should begin with a country code and not contain any alphabets.\n          <br><br>- The correct phone number column may not have been selected from the dropdown above.\n          <br><br>- Your CSV might have a heading row, and the option to ignore the first row may not have been selected above.\n          <br><br>- Your CSV file is not exported correctly. In that case open the CSV file in Notepad and check the format.\n          <br><br>Please make the required adjustments and try again.\n        ",
                                                t.abrupt("return");
                                            case 18:
                                                if ("" !== a.trim()) {
                                                    t.next = 21;
                                                    break
                                                }
                                                return s.checked ? l.innerHTML = "The message section cannot be empty. You can only send an attachment with a message." : l.innerHTML = "The message section cannot be empty.",
                                                t.abrupt("return");
                                            case 21:
                                                document.getElementById(Ie).innerHTML = "",
                                                d = document.getElementById("bulk-message-csv-file-interval-from").value,
                                                u = document.getElementById("bulk-message-csv-file-interval-to").value,
                                                (p = je(d, u)).isValid ? (m = ct(document.getElementById(ke).value, document.getElementById(ye).value, e.data, n, parseInt(d), parseInt(u)),
                                                at(Se, m)) : document.getElementById(Ie).innerHTML = p.message;
                                            case 26:
                                            case "end":
                                                return t.stop()
                                            }
                                    }
                                    ), t)
                                }
                                )));
                                return function(e) {
                                    return o.apply(this, arguments)
                                }
                            }()
                        }
                    }),
                    document.getElementById("csv-file-msg-select-column").onchange = function(e) {
                        var t, n, o, r, i, a = document.querySelector("#whatsapp-csv-file-multi-message-text-content"), s = document.querySelector("#csv-file-msg-select-column");
                        t = a,
                        n = s.value,
                        o = t.value,
                        r = t.selectionStart,
                        i = t.selectionEnd,
                        t.value = o.slice(0, r) + n + o.slice(i),
                        t.selectionStart = t.selectionEnd = r + n.length,
                        s.value = ""
                    }
                    )
                }(n.files[0])
            }
            )),
            document.getElementById("modal-close-button-top-right").addEventListener("click", (function(e) {
                Oe().style.display = "none"
            }
            )),
            document.getElementById(ue).addEventListener("click", function() {
                var e = t(c().mark((function e(t) {
                    var n, o, r, i, a, s, l, d;
                    return c().wrap((function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (t.preventDefault(),
                                !document.getElementById(ue).classList.contains("sending")) {
                                    e.next = 4;
                                    break
                                }
                                return window.location.href = "https://web.whatsapp.com?mode=r-popup",
                                e.abrupt("return");
                            case 4:
                                if (n = (n = (n = document.getElementById("multi-message-phone-number-list").value).split("\n").join(",").split(",")).filter((function(e) {
                                    return "" !== e.trim()
                                }
                                )),
                                o = document.getElementById("whatsapp-multi-message-text-content").value,
                                n = (n = n.map((function(e) {
                                    return e.replace(/\D/g, "")
                                }
                                ))).map((function(e) {
                                    return (+e).toString()
                                }
                                )),
                                r = "block" === document.getElementById("numbers-field-section").style.display ? "send-attachment-switch-for-bulk" : "send-attachment-switch-for-csv",
                                i = document.getElementById(r),
                                a = document.getElementById(se),
                                0 !== n.length) {
                                    e.next = 16;
                                    break
                                }
                                return a.innerHTML = "The phone number section cannot be empty.",
                                e.abrupt("return");
                            case 16:
                                if (Re(n)) {
                                    e.next = 19;
                                    break
                                }
                                return a.innerHTML = "\n        The phone number section has an error. Please review the individual phone numbers. <br><br>\n        Phone number should be separated by comma or new line. Each phone number should start with a country code and should not have any alphabets in between.\n        ",
                                e.abrupt("return");
                            case 19:
                                if ("" !== o.trim()) {
                                    e.next = 22;
                                    break
                                }
                                return i.checked ? a.innerHTML = "The message section cannot be empty. You can only send an attachment with a message." : a.innerHTML = "The message section cannot be empty.",
                                e.abrupt("return");
                            case 22:
                                document.getElementById(se).innerHTML = "",
                                s = document.getElementById("bulk-message-interval-from").value,
                                l = document.getElementById("bulk-message-interval-to").value,
                                (d = je(s, l)).isValid ? at(Be, {
                                    recipients: n,
                                    message: o,
                                    interval: {
                                        min: parseInt(s),
                                        max: parseInt(l)
                                    }
                                }) : document.getElementById(se).innerHTML = d.message;
                            case 27:
                            case "end":
                                return e.stop()
                            }
                    }
                    ), e)
                }
                )));
                return function(t) {
                    return e.apply(this, arguments)
                }
            }()),
            document.getElementById(le).addEventListener("click", (function(e) {
                ft(Be)
            }
            )),
            document.getElementById("settings-section-button").addEventListener("click", (function(e) {
                ft(_e),
                document.getElementById("license").value = W(),
                document.getElementById("license-type").innerHTML = U()
            }
            )),
            document.getElementById(fe).addEventListener("click", (function(e) {
                ft(Be)
            }
            )),
            document.getElementById(ge).addEventListener("click", (function(e) {
                ft(Se)
            }
            )),
            document.getElementById(le).click(),
            Array.from(document.getElementsByClassName("btn-live-chat-whatsapp")).forEach((function(e) {
                e.addEventListener("click", bt)
            }
            )),
            document.getElementById("download-logs-button").addEventListener("click", (function() {
                yt()
            }
            )),
            document.getElementById("delete-logs-button").addEventListener("click", (function() {
                var e;
                (e = ne,
                new Promise((function(t) {
                    chrome.storage.local.remove([e], (function() {
                        t("Removed")
                    }
                    ))
                }
                ))).then((function(e) {
                    document.getElementById("delete-logs-message").textContent = "The usage log is now deleted.",
                    setTimeout((function() {
                        return document.getElementById("delete-logs-message").textContent = ""
                    }
                    ), 5e3)
                }
                ))
            }
            )),
            document.getElementById("activate-license-button").addEventListener("click", (function() {
                document.getElementById("activation-message").innerHTML = "";
                var e = document.getElementById("license").value;
                if (0 === (e = e.replace(/\s/g, "")).length)
                    return document.getElementById("activation-message").innerHTML = "License key cannot be empty.",
                    void (document.getElementById("activation-message").style.color = "#ff6666");
                wt(e)
            }
            )),
            document.getElementById("license").value = W(),
            document.getElementById("whatsapp-multi-message-text-content").onblur = function() {
                kt("ai-rewrite-number-list", "Rewrite message with AI", 50)
            }
            ,
            document.getElementById("whatsapp-csv-file-multi-message-text-content").onblur = function() {
                kt("ai-rewrite-csv", "Rewrite message with AI", 50)
            }
            ,
            document.getElementById("ai-rewrite-number-list").click = function() {
                Et(document.getElementById("whatsapp-multi-message-text-content").value)
            }
            ,
            document.getElementById("ai-rewrite-number-list").addEventListener("click", (function() {
                Et(document.getElementById("whatsapp-multi-message-text-content").value)
            }
            )),
            document.getElementById("ai-rewrite-csv").addEventListener("click", (function() {
                Et(document.getElementById("whatsapp-csv-file-multi-message-text-content").value)
            }
            ))
        }, bt = function() {
            window.open("#", "_blank")
        }, vt = function() {
            var e = document.createElement("div");
            e.id = de,
            e.innerHTML += ht,
            document.body.appendChild(e),
            gt(),
            Array.from(document.getElementsByClassName("send-attachment-switch")).forEach((function(e) {
                e.addEventListener("click", (function(t) {
                    document.getElementById(e.getAttribute("data-for")).style.display = t.target.checked ? "flex" : "none",
                    document.getElementById(e.getAttribute("data-message")).style.display = t.target.checked ? "flex" : "none",
                    document.getElementById("sent-attachment-note").style.display = t.target.checked ? "flex" : "none"
                }
                ))
            }
            )),
            document.addEventListener("click", (function(e) {
                e.target.id.indexOf("attach-document-button-for") > -1 && Fe(!0).then((function(e) {
                    Pe().then((function(e) {
                        var t = 0
                          , n = setInterval((function() {
                            10 == ++t && clearInterval(n);
                            var e = document.querySelector("span.erpdyial.tviruh8d.gfz4du6o.r7fjleex.lhj4utae.le5p0ye3, #main > footer > div.copyable-area ul > div > div:nth-child(1) > li");
                            e && (clearInterval(n),
                            e.click())
                        }
                        ), 500)
                    }
                    ))
                }
                )),
                e.target.id.indexOf("attach-image-button-for") > -1 && Fe(!0).then((function(e) {
                    Pe().then((function(e) {
                        var t = 0
                          , n = setInterval((function() {
                            10 == ++t && clearInterval(n);
                            var e = document.querySelectorAll("span.erpdyial.tviruh8d.gfz4du6o.r7fjleex.lhj4utae.le5p0ye3")[1];
                            e || (e = document.querySelector("#main > footer > div.copyable-area ul > div > div:nth-child(2) > li")),
                            e && (clearInterval(n),
                            e.click())
                        }
                        ), 500)
                    }
                    ))
                }
                ))
            }
            ));
            var t = document.createElement("div");
            t.id = "whatsapp-rocket-overlay";
            var n = document.createElement("div");
            n.id = "sending-usage";
            var o = document.createElement("div");
            o.id = "sent-attachment-note",
            o.innerHTML = "Stay on this tab window while sending attachment.<br><br>Sending will pause if you change tab.",
            o.style.display = "none",
            o.style.width = "350px",
            o.style.textAlign = "center",
            t.appendChild(o),
            t.appendChild(n),
            document.body.appendChild(t),
            xt()
        }, yt = function() {
            var e = t(c().mark((function e() {
                var t, n;
                return c().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2,
                            ie();
                        case 2:
                            t = e.sent,
                            n = t.map((function(e) {
                                return [e[0], e[1], new Date(e[2]).toLocaleString().replace(",", "")]
                            }
                            )),
                            $(["Phone", "Status", "Time"], n, "WhatsApp_RocketSend_Logs");
                        case 5:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }(), wt = function(e) {
            document.getElementById("activation-message").innerHTML = "",
            F(e).then((function(e) {
                document.getElementById("activation-message").innerHTML = e,
                document.getElementById("activation-message").style.color = "#0f756a"
            }
            )).catch((function(e) {
                document.getElementById("activation-message").innerHTML = e,
                document.getElementById("activation-message").style.color = "#ff6666"
            }
            )).finally((function() {
                document.getElementById("license-type").innerHTML = U(),
                G()
            }
            ))
        }, xt = function() {
            var e = document.createElement("div");
            e.id = "reached-limit-modal-container",
            e.classList.add("rsi-modal-container");
            var t = document.createElement("div");
            t.id = "reached-limit-modal",
            t.innerHTML += '\n<div id="reached-limit-modal-section" class="rsi-modal-section">\n  <button\n    type="button"\n    id="reached-limit-modal-close-button-top-right"\n    class="close rsi-close-button"\n    data-dismiss="modal"\n    aria-label="Close"\n  >\n    <span aria-hidden="true">×</span>\n  </button>\n\n  <div class="modal-title" style="margin-bottom: 38px;" id="reached-limit-modal-title"></div>\n  <div id="single-message-sections">\n    <div class="whatsapp-rocket-form-group" style="font-size: 18px;">\n        <p id="reached-limit-modal-content"></p>\n        <span id="counter-wrapper" style="color: #0f756a;"><br>Opening in <span id="reached-limit-modal-countdown">10</span> sec.</span>\n\n    </div>\n    <a id="reached-limit-modal-link-button" target="_blank" class="btn-primary btn-send-whatsapp dark-button-color"  style="font-size: 16px; margin-top: 15px;" ></a>\n  </div>\n</div>\n',
            e.appendChild(t),
            document.body.appendChild(e),
            document.getElementById("reached-limit-modal-close-button-top-right").addEventListener("click", (function(e) {
                document.getElementById("reached-limit-modal-container").style.display = "none"
            }
            )),
            window.addEventListener("click", (function(e) {
                var t = document.getElementById("reached-limit-modal-container");
                e.target == t && (t.style.display = "none")
            }
            ))
        }, kt = function(e, t, n) {
            var o = 0;
            document.getElementById(e).innerHTML = "",
            function r() {
                o < t.length && (document.getElementById(e).innerHTML += t.charAt(o),
                o++,
                setTimeout(r, n))
            }()
        }, Et = function(e) {
            var t = new URLSearchParams;
            t.append("whatsappMessage", e);
            var n = "#".concat(t);
            window.open(n, "_blank")
        }, It = function() {
            return document.querySelector("#main > footer")
        }, St = function() {
            return document.getElementById(Te)
        }, Bt = function() {
            return document.getElementById(Le).remove()
        }, _t = function() {
            return document.getElementById(Ce).innerHTML = ""
        }, Lt = function(e) {
            chrome.storage.local.get(["whatsapp-rocket-tags-key"], (function(t) {
                e(t)
            }
            ))
        }, Tt = function() {
            zt();
            var e = setInterval((function() {
                try {
                    It() && !document.getElementById(Le) && It() && ((t = document.createElement("div")).id = Le,
                    Lt((function(e) {
                        var n = e["whatsapp-rocket-tags-key"];
                        n && n.forEach((function(e, n) {
                            var o = document.createElement("label")
                              , r = e.length > 70 ? "".concat(e.substring(0, 70), "...") : e;
                            o.className = "quick-chat-msg",
                            o.innerHTML = '<span class="quick-chat-msg-text">'.concat(r, "</span>"),
                            o.onclick = function() {
                                document.querySelector("#main > footer div[contenteditable]").focus(),
                                document.execCommand("insertText", !1, e)
                            }
                            ;
                            var i = document.createElement("span");
                            i.className = "quick-chat-close",
                            i.innerText = "✖",
                            i.onclick = function(e) {
                                e.stopPropagation(),
                                Lt((function(e) {
                                    var t = e["whatsapp-rocket-tags-key"];
                                    t.splice(n, 1),
                                    chrome.storage.local.set({
                                        "whatsapp-rocket-tags-key": t
                                    }, (function() {
                                        Bt()
                                    }
                                    ))
                                }
                                ))
                            }
                            ,
                            o.appendChild(i),
                            t.appendChild(o)
                        }
                        ));
                        var o = document.createElement("span");
                        o.className = "add-message-tag",
                        o.style.fontSize = "14px",
                        o.innerText = "Add quick chat",
                        o.onclick = function() {
                            document.getElementById(Te).style.display = "flex"
                        }
                        ,
                        t.appendChild(o),
                        document.querySelector("#main > footer > div").style.display = "block",
                        document.querySelector("#main > footer > div").prepend(t)
                    }
                    )))
                } catch (t) {
                    clearInterval(e)
                }
                var t
            }
            ), 1e3)
        }, Ct = function() {
            var e = document.getElementById(ze).value;
            document.getElementById(ze).value = "",
            e.length > 799 ? document.getElementById(Ce).innerHTML = "You've reached maximum limit of characters!" : At((function(t) {
                t ? document.getElementById(Ce).innerHTML = "You've reached maximum number of frequent messages." : Mt(e, (function(t) {
                    var n, o;
                    t ? document.getElementById(Ce).innerHTML = "Message '".concat(e, "' already exist!") : (n = e,
                    o = [],
                    Lt((function(e) {
                        Array.isArray(e["whatsapp-rocket-tags-key"]) && (o = e["whatsapp-rocket-tags-key"]),
                        o.push(n),
                        chrome.storage.local.set({
                            "whatsapp-rocket-tags-key": o
                        }, (function() {
                            _t(),
                            Bt()
                        }
                        ))
                    }
                    )))
                }
                ))
            }
            ))
        }, zt = function() {
            var e = document.createElement("div");
            e.id = Te,
            e.classList.add("rsi-modal-container");
            var t = document.createElement("div");
            t.id = "tag-modal",
            t.innerHTML += '\n<div id="tag-modal-section" class="rsi-modal-section">\n  <button\n    type="button"\n    id="tag-modal-close-button-top-right"\n    class="close rsi-close-button"\n    data-dismiss="modal"\n    aria-label="Close"\n  >\n    <span aria-hidden="true">×</span>\n  </button>\n\n  <div class="modal-title">Add Message</div>\n  <div id="single-message-section">\n    <div class="whatsapp-rocket-form-group">\n      <input\n        id="new-tag-input"\n        type="text"\n        placeholder="Add Message"\n      />\n    </div>\n    <div id="tag-message-display-location" class="message-display"></div>\n    <button\n      id="save-tag"\n      type="submit"\n      class="btn-primary"\n    >\n       Save\n    </button>\n  </div>\n</div>\n',
            e.appendChild(t),
            document.body.appendChild(e),
            document.getElementById("tag-modal-close-button-top-right").addEventListener("click", (function(e) {
                St().style.display = "none",
                _t()
            }
            )),
            window.addEventListener("click", (function(e) {
                e.target == St() && (St().style.display = "none",
                _t())
            }
            )),
            document.getElementById(ze).addEventListener("keyup", (function(e) {
                "Enter" == e.key && (e.preventDefault(),
                Ct())
            }
            )),
            document.getElementById("save-tag").addEventListener("click", (function(e) {
                Ct()
            }
            ))
        }, Mt = function(e, t) {
            chrome.storage.local.get(["whatsapp-rocket-tags-key"], (function(n) {
                var o = !1;
                try {
                    o = !!n["whatsapp-rocket-tags-key"].find((function(t) {
                        return t === e
                    }
                    ))
                } catch (e) {}
                t(o)
            }
            ))
        }, At = function(e) {
            chrome.storage.local.get(["whatsapp-rocket-tags-key"], (function(t) {
                var n = !1;
                try {
                    n = t["whatsapp-rocket-tags-key"].length > 19
                } catch (e) {}
                e(n)
            }
            ))
        }, Ot = {
            create: function(e, t) {
                X = t.getBoundingClientRect(),
                te = X.top + X.height,
                ee = document.createTextNode(t.getAttribute("data-tooltip")),
                e.appendChild(ee),
                X.left > window.innerWidth - 100 ? e.className = "tooltip-container tooltip-left" : X.left + X.width / 2 < 100 ? e.className = "tooltip-container tooltip-right" : e.className = "tooltip-container tooltip-center"
            },
            position: function(e, t) {
                var n = window.innerWidth - 100
                  , o = X.left + X.width / 2 - e.offsetWidth / 2;
                X.left > n && X.width < 50 ? (e.style.left = X.left - (e.offsetWidth + X.width) + "px",
                e.style.top = t.offsetTop - 30 + "px") : X.left > n && X.width > 50 ? (e.style.left = X.left - e.offsetWidth - 20 + "px",
                e.style.top = t.offsetTop + "px") : X.left + X.width / 2 < 100 ? (e.className = "tooltip-container tooltip-right",
                e.style.left = X.left + X.width + 20 + "px",
                e.style.top = t.offsetTop + "px") : te + 10 + e.offsetHeight > window.innerHeight ? (e.className = "tooltip-container tooltip-center-bottom",
                e.style.left = o + "px",
                e.style.top = te - e.offsetHeight - 35 + window.scrollY + "px") : (e.style.left = o + "px",
                e.style.top = te + 10 + window.scrollY + "px")
            }
        };
        function qt(e) {
            var t = Object.create(Ot)
              , n = e.currentTarget;
            Z.setAttribute("aria-hidden", !1),
            t.create(Z, n),
            t.position(Z, n)
        }
        function jt() {
            Z.setAttribute("aria-hidden", !0),
            Z.className = "tooltip-container no-display",
            Z.textContent = "",
            Z.removeAttribute("style")
        }
        function Rt() {
            var e;
            (e = document.createElement("div")).className = "tooltip-container no-display",
            e.setAttribute("role", "alertdialog"),
            e.setAttribute("aria-hidden", "true"),
            e.id = "tooltipText",
            document.body.appendChild(e),
            Z = document.documentElement.querySelector(".tooltip-container");
            var t = document.documentElement.querySelectorAll("[data-tooltip]");
            Array.prototype.forEach.call(t, (function(e) {
                e.addEventListener("mouseover", qt),
                e.addEventListener("mouseout", jt)
            }
            ))
        }
        t(c().mark((function e() {
            var n, s, y, w, x, S, B;
            return c().wrap((function(e) {
                for (; ; )
                    switch (e.prev = e.next) {
                    case 0:
                        return n = function() {
                            var e = document.createElement("Button");
                            e.id = ae,
                            e.innerHTML = He({
                                iconName: "logo_small.svg",
                                iconSize: "15px"
                            }) + "Sender";
                            var t = document.createElement("div");
                            if (t.classList = "whatsapp-header-container",
                            t.appendChild(e),
                            document.querySelector('[data-js-navbar="true"]')) {
                                document.querySelector('#app header [data-js-navbar="true"] span > div > div').appendChild(t),
                                t.style.marginTop = "10px",
                                e.style.width = "40px",
                                e.style.padding = "3px",
                                e.style.fontSize = "10px";
                                var n = document.querySelector("div._aigs header > header > div")
                                  , o = document.createElement("Button");
                                o.id = "new-whatsapp-rocket-button",
                                o.innerHTML = He({
                                    iconName: "logo_small.svg",
                                    iconSize: "15px"
                                }) + "Sender";
                                var r = document.createElement("div");
                                r.classList = "whatsapp-header-container",
                                r.style.paddingRight = "16px",
                                r.appendChild(o),
                                n.insertBefore(r, n.children[1]),
                                o.addEventListener("click", (function() {
                                    document.getElementById(ae).click()
                                }
                                ))
                            } else
                                Ae().parentNode.insertBefore(t, Ae().nextSibling);
                            document.getElementById(ae).addEventListener("click", (function() {
                                Oe().style.display = "flex" === Oe().style.display ? "none" : "flex",
                                document.getElementById(le).click(),
                                "flex" === Oe().style.display && (J(),
                                G())
                            }
                            ))
                        }
                        ,
                        s = function() {
                            var e = document.createElement("div");
                            e.style.cssText = "padding: 8px; display: flex; align-items: center; ";
                            var t = document.createElement("Button");
                            t.id = "whatsapp-message-box-rocket-button",
                            t.innerHTML = He({
                                iconName: "logo_small.svg",
                                iconSize: "23px"
                            }),
                            t.style.fontSize = "18px";
                            var n = document.querySelector("footer > div.copyable-area > div span:nth-child(2) > div > div");
                            e.appendChild(t);
                            try {
                                n.appendChild(e),
                                document.getElementById("whatsapp-message-box-rocket-button").addEventListener("click", (function() {
                                    Oe().style.display = "flex" === Oe().style.display ? "none" : "flex",
                                    "flex" === Oe().style.display && (J(),
                                    G())
                                }
                                ))
                            } catch (e) {}
                        }
                        ,
                        y = 0,
                        w = setInterval((function() {
                            try {
                                Ae() && (t = '\n\n      #whatsapp-rocket-button, #new-whatsapp-rocket-button {\n        width: 80px;\n        border: 2px solid #0f756a;\n        background-color: #fbf3f0;\n        color: rgb(33, 37, 41);\n        font-size: 16px;\n        padding: 5px 3px;\n        border-radius: 3px;\n        cursor: pointer;\n        text-align: center;\n      }\n\n      #whatsapp-rocket:hover {\n        background-color: #127162;\n      }\n\n      #whatsapp-rocket-container {\n        position: fixed;\n        display: none;\n        width: 100%;\n        height: 100%; \n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0; \n        z-index: 999; \n        align-items: center;\n        justify-content: end;\n      }\n      \n      #whatsapp-rocket-modal {\n        display: none;\n        position: absolute;\n        max-height: 74%;\n        top: 0;\n        right: 0;\n        width: 350px;\n        border: #0f756a 3px solid;\n        color: rgb(33, 37, 41);\n        background-color: #fbf3f0;\n        padding: 21.92px 24px 20px;\n        padding-right: 5px;\n        border-radius: 4px;\n        box-shadow: 0 1.062em 3.125em 0 rgba(var(--shadow-rgb),.19),0 0.75em 0.937em 0 rgba(var(--shadow-rgb),.24);\n        margin-right: 20px;\n        margin-top: 20px;\n        z-index: 101;\n      }\n\n      @media only screen and (max-width: 768px) {\n        #whatsapp-rocket-container{\n          justify-content: center;\n        }\n        #whatsapp-rocket-modal {\n          margin-right: 0;\n\n        }\n      }\n\n      #whatsapp-rocket-modal-section {\n        width: 100%;\n        padding-right: 20px;\n        overflow: hidden;\n        overflow-y: auto;\n      }\n\n      .btn-send-whatsapp, #save-tag {\n        width: 150px;\n        border: 2px solid #0f756a;\n        background-color: #bbe3e0;\n        color: rgb(33, 37, 41);\n        font-size: 14px;\n        padding: 5px 3px;\n        display: inline-block;\n        border-radius: 3px;\n        cursor: pointer;\n        text-align: center;\n      }\n\n\n      .btn-live-chat-whatsapp {\n        border: 2px solid #0f756a;\n        background-color: #bbe3e0;\n        color: rgb(33, 37, 41);\n        font-size: 14px;\n        padding: 5px 8px;\n        display: flex;\n        align-items: center;\n        gap: 5px;\n        border-radius: 3px;\n        cursor: pointer;\n        text-align: center;\n      }\n\n      .btn-send-whatsapp:hover, .dark-button-color {\n        background-color: #0f756a !important;\n        color: #FFF !important;\n      }\n\n      .tab-selection-button {\n        width: 150px;\n        border: 2px solid #0f756a;\n        background-color: #bbe3e0;\n        color: rgb(33, 37, 41);\n        font-size: 14px;\n        padding: 5px 3px;\n        display: inline-block;\n        border-radius: 3px;\n        cursor: pointer;\n        text-align: center;\n        display: inline;\n      }\n\n      .tab-selection-button:hover {\n        background-color: #0f756a !important;\n        color: #FFF !important;\n      }\n\n      .tab-selection-button:hover svg {\n        fill: #fff !important;\n      }\n\n      .message-display {\n        padding-bottom: 18px;\n        font-weight: bold;\n        font-size: 12px;\n        color: #0f756a;\n      }\n\n      .whatsapp-rocket-form label {\n        display: flex;\n        align-items: center;\n        gap: 5px;\n        max-width: 100%;\n        margin-bottom: 4.992px;\n        font-size: 14px;\n        font-weight: 700;\n      }\n\n      .whatsapp-rocket-form input {\n        display: block;\n        width: 100%;\n        height: 24px;\n        padding: 6px 12px;\n        font-size: 14px;\n        line-height: 1.42857143;\n        color: #555;\n        background-color: #fff;\n        background-image: none;\n        border: 2px solid #0f756a;\n        border-radius: 4px;\n        // margin-top: 16px;\n      }\n      \n      .whatsapp-rocket-form textarea {\n        display: block;\n        width: -webkit-fill-available;\n        height: 44.8px;\n        padding: 6px 12px;\n        font-size: 12.8px;\n        line-height: 1.42857143;\n        color: #555;\n        background-color: #fff;\n        background-image: none;\n        border: 2px solid #0f756a;\n        border-radius: 4px;\n        font-family: "Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif;\n\n      }\n\n      .modal-title {\n        font-size: 24px;\n        font-weight: bold;\n        margin-bottom: 18px;\n        text-align: center;\n      }\n\n\n      .dark-button{\n        background-color: #0f756a !important;\n        color: #FFF !important;\n      }\n\n      .dark-button svg {\n        fill: #fff !important;\n      }\n\n      #message-type-selection-tab {\n        padding-bottom: 15px;\n        text-align: center;\n        display: flex;\n        justify-content: center;\n      }\n\n      #message-type-selection-tab .tab-selection-button:first-child{\n        margin-right: -3px;\n        border-top-left-radius: 10px;\n        border-bottom-left-radius: 10px;\n        border-top-right-radius: 0px;\n        border-bottom-right-radius: 0px;\n      }\n\n      #message-type-selection-tab .tab-selection-button:last-child{\n        margin-left: -3px;\n        border-top-right-radius: 10px;\n        border-bottom-right-radius: 10px;\n        border-bottom-left-radius: 0px;\n        border-top-left-radius: 0px;\n      }\n\n      #bulk-type-selection-tab {\n        padding-bottom: 25px;\n        text-align: center;\n      }\n\n      #text-field-section-button{\n        width: 130px;\n        margin-right: -3px;\n        border-top-left-radius: 10px;\n        border-bottom-left-radius: 10px;\n        border-top-right-radius: 0px;\n        border-bottom-right-radius: 0px;\n      }\n\n      #upload-field-section-button {\n        width: 140px;\n        margin-left: -3px;\n        border-top-right-radius: 10px;\n        border-bottom-right-radius: 10px;\n        border-bottom-left-radius: 0px;\n        border-top-left-radius: 0px;\n      }\n\n      .whatsapp-rocket-form-group {\n        margin-bottom: 18px;\n      }\n\n      #modal-close-button-top-right {\n        position: absolute;\n        right: 15px;\n        top: 15px;\n        font-size: 24px;\n        font-weight: 700;\n        line-height: 1;\n        color: #000;\n        text-shadow: 0 1px 0 #fff;\n        opacity: .5;\n      }\n\n      .labelForchkbox {\n        display:block;\n        padding-left: 15px;\n        text-indent: -15px;\n        font-size:12px;\n        font-weight:bold;\n      }\n\n      input.chkbox-size {\n        width:15px;\n        height:15px;\n        padding:0;\n        margin:0;\n        vertical-align: bottom;\n        position:relative;\n      }\n      \n      whatsapp-rocket-form select {\n        appearance: none;\n        background-color: #fff;\n        border: none;\n        padding: 0 1em 0 0;\n        margin: 0;\n        width: 100%;\n        font-family: inherit;\n        font-size: inherit;\n        cursor: inherit;\n        line-height: inherit;\n      }\n\n      &::-ms-expand {\n        display: none;\n      }\n\n      whatsapp-rocket-form select::-ms-expand {\n        display: none;\n      }\n\n      .select {\n        width: 85%;\n        padding: 5px;\n        font-size: 14px;\n        line-height: 1;\n        border: 0;\n        border-radius: 5px;\n        height: 34px;\n        background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right;\n        -webkit-appearance: none;\n        background-position-x: 244px;\n        border:2px solid #0f756a;\n        color: #000;\n        background-color: #fff !important;\n      }\n\n      #upload-error-message {\n        font-weight: bold;\n        font-size: 12px;\n        color: rgb(255, 102, 102);\n        margin-top: 3px;\n      }\n\n      #quick-chat-panel {\n        padding: 5px 10px 0px 10px;\n        line-height: 25px;\n      }\n\n      .quick-chat-msg {\n        background-color: #cef5af;\n        margin-right: 5px;\n        padding: 2px 5px 3px 6px;\n        border-radius: 5px;\n        font-size: 13px;\n        cursor: pointer;\n        color: rgb(33, 37, 41);\n      }\n\n      .quick-chat-close {\n        color: grey;\n        margin-left: 3px;\n      }\n\n      .quick-chat-close:hover {\n        color: #f7ebeb;\n      }\n\n      .add-message-tag {\n        cursor: pointer;\n        font-size: 14px !important;\n      }\n\n      #quick-chat-modal {\n        position: fixed;\n        display: flex;\n        width: 90px;\n        height: 35px;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        z-index: 9999;\n      }\n\n      .rsi-modal-container {\n        position: fixed;\n        display: none;\n        width: 100%;\n        height: 100%; \n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0; \n        z-index: 9999; \n      }\n      .rsi-modal-container.active{\n        display: flex;\n      }\n\n      #tag-modal, #reached-limit-modal, #accessory-modal, #non-register-reached-limit-modal {\n        width: 350px;\n        border: #0f756a 3px solid;\n        display: flex;\n        color: rgb(33, 37, 41);\n        background-color: #fbf3f0;\n        margin: auto;\n        padding: 21.92px 24px 20px;\n        border-radius: 4px;\n        box-shadow: 0 1.062em 3.125em 0 rgba(var(--shadow-rgb),.19),0 0.75em 0.937em 0 rgba(var(--shadow-rgb),.24);\n      }\n\n      .rsi-modal-section {\n        position: relative;\n        width: 100%;\n        line-height: 20px;\n      }\n\n      .rsi-close-button {\n        position: absolute;\n        top: -5px;\n        right: 0;\n        font-size: 24px;\n        font-weight: 700;\n        line-height: 1;\n        color: #000;\n        text-shadow: 0 1px 0 #fff;\n        opacity: .5;\n      }\n\n      #new-tag-input {\n        display: block;\n        width: -webkit-fill-available;\n        height: 24px;\n        padding: 6px 12px;\n        font-size: 14px;\n        line-height: 1.42857143;\n        color: #555;\n        background-color: #fff;\n        background-image: none;\n        border: 2px solid #0f756a;\n        border-radius: 4px;\n        margin-top: 16px;\n      }\n\n      #save-tag:hover {\n        background-color: #0f756a !important;\n        color: #FFF !important;\n      }\n\n      .zero-margin-bottom {\n        margin-bottom: 0 !important;\n      }\n\n      #bulk-message-interval-from, #bulk-message-csv-file-interval-from {\n        width: 30px; \n        display: inline; \n        padding: 2px 2px; \n        text-align: center;\n      }\n\n      #bulk-message-interval-to, #bulk-message-csv-file-interval-to {\n        width: 30px; \n        display: inline; \n        padding: 2px; \n        text-align: center;\n      }\n\n      .show-after-upload {\n        display: none;\n      }\n\n      '.concat("\n  .form-check {\n    display: block;\n  }\n  .form-check .form-check-input {\n    float: left;\n    margin-left: -1.5em;\n  }\n  \n  .form-check-input {\n    width: 1em;\n    height: 1em;\n    margin-top: 0px!important;\n    vertical-align: top;\n    background-color: #fff;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: contain;\n    border: 1px solid rgba(0, 0, 0, 0.25);\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    -webkit-print-color-adjust: exact;\n    color-adjust: exact;\n    cursor: pointer;\n  }\n  .form-check-input[type=checkbox] {\n    border-radius: 0.25em;\n  }\n  .form-check-input[type=radio] {\n    border-radius: 50%;\n  }\n  .form-check-input:active {\n    filter: brightness(90%);\n  }\n  .form-check-input:checked {\n    background-color: #0f756a;\n    border-color: #0f756a;\n  }\n  .form-check-input:checked[type=checkbox] {\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e\");\n  }\n  .form-check-input:checked[type=radio] {\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e\");\n  }\n  .form-check-input[type=checkbox]:indeterminate {\n    background-color: #0f756a;\n    border-color: #0f756a;\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e\");\n  }\n  .form-check-input:disabled {\n    pointer-events: none;\n    filter: none;\n    opacity: 0.5;\n  }\n  .form-check-input[disabled] ~ .form-check-label, .form-check-input:disabled ~ .form-check-label {\n    opacity: 0.5;\n  }\n  \n  .form-switch {\n    padding-left: 2.25em;\n    display: flex;\n    align-items: center;\n  }\n\n  .form-switch label{\n    margin-bottom: 0px !important;\n  }\n\n  .form-switch .form-check-input {\n    margin-left: -2.5em;\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e\");\n    background-position: left center;\n    border-radius: 2em;\n    transition: background-position 0.15s ease-in-out;\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .form-switch .form-check-input {\n      transition: none;\n    }\n  }\n  .form-switch .form-check-input:focus {\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2386b7fe'/%3e%3c/svg%3e\");\n  }\n  .form-switch .form-check-input:checked {\n    background-position: right center;\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\");\n  }\n\n  .send-attachment-switch{\n    width: 40px !important;\n    margin-right: 6px !important;\n  }\n\n  #send-attachment-buttons-for-bulk, #send-attachment-buttons-for-csv{\n    justify-content: space-between;\n  }\n\n  .attachment-buttons{\n    display: flex;\n    gap: 5px;\n    align-items: center;\n    justify-content: center;\n    width: 160px;\n  }\n\n  .attachment-buttons:hover svg, .tab-selection-button:hover svg{\n    color: #FFFFFF !important;\n  }\n  ", "\n\n      #csv-file-multi-message-phone-number-list {\n        display: none;\n      }\n\n      #upload-csv, #whatsapp-csv-file-multi-message-text-content {\n        width: -webkit-fill-available;\n      }\n\n      #upload-csv::file-selector-button {\n        background-color: #bbe3e0;\n        border: 2px solid #0f756a;\n      }\n\n      #csv-file-number-container {\n        max-height: 72px;\n        overflow-y: auto;\n      }\n\n      #csv-file-number-container::-webkit-scrollbar-track\n      {\n        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n        border-radius: 10px;\n        background-color: #F5F5F5;\n      }\n      \n      #csv-file-number-container::-webkit-scrollbar\n      {\n        width: 12px;\n        background-color: #F5F5F5;\n      }\n      \n      #csv-file-number-container::-webkit-scrollbar-thumb\n      {\n        border-radius: 10px;\n        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);\n        background-color: #0f756a;\n      }\n\n      #csv-file-number-container > div > span {\n        display: inline-block; \n        padding: 2px 3px 4px 3px; \n        font-size: 13px; \n        line-height: 1; \n        text-align: center; \n        white-space: nowrap; \n        vertical-align: baseline; \n        border-radius: 4px; \n        color: #212529; \n        background-color: #bbe3e0; \n        margin: 0 0 3px 3px;\n        border: #0f756a 1px solid;\n      }\n\n      #csv-file-msg-select-section {\n        padding-bottom: 5px;\n      }\n\n      #whatsapp-rocket-wrapper {\n        max-height: 100vh;\n        overflow-y: auto;\n        margin-right: 20px;\n      }\n\n      #message-display-location-for-bulk, #message-display-location-for-bulk-csv-file {\n        color: #ff6666 !important;\n      }\n\n      #whatsapp-rocket-modal-section::-webkit-scrollbar-track\n      {\n        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n        border-radius: 10px;\n        background-color: #F5F5F5;\n      }\n      \n      #whatsapp-rocket-modal-section::-webkit-scrollbar\n      {\n        width: 12px;\n        background-color: #F5F5F5;\n      }\n      \n      #whatsapp-rocket-modal-section::-webkit-scrollbar-thumb\n      {\n        border-radius: 10px;\n        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);\n        background-color: #0f756a;\n      }\n\n      #whatsapp-rocket-overlay {\n        position: fixed;\n        display: none;\n        width: 100%;\n        height: 100%; \n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0; \n        z-index: 100; \n        background: rgba(15, 117, 106, 0.5);\n        justify-content: center;\n        align-items: center;\n        flex-direction: column;\n        row-gap: 4px;\n      }\n\n      .settings-section-buttons-wrapper{\n        display: flex;\n        justify-content: center;\n        gap: 4px;\n      }\n\n      #delete-logs-message {\n        font-weight: bold;\n        font-size: 12px;\n        color: #0f756a;\n        margin-top: 3px;\n        float: right;\n        margin-bottom: 5px;\n      }\n\n      .btn-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 4px;\n      }\n\n      .modal-svg svg {\n        fill: rgb(33, 37, 41);\n        height: 18px;\n        width: 18px;        \n      }\n\n      ").concat('\n        .no-display {\n            display: none;\n          }\n          \n          .tooltip-container {\n            transform: translateZ(0);\n            position: absolute;\n            max-width: 200px;\n            padding: 8px 10px 10px;\n            font-size: 14px;\n            line-height: 1.5;\n            background-color: #0f756a;\n            color: #fff;\n            border-radius: 4px;\n            opacity: 1;\n            z-index: 1080;\n            border: 1px solid rgb(33, 37, 41);\n          }\n          .tooltip-container::after {\n            position: absolute;\n            display: block;\n            content: "";\n          }\n          .tooltip-container.tooltip-left::after {\n            right: -8px;\n            top: 50%;\n            transform: translateY(-50%);\n            border-style: solid;\n            border-width: 6px 0 6px 8px;\n            border-color: transparent transparent transparent #2d2d2d;\n          }\n          .tooltip-container.tooltip-right::after {\n            left: -8px;\n            top: 50%;\n            transform: translateY(-50%);\n            border-style: solid;\n            border-width: 6px 8px 6px 0;\n            border-color: transparent #2d2d2d transparent transparent;\n          }\n          .tooltip-container.tooltip-center-bottom::after, .tooltip-container.tooltip-center::after {\n            left: 50%;\n            transform: translateX(-50%);\n            border-style: solid;\n            border-color: transparent;\n          }\n          .tooltip-container.tooltip-center::after {\n            top: -8px;\n            border-width: 0 6px 8px 6px;\n            border-bottom-color: #2d2d2d;\n          }\n          .tooltip-container.tooltip-center-bottom::after {\n            bottom: -8px;\n            border-width: 8px 6px 0 6px;\n            border-top-color: #2d2d2d;\n          }\n          \n          [data-tooltip] {\n            cursor: pointer;\n            color: #7cb342;\n            display: inline-block;\n          }\n    ', "\n\n      .input-group {\n        display: flex;\n      }\n      \n      .input-group input, .input-group input.focus-visible {\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n      }\n\n      .input-group button {\n        margin-left: -2px;\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n      }\n\n      *:focus {\n        outline: none!important;\n      }\n    \n      .modal-footer {\n        position: absolute;\n        top: 100%;\n        width: 100%;\n        height: 30px;\n        left: -3px;\n        border: #0f756a 3px solid;\n        background-color: #bbe3e0;\n        display: flex;\n        align-items: center;\n        color: #212529;\n        justify-content: center;\n      }\n      .modal-footer #rsi-usage-display{\n        font-size: 14px;\n        font-weight: 700;\n        padding: 0 4px;\n      }\n\n      #whatsapp-rocket-overlay #sending-usage, #whatsapp-rocket-overlay #sent-attachment-note{\n        border: #0f756a 4px solid;\n        padding: 8px 10px;\n        font-size: 20px;\n        z-index: 200;\n        background: #fcf5f4;\n        border-radius: 4px;\n        color: #212529;\n      }\n      #whatsapp-rocket-overlay #sending-usage{\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        margin-top: 8px;\n      }\n\n      .whatsapp-header-container{\n        display: flex;\n        flex-direction: column;\n        row-gap: 4px;\n      }\n\n      .checkbox-wrapper{\n        display: flex;\n        align-items: center;\n        column-gap: 4px;\n      }\n\n      .accessory-wrapper {\n        display: flex!important;\n        align-items: center!important;\n      }\n\n      #accessory-button {\n        width: 35px;\n        height: 35px;\n        border: 2px solid #0f756a;\n        background-color: #fbf3f0;\n        color: rgb(33, 37, 41);\n        font-size: 14px;\n        border-radius: 3px;\n        cursor: pointer;\n        text-align: center;\n        margin-right: 12px;\n      }\n\n      #single-message-sections  input.form-check-input:checked + label { font-weight: bold; }\n\n      .rsi-blur, .rsi-image-blur{\n        filter: blur(4px);\n      }\n      .rsi-image-blur:hover{\n        filter: none;\n      }\n\n      #single-message-sections label{\n        font-weight: normal;\n      }\n\n      #single-message-sections .form-check.form-switch{\n        line-height: 28px\n      }\n\n      .ai-rewrite-button {\n        width: 28px;\n        height: 28px;\n        border-radius: 50%;\n        background-color: #cef5af;\n        color: rgb(33, 37, 41);\n        padding: 0 8px;\n        font-size: 12px;\n        cursor: pointer;\n        text-align: center;\n      }\n\n      .whatsapp-rocket-form input::selection, .whatsapp-rocket-form textarea::selection {\n        background: #0f756a !important;\n        color: #fff;\n      }\n    "),
                                document.head.appendChild(document.createElement("style")).innerHTML = t,
                                n(),
                                vt(),
                                Tt(),
                                e = setInterval((function() {
                                    try {
                                        document.querySelector("#main > footer") && !document.getElementById("rsio-ai-rewrite-button") && function() {
                                            var e = document.createElement("button");
                                            e.id = "rsio-ai-rewrite-button",
                                            e.innerHTML = "AI",
                                            e.classList.add("ai-rewrite-button"),
                                            e.style.alignSelf = "center",
                                            e.style.opacity = "0.5",
                                            e.addEventListener("click", (function() {
                                                var e = document.querySelector("#main > footer div[contenteditable]").innerText
                                                  , t = new URLSearchParams;
                                                e.replace(/\s/g, "").length > 0 && t.append("whatsappMessage", e);
                                                var n = "#".concat(t);
                                                window.open(n, "_blank")
                                            }
                                            )),
                                            e.addEventListener("mouseover", (function() {
                                                e.textContent = "AI Rewrite",
                                                e.style.width = "82px",
                                                e.style.borderRadius = "12px",
                                                e.style.opacity = "1"
                                            }
                                            )),
                                            e.addEventListener("mouseout", (function() {
                                                e.textContent = "AI",
                                                e.style.width = "28px",
                                                e.style.borderRadius = "50%",
                                                e.style.opacity = "0.5"
                                            }
                                            ));
                                            var t = document.querySelector("#main > footer div[contenteditable]").parentElement.parentElement;
                                            t.style.display = "flex",
                                            t.append(e)
                                        }()
                                    } catch (t) {
                                        clearInterval(e)
                                    }
                                }
                                ), 1e3),
                                Rt(),
                                x(),
                                setTimeout((function() {
                                    var e = new URL(window.location.href);
                                    e.searchParams.has("mode") && "r-popup" === e.searchParams.get("mode") && (document.getElementById(ae).click(),
                                    window.history.replaceState(null, null, window.location.pathname))
                                }
                                ), 2e3),
                                clearInterval(w)),
                                ++y > 500 && clearInterval(w)
                            } catch (e) {
                                clearInterval(w)
                            }
                            var e, t
                        }
                        ), 250),
                        document.addEventListener("click", (function(e) {
                            e.target && e.target.closest('#pane-side div[role="row"]') && (document.getElementById("whatsapp-message-box-rocket-button") || s())
                        }
                        )),
                        x = function() {
                            var e = document.createElement("Button");
                            e.id = "accessory-button",
                            e.innerHTML = '<img src="'.concat(chrome.runtime.getURL("images/star.svg"), '"\n                      style="width: 32px;\n                      height: 32px;\n                      position: relative;">\n                    </img>;');
                            var t = document.querySelector("#side > div");
                            t.classList.add("accessory-wrapper"),
                            t.firstChild.style.flex = "1",
                            t.appendChild(e),
                            S(),
                            document.getElementById("accessory-button").addEventListener("click", (function() {
                                document.getElementById("accessory-modal-container").classList.toggle("active")
                            }
                            )),
                            document.getElementById("unreadCheckbox").addEventListener("change", (function() {
                                var e, t;
                                E("highlight-unread", document.getElementById("unreadCheckbox").checked),
                                e = function() {
                                    var e = document.querySelectorAll('#pane-side div[role="row"] div[role="gridcell"][aria-colindex="1"] > span > div > span:not([data-icon="muted"]), #pane-side div[role="grid"] div[role="listitem"] div[role="gridcell"] > span > div span:not([data-icon="muted"])')
                                      , t = document.body.className.includes("dark");
                                    e.forEach((function(e) {
                                        var n;
                                        e.innerHTML.includes("pinned2") || ((null !== (n = e.closest('#pane-side div[role="row"] > div')) && void 0 !== n ? n : e.closest('#pane-side div[role="grid"] div[role="listitem"] > div > div > div')).style.background = t ? "#09463F" : "#bbe3e0")
                                    }
                                    ))
                                }
                                ,
                                t = function() {
                                    document.querySelectorAll('#pane-side div[role="row"] > div, #pane-side div[role="grid"] div[role="listitem"] > div > div > div').forEach((function(e) {
                                        e.style.background = "unset"
                                    }
                                    ))
                                }
                                ,
                                document.getElementById("unreadCheckbox").checked ? (e(),
                                o = setInterval((function() {
                                    t(),
                                    e()
                                }
                                ), 1e3)) : (t(),
                                o && clearInterval(o))
                            }
                            )),
                            document.getElementById("blurText").addEventListener("change", (function() {
                                E("blur-recent-text", document.getElementById("blurText").checked),
                                document.getElementById("blurText").checked ? (l(document.querySelectorAll(p), b),
                                r = setInterval((function() {
                                    l(document.querySelectorAll(p), b)
                                }
                                ), 1e3)) : (d(document.querySelectorAll(p), b),
                                r && clearInterval(r))
                            }
                            )),
                            document.getElementById("blurContactDetails").addEventListener("change", (function() {
                                var e, t, n;
                                E("blur-contact-details", document.getElementById("blurContactDetails").checked),
                                document.getElementById("blurContactDetails").checked ? (l(document.querySelectorAll(m), b),
                                null !== (e = document.querySelector(g)) && void 0 !== e && e.classList.contains(b) || null === (t = document.querySelector(g)) || void 0 === t || t.classList.add(b),
                                i = setInterval((function() {
                                    var e, t;
                                    l(document.querySelectorAll(m), b),
                                    null !== (e = document.querySelector(g)) && void 0 !== e && e.classList.contains(b) || null === (t = document.querySelector(g)) || void 0 === t || t.classList.add(b)
                                }
                                ), 1e3)) : (null !== (n = document.querySelector(g)) && void 0 !== n && n.classList.contains(b) && document.querySelector(g).classList.remove(b),
                                d(document.querySelectorAll(m), b),
                                i && clearInterval(i))
                            }
                            )),
                            document.getElementById("blurContactImage").addEventListener("change", (function() {
                                var e, t, n;
                                E("blur-contact-image", document.getElementById("blurContactImage").checked),
                                document.getElementById("blurContactImage").checked ? (l(document.querySelectorAll(h), v),
                                null !== (e = document.querySelector(f)) && void 0 !== e && e.classList.contains(v) || null === (t = document.querySelector(f)) || void 0 === t || t.classList.add(v),
                                a = setInterval((function() {
                                    var e, t;
                                    l(document.querySelectorAll(h), v),
                                    null !== (e = document.querySelector(f)) && void 0 !== e && e.classList.contains(v) || null === (t = document.querySelector(f)) || void 0 === t || t.classList.add(v)
                                }
                                ), 1e3)) : (d(document.querySelectorAll(h), v),
                                null !== (n = document.querySelector(f)) && void 0 !== n && n.classList.contains(v) && document.querySelector(f).classList.remove(v),
                                a && clearInterval(a))
                            }
                            )),
                            B()
                        }
                        ,
                        S = function() {
                            var e = document.createElement("div");
                            e.id = "accessory-modal-container",
                            e.classList.add("rsi-modal-container");
                            var t = document.createElement("div");
                            t.id = "accessory-modal",
                            t.innerHTML += '\n<div id="accessory-modal-section" class="rsi-modal-section">\n  <button\n    type="button"\n    id="accessory-modal-close-button-top-right"\n    class="close rsi-close-button"\n    data-dismiss="modal"\n    aria-label="Close"\n  >\n    <span aria-hidden="true">×</span>\n  </button>\n\n  <div class="modal-title">Accessories</div>\n  <div class="whatsapp-rocket-form" id="single-message-sections">\n\n    <div class="form-check form-switch">\n        <input type="checkbox" class="form-check-input send-attachment-switch" id="unreadCheckbox">\n        <label class="form-check-label" for="unreadCheckbox" style="font-size: 16px; color: #000000;">Highlight unread</label>\n    </div>\n    <div class="form-check form-switch">\n        <input type="checkbox" class="form-check-input send-attachment-switch" id="blurText">\n        <label class="form-check-label" for="blurText" style="font-size: 16px; color: #000000;">Blur recent text</label>\n    </div>\n    <div class="form-check form-switch">\n        <input type="checkbox" class="form-check-input send-attachment-switch" id="blurContactDetails">\n        <label class="form-check-label" for="blurContactDetails" style="font-size: 16px; color: #000000;">Blur contact details</label>\n    </div>\n    <div class="form-check form-switch">\n        <input type="checkbox" class="form-check-input send-attachment-switch" id="blurContactImage">\n        <label class="form-check-label" for="blurContactImage" style="font-size: 16px; color: #000000;">Blur contact image</label>\n    </div>\n  </div>\n</div>\n',
                            e.appendChild(t),
                            document.body.appendChild(e),
                            document.getElementById("accessory-modal-close-button-top-right").addEventListener("click", (function(e) {
                                document.getElementById("accessory-modal-container").classList.remove("active")
                            }
                            )),
                            window.addEventListener("click", (function(e) {
                                var t = document.getElementById("accessory-modal-container");
                                e.target == t && t.classList.remove("active")
                            }
                            ))
                        }
                        ,
                        B = function() {
                            var e = t(c().mark((function e() {
                                var t, n, o, r, i;
                                return c().wrap((function(e) {
                                    for (; ; )
                                        switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2,
                                            k();
                                        case 2:
                                            i = e.sent,
                                            u("unreadCheckbox", null !== (t = i["highlight-unread"]) && void 0 !== t && t),
                                            u("blurText", null !== (n = i["blur-recent-text"]) && void 0 !== n && n),
                                            u("blurContactDetails", null !== (o = i["blur-contact-details"]) && void 0 !== o && o),
                                            u("blurContactImage", null !== (r = i["blur-contact-image"]) && void 0 !== r && r);
                                        case 7:
                                        case "end":
                                            return e.stop()
                                        }
                                }
                                ), e)
                            }
                            )));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }(),
                        e.next = 10,
                        P();
                    case 10:
                        I();
                    case 11:
                    case "end":
                        return e.stop()
                    }
            }
            ), e)
        }
        )))()
    }
    )()
}
)();
