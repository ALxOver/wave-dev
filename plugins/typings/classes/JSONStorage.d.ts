import { Collection } from "@discordjs/collection";
interface BaseJSONDocumentData {
    readonly id: string;
    readonly createdAtTimestamp?: number;
    updatedAtTimestamp?: number;
}
declare class JSONDocument<Data> implements Required<BaseJSONDocumentData> {
    /**
     * The document id.
     */
    readonly id: string;
    /**
     * The timestamp when the document has been created.
     */
    readonly createdAtTimestamp: number;
    /**
     * The timestamp when the document has been updated.
     */
    updatedAtTimestamp: number;
    /**
     * The document manager.
     */
    manager: JSONStorage<Data>;
    constructor(data: BaseJSONDocumentData & Data, manager: JSONStorage<Data>);
    /**
     * Edits the document.
     * @param {Data} data The new data.
     */
    edit(data: Data): void;
    /**
     * Save the document.
     */
    save(): void;
    /**
     * Delete the document
     */
    delete(): void;
    private toStorage;
    toJSON(): Data & Omit<JSONDocument<Data>, keyof JSONDocument<Data>>;
}
declare class JSONStorage<Data> {
    readonly path: string;
    readonly cache: Collection<string, JSONDocument<Data> & Data>;
    constructor(...path: string[]);
    /**
     * Create a new document.
     * @param {Data & { id: string }} data The document data
     * @returns {JSONDocument<Data> & Data}
     */
    create(data: Data & {
        id: string;
    }): JSONDocument<Data> & Data;
    /**
     * Get a document by its id.
     * @param id The document id.
     * @param required If its required.
     */
    getById(id: string, required: true): JSONDocument<Data> & Data;
    getById(id: string, required?: boolean): (JSONDocument<Data> & Data) | undefined;
    /**
     * Delete a document by its id.
     * @param id The document id.
     */
    delete(id: string): void;
    /**
     * Update the Storage manager.
     */
    update(): void;
    toJSON(): (Data & Omit<JSONDocument<Data>, keyof JSONDocument<Data>>)[];
    private static validatePath;
    private static parse;
}
export { JSONStorage };
