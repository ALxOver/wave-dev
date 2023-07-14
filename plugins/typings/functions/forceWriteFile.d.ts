/// <reference types="node" />
/// <reference types="node" />
import { WriteFileOptions } from "fs";
/**
 * Force a file creation even if the directory doesn't exist.
 * @param dir The directory.
 * @param data The data to write.
 * @param options The write file options.
 */
export declare function forceWriteFileSync(dir: string, data: string | NodeJS.ArrayBufferView, options?: WriteFileOptions): void;
