import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#f7f9fb",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://applecenter.com.br"),
  title: {
    default: "Apple Center | iPhones Seminovos Certificados com 1 Ano de Garantia",
    template: "%s | Apple Center",
  },
  description:
    "Compre iPhones seminovos e novos certificados com 1 ano total de garantia, bateria auditada 90%+ e laudo técnico com +35 testes. Simule seu Trade-in e parcele em até 12x sem juros.",
  keywords: [
    "Apple Center",
    "iPhone Seminovo",
    "iPhone 15 Pro",
    "iPhone 15",
    "iPhone 14 Pro",
    "Trade-in iPhone",
    "iPhone com Garantia",
    "Apple Certificado",
  ],
  authors: [{ name: "Apple Center" }],
  creator: "Apple Center",
  publisher: "Apple Center",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Apple Center",
    title: "Apple Center | iPhones Seminovos Certificados com 1 Ano de Garantia",
    description:
      "Aparelhos revisados em laboratório técnico com bateria garantida de 90%+ a 100%, laudo pericial e 1 ano total de garantia. Entrega expressa com seguro.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb1lGv6PT4SNbr4v2qMu0hkeLc2GrpGTT75m4A1t6zkcz1ysTMVGFGQ4Jn2u51Zw830Rr-WLe--OZaj8uH8XezLUKnzDGqy3_n-DPLLsvK62NcxIOLvKUSmurCBZI89ZLFlffxhPS-r7CAq_jdK7LAHJU46OpERERiRu0flSN_1FyNMpSp_SpJI72b3ZkZrsQ4xAOBSgyVm_32yhNZgWBV3xjx321DgnDqGN16Zi8gg6U3MNs2144HoQ",
        width: 1200,
        height: 630,
        alt: "Apple Center - iPhones Seminovos Certificados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Center | iPhones Seminovos Certificados",
    description: "iPhones com 1 ano de garantia, laudo técnico de 35 etapas e entrega com seguro.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBb1lGv6PT4SNbr4v2qMu0hkeLc2GrpGTT75m4A1t6zkcz1ysTMVGFGQ4Jn2u51Zw830Rr-WLe--OZaj8uH8XezLUKnzDGqy3_n-DPLLsvK62NcxIOLvKUSmurCBZI89ZLFlffxhPS-r7CAq_jdK7LAHJU46OpERERiRu0flSN_1FyNMpSp_SpJI72b3ZkZrsQ4xAOBSgyVm_32yhNZgWBV3xjx321DgnDqGN16Zi8gg6U3MNs2144HoQ",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-surface text-on-surface antialiased flex flex-col min-h-screen selection:bg-secondary-container selection:text-on-secondary-container`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
