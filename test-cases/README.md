# Test Cases — SauceDemo

Manually designed test cases for [SauceDemo](https://www.saucedemo.com), organised by site module.
This is the **test-design** artifact behind the automated suite: it documents the full coverage
intent, while the [`tests/`](../tests) folder automates the highest-value subset.

Each case is cross-referenced to its automated spec (when automated), so a reviewer can see both
_what is tested_ and _how it maps to code_.

## Modules

| Module              | Cases             | Doc                                    |
| ------------------- | ----------------- | -------------------------------------- |
| Authentication      | AUTH-01 … AUTH-09 | [authentication.md](authentication.md) |
| Inventory / Catalog | INV-01 … INV-10   | [inventory.md](inventory.md)           |
| Cart                | CART-01 … CART-07 | [cart.md](cart.md)                     |
| Checkout            | CHK-01 … CHK-09   | [checkout.md](checkout.md)             |

## Legend

**Priority** — business impact / risk:

- 🔴 **P1 (Critical)** — core revenue/auth path; a failure blocks the user.
- 🟡 **P2 (High)** — important behaviour, has a workaround.
- 🟢 **P3 (Medium)** — secondary behaviour / edge case.

**Type** — suite tier:

- `@smoke` — critical happy path, fast feedback on every build.
- `@regression` — broader coverage run on PRs / nightly.

**Automation status:**

- ✅ **Automated** — has a Playwright spec (link provided).
- 📝 **Planned** — designed but not yet automated (documents coverage intent).

## Test data

All cases use the shared accounts and catalog from
[`fixtures/test-data.ts`](../fixtures/test-data.ts):

| Account                   | Behaviour                                  |
| ------------------------- | ------------------------------------------ |
| `standard_user`           | Normal happy-path user.                    |
| `locked_out_user`         | Blocked at login.                          |
| `problem_user`            | UI defects (broken images, sort glitches). |
| `performance_glitch_user` | Artificially slow responses.               |

Password for all accounts: `secret_sauce`.
