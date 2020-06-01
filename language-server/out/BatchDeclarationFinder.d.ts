import { Location } from "vscode-languageserver";
/**
 * Class to find Batch declarations
 */
export declare class BatchDeclarationFinder {
    /** Editor text*/
    private buffer;
    /**
     * Constructor of Find
     *
     * @param buffer
     */
    constructor(buffer: string);
    /**
     * Find the declaration of the term
     *
     * @param label label declaration to find
     * @param uri current source uri
     */
    findDeclaration(label: string, uri: string): Promise<Location>;
}
