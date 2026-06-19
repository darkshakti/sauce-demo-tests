# Cart

Shopping cart at `/cart.html`: contents, navigation and item management.

Automated in [`tests/e2e/cart.spec.ts`](../tests/e2e/cart.spec.ts).

## Summary

| ID      | Title                                       | Priority | Type          | Status       |
| ------- | ------------------------------------------- | -------- | ------------- | ------------ |
| CART-01 | Added products appear in the cart           | 🔴 P1    | `@smoke`      | ✅ Automated |
| CART-02 | Continue shopping returns to the catalog    | 🟡 P2    | `@regression` | ✅ Automated |
| CART-03 | Remove an item from the cart page           | 🟡 P2    | `@regression` | 📝 Planned   |
| CART-04 | Cart contents persist across navigation     | 🟡 P2    | `@regression` | 📝 Planned   |
| CART-05 | Cart line item shows correct name and price | 🟢 P3    | `@regression` | 📝 Planned   |
| CART-06 | Checkout from a non-empty cart              | 🔴 P1    | `@regression` | 📝 Planned   |
| CART-07 | Empty cart state                            | 🟢 P3    | `@regression` | 📝 Planned   |

---

### CART-01 — Added products appear in the cart

- **Priority / Type:** 🔴 P1 / `@smoke` · ✅ Automated
- **Preconditions:** Logged in as `standard_user`.
- **Steps:**
  1. Add _Sauce Labs Backpack_ and _Sauce Labs Fleece Jacket_.
  2. Open the cart.
- **Expected result:** Cart page loads (title **Your Cart**) with exactly **2** items;
  both product names are listed.

### CART-02 — Continue shopping returns to the catalog

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** Logged in; at least one item in the cart; on the cart page.
- **Steps:**
  1. Click **Continue Shopping**.
- **Expected result:** Navigates back to `/inventory.html`; catalog is shown.

### CART-03 — Remove an item from the cart page

- **Priority / Type:** 🟡 P2 / `@regression` · 📝 Planned
- **Preconditions:** Logged in; 2 items in the cart; on the cart page.
- **Steps:**
  1. Click **Remove** on one line item.
- **Expected result:** That item disappears from the list; cart badge decrements to **1**.

### CART-04 — Cart contents persist across navigation

- **Priority / Type:** 🟡 P2 / `@regression` · 📝 Planned
- **Preconditions:** Logged in; 1 item in the cart.
- **Steps:**
  1. Navigate cart → catalog → cart again.
- **Expected result:** The item is still present; badge count is unchanged.

### CART-05 — Cart line item shows correct name and price

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** Logged in; a known product added.
- **Steps:**
  1. Open the cart and inspect the line item.
- **Expected result:** Name, price and quantity (1) match the catalog values.

### CART-06 — Checkout from a non-empty cart

- **Priority / Type:** 🔴 P1 / `@regression` · 📝 Planned
- **Preconditions:** Logged in; at least one item in the cart; on the cart page.
- **Steps:**
  1. Click **Checkout**.
- **Expected result:** Navigates to the checkout information step (`/checkout-step-one.html`).

### CART-07 — Empty cart state

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** Logged in; cart is empty.
- **Steps:**
  1. Open the cart.
- **Expected result:** No line items are shown; the cart badge is absent.
