import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages-build", `${Date.now()}`);
const productionOrigin = "https://www.gilbertmyotte.fr";

const { default: worker } = await import(workerUrl.href);

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const context = {
  waitUntil() {},
  passThroughOnException() {},
};

async function fetchFromWorker(path, accept) {
  let requestPath = path;
  let response;

  for (let redirectCount = 0; redirectCount < 3; redirectCount += 1) {
    response = await worker.fetch(
      new Request(`${productionOrigin}${requestPath}`, {
        headers: {
          accept,
          host: "www.gilbertmyotte.fr",
          "x-forwarded-host": "www.gilbertmyotte.fr",
          "x-forwarded-proto": "https",
        },
      }),
      environment,
      context,
    );

    if (response.status < 300 || response.status >= 400) {
      break;
    }

    const location = response.headers.get("location");
    if (!location) {
      break;
    }
    requestPath = new URL(location, productionOrigin).pathname;
  }

  if (!response.ok) {
    throw new Error(
      `Le rendu de ${path} a échoué avec le statut ${response.status}.`,
    );
  }

  return response.text();
}

async function renderPage(path, outputPath) {
  let html = await fetchFromWorker(path, "text/html");
  const structuredDataScripts = [];

  html = html.replace(
    /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi,
    (script) => {
      const placeholder = `SEO_STRUCTURED_DATA_${structuredDataScripts.length}`;
      structuredDataScripts.push(script);
      return placeholder;
    },
  );
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  html = html.replace(
    /<link\b(?=[^>]*\brel=["'](?:modulepreload|preload|stylesheet)["'])[^>]*>/gi,
    "",
  );
  html = html.replaceAll('src="/images/', 'src="/public/images/');
  html = html.replace(
    "</head>",
    '<link rel="stylesheet" href="/github-pages.css"></head>',
  );

  structuredDataScripts.forEach((script, index) => {
    html = html.replace(`SEO_STRUCTURED_DATA_${index}`, script);
  });

  const closingHtmlIndex = html.lastIndexOf("</html>");
  if (closingHtmlIndex === -1) {
    throw new Error(`Le document ${path} ne contient pas de balise </html>.`);
  }

  html = html.slice(0, closingHtmlIndex + "</html>".length);
  const outputUrl = new URL(outputPath, projectRoot);
  await mkdir(new URL("./", outputUrl), { recursive: true });
  await writeFile(outputUrl, `${html}\n`, "utf8");
}

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
  renderPage("/", "index.html"),
  renderPage("/le-livre", "le-livre/index.html"),
  renderPage("/extrait", "extrait/index.html"),
  renderPage("/a-propos", "a-propos/index.html"),
  fetchFromWorker("/robots.txt", "text/plain").then((content) =>
    writeFile(new URL("robots.txt", projectRoot), content, "utf8"),
  ),
  fetchFromWorker("/sitemap.xml", "application/xml").then((content) =>
    writeFile(new URL("sitemap.xml", projectRoot), content, "utf8"),
  ),
  writeFile(new URL("github-pages.css", projectRoot), css, "utf8"),
]);

console.log("Version GitHub Pages SEO générée.");
