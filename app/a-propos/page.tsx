/* eslint-disable @next/next/no-img-element -- Static GitHub Pages output serves the original optimized assets directly. */
import type { Metadata } from "next";
import Link from "next/link";
import {
  authorEntity,
  breadcrumbJsonLd,
  jsonLd,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_URL,
  websiteEntity,
} from "../seo";
import { SiteFooter, SiteHeader } from "../site-chrome";

const title = "Gilbert Myotte, auteur d’Héritier de rien";
const description =
  "Découvrez Gilbert Myotte, auteur d’Héritier de rien, Les petits cailloux du tacot, un récit autobiographique consacré aux vies que l’on raconte peu.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/a-propos/" },
  openGraph: {
    title,
    description,
    url: "/a-propos/",
    siteName: SITE_NAME,
    type: "profile",
    locale: "fr_FR",
    images: [
      {
        url: SOCIAL_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Gilbert Myotte, auteur d’Héritier de rien",
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

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      authorEntity,
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/a-propos/#webpage`,
        url: `${SITE_URL}/a-propos/`,
        name: title,
        description,
        inLanguage: "fr-FR",
        isPartOf: { "@id": websiteEntity["@id"] },
        mainEntity: { "@id": authorEntity["@id"] },
        about: { "@id": authorEntity["@id"] },
      },
      breadcrumbJsonLd("L’auteur", "/a-propos/"),
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
        <article className="detail-layout author-page">
          <figure className="detail-visual portrait-detail">
            <div className="portrait-frame">
              <img
                src="/images/gilbert-myotte-editorial-v2.jpg"
                alt="Portrait de Gilbert Myotte, auteur d’Héritier de rien"
                width="1122"
                height="1402"
                fetchPriority="high"
              />
            </div>
            <figcaption>Gilbert Myotte · Portrait de l’auteur</figcaption>
          </figure>

          <div className="detail-copy">
            <nav className="breadcrumbs" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span>L’auteur</span>
            </nav>
            <p className="eyebrow">L’auteur</p>
            <h1>Gilbert Myotte</h1>
            <p className="detail-subtitle">Raconter les vies que l’on raconte peu.</p>
            <p className="detail-lead">
              Gilbert Myotte est l’auteur d’<i>Héritier de rien</i>,{" "}
              <i>Les petits cailloux du tacot</i>, un récit autobiographique
              brut, sincère et profondément humain.
            </p>
            <p>
              Pendant des années, il a porté cette histoire par bribes&nbsp;:
              des images, des scènes, des souvenirs revenant toujours au même
              endroit. Il pensait que ce n’était pas une histoire, seulement
              une vie ordinaire parmi d’autres.
            </p>
            <blockquote>
              «&nbsp;Puis j’ai compris que c’était précisément là le problème.
              On ne raconte pas assez ces vies-là.&nbsp;»
            </blockquote>
            <p>
              Son livre regarde en face une existence construite sans
              raccourci&nbsp;: l’enfance modeste, le travail, les chutes et la
              nécessité de recommencer. Il donne une place aux travailleurs de
              l’ombre, aux familles sans appuis et à celles et ceux qui ont dû
              tout apprendre par eux-mêmes.
            </p>
            <a className="detail-cta" href="/le-livre/">
              Découvrir Héritier de rien <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
