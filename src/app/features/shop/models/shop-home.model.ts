export interface ShopHeroSlide {
  id: string;
  collectionLabel: string;
  headline: string;
  description: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
}

export interface ShopCollection {
  id: string;
  name: string;
  productCount: number;
  image: string;
  imageAlt: string;
}

export interface ShopCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorCode?: string;
  stockQty: number;
  active: boolean;
  defaultVariant: boolean;
}

export interface ShopProduct {
  id: string;
  slug?: string;
  title: string;
  category: string;
  productType: string;
  description?: string;
  image: string;
  images?: string[];
  imageAlt: string;
  displayPriceMMK: number;
  featherCost: number;
  variants: ProductVariant[];
  badge?: string;
  availability: 'in-stock' | 'low-stock' | 'sold-out';
}

export interface ShopCatalogProduct extends ShopProduct {
  createdRank: number;
  popularity: number;
  special: string[];
}

export interface ShopBenefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
