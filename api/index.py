import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from server import app as fastapi_app  # noqa: E402


class EnsureApiPrefix:
    """Vercel rewrites /api/* -> /api/index and may strip the /api prefix.

    FastAPI routes live under /api, so restore that prefix when missing.
    """

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] in ("http", "websocket"):
            path = scope.get("path") or "/"
            if path.startswith("/api/index"):
                rest = path[len("/api/index") :] or "/"
                if not rest.startswith("/"):
                    rest = "/" + rest
                path = "/api" + ("" if rest == "/" else rest)
                if rest == "/":
                    path = "/api/"
                scope = dict(scope)
                scope["path"] = path
            elif not path.startswith("/api"):
                scope = dict(scope)
                scope["path"] = "/api" + (path if path.startswith("/") else "/" + path)
        await self.app(scope, receive, send)


app = EnsureApiPrefix(fastapi_app)
