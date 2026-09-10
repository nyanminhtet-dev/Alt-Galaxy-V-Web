import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { BrowseToolbarComponent } from './components/browse-toolbar/browse-toolbar.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CollectionCardComponent } from './components/collection-card/collection-card.component';
import { FeaturedCollectionsComponent } from './components/featured-collections/featured-collections.component';
import { ProductBrowserComponent } from './components/product-browser/product-browser.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFilterSidebarComponent } from './components/product-filter-sidebar/product-filter-sidebar.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProductGridSkeletonComponent } from './components/product-grid-skeleton/product-grid-skeleton.component';
import { ShopByCategoryComponent } from './components/shop-by-category/shop-by-category.component';
import { ShopBenefitsComponent } from './components/shop-benefits/shop-benefits.component';
import { ShopExploreBannerComponent } from './components/shop-explore-banner/shop-explore-banner.component';
import { ShopFooterComponent } from './components/shop-footer/shop-footer.component';
import { ShopHeroComponent } from './components/shop-hero/shop-hero.component';
import { TrendingNowComponent } from './components/trending-now/trending-now.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ShopHomeComponent } from './pages/shop-home/shop-home.component';
import { MockProductApiService } from './services/mock-product-api.service';
import { ShopProductService } from './services/shop-product.service';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  declarations: [
    ShopHomeComponent,
    ProductListComponent,
    ShopHeroComponent,
    FeaturedCollectionsComponent,
    CollectionCardComponent,
    ShopByCategoryComponent,
    CategoryCardComponent,
    TrendingNowComponent,
    ShopExploreBannerComponent,
    ShopFooterComponent,
    ProductBrowserComponent,
    ProductFilterSidebarComponent,
    BrowseToolbarComponent,
    ProductGridComponent,
    ProductGridSkeletonComponent,
    ProductCardComponent,
    ShopBenefitsComponent
  ],
  imports: [
    SharedModule,
    ShopRoutingModule
  ],
  providers: [
    ShopProductService,
    MockProductApiService
  ]
})
export class ShopModule { }
