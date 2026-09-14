import { Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { IsActiveMatchOptions, Params, Router } from '@angular/router';

interface ShopMenuItem {
  label: string;
  description: string;
  iconName: string;
  route?: string;
  queryParams?: Params;
  disabled?: boolean;
}

@Component({
  selector: 'app-shop-menu',
  templateUrl: './shop-menu.component.html'
})
export class ShopMenuComponent implements OnDestroy {
  @Input() mobile = false;

  @Output() itemSelected = new EventEmitter<void>();

  protected readonly menuItems: ShopMenuItem[] = [
    {
      label: 'All Merchandise',
      description: 'Explore all',
      iconName: 'shopping-bag',
      route: '/shop/products'
    },
    {
      label: 'Collections',
      description: 'Curated by YG',
      iconName: 'layers',
      disabled: true
    },
    {
      label: 'New Arrivals',
      description: 'Latest drops',
      iconName: 'sparkles',
      route: '/shop/products',
      queryParams: { special: 'new' }
    },
    {
      label: 'Best Sellers',
      description: 'Fan favorites',
      iconName: 'star',
      route: '/shop/products',
      queryParams: { special: 'best-seller' }
    }
  ];

  protected isOpen = false;

  private readonly shopActiveMatchOptions: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored'
  };
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly router: Router) { }

  ngOnDestroy(): void {
    this.clearCloseTimer();
  }

  protected get shopActive(): boolean {
    return this.router.isActive('/shop', this.shopActiveMatchOptions);
  }

  protected get menuId(): string {
    return this.mobile ? 'mobile-shop-navigation-menu' : 'desktop-shop-navigation-menu';
  }

  protected get triggerClasses(): string {
    if (this.mobile) {
      const activeClasses = this.shopActive
        ? 'border-yg-purple-400/50 bg-yg-surface text-white'
        : 'border-transparent text-yg-muted';

      return `flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm font-medium hover:bg-yg-elevated hover:text-white ${activeClasses}`;
    }

    const activeClasses = this.shopActive || this.isOpen ? 'text-yg-purple-300' : 'text-white/85';

    return `relative py-5 text-sm font-medium hover:text-yg-purple-200 ${activeClasses}`;
  }

  protected get panelClasses(): string {
    if (this.mobile) {
      return 'mt-2 space-y-1 rounded-lg border border-white/[0.08] bg-white/[0.035] p-2';
    }

    return 'absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-xl border border-white/[0.08] bg-[#111116] p-2.5 text-white shadow-2xl shadow-black/50 transition duration-200';
  }

  protected openMenu(): void {
    if (this.mobile) {
      return;
    }

    this.clearCloseTimer();
    this.isOpen = true;
  }

  protected toggleMenu(): void {
    this.clearCloseTimer();
    this.isOpen = !this.isOpen;
  }

  protected scheduleClose(): void {
    if (this.mobile) {
      return;
    }

    this.clearCloseTimer();
    this.closeTimer = setTimeout(() => {
      this.isOpen = false;
      this.closeTimer = null;
    }, 170);
  }

  protected cancelClose(): void {
    this.clearCloseTimer();
  }

  protected closeMenu(): void {
    this.clearCloseTimer();
    this.isOpen = false;
  }

  protected handleNavigationItem(): void {
    this.closeMenu();
    this.itemSelected.emit();
  }

  protected handleUnavailableItem(): void {
    this.closeMenu();
  }

  @HostListener('document:click')
  protected handleDocumentClick(): void {
    this.closeMenu();
  }

  @HostListener('document:keydown.escape')
  protected handleEscape(): void {
    this.closeMenu();
  }

  private clearCloseTimer(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
}
