"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductBySlug } from "./product-api";
import type { Product } from "../model/types";

export const PRODUCT_QUERY_KEYS = {
  all: ["products"] as const,
  bySlug: (slug: string) => ["products", "slug", slug] as const,
};

export function useProducts(initialData?: Product[]) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.all,
    queryFn: getProducts,
    initialData,
    initialDataUpdatedAt: 0,
  });
}

export function useProductBySlug(slug: string, initialData?: Product) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.bySlug(slug),
    queryFn: () => getProductBySlug(slug),
    initialData,
    initialDataUpdatedAt: 0,
    enabled: Boolean(slug),
  });
}
