import { ProductVariant, ShopProduct } from './shop-home.model';

export interface ShopCartLine {
  productId: string;
  variantId: string;
  quantity: number;
  product: ShopProduct;
  variant: ProductVariant;
}

export interface AddShopCartItem {
  product: ShopProduct;
  variant: ProductVariant;
  quantity?: number;
}

export interface ShopCartTotals {
  itemCount: number;
  uniqueItemCount: number;
  subtotalMMK: number;
  totalMMK: number;
  hasUnavailableItems: boolean;
}
