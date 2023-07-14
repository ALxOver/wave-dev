"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = void 0;
const validateJSONPropertyType_1 = require("../private/validateJSONPropertyType");
/**
 * Encode an object into a json format.
 * @template {{}} Data The object type to encode.
 * @template {{}} Result The expected result.
 * @param data The object to encode.
 * @param options Options for encodation.
 *
 * @example
 * ```ts
 * const person = { name: "Alex", age: 22, developer: true }; // Declare the object.
 * // Get the
 * const personEncoded = encode(person, { allowedTypes: ["string", "number"], skipKeys: ["age"] });
 * console.log(personEncoded); // { name: "Alex" }
 * ```
 */
function encode(data, options) {
    (0, validateJSONPropertyType_1.validateJSONPropertyTypes)(...options.allowedTypes);
    const encoded = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, (typeof value === "object" ? encode(value, options) : value)]).filter(([key, value]) => (options.allowedTypes.includes(typeof value) || value instanceof Array) && !options?.skipKeys?.includes(key)));
    Object.preventExtensions(encoded);
    return Object.freeze(encoded);
}
exports.encode = encode;
