"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageBuilder = void 0;
const discord_js_1 = require("discord.js");
const stringEquals_1 = require("../functions/stringEquals");
const Errors = {
    DisplayFormatRequired: "The display format must be specified, PageBuilder#setDisplayFormat method needed",
    FilterFormatRequired: "The filter format must be specified, PageBuilder#setFilterFormat method needed",
    SearchFormatRequired: "The search format must be specified, PageBuilder#setSearchFormat method needed",
};
const cache = Symbol("Cache");
/**
 * **PageBuilder** allows you to create a pagination.
 * @example
 * const fruits = [
 *   { name: "Apple", amount: 1 },
 *   { name: "Lemon", amount: 3 },
 *   { name: "Melon", amount: 6 },
 * ];
 * const pagination = new PageBuilder<{ name: string; amount: number }, string>()
 *   .addValues(...fruits)
 *   .setLimit(1)
 *   .setDisplayFormat((value) => `${value.name} x${value.amount}`)
 *   .setSearchFormat((value) => `${value.name} x${value.amount} 👈`)
 *   .setEmptyMessage("There aren't any fruits in this page")
 *   .setUnfoundMessage("Unnable to find that fruit :c");

 */
class PageBuilder {
    constructor() {
        this.id = discord_js_1.SnowflakeUtil.generate().toString();
        this.limit = 10;
        this.page = 0;
        this.sortCallback = null;
        this.displayFormat = null;
        this.filterFormat = null;
        this.searchFormat = null;
        this.filterCallback = null;
        this.emptyMessage = "Empty";
        this.unfoundMessage = "Unfounded";
        this.values = new discord_js_1.Collection();
        this[cache] = new discord_js_1.Collection();
    }
    /**
     * Get the collection of resolved pages.
     */
    get collection() {
        const pages = new discord_js_1.Collection();
        let count = 0;
        for (const data of this.values.toJSON()) {
            const page = pages.get(count);
            if (!page) {
                pages.set(count, [data]);
            }
            else {
                if (page.length === this.limit) {
                    count++;
                    pages.set(count, [data]);
                }
                else {
                    page.push(data);
                }
            }
        }
        return pages;
    }
    /**
     * Got to the next page.
     */
    get next() {
        this.page++;
        if (!this.collection.has(this.page))
            this.page--;
        return this;
    }
    /**
     * Got to the previous page.
     */
    get previous() {
        this.page--;
        if (!this.collection.has(this.page))
            this.page++;
        return this;
    }
    /**
     * Got to the first page.
     */
    get first() {
        this.page = 0;
        return this;
    }
    /**
     * Got to the last page.
     */
    get last() {
        this.page = this.collection.size - 1;
        return this;
    }
    /**
     * Get the total number of pages.
     */
    get totalPages() {
        return this.collection.size;
    }
    /**
     * Check if there it's a previous page.
     */
    hasPrevious() {
        return this.collection.has(this.page - 1);
    }
    /**
     * Check if there it's a next page.
     */
    hasNext() {
        return this.collection.has(this.page + 1);
    }
    /**
     * Check if a certain page exist in the collection.
     */
    hasPage(page) {
        return this.collection.has(page);
    }
    /**
     * Check if there aren't any values to build pages.
     */
    isEmpty() {
        return this.values.size === 0;
    }
    /**
     * Check if the action search can be called.
     */
    isSearchEnabled() {
        return this.collection.size > 1;
    }
    /**
     * Go to a certain page.
     */
    jump(page = 0) {
        if (page > this.collection.size) {
            this.page = this.collection.size - 1;
        }
        else if (page < 0) {
            this.page = 0;
        }
        else {
            this.page = page;
        }
        return this;
    }
    /**
     * Set the id.
     */
    setId(id) {
        this.id = id;
        return this;
    }
    /**
     * Set the page.
     */
    setPage(index) {
        this.page = this.hasPage(index) ? index : 0;
        return this;
    }
    /**
     * Set the limit of values per page.
     */
    setLimit(limit) {
        this.limit = limit;
        return this;
    }
    /**
     * Set the limit of values per page.
     */
    setValues(...values) {
        this.values = new discord_js_1.Collection(values.map((value, index) => [index, value]));
        this[cache] = this.values;
        return this;
    }
    /**
     * Add more values.
     */
    addValues(...values) {
        for (const value of values) {
            this.values.set(this.values.size, value);
            this[cache].set(this[cache].size, value);
        }
        return this;
    }
    /**
     * Apply a filter for values.
     */
    setFilter(callback) {
        this.filterCallback = callback;
        this.values = this[cache].filter(callback);
        return this;
    }
    /**
     * Sort the values.
     */
    setSort(callback) {
        this.sortCallback = callback;
        this.values.sort(callback);
        return this;
    }
    /**
     * Set a display format.
     */
    setDisplayFormat(callback) {
        this.displayFormat = callback;
        return this;
    }
    /**
     * Set a filter format.
     */
    setFilterFormat(callback) {
        this.filterFormat = callback;
        return this;
    }
    /**
     * Set a search format.
     */
    setSearchFormat(callback) {
        this.searchFormat = callback;
        return this;
    }
    /**
     * Set a message to display whenever the page it's empty format.
     */
    setEmptyMessage(message) {
        this.emptyMessage = message;
        return this;
    }
    /**
     * Set a message to display whenever the value it's unfounded.
     */
    setUnfoundMessage(message) {
        this.unfoundMessage = message;
        return this;
    }
    display(options) {
        if (!this.displayFormat)
            throw new Error(Errors.DisplayFormatRequired);
        const page = options?.callback
            ? this.collection.find(options.callback)
            : this.collection.get(this.page);
        if (!page) {
            if (options?.required)
                throw new Error(`Unnable to get the page.`);
            return options?.join ? this.emptyMessage : [this.emptyMessage];
        }
        this.page =
            this.collection.findKey((p) => (0, stringEquals_1.stringEquals)(JSON.stringify(p), JSON.stringify(page))) ?? 0;
        const mappedPage = page.map((data, index) => this.displayFormat(data, index));
        return options?.join ? mappedPage.join(options.join) : mappedPage;
    }
    filter(options) {
        if (!this.filterFormat)
            throw new Error(Errors.FilterFormatRequired);
        const page = options?.callback
            ? this.collection.find(options.callback)
            : this.collection.get(this.page);
        if (!page) {
            if (options?.required)
                throw new Error(`Unnable to get the page.`);
            return options?.join ? this.emptyMessage : [this.emptyMessage];
        }
        this.page =
            this.collection.findKey((p) => (0, stringEquals_1.stringEquals)(JSON.stringify(p), JSON.stringify(page))) ?? 0;
        const mappedPage = page.map((data) => this.filterFormat(data));
        return options?.join ? mappedPage.join(options.join) : mappedPage;
    }
    search(options) {
        if (!this.displayFormat) {
            throw new Error(Errors.DisplayFormatRequired);
        }
        if (!this.searchFormat) {
            throw new Error(Errors.SearchFormatRequired);
        }
        const page = this.collection.find((page) => page.find(options.callback) ? true : false);
        if (!page) {
            if (options?.required)
                throw new Error(`Unnable to get the page.`);
            return options.join ? this.unfoundMessage : [this.unfoundMessage];
        }
        this.page =
            this.collection.findKey((p) => (0, stringEquals_1.stringEquals)(JSON.stringify(p), JSON.stringify(page))) ?? 0;
        const mappedPage = page.map((data, index) => options.callback(data)
            ? this.searchFormat(data, index)
            : this.displayFormat(data, index));
        return options.join ? mappedPage.join(options.join) : mappedPage;
    }
    resolvePage(content, index, required) {
        const resolvedPage = PageBuilder.resolveNumber(content, index, required);
        return resolvedPage ? resolvedPage - 1 : null;
    }
    static resolveNumber(content, index, required) {
        const matched = content.match(/\d+/g);
        if (!matched && required)
            throw new Error(`Couldn't match any number in the string (${content})`);
        if (matched && !matched[index] && required)
            throw new Error("Couldn't match any number at that index");
        if (!matched || !matched[index])
            return null;
        return parseInt(matched[index]);
    }
}
exports.PageBuilder = PageBuilder;
