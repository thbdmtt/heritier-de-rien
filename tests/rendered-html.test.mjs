import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://www.gilbertmyotte.fr${path}`, {
      headers: {
        accept: "text/html",
        host: "www.gilbertmyotte.fr",
        "x-forwarded-host": "www.gilbertmyotte.fr",
        "x-forwarded-proto": "https",
      },
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
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/www\.gilbertmyotte\.fr\/"/,
  );
  assert.match(
    html,
    /<meta property="og:url" content="https:\/\/www\.gilbertmyotte\.fr\/"/,
  );
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/www\.gilbertmyotte\.fr\/public\/og\.png"/,
  );
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(html, /"@type":"Book"/);
  assert.match(html, /"@type":"Person"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("rend des pages éditoriales avec des métadonnées uniques", async () => {
  const cases = [
    {
      path: "/le-livre",
      canonical: "https://www.gilbertmyotte.fr/le-livre/",
      marker: "Héritier de rien, le livre — Gilbert Myotte",
    },
    {
      path: "/extrait",
      canonical: "https://www.gilbertmyotte.fr/extrait/",
      marker: "Lire un extrait d’Héritier de rien",
    },
    {
      path: "/a-propos",
      canonical: "https://www.gilbertmyotte.fr/a-propos/",
      marker: "Gilbert Myotte, auteur d’Héritier de rien",
    },
  ];

  for (const { path, canonical, marker } of cases) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`));
    assert.match(html, new RegExp(marker));
    assert.match(html, /<script type="application\/ld\+json">/);
  }
});

test("publie robots.txt et sitemap.xml sur le domaine canonique", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
  ]);
  const [robots, sitemap] = await Promise.all([
    robotsResponse.text(),
    sitemapResponse.text(),
  ]);

  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /User-Agent: \*/);
  assert.match(
    robots,
    /Sitemap: https:\/\/www\.gilbertmyotte\.fr\/sitemap\.xml/,
  );
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemap, /https:\/\/www\.gilbertmyotte\.fr\/le-livre\//);
  assert.match(sitemap, /https:\/\/www\.gilbertmyotte\.fr\/extrait\//);
  assert.match(sitemap, /https:\/\/www\.gilbertmyotte\.fr\/a-propos\//);
});
