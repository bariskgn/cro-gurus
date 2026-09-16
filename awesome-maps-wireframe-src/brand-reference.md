# CRO Gurus — design reference

Visual refresh: September 7, 2026. The 17 approved IDs, launch order and C10 bundle-demo logic remain intact. Later client feedback refines the UI, adds resolved-variant pricing, changes the illustrative cart 03 product pairing, and updates cart 05 wording to reflect the checked policy. The corresponding Markdown briefs document those refinements.

## Awesome Maps storefront styling

The primary source is [Awesome Maps](https://awesome-maps.com/), including its public [theme stylesheet](https://awesome-maps.com/cdn/shop/t/122/assets/theme.css?v=174590709376660264821757556321), homepage inline theme variables, official logo and product assets.

| Element | Verified reference | Application |
|---|---|---|
| Typography | Theme specifies Poppins; body 400, headings 700 | Embedded Poppins 400/600/700, with smaller sizes for mobile component previews |
| Primary buttons | `#111111` background, white text, square corners | Product, collection, hero and bundle controls |
| Base surfaces | White; `#e8e8e1` borders | Store header, product cards, purchase controls and cart dividers |
| Announcement accent | `#fdb813` with black text | Campaign panels; warm supporting surfaces are design extrapolations |
| Sale tag | Homepage inline override `#009416` | Best-seller tag styling in reconstructed purchase panels |
| Brand imagery | Official logo, homepage hero and variant-specific photographs | Embedded photos replace schematic media boxes |

Poppins files come from the [Google Fonts Poppins family](https://fonts.google.com/specimen/Poppins); the [SIL Open Font License](assets/Poppins-OFL.txt) is included locally and embedded in the HTML. The exact resolved font and image URLs are recorded in [assets.json](assets.json). Asset files retain their original responses; the build detects image signatures because Shopify can serve JPEG/PNG bytes from URLs ending in `.webp`.

The **CRO Gurus / CG** shell is an agency presentation design, distinct from the Awesome Maps storefront. The user-requested visible description is **A/B testing ideas**.

## Product image matching

- [Dive Map](https://awesome-maps.com/products/dive-map): towel, poster, canvas, framed and wood thumbnails are mapped to their explicit Shopify variants. Detail images are from the official product gallery.
- [Bucketlist Map](https://awesome-maps.com/products/bucketlist-map), [Surftrip Map](https://awesome-maps.com/products/surftrip-map), and [Hiking Map](https://awesome-maps.com/products/hiking-trails-map): towel cards use the corresponding towel-variant images. The mixed-catalog Bucketlist poster card uses the poster-variant image.
- [World Adventure Bottle](https://awesome-maps.com/products/adventure-bottle-world) and [Dive Adventure Bottle](https://awesome-maps.com/products/dive-adventure-bottle): bottle cards use the corresponding official featured images.
- Header logo, static hero photograph, Condé Nast Traveler and Lonely Planet marks are taken from the public homepage markup.

## Interpretation boundaries

- Before views are brand-styled reconstructions of the previously reviewed regions, not current screenshots or exact copies of every live component. Shared styling is applied to both arms; the differences still illustrate the approved experiments.
- The cart retains the previously reconstructed app-specific pink checkout color and green reservation strip. These are not claimed as newly verified theme tokens. The refresh does not repeat the live add-to-cart audit.
- The hero stays a single image in both H4 arms. The aspirational headline and benefit hierarchy are proposed content, not existing brand copy.
- Prices, review totals, offers and policies are retained from the existing concepts or explicitly marked placeholders. The refreshed imagery does not validate those commercial claims.
- P8 customer-media slots use clearly labeled official-gallery substitutes. They are not represented as actual customer submissions. Format attribution and use rights need verification before launch.
- The collection quiz and static storefront controls are design previews. Only the C10 bundle-selection flow is interactive; it never changes a real cart.
- Source Markdown hypotheses are unchanged. P1 remains restricted to five Shopify-confirmed best sellers and five three-bullet content sets.

## Verified content for the latest refinements

Public Shopify variant data was checked on September 7, 2026 with storefront currency `USD`:

| Product / exact example | Variant ID | Price |
|---|---|---:|
| [Bucketlist Poster](https://awesome-maps.com/products/bucketlist-map), Colorful Illustrations, 36 × 24 in | 49830866485512 | $54.90 |
| [Dive Towel](https://awesome-maps.com/products/dive-map), Colorful Illustrations, 61 × 37 in | 49830731219208 | $69.90 |
| [Dive Adventure Bottle + Stickers](https://awesome-maps.com/products/dive-adventure-bottle) | 52286525047048 | $69.95 |
| [Bucketlist Towel](https://awesome-maps.com/products/bucketlist-map), Colorful Illustrations, 61 × 37 in | 49830866223368 | $69.90 |

These prices populate shared mixed-catalog examples and cart 03. Existing campaign calculations are not validated by the price lookup; remaining discount placeholders are intentional.

Cart 05 combines the [Dive PDP FAQ](https://awesome-maps.com/products/dive-map) shipping estimate for the US with the product-specific [returns policy](https://awesome-maps.com/pages/return-policy). Its 60-day unused-towel wording replaces the prior generic 30-day guarantee. This is a scoped US example, not a universal delivery/duty promise. The merchant must reconcile inconsistent PDP and policy statements before launch. Historical audit observations are retained separately.
