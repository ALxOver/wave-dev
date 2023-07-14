"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJSONPropertyTypes = void 0;
function validateJSONPropertyTypes(...types) {
    for (const type of types) {
        if (!["string", "number", "boolean", "object"].includes(type)) {
            throw new TypeError(`JSON doesn't support (${type}).`);
        }
        else
            return true;
    }
}
exports.validateJSONPropertyTypes = validateJSONPropertyTypes;
