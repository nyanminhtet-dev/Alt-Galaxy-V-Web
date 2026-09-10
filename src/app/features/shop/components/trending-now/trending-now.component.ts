import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductVariant, ShopProduct } from '../../models/shop-home.model';

@Component({
  selector: 'app-trending-now',
  templateUrl: './trending-now.component.html'
})
export class TrendingNowComponent {
  @Input() products: ShopProduct[] = [];

  @Output() addToCart = new EventEmitter<{ product: ShopProduct; variant: ProductVariant }>();
  @Output() wishlist = new EventEmitter<ShopProduct>();
}
