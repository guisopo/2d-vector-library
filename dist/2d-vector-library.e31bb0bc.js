// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Canvas = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas = /*#__PURE__*/function () {
  function Canvas() {
    var _this = this;

    _classCallCheck(this, Canvas);

    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d'); // this.dpr = window.devicePixelRatio || 1;

    this.dpr = 1;
    this.setCanvas();
    window.addEventListener('resize', function () {
      return _this.setCanvas();
    });
  }

  _createClass(Canvas, [{
    key: "setCanvas",
    value: function setCanvas() {
      this.canvas.width = window.innerWidth * this.dpr;
      this.canvas.height = window.innerHeight * this.dpr;
      this.context.scale(this.dpr, this.dpr);
    }
  }]);

  return Canvas;
}();

exports.Canvas = Canvas;
},{}],"perlin-noise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noise = noise;

// Kas Thomas: http://asserttrue.blogspot.com/2011/12/perlin-noise-in-javascript_31.html
// This is a port of Ken Perlin's Java code. The
// original Java code is at http://cs.nyu.edu/%7Eperlin/noise/.
// Note that in this version, a number from 0 to 1 is returned.
function noise(x, y, z) {
  var p = new Array(512);
  var permutation = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

  for (var i = 0; i < 256; i++) {
    p[256 + i] = p[i] = permutation[i];
  }

  var X = Math.floor(x) & 255,
      // FIND UNIT CUBE THAT
  Y = Math.floor(y) & 255,
      // CONTAINS POINT.
  Z = Math.floor(z) & 255;
  x -= Math.floor(x); // FIND RELATIVE X,Y,Z

  y -= Math.floor(y); // OF POINT IN CUBE.

  z -= Math.floor(z);
  var u = fade(x),
      // COMPUTE FADE CURVES
  v = fade(y),
      // FOR EACH OF X,Y,Z.
  w = fade(z);
  var A = p[X] + Y,
      AA = p[A] + Z,
      AB = p[A + 1] + Z,
      // HASH COORDINATES OF
  B = p[X + 1] + Y,
      BA = p[B] + Z,
      BB = p[B + 1] + Z; // THE 8 CUBE CORNERS,

  return scale(lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), // AND ADD
  grad(p[BA], x - 1, y, z)), // BLENDED
  lerp(u, grad(p[AB], x, y - 1, z), // RESULTS
  grad(p[BB], x - 1, y - 1, z))), // FROM  8
  lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), // CORNERS
  grad(p[BA + 1], x - 1, y, z - 1)), // OF CUBE
  lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1)))));
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t, a, b) {
  return a + t * (b - a);
}

function grad(hash, x, y, z) {
  var h = hash & 15; // CONVERT LO 4 BITS OF HASH CODE

  var u = h < 8 ? x : y,
      // INTO 12 GRADIENT DIRECTIONS.
  v = h < 4 ? y : h == 12 || h == 14 ? x : z;
  return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
}

function scale(n) {
  return (1 + n) / 2;
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _canvas = require("./canvas");

var _perlinNoise = require("./perlin-noise");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var noiseBubles = /*#__PURE__*/function (_Canvas) {
  _inherits(noiseBubles, _Canvas);

  var _super = _createSuper(noiseBubles);

  function noiseBubles() {
    var _this;

    _classCallCheck(this, noiseBubles);

    _this = _super.call(this);
    _this.x;
    _this.y; // this.particle = new Particle(this.width/2, this.height/2, 0, 0, 0);

    _this.radius = 100;
    _this.time = 0;
    _this.number = 100;
    _this.updateRender = _this.render.bind(_assertThisInitialized(_this));
    requestAnimationFrame(_this.updateRender);
    return _this;
  }

  _createClass(noiseBubles, [{
    key: "draw",
    value: function draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.save();
      this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.context.fillStyle = '#FF0000';
      this.context.beginPath();

      for (var i = 0; i < this.number; i++) {
        var angle = i * Math.PI * 2 / this.number; // this.x = this.radius * Math.sin(angle) + 10 * noise(i/10, this.time/10, 0);
        // this.y = this.radius * Math.cos(angle) + 10 * noise(i/10, this.time/10, 0);
        // this.x = this.radius * Math.sin(angle) + 7   * noise(this.radius * Math.sin(angle), this.time/10, 0);
        // this.y = this.radius * Math.cos(angle) + 7   * noise(this.radius * Math.cos(angle), this.time/10, 0);

        this.x = this.radius * Math.sin(angle) + 40 * (0, _perlinNoise.noise)(Math.sin(angle), this.time / 100, 0);
        this.y = this.radius * Math.cos(angle) + 40 * (0, _perlinNoise.noise)(Math.cos(angle), this.time / 100, 0);
        this.context.lineTo(this.x, this.y);
      }

      this.context.closePath();
      this.context.fill();
      this.context.fillStyle = '#000000';
      this.context.beginPath();

      for (var _i = 0; _i < this.number; _i++) {
        var _angle = _i * Math.PI * 2 / this.number;

        this.x = this.radius * Math.sin(_angle) + 40 * (0, _perlinNoise.noise)(Math.sin(_angle) + this.time / 100, this.time / 100, 0);
        this.y = this.radius * Math.cos(_angle) + 40 * (0, _perlinNoise.noise)(Math.cos(_angle) + this.time / 100, this.time / 100, 0);
        this.context.lineTo(this.x, this.y);
      }

      this.context.closePath();
      this.context.fill();
      this.context.fillStyle = '#00FF00';
      this.context.beginPath();

      for (var _i2 = 0; _i2 < this.number; _i2++) {
        var _angle2 = _i2 * Math.PI * 2 / this.number;

        this.x = (this.radius - 5) * Math.sin(_angle2) + 40 * (0, _perlinNoise.noise)(Math.sin(_angle2) + 2 * this.time / 100, this.time / 100, 0);
        this.y = (this.radius - 5) * Math.cos(_angle2) + 40 * (0, _perlinNoise.noise)(Math.cos(_angle2) + 3 * this.time / 100, this.time / 100, 0);
        this.context.lineTo(this.x, this.y);
      }

      this.context.closePath();
      this.context.fill();
      this.context.restore();
    }
  }, {
    key: "render",
    value: function render() {
      this.draw();
      this.time += 1;
      requestAnimationFrame(this.updateRender);
    }
  }]);

  return noiseBubles;
}(_canvas.Canvas);

var a = new noiseBubles(); // a.render();
},{"./canvas":"canvas.js","./perlin-noise":"perlin-noise.js"}],"../../../.nvm/versions/node/v11.10.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62160" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v11.10.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/2d-vector-library.e31bb0bc.js.map