import {Page, Locator, expect} from '@playwright/test';

/**
 * Base class shared by every page object.
 *
 * Holds the Playwright {@link Page} handle and small navigation/utility
 * helpers. Concrete pages extend this and expose their own locators + actions.
 *
 * @remarks
 * Assertion helpers here are deliberately `protected`: they are building
 * blocks for each page's own `expectLoaded()` contract, not scenario
 * assertions for tests. Tests assert business outcomes via `expect(...)`.
 */
export abstract class BasePage {
  protected readonly page: Page;

  /** Path appended to `baseURL` for this page (overridden by subclasses). */
  protected readonly path: string = '/';

  /**
   * @param page - The Playwright page this object operates on.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to this page's {@link path} (relative to `baseURL`).
   *
   * @returns A promise that resolves once navigation completes.
   */
  async open(): Promise<void> {
    await this.page.goto(this.path);
  }

  /**
   * Get the current page URL.
   *
   * @returns The full URL of the page as a string.
   */
  url(): string {
    return this.page.url();
  }

  /**
   * Page-identity guard: assert the current URL contains the expected fragment.
   *
   * @param fragment - A literal URL fragment (e.g. `inventory.html`); regex
   *   metacharacters are escaped before matching.
   * @returns A promise that resolves when the assertion passes.
   *
   * @remarks
   * `protected` on purpose — an internal building block for each page's
   * `expectLoaded()` contract, NOT a scenario assertion for tests.
   */
  protected async expectUrlContains(fragment: string): Promise<void> {
    const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(this.page).toHaveURL(new RegExp(escaped));
  }

  /**
   * Wait until a locator is visible and return it (fluent helper).
   *
   * @param locator - The locator to wait for.
   * @returns The same locator, once it is visible, for chaining.
   */
  protected async visible(locator: Locator): Promise<Locator> {
    await expect(locator).toBeVisible();
    return locator;
  }
}
