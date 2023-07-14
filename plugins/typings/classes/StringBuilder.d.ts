/**
 * Create a dynamic string.
 * @example
 * const content = new StringBuilder("Hummmm...")
 * if (1 + 1 === 2) content.update("it's true!", ", ")
 * console.log(content.toString()) // "Hummmm..., it's true!"
 */
export declare class StringBuilder {
    private content;
    constructor(content?: string);
    /**
     * Update the content.
     * @param {string} content The string to add.
     * @param {?string} separator The separator in order to join at the content.
     */
    update(content: string, separator?: string): this;
    /**
     * Display the formatted content.
     */
    toString(): string;
}
