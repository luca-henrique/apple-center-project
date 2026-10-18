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

export default async function ProductDetailPage({ params }: ProductPageProps) {
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
