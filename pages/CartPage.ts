import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Shopping cart page object — {@link https://www.saucedemo.com/cart.html}.
 */
export class CartPage extends BasePage {
  protected readonly path = '/cart.html';

  readonly title: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  /**
   * @param page - The Playwright page this object operates on.
   */
  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Assert that the cart page has loaded (title reads "Your Cart" and the URL
   * points at the cart page).
   *
   * @returns A promise that resolves when the page-identity checks pass.
   */
  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Your Cart');
    await this.expectUrlContains('cart.html');
  }

  /**
   * Read the names of the items currently in the cart.
   *
   * @returns The cart line-item names, ordered as rendered.
   */
  async itemNames(): Promise<string[]> {
    return this.cartItemNames.allInnerTexts();
  }

  /**
   * Count the line items currently in the cart.
   *
   * @returns The number of items in the cart.
   */
  async itemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /**
   * Assert that a specific product is present in the cart.
   *
   * @param productName - Display name of the product expected in the cart.
   * @returns A promise that resolves when the item is found and visible.
   */
  async expectContains(productName: string): Promise<void> {
    await expect(this.cartItemNames.filter({hasText: productName})).toBeVisible();
  }

  /**
   * Proceed to the checkout information step.
   *
   * @returns A promise that resolves once the checkout button is clicked.
   */
  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
