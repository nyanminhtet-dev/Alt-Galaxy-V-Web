---
name: yg-fandom-web
description: Build and maintain the YG Fandom Web frontend according to its established Angular architecture, component principles, state management discipline, UX standards, responsive design system, and visual identity. Use this skill whenever creating, modifying, refactoring, or reviewing YG Fandom Web frontend code.
---

# YG Fandom Web

## 1. Project Identity

YG Fandom Web is the web version of the YG Fandom platform.

The platform includes multiple product areas such as:

- Merchandise / Shop
- Fan Gatherings
- Reels
- Tournaments
- YG Matches
- Community features
- Future fandom experiences

The web application should preserve the established YG Fandom identity while using web-appropriate interaction patterns.

Do not simply stretch the mobile UI to desktop.

The web experience should be responsive, accessible, performant, and intentionally designed for each viewport.

---

# 2. Technology Stack

The project uses:

- Angular 16
- NgModule / module-based Angular architecture
- TypeScript
- Tailwind CSS
- Lucide Icon Library
- Google Fonts

## Rules

- Use Angular 16 conventions.
- Use NgModules.
- Do not migrate to standalone components unless explicitly requested.
- Use TypeScript interfaces/types instead of `any`.
- Use Tailwind CSS for styling.
- Use Lucide for icons.
- Use the project's configured Google Font.
- Do not introduce another UI/icon framework without explicit approval.
- Reuse existing project dependencies and conventions whenever possible.

Before adding a new dependency, inspect whether the existing stack already provides the required functionality.

---

# 3. Architecture Principles

These are project-wide architectural principles.

## 3.1 Component-Driven Design

Build the application from meaningful components.

A component should represent one or more of:

- A meaningful UI responsibility
- A reusable interaction pattern
- A state boundary
- A feature responsibility
- A domain concept

Example:

```text
ShopHome
├── ShopHero
├── FeaturedCollections
├── BrowseToolbar
├── ProductBrowser
│   ├── ProductFilterSidebar
│   └── ProductGrid
└── ShopBenefits
```

Do not create a component merely because a piece of HTML exists.

Avoid both extremes:

- Giant monolithic components
- Excessive micro-components

Create component boundaries intentionally.

---

## 3.2 Dumb UI Components

Presentational/UI components should remain as dumb as reasonably possible.

They should generally:

- Receive data through `@Input()`
- Render the UI
- Emit user interactions through `@Output()`

They should generally NOT:

- Fetch their own API data
- Own application-wide state
- Contain unrelated business logic
- Directly modify global state
- Know unnecessary backend implementation details
- Make unrelated routing decisions

Preferred flow:

```text
Container / Smart Component
        ↓
      @Input
        ↓
Presentational Component
        ↓
      @Output
        ↓
Container / State
        ↓
Service / API
```

Example:

```ts
@Input() product!: ProductCardData;

@Output() addToCart =
  new EventEmitter<ProductVariant>();

@Output() viewProduct =
  new EventEmitter<Product>();
```

The parent/container decides what these events mean.

---

## 3.3 State Management Discipline

Every state value should have a clear owner.

Before introducing state, determine:

1. Who owns the state?
2. Who reads it?
3. Who modifies it?
4. Does it need to be shared?
5. Is it local, feature-level, or application-level?
6. Should it exist in the URL?
7. Can existing state be reused?

Avoid duplicate sources of truth.

Do not create global state for values that can remain local.

Do not create local state when multiple unrelated parts of the application genuinely need the same state.

For web catalog/search state, consider URL query parameters.

Examples:

```text
/shop?category=apparel
/shop?sort=price-low
/shop?search=jersey
/shop?page=2
```

URL state should support:

- Refresh
- Browser back/forward
- Deep linking
- Shareable URLs

---

## 3.4 Stable Interfaces

Component boundaries must use explicit and stable contracts.

Prefer:

```ts
@Input() product!: ProductCardData;
@Input() loading = false;

@Output() addToCart =
  new EventEmitter<ProductVariant>();
```

Avoid:

```ts
@Input() data: any;
```

Avoid passing large unrelated objects when the component only needs a small subset.

Use dedicated frontend models/view models when appropriate.

Preferred flow:

```text
API DTO
   ↓
Service / Mapper
   ↓
Frontend Model / View Model
   ↓
UI Component
```

Do not tightly couple presentation components to backend DTO implementation details unless there is a good reason.

---

## 3.5 Modularity and Loose Coupling

Organize the application primarily by feature.

Preferred:

```text
features/
├── shop/
├── community/
├── matches/
└── tournaments/
```

Avoid putting every page, component, and service from the entire application into unrelated global folders.

Features should be independently understandable.

Avoid unnecessary dependencies between feature modules.

A Shop component should not depend on internal implementation details of the Tournament feature.

---

# 4. Angular Application Structure

Use the following architecture as the baseline:

```text
src/app/
│
├── core/
│   ├── layout/
│   ├── services/
│   ├── guards/
│   ├── interceptors/
│   └── core.module.ts
│
├── shared/
│   ├── components/
│   ├── directives/
│   ├── pipes/
│   └── shared.module.ts
│
└── features/
    ├── shop/
    ├── community/
    ├── matches/
    └── tournaments/
```

This is a baseline, not a rigid requirement.

Always inspect the existing repository before creating or moving files.

---

# 5. Core Module

`CoreModule` contains application-wide infrastructure.

Examples:

```text
core/
├── layout/
│   ├── main-layout/
│   └── navigation/
├── services/
├── guards/
├── interceptors/
└── core.module.ts
```

## Main Layout

The main layout owns application framing.

Example:

```html
<app-navigation></app-navigation>

<main>
  <router-outlet></router-outlet>
</main>
```

The Main Layout should NOT contain feature-specific business logic.

It should not know how Shop products, tournament matches, or community content work.

---

# 6. Shared Module

`SharedModule` contains genuinely reusable UI and utilities.

Examples:

```text
shared/
└── components/
    ├── product-card/
    ├── feather-price/
    ├── loading-skeleton/
    ├── empty-state/
    └── error-state/
```

Before placing a component in Shared, ask:

> Is this genuinely reusable across multiple features?

Do not use Shared as a dumping ground.

A feature-specific component should remain inside its feature.

---

# 7. Feature Modules

Major product areas should have their own feature modules.

Example:

```text
features/
└── shop/
    ├── components/
    ├── pages/
    ├── models/
    ├── services/
    ├── shop-routing.module.ts
    └── shop.module.ts
```

Feature modules should be lazy-loaded where appropriate.

Example:

```ts
{
  path: 'shop',
  loadChildren: () =>
    import('./features/shop/shop.module')
      .then(m => m.ShopModule)
}
```

---

# 8. Shop Feature

The Shop is the first major web feature.

Recommended baseline:

```text
features/shop/
│
├── pages/
│   ├── shop-home/
│   ├── product-list/
│   ├── product-detail/
│   ├── collection-detail/
│   ├── cart/
│   └── checkout/
│
├── components/
│   ├── shop-hero/
│   ├── featured-collections/
│   ├── collection-card/
│   ├── product-browser/
│   ├── browse-toolbar/
│   ├── product-filter-sidebar/
│   ├── product-grid/
│   └── shop-benefits/
│
├── models/
│   ├── product.model.ts
│   ├── product-variant.model.ts
│   ├── product-card.model.ts
│   ├── collection.model.ts
│   └── product-filter.model.ts
│
├── services/
│   ├── product.service.ts
│   ├── collection.service.ts
│   └── shop-state.service.ts
│
├── shop-routing.module.ts
└── shop.module.ts
```

Do not blindly create every directory.

Create only what the feature actually needs.

---

# 9. Shop Component Hierarchy

The Shop Home should act primarily as an orchestrator.

Conceptually:

```text
MainLayout
│
├── Navigation
│
└── RouterOutlet
    │
    └── ShopHome
        │
        ├── ShopHero
        │
        ├── FeaturedCollections
        │   └── CollectionCard
        │
        ├── BrowseToolbar
        │
        └── ProductBrowser
            │
            ├── ProductFilterSidebar
            │
            └── ProductGrid
                └── ProductCard
```

The page/container coordinates data and state.

Child components render data and emit interactions.

---

# 10. Product Domain

The backend product model currently supports concepts including:

- ID
- Tenant ID
- Type
- Price type
- Category
- SKU
- Slug
- Title
- Description
- Images
- Tags
- MMK display price
- Feather cost
- Product detail information
- Shipping information
- Stock mode
- Stock quantity
- Active status
- Variants
- Variant size
- Variant color
- Variant color code
- Variant stock
- Default variant
- Sort order

Use explicit TypeScript models.

Example:

```ts
export interface Product {
  id: string;
  tenantId: string;

  type: ProductType;
  priceType: PriceType;

  productCategoryId: string;
  productCategory: ProductCategory;

  sku: string;
  slug: string;
  title: string;
  description: string;

  images: string[];
  tags: string[];

  displayPriceMMK: number;
  featherCost: number;

  productDetailsInfos: ProductDetailInfo[];

  shippingInfo: ShippingInfo;

  stockMode: StockMode;
  stockQty: number;

  active: boolean;

  variants: ProductVariant[];

  createdDate: string;
  lastModifiedDate: string;
}
```

Do not use `any` to avoid defining types.

---

# 11. Product Variants

Variants are first-class domain data.

A product may have:

- Size
- Color
- Color code
- SKU
- Stock quantity
- Default variant
- Active state
- Sort order

Example:

```text
Jersey

M / Black → 5
L / Black → 0
```

The UI must communicate variant availability clearly.

Do not treat product-level stock as sufficient when variant-specific stock exists.

---

# 12. Pricing and Feather Currency

YG Fandom merchandise may support:

```text
MMK
Feathers
```

Feather currency is part of the fandom experience.

Do not hide it as an insignificant secondary payment value.

Possible presentation:

```text
MMK 5,000
or 200 Feathers
```

Use a reusable `FeatherPriceComponent` where the same pricing pattern appears across multiple features.

---

# 13. User-Centered UX Principles

Frontend quality includes the experience, not only code quality.

Every implementation must consider:

- Performance
- Accessibility
- Responsive behavior
- Consistency
- UI states
- Clear user feedback

---

# 14. Performance

Performance is a first-class requirement.

Avoid:

- Unnecessary API requests
- Unnecessary subscriptions
- Expensive calculations inside templates
- Heavy work during rendering
- Loading large assets unnecessarily
- Rendering large amounts of content unnecessarily

Use:

- Lazy-loaded feature modules
- Lazy-loaded images where appropriate
- Appropriate pagination/infinite loading when required
- Efficient state updates
- Reused state where appropriate

Do not prematurely optimize without evidence.

But avoid obvious performance problems from the beginning.

Measure performance when meaningful.

---

# 15. Accessibility

Use semantic HTML.

Prefer:

```html
<header>
<nav>
<main>
<section>
<article>
<button>
<form>
<label>
```

over unnecessary generic containers.

Interactive elements must be keyboard accessible.

Icon-only buttons must have accessible names.

Example:

```html
<button
  type="button"
  aria-label="Add Jersey to wishlist">
  <lucide-icon name="heart"></lucide-icon>
</button>
```

Do not rely on color alone to communicate state.

Provide visible focus states.

Maintain sufficient contrast.

Use meaningful image `alt` text.

Example:

```html
<img
  [src]="product.images[0]"
  [alt]="product.title">
```

---

# 16. Responsive / Mobile-First Design

Design mobile-first and scale upward.

Support:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop

Do not simply shrink desktop layouts.

Adapt information hierarchy.

Example:

Desktop:

```text
Filters | Product Grid
```

Mobile:

```text
Search
Filter
Sort
Product Grid
```

A desktop filter sidebar may become a mobile drawer/sheet.

Product grids should adapt naturally to available width.

---

# 17. Visual Design System

The established YG Fandom Web visual baseline is:

- Dark
- Premium
- Modern
- Fandom-oriented
- Image-driven
- Purple-accented
- Controlled and sophisticated

## Foundation

Use:

- Near-black backgrounds
- Dark elevated surfaces
- Subtle borders
- Strong visual hierarchy

## Brand

Use:

- YG purple as the primary accent
- Purple gradients where appropriate
- Controlled purple glow
- White/light-gray typography

## Style

The interface should feel:

- Premium
- Modern
- Energetic
- Fandom-focused
- Slightly esports-inspired

Avoid excessive neon.

Avoid making every element purple.

Purple should primarily communicate:

- Brand
- Primary action
- Active state
- Emphasis
- Important information

The UI should feel premium rather than like a generic gaming dashboard.

---

# 18. Design Tokens

Maintain consistency for:

- Colors
- Typography
- Spacing
- Border radius
- Borders
- Shadows
- Focus states
- Interactive states

Prefer existing project tokens and Tailwind utilities.

Do not introduce arbitrary one-off values when an existing project token already represents the intended design.

---

# 19. Iconography

Use Lucide Icons.

Do not introduce another icon library unless explicitly required.

Icons should:

- Have consistent sizing
- Align with surrounding content
- Have accessible names when interactive
- Support the hierarchy rather than dominate it

Avoid decorative icons that add unnecessary visual noise.

---

# 20. UI States

Every asynchronous or interactive component must consider more than the happy path.

Relevant states include:

### Loading

Use skeletons or appropriate loading indicators.

### Empty

Examples:

```text
No products found
No collections found
No search results
```

Provide an appropriate next action where possible.

### Error

Example:

```text
Something went wrong.

We couldn't load the merchandise.

[ Try Again ]
```

Do not unnecessarily destroy unrelated functioning parts of the page.

### Disabled

Examples:

- Sold-out product
- Unavailable variant
- Disabled checkout action

### Validation

Examples:

- Missing required variant
- Invalid quantity
- Invalid checkout information

### Success

Examples:

- Added to cart
- Purchase successful
- Saved successfully

### Business states

Examples:

- In stock
- Low stock
- Sold out
- Variant unavailable
- Adding
- Added

---

# 21. Product Card

Product cards are presentation components.

Example interface:

```ts
@Input() product!: ProductCardData;
@Input() showQuickAdd = true;

@Output() addToCart =
  new EventEmitter<ProductVariant>();

@Output() viewProduct =
  new EventEmitter<Product>();
```

The ProductCard should NOT:

- Fetch products
- Call the cart API directly
- Own global cart state
- Decide application routing
- Contain unrelated business logic

It should render the product and communicate user interactions.

---

# 22. Search, Filter, and Sort

Catalog browsing should be predictable.

Search/filter/sort state must have a clear owner.

Where appropriate, represent catalog state in the URL.

Examples:

```text
/shop?category=tops
/shop?category=tops&sort=price-low
/shop?search=jersey
```

Changing a filter should not unnecessarily reload unrelated page sections.

Do not reset unrelated user state without a reason.

---

# 23. API and Service Boundaries

Components should not directly depend on backend implementation details.

Preferred:

```text
Component
    ↓
Feature Service
    ↓
API
```

Example:

```ts
productService.getProducts(query);
productService.getProduct(slug);
collectionService.getCollections();
cartService.addItem(...);
```

Services should have focused responsibilities.

Avoid one giant service that handles every Shop concern.

---

# 24. Componentization Rules

Before creating a component, ask:

### Responsibility

Does it have a clear responsibility?

### Reuse

Will it realistically be reused?

### State

Does it own meaningful local state?

### Interface

Can its inputs and outputs be clearly defined?

### Coupling

Does extraction reduce coupling?

### Complexity

Would keeping it inline make the parent unnecessarily complex?

If the answer is mostly no, do not create the component.

Do not optimize for maximum component count.

Optimize for meaningful boundaries.

---

# 25. State Boundary Rules

Before introducing state, ask:

1. Is this actually state?
2. Who owns it?
3. Who reads it?
4. Who modifies it?
5. Is it local, feature-level, or application-level?
6. Should it be in the URL?
7. Does an existing state source already exist?

Avoid duplicate sources of truth.

---

# 26. Development Workflow

When implementing a feature, follow this process:

```text
1. Inspect
   ↓
2. Understand existing architecture
   ↓
3. Identify feature boundary
   ↓
4. Identify state ownership
   ↓
5. Identify component boundaries
   ↓
6. Define stable interfaces
   ↓
7. Define models
   ↓
8. Implement services/state
   ↓
9. Implement presentational components
   ↓
10. Compose the page/container
   ↓
11. Implement responsive behavior
   ↓
12. Implement UI states
   ↓
13. Validate
   ↓
14. Review architecture and coupling
```

Do not immediately create files without inspecting the existing project.

---

# 27. Repository Inspection

Before modifying an existing project:

Inspect:

- Existing folder structure
- Angular modules
- Routing
- Shared components
- Core services
- Existing state management
- Tailwind configuration
- Existing fonts
- Existing icon setup
- API/service patterns
- Existing UI conventions

Prefer adapting to established project conventions rather than replacing them.

Do not reorganize unrelated existing code without explicit reason.

---

# 28. AI-Assisted Development

This project is actively developed using AI coding tools.

AI-generated code must follow the same standards as human-written code.

Never generate code merely because it is syntactically valid.

Do not:

- Create giant components
- Create unnecessary abstractions
- Use `any` to bypass type problems
- Introduce random dependencies
- Duplicate existing components
- Create hidden global state
- Put business logic into dumb UI components
- Ignore existing architecture
- Perform unrelated refactors
- Assume API behavior without checking the repository
- Rewrite working code unnecessarily

When uncertain, inspect the repository before guessing.

Prefer small, understandable changes.

---

# 29. Change Management

When modifying existing functionality:

1. Read the relevant files.
2. Understand existing behavior.
3. Identify the smallest appropriate change.
4. Preserve stable interfaces.
5. Avoid unrelated refactors.
6. Preserve existing behavior unless change is intentional.
7. Check affected components.
8. Check responsive behavior.
9. Check UI states.
10. Validate the result.

Do not perform broad cleanup while implementing an unrelated feature.

---

# 30. Definition of Done

A feature is not complete merely because it compiles.

## Architecture

- [ ] Correct feature module
- [ ] Clear component boundaries
- [ ] Explicit state ownership
- [ ] UI components remain appropriately dumb
- [ ] Stable interfaces
- [ ] No unnecessary coupling
- [ ] No unnecessary abstractions

## UX

- [ ] User goal is clear
- [ ] Primary actions are obvious
- [ ] Navigation is predictable
- [ ] User receives feedback after interactions

## Accessibility

- [ ] Semantic HTML
- [ ] Keyboard accessible
- [ ] Visible focus
- [ ] Accessible labels
- [ ] Sufficient contrast
- [ ] No color-only state communication

## Responsive

- [ ] Mobile
- [ ] Tablet
- [ ] Desktop
- [ ] Appropriate information hierarchy at each breakpoint

## UI States

- [ ] Loading
- [ ] Empty
- [ ] Error
- [ ] Disabled
- [ ] Validation where applicable
- [ ] Success
- [ ] Relevant business states

## Performance

- [ ] Images optimized/lazy-loaded where appropriate
- [ ] No unnecessary API requests
- [ ] No obvious unnecessary rendering work
- [ ] No expensive template calculations

## Visual

- [ ] YG Fandom dark visual identity
- [ ] Purple brand language
- [ ] Consistent typography
- [ ] Consistent spacing
- [ ] Consistent components
- [ ] Lucide icons
- [ ] Tailwind CSS

## Validation

Run the appropriate project checks after implementation:

- Angular build
- TypeScript compilation
- Linting if configured
- Unit tests where relevant
- Relevant application tests
- Manual responsive verification for UI changes

---

# 31. Final Engineering Principle

Do not optimize for:

> "How quickly can this screen be produced?"

Optimize for:

> "How cleanly can this feature become part of the YG Fandom system?"

Every implementation should balance:

```text
Visual Design
      +
User Experience
      +
Component Architecture
      +
State Discipline
      +
Stable Interfaces
      +
Modularity
      +
Loose Coupling
      +
Performance
      +
Accessibility
      +
Responsive Design
```

Build the smallest architecture that correctly represents the problem.

Do not under-engineer.

Do not over-engineer.

Prefer clear boundaries, simple state ownership, dumb UI components, stable contracts, reusable patterns, and consistent design.

The established YG Fandom visual language should remain consistent across future features unless the product explicitly changes direction.