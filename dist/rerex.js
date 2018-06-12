"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rerex;

function rerex(map) {
  return function rerexRunner(state, props) {
    var ret = typeof map === 'function' ? map(state, props) : map;

    for (var key in ret) {
      if (typeof ret[key] === 'function') {
        ret[key] = ret[key](state, props);
      }
    }

    return ret;
  };
}