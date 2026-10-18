export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductStorageOption {
  label: string;
  badge?: string;
  disabled?: boolean;
  priceDiff: number;
}

export interface InspectionItem {
  icon: string;
  title: string;
  status: string;
}

export interface ProductGalleryImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  slug: string;
  conditionTag: string;
  gradeTag: string;
  batteryHealth: string;
  storage: string;
  color: string;
  warranty: string;
  pricePix: number;
  pricePixFormatted: string;
  pixDiscountBadge: string;
  installmentTimes: number;
  installmentValueFormatted: string;
  imageUrl: string;
  imageAlt: string;
  isNew?: boolean;
  galleryImages?: ProductGalleryImage[];
  colors?: ProductColor[];
  storages?: ProductStorageOption[];
  inspections?: InspectionItem[];
  co2Saved?: string;
}
