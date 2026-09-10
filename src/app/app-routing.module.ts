import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'shop',
        loadChildren: () => import('./features/shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'shop'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'shop'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
