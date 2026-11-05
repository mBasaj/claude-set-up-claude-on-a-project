const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../server");

test("GET /docs/json lists every endpoint with its verb", async () => {
  const res = await request(app).get("/docs/json");

  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(res.body, [
    { method: "GET", path: "/docs" },
    { method: "GET", path: "/docs/json" },
    { method: "GET", path: "/health" },
    { method: "GET", path: "/users" },
    { method: "POST", path: "/users" },
    { method: "GET", path: "/users/:id" },
  ]);
});

test("GET /docs returns an HTML page listing the endpoints", async () => {
  const res = await request(app).get("/docs");

  assert.strictEqual(res.status, 200);
  assert.match(res.headers["content-type"], /text\/html/);
  assert.match(res.text, /\/users\/:id/);
  assert.match(res.text, /POST/);
});
