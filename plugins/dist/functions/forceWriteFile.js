"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceWriteFileSync = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Force a file creation even if the directory doesn't exist.
 * @param dir The directory.
 * @param data The data to write.
 * @param options The write file options.
 */
function forceWriteFileSync(dir, data, options) {
    const folders = dir.split(path_1.sep).slice(0, -1);
    if (folders.length) {
        folders.reduce((last, folder) => {
            const folderPath = last ? last + path_1.sep + folder : folder;
            if (!(0, fs_1.existsSync)(folderPath)) {
                (0, fs_1.mkdirSync)(folderPath);
            }
            return folderPath;
        });
    }
    (0, fs_1.writeFileSync)(dir, data, options);
}
exports.forceWriteFileSync = forceWriteFileSync;
