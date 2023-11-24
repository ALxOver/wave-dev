import { Collection } from "discord.js";
declare const cache: unique symbol;
export type sortFunction<ValueType> = (a: ValueType, b: ValueType) => number;
export type filterFunction<ValueType> = (a: ValueType) => boolean;
export type displayFormatFunction<ValueType, DisplayType> = (a: ValueType, index: number) => DisplayType;
export type filterFormatFunction<ValueType, DisplayType> = (a: ValueType) => DisplayType;
export type searchFormatFunction<ValueType, DisplayType> = (a: ValueType, index: number) => DisplayType;
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
export declare class PageBuilder<ValueType, DisplayType> {
    /**
     * The custom id.
     */
    id: string;
    /**
     * The values.
     */
    values: Collection<number, ValueType>;
    /**
     * The page.
     */
    page: number;
    /**
     * The page limit
     */
    limit: number;
    private sortCallback;
    private displayFormat;
    private filterFormat;
    private searchFormat;
    private filterCallback;
    /**
     * The message to display whenever the page it's empty.
     */
    emptyMessage: string;
    /**
     * The message to display whenever the requested item it's unfounded.
     */
    unfoundMessage: string;
    [cache]: Collection<number, ValueType>;
    constructor();
    /**
     * Get the collection of resolved pages.
     */
    get collection(): Collection<number, ValueType[]>;
    /**
     * Got to the next page.
     */
    get next(): this;
    /**
     * Got to the previous page.
     */
    get previous(): this;
    /**
     * Got to the first page.
     */
    get first(): this;
    /**
     * Got to the last page.
     */
    get last(): this;
    /**
     * Get the total number of pages.
     */
    get totalPages(): number;
    /**
     * Check if there it's a previous page.
     */
    hasPrevious(): boolean;
    /**
     * Check if there it's a next page.
     */
    hasNext(): boolean;
    /**
     * Check if a certain page exist in the collection.
     */
    hasPage(page: number): boolean;
    /**
     * Check if there aren't any values to build pages.
     */
    isEmpty(): boolean;
    /**
     * Check if the action search can be called.
     */
    isSearchEnabled(): boolean;
    /**
     * Go to a certain page.
     */
    jump(page?: number): this;
    /**
     * Set the id.
     */
    setId(id: string): this;
    /**
     * Set the page.
     */
    setPage(index: number): this;
    /**
     * Set the limit of values per page.
     */
    setLimit(limit: number): this;
    /**
     * Set the limit of values per page.
     */
    setValues(...values: ValueType[]): this;
    /**
     * Add more values.
     */
    addValues(...values: ValueType[]): this;
    /**
     * Apply a filter for values.
     */
    setFilter(callback: filterFunction<ValueType>): this;
    /**
     * Sort the values.
     */
    setSort(callback: sortFunction<ValueType>): this;
    /**
     * Set a display format.
     */
    setDisplayFormat(callback: displayFormatFunction<ValueType, DisplayType>): this;
    /**
     * Set a filter format.
     */
    setFilterFormat(callback: filterFormatFunction<ValueType, DisplayType>): this;
    /**
     * Set a search format.
     */
    setSearchFormat(callback: searchFormatFunction<ValueType, DisplayType>): this;
    /**
     * Set a message to display whenever the page it's empty format.
     */
    setEmptyMessage(message: string): this;
    /**
     * Set a message to display whenever the value it's unfounded.
     */
    setUnfoundMessage(message: string): this;
    display(options: {
        callback?: (pages: ValueType[]) => boolean;
        required: true;
        join: string;
    }): string;
    display(options: {
        callback?: (pages: ValueType[]) => boolean;
        required?: boolean;
        join: string;
    }): string;
    display(options: {
        callback?: (pages: ValueType[]) => boolean;
        required: true;
        join?: string;
    }): DisplayType[];
    display(options?: {
        callback?: (pages: ValueType[]) => boolean;
        required?: boolean;
        join?: string;
    }): DisplayType[] | string[];
    filter(options: {
        callback?: (pages: ValueType[]) => boolean;
        required: true;
        join: string;
    }): string;
    filter(options: {
        callback?: (pages: ValueType[]) => boolean;
        required?: boolean;
        join: string;
    }): string;
    filter(options: {
        callback?: (pages: ValueType[]) => boolean;
        required: true;
        join?: string;
    }): DisplayType[];
    filter(options?: {
        callback?: (pages: ValueType[]) => boolean;
        required?: boolean;
        join?: string;
    }): DisplayType[] | string[];
    search(options: {
        callback: (a: ValueType) => boolean;
        required: true;
        join: string;
    }): string;
    search(options: {
        callback: (a: ValueType) => boolean;
        required?: boolean;
        join: string;
    }): string;
    search(options: {
        callback: (a: ValueType) => boolean;
        required: true;
        join?: string;
    }): DisplayType[];
    search(options: {
        callback: (a: ValueType) => boolean;
        required?: boolean;
        join?: string;
    }): DisplayType[] | string[];
    /**
     * Utility method which one get numbers by string passed, the expected return value it's a number
     * @example
     * fruits.resolvePage("Page 1 of 50", 0, true) // 1
     * fruits.resolvePage("Page 1 of 50", 1, true) // 50
     * fruits.resolvePage("Page 1 of 50", 2, true) // Error "Couldn't match any number at that index"
     * fruits.resolvePage("Random string", 777, true) // Error "Couldn't match any number in the string (Random string)"
     */
    resolvePage(content: string, index: number, required: true): number;
    /**
     * Utility method which one get numbers by string passed, the expected return value it's a number of null
     * @example
     * fruits.resolvePage("Page 1 of 50", 0) // 1
     * fruits.resolvePage("Page 1 of 50", 1) // 50
     * fruits.resolvePage("Page 1 of 50", 2) // null
     * fruits.resolvePage("Random string", 777) // null
     */
    resolvePage(content: string, index: number, required?: boolean): number | null;
    /**
     * Utility static method which one get numbers by string passed, the expected return value it's a number
     * @example
     * Pagination.resolvePage("Page 1 of 50", 0, true) // 1
     * Pagination.resolvePage("Page 1 of 50", 1, true) // 50
     * Pagination.resolvePage("Page 1 of 50", 2, true) // Error "Couldn't match any number at that index"
     * Pagination.resolvePage("Random string", 777, true) // Error "Couldn't match any number in the string (Random string)"
     */
    static resolveNumber(content: string, index: number, required: true): number;
    /**
     * Utility static method which one get numbers by string passed, the expected return value it's a number or null
     * @example
     * Pagination.resolvePage("Page 1 of 50", 0) // 1
     * Pagination.resolvePage("Page 1 of 50", 1) // 50
     * Pagination.resolvePage("Page 1 of 50", 2) // null
     * Pagination.resolvePage("Random string", 777) // null
     */
    static resolveNumber(content: string, index: number, required?: boolean): number | null;
}
export {};
