/* eslint-disable @next/next/no-img-element -- Static GitHub Pages output serves the original optimized assets directly. */
import type { Metadata } from "next";
import Link from "next/link";
import {
  AUTHOR_NAME,
  bookEntity,
  breadcrumbJsonLd,
  COVER_IMAGE_URL,
  jsonLd,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_URL,
  websiteEntity,
} from "../seo";
import { SiteFooter, SiteHeader } from "../site-chrome";

const title = "Héritier de rien, le livre — Gilbert Myotte";
const description =
  "Découvrez Héritier de rien, Les petits cailloux du tacot, le récit autobiographique sincère de Gilbert Myotte sur une vie construite sans filet.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/le-livre/" },
  openGraph: {
    title,
    description,
    url: "/le-livre/",
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

export default function BookPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      bookEntity,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/le-livre/#webpage`,
        url: `${SITE_URL}/le-livre/`,
        name: title,
        description,
        inLanguage: "fr-FR",
        isPartOf: { "@id": websiteEntity["@id"] },
        about: { "@id": bookEntity["@id"] },
        mainEntity: { "@id": bookEntity["@id"] },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: COVER_IMAGE_URL,
        },
      },
      breadcrumbJsonLd("Le livre", "/le-livre/"),
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
        <article className="detail-layout">
          <div className="detail-copy">
            <nav className="breadcrumbs" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span>Le livre</span>
            </nav>
            <p className="eyebrow">Le livre · Récit autobiographique</p>
            <h1>Héritier de rien</h1>
            <p className="detail-subtitle">Les petits cailloux du tacot</p>
            <p className="detail-lead">
              <i>Héritier de rien</i> est le récit sans détour d’un homme qui
              regarde sa vie en face.
            </p>
            <p>
              Gilbert est né dans le fracas d’un orage, dans une maison de
              garde-barrière secouée par le vent. Son père partait travailler
              avant l’aube. Sa mère tenait la maison comme on tient une digue.
              Autour de lui, rien n’était donné&nbsp;: ni les codes, ni les
              appuis, ni la promesse d’un avenir plus doux.
            </p>
            <p>
              Alors il a appris seul. À l’école, dans les ateliers, à l’armée,
              sur les routes, dans l’effort et dans la fatigue. Il a connu les
              humiliations, les silences, les accidents, les corps usés trop
              tôt, les maladies qui surgissent lorsque l’on croit avoir déjà
              tout encaissé.
            </p>
            <p>
              Cette autobiographie brute, sincère et profondément humaine
              raconte une France discrète&nbsp;: celle des travailleurs de
              l’ombre, des familles modestes, des enfances sans protection et
              des existences construites sans filet. Elle ne cherche ni à
              embellir, ni à régler des comptes.
            </p>
            <p>
              Elle raconte ce que coûte une vie quand il faut tout apprendre
              par soi-même, tomber, se relever, recommencer, et prouver sans
              cesse que l’on a sa place.
            </p>
            <a className="detail-cta" href="/extrait/">
              Lire un extrait du prologue <span aria-hidden="true">→</span>
            </a>
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
            <figcaption>Récit autobiographique · Gilbert Myotte</figcaption>
          </figure>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
