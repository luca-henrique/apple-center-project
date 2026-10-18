import type { Metadata } from "next";
import { PRODUCTS } from "@/entities/product";
import { StorefrontPage } from "@/widgets/storefront";

export const metadata: Metadata = {
  title: "Início | Apple Center - iPhones Seminovos com 1 Ano de Garantia",
  description:
    "Compre iPhones seminovos e novos certificados em laboratório Apple Center. Bateria garantida 90%+, laudo técnico de 35 etapas, 1 ano de garantia total e parcelamento em 12x.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Apple Center | iPhones Seminovos com 1 Ano de Garantia",
    description:
      "Aparelhos rigorosamente inspecionados em laboratório com bateria 90%+, laudo técnico oficial e garantia de 1 ano. Confira nossas ofertas exclusivas.",
    url: "/",
    siteName: "Apple Center",
    images: [
      {
        url: PRODUCTS[0].imageUrl,
        width: 1200,
        height: 630,
        alt: "iPhone 15 Pro Titânio Natural - Apple Center",
      },
    ],
  },
};

export default function Home() {
  // JSON-LD Structured Data for Google SEO & Discover
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Store",
        "@id": "https://applecenter.com.br/#store",
        name: "Apple Center",
        url: "https://applecenter.com.br",
        description:
          "Especialistas em iPhones novos e seminovos certificados com 1 ano total de garantia e laudo técnico com +35 testes.",
        image: PRODUCTS[0].imageUrl,
        priceRange: "$$$",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "15420",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "ItemList",
        itemListElement: PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name,
            image: product.imageUrl,
            description: product.imageAlt,
            brand: {
              "@type": "Brand",
              name: "Apple",
            },
            offers: {
              "@type": "Offer",
              price: product.pricePix,
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              priceValidUntil: "2026-12-31",
              itemCondition: product.isNew
                ? "https://schema.org/NewCondition"
                : "https://schema.org/RefurbishedCondition",
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Semantic H1 for SEO Crawler Heading Hierarchy */}
      <h1 className="sr-only">
        Apple Center - iPhones Novos e Seminovos Certificados com 1 Ano de Garantia
      </h1>

      <StorefrontPage initialProducts={PRODUCTS} />
    </>
  );
}
