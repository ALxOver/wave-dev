import { ValidJSONTypes } from "..";
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
export declare function encode<Data extends {}, Result extends {}>(data: Data | any, options: {
    allowedTypes: ValidJSONTypes[];
    skipKeys?: (keyof typeof data)[];
}): Readonly<Result>;
