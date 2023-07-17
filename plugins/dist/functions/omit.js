"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = void 0;
/**
 * Create a new object with the omitted properties specified.
 * @param data The object.
 * @param properties The properties to omit.
 * @example
 * ```ts
 * // Declare the object.
 * const person = { name: "Alex", age: 22, developer: true };
 * const newPerson = omit(person, ["developer"]);
 * console.log(newPerson); // { name: "Alex" , age: 22 }
 * ```
 */
function omit(data, properties) {
    const encoded = Object.fromEntries(Object.entries(data).filter(([key, value]) => !properties.includes(key)));
    Object.preventExtensions(encoded);
    return Object.freeze(encoded);
}
exports.omit = omit;
