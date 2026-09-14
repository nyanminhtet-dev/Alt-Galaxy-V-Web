import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { AddShopCartItem, ShopCartLine, ShopCartTotals } from '../models/shop-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {
  private readonly itemsSubject = new BehaviorSubject<ShopCartLine[]>([]);

  readonly items$ = this.itemsSubject.asObservable();
  readonly totals$: Observable<ShopCartTotals> = this.items$.pipe(map(items => this.calculateTotals(items)));
  readonly itemCount$: Observable<number> = this.totals$.pipe(map(totals => totals.itemCount));

  getItems(): Observable<ShopCartLine[]> {
    return this.items$;
  }

  addItem(item: AddShopCartItem): void {
    const quantity = Math.max(item.quantity ?? 1, 1);
    const currentItems = this.itemsSubject.value;
    const existingLine = currentItems.find(line => this.lineKey(line.productId, line.variantId) === this.lineKey(item.product.id, item.variant.id));
    const maxQuantity = this.availableStock(item.variant);

    if (maxQuantity <= 0) {
      return;
    }

    if (existingLine) {
      this.updateQuantity(item.product.id, item.variant.id, existingLine.quantity + quantity);
      return;
    }

    this.itemsSubject.next([
      ...currentItems,
      {
        productId: item.product.id,
        variantId: item.variant.id,
        product: item.product,
        variant: item.variant,
        quantity: Math.min(quantity, maxQuantity)
      }
    ]);
  }

  removeItem(productId: string, variantId: string): void {
    this.itemsSubject.next(
      this.itemsSubject.value.filter(line => this.lineKey(line.productId, line.variantId) !== this.lineKey(productId, variantId))
    );
  }

  updateQuantity(productId: string, variantId: string, quantity: number): void {
    if (quantity < 1) {
      return;
    }

    this.itemsSubject.next(
      this.itemsSubject.value.map(line => {
        if (this.lineKey(line.productId, line.variantId) !== this.lineKey(productId, variantId)) {
          return line;
        }

        return {
          ...line,
          quantity: Math.min(quantity, this.availableStock(line.variant))
        };
      })
    );
  }

  incrementQuantity(productId: string, variantId: string): void {
    const line = this.findLine(productId, variantId);

    if (!line) {
      return;
    }

    this.updateQuantity(productId, variantId, line.quantity + 1);
  }

  decrementQuantity(productId: string, variantId: string): void {
    const line = this.findLine(productId, variantId);

    if (!line || line.quantity <= 1) {
      return;
    }

    this.updateQuantity(productId, variantId, line.quantity - 1);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }

  getItemCount(): number {
    return this.calculateTotals(this.itemsSubject.value).itemCount;
  }

  getSubtotal(): number {
    return this.calculateTotals(this.itemsSubject.value).subtotalMMK;
  }

  getTotal(): number {
    return this.calculateTotals(this.itemsSubject.value).totalMMK;
  }

  private findLine(productId: string, variantId: string): ShopCartLine | undefined {
    return this.itemsSubject.value.find(line => this.lineKey(line.productId, line.variantId) === this.lineKey(productId, variantId));
  }

  private calculateTotals(items: ShopCartLine[]): ShopCartTotals {
    const availableItems = items.filter(item => this.isAvailable(item));
    const subtotalMMK = availableItems.reduce((total, item) => total + item.product.displayPriceMMK * item.quantity, 0);

    return {
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      uniqueItemCount: items.length,
      subtotalMMK,
      totalMMK: subtotalMMK,
      hasUnavailableItems: items.some(item => !this.isAvailable(item))
    };
  }

  private isAvailable(item: ShopCartLine): boolean {
    return item.variant.active && item.variant.stockQty > 0 && item.quantity <= item.variant.stockQty;
  }

  private availableStock(variant: { active: boolean; stockQty: number }): number {
    return variant.active ? Math.max(variant.stockQty, 0) : 0;
  }

  private lineKey(productId: string, variantId: string): string {
    return `${productId}::${variantId}`;
  }
}
