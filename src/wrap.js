"use strict";
exports.__esModule = true;
var curry_1 = require("./util/curry");
var freeze_1 = require("./freeze");
function wrap(fn, len) {
    if (len === void 0) { len = fn.length; }
    return curry_1["default"](function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return freeze_1["default"](fn.apply(void 0, args));
    }, len);
}
exports["default"] = wrap;
