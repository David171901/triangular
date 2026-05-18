import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const metadataBase =
  siteUrl && URL.canParse(siteUrl) ? new URL(siteUrl) : undefined;

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: {
    default:
      "Triangular | Agencia digital: diseño web, apps, UX/UI y estrategia",
    template: "%s | Triangular",
  },
  description:
    "Unimos ingeniería, publicidad y UX/UI para impulsar tu marca: diseño y desarrollo web, apps, identidad visual, SEO/SEM y campañas. Potencia tu presencia digital.",
  keywords: [
    "Triangular",
    "agencia digital",
    "diseño web",
    "desarrollo web",
    "UX/UI",
    "aplicaciones móviles",
    "branding",
    "estrategia digital",
    "SEO",
    "SEM",
    "identidad visual",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  applicationName: "Triangular",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistMono.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link href="https://fonts.cdnfonts.com/css/geometos" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/axiforma" rel="stylesheet" />
      </head>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
