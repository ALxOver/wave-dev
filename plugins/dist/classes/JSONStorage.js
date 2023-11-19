"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONStorage = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const __1 = require("..");
const collection_1 = require("@discordjs/collection");
function JSONDoc(data, manager) {
    return new JSONDocument(data, manager);
}
class JSONDocument {
    constructor(data, manager) {
        this.id = data.id;
        this.createdAtTimestamp = data.createdAtTimestamp ?? Date.now();
        this.updatedAtTimestamp = data.updatedAtTimestamp ?? Date.now();
        this.manager = manager;
        for (const prop in data) {
            Reflect.set(this, prop, data[prop]);
        }
    }
    /**
     * Edits the document.
     * @param {Data} data The new data.
     */
    edit(data) {
        this.manager.create({
            id: this.id,
            ...data,
            updatedAtTimestamp: Date.now(),
        });
    }
    /**
     * Save the document.
     */
    save() {
        this.manager.create({
            id: this.id,
            updatedAtTimestamp: Date.now(),
            ...this.toStorage(),
        });
    }
    /**
     * Delete the document
     */
    delete() {
        this.manager.delete(this.id);
    }
    toStorage() {
        const data = {};
        const omitedProperties = ["manager"];
        for (const prop in this) {
            if (!omitedProperties.includes(prop)) {
                Reflect.set(data, prop, this[prop]);
            }
        }
        return data;
    }
    toJSON() {
        const data = {};
        const omitedProperties = [
            "id",
            "createdAtTimestamp",
            "updatedAtTimestamp",
            "manager",
        ];
        for (const prop in this) {
            if (!omitedProperties.includes(prop)) {
                Reflect.set(data, prop, this[prop]);
            }
        }
        return data;
    }
}
class JSONStorage {
    constructor(...path) {
        this.path = (0, path_1.join)(...path);
        JSONStorage.validatePath(this.path);
        this.cache = new collection_1.Collection(JSONStorage.parse(this.path).map((doc) => [
            doc.id,
            JSONDoc(doc, this),
        ]));
    }
    /**
     * Create a new document.
     * @param {Data & { id: string }} data The document data
     * @returns {JSONDocument<Data> & Data}
     */
    create(data) {
        this.cache.set(data.id, JSONDoc(data, this));
        this.update();
        return this.cache.get(data.id);
    }
    getById(id, required) {
        const data = this.cache.get(id);
        if (!data && required)
            throw new Error(`Unable to get data with the id (${id})`);
        return data;
    }
    /**
     * Delete a document by its id.
     * @param id The document id.
     */
    delete(id) {
        this.cache.delete(id);
        this.update();
    }
    /**
     * Update the Storage manager.
     */
    update() {
        (0, __1.forceWriteFileSync)(this.path, JSON.stringify(this.toJSON()));
    }
    toJSON() {
        //@ts-ignore
        return this.cache.map((doc) => doc.toStorage());
    }
    static validatePath(path) {
        if (!Boolean((0, path_1.extname)(path)))
            throw new SyntaxError(`The path must be extended by (.json)\nGiven: (${path})`);
    }
    static parse(path) {
        if ((0, fs_1.existsSync)(path)) {
            return JSON.parse((0, fs_1.readFileSync)(path).toString() || "[]");
        }
        else {
            (0, __1.forceWriteFileSync)(path, "[]");
            return JSON.parse((0, fs_1.readFileSync)(path).toString() || "[]");
        }
    }
}
exports.JSONStorage = JSONStorage;
