import { Component, Input } from '@angular/core';

import { ShopBenefit } from '../../models/shop-home.model';

@Component({
  selector: 'app-shop-benefits',
  templateUrl: './shop-benefits.component.html'
})
export class ShopBenefitsComponent {
  @Input() benefits: ShopBenefit[] = [];
}
