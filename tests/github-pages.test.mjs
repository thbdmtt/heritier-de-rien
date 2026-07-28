import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

test("génère une page GitHub Pages autonome et responsive", async () => {
  const [html, css] = await Promise.all([
    readFile(new URL("index.html", projectRoot), "utf8"),
    readFile(new URL("github-pages.css", projectRoot), "utf8"),
    access(new URL("public/images/heritier-de-rien-couverture.jpg", projectRoot)),
    access(new URL("public/images/gilbert-myotte-editorial-v2.jpg", projectRoot)),
    access(new URL("public/og.png", projectRoot)),
  ]);

  assert.match(html, /<title>Héritier de rien — Gilbert Myotte<\/title>/);
  assert.match(html, /On ne choisit pas d’où l’on vient\./);
  assert.match(html, /src="\.\/public\/images\/heritier-de-rien-couverture\.jpg"/);
  assert.match(html, /src="\.\/public\/images\/gilbert-myotte-editorial-v2\.jpg"/);
  assert.match(html, /href="\.\/github-pages\.css"/);
  assert.match(
    html,
    /https:\/\/thbdmtt\.github\.io\/heritier-de-rien\/public\/og\.png/,
  );
  assert.doesNotMatch(html, /<script\b|codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, />Bientôt\.</);

  assert.match(css, /@media\s*\(width<=760px\)/);
  assert.match(css, /@media\s*\(width<=440px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
