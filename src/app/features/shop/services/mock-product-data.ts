import { ProductVariant, ShopCatalogProduct } from '../models/shop-home.model';

const categoryLabels: Record<string, string> = {
  apparel: 'Apparel',
  accessories: 'Accessories',
  collectibles: 'Collectibles',
  digital: 'Digital'
};

function variantsFor(productType: string): ProductVariant[] {
  if (['Jerseys', 'T-Shirts', 'Hoodies'].includes(productType)) {
    return [
      { id: `${productType}-s`, size: 'S', color: 'Black', stockQty: 4, active: true, defaultVariant: false },
      { id: `${productType}-m`, size: 'M', color: 'Black', stockQty: 8, active: true, defaultVariant: true },
      { id: `${productType}-l`, size: 'L', color: 'Black', stockQty: 6, active: true, defaultVariant: false },
      { id: `${productType}-xl`, size: 'XL', color: 'Black', stockQty: 2, active: true, defaultVariant: false }
    ];
  }

  return [
    {
      id: `${productType}-one-size`,
      size: productType === 'Digital Goods' ? 'Digital Only' : 'One size',
      color: 'Default',
      stockQty: 12,
      active: true,
      defaultVariant: true
    }
  ];
}

function product(
  id: string,
  title: string,
  category: string,
  productType: string,
  displayPriceMMK: number,
  featherCost: number,
  image: string,
  createdRank: number,
  popularity: number,
  special: string[],
  badge?: string
): ShopCatalogProduct {
  return {
    id,
    title,
    category: categoryLabels[category],
    productType,
    image,
    imageAlt: title,
    displayPriceMMK,
    featherCost,
    badge,
    availability: createdRank % 5 === 0 ? 'low-stock' : 'in-stock',
    variants: variantsFor(productType),
    createdRank,
    popularity,
    special
  };
}

export const MOCK_PRODUCTS: ShopCatalogProduct[] = [
  product('yg-jersey-2026', 'YG Jersey 2026 Latest Version', 'apparel', 'Jerseys', 50000, 200, 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=800&q=85', 1, 98, ['new', 'best-seller'], 'New'),
  product('black-tee-minimal', 'Black Tee Minimal Logo', 'apparel', 'T-Shirts', 40000, 0, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85', 5, 86, ['best-seller']),
  product('championship-jersey', 'Championship Series Pro Jersey', 'apparel', 'Jerseys', 70000, 300, 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=800&q=85', 2, 94, ['limited']),
  product('bussy-today-tee', 'Bussy Today Tee', 'apparel', 'T-Shirts', 50000, 200, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85', 4, 83, ['new']),
  product('yg-cap-classic', 'YG Cap Classic', 'accessories', 'Hats', 25000, 50, 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=85', 7, 78, ['best-seller']),
  product('gaming-headset', 'Gaming Headset Edition', 'accessories', 'Digital Goods', 120000, 500, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85', 10, 72, ['exclusive']),
  product('photocard-set-2026', 'Photocard Set 2026', 'collectibles', 'Photocards', 30000, 100, 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=800&q=85', 3, 90, ['new']),
  product('acrylic-stand-team', 'Acrylic Stand (Team)', 'collectibles', 'Figures', 45000, 200, 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=800&q=85', 6, 76, ['limited']),
  product('crossbody-bag', 'Crossbody Bag Urban', 'accessories', 'Bags', 80000, 300, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85', 8, 70, ['exclusive']),
  product('wallpaper-pack', 'Wallpaper Pack Vol. 1', 'digital', 'Digital Goods', 10000, 50, 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=800&q=85', 11, 64, ['new']),
  product('figure-edition-a', 'Figure (Edition A)', 'collectibles', 'Figures', 150000, 700, 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=85', 9, 88, ['limited', 'exclusive']),
  product('hoodie-play-together', 'Hoodie Play Together', 'apparel', 'Hoodies', 90000, 400, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85', 12, 84, ['best-seller']),
  product('silver-keychain', 'Silver Logo Keychain', 'accessories', 'Bags', 18000, 25, 'https://images.unsplash.com/photo-1618215650453-9a45e83aab1c?auto=format&fit=crop&w=800&q=85', 13, 58, []),
  product('concert-poster', 'Concert Poster Digital', 'digital', 'Digital Goods', 12000, 40, 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=85', 14, 52, []),
  product('embroidered-hoodie', 'Embroidered Logo Hoodie', 'apparel', 'Hoodies', 95000, 420, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=85', 15, 62, ['exclusive']),
  product('tour-tote', 'Tour Tote Bag', 'accessories', 'Bags', 35000, 120, 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=85', 16, 48, []),
  product('album-art-pack', 'Album Art Pack', 'digital', 'Digital Goods', 15000, 60, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=85', 17, 55, ['new']),
  product('black-bucket-hat', 'Black Bucket Hat', 'accessories', 'Hats', 28000, 60, 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=85', 18, 46, []),
  product('player-card-set', 'Player Card Set', 'collectibles', 'Photocards', 38000, 150, 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=800&q=85', 19, 73, ['limited']),
  product('phone-wallpaper', 'Phone Wallpaper Drop', 'digital', 'Digital Goods', 8000, 30, 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85', 20, 50, []),
  product('arena-tee', 'Arena Black Tee', 'apparel', 'T-Shirts', 42000, 90, 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85', 21, 66, []),
  product('collectors-pin', 'Collectors Pin Set', 'collectibles', 'Photocards', 22000, 80, 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=800&q=85', 22, 44, ['exclusive']),
  product('purple-mousepad', 'Purple Desk Mat', 'accessories', 'Digital Goods', 55000, 180, 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=85', 23, 42, []),
  product('champion-poster', 'Champion Poster Pack', 'digital', 'Digital Goods', 16000, 70, 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=800&q=85', 24, 40, ['new'])
];
