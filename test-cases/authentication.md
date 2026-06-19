# Authentication

Login, logout and access control for `https://www.saucedemo.com/`.

Automated in [`tests/e2e/login.spec.ts`](../tests/e2e/login.spec.ts).

## Summary

| ID      | Title                              | Priority | Type          | Status       |
| ------- | ---------------------------------- | -------- | ------------- | ------------ |
| AUTH-01 | Standard user logs in successfully | 🔴 P1    | `@smoke`      | ✅ Automated |
| AUTH-02 | Locked-out user is rejected        | 🟡 P2    | `@regression` | ✅ Automated |
| AUTH-03 | Invalid credentials are rejected   | 🟡 P2    | `@regression` | ✅ Automated |
| AUTH-04 | Username is required               | 🟡 P2    | `@regression` | ✅ Automated |
| AUTH-05 | Password is required               | 🟡 P2    | `@regression` | ✅ Automated |
| AUTH-06 | Problem user can log in            | 🟢 P3    | `@regression` | 📝 Planned   |
| AUTH-07 | Performance-glitch user can log in | 🟢 P3    | `@regression` | 📝 Planned   |
| AUTH-08 | User can log out                   | 🟡 P2    | `@regression` | 📝 Planned   |
| AUTH-09 | Password field is masked           | 🟢 P3    | `@regression` | 📝 Planned   |

---

### AUTH-01 — Standard user logs in successfully

- **Priority / Type:** 🔴 P1 / `@smoke` · ✅ Automated
- **Preconditions:** On the login page.
- **Steps:**
  1. Enter username `standard_user`.
  2. Enter password `secret_sauce`.
  3. Click **Login**.
- **Expected result:** Redirected to `/inventory.html`; the page title reads **Products**.

### AUTH-02 — Locked-out user is rejected

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** On the login page.
- **Steps:**
  1. Enter username `locked_out_user` and password `secret_sauce`.
  2. Click **Login**.
- **Expected result:** Stays on the login page; error banner reads
  _"Sorry, this user has been locked out."_

### AUTH-03 — Invalid credentials are rejected

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** On the login page.
- **Steps:**
  1. Enter a non-existent username and a wrong password.
  2. Click **Login**.
- **Expected result:** Error banner reads
  _"Username and password do not match any user in this service"._

### AUTH-04 — Username is required

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** On the login page.
- **Steps:**
  1. Leave the username empty, enter password `secret_sauce`.
  2. Click **Login**.
- **Expected result:** Error banner reads _"Username is required"_.

### AUTH-05 — Password is required

- **Priority / Type:** 🟡 P2 / `@regression` · ✅ Automated
- **Preconditions:** On the login page.
- **Steps:**
  1. Enter username `standard_user`, leave the password empty.
  2. Click **Login**.
- **Expected result:** Error banner reads _"Password is required"_.

### AUTH-06 — Problem user can log in

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** On the login page.
- **Steps:**
  1. Log in as `problem_user` / `secret_sauce`.
- **Expected result:** Login succeeds and the catalog loads (UI defects are
  asserted separately in the Inventory module).

### AUTH-07 — Performance-glitch user can log in

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** On the login page.
- **Steps:**
  1. Log in as `performance_glitch_user` / `secret_sauce`.
- **Expected result:** Login eventually succeeds; catalog loads within the
  configured navigation timeout despite the artificial delay.

### AUTH-08 — User can log out

- **Priority / Type:** 🟡 P2 / `@regression` · 📝 Planned
- **Preconditions:** Logged in as `standard_user`.
- **Steps:**
  1. Open the burger menu.
  2. Click **Logout**.
- **Expected result:** Redirected back to the login page; protected pages are
  no longer accessible without re-authenticating.

### AUTH-09 — Password field is masked

- **Priority / Type:** 🟢 P3 / `@regression` · 📝 Planned
- **Preconditions:** On the login page.
- **Steps:**
  1. Type any value into the password field.
- **Expected result:** Input type is `password`; characters are rendered as dots.
