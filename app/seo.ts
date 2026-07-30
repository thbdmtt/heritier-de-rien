export const SITE_URL = "https://www.gilbertmyotte.fr";
export const SITE_NAME = "Héritier de rien";
export const BOOK_TITLE = "Héritier de rien";
export const BOOK_SUBTITLE = "Les petits cailloux du tacot";
export const AUTHOR_NAME = "Gilbert Myotte";
export const SOCIAL_IMAGE_URL = `${SITE_URL}/public/og.png`;
export const FAVICON_URL = `${SITE_URL}/public/favicon.png`;
export const COVER_IMAGE_URL =
  `${SITE_URL}/public/images/heritier-de-rien-couverture.jpg`;
export const AUTHOR_IMAGE_URL =
  `${SITE_URL}/public/images/gilbert-myotte-editorial-v2.jpg`;

export const homeDescription =
  "Découvrez Héritier de rien, Les petits cailloux du tacot, le récit autobiographique de Gilbert Myotte, et lisez un extrait du prologue.";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const authorEntity = {
  "@type": "Person",
  "@id": `${SITE_URL}/a-propos/#gilbert-myotte`,
  name: AUTHOR_NAME,
  url: `${SITE_URL}/a-propos/`,
  image: AUTHOR_IMAGE_URL,
  description:
    "Gilbert Myotte est l’auteur du récit autobiographique Héritier de rien, Les petits cailloux du tacot.",
};

export const bookEntity = {
  "@type": "Book",
  "@id": `${SITE_URL}/le-livre/#livre`,
  name: BOOK_TITLE,
  alternateName: `${BOOK_TITLE} — ${BOOK_SUBTITLE}`,
  url: `${SITE_URL}/le-livre/`,
  image: COVER_IMAGE_URL,
  description:
    "Le récit autobiographique de Gilbert Myotte, une vie construite sans raccourci et sans filet.",
  inLanguage: "fr-FR",
  author: { "@id": authorEntity["@id"] },
};

export const websiteEntity = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: `${BOOK_TITLE} — ${AUTHOR_NAME}`,
  inLanguage: "fr-FR",
  author: { "@id": authorEntity["@id"] },
};

export function breadcrumbJsonLd(
  currentName: string,
  currentPath: string,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: currentName,
        item: absoluteUrl(currentPath),
      },
    ],
  };
}
