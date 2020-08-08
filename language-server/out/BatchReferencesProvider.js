"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchReferencesProvider = void 0;
const rech_ts_commons_1 = require("rech-ts-commons");
/** Minimum word size */
const MIN_WORD_SIZE = 3;
/**
 * Class which provide references for Batch elements.
 *
 * This class do not have any dependence with VSCode API so
 * unit tests can be run.
 */
class BatchReferencesProvider {
    /**
     * Find the declaration of the term
     *
     * @param text buffer text in which ter will be searched
     * @param term Term to find
     */
    findReferences(text, term) {
        return new Promise((resolve, reject) => {
            // If the word is too small
            if (term.length < MIN_WORD_SIZE) {
                reject();
                return;
            }
            const result = [];
            const regexText = '[\\s\\.\\%\\!\\:\\,\\)\\(](' + term + ')[\\s\\t\\n\\r\\.\\%\\!\\:\\=\\,\\)\\(]';
            const elementUsage = new RegExp(regexText, "img");
            new rech_ts_commons_1.Scan(text).scan(elementUsage, (iterator) => {
                if (!this.shouldIgnoreElement(term, iterator.lineContent, iterator.column)) {
                    result.push({ line: iterator.row, column: iterator.column + 1 });
                }
            });
            resolve(result);
        });
    }
    shouldIgnoreElement(term, lineText, column) {
        const enclosed = this.isEnclosedInQuotes(lineText, column);
        const variable = this.isVariableReference(term, lineText, column);
        return enclosed && !variable;
    }
    isEnclosedInQuotes(lineText, column) {
        let insideQuotes = false;
        for (let i = 0; i < lineText.length && i < column; i++) {
            const currentChar = lineText[i];
            if (currentChar === "\"") {
                insideQuotes = !insideQuotes;
            }
        }
        return insideQuotes;
    }
    isVariableReference(term, lineText, column) {
        if (column == 0 || column == lineText.length) {
            return false;
        }
        const symbols = ["%", "!"];
        let variable = false;
        for (let i = 0; i < symbols.length && !variable; i++) {
            const symbol = symbols[i];
            const indexBeforeElement = column;
            const indexAfterElement = column + term.length + 1;
            if (lineText[indexBeforeElement] == symbol && lineText[indexAfterElement] == symbol) {
                variable = true;
            }
        }
        return variable;
    }
}
exports.BatchReferencesProvider = BatchReferencesProvider;
//# sourceMappingURL=BatchReferencesProvider.js.map