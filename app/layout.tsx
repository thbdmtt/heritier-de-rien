import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  AUTHOR_NAME,
  FAVICON_URL,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_URL,
  homeDescription,
} from "./seo";

const title = "Héritier de rien — Gilbert Myotte";
const socialDescription =
  "On ne choisit pas d’où l’on vient. Le récit autobiographique de Gilbert Myotte.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description: homeDescription,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR_NAME, url: "/a-propos/" }],
  creator: AUTHOR_NAME,
  category: "Livres",
  icons: {
    icon: [{ url: FAVICON_URL, type: "image/png", sizes: "192x192" }],
    apple: [{ url: FAVICON_URL, type: "image/png", sizes: "192x192" }],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description: socialDescription,
    url: "/",
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
    description: socialDescription,
    images: [SOCIAL_IMAGE_URL],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3efe6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
