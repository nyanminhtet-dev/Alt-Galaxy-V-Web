import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ProductFilterOption } from '../../components/product-filter-sidebar/product-filter-sidebar.component';
import { ProductVariant, ShopCatalogProduct, ShopProduct } from '../../models/shop-home.model';
import { ShopProductService } from '../../services/shop-product.service';

type CatalogSort = 'featured' | 'newest' | 'popular' | 'price-low' | 'price-high';
type CatalogAvailability = ShopProduct['availability'];

interface CatalogQuery {
  search: string;
  category: string;
  productTypes: string[];
  availability: CatalogAvailability[];
  special: string[];
  maxPrice: number;
  sort: CatalogSort;
  page: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
  protected readonly pageSize = 12;
  protected readonly maxPriceLimit = 500000;
  protected readonly categoryTabs: ProductFilterOption[] = [
    { label: 'All', value: 'all', count: 72 },
    { label: 'Apparel', value: 'apparel', count: 24 },
    { label: 'Accessories', value: 'accessories', count: 18 },
    { label: 'Collectibles', value: 'collectibles', count: 16 },
    { label: 'Digital', value: 'digital', count: 14 }
  ];
  protected readonly productTypeOptions: ProductFilterOption[] = [
    { label: 'Jerseys', value: 'jerseys', count: 8 },
    { label: 'T-Shirts', value: 't-shirts', count: 10 },
    { label: 'Hoodies', value: 'hoodies', count: 6 },
    { label: 'Hats', value: 'hats', count: 8 },
    { label: 'Bags', value: 'bags', count: 6 },
    { label: 'Photocards', value: 'photocards', count: 12 },
    { label: 'Figures', value: 'figures', count: 4 },
    { label: 'Digital Goods', value: 'digital-goods', count: 14 }
  ];
  protected readonly availabilityOptions: ProductFilterOption[] = [
    { label: 'In Stock', value: 'in-stock', count: 58 },
    { label: 'Pre-order', value: 'low-stock', count: 14 }
  ];
  protected readonly specialOptions: ProductFilterOption[] = [
    { label: 'New Arrival', value: 'new', count: 12 },
    { label: 'Best Seller', value: 'best-seller', count: 10 },
    { label: 'Limited Edition', value: 'limited', count: 8 },
    { label: 'Exclusive', value: 'exclusive', count: 6 }
  ];

  protected query: CatalogQuery = this.defaultQuery();
  protected searchInput = '';
  protected loading = true;
  protected loadError = false;

  private readonly destroy$ = new Subject<void>();
  private allProducts: ShopCatalogProduct[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly shopProductService: ShopProductService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.query = this.queryFromParams(params);
        this.searchInput = this.query.search;
      });

    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected get filteredProducts(): ShopCatalogProduct[] {
    const search = this.query.search.trim().toLowerCase();
    const filtered = this.allProducts.filter(product => {
      const matchesSearch =
        !search ||
        product.title.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.productType.toLowerCase().includes(search);
      const matchesCategory = this.query.category === 'all' || this.categoryValue(product.category) === this.query.category;
      const matchesType = this.query.productTypes.length === 0 || this.query.productTypes.includes(this.typeValue(product.productType));
      const matchesAvailability = this.query.availability.length === 0 || this.query.availability.includes(product.availability);
      const matchesSpecial = this.query.special.length === 0 || this.query.special.some(value => product.special.includes(value));
      const matchesPrice = product.displayPriceMMK <= this.query.maxPrice;

      return matchesSearch && matchesCategory && matchesType && matchesAvailability && matchesSpecial && matchesPrice;
    });

    return this.sortProducts(filtered);
  }

  protected get pagedProducts(): ShopProduct[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  protected get totalProducts(): number {
    return this.filteredProducts.length;
  }

  protected get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalProducts / this.pageSize));
  }

  protected get currentPage(): number {
    return Math.min(this.query.page, this.totalPages);
  }

  protected get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1).slice(0, 5);
  }

  protected get resultStart(): number {
    return this.totalProducts === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  protected get resultEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalProducts);
  }

  protected get shopEmpty(): boolean {
    return !this.loading && !this.loadError && this.allProducts.length === 0;
  }

  protected get filteredEmpty(): boolean {
    return !this.loading && !this.loadError && this.allProducts.length > 0 && this.filteredProducts.length === 0;
  }

  protected get showProducts(): boolean {
    return !this.loading && !this.loadError && this.pagedProducts.length > 0;
  }

  protected retryLoadProducts(): void {
    this.loadProducts();
  }

  protected updateSearch(search: string): void {
    this.updateQuery({ search: search.trim(), page: 1 });
  }

  protected selectCategory(category: string): void {
    this.updateQuery({ category, page: 1 });
  }

  protected toggleProductType(productType: string): void {
    this.updateQuery({ productTypes: this.toggleValue(this.query.productTypes, productType), page: 1 });
  }

  protected toggleAvailability(availability: string): void {
    this.updateQuery({ availability: this.toggleValue(this.query.availability, availability as CatalogAvailability), page: 1 });
  }

  protected toggleSpecial(special: string): void {
    this.updateQuery({ special: this.toggleValue(this.query.special, special), page: 1 });
  }

  protected updateMaxPrice(maxPrice: number): void {
    this.updateQuery({ maxPrice, page: 1 });
  }

  protected updateSort(sort: string): void {
    this.updateQuery({ sort: sort as CatalogSort, page: 1 });
  }

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.updateQuery({ page });
  }

  protected clearFilters(): void {
    this.updateQuery(this.defaultQuery());
  }

  protected handleAddToCart(event: { product: ShopProduct; variant: ProductVariant }): void {
    console.info('Add to cart requested', event.product.id, event.variant.id);
  }

  protected handleWishlist(product: ShopProduct): void {
    console.info('Wishlist requested', product.id);
  }

  private loadProducts(): void {
    this.loading = true;
    this.loadError = false;

    this.shopProductService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: products => {
          this.allProducts = products;
          this.loading = false;
        },
        error: () => {
          this.allProducts = [];
          this.loading = false;
          this.loadError = true;
        }
      });
  }

  private updateQuery(next: Partial<CatalogQuery>): void {
    const query = { ...this.query, ...next };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.queryParamsFromState(query)
    });
  }

  private queryFromParams(params: ParamMap): CatalogQuery {
    return {
      search: params.get('search') ?? '',
      category: params.get('category') ?? 'all',
      productTypes: this.listParam(params, 'type'),
      availability: this.listParam(params, 'availability') as CatalogAvailability[],
      special: this.listParam(params, 'special'),
      maxPrice: this.numberParam(params, 'maxPrice', this.maxPriceLimit),
      sort: this.sortParam(params.get('sort')),
      page: this.numberParam(params, 'page', 1)
    };
  }

  private queryParamsFromState(query: CatalogQuery): Record<string, string | number | null> {
    return {
      search: query.search || null,
      category: query.category === 'all' ? null : query.category,
      type: query.productTypes.length ? query.productTypes.join(',') : null,
      availability: query.availability.length ? query.availability.join(',') : null,
      special: query.special.length ? query.special.join(',') : null,
      maxPrice: query.maxPrice === this.maxPriceLimit ? null : query.maxPrice,
      sort: query.sort === 'featured' ? null : query.sort,
      page: query.page === 1 ? null : query.page
    };
  }

  private defaultQuery(): CatalogQuery {
    return {
      search: '',
      category: 'all',
      productTypes: [],
      availability: [],
      special: [],
      maxPrice: this.maxPriceLimit,
      sort: 'featured',
      page: 1
    };
  }

  private listParam(params: ParamMap, key: string): string[] {
    return (params.get(key) ?? '').split(',').map(value => value.trim()).filter(Boolean);
  }

  private numberParam(params: ParamMap, key: string, fallback: number): number {
    const value = Number(params.get(key));
    return Number.isFinite(value) && value > 0 ? value : fallback;
  }

  private sortParam(sort: string | null): CatalogSort {
    const valid: CatalogSort[] = ['featured', 'newest', 'popular', 'price-low', 'price-high'];
    return valid.includes(sort as CatalogSort) ? sort as CatalogSort : 'featured';
  }

  private sortProducts(products: ShopCatalogProduct[]): ShopCatalogProduct[] {
    return [...products].sort((a, b) => {
      if (this.query.sort === 'newest') {
        return a.createdRank - b.createdRank;
      }

      if (this.query.sort === 'popular') {
        return b.popularity - a.popularity;
      }

      if (this.query.sort === 'price-low') {
        return a.displayPriceMMK - b.displayPriceMMK;
      }

      if (this.query.sort === 'price-high') {
        return b.displayPriceMMK - a.displayPriceMMK;
      }

      return b.popularity - a.popularity;
    });
  }

  private toggleValue<T>(values: T[], value: T): T[] {
    return values.includes(value) ? values.filter(item => item !== value) : [...values, value];
  }

  private categoryValue(category: string): string {
    return category.toLowerCase();
  }

  private typeValue(productType: string): string {
    return productType.toLowerCase().replace(/\s+/g, '-');
  }
}
