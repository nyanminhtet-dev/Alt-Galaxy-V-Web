import { Component } from '@angular/core';

import { ProductVariant, ShopCategory, ShopCollection, ShopHeroSlide, ShopProduct } from '../../models/shop-home.model';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html'
})
export class ShopHomeComponent {
  protected readonly heroSlide: ShopHeroSlide = {
    id: 'blackpink-tour-drop',
    collectionLabel: '2026 official collection',
    headline: 'We play together',
    description: 'Official jerseys, apparel, and more. Be part of the next chapter.',
    ctaLabel: 'Explore Collection',
    image: '/assets/d066df19-5c75-4a41-825f-0940deff1a18.png',
    imageAlt: 'Dark editorial fashion model in black streetwear with purple lighting'
  };

  protected readonly collections: ShopCollection[] = [
    {
      id: 'tour-ready',
      name: 'YG MLBB Collection',
      productCount: 12,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=760&q=85',
      imageAlt: 'Dark esports stage lighting'
    },
    {
      id: 'lightstick-edit',
      name: 'Hello World',
      productCount: 8,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=760&q=85',
      imageAlt: 'Concert crowd holding lights'
    },
    {
      id: 'artist-core',
      name: '2025 Collection',
      productCount: 15,
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=760&q=85',
      imageAlt: 'Premium folded streetwear clothing'
    },
    {
      id: 'collectibles',
      name: 'EWC 2026 Collection',
      productCount: 18,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=760&q=85',
      imageAlt: 'Editorial fashion portrait with dark styling'
    },
    {
      id: 'feather-picks',
      name: 'Best Collection',
      productCount: 24,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=760&q=85',
      imageAlt: 'Shopper carrying branded bags'
    }
  ];

  protected readonly categories: ShopCategory[] = [
    {
      id: 'apparel',
      name: 'Apparel',
      description: 'Jerseys, tees, hoodies & more',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Black hoodie on a dark studio background'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Hats, bags, keychains & more',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Black cap and accessories on a dark surface'
    },
    {
      id: 'collectibles',
      name: 'Collectibles',
      description: 'Photocards, figures & more',
      image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Collectible trading cards on a table'
    },
    {
      id: 'digital',
      name: 'Digital',
      description: 'Digital goods & exclusive content',
      image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Dark digital screen with purple light'
    }
  ];

  protected readonly trendingProducts: ShopProduct[] = [
    {
      id: 'yg-shadow-hoodie',
      title: 'YG Jersey 2026 latest version',
      category: 'Apparel & Merchandise',
      productType: 'Physical',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85',
      imageAlt: 'Black pullover hoodie on a dark background',
      displayPriceMMK: 5000,
      featherCost: 200,
      badge: 'New',
      availability: 'in-stock',
      variants: [
        { id: 'shadow-hoodie-m', size: 'M', color: 'Black', stockQty: 8, active: true, defaultVariant: true },
        { id: 'shadow-hoodie-l', size: 'L', color: 'Black', stockQty: 4, active: true, defaultVariant: false },
        { id: 'shadow-hoodie-xl', size: 'XL', color: 'Black', stockQty: 0, active: false, defaultVariant: false }
      ]
    },
    {
      id: 'pink-venom-tee',
      title: 'Black Tee',
      category: 'Apparel & Merchandise',
      productType: 'Physical',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85',
      imageAlt: 'White graphic t-shirt on hanger',
      displayPriceMMK: 40000,
      featherCost: 0,
      availability: 'low-stock',
      variants: [
        { id: 'venom-tee-s', size: 'S', color: 'White', stockQty: 2, active: true, defaultVariant: false },
        { id: 'venom-tee-m', size: 'M', color: 'White', stockQty: 3, active: true, defaultVariant: true },
        { id: 'venom-tee-l', size: 'L', color: 'White', stockQty: 0, active: false, defaultVariant: false }
      ]
    },
    {
      id: 'official-lightstick',
      title: 'Championship Series Pro Jersey',
      category: 'Apparel & Merchandise',
      productType: 'Physical',
      image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=800&q=85',
      imageAlt: 'Dark graphic shirt on a hanger',
      displayPriceMMK: 20000,
      featherCost: 20,
      availability: 'in-stock',
      variants: [
        { id: 'lightstick-standard', size: 'One size', color: 'Pink', stockQty: 16, active: true, defaultVariant: true }
      ]
    },
    {
      id: 'fandom-tote',
      title: 'Bussy Today',
      category: 'Apparel & Merchandise',
      productType: 'Physical',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85',
      imageAlt: 'Neutral t-shirt worn by a model',
      displayPriceMMK: 50000,
      featherCost: 300,
      availability: 'low-stock',
      variants: [
        { id: 'city-tote-black', size: 'One size', color: 'Black', stockQty: 3, active: true, defaultVariant: true }
      ]
    },
    {
      id: 'pokemon-card-chained',
      title: 'Pokemon Card (Chained)',
      category: 'Collectibles',
      productType: 'Physical',
      image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=800&q=85',
      imageAlt: 'Collectible trading cards on a table',
      displayPriceMMK: 50000,
      featherCost: 0,
      availability: 'in-stock',
      variants: [
        { id: 'stage-pass-purple', size: 'One size', color: 'Purple', stockQty: 0, active: false, defaultVariant: true }
      ]
    },
    {
      id: 'yg-cap',
      title: 'YG Cap',
      category: 'Accessories',
      productType: 'Physical',
      image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=85',
      imageAlt: 'Black cap on a dark background',
      displayPriceMMK: 25000,
      featherCost: 50,
      availability: 'in-stock',
      variants: [
        { id: 'yg-cap-one-size', size: 'One size', color: 'Black', stockQty: 18, active: true, defaultVariant: true }
      ]
    }
  ];

  protected handleHeroCta(): void {
    document.getElementById('featured-collections-title')?.scrollIntoView({ behavior: 'smooth' });
  }

  protected handleCollectionSelected(collection: ShopCollection): void {
    console.info('Collection selected', collection.id);
  }

  protected handleCategorySelected(category: ShopCategory): void {
    console.info('Category selected', category.id);
  }

  protected handleAddToCart(event: { product: ShopProduct; variant: ProductVariant }): void {
    console.info('Add to cart requested', event.product.id, event.variant.id);
  }

  protected handleWishlist(product: ShopProduct): void {
    console.info('Wishlist requested', product.id);
  }
}
