"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringBuilder = void 0;
/**
 * Create a dynamic string.
 * @example
 * const content = new StringBuilder("Hummmm...")
 * if (1 + 1 === 2) content.update("it's true!", ", ")
 * console.log(content.toString()) // "Hummmm..., it's true!"
 */
class StringBuilder {
    constructor(content) {
        this.content = content ?? "";
    }
    /**
     * Update the content.
     * @param {string} content The string to add.
     * @param {?string} separator The separator in order to join at the content.
     */
    update(content, separator) {
        this.content = this.content.length
            ? `${this.content}${separator ?? ""}${content}`
            : content;
        return this;
    }
    /**
     * Display the formatted content.
     */
    toString() {
        return this.content;
    }
}
exports.StringBuilder = StringBuilder;
