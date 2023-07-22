"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONStorage = void 0;
const fs_1 = require("fs");
const Cache = Symbol("Cache");
const collection_1 = require("@discordjs/collection");
const forceWriteFile_1 = require("../functions/forceWriteFile");
const KVString_1 = require("./KVString");
const __1 = require("..");
const encode_1 = require("../functions/encode");
const path_1 = require("path");
const node_events_1 = require("node:events");
function buildDocument(id, data, model) {
    const doc = typeof data === "object"
        ? {
            id,
            ...data,
            model,
            updatedAtTimestamp: Date.now(),
        }
        : {
            id,
            value: data,
            model,
            updatedAtTimestamp: Date.now(),
        };
    Object.defineProperties(doc, {
        toJSON: {
            value: () => typeof data === "object"
                ? (0, __1.omit)((0, encode_1.encode)(doc, ["boolean", "number", "object", "string"]), ["model"])
                : { id, value: data },
        },
        save: {
            value: () => doc.model.save(doc),
        },
        delete: {
            value: () => model.delete(doc.id),
        },
    });
    Object.preventExtensions(doc);
    const document = new Proxy(doc, {
        defineProperty(target, property, attributes) {
            if ([
                "updatedAtTimestamp",
                "updatedAtTimestamp",
                "id",
            ].includes(property)) {
                throw new TypeError(`Cannot manually set or change the value of ${property}`);
            }
            else {
                Object.defineProperty(target, property, attributes);
                return true;
            }
        },
        deleteProperty() {
            throw new TypeError(`Cannot delete properties from the object`);
        },
    });
    return document;
}
class JSONStorage extends node_events_1.EventEmitter {
    constructor(path) {
        super();
        this.path = path;
        this[Cache] = new collection_1.Collection(JSONStorage.parse(path).map((doc) => [
            doc.id,
            buildDocument(doc.id, doc, this),
        ]));
        this.collection = new collection_1.Collection(JSONStorage.parse(path).map((doc) => [
            doc.id,
            buildDocument(doc.id, doc, this),
        ]));
    }
    /**
     * Get a document by its id.
     * @param {string} id The document id.
     * @param {boolean} required If true, the return type wont be undefined.
     */
    getById(id, required) {
        const data = this[Cache].get(id);
        if (!data && required)
            throw new Error(`Unable to get data with the id (${id})`);
        return data;
    }
    /**
     * Delete a document.
     * @param {string} id The document id.
     * @returns {boolean}
     */
    delete(id) {
        const deleted = this[Cache].delete(id);
        (0, forceWriteFile_1.forceWriteFileSync)(this.path, KVString_1.KVString.toString(this.toJSON()));
        return deleted;
    }
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
    create(id, data) {
        const doc = this[Cache].get(id);
        if (doc) {
            this[Cache].set(id, buildDocument(id, doc, this));
        }
        else {
            const object = Object.defineProperties(data, typeof data === "object" && !(data instanceof Array)
                ? {
                    id: {
                        value: id,
                        enumerable: true,
                    },
                    createdAtTimestamp: {
                        value: Date.now(),
                        enumerable: true,
                    },
                    updatedAtTimestamp: {
                        value: Date.now(),
                        enumerable: true,
                    },
                }
                : {
                    id: {
                        value: id,
                        enumerable: true,
                    },
                    value: {
                        value: data,
                        enumerable: true,
                    },
                    createdAtTimestamp: {
                        value: Date.now(),
                        enumerable: true,
                    },
                    updatedAtTimestamp: {
                        value: Date.now(),
                        enumerable: true,
                    },
                });
            this[Cache].set(id, buildDocument(id, object, this));
        }
        (0, forceWriteFile_1.forceWriteFileSync)(this.path, KVString_1.KVString.toString(this.toJSON()));
        this.emit("create", this[Cache].get(id), this, id);
        return this[Cache].get(id);
    }
    /**
     * Update a document by its id.
     * @param {string} id The document id to update.
     * @param {Data} data The new document data.
     * @returns {Data}
     */
    updateById(id, data) {
        this[Cache].set(id, buildDocument(id, { ...data, id }, this));
        (0, forceWriteFile_1.forceWriteFileSync)(this.path, KVString_1.KVString.toString(this.toJSON()));
        return this[Cache].get(id);
    }
    /**
     * Update the JSON file with the specified collection data.
     */
    update(collection) {
        (0, forceWriteFile_1.forceWriteFileSync)(this.path, JSON.stringify(collection.toJSON()));
    }
    /**
     * Save a document.
     * @param {DocType<Data>}data
     */
    save(data) {
        this.create(data.id, data.toJSON());
    }
    /**
     * Get the collection as an array of documents parsed in JSON.
     * @returns {Data[]}
     */
    toJSON() {
        return this[Cache].map((doc) => doc.toJSON());
    }
    static parse(path) {
        if ((0, fs_1.existsSync)(path)) {
            return JSON.parse((0, fs_1.readFileSync)(path).toString() || "[]");
        }
        else {
            (0, forceWriteFile_1.forceWriteFileSync)(path, "[]");
            return JSON.parse((0, fs_1.readFileSync)(path).toString() || "[]");
        }
    }
    static validatePath(path) {
        if (!Boolean((0, path_1.extname)(path)))
            throw new SyntaxError(`The path must be extended by (.json)\nGiven: (${path})`);
        return true;
    }
    /**
     * Create a JSON file where documents will be managed.
     * @param path The path where the JSON file will be created.
     * @returns {JSONStorage<Data>}
     */
    static store(path) {
        JSONStorage.validatePath(path);
        return new JSONStorage(path);
    }
}
exports.JSONStorage = JSONStorage;
