import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PRODUCTS,
  getProductBySlug,
  IPHONE_15_PRO_MAX,
  generateProductJsonLd,
} from "@/entities/product";
import { ProductDetailView } from "@/widgets/product-detail/ui/product-detail-view";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = (await getProductBySlug(slug)) || IPHONE_15_PRO_MAX;

  if (!product) {
    return {
      title: "Produto não encontrado | Apple Center",
    };
  }

  const title = `${product.name} ${product.storage} ${product.color} | Apple Center`;
  const description = `Compre ${product.name} ${product.conditionTag} com ${product.warranty} de garantia, laudo pericial de 32 etapas e ${product.batteryHealth}. Por apenas ${product.pricePixFormatted} no Pix ou 12x sem juros.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/produto/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/produto/${product.slug}`,
      siteName: "Apple Center",
      type: "website",
      images: [
        {
          url: product.imageUrl,
          width: 1200,
          height: 1200,
          alt: product.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.imageUrl],
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-[32px] text-secondary animate-spin">
              refresh
            </span>
            <p className="font-label-md text-label-md text-on-surface-variant">
              Carregando dados do aparelho...
            </p>
          </div>
        </div>
      }
    >
      <ProductDetailContent params={params} />
    </Suspense>
  );
}

async function ProductDetailContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = generateProductJsonLd(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} />
    </>
  );
}
