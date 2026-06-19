# Inventory / Catalog

Product catalog at `/inventory.html`: listing, add/remove to cart, sorting, navigation.

Automated in [`tests/e2e/inventory.spec.ts`](../tests/e2e/inventory.spec.ts).

## Summary

| ID     | Title                                       | Priority | Type          | Status       |
| ------ | ------------------------------------------- | -------- | ------------- | ------------ |
| INV-01 | Catalog shows all six products              | 🔴 P1    | `@smoke`      | ✅ Automated |
| INV-02 | Adding a product updates the cart badge     | 🔴 P1    | `@smoke`      | ✅ Automated |
| INV-03 | Removing a product decreases the cart badge | 🟡 P2    | `@regression` | ✅ Automated |
| INV-04 | Sort products by name Z→A                   | 🟡 P2    | `@regression` | ✅ Automated |
| INV-05 | Sort products by price low→high             | 🟡 P2    | `@regression` | ✅ Automated |
| INV-06 | Sort products by name A→Z (default)         | 🟢 P3    | `@regression` | 📝 Planned   |
| INV-07 | Sort products by price high→low             | 🟢 P3    | `@regression` | 📝 Planned   |
| INV-08 | Open a product detail page                  | 🟡 P2    | `@regression` | 📝 Planned   |
| INV-09 | Each product shows name, price and image    | 🟢 P3    | `@regression` | 📝 Planned   |
| INV-10 | Add-to-cart toggles to Remove               | 🟢 P3    | `@regression` | 📝 Planned   |

---

### INV-01 — Catalog shows all six products

- **Priority / Type:** 🔴 P1 / `@smoke` · ✅ Automated
- **Preconditions:** Logged in as `standard_user`.
- **Steps:**
  1. Observe the product grid.
- **Expected result:** Exactly **6** product cards are displayed.

### INV-02 — Adding a product updates the cart badge

- **Priority / Type:** 🔴 P1 / `@smoke` · ✅ Automated
- **Preconditions:** Logged in; cart is empty.
- **Steps:**
  1. Click **Add to cart** on _Sauce Labs Backpack_.
- **Expected result:** Cart badge shows **1**.

### INV-03 — Removing a product decreases the cart badge

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** Logged in; cart is empty.
- **Steps:**
  1. Add _Sauce Labs Backpack_ and _Sauce Labs Bike Light_ → badge shows **2**.
  2. Click **Remove** on _Sauce Labs Backpack_.
- **Expected result:** Cart badge shows **1**.

### INV-04 — Sort products by name Z→A

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** Logged in.
- **Steps:**
  1. Select **Name (Z to A)** in the sort dropdown.
- **Expected result:** Product names are ordered descending alphabetically.

### INV-05 — Sort products by price low→high

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** Logged in.
- **Steps:**
  1. Select **Price (low to high)** in the sort dropdown.
- **Expected result:** Product prices are ordered ascending.

### INV-06 — Sort products by name A→Z (default)

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** Logged in.
- **Steps:**
  1. Select **Name (A to Z)**.
- **Expected result:** Product names are ordered ascending; matches the default load order.

### INV-07 — Sort products by price high→low

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** Logged in.
- **Steps:**
  1. Select **Price (high to low)**.
- **Expected result:** Product prices are ordered descending.

### INV-08 — Open a product detail page

- **Priority / Type:** 🟡 P2 / `@regression` · 📝 Planned
- **Preconditions:** Logged in.
- **Steps:**
  1. Click a product name/image.
- **Expected result:** Navigates to the product detail page showing the matching
  name, price, description and a **Back to products** link.

### INV-09 — Each product shows name, price and image

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** Logged in.
- **Steps:**
  1. Inspect each product card.
- **Expected result:** Every card has a non-empty name, a `$`-prefixed price and a
  loaded image. _(With `problem_user`, images are expected to be broken — negative variant.)_

### INV-10 — Add-to-cart toggles to Remove

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** Logged in.
- **Steps:**
  1. Click **Add to cart** on a product.
- **Expected result:** The button label changes to **Remove** for that product; clicking
  again reverts it to **Add to cart** and updates the badge accordingly.
