const express = require("express");

const router = express.Router();

// Recover a router's mount path from the regexp Express 4 compiles for it,
// e.g. /^\/users\/?(?=\/|$)/i becomes "/users". Express 4 keeps no plain string.
function mountPath(layer) {
  return layer.regexp.source
    .replace(/^\^/, "")
    .replace(/\\\/\?\(\?=\\\/\|\$\)$/, "")
    .replace(/\\\//g, "/");
}

function routeEndpoints(route, prefix) {
  const path = `${prefix}${route.path === "/" ? "" : route.path}` || "/";

  return Object.keys(route.methods)
    .filter((method) => route.methods[method])
    .map((method) => ({ method: method.toUpperCase(), path }));
}

// Walks the Express 4 router stack. `_router` is internal and is removed in
// Express 5; tests/docs.test.js fails if this stops finding routes.
function listEndpoints(app) {
  const endpoints = [];

  for (const layer of app._router.stack) {
    if (layer.route) {
      endpoints.push(...routeEndpoints(layer.route, ""));
    } else if (layer.name === "router") {
      const prefix = mountPath(layer);
      for (const child of layer.handle.stack) {
        if (child.route) {
          endpoints.push(...routeEndpoints(child.route, prefix));
        }
      }
    }
  }

  return endpoints.sort(
    (a, b) => a.path.localeCompare(b.path) || a.method.localeCompare(b.method)
  );
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPage(endpoints) {
  const rows = endpoints
    .map(({ method, path }) => {
      const verb = escapeHtml(method);
      return `<tr><td><span class="verb ${verb.toLowerCase()}">${verb}</span></td><td><code>${escapeHtml(path)}</code></td></tr>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>API endpoints</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 2rem auto; max-width: 40rem; padding: 0 1rem; color: #1f2933; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border-bottom: 1px solid #e4e7eb; padding: 0.5rem; text-align: left; }
  .verb { background: #52606d; border-radius: 4px; color: #fff; display: inline-block; font-size: 0.8rem; font-weight: 600; min-width: 4rem; padding: 0.15rem 0.4rem; text-align: center; }
  .get { background: #1a6fb5; }
  .post { background: #1b7f4b; }
  .put, .patch { background: #a35c00; }
  .delete { background: #b42318; }
</style>
</head>
<body>
<h1>API endpoints</h1>
<table>
<thead><tr><th>Verb</th><th>Path</th></tr></thead>
<tbody>
${rows}
</tbody>
</table>
<p>Also available as <a href="/docs/json">JSON</a>.</p>
</body>
</html>
`;
}

// GET /docs — HTML page listing every endpoint
router.get("/", (req, res) => {
  res.type("html").send(renderPage(listEndpoints(req.app)));
});

// GET /docs/json — the same list as JSON
router.get("/json", (req, res) => {
  res.json(listEndpoints(req.app));
});

module.exports = router;
