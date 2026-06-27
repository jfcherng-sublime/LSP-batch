from __future__ import annotations

from pathlib import Path
from typing import final

from LSP.plugin import LspPlugin
from LSP.plugin import OnPreStartContext
from lsp_utils import NodeManager
from sublime_lib import ResourcePath
from typing_extensions import override


@final
class LspBatchPlugin(LspPlugin):
    @classmethod
    @override
    def on_pre_start_async(cls, context: OnPreStartContext) -> None:
        package_name = cls.plugin_storage_path.name
        NodeManager.on_pre_start_async(
            context,
            cls.plugin_storage_path,
            ResourcePath("Packages", package_name, "language-server"),
            Path("out", "server.js"),
            node_version_requirement=">=18",
        )


def plugin_loaded() -> None:
    """Executed when this plugin is loaded."""
    LspBatchPlugin.register()


def plugin_unloaded() -> None:
    """Executed when this plugin is unloaded."""
    LspBatchPlugin.unregister()
