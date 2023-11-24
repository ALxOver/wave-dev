import { JSONStorage } from "./classes/JSONStorage";
export { JSONStorage } from "./classes/JSONStorage";
export { PageBuilder } from "./classes/PageBuilder";
export { forceWriteFileSync } from "./functions/forceWriteFile";
export { omit } from "./functions/omit";
export { encode } from "./functions/encode";
export { stringEquals } from "./functions/stringEquals";
export * from "./constants";
export * from "./classes/KVString";
export * from "./classes/StringBuilder";
type array = any[];
export type ParseJSONTypes<T extends string> = T extends "string" ? string : T extends "number" ? number : T extends "boolean" ? boolean : T extends "array" ? [] : T extends "object" ? object : never;
export type UnParseJSONTypes<T extends string | number | boolean | object> = T extends string ? "string" : T extends number ? "number" : T extends boolean ? "boolean" : T extends any[] ? "array" : T extends object ? "object" : never;
/**
 * Get all the element types from an array.
 */
export type ArrayElementsTypes<ArrayType extends readonly unknown[] | undefined> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
/**
 * Get all object keys which instances match with the validation.
 */
export type FilterKeyTypes<O extends object, VT> = {
    [P in keyof O]: VT extends string ? O[P] extends string ? P : never : VT extends number ? O[P] extends number ? P : never : VT extends boolean ? O[P] extends boolean ? P : never : VT extends array ? O[P] extends array ? P : never : VT extends object ? O[P] extends object ? P : never : never;
}[keyof O];
/**
 * Get all object keys which instances match with the validation.
 */
export type FilterTrueKeyTypes<O extends object> = {
    [P in keyof O]: O[P] extends true ? P : never;
}[keyof O] & string;
export type ValidJSONTypes = string | number | boolean | object | array;
export type DocType<T> = T extends object ? T & Document<T> : Document<T> & {
    value: T;
};
export type ObjectValues<T> = T[keyof T];
export type ObjectKeys<T> = keyof T;
export interface KVStringData {
    key: string;
    value: string;
}
export interface BaseDocumentData {
    readonly id: string;
}
export interface Document<Data> extends BaseDocumentData {
    readonly model: JSONStorage<Data>;
    readonly save: () => void;
    readonly toJSON: () => BaseDocumentData & {
        readonly createdAtTimestamp: number;
        updatedAtTimestamp: number;
    } & Data;
    readonly delete: () => void;
    readonly createdAtTimestamp: number;
    updatedAtTimestamp: number;
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
export interface JSONStorageEvents<Data> {
    update: [document: DocType<Data>, manager: JSONStorage<Data>];
    create: [document: DocType<Data>, manager: JSONStorage<Data>, id: string];
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
