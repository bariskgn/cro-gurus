# CRO Gurus · A/B testing ideas

The user-facing deliverable is [../ab-testing-wireframes.html](../ab-testing-wireframes.html). Open it directly in a browser. The HTML contains all 17 active experiment briefs, high-fidelity before/after concepts, official brand images, and Poppins fonts, so it needs no server, installed dependencies or internet connection. The viewer uses the requested **CRO Gurus** name and **CG** monogram, with **A/B testing ideas** as its description.

`viewer.html` is the authoring template, not the built presentation. If opened directly, it now opens the complete viewer automatically, preserving the selected idea and query string. A visible link remains available if automatic navigation is blocked. Share `ab-testing-wireframes.html`, not the template.

Homepage feedback retains H2 and H7 and replaces H4 with an aspirational, benefit-led single-image hero redesign. H1, H3, H5, H6, H8, H9 and H10 are removed. Original IDs are stable, so homepage navigation uses `home-2`, `home-4` and `home-7`, not sequentially renumbered IDs. Links to rejected tests fall back to the first recommended active homepage idea.

Collection feedback removes C2, C4, C5, C6 and C7. Stable active links are `collection-1`, `collection-3`, `collection-8`, `collection-9` and `collection-10`. Rejected links fall back to C1. C3 covers pricing across all collections; C9 recommends gifts across the catalog. C10 includes a local demo: start bundle mode, select two products, review, then simulate adding both. It never contacts the storefront or changes a real cart.

PDP feedback removes P2, P3, P4, P5, P7, P9 and P12. Stable active links are `pdp-1`, `pdp-6`, `pdp-8`, `pdp-10` and `pdp-11`; rejected links fall back to P1. P1 targets five best-selling products only, with five three-bullet content sets. The five product IDs must be confirmed from Shopify sales before launch; the Dive Map wireframe is illustrative.

Cart feedback removes Tests 4, 6, 7 and 8. Stable active links are `cart-1`, `cart-2`, `cart-3` and `cart-5`; rejected links fall back to the first recommended idea, `cart-5`. The design refresh preserves the remaining cart hypotheses and test scope.

The four source Markdown files remain the source of truth for the test specifications. `viewer.html` defines the visual concepts and browsing interface; `hifi.css` supplies the brand-aligned design layer. `assets.json` records the exact public image/font URLs and alt text. `build.mjs` embeds the current Markdown briefs, styling and local assets into the standalone deliverable. See [brand-reference.md](brand-reference.md) for visual sources and limitations.

Rebuild from the project root:

```sh
node audit/wireframe-src/build.mjs
node audit/wireframe-src/verify.mjs
```

Verification checks the 17 source mappings, 34 baseline wireframe renders, unique variants, navigation, all active deep links, rejected-link fallbacks, P1 scope notes, bundle-demo states and offline dependencies. It also tests direct template opening over file and HTTP URLs, preservation of selected ideas, and the fallback when automatic navigation is blocked. It does not establish CRO effectiveness or validate the original live-site findings.

The designs reconstruct affected page regions from the September 5–7 review with live-site brand references collected September 7. They are high-fidelity concepts, not pixel-accurate screenshots. The refresh does not revalidate baseline observations, prices, ratings or campaign terms. Price placeholders, customer media, delivery policies and promotion calculations must be confirmed before implementation. No storefront or cart state is changed by this viewer. Change outlines are optional and off by default; scroll inside the phones to see longer layouts.

Latest visual feedback: the first active homepage idea (H2, referred to as H1 in the request) has larger hobby buttons and icons; C1 has icon-led benefit cards; C3 uses verified USD variant prices; C8 has an expanded sort-panel design with buttons; C10 has a yellow bundle-start button. Cart 03 now compares towel recommendations against an identical Dive Adventure Bottle cart in both arms. Cart 05 has icons and policy-specific US/towel reassurance. C8 controls remain a visual mockup; C10 is the working local demo. See [brand-reference.md](brand-reference.md) for the newly checked prices and policy limitations.

`node audit/wireframe-src/download-assets.mjs` refreshes the explicit public assets if needed (network required). Routine rebuilding and verification use the saved files and work offline.
