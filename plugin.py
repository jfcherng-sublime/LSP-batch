import os
from lsp_utils import NpmClientHandler


def plugin_loaded():
    LspBatchPlugin.setup()


def plugin_unloaded():
    LspBatchPlugin.cleanup()


class LspBatchPlugin(NpmClientHandler):
    package_name = __package__
    server_directory = 'language-server'
    server_binary_path = os.path.join(server_directory, 'out', 'server.js')
