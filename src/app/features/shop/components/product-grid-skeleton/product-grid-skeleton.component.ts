import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-grid-skeleton',
  templateUrl: './product-grid-skeleton.component.html'
})
export class ProductGridSkeletonComponent {
  @Input() count = 12;

  protected get skeletonItems(): number[] {
    return Array.from({ length: this.count }, (_, index) => index);
  }
}
