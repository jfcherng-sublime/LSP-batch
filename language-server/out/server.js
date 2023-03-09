/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLineText = exports.convertLocationsToTextEdits = exports.hasTypedEnter = void 0;
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const rech_ts_commons_1 = require("rech-ts-commons");
const BatchDeclarationFinder_1 = require("./BatchDeclarationFinder");
const BatchReferencesFinder_1 = require("./BatchReferencesFinder");
// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
connection.onInitialize((_params) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            definitionProvider: true,
            referencesProvider: true,
            renameProvider: true,
        }
    };
}));
/**
 * Retrun if the character that has been typed is a enter
 *
 * @param ch
 */
function hasTypedEnter(ch) {
    return ch == "\n";
}
exports.hasTypedEnter = hasTypedEnter;
connection.onInitialized(() => {
    // Register for all configuration changes.
    void connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
});
connection.onDefinition((params) => {
    return new Promise((resolve, reject) => {
        const fullDocument = documents.get(params.textDocument.uri);
        if (fullDocument) {
            const text = fullDocument.getText();
            const word = getLineText(text, params.position.line, params.position.character);
            new BatchDeclarationFinder_1.BatchDeclarationFinder(text)
                .findDeclaration(word, params.textDocument.uri)
                .then((location) => resolve(location))
                .catch(() => resolve(undefined));
        }
        else {
            reject(new node_1.ResponseError(node_1.ErrorCodes.UnknownErrorCode, "Error to find declaration"));
        }
    });
});
connection.onReferences((params) => {
    return new Promise((resolve, reject) => {
        const fullDocument = documents.get(params.textDocument.uri);
        if (fullDocument) {
            const text = fullDocument.getText();
            const word = getLineText(text, params.position.line, params.position.character);
            new BatchReferencesFinder_1.BatchReferencesFinder(text)
                .findReferences(word, params.textDocument.uri)
                .then((locations) => resolve(locations))
                .catch(() => reject(undefined));
        }
        else {
            return reject(new node_1.ResponseError(node_1.ErrorCodes.UnknownErrorCode, "Error to find references"));
        }
    });
});
connection.onRenameRequest((params) => {
    return new Promise((resolve, reject) => {
        const fullDocument = documents.get(params.textDocument.uri);
        if (fullDocument) {
            const text = fullDocument.getText();
            const word = getLineText(text, params.position.line, params.position.character);
            new BatchReferencesFinder_1.BatchReferencesFinder(text)
                .findReferences(word, params.textDocument.uri)
                .then((locations) => {
                const textEdits = convertLocationsToTextEdits(locations, word, params.newName);
                resolve({ changes: { [params.textDocument.uri]: textEdits } });
            }).catch(() => resolve(undefined));
        }
        else {
            reject(new node_1.ResponseError(node_1.ErrorCodes.UnknownErrorCode, "Error to rename"));
        }
    });
});
/**
 * Converts the specified Location array into an TextEdit array
 *
 * @param locations locations to be converted
 */
function convertLocationsToTextEdits(locations, oldName, newName) {
    const textEdits = [];
    locations.forEach((currentLocation) => {
        const line = currentLocation.range.start.line;
        const column = currentLocation.range.start.character;
        textEdits.push({
            newText: newName,
            range: node_1.Range.create(node_1.Position.create(line, column), node_1.Position.create(line, column + oldName.length))
        });
    });
    return textEdits;
}
exports.convertLocationsToTextEdits = convertLocationsToTextEdits;
/**
 * Returns the specified line within the document text
 *
 * @param documentText document text
 * @param line line
 * @param column column
 */
function getLineText(documentText, line, column) {
    const currentLine = rech_ts_commons_1.BufferSplitter.split(documentText)[line];
    const batchRegEx = /([a-zA-Z0-9_\-])+/g;
    const word = rech_ts_commons_1.WordFinder.findWordWithRegex(currentLine, column, batchRegEx);
    return word;
}
exports.getLineText = getLineText;
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// Listen on the connection
connection.listen();
// This handler resolve additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item) => {
    return item;
});
//# sourceMappingURL=server.js.map