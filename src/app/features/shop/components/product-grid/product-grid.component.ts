import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductVariant, ShopProduct } from '../../models/shop-home.model';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html'
})
export class ProductGridComponent {
  @Input() products: ShopProduct[] = [];

  @Output() addToCart = new EventEmitter<{ product: ShopProduct; variant: ProductVariant }>();
  @Output() wishlist = new EventEmitter<ShopProduct>();
}
