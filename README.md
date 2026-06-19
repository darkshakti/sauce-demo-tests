# SauceDemo E2E — Playwright + TypeScript

End-to-end test automation framework for [SauceDemo](https://www.saucedemo.com), built as a portfolio
project to demonstrate production-grade QA automation practices: **Page Object Model**, **multi-browser**
execution, **CI/CD** on every push, and rich **HTML + Allure** reporting.

[![Playwright Tests](https://github.com/darkshakti/sauce-demo-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/darkshakti/sauce-demo-tests/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-1.61-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node-22-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Demo

<!-- Record a run (see "Recording the demo GIF" below) and drop the file at docs/demo.gif -->

![Test run](docs/demo.gif)

---

## 🎯 What this project demonstrates

| Capability            | How it's implemented                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| **Page Object Model** | One class per page in [`pages/`](pages), all extending a shared `BasePage`.                             |
| **Custom fixtures**   | [`fixtures/fixtures.ts`](fixtures/fixtures.ts) injects page objects + a `loginAsStandardUser` shortcut. |
| **Multi-browser**     | Locally `npm test` runs **Chromium** for speed; **CI runs all 3** engines (chromium/firefox/webkit).    |
| **CI/CD**             | GitHub Actions matrix run on every push/PR — [`playwright.yml`](.github/workflows/playwright.yml).      |
| **Reporting**         | Playwright HTML report + Allure report; screenshots, video & trace on failure.                          |
| **Test tiers**        | `@smoke` (fast critical path) and `@regression` (full coverage) tags.                                   |
| **Typed test data**   | Centralised users / products / errors in [`fixtures/test-data.ts`](fixtures/test-data.ts).              |
| **Test design**       | Documented test cases by module in [`test-cases/`](test-cases/README.md), cross-linked to the specs.    |
| **Traceability**      | Each spec title carries its case ID (`[AUTH-01]` … `[CHK-04]`), mapping tests ↔ documented cases.       |
| **Pinned toolchain**  | Exact dependency versions + committed lockfile; `npm ci` gives reproducible installs.                   |

---

## 🗂 Project structure

```
sauce-demo/
├─ tests/
│  ├─ e2e/                    # UI end-to-end specs
│  │  ├─ login.spec.ts        # authentication scenarios
│  │  ├─ inventory.spec.ts    # catalog, cart badge, sorting
│  │  ├─ cart.spec.ts         # cart contents & navigation
│  │  └─ checkout.spec.ts     # full purchase flow + validation
│  └─ api/
│     └─ health.spec.ts       # HTTP-level availability checks
├─ pages/                     # Page Object Model
│  ├─ BasePage.ts
│  ├─ LoginPage.ts
│  ├─ InventoryPage.ts
│  ├─ CartPage.ts
│  ├─ CheckoutPage.ts
│  ├─ CheckoutOverviewPage.ts
│  └─ CheckoutCompletePage.ts
├─ fixtures/                  # custom test fixtures + test data
│  ├─ fixtures.ts
│  └─ test-data.ts
├─ test-cases/                # manual test-design docs, by module
│  ├─ authentication.md
│  ├─ inventory.md
│  ├─ cart.md
│  └─ checkout.md
├─ .github/workflows/
│  └─ playwright.yml          # CI pipeline (3 browsers + Allure)
├─ docs/                      # screenshots / demo GIF
├─ playwright.config.ts       # browser + smoke/regression projects
├─ tsconfig.json
├─ LICENSE
└─ README.md
```

---

## 🏛 Architecture

**Page Object Model.** Every page exposes its locators and intention-revealing actions
(`login()`, `addToCart()`, `checkout()`), never raw selectors. Tests describe _what_ the
user does; the page objects know _how_. A `BasePage` centralises navigation and common helpers.

**Fixtures over `new`.** Specs receive ready-to-use page objects via Playwright fixtures, so a
test reads as a clean sequence of business steps:

```ts
test('[CHK-01] full purchase @smoke', async ({
  loginAsStandardUser: inventory,
  cartPage,
  checkoutPage,
}) => {
  await inventory.addToCart(PRODUCTS.backpack);
  await inventory.goToCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation('Margarita', 'QA', '12345');
  // ...
});
```

**Data-driven.** Users, products and expected error strings live in one typed module, so
scenarios stay readable and a copy change is a one-line fix.

**Traceable.** Every spec title is prefixed with the ID of its documented case
(`[CHK-01]`), so a reviewer can jump from a result in the report to the case in
[`test-cases/`](test-cases/README.md) and back.

---

## 🚀 Getting started

```bash
# 1. Install dependencies.
#    A `postinstall` hook runs `playwright install`, so the browser engines
#    (chromium, firefox, webkit) are downloaded automatically.
npm install

# 2. (Linux only) install the system libraries the browsers need:
#    npx playwright install-deps

# 3. Run the suite locally (Chromium only — fast feedback)
npm test

# ...or run it on all 3 engines locally, like CI does:
npm run test:all
```

> Requires **Node 22+**. Dependency versions are pinned and committed in
> `package-lock.json`; use `npm ci` for an exact, reproducible install.

### Useful commands

| Command                        | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `npm test`                     | Run all tests on **Chromium** (local default, fast)          |
| `npm run test:all`             | Run all tests on all 3 engines (chromium/firefox/webkit)     |
| `npm run test:smoke`           | Run the `smoke` project (`@smoke` tests, Chromium)           |
| `npm run test:regression`      | Run the `regression` project (`@regression` tests, Chromium) |
| `npm run test:chromium`        | Run on Chromium only (also `:firefox`, `:webkit`)            |
| `npm run test:e2e` / `:api`    | Run only the e2e / api suite                                 |
| `npm run test:ui`              | Open Playwright's interactive UI mode                        |
| `npm run test:headed`          | Run with a visible browser (all 3 engines)                   |
| `npm run test:headed:chromium` | Run with a visible browser, Chromium only                    |
| `npm run report`               | Open the last Playwright HTML report                         |
| `npm run allure:serve`         | Generate & open the Allure report                            |
| `npm run codegen`              | Launch Playwright codegen against SauceDemo                  |

---

## 🏷 Test tiers (tags)

Tests are tagged in their titles (`@smoke` / `@regression`) and exposed as dedicated
Playwright **projects** that filter by tag on Chromium for fast feedback:

- **`@smoke`** — critical happy paths (login, add to cart, full checkout). Fast feedback.
- **`@regression`** — broader coverage: negative auth, sorting, validation, cart navigation.

```bash
npm run test:smoke        # playwright test --project=smoke
npm run test:regression   # playwright test --project=regression
```

The cross-browser projects (`chromium`, `firefox`, `webkit`) run the **full** suite on
each engine; the tier projects are a Chromium-only fast lane. You can still combine a
browser project with a tag manually, e.g. `playwright test --project=firefox --grep @smoke`.

---

## 📊 Reporting

- **Live Allure report** — published to GitHub Pages on every push to `main`:
  **https://darkshakti.github.io/sauce-demo-tests/**
- **Playwright HTML report** — `npm run report` (auto-generated under `playwright-report/`).
- **Allure** — `npm run allure:serve` for a polished, history-aware dashboard locally.
- On failure Playwright captures a **screenshot**, **video** and a **trace** (open with
  `npx playwright show-trace <trace.zip>`).

In CI, the Playwright HTML report and the merged Allure report are uploaded as downloadable
artifacts on every run; on `main` the Allure report is also deployed to GitHub Pages (link above).

---

## 🔄 CI/CD

[`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) runs on every push and
pull request to `main`/`master` (Node 22) as three staged jobs:

1. **`Smoke (Chromium)`** — fast gate: runs the `smoke` project on Chromium only for quick feedback.
2. **`Smoke + Regression`** — `needs: smoke`; once the gate is green, runs the **full suite** across
   **chromium / firefox / webkit** in parallel (each job installs only its own browser).
3. **`Publish Allure report`** — merges the per-browser Allure results into a single report artifact.
4. **`Deploy Allure report to GitHub Pages`** — on `main`, publishes that report to GitHub Pages.

This fail-fast layout avoids spending the 3-browser matrix when a basic smoke check is already broken.
HTML reports (smoke + per-browser) and the merged Allure report are uploaded as downloadable artifacts.

---

## 🎥 Recording the demo GIF

```bash
# Run in a single visible browser, then screen-record the run:
npm run test:headed:chromium -- tests/e2e/checkout.spec.ts
```

Capture with [ScreenToGif](https://www.screentogif.com/) (Windows) or
[Peek](https://github.com/phw/peek) (Linux), export to `docs/demo.gif`, and it will appear in the
**Demo** section above.

---

## 🧰 Tech stack

- [Playwright Test](https://playwright.dev) 1.61 + TypeScript 6
- [Allure](https://allurereport.org/) reporting
- GitHub Actions CI (Node 22)
- ESLint 10 + Prettier 3

---

## 📄 License

Released under the [MIT License](LICENSE) © 2026 Margarita Vladyko.
