"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const node_1 = require("vscode-languageclient/node");
const path = __importStar(require("path"));
/**
 * Language Server Provider client
 */
class Client {
    /**
     * Starts the LSP server and establishes communication between them
     */
    static startServerAndEstablishCommunication(context) {
        // The server is implemented in node
        const serverModule = context.asAbsolutePath(path.join('out', 'lsp', 'server.js'));
        // The debug options for the server
        // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
        const debugOptions = { execArgv: ['--nolazy', '--inspect=10999'] };
        // If the extension is launched in debug mode then the debug server options are used
        // Otherwise the run options are used
        const serverOptions = {
            run: { module: serverModule, transport: node_1.TransportKind.ipc },
            debug: {
                module: serverModule,
                transport: node_1.TransportKind.ipc,
                options: debugOptions
            }
        };
        // Options to control the language client
        const clientOptions = {
            // Register the server for Batch documents
            documentSelector: [{ scheme: 'file', language: 'bat' }]
        };
        // Create the language client and start the client.
        Client.client = new node_1.LanguageClient('batchLanguageServer', 'Batch Language Server', serverOptions, clientOptions);
        // Start the client. This will also launch the server
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Client.client.start();
    }
    /**
     * Stops the LSP client if it has ben previously started
     */
    static stopClient() {
        if (!Client.client) {
            return undefined;
        }
        return Client.client.stop();
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map