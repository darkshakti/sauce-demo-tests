import {defineConfig, devices} from '@playwright/test';

/**
 * Playwright configuration for the SauceDemo E2E framework.
 *
 * Highlights:
 *  - Multi-browser projects: chromium, firefox, webkit.
 *  - HTML + Allure + list reporters.
 *  - Screenshots, video and traces captured on failure.
 *  - Tag-based selection via `--grep` (@smoke / @regression).
 *
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Maximum time one test can run. */
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },

  /* Run tests inside files in parallel. */
  fullyParallel: true,

  /* Fail the build on CI if test.only was left in the source. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only. */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel workers on CI for stability. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporters: HTML for humans, Allure for portfolio, list for the console. */
  reporter: [
    ['list'],
    ['html', {open: 'never'}],
    ['allure-playwright', {resultsDir: 'allure-results'}],
  ],

  /* Shared settings for all projects. */
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',

    /* Collect artifacts to make failures easy to debug. */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  projects: [
    /* Cross-browser projects — run the full suite on each engine. */
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },
    {
      name: 'webkit',
      use: {...devices['Desktop Safari']},
    },

    /* Test-tier projects — fast, Chromium-only selection by tag.
       Run with `--project=smoke` / `--project=regression`. */
    {
      name: 'smoke',
      grep: /@smoke/,
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'regression',
      grep: /@regression/,
      use: {...devices['Desktop Chrome']},
    },
  ],
});
