import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ShopCatalogProduct } from '../models/shop-home.model';
import { MockProductApiService } from './mock-product-api.service';

@Injectable()
export class ShopProductService {
  constructor(private readonly mockProductApi: MockProductApiService) { }

  getProducts(): Observable<ShopCatalogProduct[]> {
    return this.mockProductApi.getProducts();
  }
}
