import { ExtensionContext } from 'vscode';
/**
 * Language Server Provider client
 */
export declare class Client {
    /** Client instance of the Language Server Provider (LSP) */
    private static client;
    /**
     * Starts the LSP server and establishes communication between them
     */
    static startServerAndEstablishCommunication(context: ExtensionContext): void;
    /**
     * Stops the LSP client if it has ben previously started
     */
    static stopClient(): Thenable<void> | undefined;
}
