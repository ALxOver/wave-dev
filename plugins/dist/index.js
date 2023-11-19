"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringEquals = exports.encode = exports.omit = exports.forceWriteFileSync = void 0;
var forceWriteFile_1 = require("./functions/forceWriteFile");
Object.defineProperty(exports, "forceWriteFileSync", { enumerable: true, get: function () { return forceWriteFile_1.forceWriteFileSync; } });
var omit_1 = require("./functions/omit");
Object.defineProperty(exports, "omit", { enumerable: true, get: function () { return omit_1.omit; } });
var encode_1 = require("./functions/encode");
Object.defineProperty(exports, "encode", { enumerable: true, get: function () { return encode_1.encode; } });
var stringEquals_1 = require("./functions/stringEquals");
Object.defineProperty(exports, "stringEquals", { enumerable: true, get: function () { return stringEquals_1.stringEquals; } });
__exportStar(require("./constants"), exports);
__exportStar(require("./classes/KVString"), exports);
__exportStar(require("./classes/StringBuilder"), exports);
const props = ["mine", "fish"];
