const test = require("node:test");
const assert = require("node:assert/strict");

process.env.NODE_ENV = "development";
process.env.JWT_SECRET = "test-secret";
process.env.JWT_EXPIRES_IN = "3600";

const jwt = require("jsonwebtoken");
const models = require("../db/models");
const app = require("../app");

let server;
let baseUrl;

async function csrf() {
  const response = await fetch(`${baseUrl}/api/csrf/restore`);
  const cookies = response.headers.getSetCookie();
  const token = decodeURIComponent(cookies.find((cookie) => cookie.startsWith("XSRF-TOKEN="))).split(";")[0].slice(11);
  return {
    token,
    cookie: cookies.map((cookie) => cookie.split(";")[0]).join("; "),
  };
}

async function mutate(path, method = "POST", body = {}, userId) {
  const { token, cookie } = await csrf();
  const authCookie = userId
    ? `; token=${jwt.sign({ data: { id: userId } }, process.env.JWT_SECRET, { algorithm: "HS256" })}`
    : "";
  return fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      "x-xsrf-token": token,
      cookie: `${cookie}${authCookie}`,
    },
    body: JSON.stringify(body),
  });
}

test.before(() => {
  server = app.listen(0);
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => server.close());

test("every Pokemon, review, and upvote mutation rejects anonymous requests", async () => {
  const requests = [
    mutate("/api/pokemon", "POST", { name: "Ditto", description: "Test" }),
    mutate("/api/pokemon/1", "PUT", { name: "Ditto", description: "Test" }),
    mutate("/api/pokemon/1"),
    mutate("/api/review", "POST", { pokemonId: 1, review: "Test" }),
    mutate("/api/review/1"),
    mutate("/api/upvote", "POST", { pokemonId: 1 }),
    mutate("/api/upvote/delete", "POST", { pokemonId: 1 }),
  ];

  const responses = await Promise.all(requests);
  assert.deepEqual(responses.map(({ status }) => status), Array(7).fill(401));
});

test("mutations derive identity from the session and enforce resource ownership", async () => {
  models.User.scope = () => ({ findByPk: async (id) => ({ id }) });

  const createdFor = [];
  models.Pokemon.create = async (values) => (createdFor.push(values.userId), values);
  models.Review.create = async (values) => (createdFor.push(values.userId), values);
  models.UpVote.create = async (values) => (createdFor.push(values.userId), values);

  const creates = await Promise.all([
    mutate("/api/pokemon", "POST", { userId: 999, name: "Ditto", description: "Test" }, 7),
    mutate("/api/review", "POST", { userId: 999, pokemonId: 1, review: "Test" }, 7),
    mutate("/api/upvote", "POST", { userId: 999, pokemonId: 1 }, 7),
  ]);
  assert.deepEqual(creates.map(({ status }) => status), [200, 200, 200]);
  assert.deepEqual(createdFor, [7, 7, 7]);

  models.Pokemon.findByPk = async () => ({ userId: 8 });
  models.Review.findByPk = async () => ({ userId: 8 });
  const denied = await Promise.all([
    mutate("/api/pokemon/1", "POST", {}, 7),
    mutate("/api/review/1", "POST", {}, 7),
  ]);
  assert.deepEqual(denied.map(({ status }) => status), [403, 403]);

  let deletedWhere;
  models.UpVote.destroy = async ({ where }) => (deletedWhere = where, 1);
  const removed = await mutate("/api/upvote/delete", "POST", { userId: 999, pokemonId: 2 }, 7);
  assert.equal(removed.status, 200);
  assert.deepEqual(deletedWhere, { pokemonId: 2, userId: 7 });
});

test("signup attempts are rate limited", async () => {
  const responses = [];
  for (let attempt = 0; attempt < 6; attempt += 1) {
    responses.push(await mutate("/api/users", "POST", {}));
  }
  assert.deepEqual(responses.map(({ status }) => status), [400, 400, 400, 400, 400, 429]);
});
