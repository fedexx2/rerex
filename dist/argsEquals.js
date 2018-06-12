"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = argsEquals;

function argsEquals(prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  var len = prev.length;

  while (len--) {
    if (prev[len] !== next[len]) {
      return false;
    }
  }

  return true;
}