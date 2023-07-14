"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONStorage = void 0;
const fs_1 = require("fs");
const Cache = Symbol("Cache");
const collection_1 = require("@discordjs/collection");
const forceWriteFile_1 = require("../functions/forceWriteFile");
const KVString_1 = require("./KVString");
const encode_1 = require("../functions/encode");
const path_1 = require("path");
function buildDocument(data, model) {
    const doc = { ...data, model };
    Object.defineProperties(doc, {
        "toJSON": {
            value: () => (0, encode_1.encode)(doc, { allowedTypes: ["number", "object", "boolean", "string"], skipKeys: ["model"] })
        },
        "save": {
            value: () => doc.model.save(doc)
        },
        "delete": {
            value: () => model.delete(doc.id)
        }
    });
    Object.preventExtensions(doc);
    const document = new Proxy(doc, {
        defineProperty(_target, property, _attributes) {
            if (["updatedAt", "createdAt"].includes(property)) {
                throw new TypeError(`Cannot manually set or change the value of ${property}`);
            }
            else
                return true;
        },
        deleteProperty() {
            throw new TypeError(`Cannot delete properties from the object`);
        },
    });
    return document;
}
class JSONStorage {
    constructor(path) {
        this.path = path;
        this[Cache] = new collection_1.Collection(JSONStorage.parse(path).map(doc => [doc.id, buildDocument(doc, this)]));
        this.collection = new collection_1.Collection(JSONStorage.parse(path).map(doc => [doc.id, buildDocument(doc, this)]));
        ;
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
    create(data) {
        const doc = this[Cache].get(data.id);
        if (doc) {
            doc.updatedAt = new Date(Date.now());
            this[Cache].set(doc.id, buildDocument(doc, this));
        }
        else {
            this[Cache].set(data.id, buildDocument({ ...data, createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()) }, this));
        }
        (0, forceWriteFile_1.forceWriteFileSync)(this.path, KVString_1.KVString.toString(this.toJSON()));
        return this[Cache].get(data.id);
    }
    /**
     * Update a document.
     * @param {string} id The document id to update.
     * @param {Data} data The new document data.
     * @returns {Data & Document<Data>}
     */
    update(id, data) {
        this[Cache].set(id, buildDocument({ ...data, id }, this));
        (0, forceWriteFile_1.forceWriteFileSync)(this.path, KVString_1.KVString.toString(this.toJSON()));
        return this[Cache].get(id);
    }
    /**
     * Save a document.
     * @param {Data & Document<Data>}data
     */
    save(data) {
        this.create(data);
    }
    /**
     * Get the collection as an array of documents parsed in JSON.
     * @returns {Data[]}
     */
    toJSON() {
        return this[Cache].map(doc => doc.toJSON());
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
