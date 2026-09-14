import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ShopCartService } from '../../../features/shop/services/shop-cart.service';

interface NavigationItem {
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  protected readonly cartItemCount$: Observable<number> = this.shopCartService.itemCount$;

  protected readonly navigationItems: NavigationItem[] = [
    { label: 'Home', route: '/', exact: true },
    { label: 'Shop', route: '/shop', exact: false },
    { label: 'Collections', route: '/shop/collections', exact: false },
    { label: 'Artists', route: '/artists', exact: false },
    { label: 'Community', route: '/community', exact: false }
  ];

  protected mobileMenuOpen = false;

  constructor(private readonly shopCartService: ShopCartService) { }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
