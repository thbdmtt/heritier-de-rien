import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

test("génère une page GitHub Pages autonome et responsive", async () => {
  const [html, bookHtml, excerptHtml, aboutHtml, robots, sitemap, css] =
    await Promise.all([
    readFile(new URL("index.html", projectRoot), "utf8"),
    readFile(new URL("le-livre/index.html", projectRoot), "utf8"),
    readFile(new URL("extrait/index.html", projectRoot), "utf8"),
    readFile(new URL("a-propos/index.html", projectRoot), "utf8"),
    readFile(new URL("robots.txt", projectRoot), "utf8"),
    readFile(new URL("sitemap.xml", projectRoot), "utf8"),
    readFile(new URL("github-pages.css", projectRoot), "utf8"),
    access(new URL("public/images/heritier-de-rien-couverture.jpg", projectRoot)),
    access(new URL("public/images/gilbert-myotte-editorial-v2.jpg", projectRoot)),
    access(new URL("public/og.png", projectRoot)),
    access(new URL("public/favicon.png", projectRoot)),
  ]);

  assert.match(html, /<title>Héritier de rien — Gilbert Myotte<\/title>/);
  assert.match(html, /On ne choisit pas d’où l’on vient\./);
  assert.match(html, /src="\/public\/images\/heritier-de-rien-couverture\.jpg"/);
  assert.match(html, /src="\/public\/images\/gilbert-myotte-editorial-v2\.jpg"/);
  assert.match(html, /href="\/github-pages\.css"/);
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
    /https:\/\/www\.gilbertmyotte\.fr\/public\/og\.png/,
  );
  assert.match(
    html,
    /<link rel="icon" href="https:\/\/www\.gilbertmyotte\.fr\/public\/favicon\.png"/,
  );
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(html, /"@type":"Book"/);
  assert.match(html, /"@type":"Person"/);
  assert.doesNotMatch(
    html,
    /<script\b(?![^>]*type="application\/ld\+json")|codex-preview|react-loading-skeleton/i,
  );
  assert.doesNotMatch(html, /thbdmtt\.github\.io/);
  assert.doesNotMatch(html, />Bientôt\.</);

  assert.match(
    bookHtml,
    /<link rel="canonical" href="https:\/\/www\.gilbertmyotte\.fr\/le-livre\/"/,
  );
  assert.match(bookHtml, /Héritier de rien, le livre — Gilbert Myotte/);
  assert.match(
    excerptHtml,
    /<link rel="canonical" href="https:\/\/www\.gilbertmyotte\.fr\/extrait\/"/,
  );
  assert.match(excerptHtml, /Lire un extrait d’Héritier de rien/);
  assert.match(
    aboutHtml,
    /<link rel="canonical" href="https:\/\/www\.gilbertmyotte\.fr\/a-propos\/"/,
  );
  assert.match(aboutHtml, /"@type":"ProfilePage"/);

  assert.match(robots, /^User-Agent: \*\nAllow: \//);
  assert.match(
    robots,
    /Sitemap: https:\/\/www\.gilbertmyotte\.fr\/sitemap\.xml/,
  );
  for (const path of ["/", "/le-livre/", "/extrait/", "/a-propos/"]) {
    assert.ok(
      sitemap.includes(`<loc>https://www.gilbertmyotte.fr${path}</loc>`),
    );
  }

  assert.match(css, /@media\s*\(width<=760px\)/);
  assert.match(css, /@media\s*\(width<=440px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
