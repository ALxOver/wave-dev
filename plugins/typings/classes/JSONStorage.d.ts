import { Collection } from "@discordjs/collection";
interface BaseJSONDocumentData {
    readonly id: string;
    readonly createdAtTimestamp?: number;
    updatedAtTimestamp?: number;
}
declare class JSONDocument<Data> implements Required<BaseJSONDocumentData> {
    readonly id: string;
    readonly createdAtTimestamp: number;
    updatedAtTimestamp: number;
    manager: JSONStorage<Data>;
    constructor(data: BaseJSONDocumentData & Data, manager: JSONStorage<Data>);
    edit(data: Data): void;
    save(): void;
    delete(): void;
    toStorage(): Data & Omit<JSONDocument<Data>, keyof JSONDocument<Data>>;
    toJSON(): Data & Omit<JSONDocument<Data>, keyof JSONDocument<Data>>;
}
declare class JSONStorage<Data> {
    readonly path: string;
    readonly cache: Collection<string, JSONDocument<Data> & Data>;
    constructor(...path: string[]);
    create(data: Data & {
        id: string;
    }): JSONDocument<Data> & Data;
    getById(id: string, required: true): JSONDocument<Data> & Data;
    getById(id: string, required?: boolean): (JSONDocument<Data> & Data) | undefined;
    delete(id: string): void;
    update(): void;
    toJSON(): (Data & Omit<JSONDocument<Data>, keyof JSONDocument<Data>>)[];
    private static validatePath;
    private static parse;
}
export { JSONStorage };
