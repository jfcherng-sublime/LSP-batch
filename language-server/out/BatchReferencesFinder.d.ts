import { Location } from "vscode-languageserver";
/**
 * Class to find Batch references
 */
export declare class BatchReferencesFinder {
    private text;
    /**
     * Constructor of Find
     *
     * @param text editor text
     */
    constructor(text: string);
    /**
     * Find the declaration of the term
     *
     * @param term Term to find
     * @param uri current source uri
     */
    findReferences(term: string, uri: string): Promise<Location[]>;
    private convertBatchPositionsToLocations;
}
