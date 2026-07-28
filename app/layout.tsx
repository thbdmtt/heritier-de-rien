import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Héritier de rien — Gilbert Myotte";
const description =
  "Héritier de rien, Les petits cailloux du tacot : le récit autobiographique de Gilbert Myotte.";
const socialDescription =
  "On ne choisit pas d’où l’on vient. Le récit autobiographique de Gilbert Myotte.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0];
  const host = forwardedHost ?? requestHeaders.get("host") ?? "localhost:3000";
  const forwardedProtocol = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0];
  const protocol =
    forwardedProtocol ?? (host.includes("localhost") ? "http" : "https");
  const ogImage = new URL("/og.png", `${protocol}://${host}`).toString();

  return {
    title,
    description,
    authors: [{ name: "Gilbert Myotte" }],
    openGraph: {
      title,
      description: socialDescription,
      type: "book",
      locale: "fr_FR",
      images: [
        {
          url: ogImage,
          width: 1731,
          height: 909,
          alt: "Héritier de rien, de Gilbert Myotte",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
      images: [ogImage],
    },
  };
}

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
