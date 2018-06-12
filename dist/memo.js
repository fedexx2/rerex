"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memok;

var _argsEquals = _interopRequireDefault(require("./argsEquals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function memo1(func) {
  var lastArgs = null;
  var lastResult = null;
  var calc = 0;
  var hits = 0;

  function memo1Runner()
  /* f args */
  {
    if ((0, _argsEquals.default)(lastArgs, arguments)) {
      hits++;
      return lastResult;
    }

    calc++;
    lastArgs = arguments;
    lastResult = func.apply(void 0, arguments);
    return lastResult;
  }

  memo1Runner.getInfo = function () {
    return {
      hits: hits,
      calc: calc
    };
  };

  memo1Runner.getCache = function () {
    return lastResult;
  };

  memo1Runner.clear = function () {
    calc = 0;
    hits = 0;
    lastArgs = null;
    lastResult = null;
  };

  return memo1Runner;
}

function memok(func, keyfunc) {
  if (typeof keyfunc !== 'function') {
    return memo1(func);
  }

  var cache = new Map();

  function memokRunner()
  /* f args */
  {
    var key = keyfunc.apply(void 0, arguments);
    var hit = cache.get(key);

    if (hit !== undefined) {
      return hit.apply(void 0, arguments);
    }

    hit = memo1(func);
    cache.set(key, hit);
    return hit.apply(void 0, arguments);
  }

  memokRunner.getInfo = function () {
    return Array.from(cache).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return _objectSpread({}, acc, _defineProperty({}, key, value.getInfo()));
    }, {});
  };

  memokRunner.getCache = function () {
    return Array.from(cache).reduce(function (acc, _ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      return _objectSpread({}, acc, _defineProperty({}, key, value.getCache()));
    }, {});
  };

  memokRunner.clear = function () {
    return cache.clear();
  };

  return memokRunner;
}