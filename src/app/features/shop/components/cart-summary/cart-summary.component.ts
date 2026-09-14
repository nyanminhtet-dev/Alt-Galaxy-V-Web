import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopCartTotals } from '../../models/shop-cart.model';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent {
  @Input() totals!: ShopCartTotals;

  @Output() checkout = new EventEmitter<void>();

  protected formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }
}
