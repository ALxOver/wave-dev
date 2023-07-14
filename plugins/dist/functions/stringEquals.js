"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringEquals = void 0;
const EqualityError_1 = require("../private/EqualityError");
/**
 * Check the equality between two strings with some additional options.
 * @param {string?} a The first param.
 * @param {string?} b The second param.
 * @param {EqualityOptions} options The option to manage equality.
 * @returns {boolean} The string equality.
 * @example
 * stringEquals("Apple", "Apple"); // true
 * stringEquals("My name is Jhon", "JHON", { allowCaseSensitive: true, allowedIncludes: "both" }); // true
 */
function stringEquals(a, b, options) {
    const log = options?.log;
    if ((a === undefined && !!b) || (!!a && b === undefined)) {
        if (log)
            console.error(new EqualityError_1.EqualityError({
                message: "❎ Missing params.",
                first: a,
                second: b,
            }));
        return false;
    }
    ;
    if (options?.allowFalsy && !a && !b) {
        return true;
    }
    else {
        if (typeof a !== "string" || typeof b !== "string") {
            if (log)
                console.error(new EqualityError_1.TypeError({
                    message: `❎ ${typeof a !== "string" ? a : b} is not type of string.`,
                    target: typeof a !== "string" ? a : b
                }));
            return false;
        }
        if (options) {
            if (options.allowCaseSensitive) {
                a = a.toLowerCase();
                b = b.toLowerCase();
            }
            if (options.allowIncludes === "second") {
                if (b.includes(a))
                    return true;
                console.error(new EqualityError_1.EqualityError({
                    message: '❎ Both strings are different even with "second" includes option.',
                    first: a,
                    second: b,
                }));
                return false;
            }
            if (options.allowIncludes === "first") {
                if (a.includes(b))
                    return true;
                console.error(new EqualityError_1.EqualityError({
                    message: '❎ Both strings are different even with "first" includes option.',
                    first: a,
                    second: b,
                }));
                return false;
            }
            if (options.allowIncludes === "both") {
                if (a.includes(b) || b.includes(a))
                    return true;
                console.error(new EqualityError_1.EqualityError({
                    message: '❎ Both strings are different even with "both" includes option.',
                    first: a,
                    second: b,
                }));
                return false;
            }
        }
        if (a.localeCompare(b) !== 0) {
            if (log)
                console.error(new EqualityError_1.EqualityError({
                    message: "❎ Both strings are different.",
                    first: a,
                    second: b,
                }));
            return false;
        }
        else
            return true;
    }
}
exports.stringEquals = stringEquals;
