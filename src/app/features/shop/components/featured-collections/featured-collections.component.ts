import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopCollection } from '../../models/shop-home.model';

@Component({
  selector: 'app-featured-collections',
  templateUrl: './featured-collections.component.html'
})
export class FeaturedCollectionsComponent {
  @Input() collections: ShopCollection[] = [];

  @Output() collectionSelected = new EventEmitter<ShopCollection>();

  protected get featuredCollection(): ShopCollection | undefined {
    return this.collections[0];
  }

  protected get secondaryCollections(): ShopCollection[] {
    return this.collections.slice(1, 3);
  }

  protected collectionDescription(index: number): string {
    const descriptions = [
      'A cinematic drop built around standout pieces, fan moments, and limited-edition merch.',
      'Curated essentials with a darker seasonal mood and polished fandom energy.',
      'Icons, moments, and collectible pieces made to stay close.'
    ];

    return descriptions[index] ?? 'Curated merchandise selected for the YG Fandom community.';
  }
}
