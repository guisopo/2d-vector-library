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
},{}],"particle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Particle = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particle = /*#__PURE__*/function () {
  function Particle() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Particle);

    this.position = options.position || {
      x: 0,
      y: 0
    };
    this.particleColor = options.particleColor || '#000000';
    this.size = options.size || 10;
    this.mass = options.mass || 1;
    this.direction = options.direction || 0;
    this.speed = options.speed || 0;
    this.gravity = options.gravity || 0;
    this.friction = options.friction || 1;
    this.bounce = options.bounce || -1;
    this.springs = [];
    this.gravitations = [];
    this.vx = Math.cos(this.direction) * this.speed;
    this.vy = Math.sin(this.direction) * this.speed;
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
    key: "addGravitation",
    value: function addGravitation(point) {
      this.removeGravitation(point);
      this.gravitations.push(point);
    }
  }, {
    key: "removeGravitation",
    value: function removeGravitation(p) {
      var _this2 = this;

      this.gravitations.forEach(function (gravitation) {
        if (p === gravitation.p) {
          _this2.gravitations.splice(_this2.gravitations.indexOf(p), 1);

          return;
        }
      }); // if(this.gravitations.length > 0) {
      //   for(let i = 0; i < this.gravitations.length; i++) {
      //     if(point === this.gravitations[i].point) {
      //       this.gravitations.splice(i, 1);
      //       return;
      //     }
      //   }
      // }
    }
  }, {
    key: "addSpring",
    value: function addSpring(point, k) {
      var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      this.removeSpring(point);
      this.springs.push({
        point: point,
        k: k,
        length: length
      });
    }
  }, {
    key: "removeSpring",
    value: function removeSpring(point) {
      var _this3 = this;

      this.springs.forEach(function (spring) {
        if (point === spring.point) {
          _this3.springs.splice(_this3.springs.indexOf(point), 1);

          return;
        }
      }); // if(this.springs.length > 0) {
      //   for(let i = 0; i < this.springs.length; i++) {
      //     if(point === this.springs[i].point) {
      //       this.springs.splice(i, 1);
      //       return;
      //     }
      //   }
      // }
    }
  }, {
    key: "getSpeed",
    value: function getSpeed() {
      return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }
  }, {
    key: "setSpeed",
    value: function setSpeed(speed) {
      var heading = this.getHeading();
      this.vx = Math.cos(heading) * speed;
      this.vy = Math.sin(heading) * speed;
    }
  }, {
    key: "getHeading",
    value: function getHeading() {
      return Math.atan2(this.vy, this.vx);
    }
  }, {
    key: "setHeading",
    value: function setHeading(heading) {
      var speed = this.getSpeed();
      this.vx = Math.cos(heading) * speed;
      this.vy = Math.sin(heading) * speed;
    }
  }, {
    key: "accelerate",
    value: function accelerate(ax, ay) {
      this.vx += ax;
      this.vy += ay;
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
      var dx = p2.position.x - this.position.x;
      var dy = p2.position.y - this.position.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var force = p2.mass / (distance * distance);
      var ax = dx / distance * force;
      var ay = dy / distance * force;
      this.vx += ax;
      this.vy += ay;
    }
  }, {
    key: "springTo",
    value: function springTo(p2, k) {
      var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var dx = p2.position.x - this.position.x;
      var dy = p2.position.y - this.position.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var springForce = (distance - length) * k;
      this.vx += dx / distance * springForce;
      this.vy += dy / distance * springForce;
    }
  }, {
    key: "handleGravitations",
    value: function handleGravitations() {
      var _this4 = this;

      this.gravitations.forEach(function (gravitation) {
        _this4.gravitateTo(gravitation);
      }); // for(let i = 0; i < this.gravitations.length; i++) {
      //   this.gravitateTo(this.gravitations[i]);
      // }
    }
  }, {
    key: "handleSprings",
    value: function handleSprings() {
      var _this5 = this;

      this.springs.forEach(function (spring) {
        _this5.springTo(spring.point, spring.k, spring.length);
      }); // for(let i = 0; i < this.springs.length; i++) {
      //   this.springTo(this.springs[i].point, this.springs[i].k, this.springs[i].length);
      // }
    }
  }, {
    key: "update",
    value: function update() {
      this.handleSprings();
      this.handleGravitations();
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.position.x += this.vx;
      this.position.y += this.vy;
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
},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundNearest = exports.roundToPlaces = exports.radiansToDegrees = exports.degreesToRadians = exports.randomInt = exports.randomRange = exports.distance = exports.clamp = exports.map = exports.lerp = exports.norm = void 0;

// Takes a value from a range and returns a value from 0 to 1
var norm = function norm(value, min, max) {
  return value - min / max - min;
}; // Takes a normalized value and returns the value within a range


exports.norm = norm;

var lerp = function lerp(norm, min, max) {
  return (max - min) * norm + min;
}; // Maps a value from one range into a value to another range


exports.lerp = lerp;

var map = function map(value, sourceMin, sourceMax, destMin, destMax) {
  return (destMax - destMin) * (value - sourceMin / sourceMax - sourceMin) + destMin;
}; // Limits the value between a range


exports.map = map;

var clamp = function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}; // Calculate distance between two points


exports.clamp = clamp;

var distance = function distance(p0, p1) {
  var dx = p1.x - p0.x;
  var dy = p1.y - p0.y;
  return Math.sqrt(dx * dx + dy * dy);
};

exports.distance = distance;

var randomRange = function randomRange(min, max) {
  return min + Math.random() * (max - min);
};

exports.randomRange = randomRange;

var randomInt = function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

exports.randomInt = randomInt;

var degreesToRadians = function degreesToRadians(degrees) {
  return degrees / 180 * Math.PI;
};

exports.degreesToRadians = degreesToRadians;

var radiansToDegrees = function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
};

exports.radiansToDegrees = radiansToDegrees;

var roundToPlaces = function roundToPlaces(value, places) {
  var mult = Math.pow(10, places);
  return Math.round(value * mult) / mult;
};

exports.roundToPlaces = roundToPlaces;

var roundNearest = function roundNearest(value, nearest) {
  return Math.round(value / nearest) * nearest;
};

exports.roundNearest = roundNearest;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _canvas = require("./canvas");

var _particle = require("./particle");

var _utils = require("./utils");

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

var multiGravity = /*#__PURE__*/function (_Canvas) {
  _inherits(multiGravity, _Canvas);

  var _super = _createSuper(multiGravity);

  function multiGravity() {
    var _this;

    _classCallCheck(this, multiGravity);

    _this = _super.call(this);
    _this.sun1 = new _particle.Particle({
      size: 20,
      mass: 10000,
      position: {
        x: 300,
        y: 200
      }
    });
    _this.sun2 = new _particle.Particle({
      size: 10,
      mass: 20000,
      position: {
        x: _this.canvas.width,
        y: _this.canvas.height
      }
    });
    _this.emiter = {
      x: 100,
      y: 0
    };
    _this.particles = [];
    _this.numParticles = 100;
    document.body.style.cursor = 'none';
    return _this;
  }

  _createClass(multiGravity, [{
    key: "bindAll",
    value: function bindAll() {
      var _this2 = this;

      ['draw', 'render', 'addEventListeners', 'init'].forEach(function (fn) {
        return _this2[fn] = _this2[fn].bind(_this2);
      });
    }
  }, {
    key: "createParticles",
    value: function createParticles() {
      for (var i = 0; i < this.numParticles; i++) {
        var particle = new _particle.Particle({
          position: {
            x: this.emiter.x,
            y: this.emiter.y
          },
          size: 3,
          speed: (0, _utils.randomRange)(7, 8),
          direction: Math.PI / 2 + (0, _utils.randomRange)(-0.1, 0.1)
        });
        particle.addGravitation(this.sun1);
        particle.addGravitation(this.sun2);
        this.particles.push(particle);
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this3 = this;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.sun1.drawParticle(this.context);
      this.sun2.drawParticle(this.context);
      this.particles.forEach(function (particle) {
        particle.update();
        particle.drawParticle(_this3.context);

        _this3.startAgain(particle);
      });
    }
  }, {
    key: "startAgain",
    value: function startAgain(particle) {
      if (particle.position.x > this.canvas.width || particle.position.x < 0 || particle.position.y > this.canvas.height || particle.position.y < 0) {
        particle.position.x = this.emiter.x;
        particle.position.y = this.emiter.y;
        particle.setSpeed((0, _utils.randomRange)(7, 8));
        particle.setHeading(Math.PI / 2 + (0, _utils.randomRange)(-0.1, 0.1));
      }
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
      var _this4 = this;

      document.body.addEventListener('mousemove', function (e) {
        _this4.sun2.position.x = e.clientX;
        _this4.sun2.position.y = e.clientY;
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.bindAll();
      this.addEventListeners();
      this.createParticles();
      this.render();
    }
  }]);

  return multiGravity;
}(_canvas.Canvas);

var a = new multiGravity();
a.init();
},{"./canvas":"canvas.js","./particle":"particle.js","./utils":"utils.js"}],"../../../.nvm/versions/node/v11.10.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60109" + '/');

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