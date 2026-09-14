import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductVariant, ShopProduct } from '../../models/shop-home.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product!: ShopProduct;

  @Output() addToCart = new EventEmitter<{ product: ShopProduct; variant: ProductVariant }>();
  @Output() wishlist = new EventEmitter<ShopProduct>();
  @Output() variantSelected = new EventEmitter<{ product: ShopProduct; variant: ProductVariant }>();
  @Output() viewProduct = new EventEmitter<ShopProduct>();

  protected selectedVariant?: ProductVariant;

  protected get activeVariant(): ProductVariant | undefined {
    return this.selectedVariant ?? this.product.variants.find(variant => variant.defaultVariant) ?? this.product.variants[0];
  }

  protected get available(): boolean {
    return this.product.availability !== 'sold-out' && Boolean(this.activeVariant?.active && this.activeVariant.stockQty > 0);
  }

  protected get availabilityLabel(): string {
    const labels: Record<ShopProduct['availability'], string> = {
      'in-stock': 'In stock',
      'low-stock': 'Low stock',
      'sold-out': 'Sold out'
    };

    return labels[this.product.availability];
  }

  protected selectVariant(variant: ProductVariant): void {
    if (!variant.active || variant.stockQty === 0) {
      return;
    }

    this.selectedVariant = variant;
    this.variantSelected.emit({ product: this.product, variant });
  }

  protected get canViewProduct(): boolean {
    return this.viewProduct.observed;
  }

  protected requestViewProduct(): void {
    if (!this.canViewProduct) {
      return;
    }

    this.viewProduct.emit(this.product);
  }

  protected handleCardSpace(event: Event): void {
    if (!this.canViewProduct) {
      return;
    }

    event.preventDefault();
    this.requestViewProduct();
  }

  protected requestAddToCart(): void {
    if (!this.activeVariant || !this.available) {
      return;
    }

    this.addToCart.emit({ product: this.product, variant: this.activeVariant });
  }

  protected formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }
}
