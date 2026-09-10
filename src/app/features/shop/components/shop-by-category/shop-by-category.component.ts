import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopCategory } from '../../models/shop-home.model';

@Component({
  selector: 'app-shop-by-category',
  templateUrl: './shop-by-category.component.html'
})
export class ShopByCategoryComponent {
  @Input() categories: ShopCategory[] = [];

  @Output() categorySelected = new EventEmitter<ShopCategory>();
}
