import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ProductFilterOption {
  label: string;
  value: string;
  count: number;
}

@Component({
  selector: 'app-product-filter-sidebar',
  templateUrl: './product-filter-sidebar.component.html'
})
export class ProductFilterSidebarComponent {
  @Input() categories: ProductFilterOption[] = [];
  @Input() selectedCategory = 'all';
  @Input() productTypes: ProductFilterOption[] = [];
  @Input() selectedProductTypes: string[] = [];
  @Input() availabilityOptions: ProductFilterOption[] = [];
  @Input() selectedAvailability: string[] = [];
  @Input() specialOptions: ProductFilterOption[] = [];
  @Input() selectedSpecial: string[] = [];
  @Input() maxPrice = 500000;
  @Input() maxPriceLimit = 500000;

  @Output() categorySelected = new EventEmitter<string>();
  @Output() productTypeToggled = new EventEmitter<string>();
  @Output() availabilityToggled = new EventEmitter<string>();
  @Output() specialToggled = new EventEmitter<string>();
  @Output() maxPriceSelected = new EventEmitter<number>();
  @Output() cleared = new EventEmitter<void>();
}
