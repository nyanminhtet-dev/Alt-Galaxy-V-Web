import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { ShopCatalogProduct } from '../models/shop-home.model';
import { MOCK_PRODUCTS } from './mock-product-data';

@Injectable()
export class MockProductApiService {
  getProducts(): Observable<ShopCatalogProduct[]> {
    return of(MOCK_PRODUCTS).pipe(delay(700));
  }

  getProductBySlug(slug: string): Observable<ShopCatalogProduct | null> {
    const product = MOCK_PRODUCTS.find(item => item.slug === slug);

    return of(product ?? null).pipe(delay(700));
  }
}
