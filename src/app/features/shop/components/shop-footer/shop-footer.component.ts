import { Component } from '@angular/core';

interface ShopFooterLinkGroup {
  title: string;
  links: string[];
}

@Component({
  selector: 'app-shop-footer',
  templateUrl: './shop-footer.component.html'
})
export class ShopFooterComponent {
  protected readonly linkGroups: ShopFooterLinkGroup[] = [
    {
      title: 'Shop',
      links: ['All Merchandise', 'Collections', 'Apparel', 'Accessories', 'Collectibles', 'Digital']
    },
    {
      title: 'Community',
      links: ['Artists', 'News', 'Events', 'Forum', 'Fan Stories']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Shipping', 'Returns', 'Contact Us', 'Terms of Service', 'Privacy Policy']
    }
  ];
}
