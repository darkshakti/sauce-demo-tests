# Test Plan — SauceDemo E2E

Master test plan for the [SauceDemo](https://www.saucedemo.com) automation framework. It defines
**what** is tested, **how**, **where** and the criteria for calling a run good. The detailed,
per-module test design lives in [`test-cases/`](test-cases/README.md); this document is the
strategy layer above it.

| | |
| --- | --- |
| **Project** | SauceDemo E2E (Playwright + TypeScript) |
| **System under test** | `https://www.saucedemo.com` (Swag Labs — React SPA demo store) |
| **Author / owner** | Margarita Vladyko |
| **Status** | Living document — kept in sync with `test-cases/` and the specs |

---

## 1. Objectives

- Guard the **critical revenue path** — login → browse catalog → cart → checkout → confirmation —
  on every push, across all three browser engines.
- Verify functional correctness of each module (authentication, inventory, cart, checkout) against
  its documented test cases.
- Provide **fast feedback** via a smoke gate before spending the full cross-browser matrix.
- Keep every result **traceable**: each automated spec carries its case ID (`[AUTH-01]` … `[CHK-09]`)
  back to a documented case in [`test-cases/`](test-cases/README.md).

## 2. Scope

### In scope

| Area | Covered by |
| --- | --- |
| Authentication (login, lockout, validation, logout) | [authentication.md](test-cases/authentication.md) · [login.spec.ts](tests/e2e/login.spec.ts) |
| Inventory / catalog (listing, cart badge, sorting, detail) | [inventory.md](test-cases/inventory.md) · [inventory.spec.ts](tests/e2e/inventory.spec.ts) |
| Cart (contents, navigation, item management) | [cart.md](test-cases/cart.md) · [cart.spec.ts](tests/e2e/cart.spec.ts) |
| Checkout (information → overview → completion, totals, validation) | [checkout.md](test-cases/checkout.md) · [checkout.spec.ts](tests/e2e/checkout.spec.ts) |
| HTTP availability (status, shell, served assets) | [health.spec.ts](tests/api/health.spec.ts) |
| Cross-browser parity (Chromium / Firefox / WebKit) | [playwright.config.ts](playwright.config.ts) |

### Out of scope

- Load, stress and performance benchmarking (the `performance_glitch_user` is exercised only
  functionally, not measured).
- Security / penetration testing.
- Visual-regression (pixel) testing.
- Mobile-device emulation and accessibility (a11y) audits — candidates for a future iteration.
- Back-end / database verification — SauceDemo exposes no public REST API, so API coverage is
  limited to the HTTP/asset layer.

## 3. Test approach

### Levels

- **API / HTTP** — Playwright `request` fixture against the site's HTTP layer (availability,
  headers, SPA shell, JS bundle). See [`tests/api`](tests/api).
- **UI end-to-end** — Page Object Model driving real browsers through business journeys. See
  [`tests/e2e`](tests/e2e).

### Types

Functional (positive & negative), end-to-end journey, data-driven (shared accounts/products),
and cross-browser compatibility.

### Design techniques

Equivalence partitioning and boundary analysis on form inputs, error-guessing on the known
problem accounts (`locked_out_user`, `problem_user`, `performance_glitch_user`), and
state-transition coverage across the checkout steps.

### Test tiers

Tests are tagged in their titles and exposed as Playwright **projects** (see
[`playwright.config.ts`](playwright.config.ts)):

- **`@smoke`** — critical happy paths (login, add to cart, full checkout). Fast Chromium-only gate.
- **`@regression`** — broader coverage: negative auth, sorting, validation, cart navigation.

## 4. Test environment

| | |
| --- | --- |
| **Target URL** | `https://www.saucedemo.com` (override via `BASE_URL` env var) |
| **Browsers** | Chromium, Firefox, WebKit (Desktop devices) |
| **Runtime** | Node 22+; Playwright Test 1.61; TypeScript 6 |
| **Local default** | `npm test` → Chromium only, for speed |
| **CI** | GitHub Actions, Node 22 — [`playwright.yml`](.github/workflows/playwright.yml) |
| **Timeouts** | 30 s per test · 15 s navigation · 10 s action · 5 s expect |
| **Retries** | 2 on CI, 0 locally · 1 worker on CI for stability |

## 5. Test data

Shared, typed test data in [`fixtures/test-data.ts`](fixtures/test-data.ts). Password for all
accounts: `secret_sauce`.

| Account | Behaviour |
| --- | --- |
| `standard_user` | Normal happy-path user. |
| `locked_out_user` | Blocked at login. |
| `problem_user` | UI defects (broken images, sort glitches). |
| `performance_glitch_user` | Artificially slow responses. |
| `invalid` (`no_such_user`) | Rejected with an invalid-credentials error. |

Products, checkout details and expected error strings are likewise centralised, so a copy change
is a one-line fix.

## 6. Entry & exit criteria

**Entry (run can start when):**

- Dependencies install cleanly (`npm ci`) and browsers are provisioned.
- The target site is reachable (HTTP availability checks pass).
- The branch builds and lints (`npm run lint`).

**Exit (run is considered complete when):**

- **All `@smoke` tests pass** on Chromium — non-negotiable gate.
- The full suite passes on all three engines, or every failure is triaged to a known issue /
  product defect (not a test defect).
- Reports (HTML + Allure) are generated and, on `main`, published.

**Suspension:** if the smoke gate fails, the cross-browser matrix is **not** run (fail-fast) —
the build is fixed first.

## 7. Coverage summary

35 documented cases across four modules; the highest-value subset is automated, the remainder is
designed and tracked as **📝 Planned**.

| Module | Cases | Automated | Planned |
| --- | --- | --- | --- |
| [Authentication](test-cases/authentication.md) | AUTH-01 … 09 | 5 | 4 |
| [Inventory](test-cases/inventory.md) | INV-01 … 10 | 5 | 5 |
| [Cart](test-cases/cart.md) | CART-01 … 07 | 2 | 5 |
| [Checkout](test-cases/checkout.md) | CHK-01 … 09 | 4 | 5 |
| **Total** | **35** | **16** | **19** |

Plus 3 HTTP/availability checks in [`tests/api/health.spec.ts`](tests/api/health.spec.ts).

**Priority key** — 🔴 P1 (critical, blocks the user) · 🟡 P2 (important, has a workaround) ·
🟢 P3 (secondary / edge case).

## 8. Execution

| Command | Purpose |
| --- | --- |
| `npm run test:smoke` | Smoke gate (`@smoke`, Chromium) — fast feedback |
| `npm run test:regression` | Regression suite (`@regression`, Chromium) |
| `npm test` | Full suite, Chromium only (local default) |
| `npm run test:all` | Full suite on Chromium + Firefox + WebKit |
| `npm run test:e2e` / `:api` | E2E-only / API-only |
| `npm run report` / `allure:serve` | Open Playwright HTML / Allure report |

**CI pipeline** ([`playwright.yml`](.github/workflows/playwright.yml)): Smoke (Chromium) →
Smoke + Regression on all 3 engines → merge Allure results → deploy report to GitHub Pages on `main`.

## 9. Reporting & deliverables

- **Playwright HTML report** — per run; screenshots, video and trace captured **on failure**.
- **Allure report** — history-aware dashboard; live on GitHub Pages:
  **https://darkshakti.github.io/sauce-demo-tests/**
- **CI artifacts** — HTML (smoke + per-browser) and the merged Allure report uploaded on every run.
- This **test plan**, the per-module **test-case docs**, and the **automated specs**.

## 10. Risks & mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Third-party site (no control over uptime/changes) | Flaky / blocked runs | HTTP availability gate; retries on CI; resolve asset paths from the live shell, not hard-coded hashes. |
| Network flakiness | Intermittent failures | CI retries (2) + single worker; generous nav/action timeouts. |
| `performance_glitch_user` slowness | Timeouts | Functional-only coverage within the configured navigation timeout. |
| Cross-browser divergence | WebKit/Firefox-only failures | Full suite runs on all 3 engines after the smoke gate. |
| Test-data drift (copy/catalog changes upstream) | False failures | Centralised data in `fixtures/test-data.ts`; one-line fixes. |

## 11. Roles

Single-maintainer portfolio project: the author owns test design, automation, CI and triage.
The structure (POM, fixtures, tiers, traceable IDs) is built to scale to a team without rework.
