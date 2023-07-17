import { FilterKeyTypes, UnParseJSONTypes, ValidJSONTypes, ParseJSONTypes, ArrayElementsTypes } from "..";
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
export declare function encode<Data extends object, T extends UnParseJSONTypes<ValidJSONTypes>[]>(data: Data, allowedTypes: T): Readonly<Pick<Data, FilterKeyTypes<Data, ParseJSONTypes<ArrayElementsTypes<typeof allowedTypes>>>>>;
