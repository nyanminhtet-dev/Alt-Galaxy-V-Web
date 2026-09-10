import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductVariant, ShopProduct } from '../../models/shop-home.model';
import { ProductFilterOption } from '../product-filter-sidebar/product-filter-sidebar.component';

@Component({
  selector: 'app-product-browser',
  templateUrl: './product-browser.component.html'
})
export class ProductBrowserComponent {
  @Input() products: ShopProduct[] = [];

  @Output() addToCart = new EventEmitter<{ product: ShopProduct; variant: ProductVariant }>();
  @Output() wishlist = new EventEmitter<ShopProduct>();

  protected readonly productTypes: ProductFilterOption[] = [
    { label: 'Physical', value: 'physical', count: 110 },
    { label: 'Digital', value: 'digital', count: 18 }
  ];
  protected readonly availabilityOptions: ProductFilterOption[] = [
    { label: 'In stock', value: 'in-stock', count: 78 },
    { label: 'Low stock', value: 'low-stock', count: 50 },
    { label: 'Sold out', value: 'sold-out', count: 12 }
  ];
  protected readonly categories: ProductFilterOption[] = [
    { label: 'All', value: 'all', count: 126 },
    { label: 'Apparel & Merchandise', value: 'apparel-and-merchandise', count: 64 },
    { label: 'Digital', value: 'digital', count: 18 },
    { label: 'Accessories', value: 'accessories', count: 22 },
    { label: 'Collectibles', value: 'collectibles', count: 12 }
  ];
  protected selectedCategory = 'all';
  protected selectedProductTypes: string[] = [];
  protected selectedAvailability: string[] = [];
  protected selectedSpecial: string[] = [];
  protected sort = 'featured';

  protected get filteredProducts(): ShopProduct[] {
    const products = this.products.filter(product => {
      const categoryMatches = this.selectedCategory === 'all' || this.toValue(product.category) === this.selectedCategory;
      const typeMatches = this.selectedProductTypes.length === 0 || this.selectedProductTypes.includes(this.toValue(product.productType));
      const availabilityMatches = this.selectedAvailability.length === 0 || this.selectedAvailability.includes(product.availability);

      return categoryMatches && typeMatches && availabilityMatches;
    });

    return [...products].sort((a, b) => {
      if (this.sort === 'price-low') {
        return a.displayPriceMMK - b.displayPriceMMK;
      }

      if (this.sort === 'price-high') {
        return b.displayPriceMMK - a.displayPriceMMK;
      }

      return 0;
    });
  }

  protected selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  protected updateSort(sort: string): void {
    this.sort = sort;
  }

  protected toggleProductType(productType: string): void {
    this.selectedProductTypes = this.toggleValue(this.selectedProductTypes, productType);
  }

  protected toggleAvailability(availability: string): void {
    this.selectedAvailability = this.toggleValue(this.selectedAvailability, availability);
  }

  protected clearFilters(): void {
    this.selectedCategory = 'all';
    this.selectedProductTypes = [];
    this.selectedAvailability = [];
    this.selectedSpecial = [];
    this.sort = 'featured';
  }

  private toggleValue(values: string[], value: string): string[] {
    return values.includes(value)
      ? values.filter(item => item !== value)
      : [...values, value];
  }

  private toValue(value: string): string {
    return value.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
  }
}
