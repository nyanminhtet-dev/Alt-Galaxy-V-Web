import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopCartLine } from '../../models/shop-cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  @Input() item!: ShopCartLine;

  @Output() increment = new EventEmitter<ShopCartLine>();
  @Output() decrement = new EventEmitter<ShopCartLine>();
  @Output() remove = new EventEmitter<ShopCartLine>();

  protected get lineTotal(): number {
    return this.item.product.displayPriceMMK * this.item.quantity;
  }

  protected get canDecrement(): boolean {
    return this.item.quantity > 1;
  }

  protected get canIncrement(): boolean {
    return this.item.variant.active && this.item.quantity < this.item.variant.stockQty;
  }

  protected get stockLabel(): string {
    if (!this.item.variant.active || this.item.variant.stockQty <= 0) {
      return 'Currently unavailable';
    }

    if (this.item.variant.stockQty <= 2) {
      return `Only ${this.item.variant.stockQty} left`;
    }

    return 'In stock';
  }

  protected get stockClass(): string {
    if (!this.item.variant.active || this.item.variant.stockQty <= 0) {
      return 'text-red-300';
    }

    return this.item.variant.stockQty <= 2 ? 'text-amber-300' : 'text-emerald-300';
  }

  protected formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }
}
