# Checkout

Checkout flow across the information, overview and completion steps.

Automated in [`tests/e2e/checkout.spec.ts`](../tests/e2e/checkout.spec.ts).

## Summary

| ID     | Title                                                           | Priority | Type          | Status       |
| ------ | --------------------------------------------------------------- | -------- | ------------- | ------------ |
| CHK-01 | Full purchase: login → catalog → cart → checkout → confirmation | 🔴 P1    | `@smoke`      | ✅ Automated |
| CHK-02 | Overview totals add up (item total + tax = total)               | 🟡 P2    | `@regression` | ✅ Automated |
| CHK-03 | Checkout requires a first name                                  | 🟡 P2    | `@regression` | ✅ Automated |
| CHK-04 | Checkout requires a postal code                                 | 🟡 P2    | `@regression` | ✅ Automated |
| CHK-05 | Checkout requires a last name                                   | 🟡 P2    | `@regression` | 📝 Planned   |
| CHK-06 | Cancel on information step returns to the cart                  | 🟢 P3    | `@regression` | 📝 Planned   |
| CHK-07 | Cancel on overview step returns to the catalog                  | 🟢 P3    | `@regression` | 📝 Planned   |
| CHK-08 | Overview lists the selected items                               | 🟡 P2    | `@regression` | 📝 Planned   |
| CHK-09 | Back Home after completion returns to the catalog               | 🟢 P3    | `@regression` | 📝 Planned   |

---

### CHK-01 — Full purchase (end-to-end journey)

- **Priority / Type:** 🔴 P1 / `@smoke` · ✅ Automated
- **Preconditions:** Logged in as `standard_user`.
- **Steps:**
  1. Add _Sauce Labs Backpack_ and _Sauce Labs Bolt T-Shirt_.
  2. Open the cart and verify 2 items.
  3. Click **Checkout** and fill first/last name and postal code.
  4. On the overview, click **Finish**.
- **Expected result:** Confirmation page shows **"Thank you for your order!"**.
- **Note:** This is a deliberately non-atomic _journey_ test (covers the whole flow).
  Totals arithmetic is verified separately in CHK-02.

### CHK-02 — Overview totals add up

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** Logged in; reached the checkout overview with 2 items.
- **Steps:**
  1. Read **Item total**, **Tax** and **Total** on the overview.
- **Expected result:** `round(item total + tax, 2) === total`.
- **Note:** Atomic test — single reason to fail (totals consistency only).

### CHK-03 — Checkout requires a first name

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** Logged in; item in cart; on the information step.
- **Steps:**
  1. Leave **First Name** empty; fill last name and postal code.
  2. Click **Continue**.
- **Expected result:** Error banner reads _"First Name is required"_; stays on the step.

### CHK-04 — Checkout requires a postal code

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** Logged in; item in cart; on the information step.
- **Steps:**
  1. Fill first/last name; leave **Postal Code** empty.
  2. Click **Continue**.
- **Expected result:** Error banner reads _"Postal Code is required"_.

### CHK-05 — Checkout requires a last name

- **Priority / Type:** 🟡 P2 / `@regression` · 📝 Planned
- **Preconditions:** Logged in; item in cart; on the information step.
- **Steps:**
  1. Fill first name and postal code; leave **Last Name** empty.
  2. Click **Continue**.
- **Expected result:** Error banner reads _"Last Name is required"_.

### CHK-06 — Cancel on information step returns to the cart

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** On the checkout information step.
- **Steps:**
  1. Click **Cancel**.
- **Expected result:** Navigates back to the cart page.

### CHK-07 — Cancel on overview step returns to the catalog

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** On the checkout overview step.
- **Steps:**
  1. Click **Cancel**.
- **Expected result:** Navigates back to `/inventory.html`.

### CHK-08 — Overview lists the selected items

- **Priority / Type:** 🟡 P2 / `@regression` · 📝 Planned
- **Preconditions:** Reached the overview with 2 specific items.
- **Steps:**
  1. Inspect the line items on the overview.
- **Expected result:** Exactly the items added earlier are listed with matching names/prices.

### CHK-09 — Back Home after completion returns to the catalog

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** On the order-complete page.
- **Steps:**
  1. Click **Back Home**.
- **Expected result:** Navigates to `/inventory.html`; cart badge is empty.
