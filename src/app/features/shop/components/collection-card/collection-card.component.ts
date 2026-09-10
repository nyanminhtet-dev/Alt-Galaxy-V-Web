import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopCollection } from '../../models/shop-home.model';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html'
})
export class CollectionCardComponent {
  @Input() collection!: ShopCollection;

  @Output() collectionSelected = new EventEmitter<ShopCollection>();
}
