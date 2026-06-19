import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Checkout complete — order confirmation.
 * {@link https://www.saucedemo.com/checkout-complete.html}.
 */
export class CheckoutCompletePage extends BasePage {
  protected readonly path = '/checkout-complete.html';

  readonly title: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  /**
   * @param page - The Playwright page this object operates on.
   */
  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Assert the order was placed successfully (URL points at the completion
   * page and the confirmation header reads "Thank you for your order!").
   *
   * @returns A promise that resolves when the confirmation checks pass.
   */
  async expectOrderComplete(): Promise<void> {
    await this.expectUrlContains('checkout-complete.html');
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
