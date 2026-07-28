import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Héritier de rien — Gilbert Myotte",
  description:
    "Héritier de rien, Les petits cailloux du tacot : le récit autobiographique de Gilbert Myotte.",
  authors: [{ name: "Gilbert Myotte" }],
  openGraph: {
    title: "Héritier de rien — Gilbert Myotte",
    description:
      "On ne choisit pas d’où l’on vient. Le récit autobiographique de Gilbert Myotte.",
    type: "book",
    locale: "fr_FR",
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
