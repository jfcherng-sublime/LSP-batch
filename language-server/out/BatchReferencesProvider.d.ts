/**
 * Class which provide references for Batch elements.
 *
 * This class do not have any dependence with VSCode API so
 * unit tests can be run.
 */
export declare class BatchReferencesProvider {
    /**
     * Find the declaration of the term
     *
     * @param text buffer text in which ter will be searched
     * @param term Term to find
     */
    findReferences(text: string, term: string): Promise<BatchElementPosition[]>;
    private shouldIgnoreElement;
    private isEnclosedInQuotes;
    private isVariableReference;
}
export interface BatchElementPosition {
    line: number;
    column: number;
}
