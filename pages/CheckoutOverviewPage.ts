import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Checkout step two — order overview & totals.
 * {@link https://www.saucedemo.com/checkout-step-two.html}.
 */
export class CheckoutOverviewPage extends BasePage {
  protected readonly path = '/checkout-step-two.html';

  readonly title: Locator;
  readonly cartItems: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  /**
   * @param page - The Playwright page this object operates on.
   */
  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  /**
   * Assert that the overview page has loaded (title reads "Checkout: Overview"
   * and the URL points at step two).
   *
   * @returns A promise that resolves when the page-identity checks pass.
   */
  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Overview');
    await this.expectUrlContains('checkout-step-two.html');
  }

  /**
   * Read the item subtotal (before tax).
   *
   * @returns The item-total amount as a number.
   */
  async itemTotal(): Promise<number> {
    return this.amountFrom(this.itemTotalLabel);
  }

  /**
   * Read the tax amount.
   *
   * @returns The tax amount as a number.
   */
  async tax(): Promise<number> {
    return this.amountFrom(this.taxLabel);
  }

  /**
   * Read the grand total (item total + tax).
   *
   * @returns The total amount as a number.
   */
  async total(): Promise<number> {
    return this.amountFrom(this.totalLabel);
  }

  /**
   * Place the order, completing the purchase.
   *
   * @returns A promise that resolves once the finish button is clicked.
   */
  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Parse a `"$xx.yy"` summary label into a number.
   *
   * @param locator - Locator of the summary label to read.
   * @returns The parsed amount, or `NaN` when no number is present.
   */
  private async amountFrom(locator: Locator): Promise<number> {
    const text = await locator.innerText();
    const match = text.match(/[\d.]+/);
    return match ? Number(match[0]) : NaN;
  }
}
