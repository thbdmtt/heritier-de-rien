export const SITE_URL = "https://www.gilbertmyotte.fr";
export const SITE_NAME = "Héritier de rien";
export const BOOK_TITLE = "Héritier de rien";
export const BOOK_SUBTITLE = "Les petits cailloux du tacot";
export const AUTHOR_NAME = "Gilbert Myotte";

export const PAPERBACK_ISBN = "979-8191453774";
export const AMAZON_KINDLE_ASIN = "B0HC34G72D";

export const AMAZON_PAPERBACK_URL =
  "https://amzn.eu/d/0cmSNNIJ";

export const AMAZON_KINDLE_URL =
  `https://www.amazon.fr/dp/${AMAZON_KINDLE_ASIN}`;

export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61589753998177";

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
    "Gilbert Myotte est l’auteur d’Héritier de rien, Les petits cailloux du tacot, un récit autobiographique brut, sincère et profondément humain.",
  jobTitle: "Auteur",
  sameAs: [FACEBOOK_URL],
};

export const bookEntity = {
  "@type": "Book",
  "@id": `${SITE_URL}/le-livre/#livre`,
  name: BOOK_TITLE,
  alternateName: `${BOOK_TITLE} — ${BOOK_SUBTITLE}`,
  alternativeHeadline: BOOK_SUBTITLE,
  url: `${SITE_URL}/le-livre/`,
  image: COVER_IMAGE_URL,
  description:
    "Héritier de rien, Les petits cailloux du tacot : le récit autobiographique de Gilbert Myotte.",
  inLanguage: "fr-FR",
  genre: "Autobiographie",
  author: { "@id": authorEntity["@id"] },

  sameAs: [
    AMAZON_PAPERBACK_URL,
    AMAZON_KINDLE_URL,
  ],

  workExample: [
    {
      "@type": "Book",
      "@id": `${SITE_URL}/le-livre/#edition-brochee`,
      name: `${BOOK_TITLE} — ${BOOK_SUBTITLE}, édition brochée`,
      bookFormat: "https://schema.org/Paperback",
      inLanguage: "fr-FR",
      isbn: PAPERBACK_ISBN,
      url: `${SITE_URL}/acheter/`,
      sameAs: AMAZON_PAPERBACK_URL,
      author: { "@id": authorEntity["@id"] },
    },
    {
      "@type": "Book",
      "@id": `${SITE_URL}/le-livre/#edition-kindle`,
      name: `${BOOK_TITLE} — ${BOOK_SUBTITLE}, édition Kindle`,
      bookFormat: "https://schema.org/EBook",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/acheter/`,
      sameAs: AMAZON_KINDLE_URL,
      identifier: {
        "@type": "PropertyValue",
        propertyID: "ASIN",
        value: AMAZON_KINDLE_ASIN,
      },
      author: { "@id": authorEntity["@id"] },
    },
  ],
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