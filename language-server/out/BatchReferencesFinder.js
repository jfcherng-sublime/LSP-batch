"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchReferencesFinder = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const rech_ts_commons_1 = require("rech-ts-commons");
/** Minimum word size */
const MIN_WORD_SIZE = 3;
/**
 * Class to find Batch references
 */
class BatchReferencesFinder {
    /**
     * Constructor of Find
     *
     * @param editor
     */
    constructor(text) {
        this.text = text;
    }
    /**
     * Find the declaration of the term
     *
     * @param term Term to find
     * @param uri current source uri
     */
    findReferences(term, uri) {
        return new Promise((resolve, reject) => {
            // If the word is too small
            if (term.length < MIN_WORD_SIZE) {
                reject();
                return;
            }
            let result = [];
            const regexText = '[\\s\\.\\%\\!\\:\\,\\)\\(](' + term + ')[\\s\\t\\n\\r\\.\\%\\!\\:\\=\\,\\)\\(]';
            const elementUsage = new RegExp(regexText, "img");
            new rech_ts_commons_1.Scan(this.text).scan(elementUsage, (iterator) => {
                const range = vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(iterator.row, iterator.column + 1), vscode_languageserver_1.Position.create(iterator.row, iterator.column + 1));
                result.push({ uri: uri, range: range });
            });
            resolve(result);
        });
    }
}
exports.BatchReferencesFinder = BatchReferencesFinder;
//# sourceMappingURL=BatchReferencesFinder.js.map