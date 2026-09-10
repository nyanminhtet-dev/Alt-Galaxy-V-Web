import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopCategory } from '../../models/shop-home.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {
  @Input() category!: ShopCategory;

  @Output() categorySelected = new EventEmitter<ShopCategory>();
}
