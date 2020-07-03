"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchReferencesFinder = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const BatchReferencesProvider_1 = require("./BatchReferencesProvider");
/** Minimum word size */
const MIN_WORD_SIZE = 3;
/**
 * Class to find Batch references
 */
class BatchReferencesFinder {
    /**
     * Constructor of Find
     *
     * @param editor editor text
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
            new BatchReferencesProvider_1.BatchReferencesProvider()
                .findReferences(this.text, term)
                .then((positions) => {
                const result = this.convertBatchPositionsToLocations(positions, uri);
                resolve(result);
            })
                .catch(() => reject());
        });
    }
    convertBatchPositionsToLocations(positions, uri) {
        const result = [];
        positions.forEach(position => {
            const range = vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(position.line, position.column), vscode_languageserver_1.Position.create(position.line, position.column));
            result.push({ uri: uri, range: range });
        });
        return result;
    }
}
exports.BatchReferencesFinder = BatchReferencesFinder;
//# sourceMappingURL=BatchReferencesFinder.js.map