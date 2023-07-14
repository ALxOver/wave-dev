import { Collection } from "@discordjs/collection";
import { KVStringData, KVStringOptions } from "../";
/**
 * **Storing data in strings!**
 * KVstring allows you to store data in a specific string format and obtain that data in different types.
 * Using **\/** as separators and **:** as connectors, creates a key/value collection where you can pull or push data as **{ key: string; value: string }**.
 * @example
 * // An example of a KVS builder created by constructor options:
 * // In this case, it will throws a range error because KVString#maxLength has been set to 10 but when KVS resolve the final string, the result string length will be greater than 10.
 * const myKVString = new KVString({
 *  // Setting the values with their keys
 *  values: [{ key: "name", value: "Sam"}, { key: "age", value: "20" }],
 * // Specifying the max length for the result string
 *  maxLength: 10
 * })
 *
 * // An example of a KVS builder created by his Methods:
 * // In this case it will display a console warning because it is recommended to set a maximum length less than or equal to 100.
 * const myKVString = new KVString()
 * myKVString.setMaxLength(101)
 * myKVString.addValue("name", "Sam");
 * if (condition) myKVString.addValue("age", "20")
 * console.log(myKVString.toString()) // "key:Sam/age:20"
 * console.log(myKVString.getValue("name")) // "Sam"
 * console.log(myKVString.getValue("height")) // undefined
 * console.log(myKVString.getValue("surname", true)) // If the second parameter is true, the return type always going to be a string, but if the requested value doesn't exist, it will throw an error.
 * console.log(myKVString.getNumber("age", true)) // 20
 *
 * @example
 * // An example of a KVS builder created from a string:
 * const content = "name:Sam/age:20";
 * const myKVString = KVString.from(content, 100) // Setting the string reference and the max length for the result string.
 * console.log(myKVString.length) // 15
 * myKVString.setValues({ key: "hairColor", value: "black" }, { key: "weight", value: "143lb" }) // Removing all values and setting those ones.
 *
 * @example
 * // Some bad usages examples and a good one
 * const myKVString = new KVString({ values: [{ key: "name", value: "" }] }) // ❌
 * const myKVString = KVString.from("wrong") // ❌
 * const myKVString = KVString.from("still/wrong") // ❌
 * const myKVString = KVString.from("still:wrong/yet") // ❌
 * const myKVString = KVString.from("but:now/it's:good") // 😀👍
 */
export declare class KVString {
    /** The KVS separator. */
    readonly separator: string;
    /** The KVS connector. */
    readonly connector: string;
    /** The KVS values created by string or specified in the constructor. */
    readonly values: Collection<string, string>;
    /** The KVS values array */
    resolvedValues: KVStringData[];
    /** The KVS content resolved by formatting values with their keys. */
    content?: string;
    /** The max length allowed when formatting the result string. */
    maxLength: number;
    /** The current length when formatting the result string. */
    length: number;
    /**
     * The KVS constructor.
     * @constructor
     * @param {Pick<KVStringOptions, "values" | "maxLength">} options Options for KVS constructor.
     */
    constructor(options?: Pick<KVStringOptions, "values" | "maxLength">);
    /**
     * Set the max length for the result string.
     * @param {number} maxLength The number.
     * @returns {this}
     */
    setMaxLength(maxLength: number): this;
    /**
     * Remove all values and set a specified ones.
     * @param {KVStringData[]} values The values to set.
     * @returns {this}
     */
    setValues(...values: KVStringData[]): this;
    /**
     * Add a single value.
     * @param key The value key.
     * @param value The value.
     * @returns {this}
     */
    addValue(key: string, value: string): this;
    /**
     * Add multiple values.
     * @param {KVStringData[]} values The values to add.
     * @returns {this}
     */
    addValues(...values: KVStringData[]): this;
    /**
     * Remove a single value.
     * @param {string} key The name of the value key.
     * @returns {this}
     */
    removeValue(key: string): this;
    /**
     * Remove multiple values.
     * @param {string[]} keys The names of the values keys.
     * @returns {this}
     */
    removeValues(...keys: string[]): this;
    /**
     * Change a value.
     * @param {string} key The value key to change.
     * @param {string} newValue The new value.
     * @returns {this}
     */
    changeValue(key: string, newValue: string): this;
    /**
     * Get a value as string, forcing the return type as a string, if the value is undefined it will throw an error.
     * @param {string} key The value key.
     * @param {true} required The value is forced to appear.
     * @returns {string}
     */
    getString(key: string, required: true): string;
    /**
     * Get a value as string, if it doesn't exist it will return undefined.
     * @param {string} key The value key.
     * @param {?boolean} required The value is forced to appear.
     * @returns {string | undefined}
     */
    getString(key: string, required?: boolean): string | undefined;
    /**
     * Get a value as a number, forcing the return type as a number, if the value is not a number or is undefined, it will throw an error.
     * @param {string} key The value key.
     * @param {true} required The value is forced to appear.
     * @returns {number}
     */
    getNumber(key: string, required: true): number;
    /**
     * Get a value as a number, if it doesn't exist it will return undefined.
     * @param {string} key The value key.
     * @param {?boolean} required The value is forced to appear.
     * @returns {number | undefined}
     */
    getNumber(key: string, required?: boolean): number | undefined;
    /**
     * Get a value as a boolean, forcing the return type as a boolean, if the value is not a boolean or is undefined, it will throw an error.
     * @param {string} key The value key.
     * @param {true} required The value is forced to appear.
     * @returns {boolean}
     */
    getBoolean(key: string, required: true): boolean;
    /**
     * Get a value as a boolean, if it doesn't exist it will return undefined.
     * @param {string} key The value key.
     * @param {?boolean} required The value is forced to appear.
     * @returns {boolean | undefined}
     */
    getBoolean(key: string, required?: boolean): boolean | undefined;
    /**
     * Get a value as an object, forcing the return type as a object, if the value is undefined it will throw an error.
     * @template O
     * @param {string} key The value key.
     * @param {true} required The value is forced to appear.
     * @return {O}
     */
    getObject<O>(key: string, required: true): O;
    /**
     * Get a value as an object, if it doesn't exist it will return undefined.
     * @template O
     * @param {string} key The value key.
     * @param {?boolean} required The value is forced to appear.
     * @return {O | undefined}
     */
    getObject<O>(key: string, required?: boolean): O | undefined;
    /**
     * Format the values into a string.
     * @returns {string}
     */
    toString(): string;
    /**
     * Provides an object with key value pairs and autocomplete too.
     * @template {string} P
     * @param {string} content The content to parse into an object.
     * @param {P[]} keys The value keys to extract and build the object with.
     * @returns {Record<P, string>}
     */
    toObject<P extends string>(...keys: P[]): Record<P, string>;
    /**
     * Updates the KVString.
     */
    private update;
    /**
     * Create a KVS from a string.
     * @param {string} content The string.
     * @param {?number} maxLength The max length allowed for the result string, 100 by default.
     * @returns {KVString}
     * @example
     * // An example of a KVS builder created from a string
     * const content = "name:Sam/age:20";
     * const myKVString = KVString.from(content, 100) // Setting the string reference and the max length for the result string
     */
    static from(content: string, maxLength?: number): KVString;
    /**
     * Resolve the formatted string from values.
     * @param {Collection<string, string>} values The values.
     * @returns {string}
     */
    static resolveContent(values: Collection<string, string>): string;
    /**
     * Resolve values from a string.
     * @param {string} content The string formatted.
     * @returns {Collection<string, string>}
     */
    static resolveValues(content: string): Collection<string, string>;
    /**
     * A friendly typescript static method to parse string into an object with JSON#parse.
     * @template O
     * @param {string} content The string to parse.
     * @returns {O}
     */
    static toJSON<O>(content: string): O;
    /**
     * A friendly typescript static method to parse objects into strings with JSON#stringify.
     * @template D
     * @param {D} data The data to stringify.
     * @returns {string}
     */
    static toString<D>(data: D): string;
    /**
     * An useful static method which ones provides an object with key value pairs and autocomplete too.
     * @template {string} P
     * @param {string} content The content to parse into an object.
     * @param {P[]} keys The value keys to extract and build the object with.
     * @returns {Record<P, string>}
     */
    static toObject<P extends string>(content: string, ...keys: P[]): Record<P, string>;
}
