import { EqualityOptions } from "..";
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
export declare function stringEquals(a?: string | null, b?: string | null, options?: EqualityOptions): boolean;
