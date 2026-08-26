# Ryūma Stage 1: Store Architecture, Navigation, Collections and Filters

**Purpose:** Define a launch-ready Shopify structure that feels curated with a small catalog and can scale across categories, genders and markets.

**Basis:** Ryūma project brief, customer/competitor research and Shopify capabilities reviewed for this project.

## Executive plan

- Use one Shopify store with Shopify Markets.
- Launch on ryuma.ch for Switzerland. Secure ryuma.com if available for future international use.
- Use Shop as the primary catalog label at launch. Add Men and Women only when both ranges are live.
- Create one product per design and garment silhouette; keep size and color as variants.
- Use Shopify Standard Product Taxonomy, product options, metafields and metaobjects from day one.
- Use automated collections for stable rules and a manual Launch Collection for editorial control.
- Do not publish empty New, Best Sellers, Women or Sale destinations.
- With fewer than 12 products, use visible category chips instead of a large filter drawer.
- Keep search, account, help, language, currency and cart accessible globally.

## 1. Launch information architecture

### Primary navigation

1. Shop
2. The Designs
3. Our Story
4. Journal

Utility actions: Search, Account and Cart.

Recommended dropdown under Shop:

- Shop All
- T-Shirts
- Hoodies & Sweatshirts
- Launch Collection

The Designs should explain the inspiration and meaning behind each artwork, then link directly to the relevant products. Our Story should cover the brand, Japanese influence, production standards and founder perspective. Journal is useful only if Ryūma can maintain it; otherwise remove it from launch navigation.

### Mobile navigation

Use the same hierarchy as desktop. Show Shop categories immediately after tapping Shop; do not bury them behind multiple accordion levels. Keep Search at the top and Account, Help, language/currency and social links below the main menu.

### Future navigation

When the women’s collection is live:

- New
- Men
- Women
- The Designs
- Our Story

Men and Women may then contain category links such as T-Shirts, Hoodies and Shop All. Add New, Best Sellers or Sale only when inventory and customer behavior make those destinations useful.

### Site map

- Home
- Shop
  - Shop All
  - T-Shirts
  - Hoodies & Sweatshirts
  - Launch Collection
- The Designs
  - Design overview
  - Individual design stories
- Our Story
- Journal, if maintained
- Search
- Account
- Cart
- Help
  - Contact
  - Shipping
  - Returns
  - Size Guide
  - FAQ
  - Care Guide
- Legal
  - Privacy
  - Terms
  - Imprint/company information

## 2. Architecture rules

### Curated storefront, scalable system

The customer should see a small, intentional collection. Shopify should still contain the taxonomy and data required for future filtering, localization and automation.

### Organize by shopping intent

Lead with product categories customers recognize. Brand philosophy and design meaning support the purchase but should not replace Shop, T-Shirts or Hoodies.

### Use familiar labels

Prefer Shop, Size Guide, Shipping and Returns over branded or abstract alternatives. Navigation labels should describe the destination without interpretation.

### Never expose empty or weak destinations

A link should not appear until it contains enough useful content. Hide collections with no products, remove filters with one possible value and avoid “Best Sellers” before sales data exists.

### Keep local buying conditions visible

Country, currency, shipping destination and returns are part of the shopping architecture. Customers should not need to search for them.

## 3. Global storefront

### Announcement bar

Use one rotating-free message at a time:

- Swiss delivery or free-shipping threshold
- Launch announcement
- Returns reassurance

The message must link to the relevant policy. Avoid automatic carousels, which reduce readability and create unnecessary movement.

### Header

Desktop: logo, primary navigation and Search/Account/Cart.  
Mobile: menu, centered logo, Search and Cart. Account may sit inside the menu if space is limited.

Use a sticky header only if it remains compact and does not obstruct product content.

### Footer

Group links into:

- Shop
- Help
- About Ryūma
- Legal

Include newsletter signup, social links, country/language selector, payment methods and company details. Do not repeat the full main menu.

## 4. Product architecture

### Product creation rule

Create one Shopify product for each unique combination of:

- design/artwork
- garment silhouette

Example: “Bushidō T-Shirt” and “Bushidō Hoodie” are separate products. Black and off-white T-shirts remain variants of the same product if fit, fabric, imagery and price are otherwise consistent.

Create separate products for colors only when the colorway has different imagery, storytelling, pricing, availability or campaign treatment.

### Naming

Use: Design name + garment type.

Examples:

- Bushidō T-Shirt
- Ryū Spirit Hoodie

Keep names short, searchable and consistent. Put collection or drop names in badges, descriptions or metafields rather than every title.

### Variants

Option order:

1. Color
2. Size

Use customer-facing labels such as Black, Off-White, S, M and L. Do not expose supplier codes. Display color as text plus swatch, and show unavailable combinations immediately.

### Product status

- Active: available for purchase
- Draft: incomplete or unreleased
- Scheduled: launch-ready with a publication time
- Archived: permanently retired
- Sold out: remains visible only when restock, waitlist or brand value justifies it

## 5. Product data model

Assign the most specific [Shopify product category](https://help.shopify.com/en/manual/products/details/product-category) and use native fields before custom data.

### Standard fields

| Field | Rule |
|---|---|
| Vendor | Ryūma |
| Product type | T-Shirt, Hoodie, Sweatshirt |
| Category | Most specific Shopify taxonomy category |
| Tags | Internal automation only; not primary content storage |
| Options | Color, then Size |
| SKU | Unique per variant |
| Weight | Accurate per variant for shipping |
| SEO title/description | Unique and purchase-focused |

### Required metafields

| Metafield | Purpose |
|---|---|
| Audience | Men, Women, Unisex |
| Fit | Regular, Relaxed, Oversized |
| Material | Composition and fabric type |
| Fabric weight | GSM or equivalent |
| Model details | Height and worn size |
| Size-guide reference | Connects the correct guide |
| Design story | Short meaning/inspiration |
| Design reference | Links to a reusable design object |
| Care instructions | Product-specific care |
| Production details | Origin, printing/embroidery method |
| Badge | New, Limited, Low Stock when truthful |
| Restock status | Expected, not expected or date |

### Reusable metaobjects

Create shared objects for:

- Design stories
- Size guides
- Materials
- Care instructions
- Artist or collaborator profiles

Each design-story object should contain a title, short and full story, artwork, cultural references, linked products and optional SEO fields. This avoids duplicating content and can support dedicated story pages through [metaobject web pages](https://help.shopify.com/en/manual/custom-data/metaobjects/connecting-to-your-online-store/webpages).

One team member should own field definitions. New tags or metafields should not be added without checking whether an existing field already serves the purpose.

## 6. Collection structure

### Launch collections

| Collection | Handle | Type | Rule |
|---|---|---|---|
| Shop All | /collections/all-products | Automated | All active storefront products |
| T-Shirts | /collections/t-shirts | Automated | Product type = T-Shirt |
| Hoodies & Sweatshirts | /collections/hoodies-sweatshirts | Automated | Matching product types |
| Launch Collection | /collections/launch-collection | Manual | Curated launch order |

The launch collection should be manual because visual order and storytelling matter. Stable category and audience collections should be automated using product type or structured metafields.

### Future collections

Prepare but do not publish:

- Men
- Women
- New Arrivals
- Best Sellers
- Sale
- Individual campaign or collaboration collections

New Arrivals needs a defined time window. Best Sellers needs enough order data. Sale should contain genuinely reduced products, not permanent promotional pricing.

### Merchandising

- Lead with the strongest image and product.
- Mix silhouettes when the collection permits.
- Avoid multiple nearly identical cards in sequence.
- Keep sold-out products behind available products unless a restock is imminent.
- Use manual sorting for editorial collections and a clear automated sort for larger category collections.

## 7. Filters and sorting

### Activation by catalog size

| Catalog size | Recommended behavior |
|---|---|
| Under 12 products | No filter drawer; use category chips |
| 12–30 products | Category, size, color, availability |
| 30+ products | Add fit, price, audience and collection when useful |

Do not show filters that produce no meaningful choice.

### Filter definitions

| Filter | Data source | Rule |
|---|---|---|
| Category | Product type/category | Always consistent |
| Size | Product option | Normalize labels |
| Color | Category metafield/metaobject | Group near-identical shades |
| Availability | Shopify availability | In stock / out of stock |
| Fit | Product metafield | Only if multiple fits exist |
| Audience | Product metafield | Activate after women’s launch |
| Price | Native price | Useful only with a meaningful range |

Configure filters through [Shopify Search & Discovery](https://help.shopify.com/en/manual/online-store/storefront-search/search-and-discovery-filters). Preserve selected filters when sorting, make Clear all visible and show active-filter chips. On mobile, use a full-width drawer with Apply and Clear actions.

Default sort should be Featured. Also offer Newest, Price low to high and Price high to low. Add Best selling only after sufficient order volume.

## 8. Search

Search should be visible in the header and support product, collection and content results.

Initial synonym groups:

- tee, t-shirt, tshirt
- hoodie, hooded sweatshirt
- jumper, sweatshirt
- black, noir
- off-white, cream, ecru
- Japanese, Japan-inspired

Use [Search & Discovery controls](https://help.shopify.com/manual/online-store/search-and-discovery/product-boosts) for synonyms and product boosts.

Zero-results pages should:

- repeat the query
- suggest spelling or broader terms
- link to Shop All and core categories
- show a small selection of products

Track search usage, zero-result terms, exits after search and conversion after search. Use the data to improve synonyms, naming and navigation.

## 9. Markets, language and currency

### Store structure

Use one Shopify store with Shopify Markets. This keeps catalog, analytics, inventory and content governance centralized.

Launch priorities:

| Market | Currency | Language |
|---|---|---|
| Switzerland | CHF | English and German if content is ready |
| EU | EUR | English; add German where relevant |
| International | Display/presentment currency as supported | English |

The briefing refers to Swiss and international customers but does not fully define operational coverage. Confirm shipping countries, duties, tax handling and returns before activating each market.

### Domains and localization

Use ryuma.ch as the primary launch domain. For additional languages or regions, use Shopify market subfolders unless a later international-domain strategy is justified. Shopify recommends [market domains and subfolders](https://help.shopify.com/en/manual/markets/customizations/domains-and-languages) to localize storefronts.

Selector rules:

- Show country/region and currency together.
- Show language separately.
- Suggest a detected market; never force-redirect without consent.
- Remember the customer’s selection.
- State whether duties and taxes are included.

Use [Translate & Adapt](https://help.shopify.com/en/manual/international/translate-adapt-app) for translation management. Machine translation can create a draft, but German storefront copy, policies and size guidance require human review.

## 10. Accounts, help and service

Allow guest checkout. Accounts should provide order history, saved details and self-service support; they should not block purchasing.

Help architecture:

- Contact
- Shipping
- Returns and exchanges
- Size Guide
- FAQ
- Care Guide
- Order tracking

Link Shipping, Returns and Size Guide from the footer, PDP and cart. Keep policy language consistent across all three locations.

## 11. URLs, breadcrumbs and SEO

Use short, stable handles:

- /collections/t-shirts
- /collections/hoodies-sweatshirts
- /products/bushido-t-shirt
- /pages/size-guide
- /pages/shipping
- /pages/returns

Do not include gender in product URLs if the same product may later be sold as unisex. Create [URL redirects](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) whenever a handle changes.

Show breadcrumbs on collection, product and story pages. Link PDPs to the relevant category and design story; link design stories back to products. Keep sold-out URLs live when restock is likely. Redirect permanently retired products to the closest relevant collection or replacement.

## 12. Analytics and governance

Track:

- navigation click label and position
- collection viewed
- filter and sort use
- search query and zero results
- product selected
- market/language change
- add to cart

Use one naming convention for product types, colors, sizes, audiences and handles. Review the structure quarterly and before each new category, market or gender launch.

## 13. Implementation sequence

### P0 — Launch critical

1. Confirm markets, languages, categories and product naming.
2. Configure Shopify taxonomy, options, metafields and metaobjects.
3. Create products, automated categories and manual Launch Collection.
4. Build desktop/mobile navigation, footer and help pages.
5. Configure search, redirects and localization.
6. QA every product, variant, menu, market and empty state.

### P1 — After launch data

- Add filters when the catalog reaches the threshold.
- Improve search synonyms from real queries.
- Activate Best Sellers and New Arrivals when definitions are defensible.
- Add customer self-service and richer design-story pages.

### P2 — Scale

- Introduce Men/Women navigation.
- Add market-specific merchandising.
- Expand collection automation and personalized discovery.

## 14. Acceptance criteria

- Every active product has a category, type, SKU, size, color, material, fit and size-guide connection.
- No live navigation link is empty or duplicated.
- Customers can reach any product category within two taps from the homepage.
- Search returns useful results for product names, types and core synonyms.
- Filters use normalized values and never create dead ends.
- Country, currency, language, shipping and return information are easy to find.
- Mobile menus, filter drawers and selectors are keyboard and screen-reader usable.
- Products and policies display correctly in every active market and language.
- All retired URLs have a relevant redirect.

## Decisions required from Ryūma

1. Is the first range men’s, unisex or marketed as both?
2. Which countries can be served at launch?
3. Will German launch with English, or follow later?
4. Is ryuma.com owned or available?
5. What are the final product types, sizes and colors?
6. What shipping threshold, returns window and duties policy can be promised?
7. Will Journal content be maintained consistently?

## Official Shopify references

- [Shopify Markets](https://help.shopify.com/en/manual/markets)
- [Shopify Standard Product Taxonomy](https://help.shopify.com/en/manual/products/details/product-category)
- [Automated collection conditions](https://help.shopify.com/en/manual/products/collections/conditions)
- [Search & Discovery filters](https://help.shopify.com/en/manual/online-store/storefront-search/search-and-discovery-filters)
- [Translate & Adapt](https://help.shopify.com/en/manual/international/translate-adapt-app)
- [Self-service returns](https://help.shopify.com/en/manual/fulfillment/managing-orders/returns/self-serve-returns/setup)
