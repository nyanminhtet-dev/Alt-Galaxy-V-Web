import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { ShopCatalogProduct } from '../models/shop-home.model';
import { MOCK_PRODUCTS } from './mock-product-data';

@Injectable()
export class MockProductApiService {
  getProducts(): Observable<ShopCatalogProduct[]> {
    return of(MOCK_PRODUCTS).pipe(delay(700));
  }
}
