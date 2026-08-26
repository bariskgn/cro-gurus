# Ryūma Stage 1: Cart Drawer CRO Plan

**Goal:** Confirm the order, remove final uncertainty and move customers to checkout without breaking their shopping flow.

## Recommended section order

| Order | Section | What it contains |
|---:|---|---|
| 1 | Drawer header | Cart title, item count and prominent close button. |
| 2 | Shipping message | Verified delivery message or progress toward a real free-shipping threshold. |
| 3 | Line items | Thumbnail, product name, color, size, price, quantity controls and Remove. |
| 4 | Product recommendation | Maximum one compact complementary item; hide if irrelevant or the cart is crowded. |
| 5 | Order summary | Subtotal, discount summary and clear tax/duties/shipping note. |
| 6 | Checkout block | Large Checkout button and optional accelerated checkout below it. |
| 7 | Reassurance | Short links to Shipping, Returns and Contact. |

The drawer should open immediately after Add to Cart and confirm which variant was added.

## Line-item behavior

- Allow quantity changes and removal inside the drawer.
- Update subtotal without reloading the page.
- Show color and size clearly.
- Link the image and title back to the PDP.
- Display stock or quantity errors beside the affected item.
- Keep touch targets large enough for mobile.

## Checkout block

Recommended hierarchy:

1. Subtotal
2. Shipping/tax/duties statement
3. Primary Checkout button
4. Accelerated payment, if supported
5. Continue Shopping text link

Do not place a prominent coupon field in the drawer; it can encourage customers to leave and search for codes. Apply active discounts automatically where possible.

## Shipping progress

Use a progress bar only when Ryūma has a confirmed free-shipping threshold.

Examples:

- “You are CHF 18 away from complimentary Swiss shipping.”
- “You have unlocked complimentary Swiss shipping.”

The message must update with cart changes and match checkout conditions.

## Product recommendation

Use one relevant add-on, such as a cap or same-design garment. Include image, name, price, required variant selection and Add button. Do not use a carousel or show more than two options.

At launch, use Shopify's native complementary-product recommendations. When the catalog exceeds 20 products and sufficient order data exists, evaluate Rebuy for personalized Smart Cart offers. Use a lighter app such as Selleasy if Ryūma only needs simple manual cross-sells.

## Empty-cart state

Include:

- “Your cart is empty”
- Shop the Collection button
- Links to T-Shirts and Hoodies
- Optional single featured product

## Visual direction

- Clean side panel with generous spacing
- Strong product thumbnails
- Sticky subtotal and checkout area
- Minimal borders and one accent CTA
- Smooth, fast opening with reduced-motion support
- Full-screen drawer on small mobile devices

## CRO rules

- Keep the close button visible and preserve the underlying page position.
- Never add products, insurance or donations automatically.
- Do not hide fees until checkout.
- Keep checkout available when recommendations fail to load.
- Show loading, error and sold-out states clearly.
- Track drawer opens, quantity changes, removals, recommendation adds and checkout clicks.
