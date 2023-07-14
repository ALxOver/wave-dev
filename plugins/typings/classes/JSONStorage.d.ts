declare const Cache: unique symbol;
import { Collection } from "@discordjs/collection";
import { BaseDocumentData, Document } from "..";
export declare class JSONStorage<Data extends BaseDocumentData> {
    /**
     * The JSONStorage path.
     */
    readonly path: string;
    /**
     * The Private JSONStorage collection.
     */
    [Cache]: Collection<string, Data & Document<Data>>;
    /**
     * The JSONStorage collection.
     */
    collection: Collection<string, Data & Document<Data>>;
    constructor(path: string);
    /**
     * Get a document by its id and forced to not be undefined.
     * @param {string} id The document id.
     * @param {true} required Forced to not be undefined.
     */
    getById(id: string, required: true): Data & Document<Data>;
    /**
     * Get a document by its id.
     * @param {string} id The document id.
     * @param {boolean} required If true, the return type wont be undefined.
     */
    getById(id: string, required?: boolean): Data & Document<Data> | undefined;
    /**
     * Delete a document.
     * @param {string} id The document id.
     * @returns {boolean}
     */
    delete(id: string): boolean;
    /**
     * Create a document
     * @param data The document data.
     * @returns {Data & Document<Data>}
     * @example
     * ```ts
     * // fruits.ts
     * import { JSONStorage, BaseDocumentData } from "kvstring";
     * import { join } from "path";
     * // Create an interface for the document data:
     * interface FruitData extends BaseDocumentData {
     *  name: string;
     *  amount: number;
     * }
     * // Create the dir and JSON file:
     * const path = join(process.cwd(), "storage", "fruits.json")
     * const Fruits = JSONStorage.store<FruitData>(path)
     *
     * // Create the first document:
     * Fruits.create({ id: "12345678912345678", name: "Apple", amount: 1 });
     * // Get the document by its id:
     * const fruit = Fruits.getById("12345678912345678", true)
     * // Modify and save the document:
     * fruit.name = "Lemon";
     * fruit.amount++
     * fruit.save()
     * console.log(Fruits.getById("12345678912345678", true)) // { id: "12345678912345678", name: "Lemon", amount: 3 }
     * ```
     */
    create(data: Data & BaseDocumentData): Data & Document<Data>;
    /**
     * Update a document.
     * @param {string} id The document id to update.
     * @param {Data} data The new document data.
     * @returns {Data & Document<Data>}
     */
    update(id: string, data: Data): Data & Document<Data>;
    /**
     * Save a document.
     * @param {Data & Document<Data>}data
     */
    save(data: Data & Document<Data>): void;
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
    static store<Data extends BaseDocumentData>(path: string): JSONStorage<Data>;
}
export {};
