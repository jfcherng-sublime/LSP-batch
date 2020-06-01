import { Location } from "vscode-languageserver";
/**
 * Class to find Batch references
 */
export declare class BatchReferencesFinder {
    /** Editor text*/
    private text;
    /**
     * Constructor of Find
     *
     * @param editor
     */
    constructor(text: string);
    /**
     * Find the declaration of the term
     *
     * @param term Term to find
     * @param uri current source uri
     */
    findReferences(term: string, uri: string): Promise<Location[]>;
}
