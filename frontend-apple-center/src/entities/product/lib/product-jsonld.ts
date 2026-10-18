import type { Product } from "../model/types";

export function generateProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://applecenter.com.br/produto/${product.slug}#product`,
        name: product.name,
        image: product.galleryImages?.map((img) => img.url) || [product.imageUrl],
        description: product.imageAlt,
        brand: {
          "@type": "Brand",
          name: "Apple",
        },
        offers: {
          "@type": "Offer",
          price: product.pricePix,
          priceCurrency: "BRL",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          itemCondition: product.isNew
            ? "https://schema.org/NewCondition"
            : "https://schema.org/RefurbishedCondition",
          seller: {
            "@type": "Organization",
            name: "Apple Center",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "142",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: "https://applecenter.com.br",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.name,
            item: `https://applecenter.com.br/produto/${product.slug}`,
          },
        ],
      },
    ],
  };
}
