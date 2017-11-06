(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["peril"] = factory();
	else
		root["peril"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// export const AC = new (window.AudioContext || window.webkitAudioContext)()
// export const PI = Math.PI
// export const TWOPI = 2.0 * PI
// export const SAMPLERATE = AC.sampleRate

var CONTEXT = exports.CONTEXT = window.AudioContext || window.webkitAudioContext ? new (window.AudioContext || window.webkitAudioContext)() : null;
var PI = exports.PI = Math.PI;
var TWOPI = exports.TWOPI = Math.PI * 2;
var SAMPLERATE = exports.SAMPLERATE = CONTEXT ? CONTEXT.sampleRate : 44100;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _constant = __webpack_require__(0);

var _oscillator = __webpack_require__(2);

var _oscillator2 = _interopRequireDefault(_oscillator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  CONTEXT: _constant.CONTEXT,
  Oscillator: _oscillator2.default
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

var _constant = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Oscillator = function (_Core) {
  _inherits(Oscillator, _Core);

  function Oscillator() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Oscillator);

    var _this = _possibleConstructorReturn(this, (Oscillator.__proto__ || Object.getPrototypeOf(Oscillator)).call(this, props));

    _this.type = props.type || 0;
    _this.freq = props.freq || 440;
    _this.gain = props.gain || 0;
    _this.phase = props.phase || 0;
    _this.mod = props.mod;

    _this.setType(_this.type);

    if (_constant.CONTEXT) {
      _this.processor = _constant.CONTEXT.createScriptProcessor(1024);
      _this.processor.onaudioprocess = _this.process.bind(_this);

      _this.input = _constant.CONTEXT.createChannelMerger(2);

      if (_this.mod) {
        _this.mod.connect(_this.input);
      }

      _this.input.connect(_this.processor);

      _this.output = _constant.CONTEXT.createGain();
      _this.output.gain.value = _this.gain;

      _this.processor.connect(_this.output);
    }
    return _this;
  }

  /* istanbul ignore next */


  _createClass(Oscillator, [{
    key: 'setType',
    value: function setType(type) {
      this.type = type;
      switch (this.type) {
        case 0:
          this.callback = this.getSineTick;
          break;
        case 1:
          this.callback = this.getSquareTick;
          break;
        case 2:
          this.callback = this.getSawtoothDTick;
          break;
        case 3:
          this.callback = this.getSawtoothUTick;
          break;
        case 4:
        default:
          this.callback = this.getTriTick;
          break;
      }
    }

    /* istanbul ignore next */

  }, {
    key: 'process',
    value: function process(event) {
      var inputArray1 = event.inputBuffer.getChannelData(0);
      var inputArray2 = event.inputBuffer.getChannelData(1);
      var outputArray = event.outputBuffer.getChannelData(0);
      var bufferSize = outputArray.length;

      for (var i = 0; i < bufferSize; i++) {
        outputArray[i] = this.callback(0);
        this.freq = inputArray1[i] ? inputArray1[i] + this.freq : this.freq;
        this.phase += this.getPhaseIncrement(this.lastInput);
        this.lastInput = inputArray2[i];
        this.wrap();
      }
    }
  }, {
    key: 'getSineTick',
    value: function getSineTick(phase) {
      return Math.sin(this.phase + phase);
    }
  }, {
    key: 'getSquareTick',
    value: function getSquareTick(phase) {
      if (this.phase + phase <= _constant.PI) {
        return 1;
      }
      return -1;
    }
  }, {
    key: 'getSawtoothUTick',
    value: function getSawtoothUTick(phase) {
      return 2 * ((this.phase + phase) * (1.0 / _constant.TWOPI)) - 1.0;
    }
  }, {
    key: 'getSawtoothDTick',
    value: function getSawtoothDTick(phase) {
      return 1.0 - 2 * ((this.phase + phase) * (1.0 / _constant.TWOPI));
    }
  }, {
    key: 'getTriTick',
    value: function getTriTick(phase) {
      var val = 2 * ((this.phase + phase) * (1.0 / _constant.TWOPI)) - 1.0;
      /* istanbul ignore next */
      if (val < 0.0) {
        val = -val;
      }
      val = 2.0 * (val - 0.5);
      return val;
    }
  }, {
    key: 'getPhaseIncrement',
    value: function getPhaseIncrement() {
      var freq = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return _constant.TWOPI * (this.freq + freq) / _constant.SAMPLERATE;
    }
  }, {
    key: 'wrap',
    value: function wrap() {
      /* istanbul ignore next */
      if (this.phase > _constant.TWOPI) {
        this.phase -= _constant.TWOPI;
      }
    }
  }]);

  return Oscillator;
}(_core2.default);

exports.default = Oscillator;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = function () {
  function Core() {
    _classCallCheck(this, Core);
  }

  _createClass(Core, [{
    key: "setOutput",
    value: function setOutput() {
      for (var i = 0; i < arguments.length; i++) {
        this.output.connect(arguments[i]);
      }
    }
  }]);

  return Core;
}();

exports.default = Core;

/***/ })
/******/ ]);
});
//# sourceMappingURL=peril.js.map