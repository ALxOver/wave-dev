"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = void 0;
/**
 * Encode an object into a json format.
 * Be aware that an array extends object too.
 * @template {object} Data The object type to encode.
 * @param data The object to encode.
 * @param options Options for encodation.
 *
 * @example
 * ```ts
 * // Declare the object.
 * const person = { name: "Alex", age: 22, developer: true };
 * const personEncoded = encode(person, ["string", "boolean"]);
 * console.log(personEncoded); // { name: "Alex" , developer: true }
 * ```
 */
function encode(data, allowedTypes) {
    const encoded = Object.fromEntries(Object.entries(data)
        .map(([key, value]) => [
        key,
        typeof value === "object" && !!value && !(value instanceof Array)
            ? encode(value, allowedTypes)
            : value,
    ])
        .filter(([key, value]) => allowedTypes.includes(typeof value) || value instanceof Array));
    Object.preventExtensions(encoded);
    return Object.freeze(encoded);
}
exports.encode = encode;
const person = encode({ name: "pablo", age: 1, alive: true, dog: ["1"] }, [
    "object",
]);
person.dog;
