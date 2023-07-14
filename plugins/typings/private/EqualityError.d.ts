import { DifferenceErrorOptions, TypeErrorOptions } from "..";
export declare class EqualityError implements DifferenceErrorOptions {
    message: string;
    first: any;
    second: any;
    constructor(options: DifferenceErrorOptions);
}
export declare class DeprecationError {
    message: string;
    target: any;
    constructor(options: {
        message: string;
        target: any;
    });
}
export declare class TypeError {
    message: string;
    target: string | null | undefined;
    constructor(options: TypeErrorOptions);
}
