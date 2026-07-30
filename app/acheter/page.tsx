/* eslint-disable @next/next/no-img-element -- Static GitHub Pages output serves the original optimized assets directly. */
import type { Metadata } from "next";
import Link from "next/link";
import {
  AMAZON_KINDLE_ASIN,
  AMAZON_KINDLE_URL,
  AUTHOR_NAME,
  authorEntity,
  bookEntity,
  breadcrumbJsonLd,
  jsonLd,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_URL,
  websiteEntity,
} from "../seo";
import { SiteFooter, SiteHeader } from "../site-chrome";

const title = "Acheter Héritier de rien — Édition Kindle";
const description =
  "Achetez Héritier de rien, Les petits cailloux du tacot, de Gilbert Myotte. Le livre est disponible au format Kindle sur Amazon.fr.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/acheter/" },
  openGraph: {
    title,
    description,
    url: "/acheter/",
    siteName: SITE_NAME,
    type: "book",
    locale: "fr_FR",
    images: [
      {
        url: SOCIAL_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Héritier de rien, de Gilbert Myotte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SOCIAL_IMAGE_URL],
  },
};

export default function BuyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      authorEntity,
      bookEntity,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/acheter/#webpage`,
        url: `${SITE_URL}/acheter/`,
        name: title,
        description,
        inLanguage: "fr-FR",
        isPartOf: { "@id": websiteEntity["@id"] },
        about: { "@id": bookEntity["@id"] },
        mainEntity: { "@id": bookEntity["@id"] },
      },
      breadcrumbJsonLd("Acheter le livre", "/acheter/"),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <SiteHeader />

      <main id="contenu" className="detail-main">
        <article className="detail-layout purchase-page">
          <div className="detail-copy">
            <nav className="breadcrumbs" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span>Acheter le livre</span>
            </nav>
            <p className="eyebrow">Disponible maintenant · Kindle</p>
            <h1>Acheter Héritier de rien</h1>
            <p className="detail-subtitle">Les petits cailloux du tacot</p>
            <p className="detail-lead">
              Le récit autobiographique de Gilbert Myotte est disponible au
              format Kindle sur Amazon.fr.
            </p>

            <section className="purchase-card" aria-labelledby="kindle-title">
              <p className="eyebrow">Édition numérique</p>
              <h2 id="kindle-title">Format Kindle</h2>
              <p>
                Retrouvez <i>Héritier de rien</i> dans son édition numérique
                officielle. Référence Amazon&nbsp;: {AMAZON_KINDLE_ASIN}.
              </p>
              <a
                className="amazon-link"
                href={AMAZON_KINDLE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir le livre sur Amazon.fr
                <span aria-hidden="true">↗</span>
              </a>
            </section>

            <aside className="paperback-note">
              <p className="eyebrow">À paraître</p>
              <p>
                L’édition papier sera ajoutée ici dès que son URL définitive et
                son ISBN seront disponibles.
              </p>
            </aside>

            <Link className="detail-cta" href="/extrait/">
              Lire un extrait <span aria-hidden="true">→</span>
            </Link>
          </div>

          <figure className="detail-visual">
            <div className="book-object">
              <span className="book-edge" aria-hidden="true" />
              <img
                src="/images/heritier-de-rien-couverture.jpg"
                alt={`Couverture du livre Héritier de rien, Les petits cailloux du tacot, de ${AUTHOR_NAME}`}
                width="1200"
                height="1916"
                fetchPriority="high"
              />
            </div>
            <figcaption>Édition Kindle · Gilbert Myotte</figcaption>
          </figure>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
