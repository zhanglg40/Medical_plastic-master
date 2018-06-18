var navigator2 = {
    appName: 'Netscape',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};

var window2 = {
    ASN1 : null,
    Base64 : null,
    Hex : null,
    crypto : null,
    href : null
};

var KJUR = null;

if (typeof YAHOO == "undefined" || !YAHOO) {
    var YAHOO = {};
}
YAHOO.namespace = function() {
    var b = arguments,
    g = null,
    e, c, f;
    for (e = 0; e < b.length; e = e + 1) {
        f = ("" + b[e]).split(".");
        g = YAHOO;
        for (c = (f[0] == "YAHOO") ? 1 : 0; c < f.length; c = c + 1) {
            g[f[c]] = g[f[c]] || {};
            g = g[f[c]];
        }
    }
    return g;
};
YAHOO.log = function(d, a, c) {
    var b = YAHOO.widget.Logger;
    if (b && b.log) {
        return b.log(d, a, c);
    } else {
        return false;
    }
};
YAHOO.register = function(a, f, e) {
    var k = YAHOO.env.modules,
    c, j, h, g, d;
    if (!k[a]) {
        k[a] = {
            versions: [],
            builds: []
        };
    }
    c = k[a];
    j = e.version;
    h = e.build;
    g = YAHOO.env.listeners;
    c.name = a;
    c.version = j;
    c.build = h;
    c.versions.push(j);
    c.builds.push(h);
    c.mainClass = f;
    for (d = 0; d < g.length; d = d + 1) {
        g[d](c);
    }
    if (f) {
        f.VERSION = j;
        f.BUILD = h;
    } else {
        YAHOO.log("mainClass is undefined for module " + a, "warn");
    }
};
YAHOO.env = YAHOO.env || {
    modules: [],
    listeners: []
};
YAHOO.env.getVersion = function(a) {
    return YAHOO.env.modules[a] || null;
};
YAHOO.env.parseUA = function(d) {
    var e = function(i) {
        var j = 0;
        return parseFloat(i.replace(/\./g,
        function() {
            return (j++==1) ? "": ".";
        }));
    },
    h = navigator2,
    g = {
        ie: 0,
        opera: 0,
        gecko: 0,
        webkit: 0,
        chrome: 0,
        mobile: null,
        air: 0,
        ipad: 0,
        iphone: 0,
        ipod: 0,
        ios: null,
        android: 0,
        webos: 0,
        caja: h && h.cajaVersion,
        secure: false,
        os: null
    },
    c = d || (navigator2 && navigator2.userAgent),
    f = window2 && window2.location,
    b = f && f.href,
    a;
    g.secure = b && (b.toLowerCase().indexOf("https") === 0);
    if (c) {
        if ((/windows|win32/i).test(c)) {
            g.os = "windows";
        } else {
            if ((/macintosh/i).test(c)) {
                g.os = "macintosh";
            } else {
                if ((/rhino/i).test(c)) {
                    g.os = "rhino";
                }
            }
        }
        if ((/KHTML/).test(c)) {
            g.webkit = 1;
        }
        a = c.match(/AppleWebKit\/([^\s]*)/);
        if (a && a[1]) {
            g.webkit = e(a[1]);
            if (/ Mobile\//.test(c)) {
                g.mobile = "Apple";
                a = c.match(/OS ([^\s]*)/);
                if (a && a[1]) {
                    a = e(a[1].replace("_", "."));
                }
                g.ios = a;
                g.ipad = g.ipod = g.iphone = 0;
                a = c.match(/iPad|iPod|iPhone/);
                if (a && a[0]) {
                    g[a[0].toLowerCase()] = g.ios;
                }
            } else {
                a = c.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                if (a) {
                    g.mobile = a[0];
                }
                if (/webOS/.test(c)) {
                    g.mobile = "WebOS";
                    a = c.match(/webOS\/([^\s]*);/);
                    if (a && a[1]) {
                        g.webos = e(a[1]);
                    }
                }
                if (/ Android/.test(c)) {
                    g.mobile = "Android";
                    a = c.match(/Android ([^\s]*);/);
                    if (a && a[1]) {
                        g.android = e(a[1]);
                    }
                }
            }
            a = c.match(/Chrome\/([^\s]*)/);
            if (a && a[1]) {
                g.chrome = e(a[1]);
            } else {
                a = c.match(/AdobeAIR\/([^\s]*)/);
                if (a) {
                    g.air = a[0];
                }
            }
        }
        if (!g.webkit) {
            a = c.match(/Opera[\s\/]([^\s]*)/);
            if (a && a[1]) {
                g.opera = e(a[1]);
                a = c.match(/Version\/([^\s]*)/);
                if (a && a[1]) {
                    g.opera = e(a[1]);
                }
                a = c.match(/Opera Mini[^;]*/);
                if (a) {
                    g.mobile = a[0];
                }
            } else {
                a = c.match(/MSIE\s([^;]*)/);
                if (a && a[1]) {
                    g.ie = e(a[1]);
                } else {
                    a = c.match(/Gecko\/([^\s]*)/);
                    if (a) {
                        g.gecko = 1;
                        a = c.match(/rv:([^\s\)]*)/);
                        if (a && a[1]) {
                            g.gecko = e(a[1]);
                        }
                    }
                }
            }
        }
    }
    return g;
};
YAHOO.env.ua = YAHOO.env.parseUA(); (function() {
    YAHOO.namespace("util", "widget", "example");
    if ("undefined" !== typeof YAHOO_config) {
        var b = YAHOO_config.listener,
        a = YAHOO.env.listeners,
        d = true,
        c;
        if (b) {
            for (c = 0; c < a.length; c++) {
                if (a[c] == b) {
                    d = false;
                    break;
                }
            }
            if (d) {
                a.push(b);
            }
        }
    }
})();
YAHOO.lang = YAHOO.lang || {}; (function() {
    var f = YAHOO.lang,
    a = Object.prototype,
    c = "[object Array]",
    h = "[object Function]",
    i = "[object Object]",
    b = [],
    g = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
        "`": "&#x60;"
    },
    d = ["toString", "valueOf"],
    e = {
        isArray: function(j) {
            return a.toString.apply(j) === c;
        },
        isBoolean: function(j) {
            return typeof j === "boolean";
        },
        isFunction: function(j) {
            return (typeof j === "function") || a.toString.apply(j) === h;
        },
        isNull: function(j) {
            return j === null;
        },
        isNumber: function(j) {
            return typeof j === "number" && isFinite(j);
        },
        isObject: function(j) {
            return (j && (typeof j === "object" || f.isFunction(j))) || false;
        },
        isString: function(j) {
            return typeof j === "string";
        },
        isUndefined: function(j) {
            return typeof j === "undefined";
        },
        _IEEnumFix: (YAHOO.env.ua.ie) ?
        function(l, k) {
            var j, n, m;
            for (j = 0; j < d.length; j = j + 1) {
                n = d[j];
                m = k[n];
                if (f.isFunction(m) && m != a[n]) {
                    l[n] = m;
                }
            }
        }: function() {},
        escapeHTML: function(j) {
            return j.replace(/[&<>"'\/`]/g,
            function(k) {
                return g[k];
            });
        },
        extend: function(m, n, l) {
            if (!n || !m) {
                throw new Error("extend failed, please check that " + "all dependencies are included.");
            }
            var k = function() {},
            j;
            k.prototype = n.prototype;
            m.prototype = new k();
            m.prototype.constructor = m;
            m.superclass = n.prototype;
            if (n.prototype.constructor == a.constructor) {
                n.prototype.constructor = n;
            }
            if (l) {
                for (j in l) {
                    if (f.hasOwnProperty(l, j)) {
                        m.prototype[j] = l[j];
                    }
                }
                f._IEEnumFix(m.prototype, l);
            }
        },
        augmentObject: function(n, m) {
            if (!m || !n) {
                throw new Error("Absorb failed, verify dependencies.");
            }
            var j = arguments,
            l, o, k = j[2];
            if (k && k !== true) {
                for (l = 2; l < j.length; l = l + 1) {
                    n[j[l]] = m[j[l]];
                }
            } else {
                for (o in m) {
                    if (k || !(o in n)) {
                        n[o] = m[o];
                    }
                }
                f._IEEnumFix(n, m);
            }
            return n;
        },
        augmentProto: function(m, l) {
            if (!l || !m) {
                throw new Error("Augment failed, verify dependencies.");
            }
            var j = [m.prototype, l.prototype],
            k;
            for (k = 2; k < arguments.length; k = k + 1) {
                j.push(arguments[k]);
            }
            f.augmentObject.apply(this, j);
            return m;
        },
        dump: function(j, p) {
            var l, n, r = [],
            t = "{...}",
            k = "f(){...}",
            q = ", ",
            m = " => ";
            if (!f.isObject(j)) {
                return j + "";
            } else {
                if (j instanceof Date || ("nodeType" in j && "tagName" in j)) {
                    return j;
                } else {
                    if (f.isFunction(j)) {
                        return k;
                    }
                }
            }
            p = (f.isNumber(p)) ? p: 3;
            if (f.isArray(j)) {
                r.push("[");
                for (l = 0, n = j.length; l < n; l = l + 1) {
                    if (f.isObject(j[l])) {
                        r.push((p > 0) ? f.dump(j[l], p - 1) : t);
                    } else {
                        r.push(j[l]);
                    }
                    r.push(q);
                }
                if (r.length > 1) {
                    r.pop();
                }
                r.push("]");
            } else {
                r.push("{");
                for (l in j) {
                    if (f.hasOwnProperty(j, l)) {
                        r.push(l + m);
                        if (f.isObject(j[l])) {
                            r.push((p > 0) ? f.dump(j[l], p - 1) : t);
                        } else {
                            r.push(j[l]);
                        }
                        r.push(q);
                    }
                }
                if (r.length > 1) {
                    r.pop();
                }
                r.push("}");
            }
            return r.join("");
        },
        substitute: function(x, y, E, l) {
            var D, C, B, G, t, u, F = [],
            p,
            z = x.length,
            A = "dump",
            r = " ",
            q = "{",
            m = "}",
            n,
            w;
            for (;;) {
                D = x.lastIndexOf(q, z);
                if (D < 0) {
                    break;
                }
                C = x.indexOf(m, D);
                if (D + 1 > C) {
                    break;
                }
                p = x.substring(D + 1, C);
                G = p;
                u = null;
                B = G.indexOf(r);
                if (B > -1) {
                    u = G.substring(B + 1);
                    G = G.substring(0, B);
                }
                t = y[G];
                if (E) {
                    t = E(G, t, u);
                }
                if (f.isObject(t)) {
                    if (f.isArray(t)) {
                        t = f.dump(t, parseInt(u, 10));
                    } else {
                        u = u || "";
                        n = u.indexOf(A);
                        if (n > -1) {
                            u = u.substring(4);
                        }
                        w = t.toString();
                        if (w === i || n > -1) {
                            t = f.dump(t, parseInt(u, 10));
                        } else {
                            t = w;
                        }
                    }
                } else {
                    if (!f.isString(t) && !f.isNumber(t)) {
                        t = "~-" + F.length + "-~";
                        F[F.length] = p;
                    }
                }
                x = x.substring(0, D) + t + x.substring(C + 1);
                if (l === false) {
                    z = D - 1;
                }
            }
            for (D = F.length - 1; D >= 0; D = D - 1) {
                x = x.replace(new RegExp("~-" + D + "-~"), "{" + F[D] + "}", "g");
            }
            return x;
        },
        trim: function(j) {
            try {
                return j.replace(/^\s+|\s+$/g, "");
            } catch(k) {
                return j;
            }
        },
        merge: function() {
            var n = {},
            k = arguments,
            j = k.length,
            m;
            for (m = 0; m < j; m = m + 1) {
                f.augmentObject(n, k[m], true);
            }
            return n;
        },
        later: function(t, k, u, n, p) {
            t = t || 0;
            k = k || {};
            var l = u,
            s = n,
            q, j;
            if (f.isString(u)) {
                l = k[u];
            }
            if (!l) {
                throw new TypeError("method undefined");
            }
            if (!f.isUndefined(n) && !f.isArray(s)) {
                s = [n];
            }
            q = function() {
                l.apply(k, s || b);
            };
            j = (p) ? setInterval(q, t) : setTimeout(q, t);
            return {
                interval: p,
                cancel: function() {
                    if (this.interval) {
                        clearInterval(j);
                    } else {
                        clearTimeout(j);
                    }
                }
            };
        },
        isValue: function(j) {
            return (f.isObject(j) || f.isString(j) || f.isNumber(j) || f.isBoolean(j));
        }
    };
    f.hasOwnProperty = (a.hasOwnProperty) ?
    function(j, k) {
        return j && j.hasOwnProperty && j.hasOwnProperty(k);
    }: function(j, k) {
        return ! f.isUndefined(j[k]) && j.constructor.prototype[k] !== j[k];
    };
    e.augmentObject(f, e, true);
    YAHOO.util.Lang = f;
    f.augment = f.augmentProto;
    YAHOO.augment = f.augmentProto;
    YAHOO.extend = f.extend;
})();
YAHOO.register("yahoo", YAHOO, {
    version: "2.9.0",
    build: "2800"
});

var CryptoJS = CryptoJS || (function(e, g) {
    var a = {};
    var b = a.lib = {};
    var j = b.Base = (function() {
        function n() {}
        return {
            extend: function(p) {
                n.prototype = this;
                var o = new n();
                if (p) {
                    o.mixIn(p)
                }
                if (!o.hasOwnProperty("init")) {
                    o.init = function() {
                        o.$super.init.apply(this, arguments)
                    }
                }
                o.init.prototype = o;
                o.$super = this;
                return o
            },
            create: function() {
                var o = this.extend();
                o.init.apply(o, arguments);
                return o
            },
            init: function() {},
            mixIn: function(p) {
                for (var o in p) {
                    if (p.hasOwnProperty(o)) {
                        this[o] = p[o]
                    }
                }
                if (p.hasOwnProperty("toString")) {
                    this.toString = p.toString
                }
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        }
    } ());
    var l = b.WordArray = j.extend({
        init: function(o, n) {
            o = this.words = o || [];
            if (n != g) {
                this.sigBytes = n
            } else {
                this.sigBytes = o.length * 4
            }
        },
        toString: function(n) {
            return (n || h).stringify(this)
        },
        concat: function(t) {
            var q = this.words;
            var p = t.words;
            var n = this.sigBytes;
            var s = t.sigBytes;
            this.clamp();
            if (n % 4) {
                for (var r = 0; r < s; r++) {
                    var o = (p[r >>> 2] >>> (24 - (r % 4) * 8)) & 255;
                    q[(n + r) >>> 2] |= o << (24 - ((n + r) % 4) * 8)
                }
            } else {
                for (var r = 0; r < s; r += 4) {
                    q[(n + r) >>> 2] = p[r >>> 2]
                }
            }
            this.sigBytes += s;
            return this
        },
        clamp: function() {
            var o = this.words;
            var n = this.sigBytes;
            o[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8);
            o.length = e.ceil(n / 4)
        },
        clone: function() {
            var n = j.clone.call(this);
            n.words = this.words.slice(0);
            return n
        },
        random: function(p) {
            var o = [];
            for (var n = 0; n < p; n += 4) {
                o.push((e.random() * 4294967296) | 0)
            }
            return new l.init(o, p)
        }
    });
    var m = a.enc = {};
    var h = m.Hex = {
        stringify: function(p) {
            var r = p.words;
            var o = p.sigBytes;
            var q = [];
            for (var n = 0; n < o; n++) {
                var s = (r[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                q.push((s >>> 4).toString(16));
                q.push((s & 15).toString(16))
            }
            return q.join("")
        },
        parse: function(p) {
            var n = p.length;
            var q = [];
            for (var o = 0; o < n; o += 2) {
                q[o >>> 3] |= parseInt(p.substr(o, 2), 16) << (24 - (o % 8) * 4)
            }
            return new l.init(q, n / 2)
        }
    };
    var d = m.Latin1 = {
        stringify: function(q) {
            var r = q.words;
            var p = q.sigBytes;
            var n = [];
            for (var o = 0; o < p; o++) {
                var s = (r[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                n.push(String.fromCharCode(s))
            }
            return n.join("")
        },
        parse: function(p) {
            var n = p.length;
            var q = [];
            for (var o = 0; o < n; o++) {
                q[o >>> 2] |= (p.charCodeAt(o) & 255) << (24 - (o % 4) * 8)
            }
            return new l.init(q, n)
        }
    };
    var c = m.Utf8 = {
        stringify: function(n) {
            try {
                return decodeURIComponent(escape(d.stringify(n)))
            } catch(o) {
                throw new Error("Malformed UTF-8 data")
            }
        },
        parse: function(n) {
            return d.parse(unescape(encodeURIComponent(n)))
        }
    };
    var i = b.BufferedBlockAlgorithm = j.extend({
        reset: function() {
            this._data = new l.init();
            this._nDataBytes = 0
        },
        _append: function(n) {
            if (typeof n == "string") {
                n = c.parse(n)
            }
            this._data.concat(n);
            this._nDataBytes += n.sigBytes
        },
        _process: function(w) {
            var q = this._data;
            var x = q.words;
            var n = q.sigBytes;
            var t = this.blockSize;
            var v = t * 4;
            var u = n / v;
            if (w) {
                u = e.ceil(u)
            } else {
                u = e.max((u | 0) - this._minBufferSize, 0)
            }
            var s = u * t;
            var r = e.min(s * 4, n);
            if (s) {
                for (var p = 0; p < s; p += t) {
                    this._doProcessBlock(x, p)
                }
                var o = x.splice(0, s);
                q.sigBytes -= r
            }
            return new l.init(o, r)
        },
        clone: function() {
            var n = j.clone.call(this);
            n._data = this._data.clone();
            return n
        },
        _minBufferSize: 0
    });
    var f = b.Hasher = i.extend({
        cfg: j.extend(),
        init: function(n) {
            this.cfg = this.cfg.extend(n);
            this.reset()
        },
        reset: function() {
            i.reset.call(this);
            this._doReset()
        },
        update: function(n) {
            this._append(n);
            this._process();
            return this
        },
        finalize: function(n) {
            if (n) {
                this._append(n)
            }
            var o = this._doFinalize();
            return o
        },
        blockSize: 512 / 32,
        _createHelper: function(n) {
            return function(p, o) {
                return new n.init(o).finalize(p)
            }
        },
        _createHmacHelper: function(n) {
            return function(p, o) {
                return new k.HMAC.init(n, o).finalize(p)
            }
        }
    });
    var k = a.algo = {};
    return a
} (Math));

(function(g) {
    var a = CryptoJS,
    f = a.lib,
    e = f.Base,
    h = f.WordArray,
    a = a.x64 = {};
    a.Word = e.extend({
        init: function(b, c) {
            this.high = b;
            this.low = c
        }
    });
    a.WordArray = e.extend({
        init: function(b, c) {
            b = this.words = b || [];
            this.sigBytes = c != g ? c: 8 * b.length
        },
        toX32: function() {
            for (var b = this.words,
            c = b.length,
            a = [], d = 0; d < c; d++) {
                var e = b[d];
                a.push(e.high);
                a.push(e.low)
            }
            return h.create(a, this.sigBytes)
        },
        clone: function() {
            for (var b = e.clone.call(this), c = b.words = this.words.slice(0), a = c.length, d = 0; d < a; d++) c[d] = c[d].clone();
            return b
        }
    })
})();

CryptoJS.lib.Cipher ||
function(u) {
    var g = CryptoJS,
    f = g.lib,
    k = f.Base,
    l = f.WordArray,
    q = f.BufferedBlockAlgorithm,
    r = g.enc.Base64,
    v = g.algo.EvpKDF,
    n = f.Cipher = q.extend({
        cfg: k.extend(),
        createEncryptor: function(a, b) {
            return this.create(this._ENC_XFORM_MODE, a, b)
        },
        createDecryptor: function(a, b) {
            return this.create(this._DEC_XFORM_MODE, a, b)
        },
        init: function(a, b, c) {
            this.cfg = this.cfg.extend(c);
            this._xformMode = a;
            this._key = b;
            this.reset()
        },
        reset: function() {
            q.reset.call(this);
            this._doReset()
        },
        process: function(a) {
            this._append(a);
            return this._process()
        },
        finalize: function(a) {
            a && this._append(a);
            return this._doFinalize()
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function(a) {
            return {
                encrypt: function(b, c, d) {
                    return ("string" == typeof c ? s: j).encrypt(a, b, c, d)
                },
                decrypt: function(b, c, d) {
                    return ("string" == typeof c ? s: j).decrypt(a, b, c, d)
                }
            }
        }
    });
    f.StreamCipher = n.extend({
        _doFinalize: function() {
            return this._process(!0)
        },
        blockSize: 1
    });
    var m = g.mode = {},
    t = function(a, b, c) {
        var d = this._iv;
        d ? this._iv = u: d = this._prevBlock;
        for (var e = 0; e < c; e++) a[b + e] ^= d[e]
    },
    h = (f.BlockCipherMode = k.extend({
        createEncryptor: function(a, b) {
            return this.Encryptor.create(a, b)
        },
        createDecryptor: function(a, b) {
            return this.Decryptor.create(a, b)
        },
        init: function(a, b) {
            this._cipher = a;
            this._iv = b
        }
    })).extend();
    h.Encryptor = h.extend({
        processBlock: function(a, b) {
            var c = this._cipher,
            d = c.blockSize;
            t.call(this, a, b, d);
            c.encryptBlock(a, b);
            this._prevBlock = a.slice(b, b + d)
        }
    });
    h.Decryptor = h.extend({
        processBlock: function(a, b) {
            var c = this._cipher,
            d = c.blockSize,
            e = a.slice(b, b + d);
            c.decryptBlock(a, b);
            t.call(this, a, b, d);
            this._prevBlock = e
        }
    });
    m = m.CBC = h;
    h = (g.pad = {}).Pkcs7 = {
        pad: function(a, b) {
            for (var c = 4 * b,
            c = c - a.sigBytes % c,
            d = c << 24 | c << 16 | c << 8 | c,
            e = [], f = 0; f < c; f += 4) e.push(d);
            c = l.create(e, c);
            a.concat(c)
        },
        unpad: function(a) {
            a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255
        }
    };
    f.BlockCipher = n.extend({
        cfg: n.cfg.extend({
            mode: m,
            padding: h
        }),
        reset: function() {
            n.reset.call(this);
            var a = this.cfg,
            b = a.iv,
            a = a.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;
            else c = a.createDecryptor,
            this._minBufferSize = 1;
            this._mode = c.call(a, this, b && b.words)
        },
        _doProcessBlock: function(a, b) {
            this._mode.processBlock(a, b)
        },
        _doFinalize: function() {
            var a = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                a.pad(this._data, this.blockSize);
                var b = this._process(!0)
            } else b = this._process(!0),
            a.unpad(b);
            return b
        },
        blockSize: 4
    });
    var p = f.CipherParams = k.extend({
        init: function(a) {
            this.mixIn(a)
        },
        toString: function(a) {
            return (a || this.formatter).stringify(this)
        }
    }),
    m = (g.format = {}).OpenSSL = {
        stringify: function(a) {
            var b = a.ciphertext;
            a = a.salt;
            return (a ? l.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(r)
        },
        parse: function(a) {
            a = r.parse(a);
            var b = a.words;
            if (1398893684 == b[0] && 1701076831 == b[1]) {
                var c = l.create(b.slice(2, 4));
                b.splice(0, 4);
                a.sigBytes -= 16
            }
            return p.create({
                ciphertext: a,
                salt: c
            })
        }
    },
    j = f.SerializableCipher = k.extend({
        cfg: k.extend({
            format: m
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            var e = a.createEncryptor(c, d);
            b = e.finalize(b);
            e = e.cfg;
            return p.create({
                ciphertext: b,
                key: c,
                iv: e.iv,
                algorithm: a,
                mode: e.mode,
                padding: e.padding,
                blockSize: a.blockSize,
                formatter: d.format
            })
        },
        decrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            return a.createDecryptor(c, d).finalize(b.ciphertext)
        },
        _parse: function(a, b) {
            return "string" == typeof a ? b.parse(a, this) : a
        }
    }),
    g = (g.kdf = {}).OpenSSL = {
        execute: function(a, b, c, d) {
            d || (d = l.random(8));
            a = v.create({
                keySize: b + c
            }).compute(a, d);
            c = l.create(a.words.slice(b), 4 * c);
            a.sigBytes = 4 * b;
            return p.create({
                key: a,
                iv: c,
                salt: d
            })
        }
    },
    s = f.PasswordBasedCipher = j.extend({
        cfg: j.cfg.extend({
            kdf: g
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            c = d.kdf.execute(c, a.keySize, a.ivSize);
            d.iv = c.iv;
            a = j.encrypt.call(this, a, b, c.key, d);
            a.mixIn(c);
            return a
        },
        decrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);
            d.iv = c.iv;
            return j.decrypt.call(this, a, b, c.key, d)
        }
    })
} ();

(function() {
    for (var q = CryptoJS,
    x = q.lib.BlockCipher,
    r = q.algo,
    j = [], y = [], z = [], A = [], B = [], C = [], s = [], u = [], v = [], w = [], g = [], k = 0; 256 > k; k++) g[k] = 128 > k ? k << 1 : k << 1 ^ 283;
    for (var n = 0,
    l = 0,
    k = 0; 256 > k; k++) {
        var f = l ^ l << 1 ^ l << 2 ^ l << 3 ^ l << 4,
        f = f >>> 8 ^ f & 255 ^ 99;
        j[n] = f;
        y[f] = n;
        var t = g[n],
        D = g[t],
        E = g[D],
        b = 257 * g[f] ^ 16843008 * f;
        z[n] = b << 24 | b >>> 8;
        A[n] = b << 16 | b >>> 16;
        B[n] = b << 8 | b >>> 24;
        C[n] = b;
        b = 16843009 * E ^ 65537 * D ^ 257 * t ^ 16843008 * n;
        s[f] = b << 24 | b >>> 8;
        u[f] = b << 16 | b >>> 16;
        v[f] = b << 8 | b >>> 24;
        w[f] = b;
        n ? (n = t ^ g[g[g[E ^ t]]], l ^= g[g[l]]) : n = l = 1
    }
    var F = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
    r = r.AES = x.extend({
        _doReset: function() {
            for (var c = this._key,
            e = c.words,
            a = c.sigBytes / 4,
            c = 4 * ((this._nRounds = a + 6) + 1), b = this._keySchedule = [], h = 0; h < c; h++) if (h < a) b[h] = e[h];
            else {
                var d = b[h - 1];
                h % a ? 6 < a && 4 == h % a && (d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255]) : (d = d << 8 | d >>> 24, d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255], d ^= F[h / a | 0] << 24);
                b[h] = b[h - a] ^ d
            }
            e = this._invKeySchedule = [];
            for (a = 0; a < c; a++) h = c - a,
            d = a % 4 ? b[h] : b[h - 4],
            e[a] = 4 > a || 4 >= h ? d: s[j[d >>> 24]] ^ u[j[d >>> 16 & 255]] ^ v[j[d >>> 8 & 255]] ^ w[j[d & 255]]
        },
        encryptBlock: function(c, e) {
            this._doCryptBlock(c, e, this._keySchedule, z, A, B, C, j)
        },
        decryptBlock: function(c, e) {
            var a = c[e + 1];
            c[e + 1] = c[e + 3];
            c[e + 3] = a;
            this._doCryptBlock(c, e, this._invKeySchedule, s, u, v, w, y);
            a = c[e + 1];
            c[e + 1] = c[e + 3];
            c[e + 3] = a
        },
        _doCryptBlock: function(c, e, a, b, h, d, j, m) {
            for (var n = this._nRounds,
            f = c[e] ^ a[0], g = c[e + 1] ^ a[1], k = c[e + 2] ^ a[2], p = c[e + 3] ^ a[3], l = 4, t = 1; t < n; t++) var q = b[f >>> 24] ^ h[g >>> 16 & 255] ^ d[k >>> 8 & 255] ^ j[p & 255] ^ a[l++],
            r = b[g >>> 24] ^ h[k >>> 16 & 255] ^ d[p >>> 8 & 255] ^ j[f & 255] ^ a[l++],
            s = b[k >>> 24] ^ h[p >>> 16 & 255] ^ d[f >>> 8 & 255] ^ j[g & 255] ^ a[l++],
            p = b[p >>> 24] ^ h[f >>> 16 & 255] ^ d[g >>> 8 & 255] ^ j[k & 255] ^ a[l++],
            f = q,
            g = r,
            k = s;
            q = (m[f >>> 24] << 24 | m[g >>> 16 & 255] << 16 | m[k >>> 8 & 255] << 8 | m[p & 255]) ^ a[l++];
            r = (m[g >>> 24] << 24 | m[k >>> 16 & 255] << 16 | m[p >>> 8 & 255] << 8 | m[f & 255]) ^ a[l++];
            s = (m[k >>> 24] << 24 | m[p >>> 16 & 255] << 16 | m[f >>> 8 & 255] << 8 | m[g & 255]) ^ a[l++];
            p = (m[p >>> 24] << 24 | m[f >>> 16 & 255] << 16 | m[g >>> 8 & 255] << 8 | m[k & 255]) ^ a[l++];
            c[e] = q;
            c[e + 1] = r;
            c[e + 2] = s;
            c[e + 3] = p
        },
        keySize: 8
    });
    q.AES = x._createHelper(r)
})();

(function() {
    function j(b, c) {
        var a = (this._lBlock >>> b ^ this._rBlock) & c;
        this._rBlock ^= a;
        this._lBlock ^= a << b
    }
    function l(b, c) {
        var a = (this._rBlock >>> b ^ this._lBlock) & c;
        this._lBlock ^= a;
        this._rBlock ^= a << b
    }
    var h = CryptoJS,
    e = h.lib,
    n = e.WordArray,
    e = e.BlockCipher,
    g = h.algo,
    q = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
    p = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
    r = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
    s = [{
        "0": 8421888,
        268435456 : 32768,
        536870912 : 8421378,
        805306368 : 2,
        1073741824 : 512,
        1342177280 : 8421890,
        1610612736 : 8389122,
        1879048192 : 8388608,
        2147483648 : 514,
        2415919104 : 8389120,
        2684354560 : 33280,
        2952790016 : 8421376,
        3221225472 : 32770,
        3489660928 : 8388610,
        3758096384 : 0,
        4026531840 : 33282,
        134217728 : 0,
        402653184 : 8421890,
        671088640 : 33282,
        939524096 : 32768,
        1207959552 : 8421888,
        1476395008 : 512,
        1744830464 : 8421378,
        2013265920 : 2,
        2281701376 : 8389120,
        2550136832 : 33280,
        2818572288 : 8421376,
        3087007744 : 8389122,
        3355443200 : 8388610,
        3623878656 : 32770,
        3892314112 : 514,
        4160749568 : 8388608,
        1 : 32768,
        268435457 : 2,
        536870913 : 8421888,
        805306369 : 8388608,
        1073741825 : 8421378,
        1342177281 : 33280,
        1610612737 : 512,
        1879048193 : 8389122,
        2147483649 : 8421890,
        2415919105 : 8421376,
        2684354561 : 8388610,
        2952790017 : 33282,
        3221225473 : 514,
        3489660929 : 8389120,
        3758096385 : 32770,
        4026531841 : 0,
        134217729 : 8421890,
        402653185 : 8421376,
        671088641 : 8388608,
        939524097 : 512,
        1207959553 : 32768,
        1476395009 : 8388610,
        1744830465 : 2,
        2013265921 : 33282,
        2281701377 : 32770,
        2550136833 : 8389122,
        2818572289 : 514,
        3087007745 : 8421888,
        3355443201 : 8389120,
        3623878657 : 0,
        3892314113 : 33280,
        4160749569 : 8421378
    },
    {
        "0": 1074282512,
        16777216 : 16384,
        33554432 : 524288,
        50331648 : 1074266128,
        67108864 : 1073741840,
        83886080 : 1074282496,
        100663296 : 1073758208,
        117440512 : 16,
        134217728 : 540672,
        150994944 : 1073758224,
        167772160 : 1073741824,
        184549376 : 540688,
        201326592 : 524304,
        218103808 : 0,
        234881024 : 16400,
        251658240 : 1074266112,
        8388608 : 1073758208,
        25165824 : 540688,
        41943040 : 16,
        58720256 : 1073758224,
        75497472 : 1074282512,
        92274688 : 1073741824,
        109051904 : 524288,
        125829120 : 1074266128,
        142606336 : 524304,
        159383552 : 0,
        176160768 : 16384,
        192937984 : 1074266112,
        209715200 : 1073741840,
        226492416 : 540672,
        243269632 : 1074282496,
        260046848 : 16400,
        268435456 : 0,
        285212672 : 1074266128,
        301989888 : 1073758224,
        318767104 : 1074282496,
        335544320 : 1074266112,
        352321536 : 16,
        369098752 : 540688,
        385875968 : 16384,
        402653184 : 16400,
        419430400 : 524288,
        436207616 : 524304,
        452984832 : 1073741840,
        469762048 : 540672,
        486539264 : 1073758208,
        503316480 : 1073741824,
        520093696 : 1074282512,
        276824064 : 540688,
        293601280 : 524288,
        310378496 : 1074266112,
        327155712 : 16384,
        343932928 : 1073758208,
        360710144 : 1074282512,
        377487360 : 16,
        394264576 : 1073741824,
        411041792 : 1074282496,
        427819008 : 1073741840,
        444596224 : 1073758224,
        461373440 : 524304,
        478150656 : 0,
        494927872 : 16400,
        511705088 : 1074266128,
        528482304 : 540672
    },
    {
        "0": 260,
        1048576 : 0,
        2097152 : 67109120,
        3145728 : 65796,
        4194304 : 65540,
        5242880 : 67108868,
        6291456 : 67174660,
        7340032 : 67174400,
        8388608 : 67108864,
        9437184 : 67174656,
        10485760 : 65792,
        11534336 : 67174404,
        12582912 : 67109124,
        13631488 : 65536,
        14680064 : 4,
        15728640 : 256,
        524288 : 67174656,
        1572864 : 67174404,
        2621440 : 0,
        3670016 : 67109120,
        4718592 : 67108868,
        5767168 : 65536,
        6815744 : 65540,
        7864320 : 260,
        8912896 : 4,
        9961472 : 256,
        11010048 : 67174400,
        12058624 : 65796,
        13107200 : 65792,
        14155776 : 67109124,
        15204352 : 67174660,
        16252928 : 67108864,
        16777216 : 67174656,
        17825792 : 65540,
        18874368 : 65536,
        19922944 : 67109120,
        20971520 : 256,
        22020096 : 67174660,
        23068672 : 67108868,
        24117248 : 0,
        25165824 : 67109124,
        26214400 : 67108864,
        27262976 : 4,
        28311552 : 65792,
        29360128 : 67174400,
        30408704 : 260,
        31457280 : 65796,
        32505856 : 67174404,
        17301504 : 67108864,
        18350080 : 260,
        19398656 : 67174656,
        20447232 : 0,
        21495808 : 65540,
        22544384 : 67109120,
        23592960 : 256,
        24641536 : 67174404,
        25690112 : 65536,
        26738688 : 67174660,
        27787264 : 65796,
        28835840 : 67108868,
        29884416 : 67109124,
        30932992 : 67174400,
        31981568 : 4,
        33030144 : 65792
    },
    {
        "0": 2151682048,
        65536 : 2147487808,
        131072 : 4198464,
        196608 : 2151677952,
        262144 : 0,
        327680 : 4198400,
        393216 : 2147483712,
        458752 : 4194368,
        524288 : 2147483648,
        589824 : 4194304,
        655360 : 64,
        720896 : 2147487744,
        786432 : 2151678016,
        851968 : 4160,
        917504 : 4096,
        983040 : 2151682112,
        32768 : 2147487808,
        98304 : 64,
        163840 : 2151678016,
        229376 : 2147487744,
        294912 : 4198400,
        360448 : 2151682112,
        425984 : 0,
        491520 : 2151677952,
        557056 : 4096,
        622592 : 2151682048,
        688128 : 4194304,
        753664 : 4160,
        819200 : 2147483648,
        884736 : 4194368,
        950272 : 4198464,
        1015808 : 2147483712,
        1048576 : 4194368,
        1114112 : 4198400,
        1179648 : 2147483712,
        1245184 : 0,
        1310720 : 4160,
        1376256 : 2151678016,
        1441792 : 2151682048,
        1507328 : 2147487808,
        1572864 : 2151682112,
        1638400 : 2147483648,
        1703936 : 2151677952,
        1769472 : 4198464,
        1835008 : 2147487744,
        1900544 : 4194304,
        1966080 : 64,
        2031616 : 4096,
        1081344 : 2151677952,
        1146880 : 2151682112,
        1212416 : 0,
        1277952 : 4198400,
        1343488 : 4194368,
        1409024 : 2147483648,
        1474560 : 2147487808,
        1540096 : 64,
        1605632 : 2147483712,
        1671168 : 4096,
        1736704 : 2147487744,
        1802240 : 2151678016,
        1867776 : 4160,
        1933312 : 2151682048,
        1998848 : 4194304,
        2064384 : 4198464
    },
    {
        "0": 128,
        4096 : 17039360,
        8192 : 262144,
        12288 : 536870912,
        16384 : 537133184,
        20480 : 16777344,
        24576 : 553648256,
        28672 : 262272,
        32768 : 16777216,
        36864 : 537133056,
        40960 : 536871040,
        45056 : 553910400,
        49152 : 553910272,
        53248 : 0,
        57344 : 17039488,
        61440 : 553648128,
        2048 : 17039488,
        6144 : 553648256,
        10240 : 128,
        14336 : 17039360,
        18432 : 262144,
        22528 : 537133184,
        26624 : 553910272,
        30720 : 536870912,
        34816 : 537133056,
        38912 : 0,
        43008 : 553910400,
        47104 : 16777344,
        51200 : 536871040,
        55296 : 553648128,
        59392 : 16777216,
        63488 : 262272,
        65536 : 262144,
        69632 : 128,
        73728 : 536870912,
        77824 : 553648256,
        81920 : 16777344,
        86016 : 553910272,
        90112 : 537133184,
        94208 : 16777216,
        98304 : 553910400,
        102400 : 553648128,
        106496 : 17039360,
        110592 : 537133056,
        114688 : 262272,
        118784 : 536871040,
        122880 : 0,
        126976 : 17039488,
        67584 : 553648256,
        71680 : 16777216,
        75776 : 17039360,
        79872 : 537133184,
        83968 : 536870912,
        88064 : 17039488,
        92160 : 128,
        96256 : 553910272,
        100352 : 262272,
        104448 : 553910400,
        108544 : 0,
        112640 : 553648128,
        116736 : 16777344,
        120832 : 262144,
        124928 : 537133056,
        129024 : 536871040
    },
    {
        "0": 268435464,
        256 : 8192,
        512 : 270532608,
        768 : 270540808,
        1024 : 268443648,
        1280 : 2097152,
        1536 : 2097160,
        1792 : 268435456,
        2048 : 0,
        2304 : 268443656,
        2560 : 2105344,
        2816 : 8,
        3072 : 270532616,
        3328 : 2105352,
        3584 : 8200,
        3840 : 270540800,
        128 : 270532608,
        384 : 270540808,
        640 : 8,
        896 : 2097152,
        1152 : 2105352,
        1408 : 268435464,
        1664 : 268443648,
        1920 : 8200,
        2176 : 2097160,
        2432 : 8192,
        2688 : 268443656,
        2944 : 270532616,
        3200 : 0,
        3456 : 270540800,
        3712 : 2105344,
        3968 : 268435456,
        4096 : 268443648,
        4352 : 270532616,
        4608 : 270540808,
        4864 : 8200,
        5120 : 2097152,
        5376 : 268435456,
        5632 : 268435464,
        5888 : 2105344,
        6144 : 2105352,
        6400 : 0,
        6656 : 8,
        6912 : 270532608,
        7168 : 8192,
        7424 : 268443656,
        7680 : 270540800,
        7936 : 2097160,
        4224 : 8,
        4480 : 2105344,
        4736 : 2097152,
        4992 : 268435464,
        5248 : 268443648,
        5504 : 8200,
        5760 : 270540808,
        6016 : 270532608,
        6272 : 270540800,
        6528 : 270532616,
        6784 : 8192,
        7040 : 2105352,
        7296 : 2097160,
        7552 : 0,
        7808 : 268435456,
        8064 : 268443656
    },
    {
        "0": 1048576,
        16 : 33555457,
        32 : 1024,
        48 : 1049601,
        64 : 34604033,
        80 : 0,
        96 : 1,
        112 : 34603009,
        128 : 33555456,
        144 : 1048577,
        160 : 33554433,
        176 : 34604032,
        192 : 34603008,
        208 : 1025,
        224 : 1049600,
        240 : 33554432,
        8 : 34603009,
        24 : 0,
        40 : 33555457,
        56 : 34604032,
        72 : 1048576,
        88 : 33554433,
        104 : 33554432,
        120 : 1025,
        136 : 1049601,
        152 : 33555456,
        168 : 34603008,
        184 : 1048577,
        200 : 1024,
        216 : 34604033,
        232 : 1,
        248 : 1049600,
        256 : 33554432,
        272 : 1048576,
        288 : 33555457,
        304 : 34603009,
        320 : 1048577,
        336 : 33555456,
        352 : 34604032,
        368 : 1049601,
        384 : 1025,
        400 : 34604033,
        416 : 1049600,
        432 : 1,
        448 : 0,
        464 : 34603008,
        480 : 33554433,
        496 : 1024,
        264 : 1049600,
        280 : 33555457,
        296 : 34603009,
        312 : 1,
        328 : 33554432,
        344 : 1048576,
        360 : 1025,
        376 : 34604032,
        392 : 33554433,
        408 : 34603008,
        424 : 0,
        440 : 34604033,
        456 : 1049601,
        472 : 1024,
        488 : 33555456,
        504 : 1048577
    },
    {
        "0": 134219808,
        1 : 131072,
        2 : 134217728,
        3 : 32,
        4 : 131104,
        5 : 134350880,
        6 : 134350848,
        7 : 2048,
        8 : 134348800,
        9 : 134219776,
        10 : 133120,
        11 : 134348832,
        12 : 2080,
        13 : 0,
        14 : 134217760,
        15 : 133152,
        2147483648 : 2048,
        2147483649 : 134350880,
        2147483650 : 134219808,
        2147483651 : 134217728,
        2147483652 : 134348800,
        2147483653 : 133120,
        2147483654 : 133152,
        2147483655 : 32,
        2147483656 : 134217760,
        2147483657 : 2080,
        2147483658 : 131104,
        2147483659 : 134350848,
        2147483660 : 0,
        2147483661 : 134348832,
        2147483662 : 134219776,
        2147483663 : 131072,
        16 : 133152,
        17 : 134350848,
        18 : 32,
        19 : 2048,
        20 : 134219776,
        21 : 134217760,
        22 : 134348832,
        23 : 131072,
        24 : 0,
        25 : 131104,
        26 : 134348800,
        27 : 134219808,
        28 : 134350880,
        29 : 133120,
        30 : 2080,
        31 : 134217728,
        2147483664 : 131072,
        2147483665 : 2048,
        2147483666 : 134348832,
        2147483667 : 133152,
        2147483668 : 32,
        2147483669 : 134348800,
        2147483670 : 134217728,
        2147483671 : 134219808,
        2147483672 : 134350880,
        2147483673 : 134217760,
        2147483674 : 134219776,
        2147483675 : 0,
        2147483676 : 133120,
        2147483677 : 2080,
        2147483678 : 131104,
        2147483679 : 134350848
    }],
    t = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
    m = g.DES = e.extend({
        _doReset: function() {
            for (var b = this._key.words,
            c = [], a = 0; 56 > a; a++) {
                var f = q[a] - 1;
                c[a] = b[f >>> 5] >>> 31 - f % 32 & 1
            }
            b = this._subKeys = [];
            for (f = 0; 16 > f; f++) {
                for (var d = b[f] = [], e = r[f], a = 0; 24 > a; a++) d[a / 6 | 0] |= c[(p[a] - 1 + e) % 28] << 31 - a % 6,
                d[4 + (a / 6 | 0)] |= c[28 + (p[a + 24] - 1 + e) % 28] << 31 - a % 6;
                d[0] = d[0] << 1 | d[0] >>> 31;
                for (a = 1; 7 > a; a++) d[a] >>>= 4 * (a - 1) + 3;
                d[7] = d[7] << 5 | d[7] >>> 27
            }
            c = this._invSubKeys = [];
            for (a = 0; 16 > a; a++) c[a] = b[15 - a]
        },
        encryptBlock: function(b, c) {
            this._doCryptBlock(b, c, this._subKeys)
        },
        decryptBlock: function(b, c) {
            this._doCryptBlock(b, c, this._invSubKeys)
        },
        _doCryptBlock: function(b, c, a) {
            this._lBlock = b[c];
            this._rBlock = b[c + 1];
            j.call(this, 4, 252645135);
            j.call(this, 16, 65535);
            l.call(this, 2, 858993459);
            l.call(this, 8, 16711935);
            j.call(this, 1, 1431655765);
            for (var f = 0; 16 > f; f++) {
                for (var d = a[f], e = this._lBlock, h = this._rBlock, g = 0, k = 0; 8 > k; k++) g |= s[k][((h ^ d[k]) & t[k]) >>> 0];
                this._lBlock = h;
                this._rBlock = e ^ g
            }
            a = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = a;
            j.call(this, 1, 1431655765);
            l.call(this, 8, 16711935);
            l.call(this, 2, 858993459);
            j.call(this, 16, 65535);
            j.call(this, 4, 252645135);
            b[c] = this._lBlock;
            b[c + 1] = this._rBlock
        },
        keySize: 2,
        ivSize: 2,
        blockSize: 2
    });
    h.DES = e._createHelper(m);
    g = g.TripleDES = e.extend({
        _doReset: function() {
            var b = this._key.words;
            this._des1 = m.createEncryptor(n.create(b.slice(0, 2)));
            this._des2 = m.createEncryptor(n.create(b.slice(2, 4)));
            this._des3 = m.createEncryptor(n.create(b.slice(4, 6)))
        },
        encryptBlock: function(b, c) {
            this._des1.encryptBlock(b, c);
            this._des2.decryptBlock(b, c);
            this._des3.encryptBlock(b, c)
        },
        decryptBlock: function(b, c) {
            this._des3.decryptBlock(b, c);
            this._des2.encryptBlock(b, c);
            this._des1.decryptBlock(b, c)
        },
        keySize: 6,
        ivSize: 2,
        blockSize: 2
    });
    h.TripleDES = e._createHelper(g)
})();

(function() {
    var h = CryptoJS,
    j = h.lib.WordArray;
    h.enc.Base64 = {
        stringify: function(b) {
            var e = b.words,
            f = b.sigBytes,
            c = this._map;
            b.clamp();
            b = [];
            for (var a = 0; a < f; a += 3) for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + 0.75 * g < f; g++) b.push(c.charAt(d >>> 6 * (3 - g) & 63));
            if (e = c.charAt(64)) for (; b.length % 4;) b.push(e);
            return b.join("")
        },
        parse: function(b) {
            var e = b.length,
            f = this._map,
            c = f.charAt(64);
            c && (c = b.indexOf(c), -1 != c && (e = c));
            for (var c = [], a = 0, d = 0; d < e; d++) if (d % 4) {
                var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4),
                h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);
                c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4);
                a++
            }
            return j.create(c, a)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
})();

(function(E) {
    function h(a, f, g, j, p, h, k) {
        a = a + (f & g | ~f & j) + p + k;
        return (a << h | a >>> 32 - h) + f
    }
    function k(a, f, g, j, p, h, k) {
        a = a + (f & j | g & ~j) + p + k;
        return (a << h | a >>> 32 - h) + f
    }
    function l(a, f, g, j, h, k, l) {
        a = a + (f ^ g ^ j) + h + l;
        return (a << k | a >>> 32 - k) + f
    }
    function n(a, f, g, j, h, k, l) {
        a = a + (g ^ (f | ~j)) + h + l;
        return (a << k | a >>> 32 - k) + f
    }
    for (var r = CryptoJS,
    q = r.lib,
    F = q.WordArray,
    s = q.Hasher,
    q = r.algo,
    a = [], t = 0; 64 > t; t++) a[t] = 4294967296 * E.abs(E.sin(t + 1)) | 0;
    q = q.MD5 = s.extend({
        _doReset: function() {
            this._hash = new F.init([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function(m, f) {
            for (var g = 0; 16 > g; g++) {
                var j = f + g,
                p = m[j];
                m[j] = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360
            }
            var g = this._hash.words,
            j = m[f + 0],
            p = m[f + 1],
            q = m[f + 2],
            r = m[f + 3],
            s = m[f + 4],
            t = m[f + 5],
            u = m[f + 6],
            v = m[f + 7],
            w = m[f + 8],
            x = m[f + 9],
            y = m[f + 10],
            z = m[f + 11],
            A = m[f + 12],
            B = m[f + 13],
            C = m[f + 14],
            D = m[f + 15],
            b = g[0],
            c = g[1],
            d = g[2],
            e = g[3],
            b = h(b, c, d, e, j, 7, a[0]),
            e = h(e, b, c, d, p, 12, a[1]),
            d = h(d, e, b, c, q, 17, a[2]),
            c = h(c, d, e, b, r, 22, a[3]),
            b = h(b, c, d, e, s, 7, a[4]),
            e = h(e, b, c, d, t, 12, a[5]),
            d = h(d, e, b, c, u, 17, a[6]),
            c = h(c, d, e, b, v, 22, a[7]),
            b = h(b, c, d, e, w, 7, a[8]),
            e = h(e, b, c, d, x, 12, a[9]),
            d = h(d, e, b, c, y, 17, a[10]),
            c = h(c, d, e, b, z, 22, a[11]),
            b = h(b, c, d, e, A, 7, a[12]),
            e = h(e, b, c, d, B, 12, a[13]),
            d = h(d, e, b, c, C, 17, a[14]),
            c = h(c, d, e, b, D, 22, a[15]),
            b = k(b, c, d, e, p, 5, a[16]),
            e = k(e, b, c, d, u, 9, a[17]),
            d = k(d, e, b, c, z, 14, a[18]),
            c = k(c, d, e, b, j, 20, a[19]),
            b = k(b, c, d, e, t, 5, a[20]),
            e = k(e, b, c, d, y, 9, a[21]),
            d = k(d, e, b, c, D, 14, a[22]),
            c = k(c, d, e, b, s, 20, a[23]),
            b = k(b, c, d, e, x, 5, a[24]),
            e = k(e, b, c, d, C, 9, a[25]),
            d = k(d, e, b, c, r, 14, a[26]),
            c = k(c, d, e, b, w, 20, a[27]),
            b = k(b, c, d, e, B, 5, a[28]),
            e = k(e, b, c, d, q, 9, a[29]),
            d = k(d, e, b, c, v, 14, a[30]),
            c = k(c, d, e, b, A, 20, a[31]),
            b = l(b, c, d, e, t, 4, a[32]),
            e = l(e, b, c, d, w, 11, a[33]),
            d = l(d, e, b, c, z, 16, a[34]),
            c = l(c, d, e, b, C, 23, a[35]),
            b = l(b, c, d, e, p, 4, a[36]),
            e = l(e, b, c, d, s, 11, a[37]),
            d = l(d, e, b, c, v, 16, a[38]),
            c = l(c, d, e, b, y, 23, a[39]),
            b = l(b, c, d, e, B, 4, a[40]),
            e = l(e, b, c, d, j, 11, a[41]),
            d = l(d, e, b, c, r, 16, a[42]),
            c = l(c, d, e, b, u, 23, a[43]),
            b = l(b, c, d, e, x, 4, a[44]),
            e = l(e, b, c, d, A, 11, a[45]),
            d = l(d, e, b, c, D, 16, a[46]),
            c = l(c, d, e, b, q, 23, a[47]),
            b = n(b, c, d, e, j, 6, a[48]),
            e = n(e, b, c, d, v, 10, a[49]),
            d = n(d, e, b, c, C, 15, a[50]),
            c = n(c, d, e, b, t, 21, a[51]),
            b = n(b, c, d, e, A, 6, a[52]),
            e = n(e, b, c, d, r, 10, a[53]),
            d = n(d, e, b, c, y, 15, a[54]),
            c = n(c, d, e, b, p, 21, a[55]),
            b = n(b, c, d, e, w, 6, a[56]),
            e = n(e, b, c, d, D, 10, a[57]),
            d = n(d, e, b, c, u, 15, a[58]),
            c = n(c, d, e, b, B, 21, a[59]),
            b = n(b, c, d, e, s, 6, a[60]),
            e = n(e, b, c, d, z, 10, a[61]),
            d = n(d, e, b, c, q, 15, a[62]),
            c = n(c, d, e, b, x, 21, a[63]);
            g[0] = g[0] + b | 0;
            g[1] = g[1] + c | 0;
            g[2] = g[2] + d | 0;
            g[3] = g[3] + e | 0
        },
        _doFinalize: function() {
            var a = this._data,
            f = a.words,
            g = 8 * this._nDataBytes,
            j = 8 * a.sigBytes;
            f[j >>> 5] |= 128 << 24 - j % 32;
            var h = E.floor(g / 4294967296);
            f[(j + 64 >>> 9 << 4) + 15] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
            f[(j + 64 >>> 9 << 4) + 14] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
            a.sigBytes = 4 * (f.length + 1);
            this._process();
            a = this._hash;
            f = a.words;
            for (g = 0; 4 > g; g++) j = f[g],
            f[g] = (j << 8 | j >>> 24) & 16711935 | (j << 24 | j >>> 8) & 4278255360;
            return a
        },
        clone: function() {
            var a = s.clone.call(this);
            a._hash = this._hash.clone();
            return a
        }
    });
    r.MD5 = s._createHelper(q);
    r.HmacMD5 = s._createHmacHelper(q)
})(Math);

(function() {
    var k = CryptoJS,
    b = k.lib,
    m = b.WordArray,
    l = b.Hasher,
    d = [],
    b = k.algo.SHA1 = l.extend({
        _doReset: function() {
            this._hash = new m.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
        },
        _doProcessBlock: function(n, p) {
            for (var a = this._hash.words,
            e = a[0], f = a[1], h = a[2], j = a[3], b = a[4], c = 0; 80 > c; c++) {
                if (16 > c) d[c] = n[p + c] | 0;
                else {
                    var g = d[c - 3] ^ d[c - 8] ^ d[c - 14] ^ d[c - 16];
                    d[c] = g << 1 | g >>> 31
                }
                g = (e << 5 | e >>> 27) + b + d[c];
                g = 20 > c ? g + ((f & h | ~f & j) + 1518500249) : 40 > c ? g + ((f ^ h ^ j) + 1859775393) : 60 > c ? g + ((f & h | f & j | h & j) - 1894007588) : g + ((f ^ h ^ j) - 899497514);
                b = j;
                j = h;
                h = f << 30 | f >>> 2;
                f = e;
                e = g
            }
            a[0] = a[0] + e | 0;
            a[1] = a[1] + f | 0;
            a[2] = a[2] + h | 0;
            a[3] = a[3] + j | 0;
            a[4] = a[4] + b | 0
        },
        _doFinalize: function() {
            var b = this._data,
            d = b.words,
            a = 8 * this._nDataBytes,
            e = 8 * b.sigBytes;
            d[e >>> 5] |= 128 << 24 - e % 32;
            d[(e + 64 >>> 9 << 4) + 14] = Math.floor(a / 4294967296);
            d[(e + 64 >>> 9 << 4) + 15] = a;
            b.sigBytes = 4 * d.length;
            this._process();
            return this._hash
        },
        clone: function() {
            var b = l.clone.call(this);
            b._hash = this._hash.clone();
            return b
        }
    });
    k.SHA1 = l._createHelper(b);
    k.HmacSHA1 = l._createHmacHelper(b)
})();

(function(k) {
    for (var g = CryptoJS,
    h = g.lib,
    v = h.WordArray,
    j = h.Hasher,
    h = g.algo,
    s = [], t = [], u = function(q) {
        return 4294967296 * (q - (q | 0)) | 0
    },
    l = 2, b = 0; 64 > b;) {
        var d;
        a: {
            d = l;
            for (var w = k.sqrt(d), r = 2; r <= w; r++) if (! (d % r)) {
                d = !1;
                break a
            }
            d = !0
        }
        d && (8 > b && (s[b] = u(k.pow(l, 0.5))), t[b] = u(k.pow(l, 1 / 3)), b++);
        l++
    }
    var n = [],
    h = h.SHA256 = j.extend({
        _doReset: function() {
            this._hash = new v.init(s.slice(0))
        },
        _doProcessBlock: function(q, h) {
            for (var a = this._hash.words,
            c = a[0], d = a[1], b = a[2], k = a[3], f = a[4], g = a[5], j = a[6], l = a[7], e = 0; 64 > e; e++) {
                if (16 > e) n[e] = q[h + e] | 0;
                else {
                    var m = n[e - 15],
                    p = n[e - 2];
                    n[e] = ((m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3) + n[e - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[e - 16]
                }
                m = l + ((f << 26 | f >>> 6) ^ (f << 21 | f >>> 11) ^ (f << 7 | f >>> 25)) + (f & g ^ ~f & j) + t[e] + n[e];
                p = ((c << 30 | c >>> 2) ^ (c << 19 | c >>> 13) ^ (c << 10 | c >>> 22)) + (c & d ^ c & b ^ d & b);
                l = j;
                j = g;
                g = f;
                f = k + m | 0;
                k = b;
                b = d;
                d = c;
                c = m + p | 0
            }
            a[0] = a[0] + c | 0;
            a[1] = a[1] + d | 0;
            a[2] = a[2] + b | 0;
            a[3] = a[3] + k | 0;
            a[4] = a[4] + f | 0;
            a[5] = a[5] + g | 0;
            a[6] = a[6] + j | 0;
            a[7] = a[7] + l | 0
        },
        _doFinalize: function() {
            var d = this._data,
            b = d.words,
            a = 8 * this._nDataBytes,
            c = 8 * d.sigBytes;
            b[c >>> 5] |= 128 << 24 - c % 32;
            b[(c + 64 >>> 9 << 4) + 14] = k.floor(a / 4294967296);
            b[(c + 64 >>> 9 << 4) + 15] = a;
            d.sigBytes = 4 * b.length;
            this._process();
            return this._hash
        },
        clone: function() {
            var b = j.clone.call(this);
            b._hash = this._hash.clone();
            return b
        }
    });
    g.SHA256 = j._createHelper(h);
    g.HmacSHA256 = j._createHmacHelper(h)
})(Math);

(function() {
    var b = CryptoJS,
    d = b.lib.WordArray,
    a = b.algo,
    c = a.SHA256,
    a = a.SHA224 = c.extend({
        _doReset: function() {
            this._hash = new d.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
        },
        _doFinalize: function() {
            var a = c._doFinalize.call(this);
            a.sigBytes -= 4;
            return a
        }
    });
    b.SHA224 = c._createHelper(a);
    b.HmacSHA224 = c._createHmacHelper(a)
})();

(function() {
    function a() {
        return d.create.apply(d, arguments)
    }
    for (var n = CryptoJS,
    r = n.lib.Hasher,
    e = n.x64,
    d = e.Word,
    T = e.WordArray,
    e = n.algo,
    ea = [a(1116352408, 3609767458), a(1899447441, 602891725), a(3049323471, 3964484399), a(3921009573, 2173295548), a(961987163, 4081628472), a(1508970993, 3053834265), a(2453635748, 2937671579), a(2870763221, 3664609560), a(3624381080, 2734883394), a(310598401, 1164996542), a(607225278, 1323610764), a(1426881987, 3590304994), a(1925078388, 4068182383), a(2162078206, 991336113), a(2614888103, 633803317), a(3248222580, 3479774868), a(3835390401, 2666613458), a(4022224774, 944711139), a(264347078, 2341262773), a(604807628, 2007800933), a(770255983, 1495990901), a(1249150122, 1856431235), a(1555081692, 3175218132), a(1996064986, 2198950837), a(2554220882, 3999719339), a(2821834349, 766784016), a(2952996808, 2566594879), a(3210313671, 3203337956), a(3336571891, 1034457026), a(3584528711, 2466948901), a(113926993, 3758326383), a(338241895, 168717936), a(666307205, 1188179964), a(773529912, 1546045734), a(1294757372, 1522805485), a(1396182291, 2643833823), a(1695183700, 2343527390), a(1986661051, 1014477480), a(2177026350, 1206759142), a(2456956037, 344077627), a(2730485921, 1290863460), a(2820302411, 3158454273), a(3259730800, 3505952657), a(3345764771, 106217008), a(3516065817, 3606008344), a(3600352804, 1432725776), a(4094571909, 1467031594), a(275423344, 851169720), a(430227734, 3100823752), a(506948616, 1363258195), a(659060556, 3750685593), a(883997877, 3785050280), a(958139571, 3318307427), a(1322822218, 3812723403), a(1537002063, 2003034995), a(1747873779, 3602036899), a(1955562222, 1575990012), a(2024104815, 1125592928), a(2227730452, 2716904306), a(2361852424, 442776044), a(2428436474, 593698344), a(2756734187, 3733110249), a(3204031479, 2999351573), a(3329325298, 3815920427), a(3391569614, 3928383900), a(3515267271, 566280711), a(3940187606, 3454069534), a(4118630271, 4000239992), a(116418474, 1914138554), a(174292421, 2731055270), a(289380356, 3203993006), a(460393269, 320620315), a(685471733, 587496836), a(852142971, 1086792851), a(1017036298, 365543100), a(1126000580, 2618297676), a(1288033470, 3409855158), a(1501505948, 4234509866), a(1607167915, 987167468), a(1816402316, 1246189591)], v = [], w = 0; 80 > w; w++) v[w] = a();
    e = e.SHA512 = r.extend({
        _doReset: function() {
            this._hash = new T.init([new d.init(1779033703, 4089235720), new d.init(3144134277, 2227873595), new d.init(1013904242, 4271175723), new d.init(2773480762, 1595750129), new d.init(1359893119, 2917565137), new d.init(2600822924, 725511199), new d.init(528734635, 4215389547), new d.init(1541459225, 327033209)])
        },
        _doProcessBlock: function(a, d) {
            for (var f = this._hash.words,
            F = f[0], e = f[1], n = f[2], r = f[3], G = f[4], H = f[5], I = f[6], f = f[7], w = F.high, J = F.low, X = e.high, K = e.low, Y = n.high, L = n.low, Z = r.high, M = r.low, $ = G.high, N = G.low, aa = H.high, O = H.low, ba = I.high, P = I.low, ca = f.high, Q = f.low, k = w, g = J, z = X, x = K, A = Y, y = L, U = Z, B = M, l = $, h = N, R = aa, C = O, S = ba, D = P, V = ca, E = Q, m = 0; 80 > m; m++) {
                var s = v[m];
                if (16 > m) var j = s.high = a[d + 2 * m] | 0,
                b = s.low = a[d + 2 * m + 1] | 0;
                else {
                    var j = v[m - 15],
                    b = j.high,
                    p = j.low,
                    j = (b >>> 1 | p << 31) ^ (b >>> 8 | p << 24) ^ b >>> 7,
                    p = (p >>> 1 | b << 31) ^ (p >>> 8 | b << 24) ^ (p >>> 7 | b << 25),
                    u = v[m - 2],
                    b = u.high,
                    c = u.low,
                    u = (b >>> 19 | c << 13) ^ (b << 3 | c >>> 29) ^ b >>> 6,
                    c = (c >>> 19 | b << 13) ^ (c << 3 | b >>> 29) ^ (c >>> 6 | b << 26),
                    b = v[m - 7],
                    W = b.high,
                    t = v[m - 16],
                    q = t.high,
                    t = t.low,
                    b = p + b.low,
                    j = j + W + (b >>> 0 < p >>> 0 ? 1 : 0),
                    b = b + c,
                    j = j + u + (b >>> 0 < c >>> 0 ? 1 : 0),
                    b = b + t,
                    j = j + q + (b >>> 0 < t >>> 0 ? 1 : 0);
                    s.high = j;
                    s.low = b
                }
                var W = l & R ^ ~l & S,
                t = h & C ^ ~h & D,
                s = k & z ^ k & A ^ z & A,
                T = g & x ^ g & y ^ x & y,
                p = (k >>> 28 | g << 4) ^ (k << 30 | g >>> 2) ^ (k << 25 | g >>> 7),
                u = (g >>> 28 | k << 4) ^ (g << 30 | k >>> 2) ^ (g << 25 | k >>> 7),
                c = ea[m],
                fa = c.high,
                da = c.low,
                c = E + ((h >>> 14 | l << 18) ^ (h >>> 18 | l << 14) ^ (h << 23 | l >>> 9)),
                q = V + ((l >>> 14 | h << 18) ^ (l >>> 18 | h << 14) ^ (l << 23 | h >>> 9)) + (c >>> 0 < E >>> 0 ? 1 : 0),
                c = c + t,
                q = q + W + (c >>> 0 < t >>> 0 ? 1 : 0),
                c = c + da,
                q = q + fa + (c >>> 0 < da >>> 0 ? 1 : 0),
                c = c + b,
                q = q + j + (c >>> 0 < b >>> 0 ? 1 : 0),
                b = u + T,
                s = p + s + (b >>> 0 < u >>> 0 ? 1 : 0),
                V = S,
                E = D,
                S = R,
                D = C,
                R = l,
                C = h,
                h = B + c | 0,
                l = U + q + (h >>> 0 < B >>> 0 ? 1 : 0) | 0,
                U = A,
                B = y,
                A = z,
                y = x,
                z = k,
                x = g,
                g = c + b | 0,
                k = q + s + (g >>> 0 < c >>> 0 ? 1 : 0) | 0
            }
            J = F.low = J + g;
            F.high = w + k + (J >>> 0 < g >>> 0 ? 1 : 0);
            K = e.low = K + x;
            e.high = X + z + (K >>> 0 < x >>> 0 ? 1 : 0);
            L = n.low = L + y;
            n.high = Y + A + (L >>> 0 < y >>> 0 ? 1 : 0);
            M = r.low = M + B;
            r.high = Z + U + (M >>> 0 < B >>> 0 ? 1 : 0);
            N = G.low = N + h;
            G.high = $ + l + (N >>> 0 < h >>> 0 ? 1 : 0);
            O = H.low = O + C;
            H.high = aa + R + (O >>> 0 < C >>> 0 ? 1 : 0);
            P = I.low = P + D;
            I.high = ba + S + (P >>> 0 < D >>> 0 ? 1 : 0);
            Q = f.low = Q + E;
            f.high = ca + V + (Q >>> 0 < E >>> 0 ? 1 : 0)
        },
        _doFinalize: function() {
            var a = this._data,
            d = a.words,
            f = 8 * this._nDataBytes,
            e = 8 * a.sigBytes;
            d[e >>> 5] |= 128 << 24 - e % 32;
            d[(e + 128 >>> 10 << 5) + 30] = Math.floor(f / 4294967296);
            d[(e + 128 >>> 10 << 5) + 31] = f;
            a.sigBytes = 4 * d.length;
            this._process();
            return this._hash.toX32()
        },
        clone: function() {
            var a = r.clone.call(this);
            a._hash = this._hash.clone();
            return a
        },
        blockSize: 32
    });
    n.SHA512 = r._createHelper(e);
    n.HmacSHA512 = r._createHmacHelper(e)
})();

(function() {
    var c = CryptoJS,
    a = c.x64,
    b = a.Word,
    e = a.WordArray,
    a = c.algo,
    d = a.SHA512,
    a = a.SHA384 = d.extend({
        _doReset: function() {
            this._hash = new e.init([new b.init(3418070365, 3238371032), new b.init(1654270250, 914150663), new b.init(2438529370, 812702999), new b.init(355462360, 4144912697), new b.init(1731405415, 4290775857), new b.init(2394180231, 1750603025), new b.init(3675008525, 1694076839), new b.init(1203062813, 3204075428)])
        },
        _doFinalize: function() {
            var a = d._doFinalize.call(this);
            a.sigBytes -= 16;
            return a
        }
    });
    c.SHA384 = d._createHelper(a);
    c.HmacSHA384 = d._createHmacHelper(a)
})();

(function() {
    var q = CryptoJS,
    d = q.lib,
    n = d.WordArray,
    p = d.Hasher,
    d = q.algo,
    x = n.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
    y = n.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
    z = n.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
    A = n.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
    B = n.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
    C = n.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
    d = d.RIPEMD160 = p.extend({
        _doReset: function() {
            this._hash = n.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
        },
        _doProcessBlock: function(e, v) {
            for (var b = 0; 16 > b; b++) {
                var c = v + b,
                f = e[c];
                e[c] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360
            }
            var c = this._hash.words,
            f = B.words,
            d = C.words,
            n = x.words,
            q = y.words,
            p = z.words,
            w = A.words,
            t, g, h, j, r, u, k, l, m, s;
            u = t = c[0];
            k = g = c[1];
            l = h = c[2];
            m = j = c[3];
            s = r = c[4];
            for (var a, b = 0; 80 > b; b += 1) a = t + e[v + n[b]] | 0,
            a = 16 > b ? a + ((g ^ h ^ j) + f[0]) : 32 > b ? a + ((g & h | ~g & j) + f[1]) : 48 > b ? a + (((g | ~h) ^ j) + f[2]) : 64 > b ? a + ((g & j | h & ~j) + f[3]) : a + ((g ^ (h | ~j)) + f[4]),
            a |= 0,
            a = a << p[b] | a >>> 32 - p[b],
            a = a + r | 0,
            t = r,
            r = j,
            j = h << 10 | h >>> 22,
            h = g,
            g = a,
            a = u + e[v + q[b]] | 0,
            a = 16 > b ? a + ((k ^ (l | ~m)) + d[0]) : 32 > b ? a + ((k & m | l & ~m) + d[1]) : 48 > b ? a + (((k | ~l) ^ m) + d[2]) : 64 > b ? a + ((k & l | ~k & m) + d[3]) : a + ((k ^ l ^ m) + d[4]),
            a |= 0,
            a = a << w[b] | a >>> 32 - w[b],
            a = a + s | 0,
            u = s,
            s = m,
            m = l << 10 | l >>> 22,
            l = k,
            k = a;
            a = c[1] + h + m | 0;
            c[1] = c[2] + j + s | 0;
            c[2] = c[3] + r + u | 0;
            c[3] = c[4] + t + k | 0;
            c[4] = c[0] + g + l | 0;
            c[0] = a
        },
        _doFinalize: function() {
            var e = this._data,
            d = e.words,
            b = 8 * this._nDataBytes,
            c = 8 * e.sigBytes;
            d[c >>> 5] |= 128 << 24 - c % 32;
            d[(c + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360;
            e.sigBytes = 4 * (d.length + 1);
            this._process();
            e = this._hash;
            d = e.words;
            for (b = 0; 5 > b; b++) c = d[b],
            d[b] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
            return e
        },
        clone: function() {
            var d = p.clone.call(this);
            d._hash = this._hash.clone();
            return d
        }
    });
    q.RIPEMD160 = p._createHelper(d);
    q.HmacRIPEMD160 = p._createHmacHelper(d)
})(Math);

/*
CryptoJS v3.1.2 hmac.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function() {
    var c = CryptoJS,
    k = c.enc.Utf8;
    c.algo.HMAC = c.lib.Base.extend({
        init: function(a, b) {
            a = this._hasher = new a.init;
            "string" == typeof b && (b = k.parse(b));
            var c = a.blockSize,
            e = 4 * c;
            b.sigBytes > e && (b = a.finalize(b));
            b.clamp();
            for (var f = this._oKey = b.clone(), g = this._iKey = b.clone(), h = f.words, j = g.words, d = 0; d < c; d++) h[d] ^= 1549556828,
            j[d] ^= 909522486;
            f.sigBytes = g.sigBytes = e;
            this.reset()
        },
        reset: function() {
            var a = this._hasher;
            a.reset();
            a.update(this._iKey)
        },
        update: function(a) {
            this._hasher.update(a);
            return this
        },
        finalize: function(a) {
            var b = this._hasher;
            a = b.finalize(a);
            b.reset();
            return b.finalize(this._oKey.clone().concat(a))
        }
    })
})();

/*
CryptoJS v3.1.2 pbkdf2-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function() {
    var b = CryptoJS,
    a = b.lib,
    d = a.Base,
    m = a.WordArray,
    a = b.algo,
    q = a.HMAC,
    l = a.PBKDF2 = d.extend({
        cfg: d.extend({
            keySize: 4,
            hasher: a.SHA1,
            iterations: 1
        }),
        init: function(a) {
            this.cfg = this.cfg.extend(a)
        },
        compute: function(a, b) {
            for (var c = this.cfg,
            f = q.create(c.hasher, a), g = m.create(), d = m.create([1]), l = g.words, r = d.words, n = c.keySize, c = c.iterations; l.length < n;) {
                var h = f.update(b).finalize(d);
                f.reset();
                for (var j = h.words,
                s = j.length,
                k = h,
                p = 1; p < c; p++) {
                    k = f.finalize(k);
                    f.reset();
                    for (var t = k.words,
                    e = 0; e < s; e++) j[e] ^= t[e]
                }
                g.concat(h);
                r[0]++
            }
            g.sigBytes = 4 * n;
            return g
        }
    });
    b.PBKDF2 = function(a, b, c) {
        return l.create(c).compute(a, b)
    }
})();

/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(d) {
    var b;
    var e;
    var a = "";
    for (b = 0; b + 3 <= d.length; b += 3) {
        e = parseInt(d.substring(b, b + 3), 16);
        a += b64map.charAt(e >> 6) + b64map.charAt(e & 63)
    }
    if (b + 1 == d.length) {
        e = parseInt(d.substring(b, b + 1), 16);
        a += b64map.charAt(e << 2)
    } else {
        if (b + 2 == d.length) {
            e = parseInt(d.substring(b, b + 2), 16);
            a += b64map.charAt(e >> 2) + b64map.charAt((e & 3) << 4)
        }
    }
    if (b64pad) {
        while ((a.length & 3) > 0) {
            a += b64pad
        }
    }
    return a
}
function b64tohex(f) {
    var d = "";
    var e;
    var b = 0;
    var c;
    var a;
    for (e = 0; e < f.length; ++e) {
        if (f.charAt(e) == b64pad) {
            break
        }
        a = b64map.indexOf(f.charAt(e));
        if (a < 0) {
            continue
        }
        if (b == 0) {
            d += int2char(a >> 2);
            c = a & 3;
            b = 1
        } else {
            if (b == 1) {
                d += int2char((c << 2) | (a >> 4));
                c = a & 15;
                b = 2
            } else {
                if (b == 2) {
                    d += int2char(c);
                    d += int2char(a >> 2);
                    c = a & 3;
                    b = 3
                } else {
                    d += int2char((c << 2) | (a >> 4));
                    d += int2char(a & 15);
                    b = 0
                }
            }
        }
    }
    if (b == 1) {
        d += int2char(c << 2)
    }
    return d
}
function b64toBA(e) {
    var d = b64tohex(e);
    var c;
    var b = new Array();
    for (c = 0; 2 * c < d.length; ++c) {
        b[c] = parseInt(d.substring(2 * c, 2 * c + 2), 16)
    }
    return b
};
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var dbits;
var canary = 244837814094590;
var j_lm = ((canary & 16777215) == 15715070);
function BigInteger(e, d, f) {
    if (e != null) {
        if ("number" == typeof e) {
            this.fromNumber(e, d, f)
        } else {
            if (d == null && "string" != typeof e) {
                this.fromString(e, 256)
            } else {
                this.fromString(e, d)
            }
        }
    }
}
function nbi() {
    return new BigInteger(null)
}
function am1(f, a, b, e, h, g) {
    while (--g >= 0) {
        var d = a * this[f++] + b[e] + h;
        h = Math.floor(d / 67108864);
        b[e++] = d & 67108863
    }
    return h
}
function am2(f, q, r, e, o, a) {
    var k = q & 32767,
    p = q >> 15;
    while (--a >= 0) {
        var d = this[f] & 32767;
        var g = this[f++] >> 15;
        var b = p * d + g * k;
        d = k * d + ((b & 32767) << 15) + r[e] + (o & 1073741823);
        o = (d >>> 30) + (b >>> 15) + p * g + (o >>> 30);
        r[e++] = d & 1073741823
    }
    return o
}
function am3(f, q, r, e, o, a) {
    var k = q & 16383,
    p = q >> 14;
    while (--a >= 0) {
        var d = this[f] & 16383;
        var g = this[f++] >> 14;
        var b = p * d + g * k;
        d = k * d + ((b & 16383) << 14) + r[e] + o;
        o = (d >> 28) + (b >> 14) + p * g;
        r[e++] = d & 268435455
    }
    return o
}
if (j_lm && (navigator2.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30
} else {
    if (j_lm && (navigator2.appName != "Netscape")) {
        BigInteger.prototype.am = am1;
        dbits = 26
    } else {
        BigInteger.prototype.am = am3;
        dbits = 28
    }
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv
}
function int2char(a) {
    return BI_RM.charAt(a)
}
function intAt(b, a) {
    var d = BI_RC[b.charCodeAt(a)];
    return (d == null) ? -1 : d
}
function bnpCopyTo(b) {
    for (var a = this.t - 1; a >= 0; --a) {
        b[a] = this[a]
    }
    b.t = this.t;
    b.s = this.s
}
function bnpFromInt(a) {
    this.t = 1;
    this.s = (a < 0) ? -1 : 0;
    if (a > 0) {
        this[0] = a
    } else {
        if (a < -1) {
            this[0] = a + this.DV
        } else {
            this.t = 0
        }
    }
}
function nbv(a) {
    var b = nbi();
    b.fromInt(a);
    return b
}
function bnpFromString(h, c) {
    var e;
    if (c == 16) {
        e = 4
    } else {
        if (c == 8) {
            e = 3
        } else {
            if (c == 256) {
                e = 8
            } else {
                if (c == 2) {
                    e = 1
                } else {
                    if (c == 32) {
                        e = 5
                    } else {
                        if (c == 4) {
                            e = 2
                        } else {
                            this.fromRadix(h, c);
                            return
                        }
                    }
                }
            }
        }
    }
    this.t = 0;
    this.s = 0;
    var g = h.length,
    d = false,
    f = 0;
    while (--g >= 0) {
        var a = (e == 8) ? h[g] & 255 : intAt(h, g);
        if (a < 0) {
            if (h.charAt(g) == "-") {
                d = true
            }
            continue
        }
        d = false;
        if (f == 0) {
            this[this.t++] = a
        } else {
            if (f + e > this.DB) {
                this[this.t - 1] |= (a & ((1 << (this.DB - f)) - 1)) << f;
                this[this.t++] = (a >> (this.DB - f))
            } else {
                this[this.t - 1] |= a << f
            }
        }
        f += e;
        if (f >= this.DB) {
            f -= this.DB
        }
    }
    if (e == 8 && (h[0] & 128) != 0) {
        this.s = -1;
        if (f > 0) {
            this[this.t - 1] |= ((1 << (this.DB - f)) - 1) << f
        }
    }
    this.clamp();
    if (d) {
        BigInteger.ZERO.subTo(this, this)
    }
}
function bnpClamp() {
    var a = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == a) {--this.t
    }
}
function bnToString(c) {
    if (this.s < 0) {
        return "-" + this.negate().toString(c)
    }
    var e;
    if (c == 16) {
        e = 4
    } else {
        if (c == 8) {
            e = 3
        } else {
            if (c == 2) {
                e = 1
            } else {
                if (c == 32) {
                    e = 5
                } else {
                    if (c == 4) {
                        e = 2
                    } else {
                        return this.toRadix(c)
                    }
                }
            }
        }
    }
    var g = (1 << e) - 1,
    l,
    a = false,
    h = "",
    f = this.t;
    var j = this.DB - (f * this.DB) % e;
    if (f-->0) {
        if (j < this.DB && (l = this[f] >> j) > 0) {
            a = true;
            h = int2char(l)
        }
        while (f >= 0) {
            if (j < e) {
                l = (this[f] & ((1 << j) - 1)) << (e - j);
                l |= this[--f] >> (j += this.DB - e)
            } else {
                l = (this[f] >> (j -= e)) & g;
                if (j <= 0) {
                    j += this.DB; --f
                }
            }
            if (l > 0) {
                a = true
            }
            if (a) {
                h += int2char(l)
            }
        }
    }
    return a ? h: "0"
}
function bnNegate() {
    var a = nbi();
    BigInteger.ZERO.subTo(this, a);
    return a
}
function bnAbs() {
    return (this.s < 0) ? this.negate() : this
}
function bnCompareTo(b) {
    var d = this.s - b.s;
    if (d != 0) {
        return d
    }
    var c = this.t;
    d = c - b.t;
    if (d != 0) {
        return (this.s < 0) ? -d: d
    }
    while (--c >= 0) {
        if ((d = this[c] - b[c]) != 0) {
            return d
        }
    }
    return 0
}
function nbits(a) {
    var c = 1,
    b;
    if ((b = a >>> 16) != 0) {
        a = b;
        c += 16
    }
    if ((b = a >> 8) != 0) {
        a = b;
        c += 8
    }
    if ((b = a >> 4) != 0) {
        a = b;
        c += 4
    }
    if ((b = a >> 2) != 0) {
        a = b;
        c += 2
    }
    if ((b = a >> 1) != 0) {
        a = b;
        c += 1
    }
    return c
}
function bnBitLength() {
    if (this.t <= 0) {
        return 0
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM))
}
function bnpDLShiftTo(c, b) {
    var a;
    for (a = this.t - 1; a >= 0; --a) {
        b[a + c] = this[a]
    }
    for (a = c - 1; a >= 0; --a) {
        b[a] = 0
    }
    b.t = this.t + c;
    b.s = this.s
}
function bnpDRShiftTo(c, b) {
    for (var a = c; a < this.t; ++a) {
        b[a - c] = this[a]
    }
    b.t = Math.max(this.t - c, 0);
    b.s = this.s
}
function bnpLShiftTo(j, e) {
    var b = j % this.DB;
    var a = this.DB - b;
    var g = (1 << a) - 1;
    var f = Math.floor(j / this.DB),
    h = (this.s << b) & this.DM,
    d;
    for (d = this.t - 1; d >= 0; --d) {
        e[d + f + 1] = (this[d] >> a) | h;
        h = (this[d] & g) << b
    }
    for (d = f - 1; d >= 0; --d) {
        e[d] = 0
    }
    e[f] = h;
    e.t = this.t + f + 1;
    e.s = this.s;
    e.clamp()
}
function bnpRShiftTo(g, d) {
    d.s = this.s;
    var e = Math.floor(g / this.DB);
    if (e >= this.t) {
        d.t = 0;
        return
    }
    var b = g % this.DB;
    var a = this.DB - b;
    var f = (1 << b) - 1;
    d[0] = this[e] >> b;
    for (var c = e + 1; c < this.t; ++c) {
        d[c - e - 1] |= (this[c] & f) << a;
        d[c - e] = this[c] >> b
    }
    if (b > 0) {
        d[this.t - e - 1] |= (this.s & f) << a
    }
    d.t = this.t - e;
    d.clamp()
}
function bnpSubTo(d, f) {
    var e = 0,
    g = 0,
    b = Math.min(d.t, this.t);
    while (e < b) {
        g += this[e] - d[e];
        f[e++] = g & this.DM;
        g >>= this.DB
    }
    if (d.t < this.t) {
        g -= d.s;
        while (e < this.t) {
            g += this[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g += this.s
    } else {
        g += this.s;
        while (e < d.t) {
            g -= d[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g -= d.s
    }
    f.s = (g < 0) ? -1 : 0;
    if (g < -1) {
        f[e++] = this.DV + g
    } else {
        if (g > 0) {
            f[e++] = g
        }
    }
    f.t = e;
    f.clamp()
}
function bnpMultiplyTo(c, e) {
    var b = this.abs(),
    f = c.abs();
    var d = b.t;
    e.t = d + f.t;
    while (--d >= 0) {
        e[d] = 0
    }
    for (d = 0; d < f.t; ++d) {
        e[d + b.t] = b.am(0, f[d], e, d, 0, b.t)
    }
    e.s = 0;
    e.clamp();
    if (this.s != c.s) {
        BigInteger.ZERO.subTo(e, e)
    }
}
function bnpSquareTo(d) {
    var a = this.abs();
    var b = d.t = 2 * a.t;
    while (--b >= 0) {
        d[b] = 0
    }
    for (b = 0; b < a.t - 1; ++b) {
        var e = a.am(b, a[b], d, 2 * b, 0, 1);
        if ((d[b + a.t] += a.am(b + 1, 2 * a[b], d, 2 * b + 1, e, a.t - b - 1)) >= a.DV) {
            d[b + a.t] -= a.DV;
            d[b + a.t + 1] = 1
        }
    }
    if (d.t > 0) {
        d[d.t - 1] += a.am(b, a[b], d, 2 * b, 0, 1)
    }
    d.s = 0;
    d.clamp()
}
function bnpDivRemTo(n, h, g) {
    var w = n.abs();
    if (w.t <= 0) {
        return
    }
    var k = this.abs();
    if (k.t < w.t) {
        if (h != null) {
            h.fromInt(0)
        }
        if (g != null) {
            this.copyTo(g)
        }
        return
    }
    if (g == null) {
        g = nbi()
    }
    var d = nbi(),
    a = this.s,
    l = n.s;
    var v = this.DB - nbits(w[w.t - 1]);
    if (v > 0) {
        w.lShiftTo(v, d);
        k.lShiftTo(v, g)
    } else {
        w.copyTo(d);
        k.copyTo(g)
    }
    var p = d.t;
    var b = d[p - 1];
    if (b == 0) {
        return
    }
    var o = b * (1 << this.F1) + ((p > 1) ? d[p - 2] >> this.F2: 0);
    var A = this.FV / o,
    z = (1 << this.F1) / o,
    x = 1 << this.F2;
    var u = g.t,
    s = u - p,
    f = (h == null) ? nbi() : h;
    d.dlShiftTo(s, f);
    if (g.compareTo(f) >= 0) {
        g[g.t++] = 1;
        g.subTo(f, g)
    }
    BigInteger.ONE.dlShiftTo(p, f);
    f.subTo(d, d);
    while (d.t < p) {
        d[d.t++] = 0
    }
    while (--s >= 0) {
        var c = (g[--u] == b) ? this.DM: Math.floor(g[u] * A + (g[u - 1] + x) * z);
        if ((g[u] += d.am(0, c, g, s, 0, p)) < c) {
            d.dlShiftTo(s, f);
            g.subTo(f, g);
            while (g[u] < --c) {
                g.subTo(f, g)
            }
        }
    }
    if (h != null) {
        g.drShiftTo(p, h);
        if (a != l) {
            BigInteger.ZERO.subTo(h, h)
        }
    }
    g.t = p;
    g.clamp();
    if (v > 0) {
        g.rShiftTo(v, g)
    }
    if (a < 0) {
        BigInteger.ZERO.subTo(g, g)
    }
}
function bnMod(b) {
    var c = nbi();
    this.abs().divRemTo(b, null, c);
    if (this.s < 0 && c.compareTo(BigInteger.ZERO) > 0) {
        b.subTo(c, c)
    }
    return c
}
function Classic(a) {
    this.m = a
}
function cConvert(a) {
    if (a.s < 0 || a.compareTo(this.m) >= 0) {
        return a.mod(this.m)
    } else {
        return a
    }
}
function cRevert(a) {
    return a
}
function cReduce(a) {
    a.divRemTo(this.m, null, a)
}
function cMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}
function cSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
    if (this.t < 1) {
        return 0
    }
    var a = this[0];
    if ((a & 1) == 0) {
        return 0
    }
    var b = a & 3;
    b = (b * (2 - (a & 15) * b)) & 15;
    b = (b * (2 - (a & 255) * b)) & 255;
    b = (b * (2 - (((a & 65535) * b) & 65535))) & 65535;
    b = (b * (2 - a * b % this.DV)) % this.DV;
    return (b > 0) ? this.DV - b: -b
}
function Montgomery(a) {
    this.m = a;
    this.mp = a.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << (a.DB - 15)) - 1;
    this.mt2 = 2 * a.t
}
function montConvert(a) {
    var b = nbi();
    a.abs().dlShiftTo(this.m.t, b);
    b.divRemTo(this.m, null, b);
    if (a.s < 0 && b.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(b, b)
    }
    return b
}
function montRevert(a) {
    var b = nbi();
    a.copyTo(b);
    this.reduce(b);
    return b
}
function montReduce(a) {
    while (a.t <= this.mt2) {
        a[a.t++] = 0
    }
    for (var c = 0; c < this.m.t; ++c) {
        var b = a[c] & 32767;
        var d = (b * this.mpl + (((b * this.mph + (a[c] >> 15) * this.mpl) & this.um) << 15)) & a.DM;
        b = c + this.m.t;
        a[b] += this.m.am(0, d, a, c, 0, this.m.t);
        while (a[b] >= a.DV) {
            a[b] -= a.DV;
            a[++b]++
        }
    }
    a.clamp();
    a.drShiftTo(this.m.t, a);
    if (a.compareTo(this.m) >= 0) {
        a.subTo(this.m, a)
    }
}
function montSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
function montMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0
}
function bnpExp(h, j) {
    if (h > 4294967295 || h < 1) {
        return BigInteger.ONE
    }
    var f = nbi(),
    a = nbi(),
    d = j.convert(this),
    c = nbits(h) - 1;
    d.copyTo(f);
    while (--c >= 0) {
        j.sqrTo(f, a);
        if ((h & (1 << c)) > 0) {
            j.mulTo(a, d, f)
        } else {
            var b = f;
            f = a;
            a = b
        }
    }
    return j.revert(f)
}
function bnModPowInt(b, a) {
    var c;
    if (b < 256 || a.isEven()) {
        c = new Classic(a)
    } else {
        c = new Montgomery(a)
    }
    return this.exp(b, c)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function bnClone() {
    var a = nbi();
    this.copyTo(a);
    return a
}
function bnIntValue() {
    if (this.s < 0) {
        if (this.t == 1) {
            return this[0] - this.DV
        } else {
            if (this.t == 0) {
                return - 1
            }
        }
    } else {
        if (this.t == 1) {
            return this[0]
        } else {
            if (this.t == 0) {
                return 0
            }
        }
    }
    return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0]
}
function bnByteValue() {
    return (this.t == 0) ? this.s: (this[0] << 24) >> 24
}
function bnShortValue() {
    return (this.t == 0) ? this.s: (this[0] << 16) >> 16
}
function bnpChunkSize(a) {
    return Math.floor(Math.LN2 * this.DB / Math.log(a))
}
function bnSigNum() {
    if (this.s < 0) {
        return - 1
    } else {
        if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) {
            return 0
        } else {
            return 1
        }
    }
}
function bnpToRadix(c) {
    if (c == null) {
        c = 10
    }
    if (this.signum() == 0 || c < 2 || c > 36) {
        return "0"
    }
    var f = this.chunkSize(c);
    var e = Math.pow(c, f);
    var i = nbv(e),
    j = nbi(),
    h = nbi(),
    g = "";
    this.divRemTo(i, j, h);
    while (j.signum() > 0) {
        g = (e + h.intValue()).toString(c).substr(1) + g;
        j.divRemTo(i, j, h)
    }
    return h.intValue().toString(c) + g
}
function bnpFromRadix(m, h) {
    this.fromInt(0);
    if (h == null) {
        h = 10
    }
    var f = this.chunkSize(h);
    var g = Math.pow(h, f),
    e = false,
    a = 0,
    l = 0;
    for (var c = 0; c < m.length; ++c) {
        var k = intAt(m, c);
        if (k < 0) {
            if (m.charAt(c) == "-" && this.signum() == 0) {
                e = true
            }
            continue
        }
        l = h * l + k;
        if (++a >= f) {
            this.dMultiply(g);
            this.dAddOffset(l, 0);
            a = 0;
            l = 0
        }
    }
    if (a > 0) {
        this.dMultiply(Math.pow(h, a));
        this.dAddOffset(l, 0)
    }
    if (e) {
        BigInteger.ZERO.subTo(this, this)
    }
}
function bnpFromNumber(f, e, h) {
    if ("number" == typeof e) {
        if (f < 2) {
            this.fromInt(1)
        } else {
            this.fromNumber(f, h);
            if (!this.testBit(f - 1)) {
                this.bitwiseTo(BigInteger.ONE.shiftLeft(f - 1), op_or, this)
            }
            if (this.isEven()) {
                this.dAddOffset(1, 0)
            }
            while (!this.isProbablePrime(e)) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > f) {
                    this.subTo(BigInteger.ONE.shiftLeft(f - 1), this)
                }
            }
        }
    } else {
        var d = new Array(),
        g = f & 7;
        d.length = (f >> 3) + 1;
        e.nextBytes(d);
        if (g > 0) {
            d[0] &= ((1 << g) - 1)
        } else {
            d[0] = 0
        }
        this.fromString(d, 256)
    }
}
function bnToByteArray() {
    var b = this.t,
    c = new Array();
    c[0] = this.s;
    var e = this.DB - (b * this.DB) % 8,
    f,
    a = 0;
    if (b-->0) {
        if (e < this.DB && (f = this[b] >> e) != (this.s & this.DM) >> e) {
            c[a++] = f | (this.s << (this.DB - e))
        }
        while (b >= 0) {
            if (e < 8) {
                f = (this[b] & ((1 << e) - 1)) << (8 - e);
                f |= this[--b] >> (e += this.DB - 8)
            } else {
                f = (this[b] >> (e -= 8)) & 255;
                if (e <= 0) {
                    e += this.DB; --b
                }
            }
            if ((f & 128) != 0) {
                f |= -256
            }
            if (a == 0 && (this.s & 128) != (f & 128)) {++a
            }
            if (a > 0 || f != this.s) {
                c[a++] = f
            }
        }
    }
    return c
}
function bnEquals(b) {
    return (this.compareTo(b) == 0)
}
function bnMin(b) {
    return (this.compareTo(b) < 0) ? this: b
}
function bnMax(b) {
    return (this.compareTo(b) > 0) ? this: b
}
function bnpBitwiseTo(c, h, e) {
    var d, g, b = Math.min(c.t, this.t);
    for (d = 0; d < b; ++d) {
        e[d] = h(this[d], c[d])
    }
    if (c.t < this.t) {
        g = c.s & this.DM;
        for (d = b; d < this.t; ++d) {
            e[d] = h(this[d], g)
        }
        e.t = this.t
    } else {
        g = this.s & this.DM;
        for (d = b; d < c.t; ++d) {
            e[d] = h(g, c[d])
        }
        e.t = c.t
    }
    e.s = h(this.s, c.s);
    e.clamp()
}
function op_and(a, b) {
    return a & b
}
function bnAnd(b) {
    var c = nbi();
    this.bitwiseTo(b, op_and, c);
    return c
}
function op_or(a, b) {
    return a | b
}
function bnOr(b) {
    var c = nbi();
    this.bitwiseTo(b, op_or, c);
    return c
}
function op_xor(a, b) {
    return a ^ b
}
function bnXor(b) {
    var c = nbi();
    this.bitwiseTo(b, op_xor, c);
    return c
}
function op_andnot(a, b) {
    return a & ~b
}
function bnAndNot(b) {
    var c = nbi();
    this.bitwiseTo(b, op_andnot, c);
    return c
}
function bnNot() {
    var b = nbi();
    for (var a = 0; a < this.t; ++a) {
        b[a] = this.DM & ~this[a]
    }
    b.t = this.t;
    b.s = ~this.s;
    return b
}
function bnShiftLeft(b) {
    var a = nbi();
    if (b < 0) {
        this.rShiftTo( - b, a)
    } else {
        this.lShiftTo(b, a)
    }
    return a
}
function bnShiftRight(b) {
    var a = nbi();
    if (b < 0) {
        this.lShiftTo( - b, a)
    } else {
        this.rShiftTo(b, a)
    }
    return a
}
function lbit(a) {
    if (a == 0) {
        return - 1
    }
    var b = 0;
    if ((a & 65535) == 0) {
        a >>= 16;
        b += 16
    }
    if ((a & 255) == 0) {
        a >>= 8;
        b += 8
    }
    if ((a & 15) == 0) {
        a >>= 4;
        b += 4
    }
    if ((a & 3) == 0) {
        a >>= 2;
        b += 2
    }
    if ((a & 1) == 0) {++b
    }
    return b
}
function bnGetLowestSetBit() {
    for (var a = 0; a < this.t; ++a) {
        if (this[a] != 0) {
            return a * this.DB + lbit(this[a])
        }
    }
    if (this.s < 0) {
        return this.t * this.DB
    }
    return - 1
}
function cbit(a) {
    var b = 0;
    while (a != 0) {
        a &= a - 1; ++b
    }
    return b
}
function bnBitCount() {
    var c = 0,
    a = this.s & this.DM;
    for (var b = 0; b < this.t; ++b) {
        c += cbit(this[b] ^ a)
    }
    return c
}
function bnTestBit(b) {
    var a = Math.floor(b / this.DB);
    if (a >= this.t) {
        return (this.s != 0)
    }
    return ((this[a] & (1 << (b % this.DB))) != 0)
}
function bnpChangeBit(c, b) {
    var a = BigInteger.ONE.shiftLeft(c);
    this.bitwiseTo(a, b, a);
    return a
}
function bnSetBit(a) {
    return this.changeBit(a, op_or)
}
function bnClearBit(a) {
    return this.changeBit(a, op_andnot)
}
function bnFlipBit(a) {
    return this.changeBit(a, op_xor)
}
function bnpAddTo(d, f) {
    var e = 0,
    g = 0,
    b = Math.min(d.t, this.t);
    while (e < b) {
        g += this[e] + d[e];
        f[e++] = g & this.DM;
        g >>= this.DB
    }
    if (d.t < this.t) {
        g += d.s;
        while (e < this.t) {
            g += this[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g += this.s
    } else {
        g += this.s;
        while (e < d.t) {
            g += d[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g += d.s
    }
    f.s = (g < 0) ? -1 : 0;
    if (g > 0) {
        f[e++] = g
    } else {
        if (g < -1) {
            f[e++] = this.DV + g
        }
    }
    f.t = e;
    f.clamp()
}
function bnAdd(b) {
    var c = nbi();
    this.addTo(b, c);
    return c
}
function bnSubtract(b) {
    var c = nbi();
    this.subTo(b, c);
    return c
}
function bnMultiply(b) {
    var c = nbi();
    this.multiplyTo(b, c);
    return c
}
function bnSquare() {
    var a = nbi();
    this.squareTo(a);
    return a
}
function bnDivide(b) {
    var c = nbi();
    this.divRemTo(b, c, null);
    return c
}
function bnRemainder(b) {
    var c = nbi();
    this.divRemTo(b, null, c);
    return c
}
function bnDivideAndRemainder(b) {
    var d = nbi(),
    c = nbi();
    this.divRemTo(b, d, c);
    return new Array(d, c)
}
function bnpDMultiply(a) {
    this[this.t] = this.am(0, a - 1, this, 0, 0, this.t); ++this.t;
    this.clamp()
}
function bnpDAddOffset(b, a) {
    if (b == 0) {
        return
    }
    while (this.t <= a) {
        this[this.t++] = 0
    }
    this[a] += b;
    while (this[a] >= this.DV) {
        this[a] -= this.DV;
        if (++a >= this.t) {
            this[this.t++] = 0
        }++this[a]
    }
}
function NullExp() {}
function nNop(a) {
    return a
}
function nMulTo(a, c, b) {
    a.multiplyTo(c, b)
}
function nSqrTo(a, b) {
    a.squareTo(b)
}
NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;
function bnPow(a) {
    return this.exp(a, new NullExp())
}
function bnpMultiplyLowerTo(b, f, e) {
    var d = Math.min(this.t + b.t, f);
    e.s = 0;
    e.t = d;
    while (d > 0) {
        e[--d] = 0
    }
    var c;
    for (c = e.t - this.t; d < c; ++d) {
        e[d + this.t] = this.am(0, b[d], e, d, 0, this.t)
    }
    for (c = Math.min(b.t, f); d < c; ++d) {
        this.am(0, b[d], e, d, 0, f - d)
    }
    e.clamp()
}
function bnpMultiplyUpperTo(b, e, d) {--e;
    var c = d.t = this.t + b.t - e;
    d.s = 0;
    while (--c >= 0) {
        d[c] = 0
    }
    for (c = Math.max(e - this.t, 0); c < b.t; ++c) {
        d[this.t + c - e] = this.am(e - c, b[c], d, 0, 0, this.t + c - e)
    }
    d.clamp();
    d.drShiftTo(1, d)
}
function Barrett(a) {
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * a.t, this.r2);
    this.mu = this.r2.divide(a);
    this.m = a
}
function barrettConvert(a) {
    if (a.s < 0 || a.t > 2 * this.m.t) {
        return a.mod(this.m)
    } else {
        if (a.compareTo(this.m) < 0) {
            return a
        } else {
            var b = nbi();
            a.copyTo(b);
            this.reduce(b);
            return b
        }
    }
}
function barrettRevert(a) {
    return a
}
function barrettReduce(a) {
    a.drShiftTo(this.m.t - 1, this.r2);
    if (a.t > this.m.t + 1) {
        a.t = this.m.t + 1;
        a.clamp()
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    while (a.compareTo(this.r2) < 0) {
        a.dAddOffset(1, this.m.t + 1)
    }
    a.subTo(this.r2, a);
    while (a.compareTo(this.m) >= 0) {
        a.subTo(this.m, a)
    }
}
function barrettSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
function barrettMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}
Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;
function bnModPow(q, f) {
    var o = q.bitLength(),
    h,
    b = nbv(1),
    v;
    if (o <= 0) {
        return b
    } else {
        if (o < 18) {
            h = 1
        } else {
            if (o < 48) {
                h = 3
            } else {
                if (o < 144) {
                    h = 4
                } else {
                    if (o < 768) {
                        h = 5
                    } else {
                        h = 6
                    }
                }
            }
        }
    }
    if (o < 8) {
        v = new Classic(f)
    } else {
        if (f.isEven()) {
            v = new Barrett(f)
        } else {
            v = new Montgomery(f)
        }
    }
    var p = new Array(),
    d = 3,
    s = h - 1,
    a = (1 << h) - 1;
    p[1] = v.convert(this);
    if (h > 1) {
        var A = nbi();
        v.sqrTo(p[1], A);
        while (d <= a) {
            p[d] = nbi();
            v.mulTo(A, p[d - 2], p[d]);
            d += 2
        }
    }
    var l = q.t - 1,
    x, u = true,
    c = nbi(),
    y;
    o = nbits(q[l]) - 1;
    while (l >= 0) {
        if (o >= s) {
            x = (q[l] >> (o - s)) & a
        } else {
            x = (q[l] & ((1 << (o + 1)) - 1)) << (s - o);
            if (l > 0) {
                x |= q[l - 1] >> (this.DB + o - s)
            }
        }
        d = h;
        while ((x & 1) == 0) {
            x >>= 1; --d
        }
        if ((o -= d) < 0) {
            o += this.DB; --l
        }
        if (u) {
            p[x].copyTo(b);
            u = false
        } else {
            while (d > 1) {
                v.sqrTo(b, c);
                v.sqrTo(c, b);
                d -= 2
            }
            if (d > 0) {
                v.sqrTo(b, c)
            } else {
                y = b;
                b = c;
                c = y
            }
            v.mulTo(c, p[x], b)
        }
        while (l >= 0 && (q[l] & (1 << o)) == 0) {
            v.sqrTo(b, c);
            y = b;
            b = c;
            c = y;
            if (--o < 0) {
                o = this.DB - 1; --l
            }
        }
    }
    return v.revert(b)
}
function bnGCD(c) {
    var b = (this.s < 0) ? this.negate() : this.clone();
    var h = (c.s < 0) ? c.negate() : c.clone();
    if (b.compareTo(h) < 0) {
        var e = b;
        b = h;
        h = e
    }
    var d = b.getLowestSetBit(),
    f = h.getLowestSetBit();
    if (f < 0) {
        return b
    }
    if (d < f) {
        f = d
    }
    if (f > 0) {
        b.rShiftTo(f, b);
        h.rShiftTo(f, h)
    }
    while (b.signum() > 0) {
        if ((d = b.getLowestSetBit()) > 0) {
            b.rShiftTo(d, b)
        }
        if ((d = h.getLowestSetBit()) > 0) {
            h.rShiftTo(d, h)
        }
        if (b.compareTo(h) >= 0) {
            b.subTo(h, b);
            b.rShiftTo(1, b)
        } else {
            h.subTo(b, h);
            h.rShiftTo(1, h)
        }
    }
    if (f > 0) {
        h.lShiftTo(f, h)
    }
    return h
}
function bnpModInt(e) {
    if (e <= 0) {
        return 0
    }
    var c = this.DV % e,
    b = (this.s < 0) ? e - 1 : 0;
    if (this.t > 0) {
        if (c == 0) {
            b = this[0] % e
        } else {
            for (var a = this.t - 1; a >= 0; --a) {
                b = (c * b + this[a]) % e
            }
        }
    }
    return b
}
function bnModInverse(f) {
    var j = f.isEven();
    if ((this.isEven() && j) || f.signum() == 0) {
        return BigInteger.ZERO
    }
    var i = f.clone(),
    h = this.clone();
    var g = nbv(1),
    e = nbv(0),
    l = nbv(0),
    k = nbv(1);
    while (i.signum() != 0) {
        while (i.isEven()) {
            i.rShiftTo(1, i);
            if (j) {
                if (!g.isEven() || !e.isEven()) {
                    g.addTo(this, g);
                    e.subTo(f, e)
                }
                g.rShiftTo(1, g)
            } else {
                if (!e.isEven()) {
                    e.subTo(f, e)
                }
            }
            e.rShiftTo(1, e)
        }
        while (h.isEven()) {
            h.rShiftTo(1, h);
            if (j) {
                if (!l.isEven() || !k.isEven()) {
                    l.addTo(this, l);
                    k.subTo(f, k)
                }
                l.rShiftTo(1, l)
            } else {
                if (!k.isEven()) {
                    k.subTo(f, k)
                }
            }
            k.rShiftTo(1, k)
        }
        if (i.compareTo(h) >= 0) {
            i.subTo(h, i);
            if (j) {
                g.subTo(l, g)
            }
            e.subTo(k, e)
        } else {
            h.subTo(i, h);
            if (j) {
                l.subTo(g, l)
            }
            k.subTo(e, k)
        }
    }
    if (h.compareTo(BigInteger.ONE) != 0) {
        return BigInteger.ZERO
    }
    if (k.compareTo(f) >= 0) {
        return k.subtract(f)
    }
    if (k.signum() < 0) {
        k.addTo(f, k)
    } else {
        return k
    }
    if (k.signum() < 0) {
        return k.add(f)
    } else {
        return k
    }
}
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
function bnIsProbablePrime(e) {
    var d, b = this.abs();
    if (b.t == 1 && b[0] <= lowprimes[lowprimes.length - 1]) {
        for (d = 0; d < lowprimes.length; ++d) {
            if (b[0] == lowprimes[d]) {
                return true
            }
        }
        return false
    }
    if (b.isEven()) {
        return false
    }
    d = 1;
    while (d < lowprimes.length) {
        var a = lowprimes[d],
        c = d + 1;
        while (c < lowprimes.length && a < lplim) {
            a *= lowprimes[c++]
        }
        a = b.modInt(a);
        while (d < c) {
            if (a % lowprimes[d++] == 0) {
                return false
            }
        }
    }
    return b.millerRabin(e)
}
function bnpMillerRabin(f) {
    var g = this.subtract(BigInteger.ONE);
    var c = g.getLowestSetBit();
    if (c <= 0) {
        return false
    }
    var h = g.shiftRight(c);
    f = (f + 1) >> 1;
    if (f > lowprimes.length) {
        f = lowprimes.length
    }
    var b = nbi();
    for (var e = 0; e < f; ++e) {
        b.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var l = b.modPow(h, this);
        if (l.compareTo(BigInteger.ONE) != 0 && l.compareTo(g) != 0) {
            var d = 1;
            while (d++<c && l.compareTo(g) != 0) {
                l = l.modPowInt(2, this);
                if (l.compareTo(BigInteger.ONE) == 0) {
                    return false
                }
            }
            if (l.compareTo(g) != 0) {
                return false
            }
        }
    }
    return true
}
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
BigInteger.prototype.square = bnSquare;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array()
}
function ARC4init(d) {
    var c, a, b;
    for (c = 0; c < 256; ++c) {
        this.S[c] = c
    }
    a = 0;
    for (c = 0; c < 256; ++c) {
        a = (a + this.S[c] + d[c % d.length]) & 255;
        b = this.S[c];
        this.S[c] = this.S[a];
        this.S[a] = b
    }
    this.i = 0;
    this.j = 0
}
function ARC4next() {
    var a;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    a = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = a;
    return this.S[(a + this.S[this.i]) & 255]
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;
function prng_newstate() {
    return new Arcfour()
}
var rng_psize = 256;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var rng_state;
var rng_pool;
var rng_pptr;
function rng_seed_int(a) {
    rng_pool[rng_pptr++] ^= a & 255;
    rng_pool[rng_pptr++] ^= (a >> 8) & 255;
    rng_pool[rng_pptr++] ^= (a >> 16) & 255;
    rng_pool[rng_pptr++] ^= (a >> 24) & 255;
    if (rng_pptr >= rng_psize) {
        rng_pptr -= rng_psize
    }
}
function rng_seed_time() {
    rng_seed_int(new Date().getTime())
}
if (rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if (window2.crypto && window2.crypto.getRandomValues) {
        var ua = new Uint8Array(32);
        window2.crypto.getRandomValues(ua);
        for (t = 0; t < 32; ++t) {
            rng_pool[rng_pptr++] = ua[t]
        }
    }
    if (navigator2.appName == "Netscape" && navigator2.appVersion < "5" && window2.crypto && window2.crypto.random) {
        var z = window2.crypto.random(32);
        for (t = 0; t < z.length; ++t) {
            rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
        }
    }
    while (rng_pptr < rng_psize) {
        t = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = t >>> 8;
        rng_pool[rng_pptr++] = t & 255
    }
    rng_pptr = 0;
    rng_seed_time()
}
function rng_get_byte() {
    if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
            rng_pool[rng_pptr] = 0
        }
        rng_pptr = 0
    }
    return rng_state.next()
}
function rng_get_bytes(b) {
    var a;
    for (a = 0; a < b.length; ++a) {
        b[a] = rng_get_byte()
    }
}
function SecureRandom() {}
SecureRandom.prototype.nextBytes = rng_get_bytes;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function parseBigInt(b, a) {
    return new BigInteger(b, a)
}
function linebrk(c, d) {
    var a = "";
    var b = 0;
    while (b + d < c.length) {
        a += c.substring(b, b + d) + "\n";
        b += d
    }
    return a + c.substring(b, c.length)
}
function byte2Hex(a) {
    if (a < 16) {
        return "0" + a.toString(16)
    } else {
        return a.toString(16)
    }
}
function pkcs1pad2(e, h) {
    if (h < e.length + 11) {
        console.log("Message too long for RSA")
        return null
    }
    var g = new Array();
    var d = e.length - 1;
    while (d >= 0 && h > 0) {
        var f = e.charCodeAt(d--);
        if (f < 128) {
            g[--h] = f
        } else {
            if ((f > 127) && (f < 2048)) {
                g[--h] = (f & 63) | 128;
                g[--h] = (f >> 6) | 192
            } else {
                g[--h] = (f & 63) | 128;
                g[--h] = ((f >> 6) & 63) | 128;
                g[--h] = (f >> 12) | 224
            }
        }
    }
    g[--h] = 0;
    var b = new SecureRandom();
    var a = new Array();
    while (h > 2) {
        a[0] = 0;
        while (a[0] == 0) {
            b.nextBytes(a)
        }
        g[--h] = a[0]
    }
    g[--h] = 2;
    g[--h] = 0;
    return new BigInteger(g)
}
function oaep_mgf1_arr(c, a, e) {
    var b = "",
    d = 0;
    while (b.length < a) {
        b += e(String.fromCharCode.apply(String, c.concat([(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255])));
        d += 1
    }
    return b
}
function oaep_pad(q, a, f, l) {
    var c = KJUR.crypto.MessageDigest;
    var o = KJUR.crypto.Util;
    var b = null;
    if (!f) {
        f = "sha1"
    }
    if (typeof f === "string") {
        b = c.getCanonicalAlgName(f);
        l = c.getHashLength(b);
        f = function(i) {
            return hextorstr(o.hashString(i, b))
        }
    }
    if (q.length + 2 * l + 2 > a) {
        throw "Message too long for RSA"
    }
    var k = "",
    e;
    for (e = 0; e < a - q.length - 2 * l - 2; e += 1) {
        k += "\x00"
    }
    var h = f("") + k + "\x01" + q;
    var g = new Array(l);
    new SecureRandom().nextBytes(g);
    var j = oaep_mgf1_arr(g, h.length, f);
    var p = [];
    for (e = 0; e < h.length; e += 1) {
        p[e] = h.charCodeAt(e) ^ j.charCodeAt(e)
    }
    var m = oaep_mgf1_arr(p, g.length, f);
    var d = [0];
    for (e = 0; e < g.length; e += 1) {
        d[e + 1] = g[e] ^ m.charCodeAt(e)
    }
    return new BigInteger(d.concat(p))
}
function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null
}
function RSASetPublic(b, a) {
    this.isPublic = true;
    this.isPrivate = false;
    if (typeof b !== "string") {
        this.n = b;
        this.e = a
    } else {
        if (b != null && a != null && b.length > 0 && a.length > 0) {
            this.n = parseBigInt(b, 16);
            this.e = parseInt(a, 16)
        } else {
            throw "Invalid RSA public key"
        }
    }
}
function RSADoPublic(a) {
    return a.modPowInt(this.e, this.n)
}
function RSAEncrypt(d) {
    var a = pkcs1pad2(d, (this.n.bitLength() + 7) >> 3);
    if (a == null) {
        return null
    }
    var e = this.doPublic(a);
    if (e == null) {
        return null
    }
    var b = e.toString(16);
    if ((b.length & 1) == 0) {
        return b
    } else {
        return "0" + b
    }
}
function RSAEncryptOAEP(f, e, b) {
    var a = oaep_pad(f, (this.n.bitLength() + 7) >> 3, e, b);
    if (a == null) {
        return null
    }
    var g = this.doPublic(a);
    if (g == null) {
        return null
    }
    var d = g.toString(16);
    if ((d.length & 1) == 0) {
        return d
    } else {
        return "0" + d
    }
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.encryptOAEP = RSAEncryptOAEP;
RSAKey.prototype.type = "RSA";
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function pkcs1unpad2(g, j) {
    var a = g.toByteArray();
    var f = 0;
    while (f < a.length && a[f] == 0) {++f
    }
    if (a.length - f != j - 1 || a[f] != 2) {
        return null
    }++f;
    while (a[f] != 0) {
        if (++f >= a.length) {
            return null
        }
    }
    var e = "";
    while (++f < a.length) {
        var h = a[f] & 255;
        if (h < 128) {
            e += String.fromCharCode(h)
        } else {
            if ((h > 191) && (h < 224)) {
                e += String.fromCharCode(((h & 31) << 6) | (a[f + 1] & 63)); ++f
            } else {
                e += String.fromCharCode(((h & 15) << 12) | ((a[f + 1] & 63) << 6) | (a[f + 2] & 63));
                f += 2
            }
        }
    }
    return e
}
function oaep_mgf1_str(c, a, e) {
    var b = "",
    d = 0;
    while (b.length < a) {
        b += e(c + String.fromCharCode.apply(String, [(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255]));
        d += 1
    }
    return b
}
function oaep_unpad(o, b, g, p) {
    var e = KJUR.crypto.MessageDigest;
    var r = KJUR.crypto.Util;
    var c = null;
    if (!g) {
        g = "sha1"
    }
    if (typeof g === "string") {
        c = e.getCanonicalAlgName(g);
        p = e.getHashLength(c);
        g = function(d) {
            return hextorstr(r.hashString(d, c))
        }
    }
    o = o.toByteArray();
    var h;
    for (h = 0; h < o.length; h += 1) {
        o[h] &= 255
    }
    while (o.length < b) {
        o.unshift(0)
    }
    o = String.fromCharCode.apply(String, o);
    if (o.length < 2 * p + 2) {
        throw "Cipher too short"
    }
    var f = o.substr(1, p);
    var s = o.substr(p + 1);
    var q = oaep_mgf1_str(s, p, g);
    var k = [],
    h;
    for (h = 0; h < f.length; h += 1) {
        k[h] = f.charCodeAt(h) ^ q.charCodeAt(h)
    }
    var l = oaep_mgf1_str(String.fromCharCode.apply(String, k), o.length - p, g);
    var j = [];
    for (h = 0; h < s.length; h += 1) {
        j[h] = s.charCodeAt(h) ^ l.charCodeAt(h)
    }
    j = String.fromCharCode.apply(String, j);
    if (j.substr(0, p) !== g("")) {
        throw "Hash mismatch"
    }
    j = j.substr(p);
    var a = j.indexOf("\x01");
    var m = (a != -1) ? j.substr(0, a).lastIndexOf("\x00") : -1;
    if (m + 1 != a) {
        throw "Malformed data"
    }
    return j.substr(a + 1)
}
function RSASetPrivate(c, a, b) {
    this.isPrivate = true;
    if (typeof c !== "string") {
        this.n = c;
        this.e = a;
        this.d = b
    } else {
        if (c != null && a != null && c.length > 0 && a.length > 0) {
            this.n = parseBigInt(c, 16);
            this.e = parseInt(a, 16);
            this.d = parseBigInt(b, 16)
        } else {
            alert("Invalid RSA private key")
        }
    }
}
function RSASetPrivateEx(g, d, e, c, b, a, h, f) {
    this.isPrivate = true;
    this.isPublic = false;
    if (g == null) {
        throw "RSASetPrivateEx N == null"
    }
    if (d == null) {
        throw "RSASetPrivateEx E == null"
    }
    if (g.length == 0) {
        throw "RSASetPrivateEx N.length == 0"
    }
    if (d.length == 0) {
        throw "RSASetPrivateEx E.length == 0"
    }
    if (g != null && d != null && g.length > 0 && d.length > 0) {
        this.n = parseBigInt(g, 16);
        this.e = parseInt(d, 16);
        this.d = parseBigInt(e, 16);
        this.p = parseBigInt(c, 16);
        this.q = parseBigInt(b, 16);
        this.dmp1 = parseBigInt(a, 16);
        this.dmq1 = parseBigInt(h, 16);
        this.coeff = parseBigInt(f, 16)
    } else {
        alert("Invalid RSA private key in RSASetPrivateEx")
    }
}
function RSAGenerate(b, i) {
    var a = new SecureRandom();
    var f = b >> 1;
    this.e = parseInt(i, 16);
    var c = new BigInteger(i, 16);
    for (;;) {
        for (;;) {
            this.p = new BigInteger(b - f, 1, a);
            if (this.p.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                break
            }
        }
        for (;;) {
            this.q = new BigInteger(f, 1, a);
            if (this.q.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                break
            }
        }
        if (this.p.compareTo(this.q) <= 0) {
            var h = this.p;
            this.p = this.q;
            this.q = h
        }
        var g = this.p.subtract(BigInteger.ONE);
        var d = this.q.subtract(BigInteger.ONE);
        var e = g.multiply(d);
        if (e.gcd(c).compareTo(BigInteger.ONE) == 0) {
            this.n = this.p.multiply(this.q);
            this.d = c.modInverse(e);
            this.dmp1 = this.d.mod(g);
            this.dmq1 = this.d.mod(d);
            this.coeff = this.q.modInverse(this.p);
            break
        }
    }
    this.isPrivate = true
}
function RSADoPrivate(a) {
    if (this.p == null || this.q == null) {
        return a.modPow(this.d, this.n)
    }
    var c = a.mod(this.p).modPow(this.dmp1, this.p);
    var b = a.mod(this.q).modPow(this.dmq1, this.q);
    while (c.compareTo(b) < 0) {
        c = c.add(this.p)
    }
    return c.subtract(b).multiply(this.coeff).mod(this.p).multiply(this.q).add(b)
}
function RSADecrypt(b) {
    var d = parseBigInt(b, 16);
    var a = this.doPrivate(d);
    if (a == null) {
        return null
    }
    return pkcs1unpad2(a, (this.n.bitLength() + 7) >> 3)
}
function RSADecryptOAEP(e, d, b) {
    var f = parseBigInt(e, 16);
    var a = this.doPrivate(f);
    if (a == null) {
        return null
    }
    return oaep_unpad(a, (this.n.bitLength() + 7) >> 3, d, b)
}
RSAKey.prototype.doPrivate = RSADoPrivate;
RSAKey.prototype.setPrivate = RSASetPrivate;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.generate = RSAGenerate;
RSAKey.prototype.decrypt = RSADecrypt;
RSAKey.prototype.decryptOAEP = RSADecryptOAEP;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function ECFieldElementFp(b, a) {
    this.x = a;
    this.q = b
}
function feFpEquals(a) {
    if (a == this) {
        return true
    }
    return (this.q.equals(a.q) && this.x.equals(a.x))
}
function feFpToBigInteger() {
    return this.x
}
function feFpNegate() {
    return new ECFieldElementFp(this.q, this.x.negate().mod(this.q))
}
function feFpAdd(a) {
    return new ECFieldElementFp(this.q, this.x.add(a.toBigInteger()).mod(this.q))
}
function feFpSubtract(a) {
    return new ECFieldElementFp(this.q, this.x.subtract(a.toBigInteger()).mod(this.q))
}
function feFpMultiply(a) {
    return new ECFieldElementFp(this.q, this.x.multiply(a.toBigInteger()).mod(this.q))
}
function feFpSquare() {
    return new ECFieldElementFp(this.q, this.x.square().mod(this.q))
}
function feFpDivide(a) {
    return new ECFieldElementFp(this.q, this.x.multiply(a.toBigInteger().modInverse(this.q)).mod(this.q))
}
ECFieldElementFp.prototype.equals = feFpEquals;
ECFieldElementFp.prototype.toBigInteger = feFpToBigInteger;
ECFieldElementFp.prototype.negate = feFpNegate;
ECFieldElementFp.prototype.add = feFpAdd;
ECFieldElementFp.prototype.subtract = feFpSubtract;
ECFieldElementFp.prototype.multiply = feFpMultiply;
ECFieldElementFp.prototype.square = feFpSquare;
ECFieldElementFp.prototype.divide = feFpDivide;
function ECPointFp(c, a, d, b) {
    this.curve = c;
    this.x = a;
    this.y = d;
    if (b == null) {
        this.z = BigInteger.ONE
    } else {
        this.z = b
    }
    this.zinv = null
}
function pointFpGetX() {
    if (this.zinv == null) {
        this.zinv = this.z.modInverse(this.curve.q)
    }
    return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))
}
function pointFpGetY() {
    if (this.zinv == null) {
        this.zinv = this.z.modInverse(this.curve.q)
    }
    return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))
}
function pointFpEquals(a) {
    if (a == this) {
        return true
    }
    if (this.isInfinity()) {
        return a.isInfinity()
    }
    if (a.isInfinity()) {
        return this.isInfinity()
    }
    var c, b;
    c = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q);
    if (!c.equals(BigInteger.ZERO)) {
        return false
    }
    b = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);
    return b.equals(BigInteger.ZERO)
}
function pointFpIsInfinity() {
    if ((this.x == null) && (this.y == null)) {
        return true
    }
    return this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO)
}
function pointFpNegate() {
    return new ECPointFp(this.curve, this.x, this.y.negate(), this.z)
}
function pointFpAdd(l) {
    if (this.isInfinity()) {
        return l
    }
    if (l.isInfinity()) {
        return this
    }
    var p = l.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(l.z)).mod(this.curve.q);
    var o = l.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(l.z)).mod(this.curve.q);
    if (BigInteger.ZERO.equals(o)) {
        if (BigInteger.ZERO.equals(p)) {
            return this.twice()
        }
        return this.curve.getInfinity()
    }
    var j = new BigInteger("3");
    var e = this.x.toBigInteger();
    var n = this.y.toBigInteger();
    var c = l.x.toBigInteger();
    var k = l.y.toBigInteger();
    var m = o.square();
    var i = m.multiply(o);
    var d = e.multiply(m);
    var g = p.square().multiply(this.z);
    var a = g.subtract(d.shiftLeft(1)).multiply(l.z).subtract(i).multiply(o).mod(this.curve.q);
    var h = d.multiply(j).multiply(p).subtract(n.multiply(i)).subtract(g.multiply(p)).multiply(l.z).add(p.multiply(i)).mod(this.curve.q);
    var f = i.multiply(this.z).multiply(l.z).mod(this.curve.q);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(a), this.curve.fromBigInteger(h), f)
}
function pointFpTwice() {
    if (this.isInfinity()) {
        return this
    }
    if (this.y.toBigInteger().signum() == 0) {
        return this.curve.getInfinity()
    }
    var g = new BigInteger("3");
    var c = this.x.toBigInteger();
    var h = this.y.toBigInteger();
    var e = h.multiply(this.z);
    var j = e.multiply(h).mod(this.curve.q);
    var i = this.curve.a.toBigInteger();
    var k = c.square().multiply(g);
    if (!BigInteger.ZERO.equals(i)) {
        k = k.add(this.z.square().multiply(i))
    }
    k = k.mod(this.curve.q);
    var b = k.square().subtract(c.shiftLeft(3).multiply(j)).shiftLeft(1).multiply(e).mod(this.curve.q);
    var f = k.multiply(g).multiply(c).subtract(j.shiftLeft(1)).shiftLeft(2).multiply(j).subtract(k.square().multiply(k)).mod(this.curve.q);
    var d = e.square().multiply(e).shiftLeft(3).mod(this.curve.q);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(b), this.curve.fromBigInteger(f), d)
}
function pointFpMultiply(b) {
    if (this.isInfinity()) {
        return this
    }
    if (b.signum() == 0) {
        return this.curve.getInfinity()
    }
    var g = b;
    var f = g.multiply(new BigInteger("3"));
    var l = this.negate();
    var d = this;
    var c;
    for (c = f.bitLength() - 2; c > 0; --c) {
        d = d.twice();
        var a = f.testBit(c);
        var j = g.testBit(c);
        if (a != j) {
            d = d.add(a ? this: l)
        }
    }
    return d
}
function pointFpMultiplyTwo(c, a, b) {
    var d;
    if (c.bitLength() > b.bitLength()) {
        d = c.bitLength() - 1
    } else {
        d = b.bitLength() - 1
    }
    var f = this.curve.getInfinity();
    var e = this.add(a);
    while (d >= 0) {
        f = f.twice();
        if (c.testBit(d)) {
            if (b.testBit(d)) {
                f = f.add(e)
            } else {
                f = f.add(this)
            }
        } else {
            if (b.testBit(d)) {
                f = f.add(a)
            }
        }--d
    }
    return f
}
ECPointFp.prototype.getX = pointFpGetX;
ECPointFp.prototype.getY = pointFpGetY;
ECPointFp.prototype.equals = pointFpEquals;
ECPointFp.prototype.isInfinity = pointFpIsInfinity;
ECPointFp.prototype.negate = pointFpNegate;
ECPointFp.prototype.add = pointFpAdd;
ECPointFp.prototype.twice = pointFpTwice;
ECPointFp.prototype.multiply = pointFpMultiply;
ECPointFp.prototype.multiplyTwo = pointFpMultiplyTwo;
function ECCurveFp(e, d, c) {
    this.q = e;
    this.a = this.fromBigInteger(d);
    this.b = this.fromBigInteger(c);
    this.infinity = new ECPointFp(this, null, null)
}
function curveFpGetQ() {
    return this.q
}
function curveFpGetA() {
    return this.a
}
function curveFpGetB() {
    return this.b
}
function curveFpEquals(a) {
    if (a == this) {
        return true
    }
    return (this.q.equals(a.q) && this.a.equals(a.a) && this.b.equals(a.b))
}
function curveFpGetInfinity() {
    return this.infinity
}
function curveFpFromBigInteger(a) {
    return new ECFieldElementFp(this.q, a)
}
function curveFpDecodePointHex(d) {
    switch (parseInt(d.substr(0, 2), 16)) {
    case 0:
        return this.infinity;
    case 2:
    case 3:
        return null;
    case 4:
    case 6:
    case 7:
        var a = (d.length - 2) / 2;
        var c = d.substr(2, a);
        var b = d.substr(a + 2, a);
        return new ECPointFp(this, this.fromBigInteger(new BigInteger(c, 16)), this.fromBigInteger(new BigInteger(b, 16)));
    default:
        return null
    }
}
ECCurveFp.prototype.getQ = curveFpGetQ;
ECCurveFp.prototype.getA = curveFpGetA;
ECCurveFp.prototype.getB = curveFpGetB;
ECCurveFp.prototype.equals = curveFpEquals;
ECCurveFp.prototype.getInfinity = curveFpGetInfinity;
ECCurveFp.prototype.fromBigInteger = curveFpFromBigInteger;
ECCurveFp.prototype.decodePointHex = curveFpDecodePointHex;
/*! (c) Stefan Thomas | https://github.com/bitcoinjs/bitcoinjs-lib
 */
ECFieldElementFp.prototype.getByteLength = function() {
    return Math.floor((this.toBigInteger().bitLength() + 7) / 8)
};
ECPointFp.prototype.getEncoded = function(c) {
    var d = function(h, f) {
        var g = h.toByteArrayUnsigned();
        if (f < g.length) {
            g = g.slice(g.length - f)
        } else {
            while (f > g.length) {
                g.unshift(0)
            }
        }
        return g
    };
    var a = this.getX().toBigInteger();
    var e = this.getY().toBigInteger();
    var b = d(a, 32);
    if (c) {
        if (e.isEven()) {
            b.unshift(2)
        } else {
            b.unshift(3)
        }
    } else {
        b.unshift(4);
        b = b.concat(d(e, 32))
    }
    return b
};
ECPointFp.decodeFrom = function(g, c) {
    var f = c[0];
    var e = c.length - 1;
    var d = c.slice(1, 1 + e / 2);
    var b = c.slice(1 + e / 2, 1 + e);
    d.unshift(0);
    b.unshift(0);
    var a = new BigInteger(d);
    var h = new BigInteger(b);
    return new ECPointFp(g, g.fromBigInteger(a), g.fromBigInteger(h))
};
ECPointFp.decodeFromHex = function(g, c) {
    var f = c.substr(0, 2);
    var e = c.length - 2;
    var d = c.substr(2, e / 2);
    var b = c.substr(2 + e / 2, e / 2);
    var a = new BigInteger(d, 16);
    var h = new BigInteger(b, 16);
    return new ECPointFp(g, g.fromBigInteger(a), g.fromBigInteger(h))
};
ECPointFp.prototype.add2D = function(c) {
    if (this.isInfinity()) {
        return c
    }
    if (c.isInfinity()) {
        return this
    }
    if (this.x.equals(c.x)) {
        if (this.y.equals(c.y)) {
            return this.twice()
        }
        return this.curve.getInfinity()
    }
    var g = c.x.subtract(this.x);
    var e = c.y.subtract(this.y);
    var a = e.divide(g);
    var d = a.square().subtract(this.x).subtract(c.x);
    var f = a.multiply(this.x.subtract(d)).subtract(this.y);
    return new ECPointFp(this.curve, d, f)
};
ECPointFp.prototype.twice2D = function() {
    if (this.isInfinity()) {
        return this
    }
    if (this.y.toBigInteger().signum() == 0) {
        return this.curve.getInfinity()
    }
    var b = this.curve.fromBigInteger(BigInteger.valueOf(2));
    var e = this.curve.fromBigInteger(BigInteger.valueOf(3));
    var a = this.x.square().multiply(e).add(this.curve.a).divide(this.y.multiply(b));
    var c = a.square().subtract(this.x.multiply(b));
    var d = a.multiply(this.x.subtract(c)).subtract(this.y);
    return new ECPointFp(this.curve, c, d)
};
ECPointFp.prototype.multiply2D = function(b) {
    if (this.isInfinity()) {
        return this
    }
    if (b.signum() == 0) {
        return this.curve.getInfinity()
    }
    var g = b;
    var f = g.multiply(new BigInteger("3"));
    var l = this.negate();
    var d = this;
    var c;
    for (c = f.bitLength() - 2; c > 0; --c) {
        d = d.twice();
        var a = f.testBit(c);
        var j = g.testBit(c);
        if (a != j) {
            d = d.add2D(a ? this: l)
        }
    }
    return d
};
ECPointFp.prototype.isOnCurve = function() {
    var d = this.getX().toBigInteger();
    var i = this.getY().toBigInteger();
    var f = this.curve.getA().toBigInteger();
    var c = this.curve.getB().toBigInteger();
    var h = this.curve.getQ();
    var e = i.multiply(i).mod(h);
    var g = d.multiply(d).multiply(d).add(f.multiply(d)).add(c).mod(h);
    return e.equals(g)
};
ECPointFp.prototype.toString = function() {
    return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")"
};
ECPointFp.prototype.validate = function() {
    var c = this.curve.getQ();
    if (this.isInfinity()) {
        throw new Error("Point is at infinity.")
    }
    var a = this.getX().toBigInteger();
    var b = this.getY().toBigInteger();
    if (a.compareTo(BigInteger.ONE) < 0 || a.compareTo(c.subtract(BigInteger.ONE)) > 0) {
        throw new Error("x coordinate out of bounds")
    }
    if (b.compareTo(BigInteger.ONE) < 0 || b.compareTo(c.subtract(BigInteger.ONE)) > 0) {
        throw new Error("y coordinate out of bounds")
    }
    if (!this.isOnCurve()) {
        throw new Error("Point is not on the curve.")
    }
    if (this.multiply(c).isInfinity()) {
        throw new Error("Point is not a scalar multiple of G.")
    }
    return true
};
/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
 */
var jsonParse = (function() {
    var e = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";
    var j = '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
    var i = '(?:"' + j + '*")';
    var d = new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|" + e + "|" + i + ")", "g");
    var k = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
    var g = {
        '"': '"',
        "/": "/",
        "\\": "\\",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "\t"
    };
    function h(l, m, n) {
        return m ? g[m] : String.fromCharCode(parseInt(n, 16))
    }
    var c = new String("");
    var a = "\\";
    var f = {
        "{": Object,
        "[": Array
    };
    var b = Object.hasOwnProperty;
    return function(u, q) {
        var p = u.match(d);
        var x;
        var v = p[0];
        var l = false;
        if ("{" === v) {
            x = {}
        } else {
            if ("[" === v) {
                x = []
            } else {
                x = [];
                l = true
            }
        }
        var t;
        var r = [x];
        for (var o = 1 - l,
        m = p.length; o < m; ++o) {
            v = p[o];
            var w;
            switch (v.charCodeAt(0)) {
            default:
                w = r[0];
                w[t || w.length] = +(v);
                t = void 0;
                break;
            case 34:
                v = v.substring(1, v.length - 1);
                if (v.indexOf(a) !== -1) {
                    v = v.replace(k, h)
                }
                w = r[0];
                if (!t) {
                    if (w instanceof Array) {
                        t = w.length
                    } else {
                        t = v || c;
                        break
                    }
                }
                w[t] = v;
                t = void 0;
                break;
            case 91:
                w = r[0];
                r.unshift(w[t || w.length] = []);
                t = void 0;
                break;
            case 93:
                r.shift();
                break;
            case 102:
                w = r[0];
                w[t || w.length] = false;
                t = void 0;
                break;
            case 110:
                w = r[0];
                w[t || w.length] = null;
                t = void 0;
                break;
            case 116:
                w = r[0];
                w[t || w.length] = true;
                t = void 0;
                break;
            case 123:
                w = r[0];
                r.unshift(w[t || w.length] = {});
                t = void 0;
                break;
            case 125:
                r.shift();
                break
            }
        }
        if (l) {
            if (r.length !== 1) {
                throw new Error()
            }
            x = x[0]
        } else {
            if (r.length) {
                throw new Error()
            }
        }
        if (q) {
            var s = function(C, B) {
                var D = C[B];
                if (D && typeof D === "object") {
                    var n = null;
                    for (var z in D) {
                        if (b.call(D, z) && D !== C) {
                            var y = s(D, z);
                            if (y !== void 0) {
                                D[z] = y
                            } else {
                                if (!n) {
                                    n = []
                                }
                                n.push(z)
                            }
                        }
                    }
                    if (n) {
                        for (var A = n.length; --A >= 0;) {
                            delete D[n[A]]
                        }
                    }
                }
                return q.call(C, B, D)
            };
            x = s({
                "": x
            },
            "")
        }
        return x
    }
})();
/*! asn1-1.0.12.js (c) 2013-2016 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
    KJUR.asn1 = {}
}
KJUR.asn1.ASN1Util = new
function() {
    this.integerToByteHex = function(a) {
        var b = a.toString(16);
        if ((b.length % 2) == 1) {
            b = "0" + b
        }
        return b
    };
    this.bigIntToMinTwosComplementsHex = function(j) {
        var f = j.toString(16);
        if (f.substr(0, 1) != "-") {
            if (f.length % 2 == 1) {
                f = "0" + f
            } else {
                if (!f.match(/^[0-7]/)) {
                    f = "00" + f
                }
            }
        } else {
            var a = f.substr(1);
            var e = a.length;
            if (e % 2 == 1) {
                e += 1
            } else {
                if (!f.match(/^[0-7]/)) {
                    e += 2
                }
            }
            var g = "";
            for (var d = 0; d < e; d++) {
                g += "f"
            }
            var c = new BigInteger(g, 16);
            var b = c.xor(j).add(BigInteger.ONE);
            f = b.toString(16).replace(/^-/, "")
        }
        return f
    };
    this.getPEMStringFromHex = function(a, b) {
        var c = hextob64(a);
        var d = c.replace(/(.{64})/g, "$1\r\n");
        d = d.replace(/\r\n$/, "");
        return "-----BEGIN " + b + "-----\r\n" + d + "\r\n-----END " + b + "-----\r\n"
    };
    this.newObject = function(b) {
        var g = KJUR.asn1;
        var k = Object.keys(b);
        if (k.length != 1) {
            throw "key of param shall be only one."
        }
        var j = k[0];
        if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + j + ":") == -1) {
            throw "undefined key: " + j
        }
        if (j == "bool") {
            return new g.DERBoolean(b[j])
        }
        if (j == "int") {
            return new g.DERInteger(b[j])
        }
        if (j == "bitstr") {
            return new g.DERBitString(b[j])
        }
        if (j == "octstr") {
            return new g.DEROctetString(b[j])
        }
        if (j == "null") {
            return new g.DERNull(b[j])
        }
        if (j == "oid") {
            return new g.DERObjectIdentifier(b[j])
        }
        if (j == "enum") {
            return new g.DEREnumerated(b[j])
        }
        if (j == "utf8str") {
            return new g.DERUTF8String(b[j])
        }
        if (j == "numstr") {
            return new g.DERNumericString(b[j])
        }
        if (j == "prnstr") {
            return new g.DERPrintableString(b[j])
        }
        if (j == "telstr") {
            return new g.DERTeletexString(b[j])
        }
        if (j == "ia5str") {
            return new g.DERIA5String(b[j])
        }
        if (j == "utctime") {
            return new g.DERUTCTime(b[j])
        }
        if (j == "gentime") {
            return new g.DERGeneralizedTime(b[j])
        }
        if (j == "seq") {
            var m = b[j];
            var h = [];
            for (var e = 0; e < m.length; e++) {
                var l = g.ASN1Util.newObject(m[e]);
                h.push(l)
            }
            return new g.DERSequence({
                array: h
            })
        }
        if (j == "set") {
            var m = b[j];
            var h = [];
            for (var e = 0; e < m.length; e++) {
                var l = g.ASN1Util.newObject(m[e]);
                h.push(l)
            }
            return new g.DERSet({
                array: h
            })
        }
        if (j == "tag") {
            var c = b[j];
            if (Object.prototype.toString.call(c) === "[object Array]" && c.length == 3) {
                var d = g.ASN1Util.newObject(c[2]);
                return new g.DERTaggedObject({
                    tag: c[0],
                    explicit: c[1],
                    obj: d
                })
            } else {
                var f = {};
                if (c.explicit !== undefined) {
                    f.explicit = c.explicit
                }
                if (c.tag !== undefined) {
                    f.tag = c.tag
                }
                if (c.obj === undefined) {
                    throw "obj shall be specified for 'tag'."
                }
                f.obj = g.ASN1Util.newObject(c.obj);
                return new g.DERTaggedObject(f)
            }
        }
    };
    this.jsonToASN1HEX = function(b) {
        var a = this.newObject(b);
        return a.getEncodedHex()
    }
};
KJUR.asn1.ASN1Util.oidHexToInt = function(a) {
    var j = "";
    var k = parseInt(a.substr(0, 2), 16);
    var d = Math.floor(k / 40);
    var c = k % 40;
    var j = d + "." + c;
    var e = "";
    for (var f = 2; f < a.length; f += 2) {
        var g = parseInt(a.substr(f, 2), 16);
        var h = ("00000000" + g.toString(2)).slice( - 8);
        e = e + h.substr(1, 7);
        if (h.substr(0, 1) == "0") {
            var b = new BigInteger(e, 2);
            j = j + "." + b.toString(10);
            e = ""
        }
    }
    return j
};
KJUR.asn1.ASN1Util.oidIntToHex = function(f) {
    var e = function(a) {
        var k = a.toString(16);
        if (k.length == 1) {
            k = "0" + k
        }
        return k
    };
    var d = function(o) {
        var n = "";
        var k = new BigInteger(o, 10);
        var a = k.toString(2);
        var l = 7 - a.length % 7;
        if (l == 7) {
            l = 0
        }
        var q = "";
        for (var m = 0; m < l; m++) {
            q += "0"
        }
        a = q + a;
        for (var m = 0; m < a.length - 1; m += 7) {
            var p = a.substr(m, 7);
            if (m != a.length - 7) {
                p = "1" + p
            }
            n += e(parseInt(p, 2))
        }
        return n
    };
    if (!f.match(/^[0-9.]+$/)) {
        throw "malformed oid string: " + f
    }
    var g = "";
    var b = f.split(".");
    var j = parseInt(b[0]) * 40 + parseInt(b[1]);
    g += e(j);
    b.splice(0, 2);
    for (var c = 0; c < b.length; c++) {
        g += d(b[c])
    }
    return g
};
KJUR.asn1.ASN1Object = function() {
    var c = true;
    var b = null;
    var d = "00";
    var e = "00";
    var a = "";
    this.getLengthHexFromValue = function() {
        if (typeof this.hV == "undefined" || this.hV == null) {
            throw "this.hV is null or undefined."
        }
        if (this.hV.length % 2 == 1) {
            throw "value hex must be even length: n=" + a.length + ",v=" + this.hV
        }
        var i = this.hV.length / 2;
        var h = i.toString(16);
        if (h.length % 2 == 1) {
            h = "0" + h
        }
        if (i < 128) {
            return h
        } else {
            var g = h.length / 2;
            if (g > 15) {
                throw "ASN.1 length too long to represent by 8x: n = " + i.toString(16)
            }
            var f = 128 + g;
            return f.toString(16) + h
        }
    };
    this.getEncodedHex = function() {
        if (this.hTLV == null || this.isModified) {
            this.hV = this.getFreshValueHex();
            this.hL = this.getLengthHexFromValue();
            this.hTLV = this.hT + this.hL + this.hV;
            this.isModified = false
        }
        return this.hTLV
    };
    this.getValueHex = function() {
        this.getEncodedHex();
        return this.hV
    };
    this.getFreshValueHex = function() {
        return ""
    }
};
KJUR.asn1.DERAbstractString = function(c) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var b = null;
    var a = null;
    this.getString = function() {
        return this.s
    };
    this.setString = function(d) {
        this.hTLV = null;
        this.isModified = true;
        this.s = d;
        this.hV = stohex(this.s)
    };
    this.setStringHex = function(d) {
        this.hTLV = null;
        this.isModified = true;
        this.s = null;
        this.hV = d
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    if (typeof c != "undefined") {
        if (typeof c == "string") {
            this.setString(c)
        } else {
            if (typeof c.str != "undefined") {
                this.setString(c.str)
            } else {
                if (typeof c.hex != "undefined") {
                    this.setStringHex(c.hex)
                }
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractTime = function(c) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
    var b = null;
    var a = null;
    this.localDateToUTC = function(f) {
        utc = f.getTime() + (f.getTimezoneOffset() * 60000);
        var e = new Date(utc);
        return e
    };
    this.formatDate = function(m, o, e) {
        var g = this.zeroPadding;
        var n = this.localDateToUTC(m);
        var p = String(n.getFullYear());
        if (o == "utc") {
            p = p.substr(2, 2)
        }
        var l = g(String(n.getMonth() + 1), 2);
        var q = g(String(n.getDate()), 2);
        var h = g(String(n.getHours()), 2);
        var i = g(String(n.getMinutes()), 2);
        var j = g(String(n.getSeconds()), 2);
        var r = p + l + q + h + i + j;
        if (e === true) {
            var f = n.getMilliseconds();
            if (f != 0) {
                var k = g(String(f), 3);
                k = k.replace(/[0]+$/, "");
                r = r + "." + k
            }
        }
        return r + "Z"
    };
    this.zeroPadding = function(e, d) {
        if (e.length >= d) {
            return e
        }
        return new Array(d - e.length + 1).join("0") + e
    };
    this.getString = function() {
        return this.s
    };
    this.setString = function(d) {
        this.hTLV = null;
        this.isModified = true;
        this.s = d;
        this.hV = stohex(d)
    };
    this.setByDateValue = function(h, j, e, d, f, g) {
        var i = new Date(Date.UTC(h, j - 1, e, d, f, g, 0));
        this.setByDate(i)
    };
    this.getFreshValueHex = function() {
        return this.hV
    }
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractStructured = function(b) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var a = null;
    this.setByASN1ObjectArray = function(c) {
        this.hTLV = null;
        this.isModified = true;
        this.asn1Array = c
    };
    this.appendASN1Object = function(c) {
        this.hTLV = null;
        this.isModified = true;
        this.asn1Array.push(c)
    };
    this.asn1Array = new Array();
    if (typeof b != "undefined") {
        if (typeof b.array != "undefined") {
            this.asn1Array = b.array
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBoolean = function() {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff"
};
YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
KJUR.asn1.DERInteger = function(a) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";
    this.setByBigInteger = function(b) {
        this.hTLV = null;
        this.isModified = true;
        this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b)
    };
    this.setByInteger = function(c) {
        var b = new BigInteger(String(c), 10);
        this.setByBigInteger(b)
    };
    this.setValueHex = function(b) {
        this.hV = b
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    if (typeof a != "undefined") {
        if (typeof a.bigint != "undefined") {
            this.setByBigInteger(a.bigint)
        } else {
            if (typeof a["int"] != "undefined") {
                this.setByInteger(a["int"])
            } else {
                if (typeof a == "number") {
                    this.setByInteger(a)
                } else {
                    if (typeof a.hex != "undefined") {
                        this.setValueHex(a.hex)
                    }
                }
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBitString = function(b) {
    if (b !== undefined && typeof b.obj !== "undefined") {
        var a = KJUR.asn1.ASN1Util.newObject(b.obj);
        b.hex = "00" + a.getEncodedHex()
    }
    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";
    this.setHexValueIncludingUnusedBits = function(c) {
        this.hTLV = null;
        this.isModified = true;
        this.hV = c
    };
    this.setUnusedBitsAndHexValue = function(c, e) {
        if (c < 0 || 7 < c) {
            throw "unused bits shall be from 0 to 7: u = " + c
        }
        var d = "0" + c;
        this.hTLV = null;
        this.isModified = true;
        this.hV = d + e
    };
    this.setByBinaryString = function(e) {
        e = e.replace(/0+$/, "");
        var f = 8 - e.length % 8;
        if (f == 8) {
            f = 0
        }
        for (var g = 0; g <= f; g++) {
            e += "0"
        }
        var j = "";
        for (var g = 0; g < e.length - 1; g += 8) {
            var d = e.substr(g, 8);
            var c = parseInt(d, 2).toString(16);
            if (c.length == 1) {
                c = "0" + c
            }
            j += c
        }
        this.hTLV = null;
        this.isModified = true;
        this.hV = "0" + f + j
    };
    this.setByBooleanArray = function(e) {
        var d = "";
        for (var c = 0; c < e.length; c++) {
            if (e[c] == true) {
                d += "1"
            } else {
                d += "0"
            }
        }
        this.setByBinaryString(d)
    };
    this.newFalseArray = function(e) {
        var c = new Array(e);
        for (var d = 0; d < e; d++) {
            c[d] = false
        }
        return c
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    if (typeof b != "undefined") {
        if (typeof b == "string" && b.toLowerCase().match(/^[0-9a-f]+$/)) {
            this.setHexValueIncludingUnusedBits(b)
        } else {
            if (typeof b.hex != "undefined") {
                this.setHexValueIncludingUnusedBits(b.hex)
            } else {
                if (typeof b.bin != "undefined") {
                    this.setByBinaryString(b.bin)
                } else {
                    if (typeof b.array != "undefined") {
                        this.setByBooleanArray(b.array)
                    }
                }
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
KJUR.asn1.DEROctetString = function(b) {
    if (b !== undefined && typeof b.obj !== "undefined") {
        var a = KJUR.asn1.ASN1Util.newObject(b.obj);
        b.hex = a.getEncodedHex()
    }
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, b);
    this.hT = "04"
};
YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNull = function() {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500"
};
YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
KJUR.asn1.DERObjectIdentifier = function(c) {
    var b = function(d) {
        var e = d.toString(16);
        if (e.length == 1) {
            e = "0" + e
        }
        return e
    };
    var a = function(k) {
        var j = "";
        var e = new BigInteger(k, 10);
        var d = e.toString(2);
        var f = 7 - d.length % 7;
        if (f == 7) {
            f = 0
        }
        var m = "";
        for (var g = 0; g < f; g++) {
            m += "0"
        }
        d = m + d;
        for (var g = 0; g < d.length - 1; g += 7) {
            var l = d.substr(g, 7);
            if (g != d.length - 7) {
                l = "1" + l
            }
            j += b(parseInt(l, 2))
        }
        return j
    };
    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";
    this.setValueHex = function(d) {
        this.hTLV = null;
        this.isModified = true;
        this.s = null;
        this.hV = d
    };
    this.setValueOidString = function(f) {
        if (!f.match(/^[0-9.]+$/)) {
            throw "malformed oid string: " + f
        }
        var g = "";
        var d = f.split(".");
        var j = parseInt(d[0]) * 40 + parseInt(d[1]);
        g += b(j);
        d.splice(0, 2);
        for (var e = 0; e < d.length; e++) {
            g += a(d[e])
        }
        this.hTLV = null;
        this.isModified = true;
        this.s = null;
        this.hV = g
    };
    this.setValueName = function(e) {
        var d = KJUR.asn1.x509.OID.name2oid(e);
        if (d !== "") {
            this.setValueOidString(d)
        } else {
            throw "DERObjectIdentifier oidName undefined: " + e
        }
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    if (c !== undefined) {
        if (typeof c === "string") {
            if (c.match(/^[0-2].[0-9.]+$/)) {
                this.setValueOidString(c)
            } else {
                this.setValueName(c)
            }
        } else {
            if (c.oid !== undefined) {
                this.setValueOidString(c.oid)
            } else {
                if (c.hex !== undefined) {
                    this.setValueHex(c.hex)
                } else {
                    if (c.name !== undefined) {
                        this.setValueName(c.name)
                    }
                }
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.DEREnumerated = function(a) {
    KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
    this.hT = "0a";
    this.setByBigInteger = function(b) {
        this.hTLV = null;
        this.isModified = true;
        this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b)
    };
    this.setByInteger = function(c) {
        var b = new BigInteger(String(c), 10);
        this.setByBigInteger(b)
    };
    this.setValueHex = function(b) {
        this.hV = b
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    if (typeof a != "undefined") {
        if (typeof a["int"] != "undefined") {
            this.setByInteger(a["int"])
        } else {
            if (typeof a == "number") {
                this.setByInteger(a)
            } else {
                if (typeof a.hex != "undefined") {
                    this.setValueHex(a.hex)
                }
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);
KJUR.asn1.DERUTF8String = function(a) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, a);
    this.hT = "0c"
};
YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNumericString = function(a) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, a);
    this.hT = "12"
};
YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERPrintableString = function(a) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, a);
    this.hT = "13"
};
YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERTeletexString = function(a) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, a);
    this.hT = "14"
};
YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERIA5String = function(a) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, a);
    this.hT = "16"
};
YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERUTCTime = function(a) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, a);
    this.hT = "17";
    this.setByDate = function(b) {
        this.hTLV = null;
        this.isModified = true;
        this.date = b;
        this.s = this.formatDate(this.date, "utc");
        this.hV = stohex(this.s)
    };
    this.getFreshValueHex = function() {
        if (typeof this.date == "undefined" && typeof this.s == "undefined") {
            this.date = new Date();
            this.s = this.formatDate(this.date, "utc");
            this.hV = stohex(this.s)
        }
        return this.hV
    };
    if (a !== undefined) {
        if (a.str !== undefined) {
            this.setString(a.str)
        } else {
            if (typeof a == "string" && a.match(/^[0-9]{12}Z$/)) {
                this.setString(a)
            } else {
                if (a.hex !== undefined) {
                    this.setStringHex(a.hex)
                } else {
                    if (a.date !== undefined) {
                        this.setByDate(a.date)
                    }
                }
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERGeneralizedTime = function(a) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, a);
    this.hT = "18";
    this.withMillis = false;
    this.setByDate = function(b) {
        this.hTLV = null;
        this.isModified = true;
        this.date = b;
        this.s = this.formatDate(this.date, "gen", this.withMillis);
        this.hV = stohex(this.s)
    };
    this.getFreshValueHex = function() {
        if (this.date === undefined && this.s === undefined) {
            this.date = new Date();
            this.s = this.formatDate(this.date, "gen", this.withMillis);
            this.hV = stohex(this.s)
        }
        return this.hV
    };
    if (a !== undefined) {
        if (a.str !== undefined) {
            this.setString(a.str)
        } else {
            if (typeof a == "string" && a.match(/^[0-9]{14}Z$/)) {
                this.setString(a)
            } else {
                if (a.hex !== undefined) {
                    this.setStringHex(a.hex)
                } else {
                    if (a.date !== undefined) {
                        this.setByDate(a.date)
                    }
                }
            }
        }
        if (a.millis === true) {
            this.withMillis = true
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERSequence = function(a) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, a);
    this.hT = "30";
    this.getFreshValueHex = function() {
        var c = "";
        for (var b = 0; b < this.asn1Array.length; b++) {
            var d = this.asn1Array[b];
            c += d.getEncodedHex()
        }
        this.hV = c;
        return this.hV
    }
};
YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERSet = function(a) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, a);
    this.hT = "31";
    this.sortFlag = true;
    this.getFreshValueHex = function() {
        var b = new Array();
        for (var c = 0; c < this.asn1Array.length; c++) {
            var d = this.asn1Array[c];
            b.push(d.getEncodedHex())
        }
        if (this.sortFlag == true) {
            b.sort()
        }
        this.hV = b.join("");
        return this.hV
    };
    if (typeof a != "undefined") {
        if (typeof a.sortflag != "undefined" && a.sortflag == false) {
            this.sortFlag = false
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERTaggedObject = function(a) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = "";
    this.isExplicit = true;
    this.asn1Object = null;
    this.setASN1Object = function(b, c, d) {
        this.hT = c;
        this.isExplicit = b;
        this.asn1Object = d;
        if (this.isExplicit) {
            this.hV = this.asn1Object.getEncodedHex();
            this.hTLV = null;
            this.isModified = true
        } else {
            this.hV = null;
            this.hTLV = d.getEncodedHex();
            this.hTLV = this.hTLV.replace(/^../, c);
            this.isModified = false
        }
    };
    this.getFreshValueHex = function() {
        return this.hV
    };
    if (typeof a != "undefined") {
        if (typeof a.tag != "undefined") {
            this.hT = a.tag
        }
        if (typeof a.explicit != "undefined") {
            this.isExplicit = a.explicit
        }
        if (typeof a.obj != "undefined") {
            this.asn1Object = a.obj;
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
/*! asn1hex-1.1.9.js (c) 2012-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
var ASN1HEX = new
function() {};
ASN1HEX.getByteLengthOfL_AtObj = function(b, c) {
    if (b.substring(c + 2, c + 3) != "8") {
        return 1
    }
    var a = parseInt(b.substring(c + 3, c + 4));
    if (a == 0) {
        return - 1
    }
    if (0 < a && a < 10) {
        return a + 1
    }
    return - 2
};
ASN1HEX.getHexOfL_AtObj = function(b, c) {
    var a = ASN1HEX.getByteLengthOfL_AtObj(b, c);
    if (a < 1) {
        return ""
    }
    return b.substring(c + 2, c + 2 + a * 2)
};
ASN1HEX.getIntOfL_AtObj = function(c, d) {
    var b = ASN1HEX.getHexOfL_AtObj(c, d);
    if (b == "") {
        return - 1
    }
    var a;
    if (parseInt(b.substring(0, 1)) < 8) {
        a = new BigInteger(b, 16)
    } else {
        a = new BigInteger(b.substring(2), 16)
    }
    return a.intValue()
};
ASN1HEX.getStartPosOfV_AtObj = function(b, c) {
    var a = ASN1HEX.getByteLengthOfL_AtObj(b, c);
    if (a < 0) {
        return a
    }
    return c + (a + 1) * 2
};
ASN1HEX.getHexOfV_AtObj = function(c, d) {
    var b = ASN1HEX.getStartPosOfV_AtObj(c, d);
    var a = ASN1HEX.getIntOfL_AtObj(c, d);
    return c.substring(b, b + a * 2)
};
ASN1HEX.getHexOfTLV_AtObj = function(c, e) {
    var b = c.substr(e, 2);
    var d = ASN1HEX.getHexOfL_AtObj(c, e);
    var a = ASN1HEX.getHexOfV_AtObj(c, e);
    return b + d + a
};
ASN1HEX.getPosOfNextSibling_AtObj = function(c, d) {
    var b = ASN1HEX.getStartPosOfV_AtObj(c, d);
    var a = ASN1HEX.getIntOfL_AtObj(c, d);
    return b + a * 2
};
ASN1HEX.getPosArrayOfChildren_AtObj = function(f, j) {
    var c = new Array();
    var i = ASN1HEX.getStartPosOfV_AtObj(f, j);
    if (f.substr(j, 2) == "03") {
        c.push(i + 2)
    } else {
        c.push(i)
    }
    var b = ASN1HEX.getIntOfL_AtObj(f, j);
    var g = i;
    var d = 0;
    while (1) {
        var e = ASN1HEX.getPosOfNextSibling_AtObj(f, g);
        if (e == null || (e - i >= (b * 2))) {
            break
        }
        if (d >= 200) {
            break
        }
        c.push(e);
        g = e;
        d++
    }
    return c
};
ASN1HEX.getNthChildIndex_AtObj = function(d, b, e) {
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(d, b);
    return c[e]
};
ASN1HEX.getDecendantIndexByNthList = function(e, d, c) {
    if (c.length == 0) {
        return d
    }
    var f = c.shift();
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(e, d);
    return ASN1HEX.getDecendantIndexByNthList(e, b[f], c)
};
ASN1HEX.getDecendantHexTLVByNthList = function(d, c, b) {
    var a = ASN1HEX.getDecendantIndexByNthList(d, c, b);
    return ASN1HEX.getHexOfTLV_AtObj(d, a)
};
ASN1HEX.getDecendantHexVByNthList = function(d, c, b) {
    var a = ASN1HEX.getDecendantIndexByNthList(d, c, b);
    return ASN1HEX.getHexOfV_AtObj(d, a)
};
ASN1HEX.getVbyList = function(d, c, b, e) {
    var a = ASN1HEX.getDecendantIndexByNthList(d, c, b);
    if (a === undefined) {
        throw "can't find nthList object"
    }
    if (e !== undefined) {
        if (d.substr(a, 2) != e) {
            throw "checking tag doesn't match: " + d.substr(a, 2) + "!=" + e
        }
    }
    return ASN1HEX.getHexOfV_AtObj(d, a)
};
ASN1HEX.hextooidstr = function(e) {
    var h = function(b, a) {
        if (b.length >= a) {
            return b
        }
        return new Array(a - b.length + 1).join("0") + b
    };
    var l = [];
    var o = e.substr(0, 2);
    var f = parseInt(o, 16);
    l[0] = new String(Math.floor(f / 40));
    l[1] = new String(f % 40);
    var m = e.substr(2);
    var k = [];
    for (var g = 0; g < m.length / 2; g++) {
        k.push(parseInt(m.substr(g * 2, 2), 16))
    }
    var j = [];
    var d = "";
    for (var g = 0; g < k.length; g++) {
        if (k[g] & 128) {
            d = d + h((k[g] & 127).toString(2), 7)
        } else {
            d = d + h((k[g] & 127).toString(2), 7);
            j.push(new String(parseInt(d, 2)));
            d = ""
        }
    }
    var n = l.join(".");
    if (j.length > 0) {
        n = n + "." + j.join(".")
    }
    return n
};
ASN1HEX.dump = function(q, c, k, g) {
    var e = q;
    if (q instanceof KJUR.asn1.ASN1Object) {
        e = q.getEncodedHex()
    }
    var o = function(x, i) {
        if (x.length <= i * 2) {
            return x
        } else {
            var v = x.substr(0, i) + "..(total " + x.length / 2 + "bytes).." + x.substr(x.length - i, i);
            return v
        }
    };
    if (c === undefined) {
        c = {
            ommit_long_octet: 32
        }
    }
    if (k === undefined) {
        k = 0
    }
    if (g === undefined) {
        g = ""
    }
    var t = c.ommit_long_octet;
    if (e.substr(k, 2) == "01") {
        var h = ASN1HEX.getHexOfV_AtObj(e, k);
        if (h == "00") {
            return g + "BOOLEAN FALSE\n"
        } else {
            return g + "BOOLEAN TRUE\n"
        }
    }
    if (e.substr(k, 2) == "02") {
        var h = ASN1HEX.getHexOfV_AtObj(e, k);
        return g + "INTEGER " + o(h, t) + "\n"
    }
    if (e.substr(k, 2) == "03") {
        var h = ASN1HEX.getHexOfV_AtObj(e, k);
        return g + "BITSTRING " + o(h, t) + "\n"
    }
    if (e.substr(k, 2) == "04") {
        var h = ASN1HEX.getHexOfV_AtObj(e, k);
        if (ASN1HEX.isASN1HEX(h)) {
            var j = g + "OCTETSTRING, encapsulates\n";
            j = j + ASN1HEX.dump(h, c, 0, g + "  ");
            return j
        } else {
            return g + "OCTETSTRING " + o(h, t) + "\n"
        }
    }
    if (e.substr(k, 2) == "05") {
        return g + "NULL\n"
    }
    if (e.substr(k, 2) == "06") {
        var l = ASN1HEX.getHexOfV_AtObj(e, k);
        var a = KJUR.asn1.ASN1Util.oidHexToInt(l);
        var n = KJUR.asn1.x509.OID.oid2name(a);
        var b = a.replace(/\./g, " ");
        if (n != "") {
            return g + "ObjectIdentifier " + n + " (" + b + ")\n"
        } else {
            return g + "ObjectIdentifier (" + b + ")\n"
        }
    }
    if (e.substr(k, 2) == "0c") {
        return g + "UTF8String '" + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "'\n"
    }
    if (e.substr(k, 2) == "13") {
        return g + "PrintableString '" + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "'\n"
    }
    if (e.substr(k, 2) == "14") {
        return g + "TeletexString '" + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "'\n"
    }
    if (e.substr(k, 2) == "16") {
        return g + "IA5String '" + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "'\n"
    }
    if (e.substr(k, 2) == "17") {
        return g + "UTCTime " + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "\n"
    }
    if (e.substr(k, 2) == "18") {
        return g + "GeneralizedTime " + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "\n"
    }
    if (e.substr(k, 2) == "30") {
        if (e.substr(k, 4) == "3000") {
            return g + "SEQUENCE {}\n"
        }
        var j = g + "SEQUENCE\n";
        var d = ASN1HEX.getPosArrayOfChildren_AtObj(e, k);
        var f = c;
        if ((d.length == 2 || d.length == 3) && e.substr(d[0], 2) == "06" && e.substr(d[d.length - 1], 2) == "04") {
            var u = ASN1HEX.getHexOfV_AtObj(e, d[0]);
            var a = KJUR.asn1.ASN1Util.oidHexToInt(u);
            var n = KJUR.asn1.x509.OID.oid2name(a);
            var p = JSON.parse(JSON.stringify(c));
            p.x509ExtName = n;
            f = p
        }
        for (var r = 0; r < d.length; r++) {
            j = j + ASN1HEX.dump(e, f, d[r], g + "  ")
        }
        return j
    }
    if (e.substr(k, 2) == "31") {
        var j = g + "SET\n";
        var d = ASN1HEX.getPosArrayOfChildren_AtObj(e, k);
        for (var r = 0; r < d.length; r++) {
            j = j + ASN1HEX.dump(e, c, d[r], g + "  ")
        }
        return j
    }
    var w = parseInt(e.substr(k, 2), 16);
    if ((w & 128) != 0) {
        var m = w & 31;
        if ((w & 32) != 0) {
            var j = g + "[" + m + "]\n";
            var d = ASN1HEX.getPosArrayOfChildren_AtObj(e, k);
            for (var r = 0; r < d.length; r++) {
                j = j + ASN1HEX.dump(e, c, d[r], g + "  ")
            }
            return j
        } else {
            var h = ASN1HEX.getHexOfV_AtObj(e, k);
            if (h.substr(0, 8) == "68747470") {
                h = hextoutf8(h)
            }
            if (c.x509ExtName === "subjectAltName" && m == 2) {
                h = hextoutf8(h)
            }
            var j = g + "[" + m + "] " + h + "\n";
            return j
        }
    }
    return g + "UNKNOWN(" + e.substr(k, 2) + ") " + ASN1HEX.getHexOfV_AtObj(e, k) + "\n"
};
ASN1HEX.isASN1HEX = function(d) {
    if (d.length % 2 == 1) {
        return false
    }
    var c = ASN1HEX.getIntOfL_AtObj(d, 0);
    var b = d.substr(0, 2);
    var e = ASN1HEX.getHexOfL_AtObj(d, 0);
    var a = d.length - b.length - e.length;
    if (a == c * 2) {
        return true
    }
    return false
};
ASN1HEX.pemToHex = function(b, d) {
    if (b.indexOf("-----BEGIN ") == -1) {
        throw "can't find PEM header: " + d
    }
    if (d !== undefined) {
        b = b.replace("-----BEGIN " + d + "-----", "");
        b = b.replace("-----END " + d + "-----", "")
    } else {
        b = b.replace(/-----BEGIN [^-]+-----/, "");
        b = b.replace(/-----END [^-]+-----/, "")
    }
    var c = b.replace(/\s+/g, "");
    var a = b64tohex(c);
    return a
};
/*! asn1x509-1.0.22.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
    KJUR.asn1 = {}
}
if (typeof KJUR.asn1.x509 == "undefined" || !KJUR.asn1.x509) {
    KJUR.asn1.x509 = {}
}
KJUR.asn1.x509.Certificate = function(g) {
    KJUR.asn1.x509.Certificate.superclass.constructor.call(this);
    var b = null;
    var d = null;
    var f = null;
    var c = null;
    var a = null;
    var e = null;
    this.setRsaPrvKeyByPEMandPass = function(i, k) {
        var h = PKCS5PKEY.getDecryptedKeyHex(i, k);
        var j = new RSAKey();
        j.readPrivateKeyFromASN1HexString(h);
        this.prvKey = j
    };
    this.sign = function() {
        this.asn1SignatureAlg = this.asn1TBSCert.asn1SignatureAlg;
        var i = new KJUR.crypto.Signature({
            alg: this.asn1SignatureAlg.nameAlg
        });
        i.init(this.prvKey);
        i.updateHex(this.asn1TBSCert.getEncodedHex());
        this.hexSig = i.sign();
        this.asn1Sig = new KJUR.asn1.DERBitString({
            hex: "00" + this.hexSig
        });
        var h = new KJUR.asn1.DERSequence({
            array: [this.asn1TBSCert, this.asn1SignatureAlg, this.asn1Sig]
        });
        this.hTLV = h.getEncodedHex();
        this.isModified = false
    };
    this.setSignatureHex = function(h) {
        this.asn1SignatureAlg = this.asn1TBSCert.asn1SignatureAlg;
        this.hexSig = h;
        this.asn1Sig = new KJUR.asn1.DERBitString({
            hex: "00" + this.hexSig
        });
        var i = new KJUR.asn1.DERSequence({
            array: [this.asn1TBSCert, this.asn1SignatureAlg, this.asn1Sig]
        });
        this.hTLV = i.getEncodedHex();
        this.isModified = false
    };
    this.getEncodedHex = function() {
        if (this.isModified == false && this.hTLV != null) {
            return this.hTLV
        }
        throw "not signed yet"
    };
    this.getPEMString = function() {
        var j = this.getEncodedHex();
        var h = CryptoJS.enc.Hex.parse(j);
        var i = CryptoJS.enc.Base64.stringify(h);
        var k = i.replace(/(.{64})/g, "$1\r\n");
        return "-----BEGIN CERTIFICATE-----\r\n" + k + "\r\n-----END CERTIFICATE-----\r\n"
    };
    if (g !== undefined) {
        if (g.tbscertobj !== undefined) {
            this.asn1TBSCert = g.tbscertobj
        }
        if (g.prvkeyobj !== undefined) {
            this.prvKey = g.prvkeyobj
        } else {
            if (g.rsaprvkey !== undefined) {
                this.prvKey = g.rsaprvkey
            } else {
                if ((g.rsaprvpem !== undefined) && (g.rsaprvpas !== undefined)) {
                    this.setRsaPrvKeyByPEMandPass(g.rsaprvpem, g.rsaprvpas)
                }
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.Certificate, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.TBSCertificate = function(a) {
    KJUR.asn1.x509.TBSCertificate.superclass.constructor.call(this);
    this._initialize = function() {
        this.asn1Array = new Array();
        this.asn1Version = new KJUR.asn1.DERTaggedObject({
            obj: new KJUR.asn1.DERInteger({
                "int": 2
            })
        });
        this.asn1SerialNumber = null;
        this.asn1SignatureAlg = null;
        this.asn1Issuer = null;
        this.asn1NotBefore = null;
        this.asn1NotAfter = null;
        this.asn1Subject = null;
        this.asn1SubjPKey = null;
        this.extensionsArray = new Array()
    };
    this.setSerialNumberByParam = function(b) {
        this.asn1SerialNumber = new KJUR.asn1.DERInteger(b)
    };
    this.setSignatureAlgByParam = function(b) {
        this.asn1SignatureAlg = new KJUR.asn1.x509.AlgorithmIdentifier(b)
    };
    this.setIssuerByParam = function(b) {
        this.asn1Issuer = new KJUR.asn1.x509.X500Name(b)
    };
    this.setNotBeforeByParam = function(b) {
        this.asn1NotBefore = new KJUR.asn1.x509.Time(b)
    };
    this.setNotAfterByParam = function(b) {
        this.asn1NotAfter = new KJUR.asn1.x509.Time(b)
    };
    this.setSubjectByParam = function(b) {
        this.asn1Subject = new KJUR.asn1.x509.X500Name(b)
    };
    this.setSubjectPublicKeyByParam = function(b) {
        this.asn1SubjPKey = new KJUR.asn1.x509.SubjectPublicKeyInfo(b)
    };
    this.setSubjectPublicKeyByGetKey = function(c) {
        var b = KEYUTIL.getKey(c);
        this.asn1SubjPKey = new KJUR.asn1.x509.SubjectPublicKeyInfo(b)
    };
    this.appendExtension = function(b) {
        this.extensionsArray.push(b)
    };
    this.appendExtensionByName = function(c, b) {
        KJUR.asn1.x509.Extension.appendByNameToArray(c, b, this.extensionsArray)
    };
    this.getEncodedHex = function() {
        if (this.asn1NotBefore == null || this.asn1NotAfter == null) {
            throw "notBefore and/or notAfter not set"
        }
        var c = new KJUR.asn1.DERSequence({
            array: [this.asn1NotBefore, this.asn1NotAfter]
        });
        this.asn1Array = new Array();
        this.asn1Array.push(this.asn1Version);
        this.asn1Array.push(this.asn1SerialNumber);
        this.asn1Array.push(this.asn1SignatureAlg);
        this.asn1Array.push(this.asn1Issuer);
        this.asn1Array.push(c);
        this.asn1Array.push(this.asn1Subject);
        this.asn1Array.push(this.asn1SubjPKey);
        if (this.extensionsArray.length > 0) {
            var d = new KJUR.asn1.DERSequence({
                array: this.extensionsArray
            });
            var b = new KJUR.asn1.DERTaggedObject({
                explicit: true,
                tag: "a3",
                obj: d
            });
            this.asn1Array.push(b)
        }
        var e = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        this.hTLV = e.getEncodedHex();
        this.isModified = false;
        return this.hTLV
    };
    this._initialize()
};
YAHOO.lang.extend(KJUR.asn1.x509.TBSCertificate, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.Extension = function(b) {
    KJUR.asn1.x509.Extension.superclass.constructor.call(this);
    var a = null;
    this.getEncodedHex = function() {
        var f = new KJUR.asn1.DERObjectIdentifier({
            oid: this.oid
        });
        var e = new KJUR.asn1.DEROctetString({
            hex: this.getExtnValueHex()
        });
        var d = new Array();
        d.push(f);
        if (this.critical) {
            d.push(new KJUR.asn1.DERBoolean())
        }
        d.push(e);
        var c = new KJUR.asn1.DERSequence({
            array: d
        });
        return c.getEncodedHex()
    };
    this.critical = false;
    if (typeof b != "undefined") {
        if (typeof b.critical != "undefined") {
            this.critical = b.critical
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.Extension, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.Extension.appendByNameToArray = function(e, c, b) {
    if (e.toLowerCase() == "basicconstraints") {
        var d = new KJUR.asn1.x509.BasicConstraints(c);
        b.push(d)
    } else {
        if (e.toLowerCase() == "keyusage") {
            var d = new KJUR.asn1.x509.KeyUsage(c);
            b.push(d)
        } else {
            if (e.toLowerCase() == "crldistributionpoints") {
                var d = new KJUR.asn1.x509.CRLDistributionPoints(c);
                b.push(d)
            } else {
                if (e.toLowerCase() == "extkeyusage") {
                    var d = new KJUR.asn1.x509.ExtKeyUsage(c);
                    b.push(d)
                } else {
                    if (e.toLowerCase() == "authoritykeyidentifier") {
                        var d = new KJUR.asn1.x509.AuthorityKeyIdentifier(c);
                        b.push(d)
                    } else {
                        if (e.toLowerCase() == "authorityinfoaccess") {
                            var d = new KJUR.asn1.x509.AuthorityInfoAccess(c);
                            b.push(d)
                        } else {
                            if (e.toLowerCase() == "subjectaltname") {
                                var d = new KJUR.asn1.x509.SubjectAltName(c);
                                b.push(d)
                            } else {
                                if (e.toLowerCase() == "issueraltname") {
                                    var d = new KJUR.asn1.x509.IssuerAltName(c);
                                    b.push(d)
                                } else {
                                    throw "unsupported extension name: " + e
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
KJUR.asn1.x509.KeyUsage = function(a) {
    KJUR.asn1.x509.KeyUsage.superclass.constructor.call(this, a);
    this.getExtnValueHex = function() {
        return this.asn1ExtnValue.getEncodedHex()
    };
    this.oid = "2.5.29.15";
    if (typeof a != "undefined") {
        if (typeof a.bin != "undefined") {
            this.asn1ExtnValue = new KJUR.asn1.DERBitString(a)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.KeyUsage, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.BasicConstraints = function(c) {
    KJUR.asn1.x509.BasicConstraints.superclass.constructor.call(this, c);
    var a = false;
    var b = -1;
    this.getExtnValueHex = function() {
        var e = new Array();
        if (this.cA) {
            e.push(new KJUR.asn1.DERBoolean())
        }
        if (this.pathLen > -1) {
            e.push(new KJUR.asn1.DERInteger({
                "int": this.pathLen
            }))
        }
        var d = new KJUR.asn1.DERSequence({
            array: e
        });
        this.asn1ExtnValue = d;
        return this.asn1ExtnValue.getEncodedHex()
    };
    this.oid = "2.5.29.19";
    this.cA = false;
    this.pathLen = -1;
    if (typeof c != "undefined") {
        if (typeof c.cA != "undefined") {
            this.cA = c.cA
        }
        if (typeof c.pathLen != "undefined") {
            this.pathLen = c.pathLen
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.BasicConstraints, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.CRLDistributionPoints = function(a) {
    KJUR.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this, a);
    this.getExtnValueHex = function() {
        return this.asn1ExtnValue.getEncodedHex()
    };
    this.setByDPArray = function(b) {
        this.asn1ExtnValue = new KJUR.asn1.DERSequence({
            array: b
        })
    };
    this.setByOneURI = function(e) {
        var b = new KJUR.asn1.x509.GeneralNames([{
            uri: e
        }]);
        var d = new KJUR.asn1.x509.DistributionPointName(b);
        var c = new KJUR.asn1.x509.DistributionPoint({
            dpobj: d
        });
        this.setByDPArray([c])
    };
    this.oid = "2.5.29.31";
    if (typeof a != "undefined") {
        if (typeof a.array != "undefined") {
            this.setByDPArray(a.array)
        } else {
            if (typeof a.uri != "undefined") {
                this.setByOneURI(a.uri)
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.CRLDistributionPoints, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.ExtKeyUsage = function(a) {
    KJUR.asn1.x509.ExtKeyUsage.superclass.constructor.call(this, a);
    this.setPurposeArray = function(b) {
        this.asn1ExtnValue = new KJUR.asn1.DERSequence();
        for (var c = 0; c < b.length; c++) {
            var d = new KJUR.asn1.DERObjectIdentifier(b[c]);
            this.asn1ExtnValue.appendASN1Object(d)
        }
    };
    this.getExtnValueHex = function() {
        return this.asn1ExtnValue.getEncodedHex()
    };
    this.oid = "2.5.29.37";
    if (typeof a != "undefined") {
        if (typeof a.array != "undefined") {
            this.setPurposeArray(a.array)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.ExtKeyUsage, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.AuthorityKeyIdentifier = function(a) {
    KJUR.asn1.x509.AuthorityKeyIdentifier.superclass.constructor.call(this, a);
    this.asn1KID = null;
    this.asn1CertIssuer = null;
    this.asn1CertSN = null;
    this.getExtnValueHex = function() {
        var c = new Array();
        if (this.asn1KID) {
            c.push(new KJUR.asn1.DERTaggedObject({
                explicit: false,
                tag: "80",
                obj: this.asn1KID
            }))
        }
        if (this.asn1CertIssuer) {
            c.push(new KJUR.asn1.DERTaggedObject({
                explicit: false,
                tag: "a1",
                obj: this.asn1CertIssuer
            }))
        }
        if (this.asn1CertSN) {
            c.push(new KJUR.asn1.DERTaggedObject({
                explicit: false,
                tag: "82",
                obj: this.asn1CertSN
            }))
        }
        var b = new KJUR.asn1.DERSequence({
            array: c
        });
        this.asn1ExtnValue = b;
        return this.asn1ExtnValue.getEncodedHex()
    };
    this.setKIDByParam = function(b) {
        this.asn1KID = new KJUR.asn1.DEROctetString(b)
    };
    this.setCertIssuerByParam = function(b) {
        this.asn1CertIssuer = new KJUR.asn1.x509.X500Name(b)
    };
    this.setCertSNByParam = function(b) {
        this.asn1CertSN = new KJUR.asn1.DERInteger(b)
    };
    this.oid = "2.5.29.35";
    if (typeof a != "undefined") {
        if (typeof a.kid != "undefined") {
            this.setKIDByParam(a.kid)
        }
        if (typeof a.issuer != "undefined") {
            this.setCertIssuerByParam(a.issuer)
        }
        if (typeof a.sn != "undefined") {
            this.setCertSNByParam(a.sn)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.AuthorityKeyIdentifier, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.AuthorityInfoAccess = function(a) {
    KJUR.asn1.x509.AuthorityInfoAccess.superclass.constructor.call(this, a);
    this.setAccessDescriptionArray = function(c) {
        var g = new Array();
        for (var b = 0; b < c.length; b++) {
            var e = new KJUR.asn1.DERObjectIdentifier(c[b].accessMethod);
            var d = new KJUR.asn1.x509.GeneralName(c[b].accessLocation);
            var f = new KJUR.asn1.DERSequence({
                array: [e, d]
            });
            g.push(f)
        }
        this.asn1ExtnValue = new KJUR.asn1.DERSequence({
            array: g
        })
    };
    this.getExtnValueHex = function() {
        return this.asn1ExtnValue.getEncodedHex()
    };
    this.oid = "1.3.6.1.5.5.7.1.1";
    if (typeof a != "undefined") {
        if (typeof a.array != "undefined") {
            this.setAccessDescriptionArray(a.array)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.AuthorityInfoAccess, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.SubjectAltName = function(a) {
    KJUR.asn1.x509.SubjectAltName.superclass.constructor.call(this, a);
    this.setNameArray = function(b) {
        this.asn1ExtnValue = new KJUR.asn1.x509.GeneralNames(b)
    };
    this.getExtnValueHex = function() {
        return this.asn1ExtnValue.getEncodedHex()
    };
    this.oid = "2.5.29.17";
    if (a !== undefined) {
        if (a.array !== undefined) {
            this.setNameArray(a.array)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.SubjectAltName, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.IssuerAltName = function(a) {
    KJUR.asn1.x509.IssuerAltName.superclass.constructor.call(this, a);
    this.setNameArray = function(b) {
        this.asn1ExtnValue = new KJUR.asn1.x509.GeneralNames(b)
    };
    this.getExtnValueHex = function() {
        return this.asn1ExtnValue.getEncodedHex()
    };
    this.oid = "2.5.29.18";
    if (a !== undefined) {
        if (a.array !== undefined) {
            this.setNameArray(a.array)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.IssuerAltName, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.CRL = function(f) {
    KJUR.asn1.x509.CRL.superclass.constructor.call(this);
    var a = null;
    var c = null;
    var e = null;
    var b = null;
    var d = null;
    this.setRsaPrvKeyByPEMandPass = function(h, j) {
        var g = PKCS5PKEY.getDecryptedKeyHex(h, j);
        var i = new RSAKey();
        i.readPrivateKeyFromASN1HexString(g);
        this.rsaPrvKey = i
    };
    this.sign = function() {
        this.asn1SignatureAlg = this.asn1TBSCertList.asn1SignatureAlg;
        sig = new KJUR.crypto.Signature({
            alg: "SHA1withRSA",
            prov: "cryptojs/jsrsa"
        });
        sig.initSign(this.rsaPrvKey);
        sig.updateHex(this.asn1TBSCertList.getEncodedHex());
        this.hexSig = sig.sign();
        this.asn1Sig = new KJUR.asn1.DERBitString({
            hex: "00" + this.hexSig
        });
        var g = new KJUR.asn1.DERSequence({
            array: [this.asn1TBSCertList, this.asn1SignatureAlg, this.asn1Sig]
        });
        this.hTLV = g.getEncodedHex();
        this.isModified = false
    };
    this.getEncodedHex = function() {
        if (this.isModified == false && this.hTLV != null) {
            return this.hTLV
        }
        throw "not signed yet"
    };
    this.getPEMString = function() {
        var i = this.getEncodedHex();
        var g = CryptoJS.enc.Hex.parse(i);
        var h = CryptoJS.enc.Base64.stringify(g);
        var j = h.replace(/(.{64})/g, "$1\r\n");
        return "-----BEGIN X509 CRL-----\r\n" + j + "\r\n-----END X509 CRL-----\r\n"
    };
    if (typeof f != "undefined") {
        if (typeof f.tbsobj != "undefined") {
            this.asn1TBSCertList = f.tbsobj
        }
        if (typeof f.rsaprvkey != "undefined") {
            this.rsaPrvKey = f.rsaprvkey
        }
        if ((typeof f.rsaprvpem != "undefined") && (typeof f.rsaprvpas != "undefined")) {
            this.setRsaPrvKeyByPEMandPass(f.rsaprvpem, f.rsaprvpas)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.CRL, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.TBSCertList = function(b) {
    KJUR.asn1.x509.TBSCertList.superclass.constructor.call(this);
    var a = null;
    this.setSignatureAlgByParam = function(c) {
        this.asn1SignatureAlg = new KJUR.asn1.x509.AlgorithmIdentifier(c)
    };
    this.setIssuerByParam = function(c) {
        this.asn1Issuer = new KJUR.asn1.x509.X500Name(c)
    };
    this.setThisUpdateByParam = function(c) {
        this.asn1ThisUpdate = new KJUR.asn1.x509.Time(c)
    };
    this.setNextUpdateByParam = function(c) {
        this.asn1NextUpdate = new KJUR.asn1.x509.Time(c)
    };
    this.addRevokedCert = function(c, d) {
        var f = {};
        if (c != undefined && c != null) {
            f.sn = c
        }
        if (d != undefined && d != null) {
            f.time = d
        }
        var e = new KJUR.asn1.x509.CRLEntry(f);
        this.aRevokedCert.push(e)
    };
    this.getEncodedHex = function() {
        this.asn1Array = new Array();
        if (this.asn1Version != null) {
            this.asn1Array.push(this.asn1Version)
        }
        this.asn1Array.push(this.asn1SignatureAlg);
        this.asn1Array.push(this.asn1Issuer);
        this.asn1Array.push(this.asn1ThisUpdate);
        if (this.asn1NextUpdate != null) {
            this.asn1Array.push(this.asn1NextUpdate)
        }
        if (this.aRevokedCert.length > 0) {
            var c = new KJUR.asn1.DERSequence({
                array: this.aRevokedCert
            });
            this.asn1Array.push(c)
        }
        var d = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        this.hTLV = d.getEncodedHex();
        this.isModified = false;
        return this.hTLV
    };
    this._initialize = function() {
        this.asn1Version = null;
        this.asn1SignatureAlg = null;
        this.asn1Issuer = null;
        this.asn1ThisUpdate = null;
        this.asn1NextUpdate = null;
        this.aRevokedCert = new Array()
    };
    this._initialize()
};
YAHOO.lang.extend(KJUR.asn1.x509.TBSCertList, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.CRLEntry = function(c) {
    KJUR.asn1.x509.CRLEntry.superclass.constructor.call(this);
    var b = null;
    var a = null;
    this.setCertSerial = function(d) {
        this.sn = new KJUR.asn1.DERInteger(d)
    };
    this.setRevocationDate = function(d) {
        this.time = new KJUR.asn1.x509.Time(d)
    };
    this.getEncodedHex = function() {
        var d = new KJUR.asn1.DERSequence({
            array: [this.sn, this.time]
        });
        this.TLV = d.getEncodedHex();
        return this.TLV
    };
    if (typeof c != "undefined") {
        if (typeof c.time != "undefined") {
            this.setRevocationDate(c.time)
        }
        if (typeof c.sn != "undefined") {
            this.setCertSerial(c.sn)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.CRLEntry, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.X500Name = function(b) {
    KJUR.asn1.x509.X500Name.superclass.constructor.call(this);
    this.asn1Array = new Array();
    this.setByString = function(c) {
        var d = c.split("/");
        d.shift();
        for (var e = 0; e < d.length; e++) {
            this.asn1Array.push(new KJUR.asn1.x509.RDN({
                str: d[e]
            }))
        }
    };
    this.setByLdapString = function(c) {
        var d = KJUR.asn1.x509.X500Name.ldapToOneline(c);
        this.setByString(d)
    };
    this.setByObject = function(e) {
        for (var c in e) {
            if (e.hasOwnProperty(c)) {
                var d = new KJUR.asn1.x509.RDN({
                    str: c + "=" + e[c]
                });
                this.asn1Array ? this.asn1Array.push(d) : this.asn1Array = [d]
            }
        }
    };
    this.getEncodedHex = function() {
        if (typeof this.hTLV == "string") {
            return this.hTLV
        }
        var c = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        this.hTLV = c.getEncodedHex();
        return this.hTLV
    };
    if (b !== undefined) {
        if (b.str !== undefined) {
            this.setByString(b.str)
        } else {
            if (b.ldapstr !== undefined) {
                this.setByLdapString(b.ldapstr)
            } else {
                if (typeof b === "object") {
                    this.setByObject(b)
                }
            }
        }
        if (b.certissuer !== undefined) {
            var a = new X509();
            a.hex = ASN1HEX.pemToHex(b.certissuer);
            this.hTLV = a.getIssuerHex()
        }
        if (b.certsubject !== undefined) {
            var a = new X509();
            a.hex = ASN1HEX.pemToHex(b.certsubject);
            this.hTLV = a.getSubjectHex()
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.X500Name, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.X500Name.onelineToLDAP = function(d) {
    if (d.substr(0, 1) !== "/") {
        throw "malformed input"
    }
    var b = "";
    d = d.substr(1);
    var c = d.split("/");
    c.reverse();
    c = c.map(function(a) {
        return a.replace(/,/, "\\,")
    });
    return c.join(",")
};
KJUR.asn1.x509.X500Name.ldapToOneline = function(g) {
    var c = g.split(",");
    var e = false;
    var b = [];
    for (var f = 0; c.length > 0; f++) {
        var h = c.shift();
        if (e === true) {
            var d = b.pop();
            var j = (d + "," + h).replace(/\\,/g, ",");
            b.push(j);
            e = false
        } else {
            b.push(h)
        }
        if (h.substr( - 1, 1) === "\\") {
            e = true
        }
    }
    b = b.map(function(a) {
        return a.replace("/", "\\/")
    });
    b.reverse();
    return "/" + b.join("/")
};
KJUR.asn1.x509.RDN = function(a) {
    KJUR.asn1.x509.RDN.superclass.constructor.call(this);
    this.asn1Array = new Array();
    this.addByString = function(b) {
        this.asn1Array.push(new KJUR.asn1.x509.AttributeTypeAndValue({
            str: b
        }))
    };
    this.addByMultiValuedString = function(d) {
        var b = KJUR.asn1.x509.RDN.parseString(d);
        for (var c = 0; c < b.length; c++) {
            this.addByString(b[c])
        }
    };
    this.getEncodedHex = function() {
        var b = new KJUR.asn1.DERSet({
            array: this.asn1Array
        });
        this.TLV = b.getEncodedHex();
        return this.TLV
    };
    if (typeof a != "undefined") {
        if (typeof a.str != "undefined") {
            this.addByMultiValuedString(a.str)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.RDN, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.RDN.parseString = function(m) {
    var j = m.split(/\+/);
    var h = false;
    var c = [];
    for (var g = 0; j.length > 0; g++) {
        var k = j.shift();
        if (h === true) {
            var f = c.pop();
            var d = (f + "+" + k).replace(/\\\+/g, "+");
            c.push(d);
            h = false
        } else {
            c.push(k)
        }
        if (k.substr( - 1, 1) === "\\") {
            h = true
        }
    }
    var l = false;
    var b = [];
    for (var g = 0; c.length > 0; g++) {
        var k = c.shift();
        if (l === true) {
            var e = b.pop();
            if (k.match(/"$/)) {
                var d = (e + "+" + k).replace(/^([^=]+)="(.*)"$/, "$1=$2");
                b.push(d);
                l = false
            } else {
                b.push(e + "+" + k)
            }
        } else {
            b.push(k)
        }
        if (k.match(/^[^=]+="/)) {
            l = true
        }
    }
    return b
};
KJUR.asn1.x509.AttributeTypeAndValue = function(b) {
    KJUR.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this);
    var d = null;
    var c = null;
    var a = "utf8";
    this.setByString = function(f) {
        var e = f.match(/^([^=]+)=(.+)$/);
        if (e) {
            this.setByAttrTypeAndValueStr(e[1], e[2])
        } else {
            throw "malformed attrTypeAndValueStr: " + f
        }
    };
    this.setByAttrTypeAndValueStr = function(g, f) {
        this.typeObj = KJUR.asn1.x509.OID.atype2obj(g);
        var e = a;
        if (g == "C") {
            e = "prn"
        }
        this.valueObj = this.getValueObj(e, f)
    };
    this.getValueObj = function(f, e) {
        if (f == "utf8") {
            return new KJUR.asn1.DERUTF8String({
                str: e
            })
        }
        if (f == "prn") {
            return new KJUR.asn1.DERPrintableString({
                str: e
            })
        }
        if (f == "tel") {
            return new KJUR.asn1.DERTeletexString({
                str: e
            })
        }
        if (f == "ia5") {
            return new KJUR.asn1.DERIA5String({
                str: e
            })
        }
        throw "unsupported directory string type: type=" + f + " value=" + e
    };
    this.getEncodedHex = function() {
        var e = new KJUR.asn1.DERSequence({
            array: [this.typeObj, this.valueObj]
        });
        this.TLV = e.getEncodedHex();
        return this.TLV
    };
    if (typeof b != "undefined") {
        if (typeof b.str != "undefined") {
            this.setByString(b.str)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.AttributeTypeAndValue, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.SubjectPublicKeyInfo = function(d) {
    KJUR.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);
    var b = null;
    var c = null;
    var a = null;
    this.setRSAKey = function(e) {
        if (!RSAKey.prototype.isPrototypeOf(e)) {
            throw "argument is not RSAKey instance"
        }
        this.rsaKey = e;
        var g = new KJUR.asn1.DERInteger({
            bigint: e.n
        });
        var f = new KJUR.asn1.DERInteger({
            "int": e.e
        });
        var i = new KJUR.asn1.DERSequence({
            array: [g, f]
        });
        var h = i.getEncodedHex();
        this.asn1AlgId = new KJUR.asn1.x509.AlgorithmIdentifier({
            name: "rsaEncryption"
        });
        this.asn1SubjPKey = new KJUR.asn1.DERBitString({
            hex: "00" + h
        })
    };
    this.setRSAPEM = function(g) {
        if (g.match(/-----BEGIN PUBLIC KEY-----/)) {
            var n = g;
            n = n.replace(/^-----[^-]+-----/, "");
            n = n.replace(/-----[^-]+-----\s*$/, "");
            var m = n.replace(/\s+/g, "");
            var f = CryptoJS.enc.Base64.parse(m);
            var i = CryptoJS.enc.Hex.stringify(f);
            var k = RSAKey.getHexValueArrayOfChildrenFromHex(i);
            var h = k[1];
            var l = h.substr(2);
            var e = RSAKey.getHexValueArrayOfChildrenFromHex(l);
            var j = new RSAKey();
            j.setPublic(e[0], e[1]);
            this.setRSAKey(j)
        } else {
            throw "key not supported"
        }
    };
    this.getASN1Object = function() {
        if (this.asn1AlgId == null || this.asn1SubjPKey == null) {
            throw "algId and/or subjPubKey not set"
        }
        var e = new KJUR.asn1.DERSequence({
            array: [this.asn1AlgId, this.asn1SubjPKey]
        });
        return e
    };
    this.getEncodedHex = function() {
        var e = this.getASN1Object();
        this.hTLV = e.getEncodedHex();
        return this.hTLV
    };
    this._setRSAKey = function(e) {
        var g = KJUR.asn1.ASN1Util.newObject({
            seq: [{
                "int": {
                    bigint: e.n
                }
            },
            {
                "int": {
                    "int": e.e
                }
            }]
        });
        var f = g.getEncodedHex();
        this.asn1AlgId = new KJUR.asn1.x509.AlgorithmIdentifier({
            name: "rsaEncryption"
        });
        this.asn1SubjPKey = new KJUR.asn1.DERBitString({
            hex: "00" + f
        })
    };
    this._setEC = function(e) {
        var f = new KJUR.asn1.DERObjectIdentifier({
            name: e.curveName
        });
        this.asn1AlgId = new KJUR.asn1.x509.AlgorithmIdentifier({
            name: "ecPublicKey",
            asn1params: f
        });
        this.asn1SubjPKey = new KJUR.asn1.DERBitString({
            hex: "00" + e.pubKeyHex
        })
    };
    this._setDSA = function(e) {
        var f = new KJUR.asn1.ASN1Util.newObject({
            seq: [{
                "int": {
                    bigint: e.p
                }
            },
            {
                "int": {
                    bigint: e.q
                }
            },
            {
                "int": {
                    bigint: e.g
                }
            }]
        });
        this.asn1AlgId = new KJUR.asn1.x509.AlgorithmIdentifier({
            name: "dsa",
            asn1params: f
        });
        var g = new KJUR.asn1.DERInteger({
            bigint: e.y
        });
        this.asn1SubjPKey = new KJUR.asn1.DERBitString({
            hex: "00" + g.getEncodedHex()
        })
    };
    if (typeof d != "undefined") {
        if (typeof RSAKey != "undefined" && d instanceof RSAKey) {
            this._setRSAKey(d)
        } else {
            if (typeof KJUR.crypto.ECDSA != "undefined" && d instanceof KJUR.crypto.ECDSA) {
                this._setEC(d)
            } else {
                if (typeof KJUR.crypto.DSA != "undefined" && d instanceof KJUR.crypto.DSA) {
                    this._setDSA(d)
                } else {
                    if (typeof d.rsakey != "undefined") {
                        this.setRSAKey(d.rsakey)
                    } else {
                        if (typeof d.rsapem != "undefined") {
                            this.setRSAPEM(d.rsapem)
                        }
                    }
                }
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.SubjectPublicKeyInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.Time = function(c) {
    KJUR.asn1.x509.Time.superclass.constructor.call(this);
    var b = null;
    var a = null;
    this.setTimeParams = function(d) {
        this.timeParams = d
    };
    this.getEncodedHex = function() {
        var d = null;
        if (this.timeParams != null) {
            if (this.type == "utc") {
                d = new KJUR.asn1.DERUTCTime(this.timeParams)
            } else {
                d = new KJUR.asn1.DERGeneralizedTime(this.timeParams)
            }
        } else {
            if (this.type == "utc") {
                d = new KJUR.asn1.DERUTCTime()
            } else {
                d = new KJUR.asn1.DERGeneralizedTime()
            }
        }
        this.TLV = d.getEncodedHex();
        return this.TLV
    };
    this.type = "utc";
    if (typeof c != "undefined") {
        if (typeof c.type != "undefined") {
            this.type = c.type
        } else {
            if (typeof c.str != "undefined") {
                if (c.str.match(/^[0-9]{12}Z$/)) {
                    this.type = "utc"
                }
                if (c.str.match(/^[0-9]{14}Z$/)) {
                    this.type = "gen"
                }
            }
        }
        this.timeParams = c
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.Time, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.AlgorithmIdentifier = function(b) {
    KJUR.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this);
    this.nameAlg = null;
    this.asn1Alg = null;
    this.asn1Params = null;
    this.paramEmpty = false;
    this.getEncodedHex = function() {
        if (this.nameAlg === null && this.asn1Alg === null) {
            throw "algorithm not specified"
        }
        if (this.nameAlg !== null && this.asn1Alg === null) {
            this.asn1Alg = KJUR.asn1.x509.OID.name2obj(this.nameAlg)
        }
        var c = [this.asn1Alg];
        if (this.asn1Params !== null) {
            c.push(this.asn1Params)
        }
        var d = new KJUR.asn1.DERSequence({
            array: c
        });
        this.hTLV = d.getEncodedHex();
        return this.hTLV
    };
    if (b !== undefined) {
        if (b.name !== undefined) {
            this.nameAlg = b.name
        }
        if (b.asn1params !== undefined) {
            this.asn1Params = b.asn1params
        }
        if (b.paramempty !== undefined) {
            this.paramEmpty = b.paramempty
        }
    }
    if (this.asn1Params === null && this.paramEmpty === false && this.nameAlg !== null) {
        var a = this.nameAlg.toLowerCase();
        if (a.substr( - 7, 7) !== "withdsa" && a.substr( - 9, 9) !== "withecdsa") {
            this.asn1Params = new KJUR.asn1.DERNull()
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.AlgorithmIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.GeneralName = function(d) {
    KJUR.asn1.x509.GeneralName.superclass.constructor.call(this);
    var c = null;
    var b = null;
    var a = {
        rfc822: "81",
        dns: "82",
        dn: "a4",
        uri: "86"
    };
    this.explicit = false;
    this.setByParam = function(k) {
        var j = null;
        var g = null;
        if (k === undefined) {
            return
        }
        if (k.rfc822 !== undefined) {
            this.type = "rfc822";
            g = new KJUR.asn1.DERIA5String({
                str: k[this.type]
            })
        }
        if (k.dns !== undefined) {
            this.type = "dns";
            g = new KJUR.asn1.DERIA5String({
                str: k[this.type]
            })
        }
        if (k.uri !== undefined) {
            this.type = "uri";
            g = new KJUR.asn1.DERIA5String({
                str: k[this.type]
            })
        }
        if (k.dn !== undefined) {
            this.type = "dn";
            g = new KJUR.asn1.x509.X500Name({
                str: k.dn
            })
        }
        if (k.ldapdn !== undefined) {
            this.type = "dn";
            g = new KJUR.asn1.x509.X500Name({
                ldapstr: k.ldapdn
            })
        }
        if (k.certissuer !== undefined) {
            this.type = "dn";
            this.explicit = true;
            var h = k.certissuer;
            var f = null;
            if (h.match(/^[0-9A-Fa-f]+$/)) {
                f == h
            }
            if (h.indexOf("-----BEGIN ") != -1) {
                f = ASN1HEX.pemToHex(h)
            }
            if (f == null) {
                throw "certissuer param not cert"
            }
            var e = new X509();
            e.hex = f;
            var i = e.getIssuerHex();
            g = new KJUR.asn1.ASN1Object();
            g.hTLV = i
        }
        if (k.certsubj !== undefined) {
            this.type = "dn";
            this.explicit = true;
            var h = k.certsubj;
            var f = null;
            if (h.match(/^[0-9A-Fa-f]+$/)) {
                f == h
            }
            if (h.indexOf("-----BEGIN ") != -1) {
                f = ASN1HEX.pemToHex(h)
            }
            if (f == null) {
                throw "certsubj param not cert"
            }
            var e = new X509();
            e.hex = f;
            var i = e.getSubjectHex();
            g = new KJUR.asn1.ASN1Object();
            g.hTLV = i
        }
        if (this.type == null) {
            throw "unsupported type in params=" + k
        }
        this.asn1Obj = new KJUR.asn1.DERTaggedObject({
            explicit: this.explicit,
            tag: a[this.type],
            obj: g
        })
    };
    this.getEncodedHex = function() {
        return this.asn1Obj.getEncodedHex()
    };
    if (d !== undefined) {
        this.setByParam(d)
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.GeneralName, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.GeneralNames = function(b) {
    KJUR.asn1.x509.GeneralNames.superclass.constructor.call(this);
    var a = null;
    this.setByParamArray = function(e) {
        for (var c = 0; c < e.length; c++) {
            var d = new KJUR.asn1.x509.GeneralName(e[c]);
            this.asn1Array.push(d)
        }
    };
    this.getEncodedHex = function() {
        var c = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        return c.getEncodedHex()
    };
    this.asn1Array = new Array();
    if (typeof b != "undefined") {
        this.setByParamArray(b)
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.GeneralNames, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.DistributionPointName = function(b) {
    KJUR.asn1.x509.DistributionPointName.superclass.constructor.call(this);
    var e = null;
    var c = null;
    var a = null;
    var d = null;
    this.getEncodedHex = function() {
        if (this.type != "full") {
            throw "currently type shall be 'full': " + this.type
        }
        this.asn1Obj = new KJUR.asn1.DERTaggedObject({
            explicit: false,
            tag: this.tag,
            obj: this.asn1V
        });
        this.hTLV = this.asn1Obj.getEncodedHex();
        return this.hTLV
    };
    if (typeof b != "undefined") {
        if (KJUR.asn1.x509.GeneralNames.prototype.isPrototypeOf(b)) {
            this.type = "full";
            this.tag = "a0";
            this.asn1V = b
        } else {
            throw "This class supports GeneralNames only as argument"
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.DistributionPointName, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.DistributionPoint = function(b) {
    KJUR.asn1.x509.DistributionPoint.superclass.constructor.call(this);
    var a = null;
    this.getEncodedHex = function() {
        var c = new KJUR.asn1.DERSequence();
        if (this.asn1DP != null) {
            var d = new KJUR.asn1.DERTaggedObject({
                explicit: true,
                tag: "a0",
                obj: this.asn1DP
            });
            c.appendASN1Object(d)
        }
        this.hTLV = c.getEncodedHex();
        return this.hTLV
    };
    if (typeof b != "undefined") {
        if (typeof b.dpobj != "undefined") {
            this.asn1DP = b.dpobj
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.x509.DistributionPoint, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.OID = new
function(a) {
    this.atype2oidList = {
        CN: "2.5.4.3",
        L: "2.5.4.7",
        ST: "2.5.4.8",
        O: "2.5.4.10",
        OU: "2.5.4.11",
        C: "2.5.4.6",
        STREET: "2.5.4.9",
        DC: "0.9.2342.19200300.100.1.25",
        UID: "0.9.2342.19200300.100.1.1",
        SN: "2.5.4.4",
        DN: "2.5.4.49",
        E: "1.2.840.113549.1.9.1",
        businessCategory: "2.5.4.15",
        postalCode: "2.5.4.17",
        jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1",
        jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2",
        jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3"
    };
    this.name2oidList = {
        sha1: "1.3.14.3.2.26",
        sha256: "2.16.840.1.101.3.4.2.1",
        sha384: "2.16.840.1.101.3.4.2.2",
        sha512: "2.16.840.1.101.3.4.2.3",
        sha224: "2.16.840.1.101.3.4.2.4",
        md5: "1.2.840.113549.2.5",
        md2: "1.3.14.7.2.2.1",
        ripemd160: "1.3.36.3.2.1",
        MD2withRSA: "1.2.840.113549.1.1.2",
        MD4withRSA: "1.2.840.113549.1.1.3",
        MD5withRSA: "1.2.840.113549.1.1.4",
        SHA1withRSA: "1.2.840.113549.1.1.5",
        SHA224withRSA: "1.2.840.113549.1.1.14",
        SHA256withRSA: "1.2.840.113549.1.1.11",
        SHA384withRSA: "1.2.840.113549.1.1.12",
        SHA512withRSA: "1.2.840.113549.1.1.13",
        SHA1withECDSA: "1.2.840.10045.4.1",
        SHA224withECDSA: "1.2.840.10045.4.3.1",
        SHA256withECDSA: "1.2.840.10045.4.3.2",
        SHA384withECDSA: "1.2.840.10045.4.3.3",
        SHA512withECDSA: "1.2.840.10045.4.3.4",
        dsa: "1.2.840.10040.4.1",
        SHA1withDSA: "1.2.840.10040.4.3",
        SHA224withDSA: "2.16.840.1.101.3.4.3.1",
        SHA256withDSA: "2.16.840.1.101.3.4.3.2",
        rsaEncryption: "1.2.840.113549.1.1.1",
        commonName: "2.5.4.3",
        localityName: "2.5.4.7",
        stateOrProvinceName: "2.5.4.8",
        organizationName: "2.5.4.10",
        organizationalUnitName: "2.5.4.11",
        countryName: "2.5.4.6",
        streetAddress: "2.5.4.9",
        domainComponent: "0.9.2342.19200300.100.1.25",
        userId: "0.9.2342.19200300.100.1.1",
        surname: "2.5.4.4",
        distinguishedName: "2.5.4.49",
        emailAddress: "1.2.840.113549.1.9.1",
        businessCategory: "2.5.4.15",
        postalCode: "2.5.4.17",
        jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1",
        jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2",
        jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3",
        subjectKeyIdentifier: "2.5.29.14",
        keyUsage: "2.5.29.15",
        subjectAltName: "2.5.29.17",
        issuerAltName: "2.5.29.18",
        basicConstraints: "2.5.29.19",
        nameConstraints: "2.5.29.30",
        cRLDistributionPoints: "2.5.29.31",
        certificatePolicies: "2.5.29.32",
        authorityKeyIdentifier: "2.5.29.35",
        policyConstraints: "2.5.29.36",
        extKeyUsage: "2.5.29.37",
        authorityInfoAccess: "1.3.6.1.5.5.7.1.1",
        ocsp: "1.3.6.1.5.5.7.48.1",
        caIssuers: "1.3.6.1.5.5.7.48.2",
        anyExtendedKeyUsage: "2.5.29.37.0",
        serverAuth: "1.3.6.1.5.5.7.3.1",
        clientAuth: "1.3.6.1.5.5.7.3.2",
        codeSigning: "1.3.6.1.5.5.7.3.3",
        emailProtection: "1.3.6.1.5.5.7.3.4",
        timeStamping: "1.3.6.1.5.5.7.3.8",
        ocspSigning: "1.3.6.1.5.5.7.3.9",
        ecPublicKey: "1.2.840.10045.2.1",
        secp256r1: "1.2.840.10045.3.1.7",
        secp256k1: "1.3.132.0.10",
        secp384r1: "1.3.132.0.34",
        pkcs5PBES2: "1.2.840.113549.1.5.13",
        pkcs5PBKDF2: "1.2.840.113549.1.5.12",
        "des-EDE3-CBC": "1.2.840.113549.3.7",
        data: "1.2.840.113549.1.7.1",
        "signed-data": "1.2.840.113549.1.7.2",
        "enveloped-data": "1.2.840.113549.1.7.3",
        "digested-data": "1.2.840.113549.1.7.5",
        "encrypted-data": "1.2.840.113549.1.7.6",
        "authenticated-data": "1.2.840.113549.1.9.16.1.2",
        tstinfo: "1.2.840.113549.1.9.16.1.4",
        extensionRequest: "1.2.840.113549.1.9.14",
    };
    this.objCache = {};
    this.name2obj = function(b) {
        if (typeof this.objCache[b] != "undefined") {
            return this.objCache[b]
        }
        if (typeof this.name2oidList[b] == "undefined") {
            throw "Name of ObjectIdentifier not defined: " + b
        }
        var c = this.name2oidList[b];
        var d = new KJUR.asn1.DERObjectIdentifier({
            oid: c
        });
        this.objCache[b] = d;
        return d
    };
    this.atype2obj = function(b) {
        if (typeof this.objCache[b] != "undefined") {
            return this.objCache[b]
        }
        if (typeof this.atype2oidList[b] == "undefined") {
            throw "AttributeType name undefined: " + b
        }
        var c = this.atype2oidList[b];
        var d = new KJUR.asn1.DERObjectIdentifier({
            oid: c
        });
        this.objCache[b] = d;
        return d
    }
};
KJUR.asn1.x509.OID.oid2name = function(b) {
    var c = KJUR.asn1.x509.OID.name2oidList;
    for (var a in c) {
        if (c[a] == b) {
            return a
        }
    }
    return ""
};
KJUR.asn1.x509.OID.oid2atype = function(b) {
    var c = KJUR.asn1.x509.OID.atype2oidList;
    for (var a in c) {
        if (c[a] == b) {
            return a
        }
    }
    return b
};
KJUR.asn1.x509.OID.name2oid = function(a) {
    var b = KJUR.asn1.x509.OID.name2oidList;
    if (b[a] === undefined) {
        return ""
    }
    return b[a]
};
KJUR.asn1.x509.X509Util = new
function() {
    this.getPKCS8PubKeyPEMfromRSAKey = function(i) {
        var h = null;
        var f = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(i.n);
        var j = KJUR.asn1.ASN1Util.integerToByteHex(i.e);
        var a = new KJUR.asn1.DERInteger({
            hex: f
        });
        var g = new KJUR.asn1.DERInteger({
            hex: j
        });
        var l = new KJUR.asn1.DERSequence({
            array: [a, g]
        });
        var c = l.getEncodedHex();
        var d = new KJUR.asn1.x509.AlgorithmIdentifier({
            name: "rsaEncryption"
        });
        var b = new KJUR.asn1.DERBitString({
            hex: "00" + c
        });
        var k = new KJUR.asn1.DERSequence({
            array: [d, b]
        });
        var e = k.getEncodedHex();
        var h = KJUR.asn1.ASN1Util.getPEMStringFromHex(e, "PUBLIC KEY");
        return h
    }
};
KJUR.asn1.x509.X509Util.newCertPEM = function(f) {
    var c = KJUR.asn1.x509;
    var e = new c.TBSCertificate();
    if (f.serial !== undefined) {
        e.setSerialNumberByParam(f.serial)
    } else {
        throw "serial number undefined."
    }
    if (typeof f.sigalg.name === "string") {
        e.setSignatureAlgByParam(f.sigalg)
    } else {
        throw "unproper signature algorithm name"
    }
    if (f.issuer !== undefined) {
        e.setIssuerByParam(f.issuer)
    } else {
        throw "issuer name undefined."
    }
    if (f.notbefore !== undefined) {
        e.setNotBeforeByParam(f.notbefore)
    } else {
        throw "notbefore undefined."
    }
    if (f.notafter !== undefined) {
        e.setNotAfterByParam(f.notafter)
    } else {
        throw "notafter undefined."
    }
    if (f.subject !== undefined) {
        e.setSubjectByParam(f.subject)
    } else {
        throw "subject name undefined."
    }
    if (f.sbjpubkey !== undefined) {
        e.setSubjectPublicKeyByGetKey(f.sbjpubkey)
    } else {
        throw "subject public key undefined."
    }
    if (f.ext !== undefined && f.ext.length !== undefined) {
        for (var b = 0; b < f.ext.length; b++) {
            for (key in f.ext[b]) {
                e.appendExtensionByName(key, f.ext[b][key])
            }
        }
    }
    if (f.cakey === undefined && f.sighex === undefined) {
        throw "param cakey and sighex undefined."
    }
    var d = null;
    var a = null;
    if (f.cakey) {
        if (f.cakey.isPrivate === true) {
            d = f.cakey
        } else {
            d = KEYUTIL.getKey.apply(null, f.cakey)
        }
        a = new c.Certificate({
            tbscertobj: e,
            prvkeyobj: d
        });
        a.sign()
    }
    if (f.sighex) {
        a = new c.Certificate({
            tbscertobj: e
        });
        a.setSignatureHex(f.sighex)
    }
    return a.getPEMString()
};
/*! asn1cms-1.0.3.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
    KJUR.asn1 = {}
}
if (typeof KJUR.asn1.cms == "undefined" || !KJUR.asn1.cms) {
    KJUR.asn1.cms = {}
}
KJUR.asn1.cms.Attribute = function(b) {
    KJUR.asn1.cms.Attribute.superclass.constructor.call(this);
    var a = [];
    this.getEncodedHex = function() {
        var f, e, c;
        f = new KJUR.asn1.DERObjectIdentifier({
            oid: this.attrTypeOid
        });
        e = new KJUR.asn1.DERSet({
            array: this.valueList
        });
        try {
            e.getEncodedHex()
        } catch(d) {
            throw "fail valueSet.getEncodedHex in Attribute(1)/" + d
        }
        c = new KJUR.asn1.DERSequence({
            array: [f, e]
        });
        try {
            this.hTLV = c.getEncodedHex()
        } catch(d) {
            throw "failed seq.getEncodedHex in Attribute(2)/" + d
        }
        return this.hTLV
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.Attribute, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.ContentType = function(b) {
    KJUR.asn1.cms.ContentType.superclass.constructor.call(this);
    this.attrTypeOid = "1.2.840.113549.1.9.3";
    var a = null;
    if (typeof b != "undefined") {
        var a = new KJUR.asn1.DERObjectIdentifier(b);
        this.valueList = [a]
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.ContentType, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.MessageDigest = function(e) {
    KJUR.asn1.cms.MessageDigest.superclass.constructor.call(this);
    this.attrTypeOid = "1.2.840.113549.1.9.4";
    if (typeof e != "undefined") {
        if (e.eciObj instanceof KJUR.asn1.cms.EncapsulatedContentInfo && typeof e.hashAlg == "string") {
            var b = e.eciObj.eContentValueHex;
            var a = e.hashAlg;
            var c = KJUR.crypto.Util.hashHex(b, a);
            var d = new KJUR.asn1.DEROctetString({
                hex: c
            });
            d.getEncodedHex();
            this.valueList = [d]
        } else {
            var d = new KJUR.asn1.DEROctetString(e);
            d.getEncodedHex();
            this.valueList = [d]
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.MessageDigest, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.SigningTime = function(c) {
    KJUR.asn1.cms.SigningTime.superclass.constructor.call(this);
    this.attrTypeOid = "1.2.840.113549.1.9.5";
    if (typeof c != "undefined") {
        var a = new KJUR.asn1.x509.Time(c);
        try {
            a.getEncodedHex()
        } catch(b) {
            throw "SigningTime.getEncodedHex() failed/" + b
        }
        this.valueList = [a]
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.SigningTime, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.SigningCertificate = function(d) {
    KJUR.asn1.cms.SigningCertificate.superclass.constructor.call(this);
    this.attrTypeOid = "1.2.840.113549.1.9.16.2.12";
    var a = KJUR.asn1;
    var c = KJUR.asn1.cms;
    var b = KJUR.crypto;
    this.setCerts = function(l) {
        var j = [];
        for (var h = 0; h < l.length; h++) {
            var f = ASN1HEX.pemToHex(l[h]);
            var e = b.Util.hashHex(f, "sha1");
            var m = new a.DEROctetString({
                hex: e
            });
            m.getEncodedHex();
            var k = new c.IssuerAndSerialNumber({
                cert: l[h]
            });
            k.getEncodedHex();
            var n = new a.DERSequence({
                array: [m, k]
            });
            n.getEncodedHex();
            j.push(n)
        }
        var g = new a.DERSequence({
            array: j
        });
        g.getEncodedHex();
        this.valueList = [g]
    };
    if (typeof d != "undefined") {
        if (typeof d.array == "object") {
            this.setCerts(d.array)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.SigningCertificate, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.SigningCertificateV2 = function(e) {
    KJUR.asn1.cms.SigningCertificateV2.superclass.constructor.call(this);
    this.attrTypeOid = "1.2.840.113549.1.9.16.2.47";
    var b = KJUR.asn1;
    var f = KJUR.asn1.x509;
    var d = KJUR.asn1.cms;
    var c = KJUR.crypto;
    this.setCerts = function(p, h) {
        var n = [];
        for (var l = 0; l < p.length; l++) {
            var j = ASN1HEX.pemToHex(p[l]);
            var r = [];
            if (h != "sha256") {
                r.push(new f.AlgorithmIdentifier({
                    name: h
                }))
            }
            var g = c.Util.hashHex(j, h);
            var q = new b.DEROctetString({
                hex: g
            });
            q.getEncodedHex();
            r.push(q);
            var m = new d.IssuerAndSerialNumber({
                cert: p[l]
            });
            m.getEncodedHex();
            r.push(m);
            var o = new b.DERSequence({
                array: r
            });
            o.getEncodedHex();
            n.push(o)
        }
        var k = new b.DERSequence({
            array: n
        });
        k.getEncodedHex();
        this.valueList = [k]
    };
    if (typeof e != "undefined") {
        if (typeof e.array == "object") {
            var a = "sha256";
            if (typeof e.hashAlg == "string") {
                a = e.hashAlg
            }
            this.setCerts(e.array, a)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.SigningCertificateV2, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.IssuerAndSerialNumber = function(c) {
    KJUR.asn1.cms.IssuerAndSerialNumber.superclass.constructor.call(this);
    var e = null;
    var b = null;
    var a = KJUR.asn1;
    var d = a.x509;
    this.setByCertPEM = function(i) {
        var g = ASN1HEX.pemToHex(i);
        var f = new X509();
        f.hex = g;
        var j = f.getIssuerHex();
        this.dIssuer = new d.X500Name();
        this.dIssuer.hTLV = j;
        var h = f.getSerialNumberHex();
        this.dSerial = new a.DERInteger({
            hex: h
        })
    };
    this.getEncodedHex = function() {
        var f = new KJUR.asn1.DERSequence({
            array: [this.dIssuer, this.dSerial]
        });
        this.hTLV = f.getEncodedHex();
        return this.hTLV
    };
    if (typeof c != "undefined") {
        if (typeof c == "string" && c.indexOf("-----BEGIN ") != -1) {
            this.setByCertPEM(c)
        }
        if (c.issuer && c.serial) {
            if (c.issuer instanceof KJUR.asn1.x509.X500Name) {
                this.dIssuer = c.issuer
            } else {
                this.dIssuer = new KJUR.asn1.x509.X500Name(c.issuer)
            }
            if (c.serial instanceof KJUR.asn1.DERInteger) {
                this.dSerial = c.serial
            } else {
                this.dSerial = new KJUR.asn1.DERInteger(c.serial)
            }
        }
        if (typeof c.cert == "string") {
            this.setByCertPEM(c.cert)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.IssuerAndSerialNumber, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.AttributeList = function(a) {
    KJUR.asn1.cms.AttributeList.superclass.constructor.call(this);
    this.list = new Array();
    this.sortFlag = true;
    this.add = function(b) {
        if (b instanceof KJUR.asn1.cms.Attribute) {
            this.list.push(b)
        }
    };
    this.length = function() {
        return this.list.length
    };
    this.clear = function() {
        this.list = new Array();
        this.hTLV = null;
        this.hV = null
    };
    this.getEncodedHex = function() {
        if (typeof this.hTLV == "string") {
            return this.hTLV
        }
        var b = new KJUR.asn1.DERSet({
            array: this.list,
            sortflag: this.sortFlag
        });
        this.hTLV = b.getEncodedHex();
        return this.hTLV
    };
    if (typeof a != "undefined") {
        if (typeof a.sortflag != "undefined" && a.sortflag == false) {
            this.sortFlag = false
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.AttributeList, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.SignerInfo = function(c) {
    KJUR.asn1.cms.SignerInfo.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var b = KJUR.asn1.cms;
    var d = KJUR.asn1.x509;
    this.dCMSVersion = new a.DERInteger({
        "int": 1
    });
    this.dSignerIdentifier = null;
    this.dDigestAlgorithm = null;
    this.dSignedAttrs = new b.AttributeList();
    this.dSigAlg = null;
    this.dSig = null;
    this.dUnsignedAttrs = new b.AttributeList();
    this.setSignerIdentifier = function(f) {
        if (typeof f == "string" && f.indexOf("CERTIFICATE") != -1 && f.indexOf("BEGIN") != -1 && f.indexOf("END") != -1) {
            var e = f;
            this.dSignerIdentifier = new b.IssuerAndSerialNumber({
                cert: f
            })
        }
    };
    this.setForContentAndHash = function(e) {
        if (typeof e != "undefined") {
            if (e.eciObj instanceof KJUR.asn1.cms.EncapsulatedContentInfo) {
                this.dSignedAttrs.add(new b.ContentType({
                    oid: "1.2.840.113549.1.7.1"
                }));
                this.dSignedAttrs.add(new b.MessageDigest({
                    eciObj: e.eciObj,
                    hashAlg: e.hashAlg
                }))
            }
            if (typeof e.sdObj != "undefined" && e.sdObj instanceof KJUR.asn1.cms.SignedData) {
                if (e.sdObj.digestAlgNameList.join(":").indexOf(e.hashAlg) == -1) {
                    e.sdObj.digestAlgNameList.push(e.hashAlg)
                }
            }
            if (typeof e.hashAlg == "string") {
                this.dDigestAlgorithm = new d.AlgorithmIdentifier({
                    name: e.hashAlg
                })
            }
        }
    };
    this.sign = function(j, f) {
        this.dSigAlg = new d.AlgorithmIdentifier({
            name: f
        });
        var g = this.dSignedAttrs.getEncodedHex();
        var e = KEYUTIL.getKey(j);
        var i = new KJUR.crypto.Signature({
            alg: f
        });
        i.init(e);
        i.updateHex(g);
        var h = i.sign();
        this.dSig = new a.DEROctetString({
            hex: h
        })
    };
    this.addUnsigned = function(e) {
        this.hTLV = null;
        this.dUnsignedAttrs.hTLV = null;
        this.dUnsignedAttrs.add(e)
    };
    this.getEncodedHex = function() {
        if (this.dSignedAttrs instanceof KJUR.asn1.cms.AttributeList && this.dSignedAttrs.length() == 0) {
            throw "SignedAttrs length = 0 (empty)"
        }
        var e = new a.DERTaggedObject({
            obj: this.dSignedAttrs,
            tag: "a0",
            explicit: false
        });
        var h = null;
        if (this.dUnsignedAttrs.length() > 0) {
            h = new a.DERTaggedObject({
                obj: this.dUnsignedAttrs,
                tag: "a1",
                explicit: false
            })
        }
        var g = [this.dCMSVersion, this.dSignerIdentifier, this.dDigestAlgorithm, e, this.dSigAlg, this.dSig, ];
        if (h != null) {
            g.push(h)
        }
        var f = new a.DERSequence({
            array: g
        });
        this.hTLV = f.getEncodedHex();
        return this.hTLV
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.SignerInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.EncapsulatedContentInfo = function(c) {
    KJUR.asn1.cms.EncapsulatedContentInfo.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var b = KJUR.asn1.cms;
    var d = KJUR.asn1.x509;
    this.dEContentType = new a.DERObjectIdentifier({
        name: "data"
    });
    this.dEContent = null;
    this.isDetached = false;
    this.eContentValueHex = null;
    this.setContentType = function(e) {
        if (e.match(/^[0-2][.][0-9.]+$/)) {
            this.dEContentType = new a.DERObjectIdentifier({
                oid: e
            })
        } else {
            this.dEContentType = new a.DERObjectIdentifier({
                name: e
            })
        }
    };
    this.setContentValue = function(e) {
        if (typeof e != "undefined") {
            if (typeof e.hex == "string") {
                this.eContentValueHex = e.hex
            } else {
                if (typeof e.str == "string") {
                    this.eContentValueHex = utf8tohex(e.str)
                }
            }
        }
    };
    this.setContentValueHex = function(e) {
        this.eContentValueHex = e
    };
    this.setContentValueStr = function(e) {
        this.eContentValueHex = utf8tohex(e)
    };
    this.getEncodedHex = function() {
        if (typeof this.eContentValueHex != "string") {
            throw "eContentValue not yet set"
        }
        var g = new a.DEROctetString({
            hex: this.eContentValueHex
        });
        this.dEContent = new a.DERTaggedObject({
            obj: g,
            tag: "a0",
            explicit: true
        });
        var e = [this.dEContentType];
        if (!this.isDetached) {
            e.push(this.dEContent)
        }
        var f = new a.DERSequence({
            array: e
        });
        this.hTLV = f.getEncodedHex();
        return this.hTLV
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.EncapsulatedContentInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.ContentInfo = function(c) {
    KJUR.asn1.cms.ContentInfo.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var b = KJUR.asn1.cms;
    var d = KJUR.asn1.x509;
    this.dContentType = null;
    this.dContent = null;
    this.setContentType = function(e) {
        if (typeof e == "string") {
            this.dContentType = d.OID.name2obj(e)
        }
    };
    this.getEncodedHex = function() {
        var f = new a.DERTaggedObject({
            obj: this.dContent,
            tag: "a0",
            explicit: true
        });
        var e = new a.DERSequence({
            array: [this.dContentType, f]
        });
        this.hTLV = e.getEncodedHex();
        return this.hTLV
    };
    if (typeof c != "undefined") {
        if (c.type) {
            this.setContentType(c.type)
        }
        if (c.obj && c.obj instanceof a.ASN1Object) {
            this.dContent = c.obj
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.ContentInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.SignedData = function(c) {
    KJUR.asn1.cms.SignedData.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var b = KJUR.asn1.cms;
    var d = KJUR.asn1.x509;
    this.dCMSVersion = new a.DERInteger({
        "int": 1
    });
    this.dDigestAlgs = null;
    this.digestAlgNameList = [];
    this.dEncapContentInfo = new b.EncapsulatedContentInfo();
    this.dCerts = null;
    this.certificateList = [];
    this.crlList = [];
    this.signerInfoList = [new b.SignerInfo()];
    this.addCertificatesByPEM = function(e) {
        var f = ASN1HEX.pemToHex(e);
        var g = new a.ASN1Object();
        g.hTLV = f;
        this.certificateList.push(g)
    };
    this.getEncodedHex = function() {
        if (typeof this.hTLV == "string") {
            return this.hTLV
        }
        if (this.dDigestAlgs == null) {
            var k = [];
            for (var j = 0; j < this.digestAlgNameList.length; j++) {
                var h = this.digestAlgNameList[j];
                var m = new d.AlgorithmIdentifier({
                    name: h
                });
                k.push(m)
            }
            this.dDigestAlgs = new a.DERSet({
                array: k
            })
        }
        var e = [this.dCMSVersion, this.dDigestAlgs, this.dEncapContentInfo];
        if (this.dCerts == null) {
            if (this.certificateList.length > 0) {
                var l = new a.DERSet({
                    array: this.certificateList
                });
                this.dCerts = new a.DERTaggedObject({
                    obj: l,
                    tag: "a0",
                    explicit: false
                })
            }
        }
        if (this.dCerts != null) {
            e.push(this.dCerts)
        }
        var g = new a.DERSet({
            array: this.signerInfoList
        });
        e.push(g);
        var f = new a.DERSequence({
            array: e
        });
        this.hTLV = f.getEncodedHex();
        return this.hTLV
    };
    this.getContentInfo = function() {
        this.getEncodedHex();
        var e = new b.ContentInfo({
            type: "signed-data",
            obj: this
        });
        return e
    };
    this.getContentInfoEncodedHex = function() {
        var e = this.getContentInfo();
        var f = e.getEncodedHex();
        return f
    };
    this.getPEM = function() {
        var e = this.getContentInfoEncodedHex();
        var f = a.ASN1Util.getPEMStringFromHex(e, "CMS");
        return f
    }
};
YAHOO.lang.extend(KJUR.asn1.cms.SignedData, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.CMSUtil = new
function() {};
KJUR.asn1.cms.CMSUtil.newSignedData = function(a) {
    var h = KJUR.asn1.cms;
    var g = KJUR.asn1.cades;
    var f = new h.SignedData();
    f.dEncapContentInfo.setContentValue(a.content);
    if (typeof a.certs == "object") {
        for (var b = 0; b < a.certs.length; b++) {
            f.addCertificatesByPEM(a.certs[b])
        }
    }
    f.signerInfoList = [];
    for (var b = 0; b < a.signerInfos.length; b++) {
        var d = a.signerInfos[b];
        var c = new h.SignerInfo();
        c.setSignerIdentifier(d.signerCert);
        c.setForContentAndHash({
            sdObj: f,
            eciObj: f.dEncapContentInfo,
            hashAlg: d.hashAlg
        });
        for (attrName in d.sAttr) {
            var j = d.sAttr[attrName];
            if (attrName == "SigningTime") {
                var e = new h.SigningTime(j);
                c.dSignedAttrs.add(e)
            }
            if (attrName == "SigningCertificate") {
                var e = new h.SigningCertificate(j);
                c.dSignedAttrs.add(e)
            }
            if (attrName == "SigningCertificateV2") {
                var e = new h.SigningCertificateV2(j);
                c.dSignedAttrs.add(e)
            }
            if (attrName == "SignaturePolicyIdentifier") {
                var e = new g.SignaturePolicyIdentifier(j);
                c.dSignedAttrs.add(e)
            }
        }
        c.sign(d.signerPrvKey, d.sigAlg);
        f.signerInfoList.push(c)
    }
    return f
};
/*! asn1tsp-1.0.1.js (c) 2014 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
    KJUR.asn1 = {}
}
if (typeof KJUR.asn1.tsp == "undefined" || !KJUR.asn1.tsp) {
    KJUR.asn1.tsp = {}
}
KJUR.asn1.tsp.Accuracy = function(b) {
    KJUR.asn1.tsp.Accuracy.superclass.constructor.call(this);
    var a = KJUR.asn1;
    this.seconds = null;
    this.millis = null;
    this.micros = null;
    this.getEncodedHex = function() {
        var e = null;
        var g = null;
        var i = null;
        var c = [];
        if (this.seconds != null) {
            e = new a.DERInteger({
                "int": this.seconds
            });
            c.push(e)
        }
        if (this.millis != null) {
            var h = new a.DERInteger({
                "int": this.millis
            });
            g = new a.DERTaggedObject({
                obj: h,
                tag: "80",
                explicit: false
            });
            c.push(g)
        }
        if (this.micros != null) {
            var f = new a.DERInteger({
                "int": this.micros
            });
            i = new a.DERTaggedObject({
                obj: f,
                tag: "81",
                explicit: false
            });
            c.push(i)
        }
        var d = new a.DERSequence({
            array: c
        });
        this.hTLV = d.getEncodedHex();
        return this.hTLV
    };
    if (typeof b != "undefined") {
        if (typeof b.seconds == "number") {
            this.seconds = b.seconds
        }
        if (typeof b.millis == "number") {
            this.millis = b.millis
        }
        if (typeof b.micros == "number") {
            this.micros = b.micros
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.Accuracy, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.MessageImprint = function(b) {
    KJUR.asn1.tsp.MessageImprint.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var c = KJUR.asn1.x509;
    this.dHashAlg = null;
    this.dHashValue = null;
    this.getEncodedHex = function() {
        if (typeof this.hTLV == "string") {
            return this.hTLV
        }
        var d = new a.DERSequence({
            array: [this.dHashAlg, this.dHashValue]
        });
        return d.getEncodedHex()
    };
    if (typeof b != "undefined") {
        if (typeof b.hashAlg == "string") {
            this.dHashAlg = new c.AlgorithmIdentifier({
                name: b.hashAlg
            })
        }
        if (typeof b.hashValue == "string") {
            this.dHashValue = new a.DEROctetString({
                hex: b.hashValue
            })
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.MessageImprint, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.TimeStampReq = function(c) {
    KJUR.asn1.tsp.TimeStampReq.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var b = KJUR.asn1.tsp;
    this.dVersion = new a.DERInteger({
        "int": 1
    });
    this.dMessageImprint = null;
    this.dPolicy = null;
    this.dNonce = null;
    this.certReq = true;
    this.setMessageImprint = function(d) {
        if (d instanceof KJUR.asn1.tsp.MessageImprint) {
            this.dMessageImprint = d;
            return
        }
        if (typeof d == "object") {
            this.dMessageImprint = new b.MessageImprint(d)
        }
    };
    this.getEncodedHex = function() {
        if (this.dMessageImprint == null) {
            throw "messageImprint shall be specified"
        }
        var d = [this.dVersion, this.dMessageImprint];
        if (this.dPolicy != null) {
            d.push(this.dPolicy)
        }
        if (this.dNonce != null) {
            d.push(this.dNonce)
        }
        if (this.certReq) {
            d.push(new a.DERBoolean())
        }
        var e = new a.DERSequence({
            array: d
        });
        this.hTLV = e.getEncodedHex();
        return this.hTLV
    };
    if (typeof c != "undefined") {
        if (typeof c.mi == "object") {
            this.setMessageImprint(c.mi)
        }
        if (typeof c.policy == "object") {
            this.dPolicy = new a.DERObjectIdentifier(c.policy)
        }
        if (typeof c.nonce == "object") {
            this.dNonce = new a.DERInteger(c.nonce)
        }
        if (typeof c.certreq == "boolean") {
            this.certReq = c.certreq
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampReq, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.TSTInfo = function(c) {
    KJUR.asn1.tsp.TSTInfo.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var d = KJUR.asn1.x509;
    var b = KJUR.asn1.tsp;
    this.dVersion = new a.DERInteger({
        "int": 1
    });
    this.dPolicy = null;
    this.dMessageImprint = null;
    this.dSerialNumber = null;
    this.dGenTime = null;
    this.dAccuracy = null;
    this.dOrdering = null;
    this.dNonce = null;
    this.dTsa = null;
    this.getEncodedHex = function() {
        var e = [this.dVersion];
        if (this.dPolicy == null) {
            throw "policy shall be specified."
        }
        e.push(this.dPolicy);
        if (this.dMessageImprint == null) {
            throw "messageImprint shall be specified."
        }
        e.push(this.dMessageImprint);
        if (this.dSerialNumber == null) {
            throw "serialNumber shall be specified."
        }
        e.push(this.dSerialNumber);
        if (this.dGenTime == null) {
            throw "genTime shall be specified."
        }
        e.push(this.dGenTime);
        if (this.dAccuracy != null) {
            e.push(this.dAccuracy)
        }
        if (this.dOrdering != null) {
            e.push(this.dOrdering)
        }
        if (this.dNonce != null) {
            e.push(this.dNonce)
        }
        if (this.dTsa != null) {
            e.push(this.dTsa)
        }
        var f = new a.DERSequence({
            array: e
        });
        this.hTLV = f.getEncodedHex();
        return this.hTLV
    };
    if (typeof c != "undefined") {
        if (typeof c.policy == "string") {
            if (!c.policy.match(/^[0-9.]+$/)) {
                throw "policy shall be oid like 0.1.4.134"
            }
            this.dPolicy = new a.DERObjectIdentifier({
                oid: c.policy
            })
        }
        if (typeof c.messageImprint != "undefined") {
            this.dMessageImprint = new b.MessageImprint(c.messageImprint)
        }
        if (typeof c.serialNumber != "undefined") {
            this.dSerialNumber = new a.DERInteger(c.serialNumber)
        }
        if (typeof c.genTime != "undefined") {
            this.dGenTime = new a.DERGeneralizedTime(c.genTime)
        }
        if (typeof c.accuracy != "undefind") {
            this.dAccuracy = new b.Accuracy(c.accuracy)
        }
        if (typeof c.ordering != "undefined" && c.ordering == true) {
            this.dOrdering = new a.DERBoolean()
        }
        if (typeof c.nonce != "undefined") {
            this.dNonce = new a.DERInteger(c.nonce)
        }
        if (typeof c.tsa != "undefined") {
            this.dTsa = new d.X500Name(c.tsa)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.TSTInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.TimeStampResp = function(c) {
    KJUR.asn1.tsp.TimeStampResp.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var b = KJUR.asn1.tsp;
    this.dStatus = null;
    this.dTST = null;
    this.getEncodedHex = function() {
        if (this.dStatus == null) {
            throw "status shall be specified"
        }
        var d = [this.dStatus];
        if (this.dTST != null) {
            d.push(this.dTST)
        }
        var e = new a.DERSequence({
            array: d
        });
        this.hTLV = e.getEncodedHex();
        return this.hTLV
    };
    if (typeof c != "undefined") {
        if (typeof c.status == "object") {
            this.dStatus = new b.PKIStatusInfo(c.status)
        }
        if (typeof c.tst != "undefined" && c.tst instanceof KJUR.asn1.ASN1Object) {
            this.dTST = c.tst.getContentInfo()
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampResp, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIStatusInfo = function(c) {
    KJUR.asn1.tsp.PKIStatusInfo.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var b = KJUR.asn1.tsp;
    this.dStatus = null;
    this.dStatusString = null;
    this.dFailureInfo = null;
    this.getEncodedHex = function() {
        if (this.dStatus == null) {
            throw "status shall be specified"
        }
        var d = [this.dStatus];
        if (this.dStatusString != null) {
            d.push(this.dStatusString)
        }
        if (this.dFailureInfo != null) {
            d.push(this.dFailureInfo)
        }
        var e = new a.DERSequence({
            array: d
        });
        this.hTLV = e.getEncodedHex();
        return this.hTLV
    };
    if (typeof c != "undefined") {
        if (typeof c.status == "object") {
            this.dStatus = new b.PKIStatus(c.status)
        }
        if (typeof c.statstr == "object") {
            this.dStatusString = new b.PKIFreeText({
                array: c.statstr
            })
        }
        if (typeof c.failinfo == "object") {
            this.dFailureInfo = new b.PKIFailureInfo(c.failinfo)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.PKIStatusInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIStatus = function(e) {
    KJUR.asn1.tsp.PKIStatus.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var b = KJUR.asn1.tsp;
    var d = null;
    this.getEncodedHex = function() {
        this.hTLV = this.dStatus.getEncodedHex();
        return this.hTLV
    };
    if (typeof e != "undefined") {
        if (typeof e.name != "undefined") {
            var c = b.PKIStatus.valueList;
            if (typeof c[e.name] == "undefined") {
                throw "name undefined: " + e.name
            }
            this.dStatus = new a.DERInteger({
                "int": c[e.name]
            })
        } else {
            this.dStatus = new a.DERInteger(e)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.PKIStatus, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIStatus.valueList = {
    granted: 0,
    grantedWithMods: 1,
    rejection: 2,
    waiting: 3,
    revocationWarning: 4,
    revocationNotification: 5
};
KJUR.asn1.tsp.PKIFreeText = function(b) {
    KJUR.asn1.tsp.PKIFreeText.superclass.constructor.call(this);
    var a = KJUR.asn1;
    this.textList = [];
    this.getEncodedHex = function() {
        var c = [];
        for (var e = 0; e < this.textList.length; e++) {
            c.push(new a.DERUTF8String({
                str: this.textList[e]
            }))
        }
        var d = new a.DERSequence({
            array: c
        });
        this.hTLV = d.getEncodedHex();
        return this.hTLV
    };
    if (typeof b != "undefined") {
        if (typeof b.array == "object") {
            this.textList = b.array
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.PKIFreeText, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIFailureInfo = function(d) {
    KJUR.asn1.tsp.PKIFailureInfo.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var b = KJUR.asn1.tsp;
    this.value = null;
    this.getEncodedHex = function() {
        if (this.value == null) {
            throw "value shall be specified"
        }
        var e = new Number(this.value).toString(2);
        var f = new a.DERBitString();
        f.setByBinaryString(e);
        this.hTLV = f.getEncodedHex();
        return this.hTLV
    };
    if (typeof d != "undefined") {
        if (typeof d.name == "string") {
            var c = b.PKIFailureInfo.valueList;
            if (typeof c[d.name] == "undefined") {
                throw "name undefined: " + d.name
            }
            this.value = c[d.name]
        } else {
            if (typeof d["int"] == "number") {
                this.value = d["int"]
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.PKIFailureInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIFailureInfo.valueList = {
    badAlg: 0,
    badRequest: 2,
    badDataFormat: 5,
    timeNotAvailable: 14,
    unacceptedPolicy: 15,
    unacceptedExtension: 16,
    addInfoNotAvailable: 17,
    systemFailure: 25
};
KJUR.asn1.tsp.AbstractTSAAdapter = function(a) {
    this.getTSTHex = function(c, b) {
        throw "not implemented yet"
    }
};
KJUR.asn1.tsp.SimpleTSAAdapter = function(a) {
    KJUR.asn1.tsp.SimpleTSAAdapter.superclass.constructor.call(this);
    this.params = null;
    this.serial = 0;
    this.getTSTHex = function(c, b) {
        var e = KJUR.crypto.Util.hashHex(c, b);
        this.params.tstInfo.messageImprint = {
            hashAlg: b,
            hashValue: e
        };
        this.params.tstInfo.serialNumber = {
            "int": this.serial++
        };
        var d = Math.floor(Math.random() * 1000000000);
        this.params.tstInfo.nonce = {
            "int": d
        };
        var f = KJUR.asn1.tsp.TSPUtil.newTimeStampToken(this.params);
        return f.getContentInfoEncodedHex()
    };
    if (typeof a != "undefined") {
        this.params = a
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.SimpleTSAAdapter, KJUR.asn1.tsp.AbstractTSAAdapter);
KJUR.asn1.tsp.FixedTSAAdapter = function(a) {
    KJUR.asn1.tsp.FixedTSAAdapter.superclass.constructor.call(this);
    this.params = null;
    this.getTSTHex = function(c, b) {
        var d = KJUR.crypto.Util.hashHex(c, b);
        this.params.tstInfo.messageImprint = {
            hashAlg: b,
            hashValue: d
        };
        var e = KJUR.asn1.tsp.TSPUtil.newTimeStampToken(this.params);
        return e.getContentInfoEncodedHex()
    };
    if (typeof a != "undefined") {
        this.params = a
    }
};
YAHOO.lang.extend(KJUR.asn1.tsp.FixedTSAAdapter, KJUR.asn1.tsp.AbstractTSAAdapter);
KJUR.asn1.tsp.TSPUtil = new
function() {};
KJUR.asn1.tsp.TSPUtil.newTimeStampToken = function(b) {
    var j = KJUR.asn1.cms;
    var a = KJUR.asn1.tsp;
    var g = new j.SignedData();
    var e = new a.TSTInfo(b.tstInfo);
    var f = e.getEncodedHex();
    g.dEncapContentInfo.setContentValue({
        hex: f
    });
    g.dEncapContentInfo.setContentType("tstinfo");
    if (typeof b.certs == "object") {
        for (var c = 0; c < b.certs.length; c++) {
            g.addCertificatesByPEM(b.certs[c])
        }
    }
    var d = g.signerInfoList[0];
    d.setSignerIdentifier(b.signerCert);
    d.setForContentAndHash({
        sdObj: g,
        eciObj: g.dEncapContentInfo,
        hashAlg: b.hashAlg
    });
    var h = new j.SigningCertificate({
        array: [b.signerCert]
    });
    d.dSignedAttrs.add(h);
    d.sign(b.signerPrvKey, b.sigAlg);
    return g
};
KJUR.asn1.tsp.TSPUtil.parseTimeStampReq = function(d) {
    var f = {};
    f.certreq = false;
    var h = ASN1HEX.getPosArrayOfChildren_AtObj(d, 0);
    if (h.length < 2) {
        throw "TimeStampReq must have at least 2 items"
    }
    var c = ASN1HEX.getHexOfTLV_AtObj(d, h[1]);
    f.mi = KJUR.asn1.tsp.TSPUtil.parseMessageImprint(c);
    for (var e = 2; e < h.length; e++) {
        var b = h[e];
        var a = d.substr(b, 2);
        if (a == "06") {
            var g = ASN1HEX.getHexOfV_AtObj(d, b);
            f.policy = ASN1HEX.hextooidstr(g)
        }
        if (a == "02") {
            f.nonce = ASN1HEX.getHexOfV_AtObj(d, b)
        }
        if (a == "01") {
            f.certreq = true
        }
    }
    return f
};
KJUR.asn1.tsp.TSPUtil.parseMessageImprint = function(c) {
    var h = {};
    if (c.substr(0, 2) != "30") {
        throw "head of messageImprint hex shall be '30'"
    }
    var a = ASN1HEX.getPosArrayOfChildren_AtObj(c, 0);
    var i = ASN1HEX.getDecendantIndexByNthList(c, 0, [0, 0]);
    var d = ASN1HEX.getHexOfV_AtObj(c, i);
    var e = ASN1HEX.hextooidstr(d);
    var g = KJUR.asn1.x509.OID.oid2name(e);
    if (g == "") {
        throw "hashAlg name undefined: " + e
    }
    var b = g;
    var f = ASN1HEX.getDecendantIndexByNthList(c, 0, [1]);
    h.hashAlg = b;
    h.hashValue = ASN1HEX.getHexOfV_AtObj(c, f);
    return h
};
/*! asn1cades-1.0.1.js (c) 2014-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
    KJUR.asn1 = {}
}
if (typeof KJUR.asn1.cades == "undefined" || !KJUR.asn1.cades) {
    KJUR.asn1.cades = {}
}
KJUR.asn1.cades.SignaturePolicyIdentifier = function(e) {
    KJUR.asn1.cades.SignaturePolicyIdentifier.superclass.constructor.call(this);
    this.attrTypeOid = "1.2.840.113549.1.9.16.2.15";
    var b = KJUR.asn1;
    var d = KJUR.asn1.cades;
    if (typeof e != "undefined") {
        if (typeof e.oid == "string" && typeof e.hash == "object") {
            var f = new b.DERObjectIdentifier({
                oid: e.oid
            });
            var a = new d.OtherHashAlgAndValue(e.hash);
            var c = new b.DERSequence({
                array: [f, a]
            });
            this.valueList = [c]
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cades.SignaturePolicyIdentifier, KJUR.asn1.cms.Attribute);
KJUR.asn1.cades.OtherHashAlgAndValue = function(b) {
    KJUR.asn1.cades.OtherHashAlgAndValue.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var c = KJUR.asn1.x509;
    this.dAlg = null;
    this.dHash = null;
    this.getEncodedHex = function() {
        var d = new a.DERSequence({
            array: [this.dAlg, this.dHash]
        });
        this.hTLV = d.getEncodedHex();
        return this.hTLV
    };
    if (typeof b != "undefined") {
        if (typeof b.alg == "string" && typeof b.hash == "string") {
            this.dAlg = new c.AlgorithmIdentifier({
                name: b.alg
            });
            this.dHash = new a.DEROctetString({
                hex: b.hash
            })
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cades.OtherHashAlgAndValue, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.SignatureTimeStamp = function(c) {
    KJUR.asn1.cades.SignatureTimeStamp.superclass.constructor.call(this);
    this.attrTypeOid = "1.2.840.113549.1.9.16.2.14";
    this.tstHex = null;
    var a = KJUR.asn1;
    if (typeof c != "undefined") {
        if (typeof c.res != "undefined") {
            if (typeof c.res == "string" && c.res.match(/^[0-9A-Fa-f]+$/)) {} else {
                if (c.res instanceof KJUR.asn1.ASN1Object) {} else {
                    throw "res param shall be ASN1Object or hex string"
                }
            }
        }
        if (typeof c.tst != "undefined") {
            if (typeof c.tst == "string" && c.tst.match(/^[0-9A-Fa-f]+$/)) {
                var b = new a.ASN1Object();
                this.tstHex = c.tst;
                b.hTLV = this.tstHex;
                b.getEncodedHex();
                this.valueList = [b]
            } else {
                if (c.tst instanceof KJUR.asn1.ASN1Object) {} else {
                    throw "tst param shall be ASN1Object or hex string"
                }
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cades.SignatureTimeStamp, KJUR.asn1.cms.Attribute);
KJUR.asn1.cades.CompleteCertificateRefs = function(c) {
    KJUR.asn1.cades.CompleteCertificateRefs.superclass.constructor.call(this);
    this.attrTypeOid = "1.2.840.113549.1.9.16.2.21";
    var a = KJUR.asn1;
    var b = KJUR.asn1.cades;
    this.setByArray = function(d) {
        this.valueList = [];
        for (var e = 0; e < d.length; e++) {
            var f = new b.OtherCertID(d[e]);
            this.valueList.push(f)
        }
    };
    if (typeof c != "undefined") {
        if (typeof c == "object" && typeof c.length == "number") {
            this.setByArray(c)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cades.CompleteCertificateRefs, KJUR.asn1.cms.Attribute);
KJUR.asn1.cades.OtherCertID = function(d) {
    KJUR.asn1.cades.OtherCertID.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var c = KJUR.asn1.cms;
    var b = KJUR.asn1.cades;
    this.hasIssuerSerial = true;
    this.dOtherCertHash = null;
    this.dIssuerSerial = null;
    this.setByCertPEM = function(e) {
        this.dOtherCertHash = new b.OtherHash(e);
        if (this.hasIssuerSerial) {
            this.dIssuerSerial = new c.IssuerAndSerialNumber(e)
        }
    };
    this.getEncodedHex = function() {
        if (this.hTLV != null) {
            return this.hTLV
        }
        if (this.dOtherCertHash == null) {
            throw "otherCertHash not set"
        }
        var e = [this.dOtherCertHash];
        if (this.dIssuerSerial != null) {
            e.push(this.dIssuerSerial)
        }
        var f = new a.DERSequence({
            array: e
        });
        this.hTLV = f.getEncodedHex();
        return this.hTLV
    };
    if (typeof d != "undefined") {
        if (typeof d == "string" && d.indexOf("-----BEGIN ") != -1) {
            this.setByCertPEM(d)
        }
        if (typeof d == "object") {
            if (d.hasis === false) {
                this.hasIssuerSerial = false
            }
            if (typeof d.cert == "string") {
                this.setByCertPEM(d.cert)
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cades.OtherCertID, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.OtherHash = function(c) {
    KJUR.asn1.cades.OtherHash.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var b = KJUR.asn1.cades;
    this.alg = "sha256";
    this.dOtherHash = null;
    this.setByCertPEM = function(d) {
        if (d.indexOf("-----BEGIN ") == -1) {
            throw "certPEM not to seem PEM format"
        }
        var e = ASN1HEX.pemToHex(d);
        var f = KJUR.crypto.Util.hashHex(e, this.alg);
        this.dOtherHash = new b.OtherHashAlgAndValue({
            alg: this.alg,
            hash: f
        })
    };
    this.getEncodedHex = function() {
        if (this.dOtherHash == null) {
            throw "OtherHash not set"
        }
        return this.dOtherHash.getEncodedHex()
    };
    if (typeof c != "undefined") {
        if (typeof c == "string") {
            if (c.indexOf("-----BEGIN ") != -1) {
                this.setByCertPEM(c)
            } else {
                if (c.match(/^[0-9A-Fa-f]+$/)) {
                    this.dOtherHash = new a.DEROctetString({
                        hex: c
                    })
                } else {
                    throw "unsupported string value for params"
                }
            }
        } else {
            if (typeof c == "object") {
                if (typeof c.cert == "string") {
                    if (typeof c.alg == "string") {
                        this.alg = c.alg
                    }
                    this.setByCertPEM(c.cert)
                } else {
                    this.dOtherHash = new b.OtherHashAlgAndValue(c)
                }
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.cades.OtherHash, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.CAdESUtil = new
function() {};
KJUR.asn1.cades.CAdESUtil.addSigTS = function(c, b, a) {};
KJUR.asn1.cades.CAdESUtil.parseSignedDataForAddingUnsigned = function(d) {
    var q = KJUR.asn1;
    var p = KJUR.asn1.cms;
    var c = KJUR.asn1.cades.CAdESUtil;
    var a = {};
    if (ASN1HEX.getDecendantHexTLVByNthList(d, 0, [0]) != "06092a864886f70d010702") {
        throw "hex is not CMS SignedData"
    }
    var s = ASN1HEX.getDecendantIndexByNthList(d, 0, [1, 0]);
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(d, s);
    if (b.length < 4) {
        throw "num of SignedData elem shall be 4 at least"
    }
    var f = b.shift();
    a.version = ASN1HEX.getHexOfTLV_AtObj(d, f);
    var l = b.shift();
    a.algs = ASN1HEX.getHexOfTLV_AtObj(d, l);
    var m = b.shift();
    a.encapcontent = ASN1HEX.getHexOfTLV_AtObj(d, m);
    a.certs = null;
    a.revs = null;
    a.si = [];
    var n = b.shift();
    if (d.substr(n, 2) == "a0") {
        a.certs = ASN1HEX.getHexOfTLV_AtObj(d, n);
        n = b.shift()
    }
    if (d.substr(n, 2) == "a1") {
        a.revs = ASN1HEX.getHexOfTLV_AtObj(d, n);
        n = b.shift()
    }
    var k = n;
    if (d.substr(k, 2) != "31") {
        throw "Can't find signerInfos"
    }
    var j = ASN1HEX.getPosArrayOfChildren_AtObj(d, k);
    for (var h = 0; h < j.length; h++) {
        var o = j[h];
        var e = c.parseSignerInfoForAddingUnsigned(d, o, h);
        a.si[h] = e
    }
    var g = null;
    a.obj = new p.SignedData();
    g = new q.ASN1Object();
    g.hTLV = a.version;
    a.obj.dCMSVersion = g;
    g = new q.ASN1Object();
    g.hTLV = a.algs;
    a.obj.dDigestAlgs = g;
    g = new q.ASN1Object();
    g.hTLV = a.encapcontent;
    a.obj.dEncapContentInfo = g;
    g = new q.ASN1Object();
    g.hTLV = a.certs;
    a.obj.dCerts = g;
    a.obj.signerInfoList = [];
    for (var h = 0; h < a.si.length; h++) {
        a.obj.signerInfoList.push(a.si[h].obj)
    }
    return a
};
KJUR.asn1.cades.CAdESUtil.parseSignerInfoForAddingUnsigned = function(d, k, a) {
    var m = KJUR.asn1;
    var l = KJUR.asn1.cms;
    var b = {};
    var e = ASN1HEX.getPosArrayOfChildren_AtObj(d, k);
    if (e.length != 6) {
        throw "not supported items for SignerInfo (!=6)"
    }
    var f = e.shift();
    b.version = ASN1HEX.getHexOfTLV_AtObj(d, f);
    var n = e.shift();
    b.si = ASN1HEX.getHexOfTLV_AtObj(d, n);
    var h = e.shift();
    b.digalg = ASN1HEX.getHexOfTLV_AtObj(d, h);
    var c = e.shift();
    b.sattrs = ASN1HEX.getHexOfTLV_AtObj(d, c);
    var i = e.shift();
    b.sigalg = ASN1HEX.getHexOfTLV_AtObj(d, i);
    var j = e.shift();
    b.sig = ASN1HEX.getHexOfTLV_AtObj(d, j);
    b.sigval = ASN1HEX.getHexOfV_AtObj(d, j);
    var g = null;
    b.obj = new l.SignerInfo();
    g = new m.ASN1Object();
    g.hTLV = b.version;
    b.obj.dCMSVersion = g;
    g = new m.ASN1Object();
    g.hTLV = b.si;
    b.obj.dSignerIdentifier = g;
    g = new m.ASN1Object();
    g.hTLV = b.digalg;
    b.obj.dDigestAlgorithm = g;
    g = new m.ASN1Object();
    g.hTLV = b.sattrs;
    b.obj.dSignedAttrs = g;
    g = new m.ASN1Object();
    g.hTLV = b.sigalg;
    b.obj.dSigAlg = g;
    g = new m.ASN1Object();
    g.hTLV = b.sig;
    b.obj.dSig = g;
    b.obj.dUnsignedAttrs = new l.AttributeList();
    return b
};
/*! asn1csr-1.0.3.js (c) 2015-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR.asn1.csr == "undefined" || !KJUR.asn1.csr) {
    KJUR.asn1.csr = {}
}
KJUR.asn1.csr.CertificationRequest = function(f) {
    KJUR.asn1.csr.CertificationRequest.superclass.constructor.call(this);
    var b = null;
    var d = null;
    var e = null;
    var c = null;
    var a = null;
    this.sign = function(i, h) {
        if (this.prvKey == null) {
            this.prvKey = h
        }
        this.asn1SignatureAlg = new KJUR.asn1.x509.AlgorithmIdentifier({
            name: i
        });
        sig = new KJUR.crypto.Signature({
            alg: i
        });
        sig.initSign(this.prvKey);
        sig.updateHex(this.asn1CSRInfo.getEncodedHex());
        this.hexSig = sig.sign();
        this.asn1Sig = new KJUR.asn1.DERBitString({
            hex: "00" + this.hexSig
        });
        var g = new KJUR.asn1.DERSequence({
            array: [this.asn1CSRInfo, this.asn1SignatureAlg, this.asn1Sig]
        });
        this.hTLV = g.getEncodedHex();
        this.isModified = false
    };
    this.getPEMString = function() {
        var g = KJUR.asn1.ASN1Util.getPEMStringFromHex(this.getEncodedHex(), "CERTIFICATE REQUEST");
        return g
    };
    this.getEncodedHex = function() {
        if (this.isModified == false && this.hTLV != null) {
            return this.hTLV
        }
        throw "not signed yet"
    };
    if (typeof f != "undefined") {
        if (typeof f.csrinfo != "undefined") {
            this.asn1CSRInfo = f.csrinfo
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.csr.CertificationRequest, KJUR.asn1.ASN1Object);
KJUR.asn1.csr.CertificationRequestInfo = function(a) {
    KJUR.asn1.csr.CertificationRequestInfo.superclass.constructor.call(this);
    this._initialize = function() {
        this.asn1Array = new Array();
        this.asn1Version = new KJUR.asn1.DERInteger({
            "int": 0
        });
        this.asn1Subject = null;
        this.asn1SubjPKey = null;
        this.extensionsArray = new Array()
    };
    this.setSubjectByParam = function(b) {
        this.asn1Subject = new KJUR.asn1.x509.X500Name(b)
    };
    this.setSubjectPublicKeyByGetKey = function(c) {
        var b = KEYUTIL.getKey(c);
        this.asn1SubjPKey = new KJUR.asn1.x509.SubjectPublicKeyInfo(b)
    };
    this.appendExtensionByName = function(c, b) {
        KJUR.asn1.x509.Extension.appendByNameToArray(c, b, this.extensionsArray)
    };
    this.getEncodedHex = function() {
        this.asn1Array = new Array();
        this.asn1Array.push(this.asn1Version);
        this.asn1Array.push(this.asn1Subject);
        this.asn1Array.push(this.asn1SubjPKey);
        if (this.extensionsArray.length > 0) {
            var e = new KJUR.asn1.DERSequence({
                array: this.extensionsArray
            });
            var d = new KJUR.asn1.DERSet({
                array: [e]
            });
            var c = new KJUR.asn1.DERSequence({
                array: [new KJUR.asn1.DERObjectIdentifier({
                    oid: "1.2.840.113549.1.9.14"
                }), d]
            });
            var b = new KJUR.asn1.DERTaggedObject({
                explicit: true,
                tag: "a0",
                obj: c
            });
            this.asn1Array.push(b)
        } else {
            var b = new KJUR.asn1.DERTaggedObject({
                explicit: false,
                tag: "a0",
                obj: new KJUR.asn1.DERNull()
            });
            this.asn1Array.push(b)
        }
        var f = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        this.hTLV = f.getEncodedHex();
        this.isModified = false;
        return this.hTLV
    };
    this._initialize()
};
YAHOO.lang.extend(KJUR.asn1.csr.CertificationRequestInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.csr.CSRUtil = new
function() {};
KJUR.asn1.csr.CSRUtil.newCSRPEM = function(g) {
    var d = KJUR.asn1.csr;
    if (g.subject === undefined) {
        throw "parameter subject undefined"
    }
    if (g.sbjpubkey === undefined) {
        throw "parameter sbjpubkey undefined"
    }
    if (g.sigalg === undefined) {
        throw "parameter sigalg undefined"
    }
    if (g.sbjprvkey === undefined) {
        throw "parameter sbjpubkey undefined"
    }
    var b = new d.CertificationRequestInfo();
    b.setSubjectByParam(g.subject);
    b.setSubjectPublicKeyByGetKey(g.sbjpubkey);
    if (g.ext !== undefined && g.ext.length !== undefined) {
        for (var c = 0; c < g.ext.length; c++) {
            for (key in g.ext[c]) {
                b.appendExtensionByName(key, g.ext[c][key])
            }
        }
    }
    var e = new d.CertificationRequest({
        csrinfo: b
    });
    var a = KEYUTIL.getKey(g.sbjprvkey);
    e.sign(g.sigalg, a);
    var f = e.getPEMString();
    return f
};
KJUR.asn1.csr.CSRUtil.getInfo = function(b) {
    var a = {};
    a.subject = {};
    a.pubkey = {};
    if (b.indexOf("-----BEGIN CERTIFICATE REQUEST") == -1) {
        throw "argument is not PEM file"
    }
    var c = ASN1HEX.pemToHex(b, "CERTIFICATE REQUEST");
    a.subject.hex = ASN1HEX.getDecendantHexTLVByNthList(c, 0, [0, 1]);
    a.subject.name = X509.hex2dn(a.subject.hex);
    a.pubkey.hex = ASN1HEX.getDecendantHexTLVByNthList(c, 0, [0, 2]);
    a.pubkey.obj = KEYUTIL.getKey(a.pubkey.hex, null, "pkcs8pub");
    return a
};
/*! asn1ocsp-1.0.1.js (c) 2016 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
    KJUR.asn1 = {}
}
if (typeof KJUR.asn1.ocsp == "undefined" || !KJUR.asn1.ocsp) {
    KJUR.asn1.ocsp = {}
}
KJUR.asn1.ocsp.DEFAULT_HASH = "sha1";
KJUR.asn1.ocsp.CertID = function(c) {
    KJUR.asn1.ocsp.CertID.superclass.constructor.call(this);
    var a = KJUR.asn1;
    var e = KJUR.asn1.x509;
    this.dHashAlg = null;
    this.dIssuerNameHash = null;
    this.dIssuerKeyHash = null;
    this.dSerialNumber = null;
    this.setByValue = function(i, h, f, g) {
        if (g === undefined) {
            g = KJUR.asn1.ocsp.DEFAULT_HASH
        }
        this.dHashAlg = new e.AlgorithmIdentifier({
            name: g
        });
        this.dIssuerNameHash = new a.DEROctetString({
            hex: i
        });
        this.dIssuerKeyHash = new a.DEROctetString({
            hex: h
        });
        this.dSerialNumber = new a.DERInteger({
            hex: f
        })
    };
    this.setByCert = function(m, i, k) {
        if (k === undefined) {
            k = KJUR.asn1.ocsp.DEFAULT_HASH
        }
        var f = new X509();
        f.readCertPEM(i);
        var n = new X509();
        n.readCertPEM(m);
        var o = X509.getPublicKeyInfoPropOfCertPEM(m);
        var l = o.keyhex;
        var g = f.getSerialNumberHex();
        var h = KJUR.crypto.Util.hashHex(n.getSubjectHex(), k);
        var j = KJUR.crypto.Util.hashHex(l, k);
        this.setByValue(h, j, g, k);
        this.hoge = f.getSerialNumberHex()
    };
    this.getEncodedHex = function() {
        if (this.dHashAlg === null && this.dIssuerNameHash === null && this.dIssuerKeyHash === null && this.dSerialNumber === null) {
            throw "not yet set values"
        }
        var f = [this.dHashAlg, this.dIssuerNameHash, this.dIssuerKeyHash, this.dSerialNumber];
        var g = new a.DERSequence({
            array: f
        });
        this.hTLV = g.getEncodedHex();
        return this.hTLV
    };
    if (typeof c !== "undefined") {
        var b = c;
        if (typeof b.issuerCert !== "undefined" && typeof b.subjectCert !== "undefined") {
            var d = KJUR.asn1.ocsp.DEFAULT_HASH;
            if (typeof b.alg === "undefined") {
                d = undefined
            }
            this.setByCert(b.issuerCert, b.subjectCert, d)
        } else {
            if (typeof b.namehash !== "undefined" && typeof b.keyhash !== "undefined" && typeof b.serial !== "undefined") {
                var d = KJUR.asn1.ocsp.DEFAULT_HASH;
                if (typeof b.alg === "undefined") {
                    d = undefined
                }
                this.setByValue(b.namehash, b.keyhash, b.serial, d)
            } else {
                throw "invalid constructor arguments"
            }
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.ocsp.CertID, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.Request = function(b) {
    KJUR.asn1.ocsp.Request.superclass.constructor.call(this);
    this.dReqCert = null;
    this.dExt = null;
    this.getEncodedHex = function() {
        var c = [];
        if (this.dReqCert === null) {
            throw "reqCert not set"
        }
        c.push(this.dReqCert);
        var d = new KJUR.asn1.DERSequence({
            array: c
        });
        this.hTLV = d.getEncodedHex();
        return this.hTLV
    };
    if (typeof b !== "undefined") {
        var a = new KJUR.asn1.ocsp.CertID(b);
        this.dReqCert = a
    }
};
YAHOO.lang.extend(KJUR.asn1.ocsp.Request, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.TBSRequest = function(a) {
    KJUR.asn1.ocsp.TBSRequest.superclass.constructor.call(this);
    this.version = 0;
    this.dRequestorName = null;
    this.dRequestList = [];
    this.dRequestExt = null;
    this.setRequestListByParam = function(d) {
        var b = [];
        for (var c = 0; c < d.length; c++) {
            var e = new KJUR.asn1.ocsp.Request(d[0]);
            b.push(e)
        }
        this.dRequestList = b
    };
    this.getEncodedHex = function() {
        var b = [];
        if (this.version !== 0) {
            throw "not supported version: " + this.version
        }
        if (this.dRequestorName !== null) {
            throw "requestorName not supported"
        }
        var d = new KJUR.asn1.DERSequence({
            array: this.dRequestList
        });
        b.push(d);
        if (this.dRequestExt !== null) {
            throw "requestExtensions not supported"
        }
        var c = new KJUR.asn1.DERSequence({
            array: b
        });
        this.hTLV = c.getEncodedHex();
        return this.hTLV
    };
    if (typeof a !== "undefined") {
        if (typeof a.reqList !== "undefined") {
            this.setRequestListByParam(a.reqList)
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.ocsp.TBSRequest, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.OCSPRequest = function(b) {
    KJUR.asn1.ocsp.OCSPRequest.superclass.constructor.call(this);
    this.dTbsRequest = null;
    this.dOptionalSignature = null;
    this.getEncodedHex = function() {
        var c = [];
        if (this.dTbsRequest !== null) {
            c.push(this.dTbsRequest)
        } else {
            throw "tbsRequest not set"
        }
        if (this.dOptionalSignature !== null) {
            throw "optionalSignature not supported"
        }
        var d = new KJUR.asn1.DERSequence({
            array: c
        });
        this.hTLV = d.getEncodedHex();
        return this.hTLV
    };
    if (typeof b !== "undefined") {
        if (typeof b.reqList !== "undefined") {
            var a = new KJUR.asn1.ocsp.TBSRequest(b);
            this.dTbsRequest = a
        }
    }
};
YAHOO.lang.extend(KJUR.asn1.ocsp.OCSPRequest, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.OCSPUtil = {};
KJUR.asn1.ocsp.OCSPUtil.getRequestHex = function(a, b, e) {
    if (e === undefined) {
        e = KJUR.asn1.ocsp.DEFAULT_HASH
    }
    var d = {
        alg: e,
        issuerCert: a,
        subjectCert: b
    };
    var c = new KJUR.asn1.ocsp.OCSPRequest({
        reqList: [d]
    });
    return c.getEncodedHex()
};
KJUR.asn1.ocsp.OCSPUtil.getOCSPResponseInfo = function(f) {
    var a = {};
    try {
        var b = ASN1HEX.getVbyList(f, 0, [0], "0a");
        a.responseStatus = parseInt(b, 16)
    } catch(d) {}
    if (a.responseStatus !== 0) {
        return a
    }
    try {
        var e = ASN1HEX.getDecendantIndexByNthList(f, 0, [1, 0, 1, 0, 0, 2, 0, 1]);
        if (f.substr(e, 2) === "80") {
            a.certStatus = "good"
        } else {
            if (f.substr(e, 2) === "a1") {
                a.certStatus = "revoked";
                a.revocationTime = hextoutf8(ASN1HEX.getDecendantHexVByNthList(f, e, [0]))
            } else {
                if (f.substr(e, 2) === "82") {
                    a.certStatus = "unknown"
                }
            }
        }
    } catch(d) {}
    try {
        var c = ASN1HEX.getDecendantIndexByNthList(f, 0, [1, 0, 1, 0, 0, 2, 0, 2]);
        a.thisUpdate = hextoutf8(ASN1HEX.getHexOfV_AtObj(f, c))
    } catch(d) {}
    try {
        var g = ASN1HEX.getDecendantIndexByNthList(f, 0, [1, 0, 1, 0, 0, 2, 0, 3]);
        if (f.substr(g, 2) === "a0") {
            a.nextUpdate = hextoutf8(ASN1HEX.getDecendantHexVByNthList(f, g, [0]))
        }
    } catch(d) {}
    return a
};
/*! base64x-1.1.8 (c) 2012-2016 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
var KJUR;
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.lang == "undefined" || !KJUR.lang) {
    KJUR.lang = {}
}
KJUR.lang.String = function() {};
function Base64x() {}
function stoBA(d) {
    var b = new Array();
    for (var c = 0; c < d.length; c++) {
        b[c] = d.charCodeAt(c)
    }
    return b
}
function BAtos(b) {
    var d = "";
    for (var c = 0; c < b.length; c++) {
        d = d + String.fromCharCode(b[c])
    }
    return d
}
function BAtohex(b) {
    var e = "";
    for (var d = 0; d < b.length; d++) {
        var c = b[d].toString(16);
        if (c.length == 1) {
            c = "0" + c
        }
        e = e + c
    }
    return e
}
function stohex(a) {
    return BAtohex(stoBA(a))
}
function stob64(a) {
    return hex2b64(stohex(a))
}
function stob64u(a) {
    return b64tob64u(hex2b64(stohex(a)))
}
function b64utos(a) {
    return BAtos(b64toBA(b64utob64(a)))
}
function b64tob64u(a) {
    a = a.replace(/\=/g, "");
    a = a.replace(/\+/g, "-");
    a = a.replace(/\//g, "_");
    return a
}
function b64utob64(a) {
    if (a.length % 4 == 2) {
        a = a + "=="
    } else {
        if (a.length % 4 == 3) {
            a = a + "="
        }
    }
    a = a.replace(/-/g, "+");
    a = a.replace(/_/g, "/");
    return a
}
function hextob64u(a) {
    if (a.length % 2 == 1) {
        a = "0" + a
    }
    return b64tob64u(hex2b64(a))
}
function b64utohex(a) {
    return b64tohex(b64utob64(a))
}
var utf8tob64u, b64utoutf8;
if (typeof Buffer === "function") {
    utf8tob64u = function(a) {
        return b64tob64u(new Buffer(a, "utf8").toString("base64"))
    };
    b64utoutf8 = function(a) {
        return new Buffer(b64utob64(a), "base64").toString("utf8")
    }
} else {
    utf8tob64u = function(a) {
        return hextob64u(uricmptohex(encodeURIComponentAll(a)))
    };
    b64utoutf8 = function(a) {
        return decodeURIComponent(hextouricmp(b64utohex(a)))
    }
}
function utf8tob64(a) {
    return hex2b64(uricmptohex(encodeURIComponentAll(a)))
}
function b64toutf8(a) {
    return decodeURIComponent(hextouricmp(b64tohex(a)))
}
function utf8tohex(a) {
    return uricmptohex(encodeURIComponentAll(a))
}
function hextoutf8(a) {
    return decodeURIComponent(hextouricmp(a))
}
function hextorstr(c) {
    var b = "";
    for (var a = 0; a < c.length - 1; a += 2) {
        b += String.fromCharCode(parseInt(c.substr(a, 2), 16))
    }
    return b
}
function rstrtohex(c) {
    var a = "";
    for (var b = 0; b < c.length; b++) {
        a += ("0" + c.charCodeAt(b).toString(16)).slice( - 2)
    }
    return a
}
function hextob64(a) {
    return hex2b64(a)
}
function hextob64nl(b) {
    var a = hextob64(b);
    var c = a.replace(/(.{64})/g, "$1\r\n");
    c = c.replace(/\r\n$/, "");
    return c
}
function b64nltohex(b) {
    var a = b.replace(/[^0-9A-Za-z\/+=]*/g, "");
    var c = b64tohex(a);
    return c
}
function hextoArrayBuffer(d) {
    if (d.length % 2 != 0) {
        throw "input is not even length"
    }
    if (d.match(/^[0-9A-Fa-f]+$/) == null) {
        throw "input is not hexadecimal"
    }
    var b = new ArrayBuffer(d.length / 2);
    var a = new DataView(b);
    for (var c = 0; c < d.length / 2; c++) {
        a.setUint8(c, parseInt(d.substr(c * 2, 2), 16))
    }
    return b
}
function ArrayBuffertohex(b) {
    var d = "";
    var a = new DataView(b);
    for (var c = 0; c < b.byteLength; c++) {
        d += ("00" + a.getUint8(c).toString(16)).slice( - 2)
    }
    return d
}
function uricmptohex(a) {
    return a.replace(/%/g, "")
}
function hextouricmp(a) {
    return a.replace(/(..)/g, "%$1")
}
function encodeURIComponentAll(a) {
    var d = encodeURIComponent(a);
    var b = "";
    for (var c = 0; c < d.length; c++) {
        if (d[c] == "%") {
            b = b + d.substr(c, 3);
            c = c + 2
        } else {
            b = b + "%" + stohex(d[c])
        }
    }
    return b
}
function newline_toUnix(a) {
    a = a.replace(/\r\n/mg, "\n");
    return a
}
function newline_toDos(a) {
    a = a.replace(/\r\n/mg, "\n");
    a = a.replace(/\n/mg, "\r\n");
    return a
}
KJUR.lang.String.isInteger = function(a) {
    if (a.match(/^[0-9]+$/)) {
        return true
    } else {
        if (a.match(/^-[0-9]+$/)) {
            return true
        } else {
            return false
        }
    }
};
KJUR.lang.String.isHex = function(a) {
    if (a.length % 2 == 0 && (a.match(/^[0-9a-f]+$/) || a.match(/^[0-9A-F]+$/))) {
        return true
    } else {
        return false
    }
};
KJUR.lang.String.isBase64 = function(a) {
    a = a.replace(/\s+/g, "");
    if (a.match(/^[0-9A-Za-z+\/]+={0,3}$/) && a.length % 4 == 0) {
        return true
    } else {
        return false
    }
};
KJUR.lang.String.isBase64URL = function(a) {
    if (a.match(/[+/ = ] / )) {
        return false
    }
    a = b64utob64(a);
    return KJUR.lang.String.isBase64(a)
};
KJUR.lang.String.isIntegerArray = function(a) {
    a = a.replace(/\s+/g, "");
    if (a.match(/^\[[0-9,]+\]$/)) {
        return true
    } else {
        return false
    }
};
function intarystrtohex(b) {
    b = b.replace(/^\s*\[\s*/, "");
    b = b.replace(/\s*\]\s*$/, "");
    b = b.replace(/\s*/g, "");
    try {
        var c = b.split(/,/).map(function(g, e, h) {
            var f = parseInt(g);
            if (f < 0 || 255 < f) {
                throw "integer not in range 0-255"
            }
            var d = ("00" + f.toString(16)).slice( - 2);
            return d
        }).join("");
        return c
    } catch(a) {
        throw "malformed integer array string: " + a
    }
}
var strdiffidx = function(c, a) {
    var d = c.length;
    if (c.length > a.length) {
        d = a.length
    }
    for (var b = 0; b < d; b++) {
        if (c.charCodeAt(b) != a.charCodeAt(b)) {
            return b
        }
    }
    if (c.length != a.length) {
        return d
    }
    return - 1
};
/*! crypto-1.1.12.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
    KJUR.crypto = {}
}
KJUR.crypto.Util = new
function() {
    this.DIGESTINFOHEAD = {
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        ripemd160: "3021300906052b2403020105000414",
    };
    this.DEFAULTPROVIDER = {
        md5: "cryptojs",
        sha1: "cryptojs",
        sha224: "cryptojs",
        sha256: "cryptojs",
        sha384: "cryptojs",
        sha512: "cryptojs",
        ripemd160: "cryptojs",
        hmacmd5: "cryptojs",
        hmacsha1: "cryptojs",
        hmacsha224: "cryptojs",
        hmacsha256: "cryptojs",
        hmacsha384: "cryptojs",
        hmacsha512: "cryptojs",
        hmacripemd160: "cryptojs",
        MD5withRSA: "cryptojs/jsrsa",
        SHA1withRSA: "cryptojs/jsrsa",
        SHA224withRSA: "cryptojs/jsrsa",
        SHA256withRSA: "cryptojs/jsrsa",
        SHA384withRSA: "cryptojs/jsrsa",
        SHA512withRSA: "cryptojs/jsrsa",
        RIPEMD160withRSA: "cryptojs/jsrsa",
        MD5withECDSA: "cryptojs/jsrsa",
        SHA1withECDSA: "cryptojs/jsrsa",
        SHA224withECDSA: "cryptojs/jsrsa",
        SHA256withECDSA: "cryptojs/jsrsa",
        SHA384withECDSA: "cryptojs/jsrsa",
        SHA512withECDSA: "cryptojs/jsrsa",
        RIPEMD160withECDSA: "cryptojs/jsrsa",
        SHA1withDSA: "cryptojs/jsrsa",
        SHA224withDSA: "cryptojs/jsrsa",
        SHA256withDSA: "cryptojs/jsrsa",
        MD5withRSAandMGF1: "cryptojs/jsrsa",
        SHA1withRSAandMGF1: "cryptojs/jsrsa",
        SHA224withRSAandMGF1: "cryptojs/jsrsa",
        SHA256withRSAandMGF1: "cryptojs/jsrsa",
        SHA384withRSAandMGF1: "cryptojs/jsrsa",
        SHA512withRSAandMGF1: "cryptojs/jsrsa",
        RIPEMD160withRSAandMGF1: "cryptojs/jsrsa",
    };
    this.CRYPTOJSMESSAGEDIGESTNAME = {
        md5: CryptoJS.algo.MD5,
        sha1: CryptoJS.algo.SHA1,
        sha224: CryptoJS.algo.SHA224,
        sha256: CryptoJS.algo.SHA256,
        sha384: CryptoJS.algo.SHA384,
        sha512: CryptoJS.algo.SHA512,
        ripemd160: CryptoJS.algo.RIPEMD160
    };
    this.getDigestInfoHex = function(a, b) {
        if (typeof this.DIGESTINFOHEAD[b] == "undefined") {
            throw "alg not supported in Util.DIGESTINFOHEAD: " + b
        }
        return this.DIGESTINFOHEAD[b] + a
    };
    this.getPaddedDigestInfoHex = function(h, a, j) {
        var c = this.getDigestInfoHex(h, a);
        var d = j / 4;
        if (c.length + 22 > d) {
            throw "key is too short for SigAlg: keylen=" + j + "," + a
        }
        var b = "0001";
        var k = "00" + c;
        var g = "";
        var l = d - b.length - k.length;
        for (var f = 0; f < l; f += 2) {
            g += "ff"
        }
        var e = b + g + k;
        return e
    };
    this.hashString = function(a, c) {
        var b = new KJUR.crypto.MessageDigest({
            alg: c
        });
        return b.digestString(a)
    };
    this.hashHex = function(b, c) {
        var a = new KJUR.crypto.MessageDigest({
            alg: c
        });
        return a.digestHex(b)
    };
    this.sha1 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha1",
            prov: "cryptojs"
        });
        return b.digestString(a)
    };
    this.sha256 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha256",
            prov: "cryptojs"
        });
        return b.digestString(a)
    };
    this.sha256Hex = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha256",
            prov: "cryptojs"
        });
        return b.digestHex(a)
    };
    this.sha512 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha512",
            prov: "cryptojs"
        });
        return b.digestString(a)
    };
    this.sha512Hex = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha512",
            prov: "cryptojs"
        });
        return b.digestHex(a)
    }
};
KJUR.crypto.Util.md5 = function(a) {
    var b = new KJUR.crypto.MessageDigest({
        alg: "md5",
        prov: "cryptojs"
    });
    return b.digestString(a)
};
KJUR.crypto.Util.ripemd160 = function(a) {
    var b = new KJUR.crypto.MessageDigest({
        alg: "ripemd160",
        prov: "cryptojs"
    });
    return b.digestString(a)
};
KJUR.crypto.Util.SECURERANDOMGEN = new SecureRandom();
KJUR.crypto.Util.getRandomHexOfNbytes = function(b) {
    var a = new Array(b);
    KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(a);
    return BAtohex(a)
};
KJUR.crypto.Util.getRandomBigIntegerOfNbytes = function(a) {
    return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbytes(a), 16)
};
KJUR.crypto.Util.getRandomHexOfNbits = function(d) {
    var c = d % 8;
    var a = (d - c) / 8;
    var b = new Array(a + 1);
    KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(b);
    b[0] = (((255 << c) & 255) ^ 255) & b[0];
    return BAtohex(b)
};
KJUR.crypto.Util.getRandomBigIntegerOfNbits = function(a) {
    return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbits(a), 16)
};
KJUR.crypto.Util.getRandomBigIntegerZeroToMax = function(b) {
    var a = b.bitLength();
    while (1) {
        var c = KJUR.crypto.Util.getRandomBigIntegerOfNbits(a);
        if (b.compareTo(c) != -1) {
            return c
        }
    }
};
KJUR.crypto.Util.getRandomBigIntegerMinToMax = function(e, b) {
    var c = e.compareTo(b);
    if (c == 1) {
        throw "biMin is greater than biMax"
    }
    if (c == 0) {
        return e
    }
    var a = b.subtract(e);
    var d = KJUR.crypto.Util.getRandomBigIntegerZeroToMax(a);
    return d.add(e)
};
KJUR.crypto.MessageDigest = function(c) {
    var b = null;
    var a = null;
    var d = null;
    this.setAlgAndProvider = function(g, f) {
        g = KJUR.crypto.MessageDigest.getCanonicalAlgName(g);
        if (g !== null && f === undefined) {
            f = KJUR.crypto.Util.DEFAULTPROVIDER[g]
        }
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && f == "cryptojs") {
            try {
                this.md = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g].create()
            } catch(e) {
                throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e
            }
            this.updateString = function(h) {
                this.md.update(h)
            };
            this.updateHex = function(h) {
                var i = CryptoJS.enc.Hex.parse(h);
                this.md.update(i)
            };
            this.digest = function() {
                var h = this.md.finalize();
                return h.toString(CryptoJS.enc.Hex)
            };
            this.digestString = function(h) {
                this.updateString(h);
                return this.digest()
            };
            this.digestHex = function(h) {
                this.updateHex(h);
                return this.digest()
            }
        }
        if (":sha256:".indexOf(g) != -1 && f == "sjcl") {
            try {
                this.md = new sjcl.hash.sha256()
            } catch(e) {
                throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e
            }
            this.updateString = function(h) {
                this.md.update(h)
            };
            this.updateHex = function(i) {
                var h = sjcl.codec.hex.toBits(i);
                this.md.update(h)
            };
            this.digest = function() {
                var h = this.md.finalize();
                return sjcl.codec.hex.fromBits(h)
            };
            this.digestString = function(h) {
                this.updateString(h);
                return this.digest()
            };
            this.digestHex = function(h) {
                this.updateHex(h);
                return this.digest()
            }
        }
    };
    this.updateString = function(e) {
        throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
    };
    this.updateHex = function(e) {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
    };
    this.digest = function() {
        throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName
    };
    this.digestString = function(e) {
        throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
    };
    this.digestHex = function(e) {
        throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
    };
    if (c !== undefined) {
        if (c.alg !== undefined) {
            this.algName = c.alg;
            if (c.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]
            }
            this.setAlgAndProvider(this.algName, this.provName)
        }
    }
};
KJUR.crypto.MessageDigest.getCanonicalAlgName = function(a) {
    if (typeof a === "string") {
        a = a.toLowerCase();
        a = a.replace(/-/, "")
    }
    return a
};
KJUR.crypto.MessageDigest.getHashLength = function(c) {
    var b = KJUR.crypto.MessageDigest;
    var a = b.getCanonicalAlgName(c);
    if (b.HASHLENGTH[a] === undefined) {
        throw "not supported algorithm: " + c
    }
    return b.HASHLENGTH[a]
};
KJUR.crypto.MessageDigest.HASHLENGTH = {
    md5: 16,
    sha1: 20,
    sha224: 28,
    sha256: 32,
    sha384: 48,
    sha512: 64,
    ripemd160: 20
};
KJUR.crypto.Mac = function(d) {
    var f = null;
    var c = null;
    var a = null;
    var e = null;
    var b = null;
    this.setAlgAndProvider = function(k, i) {
        k = k.toLowerCase();
        if (k == null) {
            k = "hmacsha1"
        }
        k = k.toLowerCase();
        if (k.substr(0, 4) != "hmac") {
            throw "setAlgAndProvider unsupported HMAC alg: " + k
        }
        if (i === undefined) {
            i = KJUR.crypto.Util.DEFAULTPROVIDER[k]
        }
        this.algProv = k + "/" + i;
        var g = k.substr(4);
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && i == "cryptojs") {
            try {
                var j = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g];
                this.mac = CryptoJS.algo.HMAC.create(j, this.pass)
            } catch(h) {
                throw "setAlgAndProvider hash alg set fail hashAlg=" + g + "/" + h
            }
            this.updateString = function(l) {
                this.mac.update(l)
            };
            this.updateHex = function(l) {
                var m = CryptoJS.enc.Hex.parse(l);
                this.mac.update(m)
            };
            this.doFinal = function() {
                var l = this.mac.finalize();
                return l.toString(CryptoJS.enc.Hex)
            };
            this.doFinalString = function(l) {
                this.updateString(l);
                return this.doFinal()
            };
            this.doFinalHex = function(l) {
                this.updateHex(l);
                return this.doFinal()
            }
        }
    };
    this.updateString = function(g) {
        throw "updateString(str) not supported for this alg/prov: " + this.algProv
    };
    this.updateHex = function(g) {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algProv
    };
    this.doFinal = function() {
        throw "digest() not supported for this alg/prov: " + this.algProv
    };
    this.doFinalString = function(g) {
        throw "digestString(str) not supported for this alg/prov: " + this.algProv
    };
    this.doFinalHex = function(g) {
        throw "digestHex(hex) not supported for this alg/prov: " + this.algProv
    };
    this.setPassword = function(h) {
        if (typeof h == "string") {
            var g = h;
            if (h.length % 2 == 1 || !h.match(/^[0-9A-Fa-f]+$/)) {
                g = rstrtohex(h)
            }
            this.pass = CryptoJS.enc.Hex.parse(g);
            return
        }
        if (typeof h != "object") {
            throw "KJUR.crypto.Mac unsupported password type: " + h
        }
        var g = null;
        if (h.hex !== undefined) {
            if (h.hex.length % 2 != 0 || !h.hex.match(/^[0-9A-Fa-f]+$/)) {
                throw "Mac: wrong hex password: " + h.hex
            }
            g = h.hex
        }
        if (h.utf8 !== undefined) {
            g = utf8tohex(h.utf8)
        }
        if (h.rstr !== undefined) {
            g = rstrtohex(h.rstr)
        }
        if (h.b64 !== undefined) {
            g = b64tohex(h.b64)
        }
        if (h.b64u !== undefined) {
            g = b64utohex(h.b64u)
        }
        if (g == null) {
            throw "KJUR.crypto.Mac unsupported password type: " + h
        }
        this.pass = CryptoJS.enc.Hex.parse(g)
    };
    if (d !== undefined) {
        if (d.pass !== undefined) {
            this.setPassword(d.pass)
        }
        if (d.alg !== undefined) {
            this.algName = d.alg;
            if (d.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]
            }
            this.setAlgAndProvider(this.algName, this.provName)
        }
    }
};
KJUR.crypto.Signature = function(o) {
    var q = null;
    var n = null;
    var r = null;
    var c = null;
    var l = null;
    var d = null;
    var k = null;
    var h = null;
    var p = null;
    var e = null;
    var b = -1;
    var g = null;
    var j = null;
    var a = null;
    var i = null;
    var f = null;
    this._setAlgNames = function() {
        var s = this.algName.match(/^(.+)with(.+)$/);
        if (s) {
            this.mdAlgName = s[1].toLowerCase();
            this.pubkeyAlgName = s[2].toLowerCase()
        }
    };
    this._zeroPaddingOfSignature = function(x, w) {
        var v = "";
        var t = w / 4 - x.length;
        for (var u = 0; u < t; u++) {
            v = v + "0"
        }
        return v + x
    };
    this.setAlgAndProvider = function(u, t) {
        this._setAlgNames();
        if (t != "cryptojs/jsrsa") {
            throw "provider not supported: " + t
        }
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName) != -1) {
            try {
                this.md = new KJUR.crypto.MessageDigest({
                    alg: this.mdAlgName
                })
            } catch(s) {
                throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + s
            }
            this.init = function(w, x) {
                var y = null;
                try {
                    if (x === undefined) {
                        y = KEYUTIL.getKey(w)
                    } else {
                        y = KEYUTIL.getKey(w, x)
                    }
                } catch(v) {
                    throw "init failed:" + v
                }
                if (y.isPrivate === true) {
                    this.prvKey = y;
                    this.state = "SIGN"
                } else {
                    if (y.isPublic === true) {
                        this.pubKey = y;
                        this.state = "VERIFY"
                    } else {
                        throw "init failed.:" + y
                    }
                }
            };
            this.initSign = function(v) {
                if (typeof v.ecprvhex == "string" && typeof v.eccurvename == "string") {
                    this.ecprvhex = v.ecprvhex;
                    this.eccurvename = v.eccurvename
                } else {
                    this.prvKey = v
                }
                this.state = "SIGN"
            };
            this.initVerifyByPublicKey = function(v) {
                if (typeof v.ecpubhex == "string" && typeof v.eccurvename == "string") {
                    this.ecpubhex = v.ecpubhex;
                    this.eccurvename = v.eccurvename
                } else {
                    if (v instanceof KJUR.crypto.ECDSA) {
                        this.pubKey = v
                    } else {
                        if (v instanceof RSAKey) {
                            this.pubKey = v
                        }
                    }
                }
                this.state = "VERIFY"
            };
            this.initVerifyByCertificatePEM = function(v) {
                var w = new X509();
                w.readCertPEM(v);
                this.pubKey = w.subjectPublicKeyRSA;
                this.state = "VERIFY"
            };
            this.updateString = function(v) {
                this.md.updateString(v)
            };
            this.updateHex = function(v) {
                this.md.updateHex(v)
            };
            this.sign = function() {
                this.sHashHex = this.md.digest();
                if (typeof this.ecprvhex != "undefined" && typeof this.eccurvename != "undefined") {
                    var v = new KJUR.crypto.ECDSA({
                        curve: this.eccurvename
                    });
                    this.hSign = v.signHex(this.sHashHex, this.ecprvhex)
                } else {
                    if (this.prvKey instanceof RSAKey && this.pubkeyAlgName == "rsaandmgf1") {
                        this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen)
                    } else {
                        if (this.prvKey instanceof RSAKey && this.pubkeyAlgName == "rsa") {
                            this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName)
                        } else {
                            if (this.prvKey instanceof KJUR.crypto.ECDSA) {
                                this.hSign = this.prvKey.signWithMessageHash(this.sHashHex)
                            } else {
                                if (this.prvKey instanceof KJUR.crypto.DSA) {
                                    this.hSign = this.prvKey.signWithMessageHash(this.sHashHex)
                                } else {
                                    throw "Signature: unsupported public key alg: " + this.pubkeyAlgName
                                }
                            }
                        }
                    }
                }
                return this.hSign
            };
            this.signString = function(v) {
                this.updateString(v);
                return this.sign()
            };
            this.signHex = function(v) {
                this.updateHex(v);
                return this.sign()
            };
            this.verify = function(v) {
                this.sHashHex = this.md.digest();
                if (typeof this.ecpubhex != "undefined" && typeof this.eccurvename != "undefined") {
                    var w = new KJUR.crypto.ECDSA({
                        curve: this.eccurvename
                    });
                    return w.verifyHex(this.sHashHex, v, this.ecpubhex)
                } else {
                    if (this.pubKey instanceof RSAKey && this.pubkeyAlgName == "rsaandmgf1") {
                        return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, v, this.mdAlgName, this.pssSaltLen)
                    } else {
                        if (this.pubKey instanceof RSAKey && this.pubkeyAlgName == "rsa") {
                            return this.pubKey.verifyWithMessageHash(this.sHashHex, v)
                        } else {
                            if (this.pubKey instanceof KJUR.crypto.ECDSA) {
                                return this.pubKey.verifyWithMessageHash(this.sHashHex, v)
                            } else {
                                if (this.pubKey instanceof KJUR.crypto.DSA) {
                                    return this.pubKey.verifyWithMessageHash(this.sHashHex, v)
                                } else {
                                    throw "Signature: unsupported public key alg: " + this.pubkeyAlgName
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    this.init = function(s, t) {
        throw "init(key, pass) not supported for this alg:prov=" + this.algProvName
    };
    this.initVerifyByPublicKey = function(s) {
        throw "initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov=" + this.algProvName
    };
    this.initVerifyByCertificatePEM = function(s) {
        throw "initVerifyByCertificatePEM(certPEM) not supported for this alg:prov=" + this.algProvName
    };
    this.initSign = function(s) {
        throw "initSign(prvKey) not supported for this alg:prov=" + this.algProvName
    };
    this.updateString = function(s) {
        throw "updateString(str) not supported for this alg:prov=" + this.algProvName
    };
    this.updateHex = function(s) {
        throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName
    };
    this.sign = function() {
        throw "sign() not supported for this alg:prov=" + this.algProvName
    };
    this.signString = function(s) {
        throw "digestString(str) not supported for this alg:prov=" + this.algProvName
    };
    this.signHex = function(s) {
        throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName
    };
    this.verify = function(s) {
        throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName
    };
    this.initParams = o;
    if (o !== undefined) {
        if (o.alg !== undefined) {
            this.algName = o.alg;
            if (o.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]
            } else {
                this.provName = o.prov
            }
            this.algProvName = this.algName + ":" + this.provName;
            this.setAlgAndProvider(this.algName, this.provName);
            this._setAlgNames()
        }
        if (o.psssaltlen !== undefined) {
            this.pssSaltLen = o.psssaltlen
        }
        if (o.prvkeypem !== undefined) {
            if (o.prvkeypas !== undefined) {
                throw "both prvkeypem and prvkeypas parameters not supported"
            } else {
                try {
                    var q = new RSAKey();
                    q.readPrivateKeyFromPEMString(o.prvkeypem);
                    this.initSign(q)
                } catch(m) {
                    throw "fatal error to load pem private key: " + m
                }
            }
        }
    }
};
KJUR.crypto.Cipher = function(a) {};
KJUR.crypto.Cipher.encrypt = function(e, f, d) {
    if (f instanceof RSAKey && f.isPublic) {
        var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d);
        if (c === "RSA") {
            return f.encrypt(e)
        }
        if (c === "RSAOAEP") {
            return f.encryptOAEP(e, "sha1")
        }
        var b = c.match(/^RSAOAEP(\d+)$/);
        if (b !== null) {
            return f.encryptOAEP(e, "sha" + b[1])
        }
        throw "Cipher.encrypt: unsupported algorithm for RSAKey: " + d
    } else {
        throw "Cipher.encrypt: unsupported key or algorithm"
    }
};
KJUR.crypto.Cipher.decrypt = function(e, f, d) {
    if (f instanceof RSAKey && f.isPrivate) {
        var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d);
        if (c === "RSA") {
            return f.decrypt(e)
        }
        if (c === "RSAOAEP") {
            return f.decryptOAEP(e, "sha1")
        }
        var b = c.match(/^RSAOAEP(\d+)$/);
        if (b !== null) {
            return f.decryptOAEP(e, "sha" + b[1])
        }
        throw "Cipher.decrypt: unsupported algorithm for RSAKey: " + d
    } else {
        throw "Cipher.decrypt: unsupported key or algorithm"
    }
};
KJUR.crypto.Cipher.getAlgByKeyAndName = function(b, a) {
    if (b instanceof RSAKey) {
        if (":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(a) != -1) {
            return a
        }
        if (a === null || a === undefined) {
            return "RSA"
        }
        throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: " + a
    }
    throw "getAlgByKeyAndName: not supported algorithm name: " + a
};
KJUR.crypto.OID = new
function() {
    this.oidhex2name = {
        "2a864886f70d010101": "rsaEncryption",
        "2a8648ce3d0201": "ecPublicKey",
        "2a8648ce380401": "dsa",
        "2a8648ce3d030107": "secp256r1",
        "2b8104001f": "secp192k1",
        "2b81040021": "secp224r1",
        "2b8104000a": "secp256k1",
        "2b81040023": "secp521r1",
        "2b81040022": "secp384r1",
        "2a8648ce380403": "SHA1withDSA",
        "608648016503040301": "SHA224withDSA",
        "608648016503040302": "SHA256withDSA",
    }
};
/*! ecdsa-modified-1.1.0.js (c) Stephan Thomas, Kenji Urushima | github.com/bitcoinjs/bitcoinjs-lib/blob/master/LICENSE
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
    KJUR.crypto = {}
}
KJUR.crypto.ECDSA = function(h) {
    var e = "secp256r1";
    var g = null;
    var b = null;
    var f = null;
    var a = new SecureRandom();
    var d = null;
    this.type = "EC";
    this.isPrivate = false;
    this.isPublic = false;
    function c(s, o, r, n) {
        var j = Math.max(o.bitLength(), n.bitLength());
        var t = s.add2D(r);
        var q = s.curve.getInfinity();
        for (var p = j - 1; p >= 0; --p) {
            q = q.twice2D();
            q.z = BigInteger.ONE;
            if (o.testBit(p)) {
                if (n.testBit(p)) {
                    q = q.add2D(t)
                } else {
                    q = q.add2D(s)
                }
            } else {
                if (n.testBit(p)) {
                    q = q.add2D(r)
                }
            }
        }
        return q
    }
    this.getBigRandom = function(i) {
        return new BigInteger(i.bitLength(), a).mod(i.subtract(BigInteger.ONE)).add(BigInteger.ONE)
    };
    this.setNamedCurve = function(i) {
        this.ecparams = KJUR.crypto.ECParameterDB.getByName(i);
        this.prvKeyHex = null;
        this.pubKeyHex = null;
        this.curveName = i
    };
    this.setPrivateKeyHex = function(i) {
        this.isPrivate = true;
        this.prvKeyHex = i
    };
    this.setPublicKeyHex = function(i) {
        this.isPublic = true;
        this.pubKeyHex = i
    };
    this.getPublicKeyXYHex = function() {
        var k = this.pubKeyHex;
        if (k.substr(0, 2) !== "04") {
            throw "this method supports uncompressed format(04) only"
        }
        var j = this.ecparams.keylen / 4;
        if (k.length !== 2 + j * 2) {
            throw "malformed public key hex length"
        }
        var i = {};
        i.x = k.substr(2, j);
        i.y = k.substr(2 + j);
        return i
    };
    this.getShortNISTPCurveName = function() {
        var i = this.curveName;
        if (i === "secp256r1" || i === "NIST P-256" || i === "P-256" || i === "prime256v1") {
            return "P-256"
        }
        if (i === "secp384r1" || i === "NIST P-384" || i === "P-384") {
            return "P-384"
        }
        return null
    };
    this.generateKeyPairHex = function() {
        var k = this.ecparams.n;
        var n = this.getBigRandom(k);
        var l = this.ecparams.G.multiply(n);
        var q = l.getX().toBigInteger();
        var o = l.getY().toBigInteger();
        var i = this.ecparams.keylen / 4;
        var m = ("0000000000" + n.toString(16)).slice( - i);
        var r = ("0000000000" + q.toString(16)).slice( - i);
        var p = ("0000000000" + o.toString(16)).slice( - i);
        var j = "04" + r + p;
        this.setPrivateKeyHex(m);
        this.setPublicKeyHex(j);
        return {
            ecprvhex: m,
            ecpubhex: j
        }
    };
    this.signWithMessageHash = function(i) {
        return this.signHex(i, this.prvKeyHex)
    };
    this.signHex = function(o, j) {
        var t = new BigInteger(j, 16);
        var l = this.ecparams.n;
        var q = new BigInteger(o, 16);
        do {
            var m = this.getBigRandom(l);
            var u = this.ecparams.G;
            var p = u.multiply(m);
            var i = p.getX().toBigInteger().mod(l)
        } while ( i . compareTo ( BigInteger . ZERO ) <= 0);
        var v = m.modInverse(l).multiply(q.add(t.multiply(i))).mod(l);
        return KJUR.crypto.ECDSA.biRSSigToASN1Sig(i, v)
    };
    this.sign = function(m, u) {
        var q = u;
        var j = this.ecparams.n;
        var p = BigInteger.fromByteArrayUnsigned(m);
        do {
            var l = this.getBigRandom(j);
            var t = this.ecparams.G;
            var o = t.multiply(l);
            var i = o.getX().toBigInteger().mod(j)
        } while ( i . compareTo ( BigInteger . ZERO ) <= 0);
        var v = l.modInverse(j).multiply(p.add(q.multiply(i))).mod(j);
        return this.serializeSig(i, v)
    };
    this.verifyWithMessageHash = function(j, i) {
        return this.verifyHex(j, i, this.pubKeyHex)
    };
    this.verifyHex = function(m, i, p) {
        var l, j;
        var o = KJUR.crypto.ECDSA.parseSigHex(i);
        l = o.r;
        j = o.s;
        var k;
        k = ECPointFp.decodeFromHex(this.ecparams.curve, p);
        var n = new BigInteger(m, 16);
        return this.verifyRaw(n, l, j, k)
    };
    this.verify = function(o, p, j) {
        var l, i;
        if (Bitcoin.Util.isArray(p)) {
            var n = this.parseSig(p);
            l = n.r;
            i = n.s
        } else {
            if ("object" === typeof p && p.r && p.s) {
                l = p.r;
                i = p.s
            } else {
                throw "Invalid value for signature"
            }
        }
        var k;
        if (j instanceof ECPointFp) {
            k = j
        } else {
            if (Bitcoin.Util.isArray(j)) {
                k = ECPointFp.decodeFrom(this.ecparams.curve, j)
            } else {
                throw "Invalid format for pubkey value, must be byte array or ECPointFp"
            }
        }
        var m = BigInteger.fromByteArrayUnsigned(o);
        return this.verifyRaw(m, l, i, k)
    };
    this.verifyRaw = function(o, i, w, m) {
        var l = this.ecparams.n;
        var u = this.ecparams.G;
        if (i.compareTo(BigInteger.ONE) < 0 || i.compareTo(l) >= 0) {
            return false
        }
        if (w.compareTo(BigInteger.ONE) < 0 || w.compareTo(l) >= 0) {
            return false
        }
        var p = w.modInverse(l);
        var k = o.multiply(p).mod(l);
        var j = i.multiply(p).mod(l);
        var q = u.multiply(k).add(m.multiply(j));
        var t = q.getX().toBigInteger().mod(l);
        return t.equals(i)
    };
    this.serializeSig = function(k, j) {
        var l = k.toByteArraySigned();
        var i = j.toByteArraySigned();
        var m = [];
        m.push(2);
        m.push(l.length);
        m = m.concat(l);
        m.push(2);
        m.push(i.length);
        m = m.concat(i);
        m.unshift(m.length);
        m.unshift(48);
        return m
    };
    this.parseSig = function(n) {
        var m;
        if (n[0] != 48) {
            throw new Error("Signature not a valid DERSequence")
        }
        m = 2;
        if (n[m] != 2) {
            throw new Error("First element in signature must be a DERInteger")
        }
        var l = n.slice(m + 2, m + 2 + n[m + 1]);
        m += 2 + n[m + 1];
        if (n[m] != 2) {
            throw new Error("Second element in signature must be a DERInteger")
        }
        var i = n.slice(m + 2, m + 2 + n[m + 1]);
        m += 2 + n[m + 1];
        var k = BigInteger.fromByteArrayUnsigned(l);
        var j = BigInteger.fromByteArrayUnsigned(i);
        return {
            r: k,
            s: j
        }
    };
    this.parseSigCompact = function(m) {
        if (m.length !== 65) {
            throw "Signature has the wrong length"
        }
        var j = m[0] - 27;
        if (j < 0 || j > 7) {
            throw "Invalid signature type"
        }
        var o = this.ecparams.n;
        var l = BigInteger.fromByteArrayUnsigned(m.slice(1, 33)).mod(o);
        var k = BigInteger.fromByteArrayUnsigned(m.slice(33, 65)).mod(o);
        return {
            r: l,
            s: k,
            i: j
        }
    };
    this.readPKCS5PrvKeyHex = function(l) {
        var n = ASN1HEX;
        var m = KJUR.crypto.ECDSA.getName;
        var p = n.getVbyList;
        if (n.isASN1HEX(l) === false) {
            throw "not ASN.1 hex string"
        }
        var i, k, o;
        try {
            i = p(l, 0, [2, 0], "06");
            k = p(l, 0, [1], "04");
            try {
                o = p(l, 0, [3, 0], "03").substr(2)
            } catch(j) {}
        } catch(j) {
            throw "malformed PKCS#1/5 plain ECC private key"
        }
        this.curveName = m(i);
        if (this.curveName === undefined) {
            throw "unsupported curve name"
        }
        this.setNamedCurve(this.curveName);
        this.setPublicKeyHex(o);
        this.setPrivateKeyHex(k);
        this.isPublic = false
    };
    this.readPKCS8PrvKeyHex = function(l) {
        var q = ASN1HEX;
        var i = KJUR.crypto.ECDSA.getName;
        var n = q.getVbyList;
        if (q.isASN1HEX(l) === false) {
            throw "not ASN.1 hex string"
        }
        var j, p, m, k;
        try {
            j = n(l, 0, [1, 0], "06");
            p = n(l, 0, [1, 1], "06");
            m = n(l, 0, [2, 0, 1], "04");
            try {
                k = n(l, 0, [2, 0, 2, 0], "03").substr(2)
            } catch(o) {}
        } catch(o) {
            throw "malformed PKCS#8 plain ECC private key"
        }
        this.curveName = i(p);
        if (this.curveName === undefined) {
            throw "unsupported curve name"
        }
        this.setNamedCurve(this.curveName);
        this.setPublicKeyHex(k);
        this.setPrivateKeyHex(m);
        this.isPublic = false
    };
    this.readPKCS8PubKeyHex = function(l) {
        var n = ASN1HEX;
        var m = KJUR.crypto.ECDSA.getName;
        var p = n.getVbyList;
        if (n.isASN1HEX(l) === false) {
            throw "not ASN.1 hex string"
        }
        var k, i, o;
        try {
            k = p(l, 0, [0, 0], "06");
            i = p(l, 0, [0, 1], "06");
            o = p(l, 0, [1], "03").substr(2)
        } catch(j) {
            throw "malformed PKCS#8 ECC public key"
        }
        this.curveName = m(i);
        if (this.curveName === null) {
            throw "unsupported curve name"
        }
        this.setNamedCurve(this.curveName);
        this.setPublicKeyHex(o)
    };
    this.readCertPubKeyHex = function(k, p) {
        if (p !== 5) {
            p = 6
        }
        var m = ASN1HEX;
        var l = KJUR.crypto.ECDSA.getName;
        var o = m.getVbyList;
        if (m.isASN1HEX(k) === false) {
            throw "not ASN.1 hex string"
        }
        var i, n;
        try {
            i = o(k, 0, [0, p, 0, 1], "06");
            n = o(k, 0, [0, p, 1], "03").substr(2)
        } catch(j) {
            throw "malformed X.509 certificate ECC public key"
        }
        this.curveName = l(i);
        if (this.curveName === null) {
            throw "unsupported curve name"
        }
        this.setNamedCurve(this.curveName);
        this.setPublicKeyHex(n)
    };
    if (h !== undefined) {
        if (h.curve !== undefined) {
            this.curveName = h.curve
        }
    }
    if (this.curveName === undefined) {
        this.curveName = e
    }
    this.setNamedCurve(this.curveName);
    if (h !== undefined) {
        if (h.prv !== undefined) {
            this.setPrivateKeyHex(h.prv)
        }
        if (h.pub !== undefined) {
            this.setPublicKeyHex(h.pub)
        }
    }
};
KJUR.crypto.ECDSA.parseSigHex = function(a) {
    var b = KJUR.crypto.ECDSA.parseSigHexInHexRS(a);
    var d = new BigInteger(b.r, 16);
    var c = new BigInteger(b.s, 16);
    return {
        r: d,
        s: c
    }
};
KJUR.crypto.ECDSA.parseSigHexInHexRS = function(c) {
    if (c.substr(0, 2) != "30") {
        throw "signature is not a ASN.1 sequence"
    }
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(c, 0);
    if (b.length != 2) {
        throw "number of signature ASN.1 sequence elements seem wrong"
    }
    var g = b[0];
    var f = b[1];
    if (c.substr(g, 2) != "02") {
        throw "1st item of sequene of signature is not ASN.1 integer"
    }
    if (c.substr(f, 2) != "02") {
        throw "2nd item of sequene of signature is not ASN.1 integer"
    }
    var e = ASN1HEX.getHexOfV_AtObj(c, g);
    var d = ASN1HEX.getHexOfV_AtObj(c, f);
    return {
        r: e,
        s: d
    }
};
KJUR.crypto.ECDSA.asn1SigToConcatSig = function(c) {
    var d = KJUR.crypto.ECDSA.parseSigHexInHexRS(c);
    var b = d.r;
    var a = d.s;
    if (b.substr(0, 2) == "00" && (((b.length / 2) * 8) % (16 * 8)) == 8) {
        b = b.substr(2)
    }
    if (a.substr(0, 2) == "00" && (((a.length / 2) * 8) % (16 * 8)) == 8) {
        a = a.substr(2)
    }
    if ((((b.length / 2) * 8) % (16 * 8)) != 0) {
        throw "unknown ECDSA sig r length error"
    }
    if ((((a.length / 2) * 8) % (16 * 8)) != 0) {
        throw "unknown ECDSA sig s length error"
    }
    return b + a
};
KJUR.crypto.ECDSA.concatSigToASN1Sig = function(a) {
    if ((((a.length / 2) * 8) % (16 * 8)) != 0) {
        throw "unknown ECDSA concatinated r-s sig  length error"
    }
    var c = a.substr(0, a.length / 2);
    var b = a.substr(a.length / 2);
    return KJUR.crypto.ECDSA.hexRSSigToASN1Sig(c, b)
};
KJUR.crypto.ECDSA.hexRSSigToASN1Sig = function(b, a) {
    var d = new BigInteger(b, 16);
    var c = new BigInteger(a, 16);
    return KJUR.crypto.ECDSA.biRSSigToASN1Sig(d, c)
};
KJUR.crypto.ECDSA.biRSSigToASN1Sig = function(e, c) {
    var b = new KJUR.asn1.DERInteger({
        bigint: e
    });
    var a = new KJUR.asn1.DERInteger({
        bigint: c
    });
    var d = new KJUR.asn1.DERSequence({
        array: [b, a]
    });
    return d.getEncodedHex()
};
KJUR.crypto.ECDSA.getName = function(a) {
    if (a === "2a8648ce3d030107") {
        return "secp256r1"
    }
    if (a === "2b8104000a") {
        return "secp256k1"
    }
    if (a === "2b81040022") {
        return "secp384r1"
    }
    if ("|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(a) !== -1) {
        return "secp256r1"
    }
    if ("|secp256k1|".indexOf(a) !== -1) {
        return "secp256k1"
    }
    if ("|secp384r1|NIST P-384|P-384|".indexOf(a) !== -1) {
        return "secp384r1"
    }
    return null
};
/*! ecparam-1.0.0.js (c) 2013 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
    KJUR.crypto = {}
}
KJUR.crypto.ECParameterDB = new
function() {
    var b = {};
    var c = {};
    function a(d) {
        return new BigInteger(d, 16)
    }
    this.getByName = function(e) {
        var d = e;
        if (typeof c[d] != "undefined") {
            d = c[e]
        }
        if (typeof b[d] != "undefined") {
            return b[d]
        }
        throw "unregistered EC curve name: " + d
    };
    this.regist = function(A, l, o, g, m, e, j, f, k, u, d, x) {
        b[A] = {};
        var s = a(o);
        var z = a(g);
        var y = a(m);
        var t = a(e);
        var w = a(j);
        var r = new ECCurveFp(s, z, y);
        var q = r.decodePointHex("04" + f + k);
        b[A]["name"] = A;
        b[A]["keylen"] = l;
        b[A]["curve"] = r;
        b[A]["G"] = q;
        b[A]["n"] = t;
        b[A]["h"] = w;
        b[A]["oid"] = d;
        b[A]["info"] = x;
        for (var v = 0; v < u.length; v++) {
            c[u[v]] = A
        }
    }
};
KJUR.crypto.ECParameterDB.regist("secp128r1", 128, "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC", "E87579C11079F43DD824993C2CEE5ED3", "FFFFFFFE0000000075A30D1B9038A115", "1", "161FF7528B899B2D0C28607CA52C5B86", "CF5AC8395BAFEB13C02DA292DDED7A83", [], "", "secp128r1 : SECG curve over a 128 bit prime field");
KJUR.crypto.ECParameterDB.regist("secp160k1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73", "0", "7", "0100000000000000000001B8FA16DFAB9ACA16B6B3", "1", "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB", "938CF935318FDCED6BC28286531733C3F03C4FEE", [], "", "secp160k1 : SECG curve over a 160 bit prime field");
KJUR.crypto.ECParameterDB.regist("secp160r1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC", "1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45", "0100000000000000000001F4C8F927AED3CA752257", "1", "4A96B5688EF573284664698968C38BB913CBFC82", "23A628553168947D59DCC912042351377AC5FB32", [], "", "secp160r1 : SECG curve over a 160 bit prime field");
KJUR.crypto.ECParameterDB.regist("secp192k1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37", "0", "3", "FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D", "1", "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D", "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D", []);
KJUR.crypto.ECParameterDB.regist("secp192r1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC", "64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1", "FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831", "1", "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012", "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811", []);
KJUR.crypto.ECParameterDB.regist("secp224r1", 224, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE", "B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4", "FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D", "1", "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21", "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34", []);
KJUR.crypto.ECParameterDB.regist("secp256k1", 256, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F", "0", "7", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "1", "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", []);
KJUR.crypto.ECParameterDB.regist("secp256r1", 256, "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC", "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B", "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551", "1", "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296", "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5", ["NIST P-256", "P-256", "prime256v1"]);
KJUR.crypto.ECParameterDB.regist("secp384r1", 384, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC", "B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973", "1", "AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7", "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f", ["NIST P-384", "P-384"]);
KJUR.crypto.ECParameterDB.regist("secp521r1", 521, "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC", "051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409", "1", "C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66", "011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650", ["NIST P-521", "P-521"]);
/*! dsa-2.1.0.js (c) 2016-2017 Kenji Urushimma | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
    KJUR.crypto = {}
}
KJUR.crypto.DSA = function() {
    this.p = null;
    this.q = null;
    this.g = null;
    this.y = null;
    this.x = null;
    this.type = "DSA";
    this.isPrivate = false;
    this.isPublic = false;
    this.setPrivate = function(d, c, b, e, a) {
        this.isPrivate = true;
        this.p = d;
        this.q = c;
        this.g = b;
        this.y = e;
        this.x = a
    };
    this.setPrivateHex = function(d, b, f, i, j) {
        var c, a, e, g, h;
        c = new BigInteger(d, 16);
        a = new BigInteger(b, 16);
        e = new BigInteger(f, 16);
        if (typeof i === "string" && i.length > 1) {
            g = new BigInteger(i, 16)
        } else {
            g = null
        }
        h = new BigInteger(j, 16);
        this.setPrivate(c, a, e, g, h)
    };
    this.setPublic = function(c, b, a, d) {
        this.isPublic = true;
        this.p = c;
        this.q = b;
        this.g = a;
        this.y = d;
        this.x = null
    };
    this.setPublicHex = function(f, e, d, g) {
        var b, a, h, c;
        b = new BigInteger(f, 16);
        a = new BigInteger(e, 16);
        h = new BigInteger(d, 16);
        c = new BigInteger(g, 16);
        this.setPublic(b, a, h, c)
    };
    this.signWithMessageHash = function(d) {
        var c = this.p;
        var b = this.q;
        var f = this.g;
        var i = this.y;
        var j = this.x;
        var e = KJUR.crypto.Util.getRandomBigIntegerMinToMax(BigInteger.ONE.add(BigInteger.ONE), b.subtract(BigInteger.ONE));
        var l = d.substr(0, b.bitLength() / 4);
        var h = new BigInteger(l, 16);
        var a = (f.modPow(e, c)).mod(b);
        var n = (e.modInverse(b).multiply(h.add(j.multiply(a)))).mod(b);
        var m = KJUR.asn1.ASN1Util.jsonToASN1HEX({
            seq: [{
                "int": {
                    bigint: a
                }
            },
            {
                "int": {
                    bigint: n
                }
            }]
        });
        return m
    };
    this.verifyWithMessageHash = function(h, f) {
        var d = this.p;
        var b = this.q;
        var j = this.g;
        var l = this.y;
        var i = this.parseASN1Signature(f);
        var a = i[0];
        var t = i[1];
        var o = h.substr(0, b.bitLength() / 4);
        var k = new BigInteger(o, 16);
        if (BigInteger.ZERO.compareTo(a) > 0 || a.compareTo(b) > 0) {
            throw "invalid DSA signature"
        }
        if (BigInteger.ZERO.compareTo(t) > 0 || t.compareTo(b) > 0) {
            throw "invalid DSA signature"
        }
        var m = t.modInverse(b);
        var e = k.multiply(m).mod(b);
        var c = a.multiply(m).mod(b);
        var n = j.modPow(e, d).multiply(l.modPow(c, d)).mod(d).mod(b);
        return n.compareTo(a) == 0
    };
    this.parseASN1Signature = function(a) {
        try {
            var d = new BigInteger(ASN1HEX.getVbyList(a, 0, [0], "02"), 16);
            var c = new BigInteger(ASN1HEX.getVbyList(a, 0, [1], "02"), 16);
            return [d, c]
        } catch(b) {
            throw "malformed ASN.1 DSA signature"
        }
    };
    this.readPKCS5PrvKeyHex = function(c) {
        var b, a, f, g, i;
        var j = ASN1HEX;
        var d = j.getVbyList;
        if (j.isASN1HEX(c) === false) {
            throw "not ASN.1 hex string"
        }
        try {
            b = d(c, 0, [1], "02");
            a = d(c, 0, [2], "02");
            f = d(c, 0, [3], "02");
            g = d(c, 0, [4], "02");
            i = d(c, 0, [5], "02")
        } catch(e) {
            console.log("EXCEPTION:" + e);
            throw "malformed PKCS#1/5 plain DSA private key"
        }
        this.setPrivateHex(b, a, f, g, i)
    };
    this.readPKCS8PrvKeyHex = function(d) {
        var f, c, b, g;
        var e = ASN1HEX;
        var i = e.getVbyList;
        if (e.isASN1HEX(d) === false) {
            throw "not ASN.1 hex string"
        }
        try {
            f = i(d, 0, [1, 1, 0], "02");
            c = i(d, 0, [1, 1, 1], "02");
            b = i(d, 0, [1, 1, 2], "02");
            g = i(d, 0, [2, 0], "02")
        } catch(a) {
            console.log("EXCEPTION:" + a);
            throw "malformed PKCS#8 plain DSA private key"
        }
        this.setPrivateHex(f, c, b, null, g)
    };
    this.readPKCS8PubKeyHex = function(d) {
        var f, c, b, g;
        var e = ASN1HEX;
        var i = e.getVbyList;
        if (e.isASN1HEX(d) === false) {
            throw "not ASN.1 hex string"
        }
        try {
            f = i(d, 0, [0, 1, 0], "02");
            c = i(d, 0, [0, 1, 1], "02");
            b = i(d, 0, [0, 1, 2], "02");
            g = i(d, 0, [1, 0], "02")
        } catch(a) {
            console.log("EXCEPTION:" + a);
            throw "malformed PKCS#8 DSA public key"
        }
        this.setPublicHex(f, c, b, g)
    };
    this.readCertPubKeyHex = function(c, f) {
        if (f !== 5) {
            f = 6
        }
        var b, a, g, i;
        var j = ASN1HEX;
        var d = j.getVbyList;
        if (j.isASN1HEX(c) === false) {
            throw "not ASN.1 hex string"
        }
        try {
            b = d(c, 0, [0, f, 0, 1, 0], "02");
            a = d(c, 0, [0, f, 0, 1, 1], "02");
            g = d(c, 0, [0, f, 0, 1, 2], "02");
            i = d(c, 0, [0, f, 1, 0], "02")
        } catch(e) {
            console.log("EXCEPTION:" + e);
            throw "malformed X.509 certificate DSA public key"
        }
        this.setPublicHex(b, a, g, i)
    }
};
/*! pkcs5pkey-1.1.0.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
var PKCS5PKEY = function() {
    var c = function(o, q, p) {
        return j(CryptoJS.AES, o, q, p)
    };
    var d = function(o, q, p) {
        return j(CryptoJS.TripleDES, o, q, p)
    };
    var j = function(r, w, t, p) {
        var q = CryptoJS.enc.Hex.parse(w);
        var v = CryptoJS.enc.Hex.parse(t);
        var o = CryptoJS.enc.Hex.parse(p);
        var s = {};
        s.key = v;
        s.iv = o;
        s.ciphertext = q;
        var u = r.decrypt(s, v, {
            iv: o
        });
        return CryptoJS.enc.Hex.stringify(u)
    };
    var k = function(o, q, p) {
        return e(CryptoJS.AES, o, q, p)
    };
    var n = function(o, q, p) {
        return e(CryptoJS.TripleDES, o, q, p)
    };
    var e = function(t, y, w, q) {
        var s = CryptoJS.enc.Hex.parse(y);
        var x = CryptoJS.enc.Hex.parse(w);
        var p = CryptoJS.enc.Hex.parse(q);
        var o = {};
        var v = t.encrypt(s, x, {
            iv: p
        });
        var r = CryptoJS.enc.Hex.parse(v.toString());
        var u = CryptoJS.enc.Base64.stringify(r);
        return u
    };
    var g = {
        "AES-256-CBC": {
            proc: c,
            eproc: k,
            keylen: 32,
            ivlen: 16
        },
        "AES-192-CBC": {
            proc: c,
            eproc: k,
            keylen: 24,
            ivlen: 16
        },
        "AES-128-CBC": {
            proc: c,
            eproc: k,
            keylen: 16,
            ivlen: 16
        },
        "DES-EDE3-CBC": {
            proc: d,
            eproc: n,
            keylen: 24,
            ivlen: 8
        }
    };
    var b = function(o) {
        return g[o]["proc"]
    };
    var l = function(o) {
        var q = CryptoJS.lib.WordArray.random(o);
        var p = CryptoJS.enc.Hex.stringify(q);
        return p
    };
    var m = function(u) {
        var v = {};
        var p = u.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"));
        if (p) {
            v.cipher = p[1];
            v.ivsalt = p[2]
        }
        var o = u.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));
        if (o) {
            v.type = o[1]
        }
        var t = -1;
        var w = 0;
        if (u.indexOf("\r\n\r\n") != -1) {
            t = u.indexOf("\r\n\r\n");
            w = 2
        }
        if (u.indexOf("\n\n") != -1) {
            t = u.indexOf("\n\n");
            w = 1
        }
        var r = u.indexOf("-----END");
        if (t != -1 && r != -1) {
            var q = u.substring(t + w * 2, r - w);
            q = q.replace(/\s+/g, "");
            v.data = q
        }
        return v
    };
    var i = function(p, x, o) {
        var u = o.substring(0, 16);
        var s = CryptoJS.enc.Hex.parse(u);
        var q = CryptoJS.enc.Utf8.parse(x);
        var t = g[p]["keylen"] + g[p]["ivlen"];
        var w = "";
        var v = null;
        for (;;) {
            var r = CryptoJS.algo.MD5.create();
            if (v != null) {
                r.update(v)
            }
            r.update(q);
            r.update(s);
            v = r.finalize();
            w = w + CryptoJS.enc.Hex.stringify(v);
            if (w.length >= t * 2) {
                break
            }
        }
        var y = {};
        y.keyhex = w.substr(0, g[p]["keylen"] * 2);
        y.ivhex = w.substr(g[p]["keylen"] * 2, g[p]["ivlen"] * 2);
        return y
    };
    var a = function(o, u, q, v) {
        var r = CryptoJS.enc.Base64.parse(o);
        var p = CryptoJS.enc.Hex.stringify(r);
        var t = g[u]["proc"];
        var s = t(p, q, v);
        return s
    };
    var f = function(o, r, p, t) {
        var q = g[r]["eproc"];
        var s = q(o, p, t);
        return s
    };
    return {
        version: "1.0.5",
        getHexFromPEM: function(o, p) {
            return ASN1HEX.pemToHex(o, p)
        },
        getDecryptedKeyHexByKeyIV: function(p, s, r, q) {
            var o = b(s);
            return o(p, r, q)
        },
        parsePKCS5PEM: function(o) {
            return m(o)
        },
        getKeyAndUnusedIvByPasscodeAndIvsalt: function(p, o, q) {
            return i(p, o, q)
        },
        decryptKeyB64: function(o, q, p, r) {
            return a(o, q, p, r)
        },
        getDecryptedKeyHex: function(x, w) {
            var p = m(x);
            var s = p.type;
            var q = p.cipher;
            var o = p.ivsalt;
            var r = p.data;
            var v = i(q, w, o);
            var u = v.keyhex;
            var t = a(r, q, u, o);
            return t
        },
        getRSAKeyFromEncryptedPKCS5PEM: function(q, p) {
            var r = this.getDecryptedKeyHex(q, p);
            var o = new RSAKey();
            o.readPrivateKeyFromASN1HexString(r);
            return o
        },
        getEncryptedPKCS5PEMFromPrvKeyHex: function(r, y, s, q) {
            if (typeof s == "undefined" || s == null) {
                s = "AES-256-CBC"
            }
            if (typeof g[s] == "undefined") {
                throw "PKCS5PKEY unsupported algorithm: " + s
            }
            if (typeof q == "undefined" || q == null) {
                var u = g[s]["ivlen"];
                var t = l(u);
                q = t.toUpperCase()
            }
            var x = i(s, y, q);
            var w = x.keyhex;
            var v = f(r, s, w, q);
            var p = v.replace(/(.{64})/g, "$1\r\n");
            var o = "-----BEGIN RSA PRIVATE KEY-----\r\n";
            o += "Proc-Type: 4,ENCRYPTED\r\n";
            o += "DEK-Info: " + s + "," + q + "\r\n";
            o += "\r\n";
            o += p;
            o += "\r\n-----END RSA PRIVATE KEY-----\r\n";
            return o
        },
        getEncryptedPKCS5PEMFromRSAKey: function(C, D, o, s) {
            var A = new KJUR.asn1.DERInteger({
                "int": 0
            });
            var v = new KJUR.asn1.DERInteger({
                bigint: C.n
            });
            var z = new KJUR.asn1.DERInteger({
                "int": C.e
            });
            var B = new KJUR.asn1.DERInteger({
                bigint: C.d
            });
            var t = new KJUR.asn1.DERInteger({
                bigint: C.p
            });
            var r = new KJUR.asn1.DERInteger({
                bigint: C.q
            });
            var y = new KJUR.asn1.DERInteger({
                bigint: C.dmp1
            });
            var u = new KJUR.asn1.DERInteger({
                bigint: C.dmq1
            });
            var x = new KJUR.asn1.DERInteger({
                bigint: C.coeff
            });
            var E = new KJUR.asn1.DERSequence({
                array: [A, v, z, B, t, r, y, u, x]
            });
            var w = E.getEncodedHex();
            return this.getEncryptedPKCS5PEMFromPrvKeyHex(w, D, o, s)
        },
        newEncryptedPKCS5PEM: function(o, p, s, t) {
            if (typeof p == "undefined" || p == null) {
                p = 1024
            }
            if (typeof s == "undefined" || s == null) {
                s = "10001"
            }
            var q = new RSAKey();
            q.generate(p, s);
            var r = null;
            if (typeof t == "undefined" || t == null) {
                r = this.getEncryptedPKCS5PEMFromRSAKey(pkey, o)
            } else {
                r = this.getEncryptedPKCS5PEMFromRSAKey(pkey, o, t)
            }
            return r
        },
        getRSAKeyFromPlainPKCS8PEM: function(q) {
            if (q.match(/ENCRYPTED/)) {
                throw "pem shall be not ENCRYPTED"
            }
            var p = ASN1HEX.pemToHex(q, "PRIVATE KEY");
            var o = this.getRSAKeyFromPlainPKCS8Hex(p);
            return o
        },
        getRSAKeyFromPlainPKCS8Hex: function(p) {
            var o = new RSAKey();
            o.readPKCS8PrvKeyHex(p);
            return o
        },
        parseHexOfEncryptedPKCS8: function(v) {
            var r = {};
            var q = ASN1HEX.getPosArrayOfChildren_AtObj(v, 0);
            if (q.length != 2) {
                throw "malformed format: SEQUENCE(0).items != 2: " + q.length
            }
            r.ciphertext = ASN1HEX.getHexOfV_AtObj(v, q[1]);
            var x = ASN1HEX.getPosArrayOfChildren_AtObj(v, q[0]);
            if (x.length != 2) {
                throw "malformed format: SEQUENCE(0.0).items != 2: " + x.length
            }
            if (ASN1HEX.getHexOfV_AtObj(v, x[0]) != "2a864886f70d01050d") {
                throw "this only supports pkcs5PBES2"
            }
            var o = ASN1HEX.getPosArrayOfChildren_AtObj(v, x[1]);
            if (x.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1).items != 2: " + o.length
            }
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(v, o[1]);
            if (p.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + p.length
            }
            if (ASN1HEX.getHexOfV_AtObj(v, p[0]) != "2a864886f70d0307") {
                throw "this only supports TripleDES"
            }
            r.encryptionSchemeAlg = "TripleDES";
            r.encryptionSchemeIV = ASN1HEX.getHexOfV_AtObj(v, p[1]);
            var s = ASN1HEX.getPosArrayOfChildren_AtObj(v, o[0]);
            if (s.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + s.length
            }
            if (ASN1HEX.getHexOfV_AtObj(v, s[0]) != "2a864886f70d01050c") {
                throw "this only supports pkcs5PBKDF2"
            }
            var w = ASN1HEX.getPosArrayOfChildren_AtObj(v, s[1]);
            if (w.length < 2) {
                throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + w.length
            }
            r.pbkdf2Salt = ASN1HEX.getHexOfV_AtObj(v, w[0]);
            var t = ASN1HEX.getHexOfV_AtObj(v, w[1]);
            try {
                r.pbkdf2Iter = parseInt(t, 16)
            } catch(u) {
                throw "malformed format pbkdf2Iter: " + t
            }
            return r
        },
        getPBKDF2KeyHexFromParam: function(t, o) {
            var s = CryptoJS.enc.Hex.parse(t.pbkdf2Salt);
            var p = t.pbkdf2Iter;
            var r = CryptoJS.PBKDF2(o, s, {
                keySize: 192 / 32,
                iterations: p
            });
            var q = CryptoJS.enc.Hex.stringify(r);
            return q
        },
        getPlainPKCS8HexFromEncryptedPKCS8PEM: function(w, x) {
            var q = ASN1HEX.pemToHex(w, "ENCRYPTED PRIVATE KEY");
            var o = this.parseHexOfEncryptedPKCS8(q);
            var t = PKCS5PKEY.getPBKDF2KeyHexFromParam(o, x);
            var u = {};
            u.ciphertext = CryptoJS.enc.Hex.parse(o.ciphertext);
            var s = CryptoJS.enc.Hex.parse(t);
            var r = CryptoJS.enc.Hex.parse(o.encryptionSchemeIV);
            var v = CryptoJS.TripleDES.decrypt(u, s, {
                iv: r
            });
            var p = CryptoJS.enc.Hex.stringify(v);
            return p
        },
        getRSAKeyFromEncryptedPKCS8PEM: function(r, q) {
            var p = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(r, q);
            var o = this.getRSAKeyFromPlainPKCS8Hex(p);
            return o
        },
        getKeyFromEncryptedPKCS8PEM: function(r, p) {
            var o = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(r, p);
            var q = this.getKeyFromPlainPrivatePKCS8Hex(o);
            return q
        },
        parsePlainPrivatePKCS8Hex: function(r) {
            var p = {};
            p.algparam = null;
            if (r.substr(0, 2) != "30") {
                throw "malformed plain PKCS8 private key(code:001)"
            }
            var q = ASN1HEX.getPosArrayOfChildren_AtObj(r, 0);
            if (q.length != 3) {
                throw "malformed plain PKCS8 private key(code:002)"
            }
            if (r.substr(q[1], 2) != "30") {
                throw "malformed PKCS8 private key(code:003)"
            }
            var o = ASN1HEX.getPosArrayOfChildren_AtObj(r, q[1]);
            if (o.length != 2) {
                throw "malformed PKCS8 private key(code:004)"
            }
            if (r.substr(o[0], 2) != "06") {
                throw "malformed PKCS8 private key(code:005)"
            }
            p.algoid = ASN1HEX.getHexOfV_AtObj(r, o[0]);
            if (r.substr(o[1], 2) == "06") {
                p.algparam = ASN1HEX.getHexOfV_AtObj(r, o[1])
            }
            if (r.substr(q[2], 2) != "04") {
                throw "malformed PKCS8 private key(code:006)"
            }
            p.keyidx = ASN1HEX.getStartPosOfV_AtObj(r, q[2]);
            return p
        },
        getKeyFromPlainPrivatePKCS8PEM: function(p) {
            var o = ASN1HEX.pemToHex(p, "PRIVATE KEY");
            var q = this.getKeyFromPlainPrivatePKCS8Hex(o);
            return q
        },
        getKeyFromPlainPrivatePKCS8Hex: function(o) {
            var p = this.parsePlainPrivatePKCS8Hex(o);
            var q;
            if (p.algoid == "2a864886f70d010101") {
                q = new RSAKey()
            } else {
                if (p.algoid == "2a8648ce380401") {
                    q = new KJUR.crypto.DSA()
                } else {
                    if (p.algoid == "2a8648ce3d0201") {
                        q = new KJUR.crypto.ECDSA()
                    } else {
                        throw "unsupported private key algorithm"
                    }
                }
            }
            q.readPKCS8PrvKeyHex(o);
            return q
        },
        getRSAKeyFromPublicPKCS8PEM: function(p) {
            var q = ASN1HEX.pemToHex(p, "PUBLIC KEY");
            var o = this.getRSAKeyFromPublicPKCS8Hex(q);
            return o
        },
        getKeyFromPublicPKCS8PEM: function(p) {
            var q = ASN1HEX.pemToHex(p, "PUBLIC KEY");
            var o = this.getKeyFromPublicPKCS8Hex(q);
            return o
        },
        getKeyFromPublicPKCS8Hex: function(o) {
            var p;
            var q = ASN1HEX.getVbyList(h, 0, [0, 0], "06");
            if (q === "2a864886f70d010101") {
                p = new RSAKey()
            } else {
                if (q === "2a8648ce380401") {
                    p = new KJUR.crypto.DSA()
                } else {
                    if (q === "2a8648ce3d0201") {
                        p = new KJUR.crypto.ECDSA()
                    } else {
                        throw "unsupported PKCS#8 public key hex"
                    }
                }
            }
            p.readPKCS8PubKeyHex(h);
            return p
        },
        parsePublicRawRSAKeyHex: function(q) {
            var o = {};
            if (q.substr(0, 2) != "30") {
                throw "malformed RSA key(code:001)"
            }
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(q, 0);
            if (p.length != 2) {
                throw "malformed RSA key(code:002)"
            }
            if (q.substr(p[0], 2) != "02") {
                throw "malformed RSA key(code:003)"
            }
            o.n = ASN1HEX.getHexOfV_AtObj(q, p[0]);
            if (q.substr(p[1], 2) != "02") {
                throw "malformed RSA key(code:004)"
            }
            o.e = ASN1HEX.getHexOfV_AtObj(q, p[1]);
            return o
        },
        parsePrivateRawRSAKeyHexAtObj: function(p, r) {
            var q = r.keyidx;
            if (p.substr(q, 2) != "30") {
                throw "malformed RSA private key(code:001)"
            }
            var o = ASN1HEX.getPosArrayOfChildren_AtObj(p, q);
            if (o.length != 9) {
                throw "malformed RSA private key(code:002)"
            }
            r.key = {};
            r.key.n = ASN1HEX.getHexOfV_AtObj(p, o[1]);
            r.key.e = ASN1HEX.getHexOfV_AtObj(p, o[2]);
            r.key.d = ASN1HEX.getHexOfV_AtObj(p, o[3]);
            r.key.p = ASN1HEX.getHexOfV_AtObj(p, o[4]);
            r.key.q = ASN1HEX.getHexOfV_AtObj(p, o[5]);
            r.key.dp = ASN1HEX.getHexOfV_AtObj(p, o[6]);
            r.key.dq = ASN1HEX.getHexOfV_AtObj(p, o[7]);
            r.key.co = ASN1HEX.getHexOfV_AtObj(p, o[8])
        },
        parsePrivateRawECKeyHexAtObj: function(p, r) {
            var q = r.keyidx;
            if (p.substr(q, 2) != "30") {
                throw "malformed ECC private key(code:001)"
            }
            var o = ASN1HEX.getPosArrayOfChildren_AtObj(p, q);
            if (o.length != 3) {
                throw "malformed ECC private key(code:002)"
            }
            if (p.substr(o[1], 2) != "04") {
                throw "malformed ECC private key(code:003)"
            }
            r.key = ASN1HEX.getHexOfV_AtObj(p, o[1])
        },
        parsePublicPKCS8Hex: function(r) {
            var p = {};
            p.algparam = null;
            var q = ASN1HEX.getPosArrayOfChildren_AtObj(r, 0);
            if (q.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + q.length
            }
            var s = q[0];
            if (r.substr(s, 2) != "30") {
                throw "malformed PKCS8 public key(code:001)"
            }
            var o = ASN1HEX.getPosArrayOfChildren_AtObj(r, s);
            if (o.length != 2) {
                throw "malformed PKCS8 public key(code:002)"
            }
            if (r.substr(o[0], 2) != "06") {
                throw "malformed PKCS8 public key(code:003)"
            }
            p.algoid = ASN1HEX.getHexOfV_AtObj(r, o[0]);
            if (r.substr(o[1], 2) == "06") {
                p.algparam = ASN1HEX.getHexOfV_AtObj(r, o[1])
            }
            if (r.substr(q[1], 2) != "03") {
                throw "malformed PKCS8 public key(code:004)"
            }
            p.key = ASN1HEX.getHexOfV_AtObj(r, q[1]).substr(2);
            return p
        },
        getRSAKeyFromPublicPKCS8Hex: function(o) {
            var p = new RSAKey();
            p.readPKCS8PubKeyHex(o);
            return p
        },
    }
} ();
/*! keyutil-1.0.15.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
var KEYUTIL = function() {
    var d = function(p, r, q) {
        return k(CryptoJS.AES, p, r, q)
    };
    var e = function(p, r, q) {
        return k(CryptoJS.TripleDES, p, r, q)
    };
    var a = function(p, r, q) {
        return k(CryptoJS.DES, p, r, q)
    };
    var k = function(s, x, u, q) {
        var r = CryptoJS.enc.Hex.parse(x);
        var w = CryptoJS.enc.Hex.parse(u);
        var p = CryptoJS.enc.Hex.parse(q);
        var t = {};
        t.key = w;
        t.iv = p;
        t.ciphertext = r;
        var v = s.decrypt(t, w, {
            iv: p
        });
        return CryptoJS.enc.Hex.stringify(v)
    };
    var l = function(p, r, q) {
        return g(CryptoJS.AES, p, r, q)
    };
    var o = function(p, r, q) {
        return g(CryptoJS.TripleDES, p, r, q)
    };
    var f = function(p, r, q) {
        return g(CryptoJS.DES, p, r, q)
    };
    var g = function(t, y, v, q) {
        var s = CryptoJS.enc.Hex.parse(y);
        var x = CryptoJS.enc.Hex.parse(v);
        var p = CryptoJS.enc.Hex.parse(q);
        var w = t.encrypt(s, x, {
            iv: p
        });
        var r = CryptoJS.enc.Hex.parse(w.toString());
        var u = CryptoJS.enc.Base64.stringify(r);
        return u
    };
    var i = {
        "AES-256-CBC": {
            proc: d,
            eproc: l,
            keylen: 32,
            ivlen: 16
        },
        "AES-192-CBC": {
            proc: d,
            eproc: l,
            keylen: 24,
            ivlen: 16
        },
        "AES-128-CBC": {
            proc: d,
            eproc: l,
            keylen: 16,
            ivlen: 16
        },
        "DES-EDE3-CBC": {
            proc: e,
            eproc: o,
            keylen: 24,
            ivlen: 8
        },
        "DES-CBC": {
            proc: a,
            eproc: f,
            keylen: 8,
            ivlen: 8
        }
    };
    var c = function(p) {
        return i[p]["proc"]
    };
    var m = function(p) {
        var r = CryptoJS.lib.WordArray.random(p);
        var q = CryptoJS.enc.Hex.stringify(r);
        return q
    };
    var n = function(v) {
        var w = {};
        var q = v.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"));
        if (q) {
            w.cipher = q[1];
            w.ivsalt = q[2]
        }
        var p = v.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));
        if (p) {
            w.type = p[1]
        }
        var u = -1;
        var x = 0;
        if (v.indexOf("\r\n\r\n") != -1) {
            u = v.indexOf("\r\n\r\n");
            x = 2
        }
        if (v.indexOf("\n\n") != -1) {
            u = v.indexOf("\n\n");
            x = 1
        }
        var t = v.indexOf("-----END");
        if (u != -1 && t != -1) {
            var r = v.substring(u + x * 2, t - x);
            r = r.replace(/\s+/g, "");
            w.data = r
        }
        return w
    };
    var j = function(q, y, p) {
        var v = p.substring(0, 16);
        var t = CryptoJS.enc.Hex.parse(v);
        var r = CryptoJS.enc.Utf8.parse(y);
        var u = i[q]["keylen"] + i[q]["ivlen"];
        var x = "";
        var w = null;
        for (;;) {
            var s = CryptoJS.algo.MD5.create();
            if (w != null) {
                s.update(w)
            }
            s.update(r);
            s.update(t);
            w = s.finalize();
            x = x + CryptoJS.enc.Hex.stringify(w);
            if (x.length >= u * 2) {
                break
            }
        }
        var z = {};
        z.keyhex = x.substr(0, i[q]["keylen"] * 2);
        z.ivhex = x.substr(i[q]["keylen"] * 2, i[q]["ivlen"] * 2);
        return z
    };
    var b = function(p, v, r, w) {
        var s = CryptoJS.enc.Base64.parse(p);
        var q = CryptoJS.enc.Hex.stringify(s);
        var u = i[v]["proc"];
        var t = u(q, r, w);
        return t
    };
    var h = function(p, s, q, u) {
        var r = i[s]["eproc"];
        var t = r(p, q, u);
        return t
    };
    return {
        version: "1.0.0",
        getHexFromPEM: function(p, q) {
            return ASN1HEX.pemToHex(p, q)
        },
        getDecryptedKeyHexByKeyIV: function(q, t, s, r) {
            var p = c(t);
            return p(q, s, r)
        },
        parsePKCS5PEM: function(p) {
            return n(p)
        },
        getKeyAndUnusedIvByPasscodeAndIvsalt: function(q, p, r) {
            return j(q, p, r)
        },
        decryptKeyB64: function(p, r, q, s) {
            return b(p, r, q, s)
        },
        getDecryptedKeyHex: function(y, x) {
            var q = n(y);
            var t = q.type;
            var r = q.cipher;
            var p = q.ivsalt;
            var s = q.data;
            var w = j(r, x, p);
            var v = w.keyhex;
            var u = b(s, r, v, p);
            return u
        },
        getRSAKeyFromEncryptedPKCS5PEM: function(r, q) {
            var s = this.getDecryptedKeyHex(r, q);
            var p = new RSAKey();
            p.readPrivateKeyFromASN1HexString(s);
            return p
        },
        getEncryptedPKCS5PEMFromPrvKeyHex: function(x, s, A, t, r) {
            var p = "";
            if (typeof t == "undefined" || t == null) {
                t = "AES-256-CBC"
            }
            if (typeof i[t] == "undefined") {
                throw "KEYUTIL unsupported algorithm: " + t
            }
            if (typeof r == "undefined" || r == null) {
                var v = i[t]["ivlen"];
                var u = m(v);
                r = u.toUpperCase()
            }
            var z = j(t, A, r);
            var y = z.keyhex;
            var w = h(s, t, y, r);
            var q = w.replace(/(.{64})/g, "$1\r\n");
            var p = "-----BEGIN " + x + " PRIVATE KEY-----\r\n";
            p += "Proc-Type: 4,ENCRYPTED\r\n";
            p += "DEK-Info: " + t + "," + r + "\r\n";
            p += "\r\n";
            p += q;
            p += "\r\n-----END " + x + " PRIVATE KEY-----\r\n";
            return p
        },
        getEncryptedPKCS5PEMFromRSAKey: function(D, E, r, t) {
            var B = new KJUR.asn1.DERInteger({
                "int": 0
            });
            var w = new KJUR.asn1.DERInteger({
                bigint: D.n
            });
            var A = new KJUR.asn1.DERInteger({
                "int": D.e
            });
            var C = new KJUR.asn1.DERInteger({
                bigint: D.d
            });
            var u = new KJUR.asn1.DERInteger({
                bigint: D.p
            });
            var s = new KJUR.asn1.DERInteger({
                bigint: D.q
            });
            var z = new KJUR.asn1.DERInteger({
                bigint: D.dmp1
            });
            var v = new KJUR.asn1.DERInteger({
                bigint: D.dmq1
            });
            var y = new KJUR.asn1.DERInteger({
                bigint: D.coeff
            });
            var F = new KJUR.asn1.DERSequence({
                array: [B, w, A, C, u, s, z, v, y]
            });
            var x = F.getEncodedHex();
            return this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", x, E, r, t)
        },
        newEncryptedPKCS5PEM: function(p, q, t, u) {
            if (typeof q == "undefined" || q == null) {
                q = 1024
            }
            if (typeof t == "undefined" || t == null) {
                t = "10001"
            }
            var r = new RSAKey();
            r.generate(q, t);
            var s = null;
            if (typeof u == "undefined" || u == null) {
                s = this.getEncryptedPKCS5PEMFromRSAKey(r, p)
            } else {
                s = this.getEncryptedPKCS5PEMFromRSAKey(r, p, u)
            }
            return s
        },
        getRSAKeyFromPlainPKCS8PEM: function(r) {
            if (r.match(/ENCRYPTED/)) {
                throw "pem shall be not ENCRYPTED"
            }
            var q = ASN1HEX.pemToHex(r, "PRIVATE KEY");
            var p = this.getRSAKeyFromPlainPKCS8Hex(q);
            return p
        },
        getRSAKeyFromPlainPKCS8Hex: function(q) {
            var p = new RSAKey();
            p.readPKCS8PrvKeyHex(q);
            return p
        },
        parseHexOfEncryptedPKCS8: function(w) {
            var s = {};
            var r = ASN1HEX.getPosArrayOfChildren_AtObj(w, 0);
            if (r.length != 2) {
                throw "malformed format: SEQUENCE(0).items != 2: " + r.length
            }
            s.ciphertext = ASN1HEX.getHexOfV_AtObj(w, r[1]);
            var y = ASN1HEX.getPosArrayOfChildren_AtObj(w, r[0]);
            if (y.length != 2) {
                throw "malformed format: SEQUENCE(0.0).items != 2: " + y.length
            }
            if (ASN1HEX.getHexOfV_AtObj(w, y[0]) != "2a864886f70d01050d") {
                throw "this only supports pkcs5PBES2"
            }
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(w, y[1]);
            if (y.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1).items != 2: " + p.length
            }
            var q = ASN1HEX.getPosArrayOfChildren_AtObj(w, p[1]);
            if (q.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + q.length
            }
            if (ASN1HEX.getHexOfV_AtObj(w, q[0]) != "2a864886f70d0307") {
                throw "this only supports TripleDES"
            }
            s.encryptionSchemeAlg = "TripleDES";
            s.encryptionSchemeIV = ASN1HEX.getHexOfV_AtObj(w, q[1]);
            var t = ASN1HEX.getPosArrayOfChildren_AtObj(w, p[0]);
            if (t.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + t.length
            }
            if (ASN1HEX.getHexOfV_AtObj(w, t[0]) != "2a864886f70d01050c") {
                throw "this only supports pkcs5PBKDF2"
            }
            var x = ASN1HEX.getPosArrayOfChildren_AtObj(w, t[1]);
            if (x.length < 2) {
                throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + x.length
            }
            s.pbkdf2Salt = ASN1HEX.getHexOfV_AtObj(w, x[0]);
            var u = ASN1HEX.getHexOfV_AtObj(w, x[1]);
            try {
                s.pbkdf2Iter = parseInt(u, 16)
            } catch(v) {
                throw "malformed format pbkdf2Iter: " + u
            }
            return s
        },
        getPBKDF2KeyHexFromParam: function(u, p) {
            var t = CryptoJS.enc.Hex.parse(u.pbkdf2Salt);
            var q = u.pbkdf2Iter;
            var s = CryptoJS.PBKDF2(p, t, {
                keySize: 192 / 32,
                iterations: q
            });
            var r = CryptoJS.enc.Hex.stringify(s);
            return r
        },
        getPlainPKCS8HexFromEncryptedPKCS8PEM: function(x, y) {
            var r = ASN1HEX.pemToHex(x, "ENCRYPTED PRIVATE KEY");
            var p = this.parseHexOfEncryptedPKCS8(r);
            var u = KEYUTIL.getPBKDF2KeyHexFromParam(p, y);
            var v = {};
            v.ciphertext = CryptoJS.enc.Hex.parse(p.ciphertext);
            var t = CryptoJS.enc.Hex.parse(u);
            var s = CryptoJS.enc.Hex.parse(p.encryptionSchemeIV);
            var w = CryptoJS.TripleDES.decrypt(v, t, {
                iv: s
            });
            var q = CryptoJS.enc.Hex.stringify(w);
            return q
        },
        getRSAKeyFromEncryptedPKCS8PEM: function(s, r) {
            var q = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(s, r);
            var p = this.getRSAKeyFromPlainPKCS8Hex(q);
            return p
        },
        getKeyFromEncryptedPKCS8PEM: function(s, q) {
            var p = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(s, q);
            var r = this.getKeyFromPlainPrivatePKCS8Hex(p);
            return r
        },
        parsePlainPrivatePKCS8Hex: function(s) {
            var q = {};
            q.algparam = null;
            if (s.substr(0, 2) != "30") {
                throw "malformed plain PKCS8 private key(code:001)"
            }
            var r = ASN1HEX.getPosArrayOfChildren_AtObj(s, 0);
            if (r.length != 3) {
                throw "malformed plain PKCS8 private key(code:002)"
            }
            if (s.substr(r[1], 2) != "30") {
                throw "malformed PKCS8 private key(code:003)"
            }
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(s, r[1]);
            if (p.length != 2) {
                throw "malformed PKCS8 private key(code:004)"
            }
            if (s.substr(p[0], 2) != "06") {
                throw "malformed PKCS8 private key(code:005)"
            }
            q.algoid = ASN1HEX.getHexOfV_AtObj(s, p[0]);
            if (s.substr(p[1], 2) == "06") {
                q.algparam = ASN1HEX.getHexOfV_AtObj(s, p[1])
            }
            if (s.substr(r[2], 2) != "04") {
                throw "malformed PKCS8 private key(code:006)"
            }
            q.keyidx = ASN1HEX.getStartPosOfV_AtObj(s, r[2]);
            return q
        },
        getKeyFromPlainPrivatePKCS8PEM: function(q) {
            var p = ASN1HEX.pemToHex(q, "PRIVATE KEY");
            var r = this.getKeyFromPlainPrivatePKCS8Hex(p);
            return r
        },
        getKeyFromPlainPrivatePKCS8Hex: function(p) {
            var q = this.parsePlainPrivatePKCS8Hex(p);
            var r;
            if (q.algoid == "2a864886f70d010101") {
                r = new RSAKey()
            } else {
                if (q.algoid == "2a8648ce380401") {
                    r = new KJUR.crypto.DSA()
                } else {
                    if (q.algoid == "2a8648ce3d0201") {
                        r = new KJUR.crypto.ECDSA()
                    } else {
                        throw "unsupported private key algorithm"
                    }
                }
            }
            r.readPKCS8PrvKeyHex(p);
            return r
        },
        getRSAKeyFromPublicPKCS8PEM: function(q) {
            var r = ASN1HEX.pemToHex(q, "PUBLIC KEY");
            var p = this.getRSAKeyFromPublicPKCS8Hex(r);
            return p
        },
        getKeyFromPublicPKCS8PEM: function(q) {
            var r = ASN1HEX.pemToHex(q, "PUBLIC KEY");
            var p = this.getKeyFromPublicPKCS8Hex(r);
            return p
        },
        getKeyFromPublicPKCS8Hex: function(q) {
            var p;
            var r = ASN1HEX.getVbyList(q, 0, [0, 0], "06");
            if (r === "2a864886f70d010101") {
                p = new RSAKey()
            } else {
                if (r === "2a8648ce380401") {
                    p = new KJUR.crypto.DSA()
                } else {
                    if (r === "2a8648ce3d0201") {
                        p = new KJUR.crypto.ECDSA()
                    } else {
                        throw "unsupported PKCS#8 public key hex"
                    }
                }
            }
            p.readPKCS8PubKeyHex(q);
            return p
        },
        parsePublicRawRSAKeyHex: function(r) {
            var p = {};
            if (r.substr(0, 2) != "30") {
                throw "malformed RSA key(code:001)"
            }
            var q = ASN1HEX.getPosArrayOfChildren_AtObj(r, 0);
            if (q.length != 2) {
                throw "malformed RSA key(code:002)"
            }
            if (r.substr(q[0], 2) != "02") {
                throw "malformed RSA key(code:003)"
            }
            p.n = ASN1HEX.getHexOfV_AtObj(r, q[0]);
            if (r.substr(q[1], 2) != "02") {
                throw "malformed RSA key(code:004)"
            }
            p.e = ASN1HEX.getHexOfV_AtObj(r, q[1]);
            return p
        },
        parsePrivateRawRSAKeyHexAtObj: function(q, u) {
            var t = ASN1HEX;
            var r = t.getHexOfV_AtObj;
            var s = t.getDecendantIndexByNthList(q, 0, [2, 0]);
            var p = t.getPosArrayOfChildren_AtObj(q, s);
            if (p.length !== 9) {
                throw "malformed PKCS#8 plain RSA private key"
            }
            u.key = {};
            u.key.n = r(q, p[1]);
            u.key.e = r(q, p[2]);
            u.key.d = r(q, p[3]);
            u.key.p = r(q, p[4]);
            u.key.q = r(q, p[5]);
            u.key.dp = r(q, p[6]);
            u.key.dq = r(q, p[7]);
            u.key.co = r(q, p[8])
        },
        parsePrivateRawECKeyHexAtObj: function(p, t) {
            var s = ASN1HEX;
            var q = t.keyidx;
            var r = new KJUR.crypto.ECDSA();
            r.readPKCS8PrvKeyHex(p);
            t.key = r.prvKeyHex;
            t.pubkey = r.pubKeyHex
        },
        parsePublicPKCS8Hex: function(s) {
            var q = {};
            q.algparam = null;
            var r = ASN1HEX.getPosArrayOfChildren_AtObj(s, 0);
            if (r.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + r.length
            }
            var t = r[0];
            if (s.substr(t, 2) != "30") {
                throw "malformed PKCS8 public key(code:001)"
            }
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(s, t);
            if (p.length != 2) {
                throw "malformed PKCS8 public key(code:002)"
            }
            if (s.substr(p[0], 2) != "06") {
                throw "malformed PKCS8 public key(code:003)"
            }
            q.algoid = ASN1HEX.getHexOfV_AtObj(s, p[0]);
            if (s.substr(p[1], 2) == "06") {
                q.algparam = ASN1HEX.getHexOfV_AtObj(s, p[1])
            } else {
                if (s.substr(p[1], 2) == "30") {
                    q.algparam = {};
                    q.algparam.p = ASN1HEX.getVbyList(s, p[1], [0], "02");
                    q.algparam.q = ASN1HEX.getVbyList(s, p[1], [1], "02");
                    q.algparam.g = ASN1HEX.getVbyList(s, p[1], [2], "02")
                }
            }
            if (s.substr(r[1], 2) != "03") {
                throw "malformed PKCS8 public key(code:004)"
            }
            q.key = ASN1HEX.getHexOfV_AtObj(s, r[1]).substr(2);
            return q
        },
        getRSAKeyFromPublicPKCS8Hex: function(p) {
            var q = new RSAKey();
            q.readPKCS8PubKeyHex(p);
            return q
        },
    }
} ();
KEYUTIL.getKey = function(i, f, j) {
    if (typeof RSAKey != "undefined" && i instanceof RSAKey) {
        return i
    }
    if (typeof KJUR.crypto.ECDSA != "undefined" && i instanceof KJUR.crypto.ECDSA) {
        return i
    }
    if (typeof KJUR.crypto.DSA != "undefined" && i instanceof KJUR.crypto.DSA) {
        return i
    }
    if (i.curve !== undefined && i.xy !== undefined && i.d === undefined) {
        return new KJUR.crypto.ECDSA({
            pub: i.xy,
            curve: i.curve
        })
    }
    if (i.curve !== undefined && i.d !== undefined) {
        return new KJUR.crypto.ECDSA({
            prv: i.d,
            curve: i.curve
        })
    }
    if (i.kty === undefined && i.n !== undefined && i.e !== undefined && i.d === undefined) {
        var D = new RSAKey();
        D.setPublic(i.n, i.e);
        return D
    }
    if (i.kty === undefined && i.n !== undefined && i.e !== undefined && i.d !== undefined && i.p !== undefined && i.q !== undefined && i.dp !== undefined && i.dq !== undefined && i.co !== undefined && i.qi === undefined) {
        var D = new RSAKey();
        D.setPrivateEx(i.n, i.e, i.d, i.p, i.q, i.dp, i.dq, i.co);
        return D
    }
    if (i.kty === undefined && i.n !== undefined && i.e !== undefined && i.d !== undefined && i.p === undefined) {
        var D = new RSAKey();
        D.setPrivate(i.n, i.e, i.d);
        return D
    }
    if (i.p !== undefined && i.q !== undefined && i.g !== undefined && i.y !== undefined && i.x === undefined) {
        var D = new KJUR.crypto.DSA();
        D.setPublic(i.p, i.q, i.g, i.y);
        return D
    }
    if (i.p !== undefined && i.q !== undefined && i.g !== undefined && i.y !== undefined && i.x !== undefined) {
        var D = new KJUR.crypto.DSA();
        D.setPrivate(i.p, i.q, i.g, i.y, i.x);
        return D
    }
    if (i.kty === "RSA" && i.n !== undefined && i.e !== undefined && i.d === undefined) {
        var D = new RSAKey();
        D.setPublic(b64utohex(i.n), b64utohex(i.e));
        return D
    }
    if (i.kty === "RSA" && i.n !== undefined && i.e !== undefined && i.d !== undefined && i.p !== undefined && i.q !== undefined && i.dp !== undefined && i.dq !== undefined && i.qi !== undefined) {
      
        var D = new RSAKey();
        D.setPrivateEx(b64utohex(i.n), b64utohex(i.e), b64utohex(i.d), b64utohex(i.p), b64utohex(i.q), b64utohex(i.dp), b64utohex(i.dq), b64utohex(i.qi));
        return D
    }
    if (i.kty === "RSA" && i.n !== undefined && i.e !== undefined && i.d !== undefined) {
      
        var D = new RSAKey();
        D.setPrivate(b64utohex(i.n), b64utohex(i.e), b64utohex(i.d));
        return D
    }
    if (i.kty === "EC" && i.crv !== undefined && i.x !== undefined && i.y !== undefined && i.d === undefined) {
        var e = new KJUR.crypto.ECDSA({
            curve: i.crv
        });
        var n = e.ecparams.keylen / 4;
        var t = ("0000000000" + b64utohex(i.x)).slice( - n);
        var r = ("0000000000" + b64utohex(i.y)).slice( - n);
        var o = "04" + t + r;
        e.setPublicKeyHex(o);
        return e
    }
    if (i.kty === "EC" && i.crv !== undefined && i.x !== undefined && i.y !== undefined && i.d !== undefined) {
        var e = new KJUR.crypto.ECDSA({
            curve: i.crv
        });
        var n = e.ecparams.keylen / 4;
        var t = ("0000000000" + b64utohex(i.x)).slice( - n);
        var r = ("0000000000" + b64utohex(i.y)).slice( - n);
        var o = "04" + t + r;
        var b = ("0000000000" + b64utohex(i.d)).slice( - n);
        e.setPublicKeyHex(o);
        e.setPrivateKeyHex(b);
        return e
    }
    if (j === "pkcs5prv") {
      
        var A = i,
        w = ASN1HEX,
        C, D;
        C = w.getPosArrayOfChildren_AtObj(A, 0);
        
        if (C.length === 9) {
            D = new RSAKey();
            D.readPrivateKeyFromASN1HexString(i)
        } else {
            if (C.length === 6) {
                D = new KJUR.crypto.DSA();
                D.readPKCS5PrvKeyHex(A)
            } else {
                if (C.length > 2 && A.substr(C[1], 2) === "04") {
                    D = new KJUR.crypto.ECDSA();
                    D.readPKCS5PrvKeyHex(A)
                } else {
                    throw "unsupported PKCS#1/5 hexadecimal key"
                }
            }
        }
      
        return D
    }
    if (j === "pkcs8prv") {
        var D = KEYUTIL.getKeyFromPlainPrivatePKCS8Hex(i);
        return D
    }
    if (j === "pkcs8pub") {
        return KEYUTIL.getKeyFromPublicPKCS8Hex(i)
    }
    if (j === "x509pub") {
        return X509.getPublicKeyFromCertHex(i)
    }
    if (i.indexOf("-END CERTIFICATE-", 0) != -1 || i.indexOf("-END X509 CERTIFICATE-", 0) != -1 || i.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) {
        return X509.getPublicKeyFromCertPEM(i)
    }
    if (i.indexOf("-END PUBLIC KEY-") != -1) {
        return KEYUTIL.getKeyFromPublicPKCS8PEM(i)
    }
    if (i.indexOf("-END RSA PRIVATE KEY-") != -1 && i.indexOf("4,ENCRYPTED") == -1) {
        var k = ASN1HEX.pemToHex(i, "RSA PRIVATE KEY");
        return KEYUTIL.getKey(k, null, "pkcs5prv")
    }
    if (i.indexOf("-END DSA PRIVATE KEY-") != -1 && i.indexOf("4,ENCRYPTED") == -1) {
        var z = ASN1HEX.pemToHex(i, "DSA PRIVATE KEY");
        var v = ASN1HEX.getVbyList(z, 0, [1], "02");
        var u = ASN1HEX.getVbyList(z, 0, [2], "02");
        var B = ASN1HEX.getVbyList(z, 0, [3], "02");
        var l = ASN1HEX.getVbyList(z, 0, [4], "02");
        var m = ASN1HEX.getVbyList(z, 0, [5], "02");
        var D = new KJUR.crypto.DSA();
        D.setPrivate(new BigInteger(v, 16), new BigInteger(u, 16), new BigInteger(B, 16), new BigInteger(l, 16), new BigInteger(m, 16));
        return D
    }
    if (i.indexOf("-END PRIVATE KEY-") != -1) {
        return KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(i)
    }
    if (i.indexOf("-END RSA PRIVATE KEY-") != -1 && i.indexOf("4,ENCRYPTED") != -1) {
        return KEYUTIL.getRSAKeyFromEncryptedPKCS5PEM(i, f)
    }
    if (i.indexOf("-END EC PRIVATE KEY-") != -1 && i.indexOf("4,ENCRYPTED") != -1) {
        var z = KEYUTIL.getDecryptedKeyHex(i, f);
        var D = ASN1HEX.getVbyList(z, 0, [1], "04");
        var d = ASN1HEX.getVbyList(z, 0, [2, 0], "06");
        var s = ASN1HEX.getVbyList(z, 0, [3, 0], "03").substr(2);
        var c = "";
        if (KJUR.crypto.OID.oidhex2name[d] !== undefined) {
            c = KJUR.crypto.OID.oidhex2name[d]
        } else {
            throw "undefined OID(hex) in KJUR.crypto.OID: " + d
        }
        var e = new KJUR.crypto.ECDSA({
            curve: c
        });
        e.setPublicKeyHex(s);
        e.setPrivateKeyHex(D);
        e.isPublic = false;
        return e
    }
    if (i.indexOf("-END DSA PRIVATE KEY-") != -1 && i.indexOf("4,ENCRYPTED") != -1) {
        var z = KEYUTIL.getDecryptedKeyHex(i, f);
        var v = ASN1HEX.getVbyList(z, 0, [1], "02");
        var u = ASN1HEX.getVbyList(z, 0, [2], "02");
        var B = ASN1HEX.getVbyList(z, 0, [3], "02");
        var l = ASN1HEX.getVbyList(z, 0, [4], "02");
        var m = ASN1HEX.getVbyList(z, 0, [5], "02");
        var D = new KJUR.crypto.DSA();
        D.setPrivate(new BigInteger(v, 16), new BigInteger(u, 16), new BigInteger(B, 16), new BigInteger(l, 16), new BigInteger(m, 16));
        return D
    }
    if (i.indexOf("-END ENCRYPTED PRIVATE KEY-") != -1) {
        return KEYUTIL.getKeyFromEncryptedPKCS8PEM(i, f)
    }
    throw "not supported argument"
};
KEYUTIL.generateKeypair = function(a, c) {
    if (a == "RSA") {
        var b = c;
        var h = new RSAKey();
        h.generate(b, "10001");
        h.isPrivate = true;
        h.isPublic = true;
        var f = new RSAKey();
        var e = h.n.toString(16);
        var i = h.e.toString(16);
        f.setPublic(e, i);
        f.isPrivate = false;
        f.isPublic = true;
        var k = {};
        k.prvKeyObj = h;
        k.pubKeyObj = f;
        return k
    } else {
        if (a == "EC") {
            var d = c;
            var g = new KJUR.crypto.ECDSA({
                curve: d
            });
            var j = g.generateKeyPairHex();
            var h = new KJUR.crypto.ECDSA({
                curve: d
            });
            h.setPublicKeyHex(j.ecpubhex);
            h.setPrivateKeyHex(j.ecprvhex);
            h.isPrivate = true;
            h.isPublic = false;
            var f = new KJUR.crypto.ECDSA({
                curve: d
            });
            f.setPublicKeyHex(j.ecpubhex);
            f.isPrivate = false;
            f.isPublic = true;
            var k = {};
            k.prvKeyObj = h;
            k.pubKeyObj = f;
            return k
        } else {
            throw "unknown algorithm: " + a
        }
    }
};
KEYUTIL.getPEM = function(a, r, o, g, j) {
    var v = KJUR.asn1;
    var u = KJUR.crypto;
    function p(s) {
        var w = KJUR.asn1.ASN1Util.newObject({
            seq: [{
                "int": 0
            },
            {
                "int": {
                    bigint: s.n
                }
            },
            {
                "int": s.e
            },
            {
                "int": {
                    bigint: s.d
                }
            },
            {
                "int": {
                    bigint: s.p
                }
            },
            {
                "int": {
                    bigint: s.q
                }
            },
            {
                "int": {
                    bigint: s.dmp1
                }
            },
            {
                "int": {
                    bigint: s.dmq1
                }
            },
            {
                "int": {
                    bigint: s.coeff
                }
            }]
        });
        return w
    }
    function q(w) {
        var s = KJUR.asn1.ASN1Util.newObject({
            seq: [{
                "int": 1
            },
            {
                octstr: {
                    hex: w.prvKeyHex
                }
            },
            {
                tag: ["a0", true, {
                    oid: {
                        name: w.curveName
                    }
                }]
            },
            {
                tag: ["a1", true, {
                    bitstr: {
                        hex: "00" + w.pubKeyHex
                    }
                }]
            }]
        });
        return s
    }
    function n(s) {
        var w = KJUR.asn1.ASN1Util.newObject({
            seq: [{
                "int": 0
            },
            {
                "int": {
                    bigint: s.p
                }
            },
            {
                "int": {
                    bigint: s.q
                }
            },
            {
                "int": {
                    bigint: s.g
                }
            },
            {
                "int": {
                    bigint: s.y
                }
            },
            {
                "int": {
                    bigint: s.x
                }
            }]
        });
        return w
    }
    if (((typeof RSAKey != "undefined" && a instanceof RSAKey) || (typeof u.DSA != "undefined" && a instanceof u.DSA) || (typeof u.ECDSA != "undefined" && a instanceof u.ECDSA)) && a.isPublic == true && (r === undefined || r == "PKCS8PUB")) {
        var t = new KJUR.asn1.x509.SubjectPublicKeyInfo(a);
        var m = t.getEncodedHex();
        return v.ASN1Util.getPEMStringFromHex(m, "PUBLIC KEY")
    }
    if (r == "PKCS1PRV" && typeof RSAKey != "undefined" && a instanceof RSAKey && (o === undefined || o == null) && a.isPrivate == true) {
        var t = p(a);
        var m = t.getEncodedHex();
        return v.ASN1Util.getPEMStringFromHex(m, "RSA PRIVATE KEY")
    }
    if (r == "PKCS1PRV" && typeof RSAKey != "undefined" && a instanceof KJUR.crypto.ECDSA && (o === undefined || o == null) && a.isPrivate == true) {
        var f = new KJUR.asn1.DERObjectIdentifier({
            name: a.curveName
        });
        var l = f.getEncodedHex();
        var e = q(a);
        var k = e.getEncodedHex();
        var i = "";
        i += v.ASN1Util.getPEMStringFromHex(l, "EC PARAMETERS");
        i += v.ASN1Util.getPEMStringFromHex(k, "EC PRIVATE KEY");
        return i
    }
    if (r == "PKCS1PRV" && typeof KJUR.crypto.DSA != "undefined" && a instanceof KJUR.crypto.DSA && (o === undefined || o == null) && a.isPrivate == true) {
        var t = n(a);
        var m = t.getEncodedHex();
        return v.ASN1Util.getPEMStringFromHex(m, "DSA PRIVATE KEY")
    }
    if (r == "PKCS5PRV" && typeof RSAKey != "undefined" && a instanceof RSAKey && (o !== undefined && o != null) && a.isPrivate == true) {
        var t = p(a);
        var m = t.getEncodedHex();
        if (g === undefined) {
            g = "DES-EDE3-CBC"
        }
        return this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", m, o, g)
    }
    if (r == "PKCS5PRV" && typeof KJUR.crypto.ECDSA != "undefined" && a instanceof KJUR.crypto.ECDSA && (o !== undefined && o != null) && a.isPrivate == true) {
        var t = q(a);
        var m = t.getEncodedHex();
        if (g === undefined) {
            g = "DES-EDE3-CBC"
        }
        return this.getEncryptedPKCS5PEMFromPrvKeyHex("EC", m, o, g)
    }
    if (r == "PKCS5PRV" && typeof KJUR.crypto.DSA != "undefined" && a instanceof KJUR.crypto.DSA && (o !== undefined && o != null) && a.isPrivate == true) {
        var t = n(a);
        var m = t.getEncodedHex();
        if (g === undefined) {
            g = "DES-EDE3-CBC"
        }
        return this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA", m, o, g)
    }
    var h = function(w, s) {
        var y = b(w, s);
        var x = new KJUR.asn1.ASN1Util.newObject({
            seq: [{
                seq: [{
                    oid: {
                        name: "pkcs5PBES2"
                    }
                },
                {
                    seq: [{
                        seq: [{
                            oid: {
                                name: "pkcs5PBKDF2"
                            }
                        },
                        {
                            seq: [{
                                octstr: {
                                    hex: y.pbkdf2Salt
                                }
                            },
                            {
                                "int": y.pbkdf2Iter
                            }]
                        }]
                    },
                    {
                        seq: [{
                            oid: {
                                name: "des-EDE3-CBC"
                            }
                        },
                        {
                            octstr: {
                                hex: y.encryptionSchemeIV
                            }
                        }]
                    }]
                }]
            },
            {
                octstr: {
                    hex: y.ciphertext
                }
            }]
        });
        return x.getEncodedHex()
    };
    var b = function(D, E) {
        var x = 100;
        var C = CryptoJS.lib.WordArray.random(8);
        var B = "DES-EDE3-CBC";
        var s = CryptoJS.lib.WordArray.random(8);
        var y = CryptoJS.PBKDF2(E, C, {
            keySize: 192 / 32,
            iterations: x
        });
        var z = CryptoJS.enc.Hex.parse(D);
        var A = CryptoJS.TripleDES.encrypt(z, y, {
            iv: s
        }) + "";
        var w = {};
        w.ciphertext = A;
        w.pbkdf2Salt = CryptoJS.enc.Hex.stringify(C);
        w.pbkdf2Iter = x;
        w.encryptionSchemeAlg = B;
        w.encryptionSchemeIV = CryptoJS.enc.Hex.stringify(s);
        return w
    };
    if (r == "PKCS8PRV" && typeof RSAKey != "undefined" && a instanceof RSAKey && a.isPrivate == true) {
        var d = p(a);
        var c = d.getEncodedHex();
        var t = KJUR.asn1.ASN1Util.newObject({
            seq: [{
                "int": 0
            },
            {
                seq: [{
                    oid: {
                        name: "rsaEncryption"
                    }
                },
                {
                    "null": true
                }]
            },
            {
                octstr: {
                    hex: c
                }
            }]
        });
        var m = t.getEncodedHex();
        if (o === undefined || o == null) {
            return v.ASN1Util.getPEMStringFromHex(m, "PRIVATE KEY")
        } else {
            var k = h(m, o);
            return v.ASN1Util.getPEMStringFromHex(k, "ENCRYPTED PRIVATE KEY")
        }
    }
    if (r == "PKCS8PRV" && typeof KJUR.crypto.ECDSA != "undefined" && a instanceof KJUR.crypto.ECDSA && a.isPrivate == true) {
        var d = new KJUR.asn1.ASN1Util.newObject({
            seq: [{
                "int": 1
            },
            {
                octstr: {
                    hex: a.prvKeyHex
                }
            },
            {
                tag: ["a1", true, {
                    bitstr: {
                        hex: "00" + a.pubKeyHex
                    }
                }]
            }]
        });
        var c = d.getEncodedHex();
        var t = KJUR.asn1.ASN1Util.newObject({
            seq: [{
                "int": 0
            },
            {
                seq: [{
                    oid: {
                        name: "ecPublicKey"
                    }
                },
                {
                    oid: {
                        name: a.curveName
                    }
                }]
            },
            {
                octstr: {
                    hex: c
                }
            }]
        });
        var m = t.getEncodedHex();
        if (o === undefined || o == null) {
            return v.ASN1Util.getPEMStringFromHex(m, "PRIVATE KEY")
        } else {
            var k = h(m, o);
            return v.ASN1Util.getPEMStringFromHex(k, "ENCRYPTED PRIVATE KEY")
        }
    }
    if (r == "PKCS8PRV" && typeof KJUR.crypto.DSA != "undefined" && a instanceof KJUR.crypto.DSA && a.isPrivate == true) {
        var d = new KJUR.asn1.DERInteger({
            bigint: a.x
        });
        var c = d.getEncodedHex();
        var t = KJUR.asn1.ASN1Util.newObject({
            seq: [{
                "int": 0
            },
            {
                seq: [{
                    oid: {
                        name: "dsa"
                    }
                },
                {
                    seq: [{
                        "int": {
                            bigint: a.p
                        }
                    },
                    {
                        "int": {
                            bigint: a.q
                        }
                    },
                    {
                        "int": {
                            bigint: a.g
                        }
                    }]
                }]
            },
            {
                octstr: {
                    hex: c
                }
            }]
        });
        var m = t.getEncodedHex();
        if (o === undefined || o == null) {
            return v.ASN1Util.getPEMStringFromHex(m, "PRIVATE KEY")
        } else {
            var k = h(m, o);
            return v.ASN1Util.getPEMStringFromHex(k, "ENCRYPTED PRIVATE KEY")
        }
    }
    throw "unsupported object nor format"
};
KEYUTIL.getKeyFromCSRPEM = function(b) {
    var a = ASN1HEX.pemToHex(b, "CERTIFICATE REQUEST");
    var c = KEYUTIL.getKeyFromCSRHex(a);
    return c
};
KEYUTIL.getKeyFromCSRHex = function(a) {
    var c = KEYUTIL.parseCSRHex(a);
    var b = KEYUTIL.getKey(c.p8pubkeyhex, null, "pkcs8pub");
    return b
};
KEYUTIL.parseCSRHex = function(c) {
    var b = {};
    var e = c;
    if (e.substr(0, 2) != "30") {
        throw "malformed CSR(code:001)"
    }
    var d = ASN1HEX.getPosArrayOfChildren_AtObj(e, 0);
    if (d.length < 1) {
        throw "malformed CSR(code:002)"
    }
    if (e.substr(d[0], 2) != "30") {
        throw "malformed CSR(code:003)"
    }
    var a = ASN1HEX.getPosArrayOfChildren_AtObj(e, d[0]);
    if (a.length < 3) {
        throw "malformed CSR(code:004)"
    }
    b.p8pubkeyhex = ASN1HEX.getHexOfTLV_AtObj(e, a[2]);
    return b
};
KEYUTIL.getJWKFromKey = function(d) {
    var b = {};
    if (d instanceof RSAKey && d.isPrivate) {
        b.kty = "RSA";
        b.n = hextob64u(d.n.toString(16));
        b.e = hextob64u(d.e.toString(16));
        b.d = hextob64u(d.d.toString(16));
        b.p = hextob64u(d.p.toString(16));
        b.q = hextob64u(d.q.toString(16));
        b.dp = hextob64u(d.dmp1.toString(16));
        b.dq = hextob64u(d.dmq1.toString(16));
        b.qi = hextob64u(d.coeff.toString(16));
        return b
    } else {
        if (d instanceof RSAKey && d.isPublic) {
            b.kty = "RSA";
            b.n = hextob64u(d.n.toString(16));
            b.e = hextob64u(d.e.toString(16));
            return b
        } else {
            if (d instanceof KJUR.crypto.ECDSA && d.isPrivate) {
                var a = d.getShortNISTPCurveName();
                if (a !== "P-256" && a !== "P-384") {
                    throw "unsupported curve name for JWT: " + a
                }
                var c = d.getPublicKeyXYHex();
                b.kty = "EC";
                b.crv = a;
                b.x = hextob64u(c.x);
                b.y = hextob64u(c.y);
                b.d = hextob64u(d.prvKeyHex);
                return b
            } else {
                if (d instanceof KJUR.crypto.ECDSA && d.isPublic) {
                    var a = d.getShortNISTPCurveName();
                    if (a !== "P-256" && a !== "P-384") {
                        throw "unsupported curve name for JWT: " + a
                    }
                    var c = d.getPublicKeyXYHex();
                    b.kty = "EC";
                    b.crv = a;
                    b.x = hextob64u(c.x);
                    b.y = hextob64u(c.y);
                    return b
                }
            }
        }
    }
    throw "not supported key object"
};
/*! rsapem-1.2.0.js (c) 2012-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
RSAKey.pemToBase64 = function(b) {
    var a = b;
    a = a.replace("-----BEGIN RSA PRIVATE KEY-----", "");
    a = a.replace("-----END RSA PRIVATE KEY-----", "");
    a = a.replace(/[ \n]+/g, "");
    return a
};
RSAKey.getPosArrayOfChildrenFromHex = function(g) {
    var j = new Array();
    var i = ASN1HEX.getStartPosOfV_AtObj(g, 0);
    var b = ASN1HEX.getPosOfNextSibling_AtObj(g, i);
    var e = ASN1HEX.getPosOfNextSibling_AtObj(g, b);
    var f = ASN1HEX.getPosOfNextSibling_AtObj(g, e);
    var l = ASN1HEX.getPosOfNextSibling_AtObj(g, f);
    var k = ASN1HEX.getPosOfNextSibling_AtObj(g, l);
    var d = ASN1HEX.getPosOfNextSibling_AtObj(g, k);
    var c = ASN1HEX.getPosOfNextSibling_AtObj(g, d);
    var h = ASN1HEX.getPosOfNextSibling_AtObj(g, c);
    j.push(i, b, e, f, l, k, d, c, h);
    return j
};
RSAKey.getHexValueArrayOfChildrenFromHex = function(f) {
    var l = RSAKey.getPosArrayOfChildrenFromHex(f);
    var e = ASN1HEX.getHexOfV_AtObj(f, l[0]);
    var j = ASN1HEX.getHexOfV_AtObj(f, l[1]);
    var b = ASN1HEX.getHexOfV_AtObj(f, l[2]);
    var c = ASN1HEX.getHexOfV_AtObj(f, l[3]);
    var h = ASN1HEX.getHexOfV_AtObj(f, l[4]);
    var g = ASN1HEX.getHexOfV_AtObj(f, l[5]);
    var m = ASN1HEX.getHexOfV_AtObj(f, l[6]);
    var k = ASN1HEX.getHexOfV_AtObj(f, l[7]);
    var d = ASN1HEX.getHexOfV_AtObj(f, l[8]);
    var i = new Array();
    i.push(e, j, b, c, h, g, m, k, d);
    return i
};
RSAKey.prototype.readPrivateKeyFromPEMString = function(e) {
    var c = RSAKey.pemToBase64(e);
    var d = b64tohex(c);
    var b = RSAKey.getHexValueArrayOfChildrenFromHex(d);
    this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8])
};
RSAKey.prototype.readPrivateKeyFromASN1HexString = function(a) {
    this.readPKCS5PrvKeyHex(a)
};
RSAKey.prototype.readPKCS5PrvKeyHex = function(c) {
    var b = RSAKey.getHexValueArrayOfChildrenFromHex(c);
    this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8])
};
RSAKey.prototype.readPKCS8PrvKeyHex = function(e) {
    var c, j, l, b, a, f, d, k;
    var m = ASN1HEX;
    var g = m.getVbyList;
    if (m.isASN1HEX(e) === false) {
        throw "not ASN.1 hex string"
    }
    try {
        c = g(e, 0, [2, 0, 1], "02");
        j = g(e, 0, [2, 0, 2], "02");
        l = g(e, 0, [2, 0, 3], "02");
        b = g(e, 0, [2, 0, 4], "02");
        a = g(e, 0, [2, 0, 5], "02");
        f = g(e, 0, [2, 0, 6], "02");
        d = g(e, 0, [2, 0, 7], "02");
        k = g(e, 0, [2, 0, 8], "02")
    } catch(i) {
        throw "malformed PKCS#8 plain RSA private key"
    }
    this.setPrivateEx(c, j, l, b, a, f, d, k)
};
RSAKey.prototype.readPKCS5PubKeyHex = function(b) {
    if (ASN1HEX.isASN1HEX(b) === false) {
        throw "keyHex is not ASN.1 hex string"
    }
    var a = ASN1HEX.getPosArrayOfChildren_AtObj(b, 0);
    if (a.length !== 2 || b.substr(a[0], 2) !== "02" || b.substr(a[1], 2) !== "02") {
        throw "wrong hex for PKCS#5 public key"
    }
    var d = ASN1HEX.getHexOfV_AtObj(b, a[0]);
    var c = ASN1HEX.getHexOfV_AtObj(b, a[1]);
    this.setPublic(d, c)
};
RSAKey.prototype.readPKCS8PubKeyHex = function(b) {
    if (ASN1HEX.isASN1HEX(b) === false) {
        throw "not ASN.1 hex string"
    }
    if (ASN1HEX.getDecendantHexTLVByNthList(b, 0, [0, 0]) !== "06092a864886f70d010101") {
        throw "not PKCS8 RSA public key"
    }
    var a = ASN1HEX.getDecendantHexTLVByNthList(b, 0, [1, 0]);
    this.readPKCS5PubKeyHex(a)
};
RSAKey.prototype.readCertPubKeyHex = function(b, c) {
    if (c !== 5) {
        c = 6
    }
    if (ASN1HEX.isASN1HEX(b) === false) {
        throw "not ASN.1 hex string"
    }
    var a = ASN1HEX.getDecendantHexTLVByNthList(b, 0, [0, c]);
    this.readPKCS8PubKeyHex(a)
};
/*! rsasign-1.2.7.js (c) 2012 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
var _RE_HEXDECONLY = new RegExp("");
_RE_HEXDECONLY.compile("[^0-9a-f]", "gi");
function _rsasign_getHexPaddedDigestInfoForString(d, e, a) {
    var b = function(f) {
        return KJUR.crypto.Util.hashString(f, a)
    };
    var c = b(d);
    return KJUR.crypto.Util.getPaddedDigestInfoHex(c, a, e)
}
function _zeroPaddingOfSignature(e, d) {
    var c = "";
    var a = d / 4 - e.length;
    for (var b = 0; b < a; b++) {
        c = c + "0"
    }
    return c + e
}
function _rsasign_signString(d, a) {
  
    var b = function(e) {
        return KJUR.crypto.Util.hashString(e, a)
    };
    var c = b(d);
    return this.signWithMessageHash(c, a)
}
function _rsasign_signWithMessageHash(e, c) {
    var f = KJUR.crypto.Util.getPaddedDigestInfoHex(e, c, this.n.bitLength());
    var b = parseBigInt(f, 16);
    var d = this.doPrivate(b);
    var a = d.toString(16);
    return _zeroPaddingOfSignature(a, this.n.bitLength())
}
function _rsasign_signStringWithSHA1(a) {
    return _rsasign_signString.call(this, a, "sha1")
}
function _rsasign_signStringWithSHA256(a) {
    return _rsasign_signString.call(this, a, "sha256")
}
function pss_mgf1_str(c, a, e) {
    var b = "",
    d = 0;
    while (b.length < a) {
        b += hextorstr(e(rstrtohex(c + String.fromCharCode.apply(String, [(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255]))));
        d += 1
    }
    return b
}
function _rsasign_signStringPSS(e, a, d) {
    var c = function(f) {
        return KJUR.crypto.Util.hashHex(f, a)
    };
    var b = c(rstrtohex(e));
    if (d === undefined) {
        d = -1
    }
    return this.signWithMessageHashPSS(b, a, d)
}
function _rsasign_signWithMessageHashPSS(l, a, k) {
    var b = hextorstr(l);
    var g = b.length;
    var m = this.n.bitLength() - 1;
    var c = Math.ceil(m / 8);
    var d;
    var o = function(i) {
        return KJUR.crypto.Util.hashHex(i, a)
    };
    if (k === -1 || k === undefined) {
        k = g
    } else {
        if (k === -2) {
            k = c - g - 2
        } else {
            if (k < -2) {
                throw "invalid salt length"
            }
        }
    }
    if (c < (g + k + 2)) {
        throw "data too long"
    }
    var f = "";
    if (k > 0) {
        f = new Array(k);
        new SecureRandom().nextBytes(f);
        f = String.fromCharCode.apply(String, f)
    }
    var n = hextorstr(o(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + b + f)));
    var j = [];
    for (d = 0; d < c - k - g - 2; d += 1) {
        j[d] = 0
    }
    var e = String.fromCharCode.apply(String, j) + "\x01" + f;
    var h = pss_mgf1_str(n, e.length, o);
    var q = [];
    for (d = 0; d < e.length; d += 1) {
        q[d] = e.charCodeAt(d) ^ h.charCodeAt(d)
    }
    var p = (65280 >> (8 * c - m)) & 255;
    q[0] &= ~p;
    for (d = 0; d < g; d++) {
        q.push(n.charCodeAt(d))
    }
    q.push(188);
    return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(q)).toString(16), this.n.bitLength())
}
function _rsasign_getDecryptSignatureBI(a, d, c) {
    var b = new RSAKey();
    b.setPublic(d, c);
    var e = b.doPublic(a);
    return e
}
function _rsasign_getHexDigestInfoFromSig(a, c, b) {
    var e = _rsasign_getDecryptSignatureBI(a, c, b);
    var d = e.toString(16).replace(/^1f+00/, "");
    return d
}
function _rsasign_getAlgNameAndHashFromHexDisgestInfo(f) {
    for (var e in KJUR.crypto.Util.DIGESTINFOHEAD) {
        var d = KJUR.crypto.Util.DIGESTINFOHEAD[e];
        var b = d.length;
        if (f.substring(0, b) == d) {
            var c = [e, f.substring(b)];
            return c
        }
    }
    return []
}
function _rsasign_verifySignatureWithArgs(f, b, g, j) {
    var e = _rsasign_getHexDigestInfoFromSig(b, g, j);
    var h = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
    if (h.length == 0) {
        return false
    }
    var d = h[0];
    var i = h[1];
    var a = function(k) {
        return KJUR.crypto.Util.hashString(k, d)
    };
    var c = a(f);
    return (i == c)
}
function _rsasign_verifyHexSignatureForMessage(c, b) {
    var d = parseBigInt(c, 16);
    var a = _rsasign_verifySignatureWithArgs(b, d, this.n.toString(16), this.e.toString(16));
    return a
}
function _rsasign_verifyString(f, j) {
    j = j.replace(_RE_HEXDECONLY, "");
    j = j.replace(/[ \n]+/g, "");
    var b = parseBigInt(j, 16);
    if (b.bitLength() > this.n.bitLength()) {
        return 0
    }
    var i = this.doPublic(b);
    var e = i.toString(16).replace(/^1f+00/, "");
    var g = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
    if (g.length == 0) {
        return false
    }
    var d = g[0];
    var h = g[1];
    var a = function(k) {
        return KJUR.crypto.Util.hashString(k, d)
    };
    var c = a(f);
    return (h == c)
}
function _rsasign_verifyWithMessageHash(e, a) {
    a = a.replace(_RE_HEXDECONLY, "");
    a = a.replace(/[ \n]+/g, "");
    var b = parseBigInt(a, 16);
    if (b.bitLength() > this.n.bitLength()) {
        return 0
    }
    var h = this.doPublic(b);
    var g = h.toString(16).replace(/^1f+00/, "");
    var c = _rsasign_getAlgNameAndHashFromHexDisgestInfo(g);
    if (c.length == 0) {
        return false
    }
    var d = c[0];
    var f = c[1];
    return (f == e)
}
function _rsasign_verifyStringPSS(c, b, a, f) {
    var e = function(g) {
        return KJUR.crypto.Util.hashHex(g, a)
    };
    var d = e(rstrtohex(c));
    if (f === undefined) {
        f = -1
    }
    return this.verifyWithMessageHashPSS(d, b, a, f)
}
function _rsasign_verifyWithMessageHashPSS(f, s, l, c) {
    var k = new BigInteger(s, 16);
    if (k.bitLength() > this.n.bitLength()) {
        return false
    }
    var r = function(i) {
        return KJUR.crypto.Util.hashHex(i, l)
    };
    var j = hextorstr(f);
    var h = j.length;
    var g = this.n.bitLength() - 1;
    var m = Math.ceil(g / 8);
    var q;
    if (c === -1 || c === undefined) {
        c = h
    } else {
        if (c === -2) {
            c = m - h - 2
        } else {
            if (c < -2) {
                throw "invalid salt length"
            }
        }
    }
    if (m < (h + c + 2)) {
        throw "data too long"
    }
    var a = this.doPublic(k).toByteArray();
    for (q = 0; q < a.length; q += 1) {
        a[q] &= 255
    }
    while (a.length < m) {
        a.unshift(0)
    }
    if (a[m - 1] !== 188) {
        throw "encoded message does not end in 0xbc"
    }
    a = String.fromCharCode.apply(String, a);
    var d = a.substr(0, m - h - 1);
    var e = a.substr(d.length, h);
    var p = (65280 >> (8 * m - g)) & 255;
    if ((d.charCodeAt(0) & p) !== 0) {
        throw "bits beyond keysize not zero"
    }
    var n = pss_mgf1_str(e, d.length, r);
    var o = [];
    for (q = 0; q < d.length; q += 1) {
        o[q] = d.charCodeAt(q) ^ n.charCodeAt(q)
    }
    o[0] &= ~p;
    var b = m - h - c - 2;
    for (q = 0; q < b; q += 1) {
        if (o[q] !== 0) {
            throw "leftmost octets not zero"
        }
    }
    if (o[b] !== 1) {
        throw "0x01 marker not found"
    }
    return e === hextorstr(r(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + j + String.fromCharCode.apply(String, o.slice( - c)))))
}
RSAKey.prototype.signWithMessageHash = _rsasign_signWithMessageHash;
RSAKey.prototype.signString = _rsasign_signString;
RSAKey.prototype.signStringWithSHA1 = _rsasign_signStringWithSHA1;
RSAKey.prototype.signStringWithSHA256 = _rsasign_signStringWithSHA256;
RSAKey.prototype.sign = _rsasign_signString;
RSAKey.prototype.signWithSHA1 = _rsasign_signStringWithSHA1;
RSAKey.prototype.signWithSHA256 = _rsasign_signStringWithSHA256;
RSAKey.prototype.signWithMessageHashPSS = _rsasign_signWithMessageHashPSS;
RSAKey.prototype.signStringPSS = _rsasign_signStringPSS;
RSAKey.prototype.signPSS = _rsasign_signStringPSS;
RSAKey.SALT_LEN_HLEN = -1;
RSAKey.SALT_LEN_MAX = -2;
RSAKey.prototype.verifyWithMessageHash = _rsasign_verifyWithMessageHash;
RSAKey.prototype.verifyString = _rsasign_verifyString;
RSAKey.prototype.verifyHexSignatureForMessage = _rsasign_verifyHexSignatureForMessage;
RSAKey.prototype.verify = _rsasign_verifyString;
RSAKey.prototype.verifyHexSignatureForByteArrayMessage = _rsasign_verifyHexSignatureForMessage;
RSAKey.prototype.verifyWithMessageHashPSS = _rsasign_verifyWithMessageHashPSS;
RSAKey.prototype.verifyStringPSS = _rsasign_verifyStringPSS;
RSAKey.prototype.verifyPSS = _rsasign_verifyStringPSS;
RSAKey.SALT_LEN_RECOVER = -2;
/*! x509-1.1.12.js (c) 2012-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
function X509() {
    this.subjectPublicKeyRSA = null;
    this.subjectPublicKeyRSA_hN = null;
    this.subjectPublicKeyRSA_hE = null;
    this.hex = null;
    this.getSerialNumberHex = function() {
        return ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 1])
    };
    this.getSignatureAlgorithmField = function() {
        var b = ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 2, 0]);
        var a = KJUR.asn1.ASN1Util.oidHexToInt(b);
        var c = KJUR.asn1.x509.OID.oid2name(a);
        return c
    };
    this.getIssuerHex = function() {
        return ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 3])
    };
    this.getIssuerString = function() {
        return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 3]))
    };
    this.getSubjectHex = function() {
        return ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 5])
    };
    this.getSubjectString = function() {
        return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 5]))
    };
    this.getNotBefore = function() {
        var a = ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 4, 0]);
        a = a.replace(/(..)/g, "%$1");
        a = decodeURIComponent(a);
        return a
    };
    this.getNotAfter = function() {
        var a = ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 4, 1]);
        a = a.replace(/(..)/g, "%$1");
        a = decodeURIComponent(a);
        return a
    };
    this.readCertPEM = function(c) {
        var e = ASN1HEX.pemToHex(c);
        var b = X509.getPublicKeyHexArrayFromCertHex(e);
        var d = new RSAKey();
        d.setPublic(b[0], b[1]);
        this.subjectPublicKeyRSA = d;
        this.subjectPublicKeyRSA_hN = b[0];
        this.subjectPublicKeyRSA_hE = b[1];
        this.hex = e
    };
    this.readCertPEMWithoutRSAInit = function(c) {
        var d = ASN1HEX.pemToHex(c);
        var b = X509.getPublicKeyHexArrayFromCertHex(d);
        if (typeof this.subjectPublicKeyRSA.setPublic === "function") {
            this.subjectPublicKeyRSA.setPublic(b[0], b[1])
        }
        this.subjectPublicKeyRSA_hN = b[0];
        this.subjectPublicKeyRSA_hE = b[1];
        this.hex = d
    };
    this.getInfo = function() {
        var p = "Basic Fields\n";
        p += "  serial number: " + this.getSerialNumberHex() + "\n";
        p += "  signature algorithm: " + this.getSignatureAlgorithmField() + "\n";
        p += "  issuer: " + this.getIssuerString() + "\n";
        p += "  notBefore: " + this.getNotBefore() + "\n";
        p += "  notAfter: " + this.getNotAfter() + "\n";
        p += "  subject: " + this.getSubjectString() + "\n";
        p += "  subject public key info: \n";
        var j = X509.getSubjectPublicKeyInfoPosFromCertHex(this.hex);
        var d = ASN1HEX.getHexOfTLV_AtObj(this.hex, j);
        var n = KEYUTIL.getKey(d, null, "pkcs8pub");
        if (n instanceof RSAKey) {
            p += "    key algorithm: RSA\n";
            p += "    n=" + n.n.toString(16).substr(0, 16) + "...\n";
            p += "    e=" + n.e.toString(16) + "\n"
        }
        p += "X509v3 Extensions:\n";
        var m = X509.getV3ExtInfoListOfCertHex(this.hex);
        for (var e = 0; e < m.length; e++) {
            var b = m[e];
            var o = KJUR.asn1.x509.OID.oid2name(b.oid);
            if (o === "") {
                o = b.oid
            }
            var k = "";
            if (b.critical === true) {
                k = "CRITICAL"
            }
            p += "  " + o + " " + k + ":\n";
            if (o === "basicConstraints") {
                var g = X509.getExtBasicConstraints(this.hex);
                if (g.cA === undefined) {
                    p += "    {}\n"
                } else {
                    p += "    cA=true";
                    if (g.pathLen !== undefined) {
                        p += ", pathLen=" + g.pathLen
                    }
                    p += "\n"
                }
            } else {
                if (o === "keyUsage") {
                    p += "    " + X509.getExtKeyUsageString(this.hex) + "\n"
                } else {
                    if (o === "subjectKeyIdentifier") {
                        p += "    " + X509.getExtSubjectKeyIdentifier(this.hex) + "\n"
                    } else {
                        if (o === "authorityKeyIdentifier") {
                            var a = X509.getExtAuthorityKeyIdentifier(this.hex);
                            if (a.kid !== undefined) {
                                p += "    kid=" + a.kid + "\n"
                            }
                        } else {
                            if (o === "extKeyUsage") {
                                var h = X509.getExtExtKeyUsageName(this.hex);
                                p += "    " + h.join(", ") + "\n"
                            } else {
                                if (o === "subjectAltName") {
                                    var f = X509.getExtSubjectAltName(this.hex);
                                    p += "    " + f.join(", ") + "\n"
                                } else {
                                    if (o === "cRLDistributionPoints") {
                                        var l = X509.getExtCRLDistributionPointsURI(this.hex);
                                        p += "    " + l + "\n"
                                    } else {
                                        if (o === "authorityInfoAccess") {
                                            var c = X509.getExtAIAInfo(this.hex);
                                            if (c.ocsp !== undefined) {
                                                p += "    ocsp: " + c.ocsp.join(",") + "\n"
                                            }
                                            if (c.caissuer !== undefined) {
                                                p += "    caissuer: " + c.caissuer.join(",") + "\n"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        p += "signature algorithm: " + X509.getSignatureAlgorithmName(this.hex) + "\n";
        p += "signature: " + X509.getSignatureValueHex(this.hex).substr(0, 16) + "...\n";
        return p
    }
}
X509.pemToBase64 = function(a) {
    var b = a;
    b = b.replace("-----BEGIN CERTIFICATE-----", "");
    b = b.replace("-----END CERTIFICATE-----", "");
    b = b.replace(/[ \n]+/g, "");
    return b
};
X509.pemToHex = function(a) {
    return ASN1HEX.pemToHex(a)
};
X509.getSubjectPublicKeyPosFromCertHex = function(f) {
    var e = X509.getSubjectPublicKeyInfoPosFromCertHex(f);
    if (e == -1) {
        return - 1
    }
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(f, e);
    if (b.length != 2) {
        return - 1
    }
    var d = b[1];
    if (f.substring(d, d + 2) != "03") {
        return - 1
    }
    var c = ASN1HEX.getStartPosOfV_AtObj(f, d);
    if (f.substring(c, c + 2) != "00") {
        return - 1
    }
    return c + 2
};
X509.getSubjectPublicKeyInfoPosFromCertHex = function(d) {
    var c = ASN1HEX.getStartPosOfV_AtObj(d, 0);
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(d, c);
    if (b.length < 1) {
        return - 1
    }
    if (d.substring(b[0], b[0] + 10) == "a003020102") {
        if (b.length < 6) {
            return - 1
        }
        return b[6]
    } else {
        if (b.length < 5) {
            return - 1
        }
        return b[5]
    }
};
X509.getPublicKeyHexArrayFromCertHex = function(f) {
    var e = X509.getSubjectPublicKeyPosFromCertHex(f);
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(f, e);
    if (b.length != 2) {
        return []
    }
    var d = ASN1HEX.getHexOfV_AtObj(f, b[0]);
    var c = ASN1HEX.getHexOfV_AtObj(f, b[1]);
    if (d != null && c != null) {
        return [d, c]
    } else {
        return []
    }
};
X509.getHexTbsCertificateFromCert = function(b) {
    var a = ASN1HEX.getStartPosOfV_AtObj(b, 0);
    return a
};
X509.getPublicKeyHexArrayFromCertPEM = function(c) {
    var d = ASN1HEX.pemToHex(c);
    var b = X509.getPublicKeyHexArrayFromCertHex(d);
    return b
};
X509.hex2dn = function(f, b) {
    if (b === undefined) {
        b = 0
    }
    if (f.substr(b, 2) !== "30") {
        throw "malformed DN"
    }
    var c = new Array();
    var d = ASN1HEX.getPosArrayOfChildren_AtObj(f, b);
    for (var e = 0; e < d.length; e++) {
        c.push(X509.hex2rdn(f, d[e]))
    }
    c = c.map(function(a) {
        return a.replace("/", "\\/")
    });
    return "/" + c.join("/")
};
X509.hex2rdn = function(f, b) {
    if (b === undefined) {
        b = 0
    }
    if (f.substr(b, 2) !== "31") {
        throw "malformed RDN"
    }
    var c = new Array();
    var d = ASN1HEX.getPosArrayOfChildren_AtObj(f, b);
    for (var e = 0; e < d.length; e++) {
        c.push(X509.hex2attrTypeValue(f, d[e]))
    }
    c = c.map(function(a) {
        return a.replace("+", "\\+")
    });
    return c.join("+")
};
X509.hex2attrTypeValue = function(g, b) {
    if (b === undefined) {
        b = 0
    }
    if (g.substr(b, 2) !== "30") {
        throw "malformed attribute type and value"
    }
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(g, b);
    if (c.length !== 2 || g.substr(c[0], 2) !== "06") {
        "malformed attribute type and value"
    }
    var d = ASN1HEX.getHexOfV_AtObj(g, c[0]);
    var h = KJUR.asn1.ASN1Util.oidHexToInt(d);
    var f = KJUR.asn1.x509.OID.oid2atype(h);
    var a = ASN1HEX.getHexOfV_AtObj(g, c[1]);
    var e = hextorstr(a);
    return f + "=" + e
};
X509.getPublicKeyFromCertHex = function(c) {
    var a, e, b;
    var g = 6;
    var d = ASN1HEX;
    var f = d.getVbyList;
    b = d.getDecendantHexTLVByNthList(c, 0, [0, 0]);
    if (b !== "a003020102") {
        g = 5
    }
    e = f(c, 0, [0, g, 0, 0], "06");
    if (e === "2a864886f70d010101") {
        a = new RSAKey()
    } else {
        if (e === "2a8648ce380401") {
            a = new KJUR.crypto.DSA()
        } else {
            if (e === "2a8648ce3d0201") {
                a = new KJUR.crypto.ECDSA()
            } else {
                throw "unsupported public key in X.509 cert"
            }
        }
    }
    a.readCertPubKeyHex(c, g);
    return a
};
X509.getPublicKeyFromCertPEM = function(a) {
    var c = ASN1HEX;
    var b = c.pemToHex(a);
    return X509.getPublicKeyFromCertHex(b)
};
X509.getPublicKeyInfoPropOfCertPEM = function(e) {
    var i = {};
    i.algparam = null;
    var f = ASN1HEX.pemToHex(e);
    var d = ASN1HEX.getPosArrayOfChildren_AtObj(f, 0);
    if (d.length != 3) {
        throw "malformed X.509 certificate PEM (code:001)"
    }
    if (f.substr(d[0], 2) != "30") {
        throw "malformed X.509 certificate PEM (code:002)"
    }
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(f, d[0]);
    var g = 6;
    if (f.substr(c[0], 2) !== "a0") {
        g = 5
    }
    if (c.length < g + 1) {
        throw "malformed X.509 certificate PEM (code:003)"
    }
    var a = ASN1HEX.getPosArrayOfChildren_AtObj(f, c[g]);
    if (a.length != 2) {
        throw "malformed X.509 certificate PEM (code:004)"
    }
    var h = ASN1HEX.getPosArrayOfChildren_AtObj(f, a[0]);
    if (h.length != 2) {
        throw "malformed X.509 certificate PEM (code:005)"
    }
    i.algoid = ASN1HEX.getHexOfV_AtObj(f, h[0]);
    if (f.substr(h[1], 2) == "06") {
        i.algparam = ASN1HEX.getHexOfV_AtObj(f, h[1])
    } else {
        if (f.substr(h[1], 2) == "30") {
            i.algparam = ASN1HEX.getHexOfTLV_AtObj(f, h[1])
        }
    }
    if (f.substr(a[1], 2) != "03") {
        throw "malformed X.509 certificate PEM (code:006)"
    }
    var b = ASN1HEX.getHexOfV_AtObj(f, a[1]);
    i.keyhex = b.substr(2);
    return i
};
X509.getPublicKeyInfoPosOfCertHEX = function(c) {
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(c, 0);
    if (b.length != 3) {
        throw "malformed X.509 certificate PEM (code:001)"
    }
    if (c.substr(b[0], 2) != "30") {
        throw "malformed X.509 certificate PEM (code:002)"
    }
    var a = ASN1HEX.getPosArrayOfChildren_AtObj(c, b[0]);
    if (a.length < 7) {
        throw "malformed X.509 certificate PEM (code:003)"
    }
    return a[6]
};
X509.getV3ExtInfoListOfCertHex = function(g) {
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(g, 0);
    if (b.length != 3) {
        throw "malformed X.509 certificate PEM (code:001)"
    }
    if (g.substr(b[0], 2) != "30") {
        throw "malformed X.509 certificate PEM (code:002)"
    }
    var a = ASN1HEX.getPosArrayOfChildren_AtObj(g, b[0]);
    if (a.length < 8) {
        throw "malformed X.509 certificate PEM (code:003)"
    }
    if (g.substr(a[7], 2) != "a3") {
        throw "malformed X.509 certificate PEM (code:004)"
    }
    var h = ASN1HEX.getPosArrayOfChildren_AtObj(g, a[7]);
    if (h.length != 1) {
        throw "malformed X.509 certificate PEM (code:005)"
    }
    if (g.substr(h[0], 2) != "30") {
        throw "malformed X.509 certificate PEM (code:006)"
    }
    var f = ASN1HEX.getPosArrayOfChildren_AtObj(g, h[0]);
    var e = f.length;
    var d = new Array(e);
    for (var c = 0; c < e; c++) {
        d[c] = X509.getV3ExtItemInfo_AtObj(g, f[c])
    }
    return d
};
X509.getV3ExtItemInfo_AtObj = function(f, g) {
    var e = {};
    e.posTLV = g;
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(f, g);
    if (b.length != 2 && b.length != 3) {
        throw "malformed X.509v3 Ext (code:001)"
    }
    if (f.substr(b[0], 2) != "06") {
        throw "malformed X.509v3 Ext (code:002)"
    }
    var d = ASN1HEX.getHexOfV_AtObj(f, b[0]);
    e.oid = ASN1HEX.hextooidstr(d);
    e.critical = false;
    if (b.length == 3) {
        e.critical = true
    }
    var c = b[b.length - 1];
    if (f.substr(c, 2) != "04") {
        throw "malformed X.509v3 Ext (code:003)"
    }
    e.posV = ASN1HEX.getStartPosOfV_AtObj(f, c);
    return e
};
X509.getHexOfTLV_V3ExtValue = function(b, a) {
    var c = X509.getPosOfTLV_V3ExtValue(b, a);
    if (c == -1) {
        return null
    }
    return ASN1HEX.getHexOfTLV_AtObj(b, c)
};
X509.getHexOfV_V3ExtValue = function(b, a) {
    var c = X509.getPosOfTLV_V3ExtValue(b, a);
    if (c == -1) {
        return null
    }
    return ASN1HEX.getHexOfV_AtObj(b, c)
};
X509.getPosOfTLV_V3ExtValue = function(f, b) {
    var d = b;
    if (!b.match(/^[0-9.]+$/)) {
        d = KJUR.asn1.x509.OID.name2oid(b)
    }
    if (d == "") {
        return - 1
    }
    var c = X509.getV3ExtInfoListOfCertHex(f);
    for (var a = 0; a < c.length; a++) {
        var e = c[a];
        if (e.oid == d) {
            return e.posV
        }
    }
    return - 1
};
X509.getExtBasicConstraints = function(d) {
    var a = X509.getHexOfV_V3ExtValue(d, "basicConstraints");
    if (a === null) {
        return null
    }
    if (a === "") {
        return {}
    }
    if (a === "0101ff") {
        return {
            cA: true
        }
    }
    if (a.substr(0, 8) === "0101ff02") {
        var c = ASN1HEX.getHexOfV_AtObj(a, 6);
        var b = parseInt(c, 16);
        return {
            cA: true,
            pathLen: b
        }
    }
    throw "unknown error"
};
X509.KEYUSAGE_NAME = ["digitalSignature", "nonRepudiation", "keyEncipherment", "dataEncipherment", "keyAgreement", "keyCertSign", "cRLSign", "encipherOnly", "decipherOnly"];
X509.getExtKeyUsageBin = function(d) {
    var b = X509.getHexOfV_V3ExtValue(d, "keyUsage");
    if (b == "") {
        return ""
    }
    if (b.length % 2 != 0 || b.length <= 2) {
        throw "malformed key usage value"
    }
    var a = parseInt(b.substr(0, 2));
    var c = parseInt(b.substr(2), 16).toString(2);
    return c.substr(0, c.length - a)
};
X509.getExtKeyUsageString = function(e) {
    var d = X509.getExtKeyUsageBin(e);
    var b = new Array();
    for (var c = 0; c < d.length; c++) {
        if (d.substr(c, 1) == "1") {
            b.push(X509.KEYUSAGE_NAME[c])
        }
    }
    return b.join(",")
};
X509.getExtSubjectKeyIdentifier = function(b) {
    var a = X509.getHexOfV_V3ExtValue(b, "subjectKeyIdentifier");
    return a
};
X509.getExtAuthorityKeyIdentifier = function(f) {
    var b = {};
    var e = X509.getHexOfTLV_V3ExtValue(f, "authorityKeyIdentifier");
    if (e === null) {
        return null
    }
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(e, 0);
    for (var d = 0; d < c.length; d++) {
        if (e.substr(c[d], 2) === "80") {
            b.kid = ASN1HEX.getHexOfV_AtObj(e, c[d])
        }
    }
    return b
};
X509.getExtExtKeyUsageName = function(k) {
    var b = new Array();
    var f = X509.getHexOfTLV_V3ExtValue(k, "extKeyUsage");
    if (f === null) {
        return null
    }
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(f, 0);
    for (var e = 0; e < c.length; e++) {
        var j = ASN1HEX.getHexOfV_AtObj(f, c[e]);
        var g = KJUR.asn1.ASN1Util.oidHexToInt(j);
        var d = KJUR.asn1.x509.OID.oid2name(g);
        b.push(d)
    }
    return b
};
X509.getExtSubjectAltName = function(g) {
    var b = new Array();
    var f = X509.getHexOfTLV_V3ExtValue(g, "subjectAltName");
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(f, 0);
    for (var e = 0; e < c.length; e++) {
        if (f.substr(c[e], 2) === "82") {
            var d = hextoutf8(ASN1HEX.getHexOfV_AtObj(f, c[e]));
            b.push(d)
        }
    }
    return b
};
X509.getExtCRLDistributionPointsURI = function(n) {
    var p = new Array();
    var k = X509.getHexOfTLV_V3ExtValue(n, "cRLDistributionPoints");
    var o = ASN1HEX.getPosArrayOfChildren_AtObj(k, 0);
    for (var g = 0; g < o.length; g++) {
        var l = ASN1HEX.getHexOfTLV_AtObj(k, o[g]);
        var b = ASN1HEX.getPosArrayOfChildren_AtObj(l, 0);
        for (var e = 0; e < b.length; e++) {
            if (l.substr(b[e], 2) === "a0") {
                var f = ASN1HEX.getHexOfV_AtObj(l, b[e]);
                if (f.substr(0, 2) === "a0") {
                    var c = ASN1HEX.getHexOfV_AtObj(f, 0);
                    if (c.substr(0, 2) === "86") {
                        var m = ASN1HEX.getHexOfV_AtObj(c, 0);
                        var d = hextoutf8(m);
                        p.push(d)
                    }
                }
            }
        }
    }
    return p
};
X509.getExtAIAInfo = function(g) {
    var j = {};
    j.ocsp = [];
    j.caissuer = [];
    var h = X509.getPosOfTLV_V3ExtValue(g, "authorityInfoAccess");
    if (h == -1) {
        return null
    }
    if (g.substr(h, 2) != "30") {
        throw "malformed AIA Extn Value"
    }
    var d = ASN1HEX.getPosArrayOfChildren_AtObj(g, h);
    for (var c = 0; c < d.length; c++) {
        var a = d[c];
        var b = ASN1HEX.getPosArrayOfChildren_AtObj(g, a);
        if (b.length != 2) {
            throw "malformed AccessDescription of AIA Extn"
        }
        var e = b[0];
        var f = b[1];
        if (ASN1HEX.getHexOfV_AtObj(g, e) == "2b06010505073001") {
            if (g.substr(f, 2) == "86") {
                j.ocsp.push(hextoutf8(ASN1HEX.getHexOfV_AtObj(g, f)))
            }
        }
        if (ASN1HEX.getHexOfV_AtObj(g, e) == "2b06010505073002") {
            if (g.substr(f, 2) == "86") {
                j.caissuer.push(hextoutf8(ASN1HEX.getHexOfV_AtObj(g, f)))
            }
        }
    }
    return j
};
X509.getSignatureAlgorithmName = function(d) {
    var b = ASN1HEX.getDecendantHexVByNthList(d, 0, [1, 0]);
    var a = KJUR.asn1.ASN1Util.oidHexToInt(b);
    var c = KJUR.asn1.x509.OID.oid2name(a);
    return c
};
X509.getSignatureValueHex = function(b) {
    var a = ASN1HEX.getDecendantHexVByNthList(b, 0, [2]);
    if (a.substr(0, 2) !== "00") {
        throw "can't get signature value"
    }
    return a.substr(2)
};
X509.getSerialNumberHex = function(a) {
    return ASN1HEX.getDecendantHexVByNthList(a, 0, [0, 1])
};
X509.verifySignature = function(f, c) {
    var d = X509.getSignatureAlgorithmName(f);
    var a = X509.getSignatureValueHex(f);
    var b = ASN1HEX.getDecendantHexTLVByNthList(f, 0, [0]);
    var e = new KJUR.crypto.Signature({
        alg: d
    });
    e.init(c);
    e.updateHex(b);
    return e.verify(a)
};
/*! jws-3.3.5 (c) 2013-2016 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.jws == "undefined" || !KJUR.jws) {
    KJUR.jws = {}
}
KJUR.jws.JWS = function() {
    var a = KJUR.jws.JWS;
    this.parseJWS = function(e, h) {
        if ((this.parsedJWS !== undefined) && (h || (this.parsedJWS.sigvalH !== undefined))) {
            return
        }
        var g = e.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);
        if (g == null) {
            throw "JWS signature is not a form of 'Head.Payload.SigValue'."
        }
        var i = g[1];
        var c = g[2];
        var j = g[3];
        var l = i + "." + c;
        this.parsedJWS = {};
        this.parsedJWS.headB64U = i;
        this.parsedJWS.payloadB64U = c;
        this.parsedJWS.sigvalB64U = j;
        this.parsedJWS.si = l;
        if (!h) {
            var f = b64utohex(j);
            var d = parseBigInt(f, 16);
            this.parsedJWS.sigvalH = f;
            this.parsedJWS.sigvalBI = d
        }
        var b = b64utoutf8(i);
        var k = b64utoutf8(c);
        this.parsedJWS.headS = b;
        this.parsedJWS.payloadS = k;
        if (!a.isSafeJSONString(b, this.parsedJWS, "headP")) {
            throw "malformed JSON string for JWS Head: " + b
        }
    }
};
KJUR.jws.JWS.sign = function(a, i, c, m, l) {
    var k = KJUR.jws.JWS;
    var q, e, j;
    if (typeof i != "string" && typeof i != "object") {
        throw "spHeader must be JSON string or object: " + i
    }
    if (typeof i == "object") {
        e = i;
        q = JSON.stringify(e)
    }
    if (typeof i == "string") {
        q = i;
        if (!k.isSafeJSONString(q)) {
            throw "JWS Head is not safe JSON string: " + q
        }
        e = k.readSafeJSONString(q)
    }
    j = c;
    if (typeof c == "object") {
        j = JSON.stringify(c)
    }
    if ((a == "" || a == null) && e.alg !== undefined) {
        a = e.alg
    }
    if ((a != "" && a != null) && e.alg === undefined) {
        e.alg = a;
        q = JSON.stringify(e)
    }
    if (a !== e.alg) {
        throw "alg and sHeader.alg doesn't match: " + a + "!=" + e.alg
    }
    var d = null;
    if (k.jwsalg2sigalg[a] === undefined) {
        throw "unsupported alg name: " + a
    } else {
        d = k.jwsalg2sigalg[a]
    }
    var b = utf8tob64u(q);
    var g = utf8tob64u(j);
    var o = b + "." + g;
    var n = "";
    if (d.substr(0, 4) == "Hmac") {
        if (m === undefined) {
            throw "mac key shall be specified for HS* alg"
        }
        var h = new KJUR.crypto.Mac({
            alg: d,
            prov: "cryptojs",
            pass: m
        });
        h.updateString(o);
        n = h.doFinal()
    } else {
        if (d.indexOf("withECDSA") != -1) {
            var p = new KJUR.crypto.Signature({
                alg: d
            });
            p.init(m, l);
            p.updateString(o);
            hASN1Sig = p.sign();
            n = KJUR.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig)
        } else {
            if (d != "none") {
                var p = new KJUR.crypto.Signature({
                    alg: d
                });
                p.init(m, l);
                p.updateString(o);
                n = p.sign()
            }
        }
    }
    var f = hextob64u(n);
    return o + "." + f
};
KJUR.jws.JWS.verify = function(p, t, j) {
    var m = KJUR.jws.JWS;
    var q = p.split(".");
    var d = q[0];
    var l = q[1];
    var b = d + "." + l;
    var r = b64utohex(q[2]);
    var i = m.readSafeJSONString(b64utoutf8(q[0]));
    var h = null;
    var s = null;
    if (i.alg === undefined) {
        throw "algorithm not specified in header"
    } else {
        h = i.alg;
        s = h.substr(0, 2)
    }
    if (j != null && Object.prototype.toString.call(j) === "[object Array]" && j.length > 0) {
        var c = ":" + j.join(":") + ":";
        if (c.indexOf(":" + h + ":") == -1) {
            throw "algorithm '" + h + "' not accepted in the list"
        }
    }
    if (h != "none" && t === null) {
        throw "key shall be specified to verify."
    }
    if (typeof t == "string" && t.indexOf("-----BEGIN ") != -1) {
        t = KEYUTIL.getKey(t)
    }
    if (s == "RS" || s == "PS") {
        if (! (t instanceof RSAKey)) {
            throw "key shall be a RSAKey obj for RS* and PS* algs"
        }
    }
    if (s == "ES") {
        if (! (t instanceof KJUR.crypto.ECDSA)) {
            throw "key shall be a ECDSA obj for ES* algs"
        }
    }
    if (h == "none") {}
    var n = null;
    if (m.jwsalg2sigalg[i.alg] === undefined) {
        throw "unsupported alg name: " + h
    } else {
        n = m.jwsalg2sigalg[h]
    }
    if (n == "none") {
        throw "not supported"
    } else {
        if (n.substr(0, 4) == "Hmac") {
            var k = null;
            if (t === undefined) {
                throw "hexadecimal key shall be specified for HMAC"
            }
            var g = new KJUR.crypto.Mac({
                alg: n,
                pass: t
            });
            g.updateString(b);
            k = g.doFinal();
            return r == k
        } else {
            if (n.indexOf("withECDSA") != -1) {
                var f = null;
                try {
                    f = KJUR.crypto.ECDSA.concatSigToASN1Sig(r)
                } catch(o) {
                    return false
                }
                var e = new KJUR.crypto.Signature({
                    alg: n
                });
                e.init(t);
                e.updateString(b);
                return e.verify(f)
            } else {
                var e = new KJUR.crypto.Signature({
                    alg: n
                });
                e.init(t);
                e.updateString(b);
                return e.verify(r)
            }
        }
    }
};
KJUR.jws.JWS.parse = function(g) {
    var c = g.split(".");
    var b = {};
    var f, e, d;
    if (c.length != 2 && c.length != 3) {
        throw "malformed sJWS: wrong number of '.' splitted elements"
    }
    f = c[0];
    e = c[1];
    if (c.length == 3) {
        d = c[2]
    }
    b.headerObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(f));
    b.payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(e));
    b.headerPP = JSON.stringify(b.headerObj, null, "  ");
    if (b.payloadObj == null) {
        b.payloadPP = b64utoutf8(e)
    } else {
        b.payloadPP = JSON.stringify(b.payloadObj, null, "  ")
    }
    if (d !== undefined) {
        b.sigHex = b64utohex(d)
    }
    return b
};
KJUR.jws.JWS.verifyJWT = function(d, j, l) {
    var h = KJUR.jws.JWS;
    var i = d.split(".");
    var c = i[0];
    var g = i[1];
    var m = c + "." + g;
    var k = b64utohex(i[2]);
    var f = h.readSafeJSONString(b64utoutf8(c));
    var e = h.readSafeJSONString(b64utoutf8(g));
    if (f.alg === undefined) {
        return false
    }
    if (l.alg === undefined) {
        throw "acceptField.alg shall be specified"
    }
    if (!h.inArray(f.alg, l.alg)) {
        return false
    }
    if (e.iss !== undefined && typeof l.iss === "object") {
        if (!h.inArray(e.iss, l.iss)) {
            return false
        }
    }
    if (e.sub !== undefined && typeof l.sub === "object") {
        if (!h.inArray(e.sub, l.sub)) {
            return false
        }
    }
    if (e.aud !== undefined && typeof l.aud === "object") {
        if (typeof e.aud == "string") {
            if (!h.inArray(e.aud, l.aud)) {
                return false
            }
        } else {
            if (typeof e.aud == "object") {
                if (!h.includedArray(e.aud, l.aud)) {
                    return false
                }
            }
        }
    }
    var b = KJUR.jws.IntDate.getNow();
    if (l.verifyAt !== undefined && typeof l.verifyAt === "number") {
        b = l.verifyAt
    }
    if (l.gracePeriod === undefined || typeof l.gracePeriod !== "number") {
        l.gracePeriod = 0
    }
    if (e.exp !== undefined && typeof e.exp == "number") {
        if (e.exp + l.gracePeriod < b) {
            return false
        }
    }
    if (e.nbf !== undefined && typeof e.nbf == "number") {
        if (b < e.nbf - l.gracePeriod) {
            return false
        }
    }
    if (e.iat !== undefined && typeof e.iat == "number") {
        if (b < e.iat - l.gracePeriod) {
            return false
        }
    }
    if (e.jti !== undefined && l.jti !== undefined) {
        if (e.jti !== l.jti) {
            return false
        }
    }
    if (!KJUR.jws.JWS.verify(d, j, l.alg)) {
        return false
    }
    return true
};
KJUR.jws.JWS.includedArray = function(b, a) {
    var d = KJUR.jws.JWS.inArray;
    if (b === null) {
        return false
    }
    if (typeof b !== "object") {
        return false
    }
    if (typeof b.length !== "number") {
        return false
    }
    for (var c = 0; c < b.length; c++) {
        if (!d(b[c], a)) {
            return false
        }
    }
    return true
};
KJUR.jws.JWS.inArray = function(d, b) {
    if (b === null) {
        return false
    }
    if (typeof b !== "object") {
        return false
    }
    if (typeof b.length !== "number") {
        return false
    }
    for (var c = 0; c < b.length; c++) {
        if (b[c] == d) {
            return true
        }
    }
    return false
};
KJUR.jws.JWS.jwsalg2sigalg = {
    HS256: "HmacSHA256",
    HS384: "HmacSHA384",
    HS512: "HmacSHA512",
    RS256: "SHA256withRSA",
    RS384: "SHA384withRSA",
    RS512: "SHA512withRSA",
    ES256: "SHA256withECDSA",
    ES384: "SHA384withECDSA",
    PS256: "SHA256withRSAandMGF1",
    PS384: "SHA384withRSAandMGF1",
    PS512: "SHA512withRSAandMGF1",
    none: "none",
};
KJUR.jws.JWS.isSafeJSONString = function(c, b, d) {
    var e = null;
    try {
        e = jsonParse(c);
        if (typeof e != "object") {
            return 0
        }
        if (e.constructor === Array) {
            return 0
        }
        if (b) {
            b[d] = e
        }
        return 1
    } catch(a) {
        return 0
    }
};
KJUR.jws.JWS.readSafeJSONString = function(b) {
    var c = null;
    try {
        c = jsonParse(b);
        if (typeof c != "object") {
            return null
        }
        if (c.constructor === Array) {
            return null
        }
        return c
    } catch(a) {
        return null
    }
};
KJUR.jws.JWS.getEncodedSignatureValueFromJWS = function(b) {
    var a = b.match(/^[^.]+\.[^.]+\.([^.]+)$/);
    if (a == null) {
        throw "JWS signature is not a form of 'Head.Payload.SigValue'."
    }
    return a[1]
};
KJUR.jws.JWS.getJWKthumbprint = function(d) {
    if (d.kty !== "RSA" && d.kty !== "EC" && d.kty !== "oct") {
        throw "unsupported algorithm for JWK Thumprint"
    }
    var a = "{";
    if (d.kty === "RSA") {
        if (typeof d.n != "string" || typeof d.e != "string") {
            throw "wrong n and e value for RSA key"
        }
        a += '"e":"' + d.e + '",';
        a += '"kty":"' + d.kty + '",';
        a += '"n":"' + d.n + '"}'
    } else {
        if (d.kty === "EC") {
            if (typeof d.crv != "string" || typeof d.x != "string" || typeof d.y != "string") {
                throw "wrong crv, x and y value for EC key"
            }
            a += '"crv":"' + d.crv + '",';
            a += '"kty":"' + d.kty + '",';
            a += '"x":"' + d.x + '",';
            a += '"y":"' + d.y + '"}'
        } else {
            if (d.kty === "oct") {
                if (typeof d.k != "string") {
                    throw "wrong k value for oct(symmetric) key"
                }
                a += '"kty":"' + d.kty + '",';
                a += '"k":"' + d.k + '"}'
            }
        }
    }
    var b = rstrtohex(a);
    var c = KJUR.crypto.Util.hashHex(b, "sha256");
    var e = hextob64u(c);
    return e
};
KJUR.jws.IntDate = {};
KJUR.jws.IntDate.get = function(a) {
    if (a == "now") {
        return KJUR.jws.IntDate.getNow()
    } else {
        if (a == "now + 1hour") {
            return KJUR.jws.IntDate.getNow() + 60 * 60
        } else {
            if (a == "now + 1day") {
                return KJUR.jws.IntDate.getNow() + 60 * 60 * 24
            } else {
                if (a == "now + 1month") {
                    return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 * 30
                } else {
                    if (a == "now + 1year") {
                        return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 * 365
                    } else {
                        if (a.match(/Z$/)) {
                            return KJUR.jws.IntDate.getZulu(a)
                        } else {
                            if (a.match(/^[0-9]+$/)) {
                                return parseInt(a)
                            }
                        }
                    }
                }
            }
        }
    }
    throw "unsupported format: " + a
};
KJUR.jws.IntDate.getZulu = function(k) {
    var b = k.match(/(\d+)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)Z/);
    if (b) {
        var a = b[1];
        var i = parseInt(a);
        if (a.length == 4) {} else {
            if (a.length == 2) {
                if (50 <= i && i < 100) {
                    i = 1900 + i
                } else {
                    if (0 <= i && i < 50) {
                        i = 2000 + i
                    } else {
                        throw "malformed year string for UTCTime"
                    }
                }
            } else {
                throw "malformed year string"
            }
        }
        var g = parseInt(b[2]) - 1;
        var j = parseInt(b[3]);
        var c = parseInt(b[4]);
        var e = parseInt(b[5]);
        var f = parseInt(b[6]);
        var h = new Date(Date.UTC(i, g, j, c, e, f));
        return~~ (h / 1000)
    }
    throw "unsupported format: " + k
};
KJUR.jws.IntDate.getNow = function() {
    var a = ~~ (new Date() / 1000);
    return a
};
KJUR.jws.IntDate.intDate2UTCString = function(a) {
    var b = new Date(a * 1000);
    return b.toUTCString()
};
KJUR.jws.IntDate.intDate2Zulu = function(e) {
    var i = new Date(e * 1000);
    var h = ("0000" + i.getUTCFullYear()).slice( - 4);
    var g = ("00" + (i.getUTCMonth() + 1)).slice( - 2);
    var b = ("00" + i.getUTCDate()).slice( - 2);
    var a = ("00" + i.getUTCHours()).slice( - 2);
    var c = ("00" + i.getUTCMinutes()).slice( - 2);
    var f = ("00" + i.getUTCSeconds()).slice( - 2);
    return h + g + b + a + c + f + "Z"
};
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.jws == "undefined" || !KJUR.jws) {
    KJUR.jws = {}
}
KJUR.jws.JWSJS = function() {
    var b = KJUR.jws.JWS;
    var a = KJUR.jws.JWS;
    this.aHeader = [];
    this.sPayload = "";
    this.aSignature = [];
    this.init = function() {
        this.aHeader = [];
        this.sPayload = undefined;
        this.aSignature = []
    };
    this.initWithJWS = function(d) {
        this.init();
        var c = d.split(".");
        if (c.length != 3) {
            throw "malformed input JWS"
        }
        this.aHeader.push(c[0]);
        this.sPayload = c[1];
        this.aSignature.push(c[2])
    };
    this.addSignature = function(c, f, k, i) {
        if (this.sPayload === undefined || this.sPayload === null) {
            throw "there's no JSON-JS signature to add."
        }
        var j = this.aHeader.length;
        if (this.aHeader.length != this.aSignature.length) {
            throw "aHeader.length != aSignature.length"
        }
        try {
            var d = KJUR.jws.JWS.sign(c, f, this.sPayload, k, i);
            var h = d.split(".");
            var l = h[0];
            var e = h[2];
            this.aHeader.push(h[0]);
            this.aSignature.push(h[2])
        } catch(g) {
            if (this.aHeader.length > j) {
                this.aHeader.pop()
            }
            if (this.aSignature.length > j) {
                this.aSignature.pop()
            }
            throw "addSignature failed: " + g
        }
    };
    this.addSignatureByHeaderKey = function(f, c) {
        var e = b64utoutf8(this.sPayload);
        var d = new KJUR.jws.JWS();
        var g = d.generateJWSByP1PrvKey(f, e, c);
        this.aHeader.push(d.parsedJWS.headB64U);
        this.aSignature.push(d.parsedJWS.sigvalB64U)
    };
    this.addSignatureByHeaderPayloadKey = function(f, e, c) {
        var d = new KJUR.jws.JWS();
        var g = d.generateJWSByP1PrvKey(f, e, c);
        this.aHeader.push(d.parsedJWS.headB64U);
        this.sPayload = d.parsedJWS.payloadB64U;
        this.aSignature.push(d.parsedJWS.sigvalB64U)
    };
    this.verifyAll = function(f) {
        if (this.aHeader.length !== f.length || this.aSignature.length !== f.length) {
            return false
        }
        for (var e = 0; e < f.length; e++) {
            var d = f[e];
            if (d.length !== 2) {
                return false
            }
            var c = this.verifyNth(e, d[0], d[1]);
            if (c === false) {
                return false
            }
        }
        return true
    };
    this.verifyNth = function(d, h, e) {
        if (this.aHeader.length <= d || this.aSignature.length <= d) {
            return false
        }
        var f = this.aHeader[d];
        var i = this.aSignature[d];
        var j = f + "." + this.sPayload + "." + i;
        var c = false;
        try {
            c = a.verify(j, h, e)
        } catch(g) {
            return false
        }
        return c
    };
    this.verifyWithCerts = function(d) {
        if (this.aHeader.length != d.length) {
            throw "num headers does not match with num certs"
        }
        if (this.aSignature.length != d.length) {
            throw "num signatures does not match with num certs"
        }
        var l = this.sPayload;
        var h = "";
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            var g = this.aHeader[e];
            var n = this.aSignature[e];
            var c = g + "." + l + "." + n;
            var k = new KJUR.jws.JWS();
            try {
                var m = k.verifyJWSByPemX509Cert(c, f);
                if (m != 1) {
                    h += (e + 1) + "th signature unmatch. "
                }
            } catch(j) {
                h += (e + 1) + "th signature fail(" + j + "). "
            }
        }
        if (h == "") {
            return 1
        } else {
            throw h
        }
    };
    this.readJWSJS = function(e) {
        if (typeof e === "string") {
            var d = b.readSafeJSONString(e);
            if (d == null) {
                throw "argument is not safe JSON object string"
            }
            this.aHeader = d.headers;
            this.sPayload = d.payload;
            this.aSignature = d.signatures
        } else {
            try {
                if (e.headers.length > 0) {
                    this.aHeader = e.headers
                } else {
                    throw "malformed header"
                }
                if (typeof e.payload === "string") {
                    this.sPayload = e.payload
                } else {
                    throw "malformed signatures"
                }
                if (e.signatures.length > 0) {
                    this.signatures = e.signatures
                } else {
                    throw "malformed signatures"
                }
            } catch(c) {
                throw "malformed JWS-JS JSON object: " + c
            }
        }
    };
    this.getJSON = function() {
        return {
            headers: this.aHeader,
            payload: this.sPayload,
            signatures: this.aSignature
        }
    };
    this.isEmpty = function() {
        if (this.aHeader.length == 0) {
            return 1
        }
        return 0
    }
};
module.exports = {
    RSAKey: RSAKey,
    KEYUTIL: KEYUTIL,
    hex2b64: hex2b64,
    b64tohex: b64tohex
}