"use strict";
exports.__esModule = true;
exports._ = void 0;
/* eslint no-shadow:0, no-param-reassign:0 prefer-rest-params:0 */
var curry_1 = require("lodash/curry");
exports._ = curry_1["default"].placeholder;
function curry(fn, len) {
    if (len === void 0) { len = fn.length; }
    return curry_1["default"](fn, len);
}
exports["default"] = curry;
