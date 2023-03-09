"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchDeclarationFinder = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const rech_ts_commons_1 = require("rech-ts-commons");
/**
 * Class to find Batch declarations
 */
class BatchDeclarationFinder {
    /**
     * Constructor of Find
     *
     * @param buffer editor text
     */
    constructor(buffer) {
        this.buffer = buffer;
    }
    /**
     * Find the declaration of the term
     *
     * @param label label declaration to find
     * @param uri current source uri
     */
    findDeclaration(label, uri) {
        return new Promise((resolve, reject) => {
            const regexText = "^\\:" + label + "$";
            const regex = new RegExp(regexText, "gm");
            let declaration = undefined;
            new rech_ts_commons_1.Scan(this.buffer).scan(regex, (iterator) => {
                const firstCharRange = vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(iterator.row, 1), vscode_languageserver_1.Position.create(iterator.row, 1));
                declaration = vscode_languageserver_1.Location.create(uri, firstCharRange);
                iterator.stop();
            });
            if (declaration) {
                return resolve(declaration);
            }
            else {
                return reject();
            }
        });
    }
}
exports.BatchDeclarationFinder = BatchDeclarationFinder;
//# sourceMappingURL=BatchDeclarationFinder.js.map