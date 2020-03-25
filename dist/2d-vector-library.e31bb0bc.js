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
},{}],"vector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector = /*#__PURE__*/function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "setAngle",
    value: function setAngle(angle) {
      var length = this.getLength();
      this._x = Math.cos(angle) * length;
      this._y = Math.sin(angle) * length;
    }
  }, {
    key: "getAngle",
    value: function getAngle() {
      return Math.atan2(this._y, this._x);
    }
  }, {
    key: "setLength",
    value: function setLength(length) {
      var angle = this.getAngle();
      this._x = Math.cos(angle) * length;
      this._y = Math.sin(angle) * length;
    }
  }, {
    key: "getLength",
    value: function getLength() {
      return Math.sqrt(this._x * this._x + this._y * this._y);
    }
  }, {
    key: "add",
    value: function add(v2) {
      return new Vector(this._x + v2.x, this._y + v2.y);
    }
  }, {
    key: "substract",
    value: function substract(v2) {
      return new Vector(this._x - v2.x, this._y - v2.y);
    }
  }, {
    key: "multiply",
    value: function multiply(value) {
      return new Vector(this._x * value, this._y * value);
    }
  }, {
    key: "divide",
    value: function divide(value) {
      return new Vector(this._x / value, this._y / value);
    }
  }, {
    key: "addTo",
    value: function addTo(v2) {
      this._x += v2.x;
      this._y += v2.y;
    }
  }, {
    key: "substractFrom",
    value: function substractFrom(v2) {
      this._x -= v2.x;
      this._y -= v2.y;
    }
  }, {
    key: "multiplyBy",
    value: function multiplyBy(value) {
      this._x *= value;
      this._y *= value;
    }
  }, {
    key: "dividedBy",
    value: function dividedBy(value) {
      this._x /= value;
      this._y /= value;
    }
  }, {
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
    }
  }]);

  return Vector;
}();

exports.Vector = Vector;
},{}],"particle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Particle = void 0;

var _vector = require("./vector");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particle = /*#__PURE__*/function () {
  function Particle() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Particle);

    this.position = options.position || {
      x: 120,
      y: 100
    };
    this.speed = options.speed || 0;
    this.gravity = options.gravity || 0;
    this.thrust = options.thrust || {
      x: 0,
      y: 0
    };
    this.friction = options.friction || 1;
    this.direction = options.direction || 0;
    this.size = options.size || 10;
    this.mass = options.mass || 1;
    this.particleColor = options.particleColor || '#000000';
    this.position = new _vector.Vector(this.position.x, this.position.y);
    this.velocity = new _vector.Vector(0, 0);
    this.velocity.setLength(this.speed);
    this.velocity.setAngle(this.direction);
    this.gravity = new _vector.Vector(0, this.gravity);
    this.thrust = new _vector.Vector(this.thrust.x, this.thrust.y);
  }

  _createClass(Particle, [{
    key: "bindAll",
    value: function bindAll() {
      var _this = this;

      ['addEventListeners', 'render', 'drawParticle', 'init'].forEach(function (fn) {
        return _this[fn] = _this[fn].bind(_this);
      });
    }
  }, {
    key: "drawParticle",
    value: function drawParticle(context) {
      context.fillStyle = this.particleColor;
      context.beginPath();
      context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
      context.fill();
    }
  }, {
    key: "accelerate",
    value: function accelerate(acc) {
      this.velocity.addTo(acc);
    }
  }, {
    key: "angleTo",
    value: function angleTo(p2) {
      return Math.atan2(p2.position.y - this.position.y, p2.position.x - this.position.x);
    }
  }, {
    key: "distanceTo",
    value: function distanceTo(p2) {
      var dx = p2.position.x - this.position.x;
      var dy = p2.position.y - this.position.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }, {
    key: "gravitateTo",
    value: function gravitateTo(p2) {
      var gravity = new _vector.Vector(0, 0);
      var distance = this.distanceTo(p2);
      gravity.setLength(p2.mass / (distance * distance));
      gravity.setAngle(this.angleTo(p2));
      this.velocity.addTo(gravity);
    }
  }, {
    key: "update",
    value: function update() {
      this.velocity.multiplyBy(this.friction);
      this.position.addTo(this.velocity);
    }
  }, {
    key: "init",
    value: function init() {
      this.bindAll();
      this.addEventListeners();
    }
  }]);

  return Particle;
}();

exports.Particle = Particle;
},{"./vector":"vector.js"}],"formulas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.norm = norm;
exports.lerp = lerp;
exports.map = map;
exports.clamp = clamp;

function norm(value, min, max) {
  // Takes a value from a range and returns a value from 0 to 1
  return value - min / max - min;
}

function lerp(norm, min, max) {
  // Takes a normalized value and returns the value within a range
  return (max - min) * norm + min;
}

function map(value, sourceMin, sourceMax, destMin, destMax) {}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _canvas = require("./canvas");

var _particle = require("./particle");

var _formulas = require("./formulas");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ClampExample = /*#__PURE__*/function (_Canvas) {
  _inherits(ClampExample, _Canvas);

  function ClampExample() {
    var _this;

    _classCallCheck(this, ClampExample);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClampExample).call(this));
    _this.rectangle = {
      x: _this.canvas.width / 2 - 200,
      y: _this.canvas.height / 2 - 150,
      width: 400,
      height: 300
    };
    _this.particle = new _particle.Particle({
      position: {
        x: _this.canvas.width / 2,
        y: _this.canvas.height / 2
      },
      particleColor: '#fdf498'
    });
    return _this;
  }

  _createClass(ClampExample, [{
    key: "bindAll",
    value: function bindAll() {
      var _this2 = this;

      ['draw', 'render', 'addEventListeners', 'init'].forEach(function (fn) {
        return _this2[fn] = _this2[fn].bind(_this2);
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Set canvas background color

      this.context.fillStyle = '#fdf498';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height); // Set rectangle background color

      this.context.fillStyle = '#f37736';
      this.context.fillRect(this.rectangle.x - 10, this.rectangle.y - 10, this.rectangle.width + 20, this.rectangle.height + 20);
      this.particle.drawParticle(this.context);
    }
  }, {
    key: "render",
    value: function render() {
      this.draw();
      requestAnimationFrame(this.render);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this3 = this;

      document.body.addEventListener('mousemove', function (e) {
        // Clamp particle position to rectangle area
        _this3.particle.position.x = (0, _formulas.clamp)(e.clientX, _this3.rectangle.x, _this3.rectangle.x + _this3.rectangle.width);
        _this3.particle.position.y = (0, _formulas.clamp)(e.clientY, _this3.rectangle.y, _this3.rectangle.y + _this3.rectangle.height);
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.bindAll();
      this.addEventListeners();
      this.render();
    }
  }]);

  return ClampExample;
}(_canvas.Canvas);

var recClamp = new ClampExample();
recClamp.init();
},{"./canvas":"canvas.js","./particle":"particle.js","./formulas":"formulas.js"}],"../../../.nvm/versions/node/v11.10.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63996" + '/');

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