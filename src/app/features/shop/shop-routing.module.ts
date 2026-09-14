import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ShopHomeComponent } from './pages/shop-home/shop-home.component';

const routes: Routes = [
  {
    path: '',
    component: ShopHomeComponent
  },
  {
    path: 'products/:slug',
    component: ProductDetailComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
