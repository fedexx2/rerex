"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selector;

var _memo = _interopRequireDefault(require("./memo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selector(input, compute, key) {
  if (!compute && !key) return input;
  var memofunc = (0, _memo.default)(compute, key);

  function selectorRunner(state, props) {
    var inArgs = input.call(this, state, props);
    inArgs = inArgs.map(function (i) {
      return typeof i === 'function' ? i(state, props) : i;
    });
    return memofunc.apply({}, inArgs);
  }

  selectorRunner.getInfo = function () {
    return memofunc.getInfo();
  };

  selectorRunner.getCache = function () {
    return memofunc.getCache();
  };

  selectorRunner.clear = function () {
    return memofunc.clear();
  };

  return selectorRunner;
}