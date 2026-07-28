import { readdir, readFile, writeFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages-build", `${Date.now()}`);

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://thbdmtt.github.io/", {
    headers: {
      accept: "text/html",
      host: "thbdmtt.github.io",
      "x-forwarded-host": "thbdmtt.github.io",
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

if (!response.ok) {
  throw new Error(`Le rendu du site a échoué avec le statut ${response.status}.`);
}

let html = await response.text();
html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
html = html.replace(
  /<link\b(?=[^>]*\brel=["'](?:modulepreload|preload|stylesheet)["'])[^>]*>/gi,
  "",
);
html = html.replaceAll('src="/images/', 'src="./public/images/');
html = html.replaceAll(
  'content="https://thbdmtt.github.io/og.png"',
  'content="https://thbdmtt.github.io/heritier-de-rien/public/og.png"',
);
html = html.replace(
  "</head>",
  [
    '<link rel="canonical" href="https://thbdmtt.github.io/heritier-de-rien/">',
    '<link rel="stylesheet" href="./github-pages.css">',
    "</head>",
  ].join(""),
);

const closingHtmlIndex = html.lastIndexOf("</html>");
if (closingHtmlIndex === -1) {
  throw new Error("Le document rendu ne contient pas de balise </html>.");
}
html = html.slice(0, closingHtmlIndex + "</html>".length);

const assetsDirectory = new URL("../dist/client/assets/", import.meta.url);
const cssFiles = (await readdir(assetsDirectory)).filter((file) =>
  /^index-[A-Za-z0-9_-]+\.css$/.test(file),
);

if (cssFiles.length !== 1) {
  throw new Error(
    `Une feuille de style était attendue, ${cssFiles.length} ont été trouvées.`,
  );
}

const css = await readFile(new URL(cssFiles[0], assetsDirectory), "utf8");
await Promise.all([
  writeFile(new URL("index.html", projectRoot), `${html}\n`, "utf8"),
  writeFile(new URL("github-pages.css", projectRoot), css, "utf8"),
]);

console.log("Version GitHub Pages générée.");
