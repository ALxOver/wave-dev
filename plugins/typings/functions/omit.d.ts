import { ArrayElementsTypes } from "..";
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
export declare function omit<Data extends object, P extends (keyof Data)[]>(data: Data, properties: P): Omit<Data, ArrayElementsTypes<typeof properties>>;
