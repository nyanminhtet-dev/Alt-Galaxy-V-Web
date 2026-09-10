import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopCollection } from '../../models/shop-home.model';

@Component({
  selector: 'app-featured-collections',
  templateUrl: './featured-collections.component.html'
})
export class FeaturedCollectionsComponent {
  @Input() collections: ShopCollection[] = [];

  @Output() collectionSelected = new EventEmitter<ShopCollection>();
}
