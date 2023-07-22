/// <reference types="node" />
declare const Cache: unique symbol;
import { Collection } from "@discordjs/collection";
import { DocType, Document, JSONStorageEvents } from "..";
import { EventEmitter } from "node:events";
export declare class JSONStorage<Data> extends EventEmitter {
    /**
     * The JSONStorage path.
     */
    readonly path: string;
    /**
     * The Private JSONStorage collection.
     */
    [Cache]: Collection<string, DocType<Data>>;
    /**
     * The JSONStorage collection.
     */
    collection: Collection<string, DocType<Data>>;
    on: <K extends keyof JSONStorageEvents<Data>>(event: K, listener: (...args: JSONStorageEvents<Data>[K]) => void) => this;
    once: <K extends keyof JSONStorageEvents<Data>>(event: K, listener: (...args: JSONStorageEvents<Data>[K]) => void) => this;
    emit: <K extends keyof JSONStorageEvents<Data>>(eventName: K, ...args: JSONStorageEvents<Data>[K]) => boolean;
    constructor(path: string);
    /**
     * Get a document by its id and forced to not be undefined.
     * @param {string} id The document id.
     * @param {true} required Forced to not be undefined.
     */
    getById(id: string, required: true): DocType<Data> & Document<Data>;
    /**
     * Get a document by its id.
     * @param {string} id The document id.
     * @param {boolean} required If true, the return type wont be undefined.
     */
    getById(id: string, required?: boolean): (DocType<Data> & Document<Data>) | undefined;
    /**
     * Delete a document.
     * @param {string} id The document id.
     * @returns {boolean}
     */
    delete(id: string): boolean;
    /**
     * Create a document
     * @param {string} id The document id.
     * @param {Data} data The document data.
     * @returns {DocType<Data>}
     * @example
     * ```ts
     * // fruits.ts
     * import { JSONStorage } from "kvstring";
     * import { join } from "path";
     * // Create an interface for the document data:
     * interface FruitData {
     *  name: string;
     *  amount: number;
     * }
     * // Create the dir and JSON file:
     * const path = join(process.cwd(), "storage", "fruits.json")
     * const Fruits = JSONStorage.store<FruitData>(path)
     *
     * // Create the first document:
     * Fruits.create("12345678912345678", { name: "Apple", amount: 1 });
     * // Get the document by its id:
     * const fruit = Fruits.getById("12345678912345678", true)
     * // Modify and save the document:
     * fruit.name = "Lemon";
     * fruit.amount++
     * fruit.save()
     * console.log(Fruits.getById("12345678912345678", true)) // { id: "12345678912345678", name: "Lemon", amount: 3 }
     * ```
     */
    create(id: string, data: Omit<Data, "id">): DocType<Data>;
    /**
     * Update a document by its id.
     * @param {string} id The document id to update.
     * @param {Data} data The new document data.
     * @returns {Data}
     */
    updateById(id: string, data: Omit<Data, "id">): DocType<Data>;
    /**
     * Update the JSON file with the specified collection data.
     */
    update(collection: Collection<string, Data>): void;
    /**
     * Save a document.
     * @param {DocType<Data>}data
     */
    save(data: DocType<Data>): void;
    /**
     * Get the collection as an array of documents parsed in JSON.
     * @returns {Data[]}
     */
    toJSON(): Data[];
    private static parse;
    static validatePath(path: string): boolean;
    /**
     * Create a JSON file where documents will be managed.
     * @param path The path where the JSON file will be created.
     * @returns {JSONStorage<Data>}
     */
    static store<Data>(path: string): JSONStorage<Data>;
}
export {};
