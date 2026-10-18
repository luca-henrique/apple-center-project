import { PRODUCTS, IPHONE_15_PRO_MAX } from "../model/mock-products";
import type { Product } from "../model/types";

export async function getProducts(): Promise<Product[]> {
  return Promise.resolve(PRODUCTS);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  const product =
    PRODUCTS.find((p) => p.slug.toLowerCase() === normalizedSlug) ||
    PRODUCTS.find((p) => p.id.toLowerCase() === normalizedSlug) ||
    IPHONE_15_PRO_MAX;

  return Promise.resolve(product);
}

export { PRODUCTS, IPHONE_15_PRO_MAX };
