import type { Metadata } from "next";
import Link from "next/link";
import {
  authorEntity,
  bookEntity,
  breadcrumbJsonLd,
  jsonLd,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_URL,
  websiteEntity,
} from "../seo";
import { LinkArrow } from "../link-arrow";
import { SiteFooter, SiteHeader } from "../site-chrome";

const title = "Lire un extrait d’Héritier de rien — Gilbert Myotte";
const description =
  "Lisez gratuitement l’ouverture du prologue d’Héritier de rien, le récit autobiographique de Gilbert Myotte : « Je viens d’un monde où l’on parlait peu. »";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/extrait/" },
  openGraph: {
    title,
    description,
    url: "/extrait/",
    siteName: SITE_NAME,
    type: "article",
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

export default function ExcerptPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      authorEntity,
      bookEntity,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/extrait/#webpage`,
        url: `${SITE_URL}/extrait/`,
        name: title,
        description,
        inLanguage: "fr-FR",
        isPartOf: { "@id": websiteEntity["@id"] },
        about: { "@id": bookEntity["@id"] },
        mainEntity: {
          "@type": "CreativeWork",
          "@id": `${SITE_URL}/extrait/#prologue`,
          name: "Prologue — Héritier de rien",
          url: `${SITE_URL}/extrait/`,
          inLanguage: "fr-FR",
          isPartOf: { "@id": bookEntity["@id"] },
          author: bookEntity.author,
        },
      },
      breadcrumbJsonLd("Lire un extrait", "/extrait/"),
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

      <main id="contenu" className="detail-main detail-main-dark">
        <article className="reading-page">
          <nav className="breadcrumbs" aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span>Extrait</span>
          </nav>
          <header className="reading-header">
            <div>
              <p className="eyebrow">Extrait gratuit · Prologue</p>
              <h1>Lire un extrait d’Héritier de rien</h1>
            </div>
            <p>
              Voici l’ouverture du prologue du récit autobiographique de
              Gilbert Myotte.
            </p>
          </header>

          <div className="reading-body">
            <p className="reading-opening">
              Je viens d’un monde où l’on parlait peu.
            </p>
            <p className="first-paragraph">
              Pas par élégance. Pas par sagesse. Par nécessité. Parce que, chez
              nous, les mots coûtaient plus cher que le silence et servaient
              moins souvent.
            </p>
            <p>
              J’ai vécu mon adolescence dans un petit appartement où l’air
              semblait toujours lesté de quelque chose de lourd, d’invisible,
              une gravité ancienne qui se déposait sur les meubles, sur les
              corps, sur les repas, sur les soirs.
            </p>
            <p>
              À table, on ne parlait ni de vocation, ni de projets, ni de ces
              grands lendemains qui fleurissent dans les familles sûres
              d’elles-mêmes. On parlait surtout de ce qu’il fallait faire pour
              tenir. Tenir le mois. Tenir au travail. Tenir debout quand même.
              Chez nous, la vie n’était pas une promesse. C’était une manière
              de résister sans bruit.
            </p>
            <span className="end-mark" aria-hidden="true">
              ●
            </span>
          </div>

          <footer className="reading-footer">
            <p>Héritier de rien · Les petits cailloux du tacot</p>
            <a className="detail-cta" href="/le-livre/">
              Découvrir le livre <LinkArrow />
            </a>
          </footer>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
