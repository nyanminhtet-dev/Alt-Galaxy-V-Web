import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ShopCartLine, ShopCartTotals } from '../../models/shop-cart.model';
import { ShopCartService } from '../../services/shop-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  protected readonly items$: Observable<ShopCartLine[]> = this.shopCartService.items$;
  protected readonly totals$: Observable<ShopCartTotals> = this.shopCartService.totals$;

  constructor(private readonly shopCartService: ShopCartService) { }

  protected incrementQuantity(item: ShopCartLine): void {
    this.shopCartService.incrementQuantity(item.productId, item.variantId);
  }

  protected decrementQuantity(item: ShopCartLine): void {
    this.shopCartService.decrementQuantity(item.productId, item.variantId);
  }

  protected removeItem(item: ShopCartLine): void {
    this.shopCartService.removeItem(item.productId, item.variantId);
  }

  protected clearCart(): void {
    this.shopCartService.clearCart();
  }

  protected handleCheckoutIntent(): void {
    console.info('Checkout requested. Checkout is not implemented yet.');
  }
}
