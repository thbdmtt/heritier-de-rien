import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("rend la page éditoriale en français", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="fr"/i);
  assert.match(html, /<title>Héritier de rien — Gilbert Myotte<\/title>/i);
  assert.match(html, /On ne choisit pas d’où l’on vient\./);
  assert.match(html, /Je viens d’un monde où l’on parlait peu\./);
  assert.match(html, /Gilbert Myotte, auteur d’Héritier de rien/);
  assert.match(html, /<meta property="og:image" content="http:\/\/localhost:3000\/og\.png"/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
