import { Location, TextEdit } from "vscode-languageserver/node";
/**
 * Retrun if the character that has been typed is a enter
 *
 * @param ch
 */
export declare function hasTypedEnter(ch: string): boolean;
/**
 * Converts the specified Location array into an TextEdit array
 *
 * @param locations locations to be converted
 */
export declare function convertLocationsToTextEdits(locations: Location[], oldName: string, newName: string): TextEdit[];
/**
 * Returns the specified line within the document text
 *
 * @param documentText document text
 * @param line line
 * @param column column
 */
export declare function getLineText(documentText: string, line: number, column: number): any;
