import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Checkout step one — customer information form.
 * {@link https://www.saucedemo.com/checkout-step-one.html}.
 */
export class CheckoutPage extends BasePage {
  protected readonly path = '/checkout-step-one.html';

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  /**
   * @param page - The Playwright page this object operates on.
   */
  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Fill the buyer information form and continue to the overview step.
   *
   * @param firstName - Buyer's first name.
   * @param lastName - Buyer's last name.
   * @param postalCode - Buyer's postal/ZIP code.
   * @returns A promise that resolves once the form is submitted.
   *
   * @remarks
   * On missing required fields the app stays on this page and shows an error;
   * assert that case via {@link expectError}.
   */
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * Assert the checkout error banner is visible and contains the given text.
   *
   * @param message - Substring expected within the error banner.
   * @returns A promise that resolves when both assertions pass.
   */
  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
