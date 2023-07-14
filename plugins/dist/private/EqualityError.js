"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeError = exports.DeprecationError = exports.EqualityError = void 0;
class EqualityError {
    constructor(options) {
        this.message = options.message;
        this.first = options.first;
        this.second = options.second;
    }
}
exports.EqualityError = EqualityError;
class DeprecationError {
    constructor(options) {
        this.message = options.message;
        this.target = options.target;
    }
}
exports.DeprecationError = DeprecationError;
class TypeError {
    constructor(options) {
        this.message = options.message;
        this.target = options.target;
    }
}
exports.TypeError = TypeError;
