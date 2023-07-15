import { JSONStorage } from "./classes/JSONStorage";
export { JSONStorage } from "./classes/JSONStorage";
export { encode } from "./functions/encode";
export { stringEquals } from "./functions/stringEquals";
export * from "./constants";
export * from "./classes/KVString";
export * from "./classes/StringBuilder";
export type ValidJSONTypes = "string" | "number" | "boolean" | "object";
export interface KVStringData {
    key: string;
    value: string;
}
export interface BaseDocumentData {
    id: string;
}
export interface Document<Data extends {}> {
    readonly model: JSONStorage<Data>;
    readonly save: () => void;
    readonly toJSON: () => Data;
    readonly delete: () => void;
    readonly createdAt: Date;
    updatedAt: Date;
}
export interface KVStringOptions {
    values: KVStringData[];
    maxLength?: number;
    readonly separator: string;
    readonly connector: string;
}
export interface DifferenceErrorOptions {
    message: string;
    first?: string | null;
    second?: string | null;
}
export interface TypeErrorOptions {
    message: string;
    target?: string | null;
}
export interface EqualityOptions {
    /**
     * Allow true when both values are falsy type (undefined, null, false)
     * @example
     * var dadName, sonName;
     * stringEquals(dadName, sonName, { allowFalsy: true })
     */
    allowFalsy?: true;
    /**
     * Allow true when includes chars.
     * Use "first" to check if (a) includes (b).
     * Use "second" to check if (b) includes (a).
     * Use "both" to check if (a) includes (b) **or** vice versa.
     * @example
     * stringEquals("My name is Jhon", "Jhon", { allowIncludes: "first" }); // true
     * stringEquals("My name is Jhon", "Jhon", { allowIncludes: "second" }); // false
     * stringEquals("My name is Jhon", "Jhon", { allowIncludes: "both" }); // true
     */
    allowIncludes?: "first" | "second" | "both";
    /**
     * Allow case sensitive
     * @example
     * stringEquals("hi", "HI", { allowCaseSensitive: true }); // true
     */
    allowCaseSensitive?: true;
    /**
     * Allow console log the errors
     */
    log?: true;
}
