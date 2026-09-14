import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { ProductVariant, ShopCatalogProduct, ShopProduct } from '../../models/shop-home.model';
import { ShopProductService } from '../../services/shop-product.service';

type ProductDetailTab = 'details' | 'delivery' | 'information';

interface ProductTrustItem {
  icon: string;
  title: string;
  description: string;
}

interface ProductInfoRow {
  label: string;
  value: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  protected readonly fallbackProductImage = '/assets/yg-product-placeholder.svg';
  protected readonly trustItems: ProductTrustItem[] = [
    { icon: 'shield-check', title: 'Official Merchandise', description: '100% authentic' },
    { icon: 'credit-card', title: 'Secure Checkout', description: 'Safe and encrypted' },
    { icon: 'truck', title: 'Global Care', description: 'Shipping availability varies' }
  ];
  protected readonly deliveryRows: ProductInfoRow[] = [
    { label: 'Processing Time', value: '1-3 business days' },
    { label: 'Estimated Delivery', value: 'Calculated at checkout' },
    { label: 'Shipping Fee', value: 'Calculated at checkout' },
    { label: 'Tracking', value: 'Shared after shipping' },
    { label: 'International Shipping', value: 'Available in selected regions' }
  ];

  protected product: ShopCatalogProduct | null = null;
  protected relatedProducts: ShopProduct[] = [];
  protected loading = true;
  protected loadError = false;
  protected selectedImageIndex = 0;
  protected selectedVariant: ProductVariant | null = null;
  protected quantity = 1;
  protected activeTab: ProductDetailTab = 'details';

  private readonly destroy$ = new Subject<void>();
  private currentSlug = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly shopProductService: ShopProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.currentSlug = params.get('slug') ?? '';
          this.resetLoadState();

          return this.shopProductService.getProductBySlug(this.currentSlug);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: product => this.handleProductLoaded(product),
        error: () => this.handleLoadError()
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected get productImages(): string[] {
    if (!this.product) {
      return [];
    }

    return this.product.images?.length ? this.product.images : [this.product.image];
  }

  protected get galleryImages(): string[] {
    return this.productImages.length > 0 ? this.productImages : [this.fallbackProductImage];
  }

  protected get selectedImage(): string {
    return this.productImages[this.selectedImageIndex] ?? this.product?.image ?? '';
  }

  protected get selectedStock(): number {
    return this.selectedVariant?.stockQty ?? 0;
  }

  protected get canPurchase(): boolean {
    return Boolean(
      this.product &&
      this.selectedVariant &&
      this.selectedVariant.active &&
      this.selectedVariant.stockQty > 0 &&
      this.quantity >= 1 &&
      this.quantity <= this.selectedVariant.stockQty
    );
  }

  protected get stockLabel(): string {
    if (!this.selectedVariant || this.selectedStock <= 0) {
      return 'Out of stock';
    }

    return `${this.selectedStock} available`;
  }

  protected get stockSupportLabel(): string {
    return this.selectedStock > 0 ? 'In stock and ready for the next step.' : 'This variant is currently unavailable.';
  }

  protected get availableColors(): string[] {
    if (!this.product) {
      return [];
    }

    return this.uniqueValues(this.product.variants.map(variant => variant.color).filter(color => color && color !== 'Default'));
  }

  protected get availableSizes(): string[] {
    if (!this.product) {
      return [];
    }

    return this.uniqueValues(this.product.variants.map(variant => variant.size).filter(Boolean));
  }

  protected get selectedColor(): string {
    return this.selectedVariant?.color ?? '';
  }

  protected get selectedSize(): string {
    return this.selectedVariant?.size ?? '';
  }

  protected get selectedColorCode(): string | null {
    return this.selectedVariant?.colorCode ?? null;
  }

  protected get showColorOptions(): boolean {
    return this.availableColors.length > 1;
  }

  protected get informationRows(): Array<{ label: string; value: string }> {
    if (!this.product) {
      return [];
    }

    return [
      { label: 'Product Name', value: this.product.title },
      { label: 'Product Type', value: this.product.productType },
      { label: 'Category', value: this.product.category },
      { label: 'Released Date', value: 'Not specified' },
      { label: 'Collection', value: 'YG Fandom Shop' },
      { label: 'Product ID', value: this.product.id }
    ];
  }

  protected retryLoadProduct(): void {
    if (!this.currentSlug) {
      return;
    }

    this.resetLoadState();

    this.shopProductService.getProductBySlug(this.currentSlug)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: product => this.handleProductLoaded(product),
        error: () => this.handleLoadError()
      });
  }

  protected selectImage(index: number): void {
    if (index < 0 || index >= this.productImages.length) {
      return;
    }

    this.selectedImageIndex = index;
  }

  protected previousImage(): void {
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex -= 1;
    }
  }

  protected nextImage(): void {
    if (this.selectedImageIndex < this.productImages.length - 1) {
      this.selectedImageIndex += 1;
    }
  }

  protected selectColor(color: string): void {
    const variant = this.findBestVariant(color, this.selectedSize);
    this.setSelectedVariant(variant);
  }

  protected selectSize(size: string): void {
    const variant = this.findBestVariant(this.selectedColor, size);
    this.setSelectedVariant(variant);
  }

  protected isColorAvailable(color: string): boolean {
    return Boolean(this.product?.variants.some(variant => variant.color === color && variant.active && variant.stockQty > 0));
  }

  protected isSizeAvailable(size: string): boolean {
    return Boolean(this.product?.variants.some(variant => {
      const matchesColor = this.showColorOptions ? variant.color === this.selectedColor : true;
      return matchesColor && variant.size === size && variant.active && variant.stockQty > 0;
    }));
  }

  protected updateQuantity(nextQuantity: number): void {
    if (!this.selectedVariant || this.selectedStock <= 0) {
      this.quantity = 1;
      return;
    }

    this.quantity = Math.min(Math.max(nextQuantity, 1), this.selectedStock);
  }

  protected selectTab(tab: ProductDetailTab): void {
    this.activeTab = tab;
  }

  protected addToCart(): void {
    if (!this.product || !this.selectedVariant || !this.canPurchase) {
      return;
    }

    console.info('Add to cart requested', this.product.id, this.selectedVariant.id, this.quantity);
  }

  protected wishlist(): void {
    if (!this.product) {
      return;
    }

    console.info('Wishlist requested', this.product.id);
  }

  protected viewProduct(product: ShopProduct): void {
    this.router.navigate(['/shop/products', product.slug ?? product.id]);
  }

  protected handleRelatedAddToCart(event: { product: ShopProduct; variant: ProductVariant }): void {
    console.info('Add to cart requested', event.product.id, event.variant.id);
  }

  protected handleRelatedWishlist(product: ShopProduct): void {
    console.info('Wishlist requested', product.id);
  }

  protected formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }

  protected handleProductImageError(event: Event): void {
    const image = event.target as HTMLImageElement | null;

    if (!image || image.src.endsWith(this.fallbackProductImage)) {
      return;
    }

    image.src = this.fallbackProductImage;
  }

  private resetLoadState(): void {
    this.loading = true;
    this.loadError = false;
    this.product = null;
    this.relatedProducts = [];
    this.selectedImageIndex = 0;
    this.selectedVariant = null;
    this.quantity = 1;
    this.activeTab = 'details';
  }

  private handleProductLoaded(product: ShopCatalogProduct | null): void {
    this.product = product;
    this.loading = false;
    this.loadError = false;
    this.selectedImageIndex = 0;
    this.setSelectedVariant(product ? this.pickInitialVariant(product) : null);

    if (product) {
      this.loadRelatedProducts(product);
    }
  }

  private handleLoadError(): void {
    this.product = null;
    this.relatedProducts = [];
    this.loading = false;
    this.loadError = true;
  }

  private loadRelatedProducts(product: ShopCatalogProduct): void {
    this.shopProductService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: products => {
          this.relatedProducts = products
            .filter(item => item.id !== product.id)
            .filter(item => item.category === product.category || item.productType === product.productType)
            .slice(0, 6);
        },
        error: () => {
          this.relatedProducts = [];
        }
      });
  }

  private pickInitialVariant(product: ShopCatalogProduct): ProductVariant | null {
    return (
      product.variants.find(variant => variant.defaultVariant && variant.active && variant.stockQty > 0) ??
      product.variants.find(variant => variant.active && variant.stockQty > 0) ??
      product.variants.find(variant => variant.active) ??
      product.variants[0] ??
      null
    );
  }

  private findBestVariant(color: string, size: string): ProductVariant | null {
    if (!this.product) {
      return null;
    }

    const exact = this.product.variants.find(variant => {
      const matchesColor = !color || variant.color === color;
      const matchesSize = !size || variant.size === size;
      return matchesColor && matchesSize;
    });

    return exact ?? this.product.variants.find(variant => variant.active && variant.stockQty > 0) ?? null;
  }

  private setSelectedVariant(variant: ProductVariant | null): void {
    this.selectedVariant = variant;
    this.updateQuantity(this.quantity);
  }

  private uniqueValues(values: string[]): string[] {
    return Array.from(new Set(values));
  }
}
