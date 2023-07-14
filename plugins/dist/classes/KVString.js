"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KVString = void 0;
const collection_1 = require("@discordjs/collection");
const StringBuilder_1 = require("./StringBuilder");
const constants_1 = require("../constants");
const defaultSeparator = "/";
const defaultConnector = ":";
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
class KVString {
    /**
     * The KVS constructor.
     * @constructor
     * @param {Pick<KVStringOptions, "values" | "maxLength">} options Options for KVS constructor.
     */
    constructor(options) {
        this.values = new collection_1.Collection(options?.values.map(({ key, value }) => [key, value]));
        this.resolvedValues = this.values.map((v, k) => ({ key: k, value: v }));
        this.separator = defaultSeparator;
        this.connector = defaultConnector;
        this.content = this.toString();
        this.length = this.content.length;
        this.maxLength = options?.maxLength ?? 100;
        //#region Validation
        if (this.length > this.maxLength)
            throw RangeError(`Content length must be less or equals to ${this.maxLength}`);
        if (this.maxLength > 100)
            console.warn(`Warning: ❗It is recommended to set the maxLength to a number less or equal to 100`);
        //#endregion
    }
    //#region Public
    /**
     * Set the max length for the result string.
     * @param {number} maxLength The number.
     * @returns {this}
     */
    setMaxLength(maxLength) {
        this.maxLength = maxLength;
        return this;
    }
    /**
     * Remove all values and set a specified ones.
     * @param {KVStringData[]} values The values to set.
     * @returns {this}
     */
    setValues(...values) {
        this.values.clear();
        for (const { key, value } of values) {
            this.values.set(key, value);
        }
        this.update();
        return this;
    }
    /**
     * Add a single value.
     * @param key The value key.
     * @param value The value.
     * @returns {this}
     */
    addValue(key, value) {
        this.values.set(key, value);
        this.update();
        return this;
    }
    /**
     * Add multiple values.
     * @param {KVStringData[]} values The values to add.
     * @returns {this}
     */
    addValues(...values) {
        for (const { key, value } of values) {
            this.values.set(key, value);
        }
        this.update();
        return this;
    }
    /**
     * Remove a single value.
     * @param {string} key The name of the value key.
     * @returns {this}
     */
    removeValue(key) {
        this.values.delete(key);
        this.update();
        return this;
    }
    /**
     * Remove multiple values.
     * @param {string[]} keys The names of the values keys.
     * @returns {this}
     */
    removeValues(...keys) {
        for (const name of keys) {
            this.values.delete(name);
        }
        this.update();
        return this;
    }
    /**
     * Change a value.
     * @param {string} key The value key to change.
     * @param {string} newValue The new value.
     * @returns {this}
     */
    changeValue(key, newValue) {
        this.values.set(key, newValue);
        return this;
    }
    /**
     * Get a value as string, if it doesn't exist it will return undefined.
     * @param {string} key The value key.
     * @param {?boolean} required The value is forced to appear.
     * @returns {string | undefined}
     */
    getString(key, required) {
        const value = this.values.get(key);
        if (!value && required)
            throw Error(`Unnable to get the value named ${key}`);
        return value;
    }
    /**
     * Get a value as a number, if it doesn't exist it will return undefined.
     * @param {string} key The value key.
     * @param {?boolean} required The value is forced to appear.
     * @returns {number | undefined}
     */
    getNumber(key, required) {
        const value = this.values.get(key);
        if (!value && required)
            throw Error(`Unnable to get the value named ${key}`);
        return value ? parseInt(value) : undefined;
    }
    /**
     * Get a value as a boolean, if it doesn't exist it will return undefined.
     * @param {string} key The value key.
     * @param {?boolean} required The value is forced to appear.
     * @returns {boolean | undefined}
     */
    getBoolean(key, required) {
        const value = this.values.get(key);
        if (!value && required)
            throw Error(`Unnable to get the value named ${key}`);
        return value ? Boolean(value) : undefined;
    }
    /**
     * Get a value as an object, if it doesn't exist it will return undefined.
     * @template O
     * @param {string} key The value key.
     * @param {?boolean} required The value is forced to appear.
     * @return {O | undefined}
     */
    getObject(key, required) {
        const value = this.values.get(key);
        if (!value && required)
            throw Error(`Unnable to get the value named ${key}`);
        return value ? JSON.parse(value) : undefined;
    }
    /**
     * Format the values into a string.
     * @returns {string}
     */
    toString() {
        const resolvedContent = new StringBuilder_1.StringBuilder();
        for (const [key, value] of this.values)
            resolvedContent.update(`${key}${this.connector}${value}`, this.separator);
        return resolvedContent.toString();
    }
    /**
     * Provides an object with key value pairs and autocomplete too.
     * @template {string} P
     * @param {string} content The content to parse into an object.
     * @param {P[]} keys The value keys to extract and build the object with.
     * @returns {Record<P, string>}
     */
    toObject(...keys) {
        return KVString.toObject(this.toString(), ...keys);
    }
    //#endregion
    //#region Private
    /**
     * Updates the KVString.
     */
    update() {
        this.content = this.toString();
        this.length = this.content.length;
        this.resolvedValues = this.values.map((v, k) => ({ key: k, value: v }));
    }
    //#endregion
    //#region Static Methods
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
    static from(content, maxLength = 100) {
        //#region Validation
        const values = KVString.resolveValues(content);
        if (!values.size || KVString.resolveContent(values) !== content)
            throw SyntaxError(`Incorrect syntax, the connector must be preceded with the separator and vice versa (name${defaultConnector}value${defaultSeparator}name${defaultConnector}value/...)`);
        //#endregion
        return new KVString({
            values: values.map((value, key) => ({ key, value })),
            maxLength: maxLength,
        });
    }
    /**
     * Resolve the formatted string from values.
     * @param {Collection<string, string>} values The values.
     * @returns {string}
     */
    static resolveContent(values) {
        const resolvedContent = new StringBuilder_1.StringBuilder();
        for (const [key, value] of values)
            resolvedContent.update(`${key}:${value}`, defaultSeparator);
        return resolvedContent.toString();
    }
    /**
     * Resolve values from a string.
     * @param {string} content The string formatted.
     * @returns {Collection<string, string>}
     */
    static resolveValues(content) {
        const contentWithoutSpaces = content.replace(constants_1.RegExps.Spaces, "");
        const separator = contentWithoutSpaces.includes(defaultSeparator)
            ? defaultSeparator
            : null;
        const connector = contentWithoutSpaces.includes(defaultConnector)
            ? defaultConnector
            : null;
        if (!separator && connector) {
            return new collection_1.Collection([
                [
                    contentWithoutSpaces.split(connector)[0],
                    contentWithoutSpaces.split(connector)[1],
                ],
            ]);
        }
        else if (separator && connector) {
            return new collection_1.Collection(contentWithoutSpaces
                .split(separator)
                .filter((value) => value.includes(connector) &&
                value.split(connector)[0]?.length &&
                value.split(connector)[1]?.length)
                .map((value) => [
                value.split(connector)[0],
                value.split(connector)[1],
            ]));
        }
        else
            return new collection_1.Collection();
    }
    /**
     * A friendly typescript static method to parse string into an object with JSON#parse.
     * @template O
     * @param {string} content The string to parse.
     * @returns {O}
     */
    static toJSON(content) {
        return JSON.parse(content);
    }
    /**
     * A friendly typescript static method to parse objects into strings with JSON#stringify.
     * @template D
     * @param {D} data The data to stringify.
     * @returns {string}
     */
    static toString(data) {
        return JSON.stringify(data);
    }
    /**
     * An useful static method which ones provides an object with key value pairs and autocomplete too.
     * @template {string} P
     * @param {string} content The content to parse into an object.
     * @param {P[]} keys The value keys to extract and build the object with.
     * @returns {Record<P, string>}
     */
    static toObject(content, ...keys) {
        const values = KVString.resolveValues(content);
        const nullValues = keys.filter((key) => !values.has(key));
        const data = Object.assign({}, ...[
            ...values.map((value, key) => JSON.parse(`{"${key}":"${value}"}`)),
            ...nullValues.map((key) => JSON.parse(`{"${key}":null}`)),
        ]);
        if (!Object.keys(data).length)
            throw Error(`Unnable to match keys in the value collection of ${content}`);
        if (nullValues.length)
            throw Error(`Unnable to match values with the following keys (${nullValues.join(", ")})`);
        return Object.keys(data).length ? data : null;
    }
}
exports.KVString = KVString;
