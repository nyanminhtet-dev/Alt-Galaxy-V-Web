import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopHeroSlide } from '../../models/shop-home.model';

@Component({
  selector: 'app-shop-hero',
  templateUrl: './shop-hero.component.html'
})
export class ShopHeroComponent {
  @Input() slide!: ShopHeroSlide;

  @Output() ctaSelected = new EventEmitter<void>();
}
